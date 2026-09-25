import { useRef, useState, type ClipboardEvent, type DragEvent } from "react";
import { FolderOpen, ImagePlus, Music, RefreshCw, Trash2, UploadCloud, Video as VideoIcon } from "lucide-react";
import toast from "react-hot-toast";
import Modal from "../../components/Modal";
import MediaBrowser from "../components/MediaBrowser";
import { ACCEPT, KIND_INFO, SITE_URL, errorMessage, uploadMedia, type MediaItem, type MediaKind } from "../api";
import type { AudioField, AudioValue, ImageField, ImageValue, VideoField, VideoValue } from "../schema";
import { FieldShell, inputId, type FieldProps } from "./FieldShell";

export type Kind = MediaKind;

const KIND_ICON = { image: ImagePlus, video: VideoIcon, audio: Music } as const;

export const displayUrl = (url: string) => (url.startsWith("/") ? `${SITE_URL}${url}` : url);
export const fileName = (url: string) => decodeURIComponent(url.split("?")[0].split("/").pop() ?? url);

export function useUpload(kind: Kind, onDone: (media: MediaItem) => void) {
  const [pct, setPct] = useState<number | null>(null);
  const start = async (file: File) => {
    if (!file.type.startsWith(`${kind}/`)) {
      toast.error(KIND_INFO[kind].wrongType);
      return;
    }
    setPct(0);
    try {
      onDone(await uploadMedia(file, { onProgress: setPct }));
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setPct(null);
    }
  };
  return { pct, start };
}

export function Progress({ pct }: { pct: number }) {
  return (
    <div className="mt-2" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className="flex justify-between text-xs text-gray-500">
        <span>{pct < 100 ? "Uploading..." : "Checking file..."}</span>
        <span className="tabular-nums">{pct}%</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div className="h-full bg-primary-500 transition-[width]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function PickerModal({ open, kind, onClose, onSelect, selectedUrl }: {
  open: boolean;
  kind: Kind;
  onClose: () => void;
  onSelect: (m: MediaItem) => void;
  selectedUrl?: string;
}) {
  return (
    <Modal open={open} onClose={onClose} title={`Choose ${KIND_INFO[kind].article}`} size="xl">
      {open && (
        <MediaBrowser
          kind={kind}
          selectedUrl={selectedUrl}
          onSelect={(m) => {
            onSelect(m);
            onClose();
          }}
        />
      )}
    </Modal>
  );
}

