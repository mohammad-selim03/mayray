"use client";

import React from "react";
import { AnimateIn } from "../ui/AnimateIn";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSiteData } from "../../lib/SiteDataContext";
import type { HomeScalingContent } from "../../lib/cms/schema/documents/pages/home";

export const Scaling = ({ content }: { content: HomeScalingContent }) => {
  const { title: headline, subtitle: description } = content;
  const scaling = useSiteData().scaling;
  const steps = scaling.filter((i) => !i.isCard);
  const cards = scaling.filter((i) => i.isCard);

  return (
    <section id="how-it-works" className="relative mt-24 scroll-mt-28 overflow-hidden bg-white">

      <div className="relative mx-auto w-full max-w-[1170px] px-4 py-24 text-[#1c1917] sm:px-6 lg:px-8">
        <AnimateIn>
          <h2 className="max-w-[700px] text-[32px] font-bold leading-[1.15] tracking-tight text-[#1c1917] sm:text-[42px] lg:text-[56px]">
            {headline}
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.2}>
          <p className="mt-4 max-w-[600px] text-[16px] leading-[1.6] text-[#44403c] sm:text-[18px] lg:text-[20px]">
            {description}
          </p>
        </AnimateIn>

        {/* Steps Grid */}
        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-[16px] z-0 hidden lg:block">
            <div className="relative h-[1px] w-full bg-black/20">
              <div className="absolute left-0 top-1/2 -translate-x-[2px] -translate-y-1/2 border-y-[6px] border-r-[8px] border-y-transparent border-r-black/40 w-0 h-0" />
              <div className="absolute right-0 top-1/2 translate-x-[2px] -translate-y-1/2 border-y-[6px] border-l-[8px] border-y-transparent border-l-black/40 w-0 h-0" />
            </div>
          </div>

          <div className="relative z-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {steps.map((step, idx) => (
              <AnimateIn key={step.id} delay={idx * 0.15} direction="up" className="h-full">
                <article className="flex h-full flex-col">
                  <div className="mb-6 flex h-8 items-center">
                    <div className={`rounded-full px-5 py-1.5 text-sm font-semibold tracking-wide shadow-sm ${idx === 2 ? "bg-[#00a1e0] text-white" : "bg-white text-gray-900"}`}>
                      Step {step.step}
                    </div>
                  </div>
                  <motion.div
                    className="group flex flex-1 flex-col rounded-[24px] border border-black/10 bg-white p-6 shadow-sm transition-colors hover:border-[#13a0e7]/40 hover:shadow-md sm:p-8"
                    whileHover={{ y: -4 }}
                  >
                    {step.icon && (
                      <div className="mb-5 flex h-12 w-12 items-center justify-center overflow-hidden rounded-[14px] bg-[#f5f5f4]">
                        <Image alt="" width={40} height={40} className="h-8 w-8 object-contain" src={step.icon} />
                      </div>
                    )}
                    <h3 className="mb-3 text-[20px] font-semibold leading-[1.3] text-[#1c1917]">{step.title}</h3>
                    <p className="text-[15px] leading-[1.6] text-[#44403c]">{step.body}</p>
                  </motion.div>
                </article>
              </AnimateIn>
            ))}
          </div>
        </div>

        {/* Bottom Wide Cards */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {cards.map((card, idx) => (
            <AnimateIn key={card.id} delay={0.5 + idx * 0.2} direction="up" className="h-full">
              <motion.article
                className="group flex h-full flex-col rounded-[24px] border border-black/10 bg-white p-6 shadow-sm transition-colors hover:border-[#13a0e7]/40 hover:shadow-md sm:p-8"
                whileHover={{ y: -4 }}
              >
                {card.icon && (
                  <div className="mb-5 flex h-12 w-12 items-center justify-center overflow-hidden rounded-[14px] bg-[#f5f5f4]">
                    <Image alt="" width={40} height={40} className="h-8 w-8 object-contain" src={card.icon} />
                  </div>
                )}
                <h3 className="mb-3 text-[22px] font-semibold leading-[1.3] text-[#1c1917]">{card.title}</h3>
                <p className="text-[15px] leading-[1.6] text-[#44403c]">{card.body}</p>
              </motion.article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
};
