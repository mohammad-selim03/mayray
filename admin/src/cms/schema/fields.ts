// GENERATED FILE: edit frontend/lib/cms/schema and run `pnpm cms:sync`.

import type {
  AudioField,
  DocumentDef,
  Field,
  ColorField,
  IconField,
  ImageField,
  LinkField,
  ListField,
  NumberField,
  RichTextField,
  SectionDef,
  SelectField,
  TextField,
  ToggleField,
  VideoField,
} from "./types";

type Options<F> = Omit<F, "type" | "key" | "label">;

export const text = <K extends string>(key: K, label: string, opts: Options<TextField<K>> = {}): TextField<K> => ({
  type: "text",
  key,
  label,
  ...opts,
});

export const richText = <K extends string>(key: K, label: string, opts: Options<RichTextField<K>> = {}): RichTextField<K> => ({
  type: "richText",
  key,
  label,
  ...opts,
});

export const image = <K extends string>(key: K, label: string, opts: Options<ImageField<K>> = {}): ImageField<K> => ({
  type: "image",
  key,
  label,
  ...opts,
});

export const video = <K extends string>(key: K, label: string, opts: Options<VideoField<K>> = {}): VideoField<K> => ({
  type: "video",
  key,
  label,
  ...opts,
});

export const audio = <K extends string>(key: K, label: string, opts: Options<AudioField<K>> = {}): AudioField<K> => ({
  type: "audio",
  key,
  label,
  ...opts,
});

export const link = <K extends string>(key: K, label: string, opts: Options<LinkField<K>> = {}): LinkField<K> => ({
  type: "link",
  key,
  label,
  ...opts,
});

export const icon = <K extends string>(key: K, label: string, opts: Options<IconField<K>> = {}): IconField<K> => ({
  type: "icon",
  key,
  label,
  ...opts,
});

export const color = <K extends string>(key: K, label: string, opts: Options<ColorField<K>> = {}): ColorField<K> => ({
  type: "color",
  key,
  label,
  ...opts,
});

export const select = <K extends string, const O extends string>(
  key: K,
  label: string,
  options: readonly { value: O; label: string }[],
  opts: Omit<Options<SelectField<K, O>>, "options"> = {}
): SelectField<K, O> => ({ type: "select", key, label, options, ...opts });

export const toggle = <K extends string>(key: K, label: string, opts: Options<ToggleField<K>> = {}): ToggleField<K> => ({
  type: "toggle",
  key,
  label,
  ...opts,
});

export const number = <K extends string>(key: K, label: string, opts: Options<NumberField<K>> = {}): NumberField<K> => ({
  type: "number",
  key,
  label,
  ...opts,
});

export const list = <K extends string, const F extends readonly Field[]>(
  key: K,
  label: string,
  fields: F,
  opts: Omit<Options<ListField<K, F>>, "fields"> = {}
): ListField<K, F> => ({ type: "list", key, label, fields, ...opts });

export const section = <K extends string, const F extends readonly Field[]>(
  key: K,
  label: string,
  fields: F,
  description?: string
): SectionDef<K, F> => ({ key, label, fields, description });

export const seoSection = (defaults: { title?: string; description?: string } = {}) => ({
  ...section("seo", "SEO", [
    text("title", "Page title", { maxLength: 70, hint: "Shown in search results and browser tabs. Aim for 50-60 characters.", default: defaults.title ?? "" }),
    text("description", "Meta description", { multiline: true, maxLength: 170, hint: "Aim for 120-160 characters.", default: defaults.description ?? "" }),
    image("shareImage", "Share image", { hint: "Shown when the page is shared on social media.", recommended: { width: 1200, height: 630 } }),
    toggle("noIndex", "Hide from search engines"),
  ] as const),
  variant: "seo" as const,
});

export const defineDocument = <K extends string, const S extends readonly SectionDef[]>(
  def: DocumentDef<K, S>
): DocumentDef<K, S> => def;
