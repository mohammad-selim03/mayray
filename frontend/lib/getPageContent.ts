import type { ApiPageContent } from "./api";
import { fallbackPageContent } from "./fallbackContent";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export async function getPageContent(page: string): Promise<Record<string, Record<string, string>>> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2500);
  try {
    const res = await fetch(`${API_URL}/page-content/${page}`, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });
    if (!res.ok) return fallbackPageContent(page);
    const data = (await res.json()) as { success: boolean; items: ApiPageContent[] };
    const items = data.items ?? [];
    if (items.length === 0) return fallbackPageContent(page);
    const result: Record<string, Record<string, string>> = {};
    items.forEach((item) => {
      if (!result[item.section]) result[item.section] = {};
      result[item.section][item.key] = item.value;
    });
    return result;
  } catch {
    return fallbackPageContent(page);
  } finally {
    clearTimeout(timer);
  }
}
