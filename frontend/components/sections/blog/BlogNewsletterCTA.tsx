"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { useCmsGlobal } from "@/lib/cms/CmsGlobalsContext";

export const BlogNewsletterCTA: React.FC = () => {
  const { headline, button, artwork } = useCmsGlobal("cta-banner").content;
  return (
    <section className="relative z-10 mx-auto w-full max-w-[1170px] px-4 sm:px-6 lg:px-0">
      <AnimateIn>
        <div className="relative isolate overflow-hidden rounded-[32px] bg-[#1c1917] md:h-[319px]">
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-[302px] -z-10 size-[771px] rounded-full bg-[#4400ff] blur-[345px]"
          />
          <div className="relative z-10 px-6 pt-10 sm:px-10 md:pt-[54px]">
            <h2 className="max-w-[530px] text-[34px] font-semibold leading-[1.2] text-white sm:text-[48px]">
              {headline.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {i > 0 && (
                    <>
                      {" "}
                      <br className="hidden sm:block" />
                    </>
                  )}
                  {line}
                </React.Fragment>
              ))}
            </h2>
            <Link
              href={button.href}
              target={button.newTab ? "_blank" : undefined}
              rel={button.newTab ? "noopener noreferrer" : undefined}
              className="mt-10 inline-flex items-center justify-center rounded-full bg-[#13a0e7] px-9 py-[18px] text-[16px] font-medium leading-[19.4px] text-[#fcfcfc] transition-colors hover:bg-[#0f8ec4]"
            >
              {button.label}
            </Link>
          </div>
          {artwork && (
            <div className="relative -mb-24 ml-auto mt-4 aspect-[492/405] w-[80%] max-w-[492px] md:absolute md:left-[678px] md:top-[17px] md:m-0 md:w-[492px]">
              <Image
                src={artwork.url}
                alt={artwork.alt}
                fill
                sizes="492px"
                unoptimized={artwork.url.endsWith(".svg")}
                className="object-contain"
              />
            </div>
          )}
        </div>
      </AnimateIn>
    </section>
  );
};
