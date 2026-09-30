"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, ButtonLink } from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  CalendarCheck,
  ClipboardList,
  FileCheck,
  FileText,
  Filter,
  Headphones,
  Phone,
  RefreshCw,
  ShieldCheck,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { AnimateIn } from "../ui/AnimateIn";
import { useSiteData } from "../../lib/SiteDataContext";
import type { HomeIndustryRoiContent } from "../../lib/cms/schema/documents/pages/home";

// A leading icon per use-case pill, matched on keywords (matches the Figma for the Car tab and
// stays sensible for the other industries).
const USE_CASE_ICONS: { match: RegExp; icon: LucideIcon }[] = [
  { match: /lead|qualif|inquir/i, icon: Filter },
  { match: /support/i, icon: Headphones },
  { match: /appoint|schedul|tour|reminder|confirm/i, icon: CalendarCheck },
  { match: /follow|onboard/i, icon: UserPlus },
  { match: /conflict|check|compliance/i, icon: ShieldCheck },
  { match: /quote/i, icon: FileText },
  { match: /claim|process/i, icon: RefreshCw },
  { match: /intake|case/i, icon: ClipboardList },
  { match: /call|phone/i, icon: Phone },
];
const iconFor = (name: string): LucideIcon => USE_CASE_ICONS.find((u) => u.match.test(name))?.icon ?? FileCheck;

export const IndustryROI = ({ content }: { content: HomeIndustryRoiContent }) => {
  const headline = content.title;
  const items = useSiteData().industryROI;
  const [activeTab, setActiveTab] = useState(items[0]?.industry ?? "");

  const data = items.find((item) => item.industry === activeTab) || items[0];
  if (!data) return null;


  return (
    <section id="industry-roi" className="mx-auto mt-28 w-full max-w-[1170px] px-4 sm:px-6 lg:px-0">
      <AnimateIn>
        <h2 className="text-center text-[32px] font-semibold leading-[1.2] sm:text-[40px] lg:text-[48px]">{headline}</h2>
      </AnimateIn>
      
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {items.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.industry ? "active-pill" : "pill"}
            onClick={() => setActiveTab(item.industry)}
            className="min-w-[120px]"
          >
            {item.industry}
          </Button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="mt-12 grid gap-8 md:grid-cols-2"
        >
          {data.image && (
            <div className="overflow-hidden rounded-3xl shadow-lg h-[280px] md:h-auto">
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                alt={`${data.industry} use case`}
                className="h-full w-full object-cover"
                src={data.image}
              />
            </div>
          )}
          <div className="flex flex-col justify-center">
            <p className="text-[18px] leading-[1.5] text-[#44403c] sm:text-[24px]">{content.useCasesLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {data.useCases.map((useCase, idx) => {
                const Icon = iconFor(useCase);
                return (
                  <motion.span
                    key={useCase}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-lg text-[#44403c] shadow-sm border border-black/5"
                  >
                    <Icon className="size-[18px] shrink-0 text-[#70707b]" strokeWidth={1.6} />
                    {useCase}
                  </motion.span>
                );
              })}
            </div>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start gap-1 whitespace-nowrap text-[48px] leading-none text-[#44403c] font-bold sm:text-[64px]"
                >
                  <ArrowUp className="mt-1 size-7 shrink-0 text-[#22c55e] sm:size-9" strokeWidth={2.5} />
                  {data?.cvr}
                </motion.p>
                <p className="mt-2 text-xl text-[#4a5565]">{content.cvrLabel}</p>
              </div>
              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start gap-1 whitespace-nowrap text-[48px] leading-none text-[#44403c] font-bold sm:text-[64px]"
                >
                  <ArrowUp className="mt-1 size-7 shrink-0 text-[#22c55e] sm:size-9" strokeWidth={2.5} />
                  {data?.showUp}
                </motion.p>
                <p className="mt-2 text-xl text-[#4a5565]">{content.showUpLabel}</p>
              </div>
            </div>
            <div className="mt-14 flex flex-wrap items-center gap-4">
              <ButtonLink link={content.cta} variant="primary" className="px-10 py-5 w-fit group" />
              {activeTab === "Legal" && (
                <Link href="/legal">
                  <Button variant="secondary" className="px-8 py-5 border border-[#e7e5e4] text-[#13a0e7] font-semibold hover:border-[#13a0e7]">
                    Explore Legal AI Solution →
                  </Button>
                </Link>
              )}
              {activeTab === "Real estate" && (
                <Link href="/real-estate">
                  <Button variant="secondary" className="px-8 py-5 border border-emerald-300 text-emerald-700 font-semibold hover:border-emerald-600 bg-emerald-50/50">
                    Explore Real Estate AI Solution →
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
