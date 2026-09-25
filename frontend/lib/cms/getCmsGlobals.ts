import type { CmsGlobals } from "./CmsGlobalsContext";
import { getCmsDocument } from "./getCmsDocument";

/** Site-wide blocks every page renders, fetched once per request by the root layout. */
export async function getCmsGlobals(): Promise<CmsGlobals> {
  const [navbar, footer, ctaBanner, trustedBrands] = await Promise.all([
    getCmsDocument("navbar"),
    getCmsDocument("footer"),
    getCmsDocument("cta-banner"),
    getCmsDocument("trusted-brands"),
  ]);
  return { navbar, footer, "cta-banner": ctaBanner, "trusted-brands": trustedBrands };
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
