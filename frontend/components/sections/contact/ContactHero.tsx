"use client";

import { AnimateIn } from "@/components/ui/AnimateIn";

export const ContactHero = () => (
  <section className="mx-auto w-full max-w-[1170px] px-4 pt-16 sm:px-6 lg:px-0 lg:pt-[114px]">
    <AnimateIn>
      <div className="mx-auto flex max-w-[564px] flex-col gap-6 text-center">
        <p className="text-[18px] leading-[27px] text-[#13a0e7]">Get in Touch</p>
        <h1 className="text-[38px] font-bold leading-[1.2] text-[#18181b] sm:text-[46px] lg:text-[56px] lg:leading-[67.2px]">
          Contact Mayray AI
        </h1>
        <p className="text-[16px] leading-[24px] text-[#70707b] sm:text-[18px] sm:leading-[27px]">
          We would love to hear from you. We will respond promptly.
        </p>
      </div>
    </AnimateIn>
  </section>
);
