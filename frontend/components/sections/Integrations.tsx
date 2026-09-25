"use client";

import React from "react";
import { useSiteData } from "../../lib/SiteDataContext";
import type { HomeIntegrationsContent } from "../../lib/cms/schema/documents/pages/home";
import { AnimateIn } from "../ui/AnimateIn";
import { motion } from "framer-motion";
import Image from "next/image";

type Logo = { name: string; src: string };

export const Integrations = ({ content }: { content: HomeIntegrationsContent }) => {
  const banner = content.banner;
  const logos: Logo[] = useSiteData()
    .integrations.filter((i) => i.logo)
    .map((i) => ({ name: i.name, src: i.logo! }));

  return (
    <section id="integrations" className="mx-auto mt-0 w-full max-w-280 px-4 sm:px-6 lg:px-0">
      <AnimateIn>
        <div className="mx-auto flex w-fit flex-col sm:flex-row items-center gap-3 sm:gap-0 rounded-full bg-white px-6 py-4 text-sm sm:text-base font-medium text-[#292524] shadow-sm text-center">
          <div className="flex gap-0">
            <motion.span
              className="size-6 rounded-full bg-[#ff8b66]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <motion.span
              className="size-6 rounded-full bg-[#64d3ff]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            />
            <motion.span
              className="size-6 rounded-full bg-[#ffc857]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 1 }}
            />
          </div>
          <span className="sm:ml-3">{banner}</span>
        </div>
      </AnimateIn>

      <div className="mt-10 sm:mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-16">
        {logos.map((logo, idx) => (
          <AnimateIn key={logo.name} delay={idx * 0.05} direction="none" className="h-full">
            <motion.div
              className="grid h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] lg:h-[120px] lg:w-[120px] place-items-center rounded-xl bg-white"
              whileHover={{ scale: 1.1 }}
            >
              <div className="relative h-10 w-full sm:h-12 lg:h-16 transition-all">
                <Image alt={logo.name} fill sizes="120px" src={logo.src} />
              </div>
            </motion.div>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
};
