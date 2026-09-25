import { useState } from "react";
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
