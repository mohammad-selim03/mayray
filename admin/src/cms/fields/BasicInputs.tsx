import { useMemo, useState } from "react";
import { Ban, ExternalLink, Search } from "lucide-react";
import Modal from "../../components/Modal";
import { CMS_ICONS } from "../icons";
import {
  ICON_NAMES,
  SITE_ROUTES,
  isIconName,
  isSafeUrl,
  isUnknownInternalPath,
  type ColorField,
  type IconField,
  type LinkField,
  type LinkValue,
  type NumberField,
  type SelectField,
  type ToggleField,
} from "../schema";
import { Counter, FieldShell, inputId, type FieldProps } from "./FieldShell";

const invalidClass = (bad: boolean) => (bad ? "border-red-300 focus:ring-red-400" : "");

export function LinkInput({ field, value, onChange, path, errors }: FieldProps<LinkField, LinkValue>) {
  const id = inputId(path);
  const href = value.href;
  const unsafe = href !== "" && !isSafeUrl(href, "link");
  const unknownPage = !unsafe && isUnknownInternalPath(href.trim());
  const known = SITE_ROUTES.find((r) => r.path === href);
  const isExternal = /^https?:\/\//i.test(href);

  return (
    <FieldShell id={`${id}-label`} group label={field.label} required={field.required} hint={field.hint} error={errors.get(path)}>
      <div className="grid gap-2 rounded-xl border border-gray-200 p-3 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-label`} className="flex justify-between text-xs font-medium text-gray-600">
            Label <Counter length={value.label.length} max={200} />
          </label>
          <input
            id={`${id}-label`}
            className="input mt-1"
            value={value.label}
            onChange={(e) => onChange({ ...value, label: e.target.value })}
            placeholder="Try now free"
          />
        </div>
        <div>
          <label htmlFor={`${id}-href`} className="text-xs font-medium text-gray-600">Goes to</label>
          <div className="mt-1 flex gap-2">
            <select
              aria-label="Pick a site page"
              className="input w-auto max-w-[45%]"
              value={known ? known.path : ""}
              onChange={(e) => e.target.value && onChange({ ...value, href: e.target.value })}
            >
              <option value="">Page…</option>
              {SITE_ROUTES.map((r) => (
                <option key={r.path} value={r.path}>{r.label}</option>
              ))}
            </select>
            <input
              id={`${id}-href`}
              className={`input font-mono text-xs ${invalidClass(unsafe)}`}
              value={href}
              onChange={(e) => onChange({ ...value, href: e.target.value })}
              placeholder="/contact or https://…"
              aria-invalid={unsafe || undefined}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 sm:col-span-2">
          <label className="inline-flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
              checked={!!value.newTab}
              onChange={(e) => onChange(e.target.checked ? { ...value, newTab: true } : { label: value.label, href: value.href })}
            />
            Open in a new tab
          </label>
          {isExternal && !unsafe && (
            <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:underline">
              Test link <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
        {unsafe && <p className="text-xs text-red-600 sm:col-span-2">Use a page path like /contact, a #section, or a full https:// address.</p>}
        {unknownPage && <p className="text-xs text-amber-600 sm:col-span-2">No site page matches {href.trim()}. Check for a typo.</p>}
      </div>
    </FieldShell>
  );
}

export function IconInput({ field, value, onChange, path, errors }: FieldProps<IconField, string>) {
  const id = inputId(path);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const Current = isIconName(value) ? CMS_ICONS[value] : null;
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ICON_NAMES.filter((n) => !q || n.toLowerCase().includes(q));
  }, [query]);

  return (
    <FieldShell id={id} label={field.label} required={field.required} hint={field.hint} error={errors.get(path)}>
      <button
        id={id}
        type="button"
        onClick={() => setOpen(true)}
        className={`flex w-full items-center gap-3 rounded-lg border bg-white px-3 py-2 text-left text-sm hover:border-gray-300 ${errors.has(path) ? "border-red-300" : "border-gray-200"}`}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
          {Current ? <Current className="h-4 w-4" /> : <Ban className="h-4 w-4 text-gray-300" />}
        </span>
        <span className={value ? "text-gray-800" : "text-gray-400"}>{value || "No icon"}</span>
        <span className="ml-auto text-xs font-medium text-primary-600">Change</span>
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Choose an icon" size="lg">
        <label className="relative mb-4 block">
          <span className="sr-only">Search icons</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input autoFocus className="input pl-9" placeholder="Search icons, e.g. phone, calendar, chart" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <ul className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {!field.required && (
            <li>
              <button
                type="button"
                onClick={() => { onChange(""); setOpen(false); }}
                className={`flex w-full flex-col items-center gap-1 rounded-lg border p-2 text-[11px] hover:border-primary-500 ${value === "" ? "border-primary-500 bg-primary-50" : "border-gray-100"}`}
              >
                <Ban className="h-5 w-5 text-gray-300" /> None
              </button>
            </li>
          )}
          {matches.map((name) => {
            const Icon = CMS_ICONS[name];
            return (
              <li key={name}>
                <button
                  type="button"
                  title={name}
                  onClick={() => { onChange(name); setOpen(false); }}
                  className={`flex w-full flex-col items-center gap-1 rounded-lg border p-2 text-[11px] text-gray-600 hover:border-primary-500 hover:text-primary-600 ${value === name ? "border-primary-500 bg-primary-50 text-primary-600" : "border-gray-100"}`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="w-full truncate text-center">{name}</span>
                </button>
              </li>
            );
          })}
        </ul>
        {matches.length === 0 && <p className="py-6 text-center text-sm text-gray-400">No icons match "{query}".</p>}
      </Modal>
    </FieldShell>
  );
}

export function SelectInput({ field, value, onChange, path, errors }: FieldProps<SelectField, string>) {
  const id = inputId(path);
  return (
    <FieldShell id={id} label={field.label} required={field.required} hint={field.hint} error={errors.get(path)}>
      <select id={id} className="input" value={value} onChange={(e) => onChange(e.target.value)}>
        {field.options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </FieldShell>
  );
}

export function ToggleInput({ field, value, onChange, path }: FieldProps<ToggleField, boolean>) {
  const id = inputId(path);
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <label htmlFor={id} className="text-sm font-medium text-gray-700">{field.label}</label>
        {field.hint && <p className="text-xs text-gray-400">{field.hint}</p>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${value ? "bg-primary-500" : "bg-gray-200"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-[left] ${value ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}

export function NumberInput({ field, value, onChange, path, errors }: FieldProps<NumberField, number>) {
  const id = inputId(path);
  return (
    <FieldShell id={id} label={field.label} required={field.required} hint={field.hint} error={errors.get(path)}>
      <input
        id={id}
        type="number"
        className={`input max-w-[160px] tabular-nums ${invalidClass(errors.has(path))}`}
        value={Number.isFinite(value) ? value : ""}
        min={field.min}
        max={field.max}
        onChange={(e) => onChange(e.target.value === "" ? NaN : Number(e.target.value))}
      />
    </FieldShell>
  );
}

const HEX = /^#[0-9a-fA-F]{6}$/;

export function ColorInput({ field, value, onChange, path, errors }: FieldProps<ColorField, string>) {
  const id = inputId(path);
  const valid = HEX.test(value);
  return (
    <FieldShell id={id} label={field.label} required={field.required} hint={field.hint} error={errors.get(path)}>
      <div className="flex items-center gap-2">
        <input
          type="color"
          aria-label={`${field.label} picker`}
          value={valid ? value : "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-12 cursor-pointer rounded-lg border border-gray-200 bg-white p-1"
        />
        <input
          id={id}
          className={`input max-w-[140px] font-mono uppercase ${invalidClass(!valid)}`}
          value={value}
          maxLength={7}
          onChange={(e) => onChange(e.target.value.startsWith("#") ? e.target.value : `#${e.target.value}`)}
          aria-invalid={!valid || undefined}
        />
      </div>
    </FieldShell>
  );
}
