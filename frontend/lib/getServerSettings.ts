import type { ApiSettings } from "./api";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

/**
 * Fetch site settings on the server so the initial HTML already contains the
 * real, settings-driven content (no client-side fetch waterfall / text swap).
 * Cached for 60s and tagged so it can be revalidated. Falls back to {} when the
 * backend is unreachable — sections then use their hardcoded defaults.
 */
export async function getServerSettings(): Promise<ApiSettings> {
  // Never let a slow/cold backend stall server rendering. If settings don't
  // arrive quickly, return {} and the client picks them up after hydration.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);
  try {
    const res = await fetch(`${API_URL}/settings`, {
      signal: controller.signal,
      next: { revalidate: 60, tags: ["settings"] },
    });
    if (!res.ok) return {};
    const data = (await res.json()) as { settings?: ApiSettings };
    return data.settings ?? {};
  } catch {
    return {};
  } finally {
    clearTimeout(timeout);
  }
}
