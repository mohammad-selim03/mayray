import type { Metadata } from "next";
import { LegalIndustryPage } from "@/components/sections/legal/LegalIndustryPage";
import { getCmsDocument } from "@/lib/cms/getCmsDocument";
import { getCmsPageMetadata } from "@/lib/cms/getCmsPageMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getCmsPageMetadata("legal");
}

export default async function LegalPage() {
  const content = await getCmsDocument("legal");
  return <LegalIndustryPage content={content} />;
}
