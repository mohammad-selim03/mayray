"use client";

import { useState } from "react";
import { TrustedBrands } from "@/components/sections/TrustedBrands";
import {
  IndustryCentered,
  IndustryFAQ,
  IndustryFeatureRow,
  IndustryHero,
  IndustryIntegrations,
  IndustryPainPoints,
  IndustryTestimonials,
  IndustryWorkflow,
} from "@/components/sections/industry/IndustrySections";
import type { DocumentContent } from "@/lib/cms/schema";

export function AutomotiveIndustryPage({ content }: { content: DocumentContent<"automotive"> }) {
  const [openFaq, setOpenFaq] = useState(1);

  return (
    <>
      <IndustryHero content={content.hero} />

      {/* This design leaves a wider gap under the hero than the other industry pages. */}
      <div className="pt-[46px]">
        <TrustedBrands />
      </div>

      <IndustryPainPoints content={content.painPoints} headingWidth="max-w-[780px]" />

      <IndustryWorkflow content={content.workflow} />

      <IndustryFeatureRow content={content.featureRow1} />

      <IndustryFeatureRow content={content.featureRow2} reversed topPadding="pt-[80px]" />

      <IndustryCentered content={content.centered} />

      <IndustryTestimonials content={content.testimonials} />

      <IndustryIntegrations content={content.integrations} />

      <IndustryFAQ content={content.faq} openIndex={openFaq} onToggle={(i) => setOpenFaq(openFaq === i ? -1 : i)} />
    </>
  );
}
