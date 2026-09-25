import type { DocumentDef, InferDocument } from "./types";
import { ctaBanner } from "./documents/cta-banner";
import { footer } from "./documents/footer";
import { navbar } from "./documents/navbar";
import { seoDefaults } from "./documents/seo-defaults";
import { trustedBrands } from "./documents/trusted-brands";
import { aiAutomationPage } from "./documents/pages/ai-automation";
import { voiceAiPage } from "./documents/pages/voice-ai";
import { legalPage } from "./documents/pages/legal";
import { realEstatePage } from "./documents/pages/real-estate";
import { insurancePage } from "./documents/pages/insurance";
import { automotivePage } from "./documents/pages/automotive";
import { ecommercePage } from "./documents/pages/ecommerce";
import { homePage } from "./documents/pages/home";

export const REGISTRY = {
  home: homePage,
  "ai-automation": aiAutomationPage,
  "voice-ai": voiceAiPage,
  "legal": legalPage,
  "real-estate": realEstatePage,
  "insurance": insurancePage,
  "automotive": automotivePage,
  "ecommerce": ecommercePage,
  navbar,
  footer,
  "cta-banner": ctaBanner,
  "trusted-brands": trustedBrands,
  "seo-defaults": seoDefaults,
} as const;

export type DocumentKey = keyof typeof REGISTRY;
export type DocumentContent<K extends DocumentKey> = InferDocument<(typeof REGISTRY)[K]>;

export const DOCUMENTS: readonly DocumentDef[] = Object.values(REGISTRY);

export function getDocumentDef(key: string): DocumentDef | undefined {
  return Object.prototype.hasOwnProperty.call(REGISTRY, key) ? REGISTRY[key as DocumentKey] : undefined;
}

export const cacheTag = (key: string) => `cms:${key}`;
