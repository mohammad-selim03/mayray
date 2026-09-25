import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Loader2 } from "lucide-react";
import { cmsApi, errorMessage, type CmsDocumentSummary } from "../../cms/api";
import { relativeTime } from "./ContentEditor";

function Group({ title, description, items }: { title: string; description: string; items: CmsDocumentSummary[] }) {
  if (items.length === 0) return null;
  return (
    <section className="space-y-2">
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <ul className="card divide-y divide-gray-100">
        {items.map((d) => (
          <li key={d.key}>
            <Link to={`/content/${d.key}`} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900">{d.label}</p>
                <p className="text-xs text-gray-500">
                  {d.route ? <span className="font-mono">{d.route}</span> : "Shown on several pages"}
                </p>
              </div>
              {d.version > 0 ? (
                <span className="text-right text-xs text-gray-500">
                  <span className="badge bg-green-50 text-green-700">Version {d.version}</span>
                  <span className="mt-0.5 block">{relativeTime(d.updatedAt)}</span>
                </span>
              ) : (
                <span className="badge bg-gray-100 text-gray-500">Design defaults</span>
              )}
              <ChevronRight className="h-4 w-4 text-gray-300" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ContentList() {
  const docs = useQuery({ queryKey: ["cms-documents"], queryFn: cmsApi.list });

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Content</h2>
        <p className="text-sm text-gray-500">Edit the words, images and links on the site. Layouts stay as designed; changes go live when you publish.</p>
      </div>
      {docs.isLoading ? (
        <p className="flex items-center gap-2 text-sm text-gray-400"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</p>
      ) : docs.isError ? (
        <p className="text-sm text-red-600">{errorMessage(docs.error, "Couldn't load content.")}</p>
      ) : (
        <>
          <Group title="Pages" description="One entry per page on the site." items={docs.data!.filter((d) => d.kind === "page")} />
          <Group title="Site-wide" description="Blocks shared by many pages, such as the menu, footer and banners." items={docs.data!.filter((d) => d.kind === "global")} />
        </>
      )}
    </div>
  );
}
