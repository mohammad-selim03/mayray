"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, CircleCheck } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PricingCTABanner } from "@/components/sections/PricingCTABanner";
import { CmsIcon, CmsImage, initials, linkTarget } from "@/components/sections/industry/IndustrySections";
import { useCmsGlobal } from "@/lib/cms/CmsGlobalsContext";
import type { DocumentContent } from "@/lib/cms/schema";

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-7 space-y-3 text-[13px] leading-5 text-[#777680] sm:text-sm">
      {items.map((item, i) => (
        <li className="flex gap-2.5" key={i}>
          <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#6f737a]" strokeWidth={1.8} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function LegalIndustryPage({ content }: { content: DocumentContent<"legal"> }) {
  const [openFaq, setOpenFaq] = useState(1);
  const brands = useCmsGlobal("trusted-brands").content;
  const { hero, painPoints, workflow, featureRow1, featureRow2, centered, testimonials, integrations, faq } = content;
  // Matches the design: the smaller half of the questions goes in the left column.
  const half = Math.floor(faq.items.length / 2);
  const panel = (row: typeof featureRow1, className: string) =>
    row.mediaKind === "image" && row.image ? (
      <div className={`overflow-hidden rounded-2xl bg-white ${className}`}>
        <CmsImage image={row.image} fallback={{ width: 1000, height: 720 }} className="h-auto w-full" />
      </div>
    ) : (
      <div className={`min-h-[310px] rounded-2xl sm:min-h-[390px] ${className}`} style={{ backgroundColor: row.panelColor }} />
    );

  return (
    <div className="overflow-hidden bg-[#f6f6f6] text-[#202024]">
      <section className="relative pb-20 pt-5 sm:pb-28">
        <div className="absolute inset-x-0 top-0 h-[640px] bg-[#f7ece9]" />
        <div className="absolute left-0 top-0 h-[690px] w-[38%] bg-[#edf4f5]" />
        <div className="relative z-50 mb-6">
          <Navbar />
        </div>
        <div className="relative mx-auto grid max-w-[1170px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[.96fr_1.04fr] lg:gap-16 lg:px-0">
          <div className="pt-4 lg:pt-8">
            <h1 className="max-w-[565px] whitespace-pre-line text-[40px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[52px] lg:text-[58px]">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-[520px] whitespace-pre-line text-[15px] leading-[1.45] text-[#75747d] sm:text-[17px]">
              {hero.subtitle}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={hero.primaryCta.href} {...linkTarget(hero.primaryCta)} className="inline-flex h-11 items-center justify-center rounded-full bg-[#13a0e7] px-7 text-sm font-medium text-white transition hover:bg-[#0e8fd0]">
                {hero.primaryCta.label}
              </Link>
              <Link href={hero.secondaryCta.href} {...linkTarget(hero.secondaryCta)} className="inline-flex h-11 items-center justify-center rounded-full bg-white px-7 text-sm font-medium text-[#39383e] transition hover:bg-[#f0f0f0]">
                {hero.secondaryCta.label}
              </Link>
            </div>
            {hero.note && (
              <div className="mt-9 flex max-w-[290px] items-start gap-3 text-xs leading-4 text-[#777680]">
                <span className="mt-0.5 text-[22px] leading-none text-[#ff8a1e]">☞</span>
                <span>{hero.note}</span>
              </div>
            )}
          </div>
          <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
            <div className="overflow-hidden bg-white shadow-[0_22px_50px_rgba(55,49,66,0.08)]">
              <CmsImage image={hero.image!} fallback={{ width: 1120, height: 720 }} priority className="h-auto w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="mx-auto max-w-[500px] whitespace-pre-line text-center text-[32px] font-semibold leading-[1.06] tracking-[-0.02em] sm:text-[40px]">{brands.heading}</h2>
          <div className="mt-12 grid grid-cols-2 items-center gap-x-6 gap-y-9 text-center text-[21px] font-semibold text-[#222227] sm:grid-cols-4 sm:text-[25px] lg:grid-cols-7">
            {brands.brands.map((brand, index) =>
              brand.logo ? (
                <span key={index} className="flex justify-center">
                  <CmsImage image={{ ...brand.logo, alt: brand.logo.alt || brand.name }} fallback={{ width: 160, height: 40 }} className="h-8 w-auto max-w-[160px] object-contain" />
                </span>
              ) : (
                <span key={index} className={brand.style === "serifItalic" ? "font-serif italic" : ""} style={{ color: brand.color }}>
                  {brand.name}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <section id="features" className="px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-[1170px]">
          <div className="mx-auto max-w-[680px] text-center">
            <h2 className="whitespace-pre-line text-[34px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[46px]">{painPoints.title}</h2>
            <p className="mx-auto mt-5 max-w-[610px] whitespace-pre-line text-sm leading-5 text-[#85848d]">{painPoints.subtitle}</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {painPoints.items.map(({ title, body, icon }, i) => (
              <article key={i} className="min-h-[178px] rounded-xl border border-[#e8e8e9] bg-white p-5 shadow-[0_1px_1px_rgba(20,20,20,.02)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4f4f5] text-[#64646a]">
                  <CmsIcon name={icon} className="h-5 w-5" strokeWidth={1.7} />
                </div>
                <h3 className="mt-5 text-[16px] font-semibold">{title}</h3>
                <p className="mt-2 whitespace-pre-line text-[13px] leading-5 text-[#888790]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="px-5 pb-20 sm:pb-28">
        <div className="mx-auto max-w-[1170px] rounded-[22px] bg-white p-7 sm:p-10 lg:p-14">
          <h2 className="max-w-[460px] whitespace-pre-line text-[37px] font-semibold leading-[1.05] tracking-[-0.025em] sm:text-[48px]">{workflow.title}</h2>
          <div className="mt-11 grid items-center gap-10 lg:grid-cols-[1fr_.98fr] lg:gap-14">
            <div className="space-y-6">
              {workflow.steps.map(({ title, body, icon }, i) => (
                <div className="grid grid-cols-[54px_1fr] gap-4" key={i}>
                  <span className="flex h-[54px] w-[54px] items-center justify-center rounded-xl bg-[#f4f4f5] text-[#62626a]"><CmsIcon name={icon} className="h-7 w-7" strokeWidth={1.45} /></span>
                  <div>
                    <h3 className="text-[15px] font-semibold text-[#5c5b62]">{title}</h3>
                    <p className="mt-2 max-w-[390px] whitespace-pre-line text-[13px] leading-5 text-[#8a8991]">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="overflow-hidden rounded-xl bg-[#f8f7fa]">
              <CmsImage image={workflow.image!} fallback={{ width: 900, height: 700 }} className="h-auto w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1170px] items-center gap-11 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:px-0 lg:py-20">
        <div>
          <h2 className="max-w-[390px] whitespace-pre-line text-[36px] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[46px]">{featureRow1.title}</h2>
          <p className="mt-5 max-w-[465px] whitespace-pre-line text-sm leading-5 text-[#85848d]">{featureRow1.body}</p>
          <CheckList items={featureRow1.checklist.map((c) => c.text)} />
        </div>
        {panel(featureRow1, "")}
      </section>

      <section className="mx-auto grid max-w-[1170px] items-center gap-11 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:px-0 lg:py-20">
        {panel(featureRow2, "order-2 lg:order-1")}
        <div className="order-1 lg:order-2">
          <h2 className="max-w-[480px] whitespace-pre-line text-[36px] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[46px]">{featureRow2.title}</h2>
          <p className="mt-5 max-w-[480px] whitespace-pre-line text-sm leading-5 text-[#85848d]">{featureRow2.body}</p>
          <CheckList items={featureRow2.checklist.map((c) => c.text)} />
        </div>
      </section>

      <section className="px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-[880px] text-center">
          <h2 className="whitespace-pre-line text-[36px] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[46px]">{centered.title}</h2>
          <p className="mx-auto mt-5 max-w-[650px] whitespace-pre-line text-sm leading-5 text-[#85848d]">{centered.body}</p>
          <div className="mx-auto mt-10 max-w-[750px] overflow-hidden rounded-2xl">
            <CmsImage image={centered.image!} fallback={{ width: 1540, height: 1000 }} className="h-auto w-full" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1170px] gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[.98fr_.78fr] lg:px-0">
        <div className="space-y-4">
          {testimonials.items.map(({ quote, body, name, role, avatar }, index) => (
            <article className="rounded-xl bg-white p-6 sm:p-7" key={index}>
              <div className="text-[18px] tracking-[0.12em] text-[#ffc41e]">★★★★★</div>
              <p className="mt-4 text-[16px] font-medium leading-6 text-[#5e5d63]">“{quote}”</p>
              <p className="mt-1 text-[15px] leading-6 text-[#606067]">{body}</p>
              <div className="mt-5 flex items-center gap-3">
                {avatar ? (
                  <CmsImage image={{ ...avatar, alt: "" }} fallback={{ width: 72, height: 72 }} className="h-9 w-9 rounded-full object-cover" />
                ) : (
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white ${index % 3 === 0 ? "bg-[#f08a6a]" : index % 3 === 1 ? "bg-[#4d6493]" : "bg-[#667d80]"}`}>{initials(name)}</span>
                )}
                <span><strong className="block text-[12px] text-[#57565d]">{name}</strong><span className="block text-[11px] text-[#96959d]">{role}</span></span>
              </div>
            </article>
          ))}
        </div>
        <div className="pt-4 lg:pl-10 lg:pt-0">
          <h2 className="max-w-[350px] whitespace-pre-line text-[40px] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[52px]">{testimonials.title}</h2>
        </div>
      </section>

      <section className="px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-[1170px]">
          <div className="mx-auto max-w-[650px] text-center">
            <h2 className="text-[37px] font-semibold tracking-[-0.025em] sm:text-[48px]">{integrations.title}</h2>
            <p className="mt-4 whitespace-pre-line text-sm leading-5 text-[#85848d]">{integrations.subtitle}</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {integrations.items.map(({ name, category, logo, mark }, index) => (
              <article key={index} className="flex min-h-[126px] flex-col items-center justify-center rounded-xl border border-[#e6e6e7] bg-white p-4 text-center">
                {logo ? (
                  <CmsImage image={{ ...logo, alt: "" }} fallback={{ width: 80, height: 80 }} className="h-10 w-10 object-contain" />
                ) : (
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${index % 4 === 0 ? "bg-[#e4f5ff] text-[#209ce5]" : index % 4 === 1 ? "bg-[#fff0ec] text-[#ff6f50]" : index % 4 === 2 ? "bg-[#eef9eb] text-[#4eaf41]" : "bg-[#eeeeff] text-[#6767d8]"}`}>{mark || initials(name)}</span>
                )}
                <h3 className="mt-3 text-[13px] font-semibold text-[#4d4c53]">{name}</h3>
                <p className="mt-1 text-[11px] text-[#a19fa6]">{category}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-[1170px]">
          <h2 className="text-center text-[37px] font-semibold tracking-[-0.025em] sm:text-[48px]">{faq.title}</h2>
          <div className="mt-12 grid gap-4 lg:grid-cols-2 lg:items-start">
            <div className="space-y-4">
              {faq.items.slice(0, half).map(({ question, answer }, index) => (
                <FaqItem key={index} number={index + 1} question={question} answer={answer} open={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)} />
              ))}
            </div>
            <div className="space-y-4">
              {faq.items.slice(half).map(({ question, answer }, index) => {
                const faqIndex = index + half;
                return <FaqItem key={faqIndex} number={faqIndex + 1} question={question} answer={answer} open={openFaq === faqIndex} onClick={() => setOpenFaq(openFaq === faqIndex ? -1 : faqIndex)} />;
              })}
            </div>
          </div>
        </div>
      </section>

      <PricingCTABanner />
      <Footer />
    </div>
  );
}

function FaqItem({ number, question, answer, open, onClick }: { number: number; question: string; answer: string; open: boolean; onClick: () => void }) {
  return (
    <article className={`overflow-hidden rounded-xl border transition-colors ${open ? "border-[#cbdcff] bg-[#e9f6ff]" : "border-transparent bg-white"}`}>
      <button type="button" aria-expanded={open} onClick={onClick} className="flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3f3f4] text-sm text-[#66656c]">{String(number).padStart(2, "0")}</span>
        <span className="flex-1 text-[14px] font-semibold text-[#5b5a61]">{question}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${open ? "rotate-180 text-[#ff8a6f]" : ""}`} strokeWidth={1.6} />
      </button>
      {open ? <p className="whitespace-pre-line px-[72px] pb-5 text-[13px] leading-5 text-[#7d7c84] sm:pr-10">{answer}</p> : null}
    </article>
  );
}

