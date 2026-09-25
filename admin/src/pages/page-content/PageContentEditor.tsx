import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pageContentApi } from "../../services/api";
import toast from "react-hot-toast";
import { Save, Plus, Trash2, GripVertical } from "lucide-react";
import { PageContentItem } from "../../types";
import { MediaUrlListField } from "../../cms/components/MediaUrlField";
import { StringListField, parseJsonList } from "../../cms/components/StringListField";
import { ObjectListField, parseJsonObjects } from "../../cms/components/ObjectListField";

interface SectionConfig {
  id: string;
  label: string;
  fields: { key: string; label: string; type?: "text" | "textarea" | "imageList" | "stringList" | "sections"; hint?: string }[];
}

const PAGE_CONFIGS: Record<string, { title: string; sections: SectionConfig[] }> = {
  "privacy": {
    title: "Privacy Policy Page",
    sections: [
      { id: "hero", label: "Hero Section", fields: [
        { key: "badge", label: "Badge Text" },
        { key: "headline", label: "Headline" },
        { key: "subheadline", label: "Subheadline", type: "textarea" },
      ]},
      { id: "content", label: "Policy Content", fields: [
        { key: "sections", label: "Policy sections", type: "sections" },
      ]},
      { id: "seo", label: "SEO Metadata", fields: [
        { key: "title", label: "Page Title" },
        { key: "description", label: "Meta Description", type: "textarea" },
        { key: "keywords", label: "Keywords" },
      ]},
    ],
  },
  "terms": {
    title: "Terms & Conditions Page",
    sections: [
      { id: "hero", label: "Hero Section", fields: [
        { key: "badge", label: "Badge Text" },
        { key: "headline", label: "Headline" },
        { key: "subheadline", label: "Subheadline", type: "textarea" },
      ]},
      { id: "content", label: "Terms Content", fields: [
        { key: "sections", label: "Terms sections", type: "sections" },
      ]},
      { id: "seo", label: "SEO Metadata", fields: [
        { key: "title", label: "Page Title" },
        { key: "description", label: "Meta Description", type: "textarea" },
        { key: "keywords", label: "Keywords" },
      ]},
    ],
  },
  "blog": {
    title: "Blog Listing Page",
    sections: [
      { id: "hero", label: "Hero Section", fields: [
        { key: "badge", label: "Badge Text" },
        { key: "headline", label: "Headline" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
        { key: "search_placeholder", label: "Search Placeholder" },
        { key: "clear_button", label: "Clear Button Text" },
      ]},
      { id: "newsletter", label: "Newsletter CTA", fields: [
        { key: "badge", label: "Badge Text" },
        { key: "headline", label: "Headline" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
        { key: "placeholder", label: "Input Placeholder" },
        { key: "button_label", label: "Button Label" },
        { key: "success_message", label: "Success Message" },
        { key: "success_detail", label: "Success Detail" },
        { key: "trust_text", label: "Trust Text" },
      ]},
      { id: "grid", label: "Grid Section", fields: [
        { key: "heading", label: "Heading" },
        { key: "subheading", label: "Subheading" },
        { key: "empty_title", label: "Empty State Title" },
        { key: "empty_description", label: "Empty State Description" },
      ]},
      { id: "featured", label: "Featured Post", fields: [
        { key: "label", label: "Label Text" },
      ]},
      { id: "seo", label: "SEO Metadata", fields: [
        { key: "title", label: "Page Title" },
        { key: "description", label: "Meta Description", type: "textarea" },
        { key: "keywords", label: "Keywords" },
      ]},
    ],
  },
  "blog_detail": {
    title: "Blog Detail Page",
    sections: [
      { id: "hero", label: "Hero Section", fields: [
        { key: "back_label", label: "Back Link Text" },
        { key: "share_label", label: "Share Label" },
        { key: "copy_link_label", label: "Copy Link Text" },
        { key: "copied_label", label: "Copied Text" },
      ]},
      { id: "author", label: "Author Bio", fields: [
        { key: "bio", label: "Default Bio", type: "textarea" },
      ]},
      { id: "related", label: "Related Posts", fields: [
        { key: "heading", label: "Heading" },
        { key: "view_all_label", label: "View All Label" },
        { key: "read_label", label: "Read Article Label" },
      ]},
      { id: "seo", label: "SEO Metadata", fields: [
        { key: "title", label: "Page Title" },
        { key: "description", label: "Meta Description", type: "textarea" },
        { key: "keywords", label: "Keywords" },
      ]},
    ],
  },
  "not_found": {
    title: "404 Page",
    sections: [
      { id: "not_found", label: "404 Content", fields: [
        { key: "badge", label: "Badge Text" },
        { key: "title", label: "Title" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "button_label", label: "Button Text" },
      ]},
      { id: "seo", label: "SEO Metadata", fields: [
        { key: "title", label: "Page Title" },
        { key: "description", label: "Meta Description", type: "textarea" },
        { key: "keywords", label: "Keywords" },
      ]},
    ],
  },
};

interface Props {
  page: string;
}

export default function PageContentEditor({ page }: Props) {
  const qc = useQueryClient();
  const config = PAGE_CONFIGS[page];
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const { data: items, isLoading } = useQuery({
    queryKey: ["page-content", page],
    queryFn: () => pageContentApi.getByPageAdmin(page).then((r) => r.data.items as PageContentItem[]),
  });

  useEffect(() => {
    if (items) {
      const values: Record<string, string> = {};
      items.forEach((item) => {
        values[`${item.section}.${item.key}`] = item.value;
      });
      setFormValues(values);
    }
  }, [items]);

  const mutation = useMutation({
    mutationFn: () => {
      const upserts: Array<{ page: string; section: string; key: string; value: string }> = [];
      config?.sections.forEach((section) => {
        section.fields.forEach((field) => {
          const fullKey = `${section.id}.${field.key}`;
          const value = formValues[fullKey] || "";
          upserts.push({ page, section: section.id, key: field.key, value });
        });
      });
      return pageContentApi.bulkUpsert(upserts);
    },
    onSuccess: () => {
      toast.success("Page content saved");
      qc.invalidateQueries({ queryKey: ["page-content", page] });
    },
    onError: () => toast.error("Save failed"),
  });

  if (!config) return <div className="text-sm text-gray-400">Unknown page</div>;
  if (isLoading) return <div className="text-sm text-gray-400">Loading...</div>;

  const handleChange = (sectionId: string, fieldKey: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [`${sectionId}.${fieldKey}`]: value }));
  };

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">{config.title}</h2>
        <p className="text-sm text-gray-500">Edit content sections for the {config.title.toLowerCase()}</p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }} className="space-y-6">
        {config.sections.map((section) => (
          <div key={section.id} className="card p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">
              {section.label}
            </h3>
            <div className="space-y-4">
              {section.fields.map((field) => {
                const fullKey = `${section.id}.${field.key}`;
                const value = formValues[fullKey] || "";
                return (
                  <div key={field.key}>
                    <label className="label">{field.label}</label>
                    {field.type === "textarea" ? (
                      <textarea
                        className="input resize-none"
                        rows={3}
                        value={value}
                        onChange={(e) => handleChange(section.id, field.key, e.target.value)}
                      />
                    ) : field.type === "imageList" ? (
                      <MediaUrlListField
                        id={`${section.id}-${field.key}`}
                        label=""
                        kind="image"
                        value={parseJsonList(value)}
                        onChange={(list) => handleChange(section.id, field.key, JSON.stringify(list))}
                        hint={field.hint}
                      />
                    ) : field.type === "stringList" ? (
                      <StringListField
                        id={`${section.id}-${field.key}`}
                        label=""
                        value={parseJsonList(value)}
                        onChange={(list) => handleChange(section.id, field.key, JSON.stringify(list))}
                        hint={field.hint}
                      />
                    ) : field.type === "sections" ? (
                      <ObjectListField
                        id={`${section.id}-${field.key}`}
                        label=""
                        itemLabel="section"
                        fields={[{ key: "title", label: "Heading" }, { key: "content", label: "Text", multiline: true }]}
                        value={parseJsonObjects(value)}
                        onChange={(list) => handleChange(section.id, field.key, JSON.stringify(list))}
                        hint={field.hint}
                      />
                    ) : (
                      <input
                        className="input"
                        value={value}
                        onChange={(e) => handleChange(section.id, field.key, e.target.value)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <button type="submit" disabled={mutation.isPending} className="btn-primary">
            <Save className="w-4 h-4" />
            {mutation.isPending ? "Saving..." : "Save Page Content"}
          </button>
        </div>
      </form>
    </div>
  );
}
