"use client";

import React from "react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Mail, ShieldCheck, ArrowRight } from "lucide-react";

export const PrivacyContactCard = () => {
  return (
    <section className="bg-[#06060a] py-20 text-white border-t border-white/10">
      <div className="mx-auto max-w-[1235px] px-4 sm:px-6 lg:px-8">
        
        <AnimateIn>
          <div className="rounded-3xl border border-white/10 bg-[#11111c] p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            
            <div className="space-y-3 max-w-[600px] text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Dedicated Data Protection Office
              </div>
              
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                Have specific privacy or compliance questions?
              </h3>
              
              <p className="text-sm text-gray-300 leading-relaxed">
                Our DPO and security engineering team are available to review Business Associate Agreements (BAA), custom DPA contracts, or enterprise security questionnaires.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-4">
              <a
                href="mailto:privacy@mayray.ai"
                className="flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3.5 text-sm font-bold transition-all shadow-lg shadow-emerald-500/20"
              >
                <Mail className="h-4 w-4" />
                <span>Contact DPO Office</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

          </div>
        </AnimateIn>

      </div>
    </section>
  );
};
