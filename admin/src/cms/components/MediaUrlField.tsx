import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, FolderOpen, Plus, X } from "lucide-react";
import toast from "react-hot-toast";
import { ACCEPT, errorMessage, uploadMedia } from "../api";
import { DropTarget, PickerModal, Progress, ReplaceButtons, displayUrl, fileName, useUpload, type Kind } from "../fields/MediaInputs";

interface MediaUrlFieldProps {
  id: string;
  label: string;
  kind: Kind;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
  required?: boolean;
}

function Preview({ kind, url, className }: { kind: Kind; url: string; className: string }) {
  if (kind === "audio") return <audio src={displayUrl(url)} controls preload="metadata" className="w-64 max-w-full" />;
  return kind === "video" ? (
    <video src={displayUrl(url)} controls muted preload="metadata" className={`bg-gray-900 object-cover ${className}`} />
  ) : (
    <div className={`overflow-hidden bg-[repeating-conic-gradient(#f3f4f6_0_25%,#fff_0_50%)] bg-[length:16px_16px] ${className}`}>
      <img src={displayUrl(url)} alt="" className="h-full w-full object-contain" />
    </div>
  );
}

/** Upload / pick one image or video for a form that stores a plain URL. */
export function MediaUrlField({ id, label, kind, value, onChange, hint, required }: MediaUrlFieldProps) {
  const [picker, setPicker] = useState(false);
  const upload = useUpload(kind, (m) => onChange(m.url));

  return (
    <fieldset id={id} className="min-w-0">
      <legend className="label">
        {label}
        {required && <span className="ml-0.5 text-red-500" aria-hidden>*</span>}
      </legend>
      {value ? (
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-gray-200 p-3">
          <Preview kind={kind} url={value} className="h-20 w-32 shrink-0 rounded-lg" />
          <div className="min-w-0 flex-1 space-y-2">
            <p className="truncate text-sm font-medium text-gray-800" title={value}>{fileName(value)}</p>
            <ReplaceButtons kind={kind} onFile={upload.start} onLibrary={() => setPicker(true)} onRemove={required ? undefined : () => onChange("")} />
          </div>
        </div>
      ) : (
        <DropTarget kind={kind} onFile={upload.start} onLibrary={() => setPicker(true)} />
      )}
      {upload.pct !== null && <Progress pct={upload.pct} />}
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
      <PickerModal open={picker} kind={kind} onClose={() => setPicker(false)} onSelect={(m) => onChange(m.url)} selectedUrl={value} />
    </fieldset>
  );
}

interface MediaUrlListFieldProps {
  id: string;
  label: string;
  kind: Kind;
  value: string[];
  onChange: (urls: string[]) => void;
  hint?: string;
  max?: number;
}

/** Upload / pick several images or videos for a form that stores a list of URLs. */
export function MediaUrlListField({ id, label, kind, value, onChange, hint, max }: MediaUrlListFieldProps) {
  const [picker, setPicker] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const latest = useRef(value);
  latest.current = value;
  const full = max !== undefined && value.length >= max;

  const addFiles = async (files: FileList) => {
    const room = max === undefined ? files.length : Math.max(0, max - latest.current.length);
    const list = Array.from(files).filter((f) => f.type.startsWith(`${kind}/`)).slice(0, room);
    if (list.length === 0) {
      toast.error(kind === "image" ? "Choose image files" : "Choose MP4 or WebM videos");
      return;
    }
    for (const [i, file] of list.entries()) {
      try {
        const media = await uploadMedia(file, { onProgress: (pct) => setProgress(Math.round(((i + pct / 100) / list.length) * 100)) });
        onChange([...latest.current, media.url]);
      } catch (err) {
        toast.error(`${file.name}: ${errorMessage(err)}`);
      }
    }
    setProgress(null);
  };

  const move = (from: number, to: number) => {
    const next = [...value];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  return (
    <fieldset id={id} className="min-w-0">
      <legend className="label flex w-full justify-between">
        <span>{label}</span>
        <span className="text-xs font-normal text-gray-400 tabular-nums">
          {value.length}
          {max !== undefined ? ` of max ${max}` : ""}
        </span>
      </legend>
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {value.map((url, i) => (
          <li key={`${url}-${i}`} className="group relative">
            <Preview kind={kind} url={url} className="aspect-square w-full rounded-lg border border-gray-200" />
            <div className="absolute inset-x-1 bottom-1 flex justify-between opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
              <button type="button" disabled={i === 0} onClick={() => move(i, i - 1)} className="rounded-md bg-white/90 p-1 text-gray-600 shadow disabled:opacity-30" aria-label="Move earlier">
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>
              <button type="button" disabled={i === value.length - 1} onClick={() => move(i, i + 1)} className="rounded-md bg-white/90 p-1 text-gray-600 shadow disabled:opacity-30" aria-label="Move later">
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              className="absolute right-1 top-1 rounded-full bg-white/90 p-1 text-gray-600 shadow hover:text-red-600"
              aria-label={`Remove ${fileName(url)}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </li>
        ))}
        {!full && (
          <li className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-gray-200 p-2 text-center">
            <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:underline">
              <Plus className="h-3.5 w-3.5" /> Upload
            </button>
            <button type="button" onClick={() => setPicker(true)} className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:underline">
              <FolderOpen className="h-3.5 w-3.5" /> Library
            </button>
          </li>
        )}
      </ul>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPT[kind]}
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) addFiles(e.target.files);
          e.target.value = "";
        }}
      />
      {progress !== null && <Progress pct={progress} />}
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
      <PickerModal open={picker} kind={kind} onClose={() => setPicker(false)} onSelect={(m) => onChange([...latest.current, m.url])} />
    </fieldset>
  );
}
