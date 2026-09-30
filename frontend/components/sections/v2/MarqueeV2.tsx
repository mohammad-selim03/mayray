"use client";

import { motion } from "framer-motion";
import { AudioLines, Bot, Clock, Cpu, Sparkles, Workflow, Zap } from "lucide-react";
import type { HomeMarqueeContent } from "../../../lib/cms/schema/documents/pages/home";

// Home v2 marquee: dark band, each phrase led by a rounded icon tile.
const ICONS = [AudioLines, Zap, Clock, Bot, Workflow, Cpu, Sparkles];

export const MarqueeV2 = ({ content }: { content: HomeMarqueeContent }) => {
  const items = content.items.map((i) => i.text);
  const doubled = [...items, ...items];
  const duration = Math.max(20, items.length * 3);

  return (
    <section className="mt-28 flex overflow-hidden bg-[#1c1c1c] py-8 text-white">
      <motion.div
        className="flex items-center whitespace-nowrap will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((text, idx) => {
          const Icon = ICONS[idx % ICONS.length];
          return (
            <div key={idx} className="flex items-center gap-5 px-6 sm:gap-6 sm:px-8">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-[12px] border border-white/15 bg-white/10">
                <Icon className="size-5" strokeWidth={2} />
              </span>
              <span className="text-[28px] font-semibold tracking-tight sm:text-[40px]">{text}</span>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
};
