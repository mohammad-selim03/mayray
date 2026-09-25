"use client";

import Link from "next/link";
import Image from "next/image";
import { useCmsGlobal } from "@/lib/cms/CmsGlobalsContext";

export const PricingCTABanner = () => {
  const { headline, button, artwork } = useCmsGlobal("cta-banner").content;
  return (
    <section id="contact" className="px-5 pb-24 pt-10 sm:pb-[120px]">
      <div className="mx-auto grid max-w-[1170px] items-center overflow-hidden rounded-[20px] bg-[#211539] px-7 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1fr_.8fr] lg:px-12">
        <div>
          {/* This layout wraps the headline naturally, so line breaks from the editor become spaces. */}
          <h2 className="max-w-[420px] text-[38px] font-semibold leading-[1.08] tracking-[-0.025em] text-white sm:text-[48px]">
            {headline.replace(/\s*\n\s*/g, " ")}
          </h2>
          <Link
            href={button.href}
            target={button.newTab ? "_blank" : undefined}
            rel={button.newTab ? "noopener noreferrer" : undefined}
            className="mt-8 inline-flex h-15 items-center rounded-full bg-[#13a0e7] px-7 text-sm font-medium text-white transition hover:bg-[#0e8fd0]"
          >
            {button.label}
          </Link>
        </div>
        {artwork && (
          <div className="relative mt-5 min-h-[185px] sm:min-h-[285px] lg:mt-0">
            <Image
              src={artwork.url}
              alt={artwork.alt}
              fill
              sizes="(max-width: 1024px) 90vw, 480px"
              unoptimized={artwork.url.endsWith(".svg")}
              className="object-contain object-center scale-125 mt-10"
            />
          </div>
        )}
      </div>
    </section>
  );
};
