// GENERATED FILE: edit frontend/lib/cms and run `pnpm cms:sync`.

import type { DocumentData, DocumentDef, Field, ValidationIssue } from "./types";
import { isIconName } from "./icons";

export interface ValidateOptions {
  /** Server-side HTML cleaner for rich text; the site passes nothing and trusts stored HTML. */
  sanitizeRichText?: (html: string) => string;
}

const clone = <T>(value: T): T => (value === undefined ? value : JSON.parse(JSON.stringify(value)));

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export function fieldDefault(field: Field): unknown {
  switch (field.type) {
    case "text":
    case "richText":
    case "icon":
      return field.default ?? "";
    case "image":
    case "video":
    case "audio":
      return clone(field.default ?? null);
    case "link":
      return clone(field.default ?? { label: "", href: "" });
    case "select":
      return field.default ?? field.options[0]?.value ?? "";
    case "toggle":
      return field.default ?? false;
    case "number":
      return field.default ?? field.min ?? 0;
    case "list":
      return clone(field.default ?? []);
    case "color":
      return field.default ?? "#18181b";
  }
}

export function fieldsDefaults(fields: readonly Field[]): Record<string, unknown> {
  return Object.fromEntries(fields.map((f) => [f.key, fieldDefault(f)]));
}

export function documentDefaults(def: DocumentDef): DocumentData {
  return Object.fromEntries(def.sections.map((s) => [s.key, fieldsDefaults(s.fields)]));
}

const UNSAFE_CHARS = /[\u0000-\u001f\u007f\s]/;

/** Site-relative paths, in-page anchors, and http(s) URLs; links may also use mailto: and tel:. */
export function isSafeUrl(url: string, kind: "asset" | "link"): boolean {
  const value = url.trim();
  if (!value) return true;
  if (UNSAFE_CHARS.test(value)) return false;
  if (value.startsWith("#")) return kind === "link";
  if (value.startsWith("/")) return !value.startsWith("//");
  try {
    const { protocol } = new URL(value);
    if (protocol === "http:" || protocol === "https:") return true;
    return kind === "link" && (protocol === "mailto:" || protocol === "tel:");
  } catch {
    return false;
  }
}

const TEXT_MAX = 500;
const MULTILINE_MAX = 10_000;
const RICH_TEXT_MAX = 200_000;
const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;

