"use client";

import { useState } from "react";
import { TrustedBrands } from "@/components/sections/TrustedBrands";
import {
  IndustryCentered,
  IndustryFAQ,
  IndustryFeatureRow,
  IndustryHero,
  IndustryPainPoints,
  IndustryPhotoBand,
  IndustrySecurity,
  IndustryTestimonials,
  IndustryWorkflow,
} from "@/components/sections/industry/IndustrySections";
import type { DocumentContent } from "@/lib/cms/schema";

export function EcommerceIndustryPage({ content }: { content: DocumentContent<"ecommerce"> }) {
  const [openFaq, setOpenFaq] = useState(1);

  return (
    <>
      <IndustryHero content={content.hero} variant="centered" />

      <TrustedBrands />

      <IndustryPainPoints content={content.painPoints} />

      <IndustryPhotoBand content={content.photoBand} />

      <IndustryWorkflow content={content.workflow} />

      <IndustryFeatureRow content={content.featureRow1} />

      <IndustryFeatureRow content={content.featureRow2} reversed topPadding="pt-[80px]" />

      <IndustryCentered content={content.centered} />

      <IndustryTestimonials content={content.testimonials} />

      <IndustrySecurity content={content.security} />

      <IndustryFAQ content={content.faq} openIndex={openFaq} onToggle={(i) => setOpenFaq(openFaq === i ? -1 : i)} />
    </>
  );
}
