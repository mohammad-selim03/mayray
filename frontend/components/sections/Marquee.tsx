"use client";

import { motion } from "framer-motion";
import type { HomeMarqueeContent } from "../../lib/cms/schema/documents/pages/home";

const Dot = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="shrink-0 opacity-50">
    <circle cx="4" cy="4" r="4" fill="currentColor" />
  </svg>
);

export const Marquee = ({ content }: { content: HomeMarqueeContent }) => {
  const items = content.items.map((i) => i.text);

  // Duplicate 2x for seamless loop — animate from 0 to -50% of total width
  const doubled = [...items, ...items];
  const duration = Math.max(15, items.length * 2.5);

  return (
    <section className="mt-28 bg-white py-10 text-[#1c1917] overflow-hidden flex border-y border-black/5">
      <motion.div
        className="flex items-center whitespace-nowrap will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((text, idx) => (
          <div key={idx} className="flex items-center gap-6 sm:gap-10 px-5 sm:px-8">
            <Dot />
            <span className="text-[28px] font-semibold sm:text-[48px] tracking-tight">{text}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};
