"use client";

import { useState } from "react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { TrustedBrands } from "@/components/sections/TrustedBrands";
import {
  H2_CLASS,
  IndustryCentered,
  IndustryFAQ,
  IndustryFeatureRow,
  IndustryHero,
  IndustryPhotoBand,
  IndustrySecurity,
  IndustryTestimonials,
  IndustryWorkflow,
} from "@/components/sections/industry/IndustrySections";
import type { DocumentContent } from "@/lib/cms/schema";

export function AiAutomationIndustryPage({ content }: { content: DocumentContent<"ai-automation"> }) {
  const [openFaq, setOpenFaq] = useState(1);

  return (
    <>
      <IndustryHero content={content.hero} variant="centered" />

      <TrustedBrands />

      {/* Left-aligned intro statement. */}
      <section className="mx-auto w-full max-w-[1170px] px-4 pt-[40px] sm:px-6 lg:px-0">
        <AnimateIn>
          <h2 className={`max-w-[950px] ${H2_CLASS}`}>{content.intro.title}</h2>
          <p className="mt-[40px] max-w-[950px] whitespace-pre-line text-[16px] leading-[25.6px] text-[#70707b]">{content.intro.body}</p>
        </AnimateIn>
      </section>

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
