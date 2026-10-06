"use client";

import React from "react";
import Image from "next/image";
import { AnimateIn } from "../../ui/AnimateIn";
import { useSiteData } from "../../../lib/SiteDataContext";
import type { HomeScalingContent } from "../../../lib/cms/schema/documents/pages/home";

// Home v2 scaling section: glass cards over the fjord photo, with a Step 01–04 timeline.
// Text comes from the CMS scaling steps; icons are the design's set (the CMS icons are unset),
// mapped by position. Icons 2 and 3 are dark line-art and sit in a white tile; the rest have a
// white backing baked into the SVG.
const STEP_ICONS = ["scaling-icon-1", "scaling-icon-2", "scaling-icon-3", "scaling-icon-4"];
const STEP_ICON_BOXED = [false, true, true, false];
const CARD_ICONS = ["scaling-card-1", "scaling-card-2"];

function GlassIcon({ name, boxed }: { name: string; boxed?: boolean }) {
  if (boxed) {
    return (
      <span className="flex size-10 items-center justify-center overflow-hidden rounded-[8px] bg-white">
        <Image src={`/homev2/${name}.svg`} alt="" width={26} height={26} />
      </span>
    );
  }
  return <Image src={`/homev2/${name}.svg`} alt="" width={40} height={40} className="size-10" />;
}

const CARD = "rounded-[24px] border border-white/60 bg-white/10 p-[22px] backdrop-blur-[12.5px]";

export const ScalingV2 = ({ content }: { content: HomeScalingContent }) => {
  const { title: headline, subtitle: description } = content;
  const scaling = useSiteData().scaling;
  const steps = scaling.filter((i) => !i.isCard).slice(0, 4);
  const cards = scaling.filter((i) => i.isCard).slice(0, 2);

  return (
    <section id="how-it-works" className="relative mt-24 scroll-mt-28 overflow-hidden">
      {/* Photo + colour glow */}
      <div className="absolute inset-0 z-0">
        {/* Full-bleed background photo; a plain img renders reliably behind the gradient. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/homev2/scaling-bg.webp" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(43,33,64,0.82)_0%,rgba(34,44,74,0.62)_45%,rgba(30,44,74,0.55)_100%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1170px] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-[80px]">
        <AnimateIn>
          <h2 className="max-w-[770px] text-[32px] font-semibold leading-[1.2] tracking-tight sm:text-[40px] lg:text-[48px]">
            {headline}
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.15}>
          <p className="mt-4 max-w-[648px] text-[15px] leading-[1.6] text-white/90 sm:text-[16px]">{description}</p>
        </AnimateIn>

        {/* Step cards, with the timeline (desktop only) running through the centre of the step pills */}
        <div className="relative mt-12">
          <div className="absolute inset-x-0 top-[6px] z-0 hidden h-[19px] lg:block" aria-hidden>
            <div className="absolute left-[9px] right-[9px] top-1/2 h-px -translate-y-1/2 bg-white" />
            <span className="absolute left-0 top-1/2 h-0 w-0 -translate-y-1/2 border-y-[8px] border-r-[13px] border-y-transparent border-r-white" />
            <span className="absolute right-0 top-1/2 h-0 w-0 -translate-y-1/2 border-y-[8px] border-l-[13px] border-y-transparent border-l-white" />
          </div>
          <div className="relative z-10 grid gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => (
              <AnimateIn key={step.id} delay={idx * 0.1} direction="up" className="h-full">
                <div className="flex h-full flex-col gap-6 lg:gap-12">
                  <span
                    className={`flex w-[86px] items-center justify-center gap-2 self-center rounded-full px-[11px] py-1.5 text-[16px] leading-[19px] ${
                      idx === 2 ? "bg-[#13a0e7] text-white" : "bg-white text-[#18181b]"
                    }`}
                  >
                    <span>Step</span>
                    <span>{step.step}</span>
                  </span>
                  <div className={`flex min-h-[250px] flex-col gap-4 ${CARD}`}>
                    <GlassIcon name={STEP_ICONS[idx] ?? STEP_ICONS[0]} boxed={STEP_ICON_BOXED[idx]} />
                    <div className="flex flex-col gap-2">
                      <h3 className="text-[18px] font-semibold leading-tight">{step.title}</h3>
                      <p className="text-[15px] leading-[1.5] text-white/90">{step.body}</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>

        {/* Wide cards */}
        <div className="mt-[30px] grid gap-[30px] lg:grid-cols-2">
          {cards.map((card, idx) => (
            <AnimateIn key={card.id} delay={0.3 + idx * 0.15} direction="up" className="h-full">
              <div className={`flex min-h-[250px] flex-col gap-4 ${CARD}`}>
                <GlassIcon name={CARD_ICONS[idx] ?? CARD_ICONS[0]} />
                <div className="flex flex-col gap-2">
                  <h3 className="text-[20px] font-semibold leading-tight">{card.title}</h3>
                  <p className="max-w-[522px] text-[15px] leading-[1.5] text-white/90">{card.body}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
};
