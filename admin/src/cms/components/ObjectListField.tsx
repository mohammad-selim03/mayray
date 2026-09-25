import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

type Item = Record<string, string>;

interface ObjectListFieldProps {
  id: string;
  label: string;
  fields: { key: string; label: string; multiline?: boolean }[];
  value: Item[];
  onChange: (items: Item[]) => void;
  itemLabel?: string;
  hint?: string;
}

/** Edit a list of small records (e.g. policy sections with a title and text) without typing JSON. */
export function ObjectListField({ id, label, fields, value, onChange, itemLabel = "item", hint }: ObjectListFieldProps) {
  const update = (i: number, key: string, text: string) => onChange(value.map((v, j) => (j === i ? { ...v, [key]: text } : v)));
  const move = (from: number, to: number) => {
    const next = [...value];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };
  const blank = () => Object.fromEntries(fields.map((f) => [f.key, ""]));

  return (
    <fieldset id={id} className="min-w-0">
      <legend className="label">{label}</legend>
      {hint && <p className="mb-2 text-xs text-gray-400">{hint}</p>}
      <ol className="space-y-3">
        {value.map((item, i) => (
          <li key={i} className="rounded-xl border border-gray-200 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                {itemLabel} {i + 1}
              </span>
              <span className="flex gap-1">
                <button type="button" disabled={i === 0} onClick={() => move(i, i - 1)} className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 disabled:opacity-30" aria-label="Move up">
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button type="button" disabled={i === value.length - 1} onClick={() => move(i, i + 1)} className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 disabled:opacity-30" aria-label="Move down">
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600" aria-label={`Remove ${itemLabel} ${i + 1}`}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </span>
            </div>
            <div className="space-y-2">
              {fields.map((f) => {
                const fieldId = `${id}-${i}-${f.key}`;
                return (
                  <div key={f.key}>
                    <label htmlFor={fieldId} className="text-xs font-medium text-gray-600">{f.label}</label>
                    {f.multiline ? (
                      <textarea id={fieldId} className="input mt-1 resize-y" rows={4} value={item[f.key] ?? ""} onChange={(e) => update(i, f.key, e.target.value)} />
                    ) : (
                      <input id={fieldId} className="input mt-1" value={item[f.key] ?? ""} onChange={(e) => update(i, f.key, e.target.value)} />
                    )}
                  </div>
                );
              })}
            </div>
          </li>
        ))}
      </ol>
      <button type="button" onClick={() => onChange([...value, blank()])} className="mt-2 inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-primary-600 hover:bg-primary-50">
        <Plus className="h-4 w-4" /> Add {itemLabel}
      </button>
    </fieldset>
  );
}

export function parseJsonObjects(raw: unknown): Item[] {
  if (typeof raw !== "string" || !raw.trim()) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((x) => x && typeof x === "object").map((x) => Object.fromEntries(Object.entries(x).map(([k, v]) => [k, String(v ?? "")])))
      : [];
  } catch {
    return [];
  }
}
