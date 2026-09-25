// What the site shows when the API can't be reached or a collection is empty: the snapshot in
// lib/cms/fixtures (the same data `npm run seed` writes into an empty database). CMS pages and
// blocks fall back to their design defaults instead (lib/cms/getCmsDocument).
// Server-only: blog posts include their full bodies.
import type { ApiBlogPost, ApiFeature, ApiIndustryROI, ApiIntegration, ApiScalingStep, ApiTestimonial, ApiUseCase } from "./api";
import { BLOG_POSTS } from "./cms/fixtures/blog-posts";
import { FEATURES, INDUSTRY_ROI, INTEGRATIONS, SCALING_STEPS, TESTIMONIALS, USE_CASES } from "./cms/fixtures/collections";
import type { BlogPostFixture } from "./cms/fixtures/types";

const active = <T extends { isActive: boolean; order: number }>(rows: T[]) => rows.filter((r) => r.isActive).sort((a, b) => a.order - b.order);

export const FALLBACK_COLLECTIONS: {
  features: ApiFeature[];
  integrations: ApiIntegration[];
  useCases: ApiUseCase[];
  testimonials: ApiTestimonial[];
  scaling: ApiScalingStep[];
  industryROI: ApiIndustryROI[];
} = {
  features: active(FEATURES),
  integrations: active(INTEGRATIONS),
  useCases: active(USE_CASES),
  testimonials: active(TESTIMONIALS),
  scaling: [...SCALING_STEPS].sort((a, b) => a.order - b.order),
  industryROI: active(INDUSTRY_ROI),
};

const toApiPost = (p: BlogPostFixture, withContent: boolean): ApiBlogPost => ({
  id: p.id,
  title: p.title,
  slug: p.slug,
  excerpt: p.excerpt,
  ...(withContent ? { content: p.content } : {}),
  image: p.image,
  author: p.author,
  category: p.category,
  readTime: p.readTime,
  publishedAt: p.publishedAt ?? "",
  tags: p.tags,
  metaTitle: p.metaTitle,
  metaDescription: p.metaDescription,
});

const published = BLOG_POSTS.filter((p) => p.status === "published" && p.publishedAt).sort((a, b) =>
  (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "")
);

/** Newest published posts first, without their bodies. */
export const fallbackBlogPosts = (limit: number): ApiBlogPost[] => published.slice(0, limit).map((p) => toApiPost(p, false));

export const fallbackBlogPost = (slug: string): ApiBlogPost | null => {
  const post = published.find((p) => p.slug === slug);
  return post ? toApiPost(post, true) : null;
};

