"use client";

import { useSiteData } from "../../lib/SiteDataContext";
import type { HomeAgentAreasContent } from "../../lib/cms/schema/documents/pages/home";
import { AnimateIn } from "../ui/AnimateIn";
import { motion } from "framer-motion";
import Image from "next/image";

type Card = { title: string; description: string; icon: string };

export const AgentAreas = ({ content }: { content: HomeAgentAreasContent }) => {
  const { title: headline, subtitle: description } = content;
  const cards: Card[] = useSiteData().useCases.map((u) => ({
    title: u.title,
    description: u.description,
    icon: u.icon ?? "/agentareacard/noun-marketing-8045132 1.svg",
  }));

  return (
    <section id="use-cases" className="mx-auto mt-28 w-full max-w-[1170px] scroll-mt-28 px-4 sm:px-6 lg:px-0">
      <AnimateIn>
        <h2 className="mx-auto max-w-[800px] text-center text-[32px] font-semibold leading-[1.2] sm:text-[40px] lg:text-[48px]">
          {headline}
        </h2>
      </AnimateIn>
      <AnimateIn delay={0.2}>
        <p className="mx-auto mt-6 max-w-[800px] text-center text-[18px] leading-[1.45] text-[#44403c] sm:text-[20px] lg:text-[24px]">
          {description}
        </p>
      </AnimateIn>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, idx) => (
          <AnimateIn key={card.title} delay={idx * 0.1} direction="up" className="h-full">
            <motion.article className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-black/5 h-full min-h-[220px] flex flex-col group transition-all">
              <div className="size-16 rounded-2xl grid place-items-center mb-3">
                <Image alt="" width={40} height={40} className="size-13" src={card.icon} />
              </div>
              <h3 className="text-[24px] font-bold leading-[1.2] mb-2">{card.title}</h3>
              <p className="text-[16px] leading-[1.5] text-[#44403c] line-clamp-2">{card.description}</p>
            </motion.article>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
};
