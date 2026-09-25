import type { ReactNode } from "react";

export type ErrorMap = ReadonlyMap<string, string>;

export interface FieldProps<F, V> {
  field: F;
  value: V;
  onChange: (value: V) => void;
  /** Validation path, e.g. "content.items[0].title"; also used to build input ids. */
  path: string;
  errors: ErrorMap;
}

export const inputId = (path: string) => `f-${path.replace(/[^a-zA-Z0-9_-]/g, "-")}`;

interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  aside?: ReactNode;
  children: ReactNode;
  /** Use a fieldset for groups of several controls (link, image). */
  group?: boolean;
}

export function FieldShell({ id, label, required, hint, error, aside, children, group }: FieldShellProps) {
  const labelEl = (
    <span className="flex items-baseline justify-between gap-3">
      <span className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-0.5 text-red-500" aria-hidden>*</span>}
      </span>
      {aside}
    </span>
  );
  const footer = (
    <>
      {hint && !error && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
      {error && (
        <p className="mt-1 text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
    </>
  );

  if (group) {
    return (
      <fieldset className="min-w-0">
        <legend className="mb-1 w-full">{labelEl}</legend>
        {children}
        {footer}
      </fieldset>
    );
  }
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1 block">
        {labelEl}
      </label>
      {children}
      {footer}
    </div>
  );
}

export function Counter({ length, max }: { length: number; max?: number }) {
  if (!max) return null;
  const over = length > max;
  const near = length > max * 0.9;
  return (
    <span className={`text-xs tabular-nums ${over ? "font-semibold text-red-600" : near ? "text-amber-600" : "text-gray-400"}`}>
      {length}/{max}
    </span>
  );
}