/** Click, drop or paste target shown while a media field is empty. */
export function DropTarget({ kind, onFile, onLibrary, invalid }: { kind: Kind; onFile: (f: File) => void; onLibrary: () => void; invalid?: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const Icon = KIND_ICON[kind];
  return (
    <div
      tabIndex={0}
      onPaste={(e: ClipboardEvent) => {
        const file = e.clipboardData.files[0];
        if (file) onFile(file);
      }}
      onDragOver={(e: DragEvent) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e: DragEvent) => {
        e.preventDefault();
        setOver(false);
        const file = e.dataTransfer.files[0];
        if (file) onFile(file);
      }}
      className={`flex flex-col items-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-center outline-none transition-colors focus:border-primary-500 ${
        over ? "border-primary-500 bg-primary-50" : invalid ? "border-red-300" : "border-gray-200"
      }`}
    >
      <Icon className="h-6 w-6 text-gray-400" />
      <p className="text-sm text-gray-500">
        Drop {KIND_INFO[kind].article} here, paste one, or
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className="btn-secondary" onClick={() => inputRef.current?.click()}>
          <UploadCloud className="h-4 w-4" /> Upload from computer
        </button>
        <button type="button" className="btn-secondary" onClick={onLibrary}>
          <FolderOpen className="h-4 w-4" /> Media library
        </button>
      </div>
      <p className="text-xs text-gray-400">{KIND_INFO[kind].formats}</p>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT[kind]}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

export function ReplaceButtons({ kind, onFile, onLibrary, onRemove }: { kind: Kind; onFile: (f: File) => void; onLibrary: () => void; onRemove?: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" className="btn-secondary !px-3 !py-1.5 text-xs" onClick={() => inputRef.current?.click()}>
        <RefreshCw className="h-3.5 w-3.5" /> Replace
      </button>
      <button type="button" className="btn-secondary !px-3 !py-1.5 text-xs" onClick={onLibrary}>
        <FolderOpen className="h-3.5 w-3.5" /> Library
      </button>
      {onRemove && (
        <button type="button" className="btn-secondary !px-3 !py-1.5 text-xs text-red-600" onClick={onRemove}>
          <Trash2 className="h-3.5 w-3.5" /> Remove
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT[kind]}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

export function ImageInput({ field, value, onChange, path, errors }: FieldProps<ImageField, ImageValue | null>) {
  const id = inputId(path);
  const [picker, setPicker] = useState(false);
  const apply = (m: MediaItem) =>
    onChange({
      url: m.url,
      alt: value?.alt || m.alt || "",
      ...(m.width ? { width: m.width } : {}),
      ...(m.height ? { height: m.height } : {}),
    });
  const upload = useUpload("image", apply);
  const rec = field.recommended;
  const tooSmall = !!(rec && value?.width && value.height && (value.width < rec.width || value.height < rec.height));

  return (
    <FieldShell
      id={id}
      group
      label={field.label}
      required={field.required}
      hint={[field.hint, rec ? `Recommended size: ${rec.width} × ${rec.height}px or larger.` : ""].filter(Boolean).join(" ")}
      error={errors.get(path)}
    >
      {value ? (
        <div className="space-y-3 rounded-xl border border-gray-200 p-3">
          <div className="flex flex-wrap items-center gap-4">
            <div className="h-24 w-36 shrink-0 overflow-hidden rounded-lg bg-[repeating-conic-gradient(#f3f4f6_0_25%,#fff_0_50%)] bg-[length:16px_16px]">
              <img src={displayUrl(value.url)} alt="" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <p className="truncate text-sm font-medium text-gray-800" title={value.url}>{fileName(value.url)}</p>
              {value.width && value.height && (
                <p className={`text-xs tabular-nums ${tooSmall ? "text-amber-600" : "text-gray-400"}`}>
                  {value.width} × {value.height}px{tooSmall ? " · smaller than recommended, may look blurry" : ""}
                </p>
              )}
              <ReplaceButtons
                kind="image"
                onFile={upload.start}
                onLibrary={() => setPicker(true)}
                onRemove={field.required ? undefined : () => onChange(null)}
              />
            </div>
          </div>
          {upload.pct !== null && <Progress pct={upload.pct} />}
          <div>
            <label htmlFor={`${id}-alt`} className="text-xs font-medium text-gray-600">Alt text</label>
            <input
              id={`${id}-alt`}
              className="input mt-1"
              maxLength={300}
              value={value.alt}
              placeholder="Describe the image. Leave empty if it's decorative."
              onChange={(e) => onChange({ ...value, alt: e.target.value })}
            />
          </div>
        </div>
      ) : (
        <>
          <DropTarget kind="image" onFile={upload.start} onLibrary={() => setPicker(true)} invalid={errors.has(path)} />
          {upload.pct !== null && <Progress pct={upload.pct} />}
        </>
      )}
      <PickerModal open={picker} kind="image" onClose={() => setPicker(false)} onSelect={apply} selectedUrl={value?.url} />
    </FieldShell>
  );
}

export function VideoInput({ field, value, onChange, path, errors }: FieldProps<VideoField, VideoValue | null>) {
  const id = inputId(path);
  const [picker, setPicker] = useState<Kind | null>(null);
  const upload = useUpload("video", (m) => onChange({ url: m.url, ...(value?.poster ? { poster: value.poster } : {}) }));
  const posterUpload = useUpload("image", (m) => value && onChange({ ...value, poster: m.url }));
  const posterInput = useRef<HTMLInputElement>(null);

  return (
    <FieldShell id={id} group label={field.label} required={field.required} hint={field.hint} error={errors.get(path)}>
      {value ? (
        <div className="space-y-3 rounded-xl border border-gray-200 p-3">
          <div className="flex flex-wrap items-start gap-4">
            <video
              src={displayUrl(value.url)}
              poster={value.poster ? displayUrl(value.poster) : undefined}
              controls
              muted
              preload="metadata"
              className="h-28 w-48 shrink-0 rounded-lg bg-gray-900 object-cover"
            />
            <div className="min-w-0 flex-1 space-y-2">
              <p className="truncate text-sm font-medium text-gray-800" title={value.url}>{fileName(value.url)}</p>
              <ReplaceButtons
                kind="video"
                onFile={upload.start}
                onLibrary={() => setPicker("video")}
                onRemove={field.required ? undefined : () => onChange(null)}
              />
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                <span>Poster image:</span>
                {value.poster ? (
                  <>
                    <span className="max-w-[160px] truncate" title={value.poster}>{fileName(value.poster)}</span>
                    <button type="button" className="font-medium text-red-600 hover:underline" onClick={() => onChange({ url: value.url })}>Remove</button>
                  </>
                ) : (
                  <span className="text-gray-400">none</span>
                )}
                <button type="button" className="font-medium text-primary-600 hover:underline" onClick={() => posterInput.current?.click()}>Upload</button>
                <button type="button" className="font-medium text-primary-600 hover:underline" onClick={() => setPicker("image")}>Library</button>
                <input
                  ref={posterInput}
                  type="file"
                  accept={ACCEPT.image}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) posterUpload.start(file);
                    e.target.value = "";
                  }}
                />
              </div>
            </div>
          </div>
          {upload.pct !== null && <Progress pct={upload.pct} />}
          {posterUpload.pct !== null && <Progress pct={posterUpload.pct} />}
        </div>
      ) : (
        <>
          <DropTarget kind="video" onFile={upload.start} onLibrary={() => setPicker("video")} invalid={errors.has(path)} />
          {upload.pct !== null && <Progress pct={upload.pct} />}
        </>
      )}
      <PickerModal
        open={picker !== null}
        kind={picker ?? "video"}
        onClose={() => setPicker(null)}
        selectedUrl={picker === "image" ? value?.poster : value?.url}
        onSelect={(m) => {
          if (picker === "image") {
            if (value) onChange({ ...value, poster: m.url });
          } else {
            onChange({ url: m.url, ...(value?.poster ? { poster: value.poster } : {}) });
          }
        }}
      />
    </FieldShell>
  );
}

export function AudioInput({ field, value, onChange, path, errors }: FieldProps<AudioField, AudioValue | null>) {
  const id = inputId(path);
  const [picker, setPicker] = useState(false);
  const upload = useUpload("audio", (m) => onChange({ url: m.url }));

  return (
    <FieldShell id={id} group label={field.label} required={field.required} hint={field.hint} error={errors.get(path)}>
      {value ? (
        <div className="space-y-3 rounded-xl border border-gray-200 p-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary-50 text-primary-600">
              <Music className="h-5 w-5" />
            </span>
            <p className="min-w-0 flex-1 truncate text-sm font-medium text-gray-800" title={value.url}>{fileName(value.url)}</p>
          </div>
          <audio src={displayUrl(value.url)} controls preload="metadata" className="w-full" aria-label={`${field.label} preview`} />
          <ReplaceButtons
            kind="audio"
            onFile={upload.start}
            onLibrary={() => setPicker(true)}
            onRemove={field.required ? undefined : () => onChange(null)}
          />
          {upload.pct !== null && <Progress pct={upload.pct} />}
        </div>
      ) : (
        <>
          <DropTarget kind="audio" onFile={upload.start} onLibrary={() => setPicker(true)} invalid={errors.has(path)} />
          {upload.pct !== null && <Progress pct={upload.pct} />}
        </>
      )}
      <PickerModal open={picker} kind="audio" onClose={() => setPicker(false)} onSelect={(m) => onChange({ url: m.url })} selectedUrl={value?.url} />
    </FieldShell>
  );
}
