"use client";

import React from "react";
import { AnimateIn } from "../ui/AnimateIn";
import { motion } from "framer-motion";
import { flagUrl } from "../../lib/cms/schema/countries";
import type { HomeLanguagesContent } from "../../lib/cms/schema/documents/pages/home";

export const Languages = ({ content }: { content: HomeLanguagesContent }) => {
  const badgeText = content.badge;
  // The grid is designed for 22 flags: 11 before the badge and 11 after it on desktop.
  const flagUrls = content.flags.map((f) => flagUrl(f.country));
  const renderFlag = (src: string, idx: number) => (
    <AnimateIn key={`flag-${idx}`} delay={idx * 0.02} direction="none">
      <motion.img
        whileHover={{ scale: 1.05, zIndex: 10 }}
        alt="Language flag"
        loading="lazy"
        decoding="async"
        width={320}
        height={213}
        className="h-[50px] w-full cursor-pointer rounded-[8px] border border-black/5 object-cover shadow-sm sm:h-[65px] lg:h-[110px]"
        src={src}
      />
    </AnimateIn>
  );

  const renderBox = () => (
    <AnimateIn direction="none" className="col-span-2 h-[50px] sm:h-[65px] lg:h-[95px]">
      <motion.div
        className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[12px] border border-white/60 shadow-sm"
        whileHover={{ scale: 1.02 }}
      >
        <div className="absolute inset-0 bg-white/70 backdrop-blur-md" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#ffd194] via-[#ffb199]/40 to-transparent opacity-60 blur-md" />

        <span className="relative z-10 text-[18px] font-semibold tracking-tight text-gray-900 sm:text-[24px] lg:text-[28px]">
          {badgeText}
        </span>
      </motion.div>
    </AnimateIn>
  );

  return (
    <section className="mx-auto mt-24 w-full py-16">
      <div className="relative">
        {/* Desktop Grid (8 cols) -> Box centers perfectly after 11 flags */}
        <div className="hidden grid-cols-8 gap-3 sm:gap-4 lg:grid">
          {flagUrls.slice(0, 11).map(renderFlag)}
          {renderBox()}
          {flagUrls.slice(11, 22).map((src, i) => renderFlag(src, i + 11))}
        </div>

        {/* Tablet Grid (6 cols) -> Box centers perfectly after 8 flags */}
        <div className="hidden grid-cols-6 gap-3 sm:grid lg:hidden sm:gap-4">
          {flagUrls.slice(0, 8).map(renderFlag)}
          {renderBox()}
          {flagUrls.slice(8, 22).map((src, i) => renderFlag(src, i + 8))}
        </div>

        {/* Mobile Grid (4 cols) -> Box centers perfectly after 9 flags */}
        <div className="grid grid-cols-4 gap-3 sm:hidden">
          {flagUrls.slice(0, 9).map(renderFlag)}
          {renderBox()}
          {flagUrls.slice(9, 22).map((src, i) => renderFlag(src, i + 9))}
        </div>
      </div>
    </section>
  );
};
