"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { DocumentContent } from "./schema";

export interface CmsGlobals {
  navbar: DocumentContent<"navbar">;
  footer: DocumentContent<"footer">;
  "cta-banner": DocumentContent<"cta-banner">;
  "trusted-brands": DocumentContent<"trusted-brands">;
}

const CmsGlobalsContext = createContext<CmsGlobals | null>(null);

export function CmsGlobalsProvider({ value, children }: { value: CmsGlobals; children: ReactNode }) {
  return <CmsGlobalsContext.Provider value={value}>{children}</CmsGlobalsContext.Provider>;
}

export function useCmsGlobal<K extends keyof CmsGlobals>(key: K): CmsGlobals[K] {
  const globals = useContext(CmsGlobalsContext);
  if (!globals) throw new Error("useCmsGlobal must be used inside CmsGlobalsProvider (set up in app/layout.tsx)");
  return globals[key];
}
