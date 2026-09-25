import type { Metadata } from "next";
import { getServerSettings } from "./getServerSettings";
import { getPageContent } from "./getPageContent";
import { getCmsDocument } from "./cms/getCmsDocument";

const DEFAULTS: Record<string, { title: string; description: string; keywords?: string }> = {
  home: {
    title: "Mayray AI — Autonomous AI Agents for Business Automation",
    description: "Deploy autonomous AI agents that handle calls, emails, and workflows 24/7. Sub-300ms voice AI, CRM integration, and enterprise-grade automation.",
    keywords: "AI automation, voice AI, business automation, AI agents, CRM integration",
  },
  blog: {
    title: "Blog | AI Automation Insights & Guides | Mayray AI",
    description: "Discover actionable strategies, technical breakdowns, and industry case studies on scaling business operations with autonomous AI agents.",
    keywords: "AI blog, automation guides, business AI insights",
  },
  privacy: {
    title: "Privacy Policy | Mayray AI",
    description: "Mayray AI privacy policy. Learn how we collect, use, and protect your personal information. Zero AI training on customer data.",
  },
  terms: {
    title: "Terms & Conditions | Mayray AI",
    description: "Mayray AI terms of service. Read our service level agreement, acceptable use policy, and legal terms.",
  },
  contact: {
    title: "Contact Mayray AI | Talk to Our Automation Team",
    description: "Get in touch with Mayray AI. Send us a message, reach our head office, or contact sales, support, investors, and careers directly. We respond within 48 hours.",
    keywords: "contact Mayray AI, AI automation support, sales enquiry, get in touch",
  },
  blog_detail: {
    title: "Blog Post | Mayray AI",
    description: "Read this article from Mayray AI.",
  },
  not_found: {
    title: "Page Not Found | Mayray AI",
    description: "The page you're looking for doesn't exist or has been moved.",
  },
};

export async function getPageMetadata(page: string): Promise<Metadata> {
  const defaults = DEFAULTS[page] ?? { title: "Mayray AI", description: "" };

  let title = defaults.title;
  let description = defaults.description;
  let keywords = defaults.keywords;

  try {
    const content = await getPageContent(page);
    const seo = content["seo"] || {};
    if (seo["title"]) title = seo["title"];
    if (seo["description"]) description = seo["description"];
    if (seo["keywords"]) keywords = seo["keywords"];
  } catch {
    // Fall through to settings fallback
  }

  if (!title || title === defaults.title) {
    const settings = await getServerSettings();
    const sTitle = settings[`meta.${page}.title`];
    const sDesc = settings[`meta.${page}.description`];
    const sKw = settings[`meta.${page}.keywords`];
    if (sTitle) title = sTitle;
    if (sDesc) description = sDesc;
    if (sKw) keywords = sKw;
  }

  // A page-level openGraph replaces the root one entirely, so repeat the site-wide share details.
  const { site } = await getCmsDocument("seo-defaults");
  const images = site.shareImage ? [{ url: site.shareImage.url, alt: site.shareImage.alt }] : undefined;

  return {
    title,
    description,
    keywords,
    openGraph: { title, description, siteName: site.siteName, type: "website", images },
    twitter: { card: images ? "summary_large_image" : "summary", site: site.xHandle || undefined, title, description, images },
  };
}
