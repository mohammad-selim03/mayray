"use client"
import { useState, useRef } from "react";
import { ButtonLink } from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { AnimateIn } from "../ui/AnimateIn";
import Image from "next/image";
import { AIToolsModal, tools } from "../ui/AIToolsModal";
import type { HomeHeroContent } from "../../lib/cms/schema/documents/pages/home";

/** Splits "Transform ==Your Office== with AI" around its first ==highlight==. */
function splitHeadline(title: string) {
  const match = title.match(/^([\s\S]*?)==([\s\S]+?)==([\s\S]*)$/);
  if (!match) return { before: title.replace(/==/g, ""), highlight: "", after: "" };
  return { before: match[1].trimEnd(), highlight: match[2], after: match[3].replace(/==/g, "").trimStart() };
}

export const Hero = ({ content }: { content: HomeHeroContent }) => {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<number | null>(null);
  const toolsBtnRef = useRef<HTMLButtonElement>(null);

  const { before, highlight, after } = splitHeadline(content.title);

  return (
    <>
    <section id="hero" className="relative min-h-[620px]">
      <div className="absolute inset-0 -z-10 -top-20">
        <Image
          src={content.background?.url ?? "/assets/herobg.png"}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          unoptimized={content.background?.url.endsWith(".svg")}
          className="object- object-top"
          alt={content.background?.alt ?? ""}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-4 pb-32 pt-10 sm:px-6 lg:px-8">
        <div className="grid items-center gap-5 lg:grid-cols-[1fr_470px] py-8">
          {/* ── Left column ── */}
          <div>
            <AnimateIn delay={0.2}>
              <h1 className="max-w-[900px] text-[40px] font-bold leading-[1.12] sm:text-[48px] lg:text-[60px]">
                {before}{" "}
                {highlight && (
                  <motion.span
                    className="relative z-20 inline-block"
                    // animate={{ rotate: [-1.5, 1.5, -1.5] }}
                    // transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  >
                    <span className="relative z-20 !inline-block">{highlight}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 382 90"
                      fill="none"
                      className="pointer-events-none absolute left-1/2 top-[30%] -z-10 h-auto w-[110%] -translate-x-1/2 -translate-y-[28%] rotate-2"
                    >
  <path d="M63.1665 89.259C23.1988 95.0779 26.5124 64.7578 51.17 63.4317L8.49476 60.6183C-5.82969 52.3875 0.616311 34.7582 8.49476 34.7582H24.2516C8.20813 24.3029 17.8057 10.2775 26.4003 10.0104C133.755 6.67357 351.616 0 364.221 0C376.827 4.22659 371.224 17.5181 366.847 23.6356C389.576 24.0805 382.604 45.3247 372.577 50.886C379.262 69.572 368.757 73.9654 359.446 73.9654L63.1665 89.259Z" fill="#FF8B66"/>
</svg>
                  </motion.span>
                )}{" "}
                <span className="mt-8 block">{after}</span>
              </h1>
            </AnimateIn>

            <AnimateIn delay={0.3}>
              <p className="mt-7 max-w-[540px] text-[16px] leading-[1.65] text-[#57534e] sm:text-[18px]">
                {content.subtitle}
              </p>
            </AnimateIn>

            <AnimateIn delay={0.4} className="mt-9 flex flex-wrap items-center gap-4">
              <ButtonLink link={content.primaryCta} variant="primary" />
              <ButtonLink link={content.secondaryCta} variant="secondary" />
            </AnimateIn>
          </div>

          {/* ── Right column ── */}
          <div className="flex flex-col gap-4">
            {/* Automation card */}
            <AnimateIn delay={0.5} direction="left">
              <motion.div
                className="rounded-2xl border border-[#13a0e7]/60 bg-white/35 p-6 shadow-xl backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="min-h-[64px]">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={selectedTool ?? "default"}
                      className="text-[22px] leading-snug text-[#44403c]"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    >
                      {selectedTool !== null ? tools[selectedTool].text : content.prompt}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="mt-14 flex items-center justify-between">
                  <button
                    ref={toolsBtnRef}
                    onClick={() => setToolsOpen(true)}
                    className="flex items-center gap-2 text-sm font-medium text-black transition-opacity hover:opacity-70"
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={selectedTool ?? "default"}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Image
                          src={selectedTool !== null ? tools[selectedTool].src : "/assets/toolsicon.png"}
                          width={20}
                          height={20}
                          alt=""
                          className="object-contain"
                        />
                        {selectedTool !== null ? tools[selectedTool].name : "AI Tools"}
                      </motion.span>
                    </AnimatePresence>
                  </button>
                  <motion.span
                    className="grid size-11 cursor-pointer place-items-center rounded-full bg-white text-lg shadow-md"
                    whileHover={{ x: 4, backgroundColor: "#13a0e7", color: "#fff" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">
  <path d="M7.75 10.75L12.75 5.75L7.75 0.75M12.75 5.75H0.75" stroke="#1C1917" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
                  </motion.span>
                </div>
              </motion.div>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>

    <AIToolsModal
      open={toolsOpen}
      onClose={() => setToolsOpen(false)}
      triggerRef={toolsBtnRef}
      selectedTool={selectedTool}
      onSelectTool={setSelectedTool}
    />
    </>
  );
};
