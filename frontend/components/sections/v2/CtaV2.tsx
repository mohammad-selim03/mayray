import { AnimateIn } from "../../ui/AnimateIn";
import { ButtonLink } from "../../ui/Button";
import type { HomeHeroContent } from "../../../lib/cms/schema/documents/pages/home";

// Home v2 closing CTA — reuses the hero's headline, subtitle and primary button, centred.
export const CtaV2 = ({ content }: { content: HomeHeroContent }) => {
  const title = content.title.replace(/==/g, "");
  return (
    <section className="bg-white px-4 py-24 sm:px-6">
      <AnimateIn className="mx-auto flex max-w-[640px] flex-col items-center gap-6 text-center">
        <h2 className="text-[32px] font-semibold leading-[1.2] text-[#18181b] sm:text-[40px] lg:text-[48px]">{title}</h2>
        <p className="max-w-[530px] text-[16px] leading-[1.6] text-[#70707b]">{content.subtitle}</p>
        <ButtonLink link={content.primaryCta} variant="primary" />
      </AnimateIn>
    </section>
  );
};
