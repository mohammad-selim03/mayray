"use client";

import React from "react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { ShieldCheck, Lock, Calendar } from "lucide-react";
import { usePageField } from "@/lib/PageContentContext";

export const PrivacyHero = () => {
  const badge = usePageField("hero", "badge", "SOC2 Type II & HIPAA Compliant Privacy Standards");
  const headline = usePageField("hero", "headline", "Mayray AI Privacy Policy");
  const subheadline = usePageField("hero", "subheadline", "Your data security and privacy are fundamental to our architecture. We guarantee zero training on public models, AES-256 end-to-end encryption, and full user data sovereignty.");

  return (
    <section className="relative overflow-hidden bg-white pt-12 pb-16 text-black">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-0 h-[450px] w-[750px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-emerald-500/20 via-cyan-500/15 to-indigo-600/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1235px] px-4 sm:px-6 lg:px-8">
        
        {/* Badge */}
        <AnimateIn>
          <div className="flex justify-center pt-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur-md">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>{badge}</span>
            </div>
          </div>
        </AnimateIn>

        {/* Title */}
        <AnimateIn delay={0.1}>
          <h1 className="mx-auto mt-6 max-w-[800px] text-center text-[36px] font-bold leading-[1.15] tracking-tight text-white sm:text-[52px] lg:text-[60px]">
            {headline}
          </h1>
        </AnimateIn>

        {/* Subtitle & Date Badge */}
        <AnimateIn delay={0.2}>
          <p className="mx-auto mt-4 max-w-[640px] text-center text-[16px] leading-[1.7] text-gray-400 sm:text-[18px]">
            {subheadline}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 font-medium">
              <Calendar className="h-3.5 w-3.5 text-emerald-400" />
              Last Updated: September 6, 2026
            </span>
            <span className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 font-medium">
              <Lock className="h-3.5 w-3.5 text-cyan-400" />
              Version 4.2 • Enterprise Protocol
            </span>
          </div>
        </AnimateIn>

      </div>
    </section>
  );
};
