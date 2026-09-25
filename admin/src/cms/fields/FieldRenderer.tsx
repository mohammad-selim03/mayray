import { useRef, useState, type ReactNode } from "react";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronRight, Copy, GripVertical, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { CMS_ICONS } from "../icons";
import { fieldsDefaults, isIconName, type AudioValue, type Field, type ImageValue, type LinkValue, type ListField, type VideoValue } from "../schema";
import { ColorInput, IconInput, LinkInput, NumberInput, SelectInput, ToggleInput } from "./BasicInputs";
import { AudioInput, ImageInput, VideoInput } from "./MediaInputs";
import RichTextInput from "./RichTextInput";
import TextInput from "./TextInput";
import type { ErrorMap, FieldProps } from "./FieldShell";

type Item = Record<string, unknown>;

let idSeed = 0;
const newId = () => `item-${++idSeed}`;
const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v));

export function hasErrorsUnder(errors: ErrorMap, prefix: string) {
  for (const key of errors.keys()) if (key === prefix || key.startsWith(`${prefix}.`) || key.startsWith(`${prefix}[`)) return true;
  return false;
}

function itemSummary(field: ListField, item: Item, index: number): string {
  const fallback = `${field.itemLabel ?? "Item"} ${index + 1}`;
  const pick = (f: Field | undefined): string => {
    if (!f) return "";
    const v = item[f.key];
    if (f.type === "select") return f.options.find((o) => o.value === v)?.label ?? String(v ?? "");
    if (typeof v === "string") return f.type === "richText" ? v.replace(/<[^>]*>/g, " ") : v;
    if (v && typeof v === "object" && "label" in v) return String((v as { label: unknown }).label ?? "");
    if (v && typeof v === "object" && "url" in v) return String((v as { url: string }).url).split("/").pop() ?? "";
    return "";
  };
  const chosen = field.summaryKey ? field.fields.find((f) => f.key === field.summaryKey) : field.fields.find((f) => f.type === "text");
  return pick(chosen).replace(/==/g, "").replace(/\s+/g, " ").trim() || fallback;
}

