import type { ApiBlogPost } from "./api";
import { fallbackBlogPost, fallbackBlogPosts } from "./fallbackContent";

// When the API is down, or doesn't have a post, the default posts in lib/cms/fixtures stand in.

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export async function getBlogPost(slug: string): Promise<ApiBlogPost | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2500);
  try {
    const res = await fetch(`${API_URL}/blog/slug/${slug}`, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });
    if (!res.ok) return fallbackBlogPost(slug);
    const data = (await res.json()) as { success: boolean; post: ApiBlogPost };
    return data.post ?? fallbackBlogPost(slug);
  } catch {
    return fallbackBlogPost(slug);
  } finally {
    clearTimeout(timer);
  }
}

export async function getBlogPosts(limit = 20): Promise<ApiBlogPost[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2500);
  try {
    const res = await fetch(`${API_URL}/blog?limit=${limit}`, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });
    if (!res.ok) return fallbackBlogPosts(limit);
    const data = (await res.json()) as { success: boolean; posts: ApiBlogPost[] };
    return data.posts?.length ? data.posts : fallbackBlogPosts(limit);
  } catch {
    return fallbackBlogPosts(limit);
  } finally {
    clearTimeout(timer);
  }
}
