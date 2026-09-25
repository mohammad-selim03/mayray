import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, History, Loader2, RotateCcw, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import Modal from "../../components/Modal";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useUnsavedChanges } from "../../contexts/UnsavedChangesContext";
import { SITE_URL, cmsApi, errorMessage, validationIssues, type CmsDocument } from "../../cms/api";
import { FieldGroup, hasErrorsUnder } from "../../cms/fields/FieldRenderer";
import SearchPreview from "../../cms/components/SearchPreview";
import { fieldsDefaults, getDocumentDef, validateDocument, type DocumentData, type DocumentDef, type ValidationIssue } from "../../cms/schema";

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v));
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
/** Validator messages start with the field label, which the form already shows next to the error. */
const shortMessage = (message: string) => message.replace(/^[^:]+:\s*/, "");

export function relativeTime(iso: string | null) {
  if (!iso) return "";
  const diff = (new Date(iso).getTime() - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const steps: [number, Intl.RelativeTimeFormatUnit][] = [[60, "second"], [3600, "minute"], [86400, "hour"], [604800, "day"], [2629800, "week"], [31557600, "month"]];
  for (const [limit, unit] of steps) {
    if (Math.abs(diff) < limit) {
      const size = unit === "second" ? 1 : unit === "minute" ? 60 : unit === "hour" ? 3600 : unit === "day" ? 86400 : unit === "week" ? 604800 : 2629800;
      return rtf.format(Math.round(diff / size), unit);
    }
  }
  return new Date(iso).toLocaleDateString();
}

function HistoryModal({ def, open, current, dirty, onClose, onRestored }: {
  def: DocumentDef;
  open: boolean;
  current: number;
  dirty: boolean;
  onClose: () => void;
  onRestored: (doc: CmsDocument) => void;
}) {
  const versions = useQuery({ queryKey: ["cms-versions", def.key], queryFn: () => cmsApi.versions(def.key), enabled: open });
  const [target, setTarget] = useState<{ id: string; version: number } | null>(null);
  const restore = useMutation({
    mutationFn: (id: string) => cmsApi.restore(def.key, id),
    onSuccess: (doc) => {
      setTarget(null);
      onRestored(doc);
      versions.refetch();
      toast.success(`Restored. Version ${doc.version} is live.`);
    },
    onError: (err) => toast.error(errorMessage(err)),
  });

  return (
    <>
      <Modal open={open} onClose={onClose} title="Version history" size="md">
        {versions.isLoading ? (
          <p className="flex items-center gap-2 text-sm text-gray-400"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</p>
        ) : !versions.data?.length ? (
          <p className="text-sm text-gray-500">Nothing published yet. The site shows the design defaults.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {versions.data.map((v) => (
              <li key={v.id} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Version {v.version}
                    {v.version === current && <span className="badge ml-2 bg-green-50 text-green-700">Live</span>}
                  </p>
                  <p className="text-xs text-gray-500">
                    {relativeTime(v.createdAt)} · {v.createdBy ?? "Unknown"}
                    {v.restoredFrom ? ` · restored from version ${v.restoredFrom}` : ""}
                  </p>
                </div>
                {v.version !== current && (
                  <button type="button" className="btn-secondary !px-3 !py-1.5 text-xs" onClick={() => setTarget({ id: v.id, version: v.version })}>
                    <RotateCcw className="h-3.5 w-3.5" /> Restore
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </Modal>
      <ConfirmDialog
        open={target !== null}
        onClose={() => setTarget(null)}
        onConfirm={() => target && restore.mutate(target.id)}
        loading={restore.isPending}
        tone="primary"
        confirmLabel="Restore and publish"
        loadingLabel="Restoring…"
        title={`Restore version ${target?.version}?`}
        message={`It goes live right away as a new version.${dirty ? " Your unpublished changes on this page will be lost." : ""}`}
      />
    </>
  );
}

export default function ContentEditor() {
  const { key = "" } = useParams();
  const def = getDocumentDef(key);
  const qc = useQueryClient();
  const { setDirty } = useUnsavedChanges();

  const query = useQuery({ queryKey: ["cms-document", key], queryFn: () => cmsApi.get(key), enabled: !!def, staleTime: 0, refetchOnWindowFocus: false });
  const [base, setBase] = useState<CmsDocument | null>(null);
  const [draft, setDraft] = useState<DocumentData | null>(null);
  const [active, setActive] = useState(def?.sections[0]?.key ?? "");
  const [showErrors, setShowErrors] = useState(false);
  const [serverIssues, setServerIssues] = useState<ValidationIssue[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [conflict, setConflict] = useState(false);
  const [confirm, setConfirm] = useState<"discard" | "reset" | null>(null);

  const load = useCallback((doc: CmsDocument) => {
    setBase(doc);
    setDraft(clone(doc.data));
    setServerIssues([]);
    setShowErrors(false);
  }, []);

  useEffect(() => {
    if (query.data) load(query.data);
  }, [query.data, load]);

  useEffect(() => {
    setActive(def?.sections[0]?.key ?? "");
  }, [def]);

  const dirty = !!draft && !!base && !same(draft, base.data);
  useEffect(() => {
    setDirty(dirty);
  }, [dirty, setDirty]);
  useEffect(() => () => setDirty(false), [setDirty]);

  const clientIssues = useMemo(() => (def && draft ? validateDocument(def, draft).issues : []), [def, draft]);
  const errors = useMemo(() => {
    if (!showErrors) return new Map<string, string>();
    return new Map([...serverIssues, ...clientIssues].map((i) => [i.path, shortMessage(i.message)] as const));
  }, [showErrors, serverIssues, clientIssues]);

  const jumpToFirstIssue = (issues: ValidationIssue[]) => {
    const section = def?.sections.find((s) => issues.some((i) => i.path === s.key || i.path.startsWith(`${s.key}.`)));
    if (section) setActive(section.key);
  };

  const publish = useMutation({
    mutationFn: () => cmsApi.publish(key, draft!, base!.version),
    onSuccess: (doc) => {
      load(doc);
      qc.setQueryData(["cms-document", key], doc);
      qc.invalidateQueries({ queryKey: ["cms-documents"] });
      qc.invalidateQueries({ queryKey: ["cms-versions", key] });
      toast.success(doc.revalidated ? "Published. The site updates in a few seconds." : "Published. The site will show it within 5 minutes.");
    },
    onError: (err) => {
      const issues = validationIssues(err);
      const status = (err as { response?: { status?: number } }).response?.status;
      if (issues) {
        setServerIssues(issues);
        setShowErrors(true);
        jumpToFirstIssue(issues);
        toast.error("Some fields need attention");
      } else if (status === 409) {
        setConflict(true);
      } else {
        toast.error(errorMessage(err));
      }
    },
  });

  const handlePublish = useCallback(() => {
    if (!dirty || publish.isPending) return;
    setShowErrors(true);
    if (clientIssues.length) {
      jumpToFirstIssue(clientIssues);
      toast.error(clientIssues.length === 1 ? "Fix 1 field before publishing" : `Fix ${clientIssues.length} fields before publishing`);
      return;
    }
    publish.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirty, publish, clientIssues]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handlePublish();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlePublish]);

  if (!def) {
    return (
      <div className="card p-8 text-center">
        <p className="text-gray-600">This content doesn't exist.</p>
        <Link to="/content" className="mt-3 inline-block text-sm font-medium text-primary-600 hover:underline">Back to all content</Link>
      </div>
    );
  }
  if (query.isError) {
    return (
      <div className="card p-8 text-center">
        <p className="text-gray-600">{errorMessage(query.error, "Couldn't load this content.")}</p>
        <button type="button" className="btn-secondary mt-3" onClick={() => query.refetch()}>Try again</button>
      </div>
    );
  }
  if (!draft || !base) {
    return <p className="flex items-center gap-2 text-sm text-gray-400"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</p>;
  }

  const section = def.sections.find((s) => s.key === active) ?? def.sections[0];
  const sectionData = (draft[section.key] ?? {}) as Record<string, unknown>;
  const updateSection = (sectionKey: string, next: Record<string, unknown>) => {
    setServerIssues([]);
    setDraft((d) => ({ ...(d ?? {}), [sectionKey]: next }));
  };

  return (
    <div className="space-y-4">
      <div className="sticky -top-4 z-20 -mx-4 border-b border-gray-100 bg-gray-50/95 px-4 py-3 backdrop-blur md:-top-6 md:-mx-6 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-gray-400">
              <Link to="/content" className="hover:text-gray-600 hover:underline">Content</Link> / {def.kind === "page" ? "Pages" : "Site-wide"}
            </p>
            <h2 className="truncate text-lg font-semibold text-gray-900">{def.label}</h2>
            <p className="text-xs text-gray-500">
              {base.version > 0 ? `Version ${base.version} live · published ${relativeTime(base.updatedAt)}` : "Not published yet · the site shows the design defaults"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {dirty && <span className="badge bg-amber-50 text-amber-700">Unsaved changes</span>}
            {def.route && (
              <a href={`${SITE_URL}${def.route}`} target="_blank" rel="noreferrer" className="btn-secondary">
                <ExternalLink className="h-4 w-4" /> View live
              </a>
            )}
            <button type="button" className="btn-secondary" onClick={() => setHistoryOpen(true)}>
              <History className="h-4 w-4" /> History
            </button>
            {dirty && (
              <button type="button" className="btn-secondary" onClick={() => setConfirm("discard")}>Discard</button>
            )}
            <button type="button" className="btn-primary" disabled={!dirty || publish.isPending} onClick={handlePublish} title="Publish (Ctrl+S)">
              {publish.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
              {publish.isPending ? "Publishing…" : "Publish"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav aria-label="Sections" className="lg:sticky lg:top-24 lg:self-start">
          <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Sections</p>
          <ul className="flex gap-1 overflow-x-auto lg:flex-col">
            {def.sections.map((s) => {
              const bad = hasErrorsUnder(errors, s.key);
              const edited = !same(draft[s.key], base.data[s.key]);
              return (
                <li key={s.key} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActive(s.key)}
                    aria-current={s.key === section.key ? "true" : undefined}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium ${
                      s.key === section.key ? "bg-primary-50 text-primary-600" : "text-gray-600 hover:bg-white hover:text-gray-900"
                    }`}
                  >
                    <span className="truncate">{s.label}</span>
                    {bad ? (
                      <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-red-500" aria-label="Has errors" />
                    ) : edited ? (
                      <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-amber-400" aria-label="Edited" />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <section className="card p-5" aria-labelledby="section-title">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 pb-4">
            <div>
              <h3 id="section-title" className="font-semibold text-gray-900">{section.label}</h3>
              {section.description && <p className="text-sm text-gray-500">{section.description}</p>}
            </div>
            <button type="button" className="text-xs font-medium text-gray-500 hover:text-gray-800 hover:underline" onClick={() => setConfirm("reset")}>
              Reset to design default
            </button>
          </div>
          {section.variant === "seo" && (
            <div className="mb-5">
              <SearchPreview
                title={String(sectionData.title ?? "")}
                description={String(sectionData.description ?? "")}
                route={def.route}
                fallbackTitle={`${def.label} | Mayray AI`}
                noIndex={sectionData.noIndex === true}
              />
            </div>
          )}
          <FieldGroup
            key={`${section.key}-${base.version}`}
            fields={section.fields}
            values={sectionData}
            path={section.key}
            errors={errors}
            onChange={(next) => updateSection(section.key, next)}
          />
        </section>
      </div>

      <HistoryModal
        def={def}
        open={historyOpen}
        current={base.version}
        dirty={dirty}
        onClose={() => setHistoryOpen(false)}
        onRestored={(doc) => {
          load(doc);
          qc.setQueryData(["cms-document", key], doc);
          qc.invalidateQueries({ queryKey: ["cms-documents"] });
          setHistoryOpen(false);
        }}
      />

      <ConfirmDialog
        open={confirm !== null}
        onClose={() => setConfirm(null)}
        onConfirm={() => {
          if (confirm === "discard") setDraft(clone(base.data));
          else updateSection(section.key, fieldsDefaults(section.fields));
          setConfirm(null);
        }}
        tone={confirm === "discard" ? "danger" : "primary"}
        confirmLabel={confirm === "discard" ? "Discard changes" : "Reset section"}
        title={confirm === "discard" ? "Discard unsaved changes?" : `Reset "${section.label}"?`}
        message={
          confirm === "discard"
            ? "The editor goes back to what's live now."
            : "Every field in this section goes back to the original design copy. Nothing changes on the site until you publish."
        }
      />

      <Modal open={conflict} onClose={() => setConflict(false)} title="This content changed" size="sm">
        <p className="mb-5 text-gray-600">
          It was published from another tab or device after you opened it. Reload to get the latest version. Your unpublished edits here will be lost.
        </p>
        <div className="flex justify-end gap-2">
          <button type="button" className="btn-secondary" onClick={() => setConflict(false)}>Keep editing</button>
          <button
            type="button"
            className="btn-primary"
            onClick={async () => {
              setConflict(false);
              const fresh = await query.refetch();
              if (fresh.data) load(fresh.data);
            }}
          >
            Reload latest
          </button>
        </div>
      </Modal>
    </div>
  );
}