function SortableCard({ id, children }: { id: string; children: (handle: ReactNode) => ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const handle = (
    <button
      type="button"
      {...attributes}
      {...listeners}
      aria-label="Drag to reorder"
      className="cursor-grab touch-none rounded p-1 text-gray-300 hover:text-gray-500 active:cursor-grabbing"
    >
      <GripVertical className="h-4 w-4" />
    </button>
  );
  return (
    <li ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className={isDragging ? "relative z-10 opacity-70" : ""}>
      {children(handle)}
    </li>
  );
}

function ListInput({ field, value, onChange, path, errors }: FieldProps<ListField, Item[]>) {
  const [ids, setIds] = useState<string[]>(() => value.map(newId));
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  // Undo runs seconds later, so it must use the newest value and change handler, not the ones captured at delete time.
  const latest = useRef({ value, ids, onChange });
  latest.current = { value, ids, onChange };

  let currentIds = ids;
  if (ids.length !== value.length) {
    currentIds = value.map(newId);
    setIds(currentIds);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const canAdd = field.max === undefined || value.length < field.max;
  const canRemove = field.min === undefined || value.length > field.min;
  const label = field.itemLabel ?? "item";

  const commit = (nextValue: Item[], nextIds: string[]) => {
    setIds(nextIds);
    latest.current.onChange(nextValue);
  };
  const toggle = (id: string) =>
    setExpanded((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const add = () => {
    const id = newId();
    commit([...value, fieldsDefaults(field.fields)], [...currentIds, id]);
    setExpanded((s) => new Set(s).add(id));
  };
  const duplicate = (i: number) => {
    const id = newId();
    commit([...value.slice(0, i + 1), clone(value[i]), ...value.slice(i + 1)], [...currentIds.slice(0, i + 1), id, ...currentIds.slice(i + 1)]);
    setExpanded((s) => new Set(s).add(id));
  };
  const remove = (i: number) => {
    const removed = value[i];
    const removedId = currentIds[i];
    const name = itemSummary(field, removed, i);
    commit(value.filter((_, j) => j !== i), currentIds.filter((_, j) => j !== i));
    toast(
      (t) => (
        <span className="flex items-center gap-3 text-sm">
          Removed “{name.length > 40 ? `${name.slice(0, 40)}…` : name}”
          <button
            type="button"
            className="font-semibold text-primary-600"
            onClick={() => {
              const { value: v, ids: cur } = latest.current;
              const at = Math.min(i, v.length);
              commit([...v.slice(0, at), removed, ...v.slice(at)], [...cur.slice(0, at), removedId, ...cur.slice(at)]);
              toast.dismiss(t.id);
            }}
          >
            Undo
          </button>
        </span>
      ),
      { duration: 5000 }
    );
  };
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const from = currentIds.indexOf(String(active.id));
    const to = currentIds.indexOf(String(over.id));
    commit(arrayMove(value, from, to), arrayMove(currentIds, from, to));
  };

  const allOpen = currentIds.length > 0 && currentIds.every((id) => expanded.has(id));
  const iconField = field.fields.find((f) => f.type === "icon");

  return (
    <fieldset className="min-w-0">
      <legend className="mb-1 flex w-full items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-gray-700">
          {field.label}
          {field.required && <span className="ml-0.5 text-red-500" aria-hidden>*</span>}
        </span>
        <span className="flex items-center gap-3 text-xs text-gray-400">
          <span className="tabular-nums">
            {value.length}
            {field.max !== undefined ? ` of max ${field.max}` : ""}
            {field.min ? ` · min ${field.min}` : ""}
          </span>
          {value.length > 1 && (
            <button type="button" className="font-medium text-primary-600 hover:underline" onClick={() => setExpanded(allOpen ? new Set() : new Set(currentIds))}>
              {allOpen ? "Collapse all" : "Expand all"}
            </button>
          )}
        </span>
      </legend>
      {field.hint && <p className="mb-2 text-xs text-gray-400">{field.hint}</p>}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={currentIds} strategy={verticalListSortingStrategy}>
          <ul className="space-y-2">
            {value.map((item, i) => {
              const id = currentIds[i];
              const itemPath = `${path}[${i}]`;
              const open = expanded.has(id);
              const bad = hasErrorsUnder(errors, itemPath);
              const iconName = iconField ? item[iconField.key] : undefined;
              const ItemIcon = typeof iconName === "string" && isIconName(iconName) ? CMS_ICONS[iconName] : null;
              return (
                <SortableCard key={id} id={id}>
                  {(handle) => (
                    <div className={`rounded-xl border bg-white ${bad ? "border-red-300" : "border-gray-200"}`}>
                      <div className="flex items-center gap-1.5 px-2 py-1.5">
                        {handle}
                        <button
                          type="button"
                          onClick={() => toggle(id)}
                          aria-expanded={open}
                          className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-1 py-1 text-left text-sm hover:bg-gray-50"
                        >
                          <ChevronRight className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${open ? "rotate-90" : ""}`} />
                          {ItemIcon && <ItemIcon className="h-4 w-4 shrink-0 text-primary-500" />}
                          <span className="truncate font-medium text-gray-800">{itemSummary(field, item, i)}</span>
                          {bad && <span className="ml-1 h-2 w-2 shrink-0 rounded-full bg-red-500" aria-label="Has errors" />}
                        </button>
                        <button type="button" disabled={!canAdd} onClick={() => duplicate(i)} className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30" aria-label={`Duplicate ${label}`} title="Duplicate">
                          <Copy className="h-4 w-4" />
                        </button>
                        <button type="button" disabled={!canRemove} onClick={() => remove(i)} className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-30" aria-label={`Delete ${label}`} title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      {open && (
                        <div className="border-t border-gray-100 p-3">
                          <FieldGroup
                            fields={field.fields}
                            values={item}
                            path={itemPath}
                            errors={errors}
                            onChange={(next) => onChange(value.map((v, j) => (j === i ? next : v)))}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </SortableCard>
              );
            })}
          </ul>
        </SortableContext>
      </DndContext>

      {value.length === 0 && <p className="rounded-xl border border-dashed border-gray-200 py-4 text-center text-sm text-gray-400">No {label}s yet.</p>}
      {errors.get(path) && <p className="mt-1 text-xs font-medium text-red-600" role="alert">{errors.get(path)}</p>}
      <button type="button" onClick={add} disabled={!canAdd} className="mt-2 inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-primary-600 hover:bg-primary-50 disabled:text-gray-300 disabled:hover:bg-transparent">
        <Plus className="h-4 w-4" /> Add {label}
      </button>
      {!canAdd && <span className="ml-2 text-xs text-gray-400">The design allows {field.max}.</span>}
    </fieldset>
  );
}

/** The switch narrows `field`; validateDocument guarantees the matching value shape, so widen it here once. */
function as<V>({ value, onChange, path, errors }: FieldProps<Field, unknown>) {
  return { value: value as V, onChange: onChange as (v: V) => void, path, errors };
}

export function FieldRenderer(props: FieldProps<Field, unknown>) {
  const { field } = props;
  switch (field.type) {
    case "text": return <TextInput {...as<string>(props)} field={field} />;
    case "richText": return <RichTextInput {...as<string>(props)} field={field} />;
    case "image": return <ImageInput {...as<ImageValue | null>(props)} field={field} />;
    case "video": return <VideoInput {...as<VideoValue | null>(props)} field={field} />;
    case "audio": return <AudioInput {...as<AudioValue | null>(props)} field={field} />;
    case "link": return <LinkInput {...as<LinkValue>(props)} field={field} />;
    case "icon": return <IconInput {...as<string>(props)} field={field} />;
    case "color": return <ColorInput {...as<string>(props)} field={field} />;
    case "select": return <SelectInput {...as<string>(props)} field={field} />;
    case "toggle": return <ToggleInput {...as<boolean>(props)} field={field} />;
    case "number": return <NumberInput {...as<number>(props)} field={field} />;
    case "list": return <ListInput {...as<Item[]>(props)} field={field} />;
  }
}

export function FieldGroup({ fields, values, onChange, path, errors }: {
  fields: readonly Field[];
  values: Item;
  onChange: (next: Item) => void;
  path: string;
  errors: ErrorMap;
}) {
  return (
    <div className="space-y-5">
      {fields.map((f) => (
        <FieldRenderer
          key={f.key}
          field={f}
          value={values[f.key]}
          path={`${path}.${f.key}`}
          errors={errors}
          onChange={(v) => onChange({ ...values, [f.key]: v })}
        />
      ))}
    </div>
  );
}
