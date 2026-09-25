// Shapes of the default site content: what the site falls back to when the API can't be reached,
// and what the backend seed writes into an empty database. Plain data only, so the backend can use
// a synced copy (see scripts/sync-cms-schema.mjs).

export interface IntegrationFixture {
  id: string;
  name: string;
  logo: string | null;
  description: string | null;
  category: "productivity" | "communication" | "crm" | "storage" | "analytics" | "other";
  isActive: boolean;
  order: number;
}

export interface FeatureFixture {
  id: string;
  title: string;
  description: string;
  videoUrl: string | null;
  thumbnail: string | null;
  apps: string[];
  /** A: first feature block on Home, B: second block, A2: not shown. */
  group: "A" | "A2" | "B";
  isActive: boolean;
  order: number;
}

export interface UseCaseFixture {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  category: "marketing" | "sales" | "operations" | "customer_experience" | "finance" | "it" | "hr" | "productivity";
  isActive: boolean;
  order: number;
}

export interface TestimonialFixture {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string | null;
  avatar: string | null;
  rating: number;
  isActive: boolean;
  order: number;
}

export interface ScalingStepFixture {
  id: string;
  step: string;
  title: string;
  body: string;
  icon: string | null;
  /** false: one of the numbered steps; true: one of the wide cards under them. */
  isCard: boolean;
  order: number;
}

export interface IndustryRoiFixture {
  id: string;
  industry: string;
  cvr: string;
  showUp: string;
  image: string | null;
  useCases: string[];
  isActive: boolean;
  order: number;
}

export interface BlogPostFixture {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  /** HTML. */
  content: string;
  image: string | null;
  author: string;
  category: string;
  readTime: string;
  tags: string[];
  status: "draft" | "published" | "scheduled";
  /** ISO date. */
  publishedAt: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  /** ISO date. */
  createdAt: string;
}

/** A field on a page that is still edited in the old page editor (until it moves into the CMS). */
export interface PageContentFixture {
  page: string;
  section: string;
  key: string;
  value: string;
  order: number;
}
