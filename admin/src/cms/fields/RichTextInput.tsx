import { useEffect, useState, type ReactNode } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold, Heading2, Heading3, ImagePlus, Italic, Link2, List, ListOrdered, Minus, Quote, Redo2, Undo2, Unlink,
} from "lucide-react";
import Modal from "../../components/Modal";
import MediaBrowser from "../components/MediaBrowser";
import { isSafeUrl, type RichTextField } from "../schema";
import { FieldShell, inputId, type FieldProps } from "./FieldShell";

function ToolButton({ label, active, disabled, onClick, children }: { label: string; active?: boolean; disabled?: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`rounded-md p-1.5 transition-colors disabled:opacity-30 ${active ? "bg-primary-50 text-primary-600" : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"}`}
    >
      {children}
    </button>
  );
}

function LinkDialog({ editor, open, onClose }: { editor: Editor; open: boolean; onClose: () => void }) {
  const [href, setHref] = useState("");
  const [newTab, setNewTab] = useState(false);
  const invalid = href.trim() !== "" && !isSafeUrl(href.trim(), "link");

  useEffect(() => {
    if (open) {
      const attrs = editor.getAttributes("link");
      setHref(attrs.href ?? "");
      setNewTab(attrs.target === "_blank");
    }
  }, [open, editor]);

  const apply = () => {
    const url = href.trim();
    if (invalid) return;
    const chain = editor.chain().focus().extendMarkRange("link");
    if (!url) chain.unsetLink().run();
    else chain.setLink({ href: url, target: newTab ? "_blank" : null }).run();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Link" size="sm">
      <form onSubmit={(e) => { e.preventDefault(); apply(); }} className="space-y-3">
        <div>
          <label className="label" htmlFor="rt-link-href">Address</label>
          <input id="rt-link-href" autoFocus className="input font-mono text-xs" value={href} onChange={(e) => setHref(e.target.value)} placeholder="/contact or https://…" />
          {invalid && <p className="mt-1 text-xs text-red-600">Use a page path like /contact, a #section, or a full https:// address.</p>}
        </div>
        <label className="inline-flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary-500" checked={newTab} onChange={(e) => setNewTab(e.target.checked)} />
          Open in a new tab
        </label>
        <div className="flex justify-end gap-2">
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary" disabled={invalid}>{href.trim() ? "Apply" : "Remove link"}</button>
        </div>
      </form>
    </Modal>
  );
}

export default function RichTextInput({ field, value, onChange, path, errors }: FieldProps<RichTextField, string>) {
  const id = inputId(path);
  const [linkOpen, setLinkOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] }, code: false, codeBlock: false }),
      Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: "noopener noreferrer" } }),
      Image,
      Placeholder.configure({ placeholder: "Start writing…" }),
    ],
    content: value,
    editorProps: { attributes: { id, class: "cms-prose min-h-[220px] px-4 py-3 focus:outline-none", "aria-label": field.label } },
    onUpdate: ({ editor: e }) => onChange(e.isEmpty ? "" : e.getHTML()),
  });

  // Follow outside changes (reset to default, restore) without disturbing typing.
  useEffect(() => {
    if (!editor) return;
    const current = editor.isEmpty ? "" : editor.getHTML();
    if (value !== current) editor.commands.setContent(value, false);
  }, [value, editor]);

  if (!editor) return null;
  const is = (name: string, attrs?: Record<string, unknown>) => editor.isActive(name, attrs);
  const run = () => editor.chain().focus();

  return (
    <FieldShell id={id} label={field.label} required={field.required} hint={field.hint} error={errors.get(path)}>
      <div className={`overflow-hidden rounded-lg border bg-white focus-within:ring-2 focus-within:ring-primary-500 ${errors.has(path) ? "border-red-300" : "border-gray-200"}`}>
        <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-100 bg-gray-50 px-2 py-1">
          <ToolButton label="Heading" active={is("heading", { level: 2 })} onClick={() => run().toggleHeading({ level: 2 }).run()}><Heading2 className="h-4 w-4" /></ToolButton>
          <ToolButton label="Subheading" active={is("heading", { level: 3 })} onClick={() => run().toggleHeading({ level: 3 }).run()}><Heading3 className="h-4 w-4" /></ToolButton>
          <span className="mx-1 h-5 w-px bg-gray-200" />
          <ToolButton label="Bold" active={is("bold")} onClick={() => run().toggleBold().run()}><Bold className="h-4 w-4" /></ToolButton>
          <ToolButton label="Italic" active={is("italic")} onClick={() => run().toggleItalic().run()}><Italic className="h-4 w-4" /></ToolButton>
          <ToolButton label="Link" active={is("link")} onClick={() => setLinkOpen(true)}><Link2 className="h-4 w-4" /></ToolButton>
          {is("link") && <ToolButton label="Remove link" onClick={() => run().extendMarkRange("link").unsetLink().run()}><Unlink className="h-4 w-4" /></ToolButton>}
          <span className="mx-1 h-5 w-px bg-gray-200" />
          <ToolButton label="Bulleted list" active={is("bulletList")} onClick={() => run().toggleBulletList().run()}><List className="h-4 w-4" /></ToolButton>
          <ToolButton label="Numbered list" active={is("orderedList")} onClick={() => run().toggleOrderedList().run()}><ListOrdered className="h-4 w-4" /></ToolButton>
          <ToolButton label="Quote" active={is("blockquote")} onClick={() => run().toggleBlockquote().run()}><Quote className="h-4 w-4" /></ToolButton>
          <ToolButton label="Divider" onClick={() => run().setHorizontalRule().run()}><Minus className="h-4 w-4" /></ToolButton>
          <ToolButton label="Image" onClick={() => setImageOpen(true)}><ImagePlus className="h-4 w-4" /></ToolButton>
          <span className="ml-auto flex">
            <ToolButton label="Undo" disabled={!editor.can().undo()} onClick={() => run().undo().run()}><Undo2 className="h-4 w-4" /></ToolButton>
            <ToolButton label="Redo" disabled={!editor.can().redo()} onClick={() => run().redo().run()}><Redo2 className="h-4 w-4" /></ToolButton>
          </span>
        </div>
        <EditorContent editor={editor} />
      </div>
      <LinkDialog editor={editor} open={linkOpen} onClose={() => setLinkOpen(false)} />
      <Modal open={imageOpen} onClose={() => setImageOpen(false)} title="Insert an image" size="xl">
        {imageOpen && (
          <MediaBrowser
            kind="image"
            onSelect={(m) => {
              editor.chain().focus().setImage({ src: m.url, alt: m.alt }).run();
              setImageOpen(false);
            }}
          />
        )}
      </Modal>
    </FieldShell>
  );
}
