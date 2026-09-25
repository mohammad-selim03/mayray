import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Film, Loader2, Music, Search, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import { ACCEPT, KIND_INFO, errorMessage, formatBytes, mediaApi, uploadMedia, type MediaItem, type MediaKind as Kind } from "../api";

interface MediaBrowserProps {
  /** Locks the browser to one kind (used by field pickers). */
  kind?: Kind;
  onSelect: (media: MediaItem) => void;
  selectedUrl?: string;
}

interface UploadRow {
  id: number;
  name: string;
  pct: number;
}

export function MediaThumb({ media, className = "" }: { media: MediaItem; className?: string }) {
  if (media.kind === "audio") {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 bg-primary-50 px-2 text-primary-600 ${className}`}>
        <Music className="h-7 w-7" />
        <span className="max-w-full truncate text-xs font-medium">{media.filename}</span>
      </div>
    );
  }
  if (media.kind === "video") {
    return (
      <div className={`relative bg-gray-900 ${className}`}>
        <video src={media.url} muted preload="metadata" className="h-full w-full object-cover opacity-80" />
        <Film className="absolute left-2 top-2 h-4 w-4 text-white drop-shadow" />
      </div>
    );
  }
  return (
    <div className={`bg-[repeating-conic-gradient(#f3f4f6_0_25%,#fff_0_50%)] bg-[length:16px_16px] ${className}`}>
      <img src={media.url} alt={media.alt} loading="lazy" className="h-full w-full object-contain" />
    </div>
  );
}

export default function MediaBrowser({ kind: lockedKind, onSelect, selectedUrl }: MediaBrowserProps) {
  const qc = useQueryClient();
  const [kind, setKind] = useState<Kind | undefined>(lockedKind);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [uploads, setUploads] = useState<UploadRow[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(0);

  useEffect(() => {
    const t = setTimeout(() => setQuery(search.trim()), 250);
    return () => clearTimeout(t);
  }, [search]);

  const media = useInfiniteQuery({
    queryKey: ["media", kind ?? "all", query],
    queryFn: ({ pageParam }) => mediaApi.list({ kind, search: query || undefined, page: pageParam, limit: 30 }),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.page * last.limit < last.total ? last.page + 1 : undefined),
  });
  const items = media.data?.pages.flatMap((p) => p.items) ?? [];
  const total = media.data?.pages[0]?.total ?? 0;

  const upload = async (files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => !lockedKind || f.type.startsWith(`${lockedKind}/`));
    if (list.length === 0) {
      toast.error(lockedKind ? KIND_INFO[lockedKind].wrongType : "Choose an image, video or audio file");
      return;
    }
    await Promise.all(
      list.map(async (file) => {
        const id = nextId.current++;
        setUploads((rows) => [...rows, { id, name: file.name, pct: 0 }]);
        try {
          const item = await uploadMedia(file, {
            onProgress: (pct) => setUploads((rows) => rows.map((r) => (r.id === id ? { ...r, pct } : r))),
          });
          toast.success(`Uploaded ${item.filename}`);
          if (list.length === 1 && lockedKind) onSelect(item);
        } catch (err) {
          toast.error(`${file.name}: ${errorMessage(err)}`);
        } finally {
          setUploads((rows) => rows.filter((r) => r.id !== id));
        }
      })
    );
    qc.invalidateQueries({ queryKey: ["media"] });
  };

  return (
    <div
      className="flex flex-col gap-4"
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files.length) upload(e.dataTransfer.files);
      }}
    >
      <div className="flex flex-wrap items-center gap-2">
        {!lockedKind && (
          <div className="flex rounded-lg border border-gray-200 bg-white p-0.5 text-sm">
            {([undefined, "image", "video", "audio"] as const).map((k) => (
              <button
                key={k ?? "all"}
                type="button"
                onClick={() => setKind(k)}
                className={`rounded-md px-3 py-1.5 font-medium ${kind === k ? "bg-primary-50 text-primary-600" : "text-gray-500 hover:text-gray-800"}`}
              >
                {k ? KIND_INFO[k].plural : "All"}
              </button>
            ))}
          </div>
        )}
        <label className="relative min-w-[180px] flex-1">
          <span className="sr-only">Search files</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            className="input pl-9"
            placeholder="Search by file name or alt text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <button type="button" className="btn-primary" onClick={() => inputRef.current?.click()}>
          <UploadCloud className="h-4 w-4" /> Upload
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple={!lockedKind}
          accept={lockedKind ? ACCEPT[lockedKind] : `${ACCEPT.image},${ACCEPT.video},${ACCEPT.audio}`}
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) upload(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      <div
        className={`rounded-xl border-2 border-dashed px-4 py-3 text-center text-sm transition-colors ${
          dragging ? "border-primary-500 bg-primary-50 text-primary-600" : "border-gray-200 text-gray-400"
        }`}
      >
        Drop {lockedKind ? KIND_INFO[lockedKind].article : "files"} anywhere here to upload.{" "}
        {lockedKind
          ? `${KIND_INFO[lockedKind].plural}: ${KIND_INFO[lockedKind].formats}.`
          : (["image", "video", "audio"] as const).map((k) => `${KIND_INFO[k].plural}: ${KIND_INFO[k].formats}.`).join(" ")}
      </div>

      {uploads.length > 0 && (
        <ul className="space-y-2">
          {uploads.map((u) => (
            <li key={u.id} className="rounded-lg border border-gray-100 bg-white px-3 py-2 text-sm">
              <div className="flex justify-between gap-3">
                <span className="truncate">{u.name}</span>
                <span className="tabular-nums text-gray-500">{u.pct}%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full bg-primary-500 transition-[width]" style={{ width: `${u.pct}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}

      {media.isLoading ? (
        <div className="flex items-center gap-2 py-10 text-sm text-gray-400">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading files...
        </div>
      ) : items.length === 0 ? (
        <p className="py-10 text-center text-sm text-gray-400">
          {query ? "No files match that search." : "No files yet. Upload one to get started."}
        </p>
      ) : (
        <>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {items.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => onSelect(m)}
                  className={`group block w-full overflow-hidden rounded-xl border bg-white text-left transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    selectedUrl === m.url ? "border-primary-500 ring-2 ring-primary-500" : "border-gray-100"
                  }`}
                >
                  <MediaThumb media={m} className="aspect-[4/3] w-full" />
                  <div className="px-2.5 py-2">
                    <p className="truncate text-xs font-medium text-gray-800">{m.filename}</p>
                    <p className="text-[11px] text-gray-400 tabular-nums">
                      {m.width && m.height ? `${m.width} × ${m.height} · ` : ""}
                      {formatBytes(m.size)}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>
              Showing {items.length} of {total}
            </span>
            {media.hasNextPage && (
              <button type="button" className="btn-secondary" onClick={() => media.fetchNextPage()} disabled={media.isFetchingNextPage}>
                {media.isFetchingNextPage ? "Loading..." : "Load more"}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
