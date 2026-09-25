export type UserRole = "admin" | "editor" | "viewer";
export type BlogStatus = "draft" | "published" | "scheduled";
export type ContactStatus = "new" | "read" | "replied" | "archived";
export type ContactType = "contact" | "health_check" | "support";
export type HealthCheckStatus = "pending" | "reviewed" | "completed";
export type FeatureGroup = "A" | "A2" | "B";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  lastLogin?: string | null;
  avatar?: string | null;
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string | null;
  author: string;
  category: string;
  readTime: string;
  tags: string[];
  status: BlogStatus;
  publishedAt?: string | null;
  scheduledAt?: string | null;
  views: number;
  metaTitle?: string | null;
  metaDescription?: string | null;
  createdAt: string;
  createdBy?: { name: string; email: string } | null;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company?: string | null;
  avatar?: string | null;
  rating: number;
  isActive: boolean;
  order: number;
  createdAt: string;
}

export interface Integration {
  id: string;
  name: string;
  logo?: string | null;
  description?: string | null;
  category: string;
  isActive: boolean;
  order: number;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  videoUrl?: string | null;
  thumbnail?: string | null;
  apps: string[];
  group: FeatureGroup;
  isActive: boolean;
  order: number;
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
  icon?: string | null;
  category: string;
  isActive: boolean;
  order: number;
}

export interface Contact {
  id: string;
  email: string;
  name: string;
  message?: string | null;
  type: ContactType;
  status: ContactStatus;
  ipAddress?: string | null;
  createdAt: string;
}

export interface NewsletterSub {
  id: string;
  email: string;
  isActive: boolean;
  subscribedAt: string;
  unsubscribedAt?: string | null;
  source: string;
}

export interface HealthCheck {
  id: string;
  email: string;
  company?: string | null;
  industry?: string | null;
  processDescription?: string | null;
  assessmentId: string;
  estimatedSavings?: number | null;
  recommendations: string[];
  status: HealthCheckStatus;
  notes?: string | null;
  createdAt: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

export interface ScalingStep {
  id: string;
  step: string;
  title: string;
  body: string;
  icon?: string | null;
  isCard: boolean;
  order: number;
  createdAt: string;
}


export interface AnalyticsStats {
  blogs: { total: number; published: number };
  contacts: { total: number; new: number };
  newsletter: { total: number; active: number };
  healthChecks: { total: number; pending: number };
  testimonials: { total: number };
  totalBlogViews: number;
}

export interface PageContentItem {
  id: string;
  page: string;
  section: string;
  key: string;
  value: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}