function validateValue(
  field: Field,
  value: unknown,
  path: string,
  issues: ValidationIssue[],
  opts: ValidateOptions
): unknown {
  const fail = (message: string) => {
    issues.push({ path, message: `${field.label}: ${message}` });
    return fieldDefault(field);
  };
  if (value === undefined) {
    if (field.required) return fail("is required");
    return fieldDefault(field);
  }

  switch (field.type) {
    case "text": {
      if (typeof value !== "string") return fail("must be text");
      const max = field.maxLength ?? (field.multiline ? MULTILINE_MAX : TEXT_MAX);
      if (value.length > max) return fail(`must be ${max} characters or fewer`);
      if (field.required && !value.trim()) return fail("is required");
      return value;
    }
    case "richText": {
      if (typeof value !== "string") return fail("must be text");
      if (value.length > RICH_TEXT_MAX) return fail("is too long");
      const html = opts.sanitizeRichText ? opts.sanitizeRichText(value) : value;
      if (field.required && !html.replace(/<[^>]*>/g, "").trim()) return fail("is required");
      return html;
    }
    case "icon": {
      if (typeof value !== "string" || (value !== "" && !isIconName(value))) return fail("must be one of the available icons");
      if (field.required && !value) return fail("is required");
      return value;
    }
    case "image":
    case "video":
    case "audio": {
      if (value === null) return field.required ? fail("is required") : null;
      if (!isRecord(value) || typeof value.url !== "string") return fail("must be a file");
      if (!value.url.trim()) return field.required ? fail("is required") : null;
      if (!isSafeUrl(value.url, "asset")) return fail("has an invalid address");
      if (field.type === "audio") return { url: value.url };
      if (field.type === "video") {
        const poster = value.poster;
        if (poster !== undefined && (typeof poster !== "string" || !isSafeUrl(poster, "asset"))) {
          return fail("has an invalid poster image");
        }
        return poster ? { url: value.url, poster } : { url: value.url };
      }
      const alt = value.alt ?? "";
      if (typeof alt !== "string" || alt.length > 300) return fail("alt text must be 300 characters or fewer");
      const out: Record<string, unknown> = { url: value.url, alt };
      for (const dim of ["width", "height"] as const) {
        const n = value[dim];
        if (n !== undefined) {
          if (typeof n !== "number" || !Number.isInteger(n) || n <= 0) return fail(`has an invalid ${dim}`);
          out[dim] = n;
        }
      }
      return out;
    }
    case "link": {
      if (!isRecord(value)) return fail("must be a link");
      const { label = "", href = "", newTab } = value;
      if (typeof label !== "string" || label.length > 200) return fail("label must be 200 characters or fewer");
      if (typeof href !== "string" || !isSafeUrl(href, "link")) return fail("has an invalid address");
      if (field.required && !label.trim()) return fail(field.optionalHref ? "needs a label" : "needs a label and an address");
      if (field.required && !field.optionalHref && !href.trim()) return fail("needs a label and an address");
      return newTab === true ? { label, href: href.trim(), newTab: true } : { label, href: href.trim() };
    }
    case "color": {
      if (typeof value !== "string" || !HEX_COLOR.test(value)) return fail("must be a colour like #13a0e7");
      return value.toLowerCase();
    }
    case "select": {
      if (!field.options.some((o) => o.value === value)) return fail("must be one of the listed options");
      return value;
    }
    case "toggle": {
      if (typeof value !== "boolean") return fail("must be on or off");
      return value;
    }
    case "number": {
      if (typeof value !== "number" || !Number.isFinite(value)) return fail("must be a number");
      if (field.min !== undefined && value < field.min) return fail(`must be at least ${field.min}`);
      if (field.max !== undefined && value > field.max) return fail(`must be at most ${field.max}`);
      return value;
    }
    case "list": {
      if (!Array.isArray(value)) return fail("must be a list");
      if (field.min !== undefined && value.length < field.min) return fail(`needs at least ${field.min} items`);
      if (field.max !== undefined && value.length > field.max) return fail(`allows at most ${field.max} items`);
      return value.map((item, i) => validateFields(field.fields, item, `${path}[${i}]`, issues, opts));
    }
  }
}

export function validateFields(
  fields: readonly Field[],
  input: unknown,
  path: string,
  issues: ValidationIssue[],
  opts: ValidateOptions = {}
): Record<string, unknown> {
  const source = isRecord(input) ? input : {};
  if (input !== undefined && !isRecord(input)) issues.push({ path, message: "Expected a group of fields" });
  return Object.fromEntries(
    fields.map((f) => [f.key, validateValue(f, source[f.key], path ? `${path}.${f.key}` : f.key, issues, opts)])
  );
}

/**
 * Returns a complete document for `def`: unknown keys are dropped, and missing or invalid
 * values fall back to the field default. `issues` lists every value that was rejected.
 */
export function validateDocument(
  def: DocumentDef,
  input: unknown,
  opts: ValidateOptions = {}
): { data: DocumentData; issues: ValidationIssue[] } {
  const issues: ValidationIssue[] = [];
  const source = isRecord(input) ? input : {};
  if (input !== undefined && input !== null && !isRecord(input)) issues.push({ path: "", message: "Expected a document" });
  const data = Object.fromEntries(
    def.sections.map((s) => [s.key, validateFields(s.fields, source[s.key], s.key, issues, opts)])
  ) as DocumentData;
  return { data, issues };
}
