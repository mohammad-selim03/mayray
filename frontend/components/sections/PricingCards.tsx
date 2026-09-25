"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { AnimateIn } from "../ui/AnimateIn";
import { PRICING_ICON_SVGS } from "./pricingIcons";
import type { PricingHeaderContent, PricingPlan, PricingPlansContent } from "../../lib/cms/schema/documents/pages/pricing";

type BillingCycle = "annual" | "monthly";

const PricingCard = ({ plan, billing, featuresLabel }: { plan: PricingPlan; billing: BillingCycle; featuresLabel: string }) => {
  const price = billing === "annual" ? plan.annualPrice : plan.monthlyPrice;
  // Words such as "Contact us" are set smaller than a number.
  const isText = !/d/.test(price);
  return (
    <div
      className={clsx(
        "relative flex h-full flex-col rounded-3xl border border-[#000000] bg-white p-8 transition-shadow hover:shadow-lg",
        plan.highlighted && "border-[#13a0e7] rounded-b-3xl rounded-t-none shadow-lg"
      )}
    >
      {plan.highlighted && plan.highlightLabel && (
        <span className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-t-2xl px-4 py-1 text-[13px] w-full text-center font-xl bg-[#13a0e7] text-white">
          {plan.highlightLabel}
        </span>
      )}

      <h3 className="text-[20px] font-semibold text-[#1c1917]">{plan.name}</h3>

      <div className="mt-4 flex items-baseline gap-1">
        <span
          className={clsx(
            "text-[42px] font-bold leading-none tracking-tight",
            isText && "text-[32px]",
            plan.strikethrough && "line-through decoration-[3px]"
          )}
        >
          {price}
        </span>
        {plan.priceSuffix && (
          <span className="text-[15px] text-[#78716c]">{plan.priceSuffix}</span>
        )}
      </div>

      <p className="mt-3 text-[15px] leading-snug text-[#78716c]">{plan.subtitle}</p>

      {plan.cta.label && (
        <Link
          href={plan.cta.href || "#"}
          {...(plan.cta.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={clsx(
            "mt-6 block w-full rounded-full py-3.5 text-center text-[15px] font-semibold transition-all active:scale-[0.98]",
            plan.ctaStyle === "blue"
              ? "bg-[#13a0e7] text-white hover:bg-[#1089c9]"
              : "bg-[#1c1917] text-white hover:bg-[#292524]"
          )}
        >
          {plan.cta.label}
        </Link>
      )}

      <div className="mt-8 border-t border-[#f0eeec] pt-6">
        <p className="text-[14px] font-medium text-[#1c1917]">{featuresLabel}</p>
        <p className="mt-1 text-[14px] text-[#78716c]">{plan.featuresHeading}</p>
        <ul className="mt-4 space-y-3">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#44403c]">
              {f.icon === "tick" ? (
                PRICING_ICON_SVGS.tick
              ) : (
                <span className="mt-0.5 text-[14px] leading-none">{PRICING_ICON_SVGS[f.icon]}</span>
              )}
              <span>{f.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const PricingCards = ({ header, plans }: { header: PricingHeaderContent; plans: PricingPlansContent }) => {
  const [billing, setBilling] = useState<BillingCycle>("annual");

  return (
    <section className="mx-auto w-full max-w-[1170px] px-4 pt-20 pb-24 sm:px-6 lg:px-0">
      <AnimateIn>
        <h1 className="text-[42px] font-bold leading-tight tracking-tight sm:text-[56px] lg:text-[64px]">
          {header.title}
        </h1>
        <p className="mt-4 text-[16px] text-[#78716c] sm:text-[18px]">
          {header.subtitle}
        </p>
      </AnimateIn>

      {/* Billing Toggle */}
      <AnimateIn delay={0.1} className="mt-10 flex items-center justify-end gap-2">
        <div className="bg-[#E4E4E7] w-fit p-2 rounded-full">
          <button
            onClick={() => setBilling("annual")}
            className={clsx(
              "rounded-full border px-6 py-2.5 text-[14px] font-medium transition-all",
              billing === "annual"
                ? "bg-white text-[#13A0E7]"
                : "border-transparent text-[#78716c] hover:text-[#13A0E7]"
            )}
          >
            {header.annualLabel}
          </button>
          <button
            onClick={() => setBilling("monthly")}
            className={clsx(
              "rounded-full border px-6 py-2.5 text-[14px] font-medium transition-all",
              billing === "monthly"
                ? "bg-white text-[#13A0E7]"
                : "border-transparent text-[#78716c] hover:text-[#13A0E7]"
            )}
          >
            {header.monthlyLabel}
          </button>
        </div>
      </AnimateIn>

      {/* Pricing Cards */}
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {plans.items.map((plan, i) => (
          <AnimateIn key={i} delay={0.15 + i * 0.1} className="h-full">
            <PricingCard plan={plan} billing={billing} featuresLabel={plans.featuresLabel} />
          </AnimateIn>
        ))}
      </div>
    </section>
  );
};
