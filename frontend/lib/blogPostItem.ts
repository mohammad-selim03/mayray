import type { BlogPostItem } from "@/components/sections/blog/FeaturedPost";
import type { ApiBlogPost } from "./api";
import type { BlogPostsContent } from "./cms/schema/documents/pages/blog";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** A post as the blog pages show it, with the CMS defaults for anything the post leaves empty. */
export function toBlogPostItem(p: ApiBlogPost, defaults: BlogPostsContent): BlogPostItem {
  const author = p.author || defaults.defaultAuthor;
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    category: p.category,
    date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "",
    readTime: p.readTime || "5 min read",
    author: { name: author, role: "", avatar: initials(author) },
    image: p.image || defaults.fallbackImage?.url || "",
  };
}
