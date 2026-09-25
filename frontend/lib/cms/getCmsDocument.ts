import { REGISTRY, cacheTag, validateDocument, type DocumentContent, type DocumentKey } from "./schema";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

/**
 * Published content for a CMS document, always complete: anything missing or unreadable falls
 * back to the design defaults, so the page renders even when the API is down. Publishing
 * refreshes the cache by tag; the time-based revalidate only covers a missed refresh.
 */
export async function getCmsDocument<K extends DocumentKey>(key: K): Promise<DocumentContent<K>> {
  let stored: unknown;
  try {
    const res = await fetch(`${API_URL}/cms/documents/${key}`, {
      next: { tags: [cacheTag(key)], revalidate: 300 },
      signal: AbortSignal.timeout(2500),
    });
    if (res.ok) stored = (await res.json())?.document?.data;
  } catch {
    // Fall through to defaults.
  }
  return validateDocument(REGISTRY[key], stored).data as DocumentContent<K>;
}
