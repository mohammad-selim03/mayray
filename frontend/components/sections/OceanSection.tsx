"use client";

import React from "react";
import { AnimateIn } from "../ui/AnimateIn";
import { motion } from "framer-motion";
import Image from "next/image";
import type { HomeOceanContent } from "../../lib/cms/schema/documents/pages/home";

export const OceanSection = ({ content }: { content: HomeOceanContent }) => {
  const { title: headline, subtitle: description, background, video } = content;
  const avatars = content.avatars.flatMap((a) => (a.photo ? [a.photo] : []));

  return (
    <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
      {/* Background Image with 180 deg rotation as requested */}
      <div className="absolute inset-0 z-0">
        <Image
          src={background?.url ?? "/bgg.png"}
          unoptimized={background?.url.endsWith(".svg")}
          alt={background?.alt ?? ""}
          fill
          sizes="100vw"
          loading="lazy"
          className=""
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1270px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[820px]">
            <AnimateIn>
              <h2 className="text-[32px] font-bold leading-[1.15] tracking-tight text-[#1c1917] sm:text-[48px] lg:text-[56px]">
                {headline}
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="mt-4 text-[16px] leading-[1.6] text-[#44403c] sm:text-[18px] lg:text-[20px]">
                {description}
              </p>
            </AnimateIn>
          </div>

          <AnimateIn delay={0.3} className="shrink-0">
            <div className="flex w-fit items-center -space-x-3 rounded-full bg-white px-5 py-3 shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
              {avatars.map((photo, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5, zIndex: 20 }}
                  className="relative size-10 rounded-full border-[3px] border-white shadow-sm sm:size-11 overflow-hidden"
                  style={{ zIndex: avatars.length - idx }}
                >
                  <Image
                    alt={photo.alt}
                    src={photo.url}
                    unoptimized={photo.url.endsWith(".svg")}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </AnimateIn>
        </div>

        <AnimateIn direction="up" delay={0.4} className="mt-16 sm:mt-20">
          <div className="relative aspect-square w-full overflow-hidden rounded-[24px] shadow-2xl sm:aspect-[4/3] lg:aspect-[16/9] lg:rounded-[32px]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              src={video?.url ?? "/manta.mp4"}
              poster={video?.poster}
            />
          </div>
        </AnimateIn>
      </div>
    </section>
  );
};
