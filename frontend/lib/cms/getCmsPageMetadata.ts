import type { Metadata } from "next";
import { getCmsDocument } from "./getCmsDocument";
import type { DocumentContent, DocumentKey, ImageValue } from "./schema";

/** Documents that have an SEO section. */
export type SeoPageKey = {
  [K in DocumentKey]: DocumentContent<K> extends { seo: unknown } ? K : never;
}[DocumentKey];

interface SeoContent {
  title: string;
  description: string;
  shareImage: ImageValue | null;
  noIndex: boolean;
}

/** Page metadata from the page's SEO section, falling back to the site-wide SEO defaults. */
export async function getCmsPageMetadata(key: SeoPageKey): Promise<Metadata> {
  const [doc, { site }] = await Promise.all([getCmsDocument(key), getCmsDocument("seo-defaults")]);
  const seo = (doc as { seo: SeoContent }).seo;
  const title = seo.title || site.defaultTitle;
  const description = seo.description || site.description;
  const shareImage = seo.shareImage ?? site.shareImage;
  const images = shareImage ? [{ url: shareImage.url, alt: shareImage.alt }] : undefined;

  return {
    title,
    description,
    robots: seo.noIndex ? { index: false, follow: false } : undefined,
    openGraph: { title, description, siteName: site.siteName, type: "website", images },
    twitter: { card: images ? "summary_large_image" : "summary", site: site.xHandle || undefined, title, description, images },
  };
}
