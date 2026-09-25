import type {
  ApiFeature,
  ApiIntegration,
  ApiUseCase,
  ApiTestimonial,
  ApiScalingStep,
  ApiIndustryROI,
  ApiBlogPost,
} from "./api";
import type { SiteData } from "./SiteDataContext";
import { FALLBACK_COLLECTIONS, fallbackBlogPosts } from "./fallbackContent";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

/**
 * Fetch one list endpoint on the server. Bounded by a timeout and revalidated
 * so the backend is hit at most once per minute. When the API fails or the list
 * is empty, the section shows the default content instead (lib/fallbackContent).
 */
async function getList<T>(path: string, key: string, fallback: T[]): Promise<T[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2500);
  try {
    const res = await fetch(`${API_URL}${path}`, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });
    if (!res.ok) return fallback;
    const list = ((await res.json()) as Record<string, unknown>)[key] as T[] | undefined;
    return list && list.length > 0 ? list : fallback;
  } catch {
    return fallback;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Server-fetch all landing-page section data in parallel so the initial HTML
 * already contains real content (no client fetch waterfall / pop-in).
 */
export async function getSiteData(): Promise<SiteData> {
  const f = FALLBACK_COLLECTIONS;
  const [features, integrations, useCases, testimonials, scaling, industryROI, blog] = await Promise.all([
    getList<ApiFeature>("/features", "features", f.features),
    getList<ApiIntegration>("/integrations", "integrations", f.integrations),
    getList<ApiUseCase>("/use-cases", "useCases", f.useCases),
    getList<ApiTestimonial>("/testimonials", "testimonials", f.testimonials),
    getList<ApiScalingStep>("/scaling", "items", f.scaling),
    getList<ApiIndustryROI>("/industry-roi", "items", f.industryROI),
    // One more than the home page can show, so it knows whether to offer "See more".
    getList<ApiBlogPost>("/blog?limit=7", "posts", fallbackBlogPosts(7)),
  ]);
  return { features, integrations, useCases, testimonials, scaling, industryROI, blog };
}
