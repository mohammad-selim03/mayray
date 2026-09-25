const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

// ─── Response types ──────────────────────────────────────────────────────────

export interface ApiBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  image: string | null;
  author: string;
  category: string;
  readTime: string;
  publishedAt: string;
  tags: string[];
  views?: number;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

export interface ApiTestimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string | null;
  avatar: string | null;
  rating: number;
  isActive: boolean;
  order: number;
  createdAt?: string;
}

export interface ApiIntegration {
  id: string;
  name: string;
  logo: string | null;
  description: string | null;
  category: string;
  isActive: boolean;
  order: number;
}

export interface ApiUseCase {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  category: string;
  isActive: boolean;
  order: number;
}

export interface ApiFeature {
  id: string;
  title: string;
  description: string;
  videoUrl: string | null;
  thumbnail: string | null;
  apps: string[];
  group: string;
  isActive: boolean;
  order: number;
}

export interface HealthCheckResult {
  success: boolean;
  assessmentId: string;
  message: string;
}

export interface ApiScalingStep {
  id: string;
  step: string;
  title: string;
  body: string;
  icon: string | null;
  isCard: boolean;
  order: number;
}

export interface IndustryUseCase {
  label: string;
  icon: string;
}

export interface ApiIndustryROI {
  id: string;
  industry: string;
  cvr: string;
  showUp: string;
  image: string | null;
  useCases: string[];
  isActive: boolean;
  order: number;
}

export interface OceanSectionData {
  headline: string;
  description: string;
  avatars: string[];
}

export interface LanguagesData {
  flagCodes: string[];
}

// ─── Internal helper ─────────────────────────────────────────────────────────

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as T & { message?: string };
  if (!res.ok) throw new Error((data as { message?: string }).message ?? `API ${res.status}`);
  return data;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export const api = {
  blog: {
    list: (limit = 6) =>
      apiFetch<{ success: boolean; posts: ApiBlogPost[] }>(`/blog?limit=${limit}`).then(
        (d) => d.posts
      ),
    getBySlug: (slug: string) =>
      apiFetch<{ success: boolean; post: ApiBlogPost }>(`/blog/slug/${slug}`).then(
        (d) => d.post
      ),
    trackView: (id: string) =>
      fetch(`${API_URL}/blog/${id}/view`, { method: "POST" }).catch(() => null),
  },

  testimonials: {
    list: () =>
      apiFetch<{ success: boolean; testimonials: ApiTestimonial[] }>(
        "/testimonials"
      ).then((d) => d.testimonials),
  },

  integrations: {
    list: () =>
      apiFetch<{ success: boolean; integrations: ApiIntegration[] }>(
        "/integrations"
      ).then((d) => d.integrations),
  },

  useCases: {
    list: (category?: string) =>
      apiFetch<{ success: boolean; useCases: ApiUseCase[] }>(
        `/use-cases${category ? `?category=${encodeURIComponent(category)}` : ""}`
      ).then((d) => d.useCases),
  },

  features: {
    list: (group?: string) =>
      apiFetch<{ success: boolean; features: ApiFeature[] }>(
        `/features${group ? `?group=${encodeURIComponent(group)}` : ""}`
      ).then((d) => d.features),
  },

  newsletter: {
    subscribe: (email: string) =>
      apiPost<{ success: boolean; subscriptionId?: string; message?: string }>(
        "/newsletter/subscribe",
        { email }
      ),
    unsubscribe: (email: string) =>
      apiPost<{ success: boolean; message: string }>(
        "/newsletter/unsubscribe",
        { email }
      ),
  },

  contact: {
    submit: (body: {
      name: string;
      email: string;
      message: string;
      type?: "contact" | "health_check" | "support";
    }) =>
      apiPost<{ success: boolean; message: string }>("/contact", body),
  },

  healthCheck: {
    submit: (body: {
      email: string;
      company: string;
      industry: string;
      processDescription: string;
    }) => apiPost<HealthCheckResult>("/health-check", body),
  },

  scaling: {
    list: () =>
      apiFetch<{ success: boolean; items: ApiScalingStep[] }>("/scaling").then(
        (d) => d.items
      ),
  },

  industryROI: {
    list: () =>
      apiFetch<{ success: boolean; items: ApiIndustryROI[] }>("/industry-roi").then(
        (d) => d.items
      ),
  },
};
