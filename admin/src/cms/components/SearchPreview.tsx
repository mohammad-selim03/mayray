import { SITE_URL } from "../api";

interface SearchPreviewProps {
  title: string;
  description: string;
  route?: string;
  fallbackTitle: string;
  noIndex?: boolean;
}

const clip = (text: string, max: number) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text);

export default function SearchPreview({ title, description, route = "/", fallbackTitle, noIndex }: SearchPreviewProps) {
  const url = `${SITE_URL.replace(/^https?:\/\//, "")}${route === "/" ? "" : route}`;
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">Search result preview</p>
      {noIndex ? (
        <p className="text-sm text-amber-600">Hidden from search engines. This page won't appear in results.</p>
      ) : (
        <div className="font-[arial,sans-serif]">
          <p className="truncate text-xs text-gray-600">{url}</p>
          <p className="truncate text-lg leading-snug text-[#1a0dab]">{clip(title || fallbackTitle, 62)}</p>
          <p className="line-clamp-2 text-sm text-gray-600">
            {description ? clip(description, 160) : <span className="italic text-gray-400">Add a description so search engines don't pick one for you.</span>}
          </p>
        </div>
      )}
    </div>
  );
}
