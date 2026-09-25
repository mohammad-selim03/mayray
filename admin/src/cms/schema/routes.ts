// GENERATED FILE: edit frontend/lib/cms and run `pnpm cms:sync`.

/** Site pages offered by the admin link picker. Blog posts (/blog/...) and #anchors are also valid links. */
export const SITE_ROUTES = [
  { path: "/", label: "Home" },
  { path: "/ai-automation", label: "AI Automation" },
  { path: "/voice-ai", label: "Voice AI" },
  { path: "/legal", label: "Legal" },
  { path: "/real-estate", label: "Real Estate" },
  { path: "/insurance", label: "Insurance" },
  { path: "/automotive", label: "Automotive" },
  { path: "/ecommerce", label: "E-commerce" },
  { path: "/pricing", label: "Pricing" },
  { path: "/contact", label: "Contact" },
  { path: "/blog", label: "Blog" },
  { path: "/privacy-policy", label: "Privacy Policy" },
  { path: "/terms", label: "Terms & Conditions" },
] as const;

/** True for links that stay on the site but don't match a known page (e.g. a typo). */
export function isUnknownInternalPath(href: string): boolean {
  if (!href.startsWith("/") || href.startsWith("//")) return false;
  const path = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  if (path.startsWith("/blog/")) return false;
  return !SITE_ROUTES.some((r) => r.path === path);
}
