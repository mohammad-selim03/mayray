import { useRef } from "react";
import { Highlighter } from "lucide-react";
import type { TextField } from "../schema";
import { Counter, FieldShell, inputId, type FieldProps } from "./FieldShell";

const HAS_HIGHLIGHT = /==.+?==/;

function HighlightPreview({ value }: { value: string }) {
  if (!HAS_HIGHLIGHT.test(value)) return null;
  const parts = value.split(/(==.+?==)/g);
  return (
    <p className="mt-1.5 rounded-md bg-gray-50 px-2.5 py-1.5 text-sm text-gray-700">
      <span className="mr-1.5 text-xs text-gray-400">Preview:</span>
      {parts.map((p, i) =>
        p.startsWith("==") && p.endsWith("==") ? (
          <span key={i} className="font-medium text-primary-600">{p.slice(2, -2)}</span>
        ) : (
          <span key={i} className="whitespace-pre-line">{p}</span>
        )
      )}
    </p>
  );
}

export default function TextInput({ field, value, onChange, path, errors }: FieldProps<TextField, string>) {
  const id = inputId(path);
  const ref = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  const highlightSelection = () => {
    const el = ref.current;
    if (!el) return;
    const { selectionStart: start, selectionEnd: end } = el;
    if (start === null || end === null || start === end) return;
    const selected = value.slice(start, end);
    const next = selected.startsWith("==") && selected.endsWith("==")
      ? value.slice(0, start) + selected.slice(2, -2) + value.slice(end)
      : value.slice(0, start) + `==${selected}==` + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => el.focus());
  };

  const common = {
    id,
    ref,
    value,
    className: `input ${errors.get(path) ? "border-red-300 focus:ring-red-400" : ""}`,
    "aria-invalid": errors.has(path) || undefined,
    onChange: (e: { target: { value: string } }) => onChange(e.target.value),
  };

  return (
    <FieldShell
      id={id}
      label={field.label}
      required={field.required}
      hint={field.hint ?? (field.highlight ? "Select words and press Highlight to show them in blue." : undefined)}
      error={errors.get(path)}
      aside={
        <span className="flex items-center gap-2">
          {field.highlight && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={highlightSelection}
              className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium text-primary-600 hover:bg-primary-50"
            >
              <Highlighter className="h-3.5 w-3.5" /> Highlight
            </button>
          )}
          <Counter length={value.length} max={field.maxLength} />
        </span>
      }
    >
      {field.multiline ? (
        <textarea {...common} rows={Math.min(10, Math.max(2, value.split("\n").length + 1))} className={`${common.className} resize-y`} />
      ) : (
        <input {...common} type="text" />
      )}
      {field.highlight && <HighlightPreview value={value} />}
    </FieldShell>
  );
}
