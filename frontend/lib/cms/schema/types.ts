export interface ImageValue {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface VideoValue {
  url: string;
  poster?: string;
}

export interface AudioValue {
  url: string;
}

export interface LinkValue {
  label: string;
  href: string;
  newTab?: boolean;
}

interface BaseField<K extends string> {
  key: K;
  label: string;
  hint?: string;
  required?: boolean;
}

export interface TextField<K extends string = string> extends BaseField<K> {
  type: "text";
  multiline?: boolean;
  maxLength?: number;
  /** Editors can wrap words in ==double equals== to show them in the accent colour. */
  highlight?: boolean;
  default?: string;
}

export interface RichTextField<K extends string = string> extends BaseField<K> {
  type: "richText";
  default?: string;
}

export interface ImageField<K extends string = string> extends BaseField<K> {
  type: "image";
  recommended?: { width: number; height: number };
  default?: ImageValue | null;
}

export interface VideoField<K extends string = string> extends BaseField<K> {
  type: "video";
  default?: VideoValue | null;
}

export interface AudioField<K extends string = string> extends BaseField<K> {
  type: "audio";
  default?: AudioValue | null;
}

export interface LinkField<K extends string = string> extends BaseField<K> {
  type: "link";
  /** With `required`, only the label is required (e.g. a menu item that just opens a dropdown). */
  optionalHref?: boolean;
  default?: LinkValue;
}

export interface IconField<K extends string = string> extends BaseField<K> {
  type: "icon";
  default?: string;
}

/** A #rrggbb colour. */
export interface ColorField<K extends string = string> extends BaseField<K> {
  type: "color";
  default?: string;
}

export interface SelectField<K extends string = string, O extends string = string> extends BaseField<K> {
  type: "select";
  options: readonly { value: O; label: string }[];
  default?: O;
}

export interface ToggleField<K extends string = string> extends BaseField<K> {
  type: "toggle";
  default?: boolean;
}

export interface NumberField<K extends string = string> extends BaseField<K> {
  type: "number";
  min?: number;
  max?: number;
  default?: number;
}

export interface ListField<K extends string = string, F extends readonly Field[] = readonly Field[]> extends BaseField<K> {
  type: "list";
  fields: F;
  min?: number;
  max?: number;
  /** Key of the item field shown as each card's title in the editor. */
  summaryKey?: string;
  itemLabel?: string;
  default?: InferFields<F>[];
}

export type Field =
  | TextField
  | RichTextField
  | ImageField
  | VideoField
  | AudioField
  | LinkField
  | IconField
  | ColorField
  | SelectField
  | ToggleField
  | NumberField
  | ListField;

export type FieldValue<F> = F extends { type: "text" | "richText" | "icon" | "color" }
  ? string
  : F extends { type: "image" }
    ? ImageValue | null
    : F extends { type: "video" }
      ? VideoValue | null
      : F extends { type: "audio" }
        ? AudioValue | null
        : F extends { type: "link" }
          ? LinkValue
          : F extends { type: "select"; options: readonly { value: infer O }[] }
            ? O
            : F extends { type: "toggle" }
              ? boolean
              : F extends { type: "number" }
                ? number
                : F extends { type: "list"; fields: infer L extends readonly Field[] }
                  ? InferFields<L>[]
                  : never;

export type InferFields<F extends readonly Field[]> = {
  [Item in F[number] as Item["key"]]: FieldValue<Item>;
};

export interface SectionDef<K extends string = string, F extends readonly Field[] = readonly Field[]> {
  key: K;
  label: string;
  description?: string;
  /** "seo" sections get a search-result preview in the editor. */
  variant?: "seo";
  fields: F;
}

export interface DocumentDef<K extends string = string, S extends readonly SectionDef[] = readonly SectionDef[]> {
  key: K;
  label: string;
  kind: "page" | "global";
  /** Site route for pages, used for "View live" links. */
  route?: string;
  sections: S;
}

export type InferDocument<D extends DocumentDef> = {
  [S in D["sections"][number] as S["key"]]: InferFields<S["fields"]>;
};

export type DocumentData = Record<string, Record<string, unknown>>;

export interface ValidationIssue {
  path: string;
  message: string;
}
