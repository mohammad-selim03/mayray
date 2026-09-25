import { ArrowDown, ArrowUp, Plus, X } from "lucide-react";

interface StringListFieldProps {
  id: string;
  label: string;
  value: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  hint?: string;
  itemLabel?: string;
}

/** Edit a list of short texts (bullet points, codes) without typing JSON. */
export function StringListField({ id, label, value, onChange, placeholder, hint, itemLabel = "item" }: StringListFieldProps) {
  const update = (i: number, text: string) => onChange(value.map((v, j) => (j === i ? text : v)));
  const move = (from: number, to: number) => {
    const next = [...value];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  return (
    <fieldset id={id} className="min-w-0">
      <legend className="label">{label}</legend>
      <ul className="space-y-2">
        {value.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <input
              className="input"
              value={item}
              placeholder={placeholder}
              aria-label={`${label} ${i + 1}`}
              onChange={(e) => update(i, e.target.value)}
            />
            <button type="button" disabled={i === 0} onClick={() => move(i, i - 1)} className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 disabled:opacity-30" aria-label="Move up">
              <ArrowUp className="h-4 w-4" />
            </button>
            <button type="button" disabled={i === value.length - 1} onClick={() => move(i, i + 1)} className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 disabled:opacity-30" aria-label="Move down">
              <ArrowDown className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600" aria-label={`Remove ${itemLabel}`}>
              <X className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => onChange([...value, ""])} className="mt-2 inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-primary-600 hover:bg-primary-50">
        <Plus className="h-4 w-4" /> Add {itemLabel}
      </button>
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </fieldset>
  );
}

/** Settings store lists as JSON text; read them leniently so a malformed value doesn't break the form. */
export function parseJsonList(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw !== "string" || !raw.trim()) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}
