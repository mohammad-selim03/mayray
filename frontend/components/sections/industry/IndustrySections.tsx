"use client";

/**
 * Shared building blocks for the industry landing pages (Legal, Real Estate,
 * Ecommerce, ...). Every page in that family is the same sequence of sections
 * with different copy and artwork: content comes from the CMS, layout choices
 * (variants, heading widths, spacing) are props set by each page.
 *
 * Measurements follow the Figma industry template: a 1170px container, 48px
 * section headings on a 1.2 line-height, and 120px between sections.
 */

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, CircleCheck } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { CMS_ICONS } from "@/lib/cms/icons";
import { isIconName, type ImageValue, type LinkValue } from "@/lib/cms/schema";
import type {
  CenteredContent,
  FaqContent,
  FeatureRowContent,
  HeroContent,
  IntegrationsContent,
  PainPointsContent,
  PhotoBandContent,
  SecurityContent,
  TestimonialsContent,
  WorkflowContent,
} from "@/lib/cms/schema/blocks/industry";

export const H2_CLASS =
  "whitespace-pre-line text-[32px] font-semibold leading-[1.2] text-[#18181b] sm:text-[40px] lg:text-[48px]";

const SECTION = "mx-auto w-full max-w-[1170px] px-4 sm:px-6 lg:px-0";

/* ------------------------------------------------------------------ */

export function CmsIcon({ name, className, strokeWidth }: { name: string; className?: string; strokeWidth?: number }) {
  const Icon = isIconName(name) ? CMS_ICONS[name] : null;
  return Icon ? <Icon className={className} strokeWidth={strokeWidth} /> : null;
}

/** next/image for a CMS image, falling back to a typical size when an upload has no dimensions. */
export function CmsImage({
  image,
  className,
  priority,
  fallback = { width: 1200, height: 900 },
}: {
  image: ImageValue;
  className?: string;
  priority?: boolean;
  fallback?: { width: number; height: number };
}) {
  return (
    <Image
      src={image.url}
      alt={image.alt}
      width={image.width ?? fallback.width}
      height={image.height ?? fallback.height}
      priority={priority}
      unoptimized={image.url.endsWith(".svg")}
      className={className}
    />
  );
}

export const linkTarget = (link: LinkValue) => (link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {});

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-7 space-y-3">
      {items.map((item, i) => (
        <li className="flex gap-3 text-[15px] leading-[25.6px] text-[#70707b] sm:text-[16px]" key={i}>
          <CircleCheck className="mt-1 h-[18px] w-[18px] shrink-0 text-[#70707b]" strokeWidth={1.6} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */

/**
 * `split` puts the copy beside the artwork (Legal, Real Estate); `centered`
 * stacks a centred headline above a full-width image (Ecommerce).
 */
export function IndustryHero({ content, variant = "split" }: { content: HeroContent; variant?: "split" | "centered" }) {
  const { title, subtitle, primaryCta, secondaryCta, note, image } = content;
  const buttons = (
    <>
      <Link
        href={primaryCta.href}
        {...linkTarget(primaryCta)}
        className="inline-flex h-[55px] items-center justify-center rounded-full bg-[#13a0e7] px-8 text-[16px] font-medium text-[#fcfcfc] transition hover:bg-[#0e8fd0]"
      >
        {primaryCta.label}
      </Link>
      <Link
        href={secondaryCta.href}
        {...linkTarget(secondaryCta)}
        className="inline-flex h-[55px] items-center justify-center rounded-full bg-[#fcfcfc] px-8 text-[16px] font-medium text-[#18181b] transition hover:bg-[#f0f0f0]"
      >
        {secondaryCta.label}
      </Link>
    </>
  );

  const noteBlock = note ? (
    <>
      <span aria-hidden className="text-[22px] leading-none text-[#ff8a1e]">
        &#9758;
      </span>
      <span className="text-[14px] leading-[16.9px] text-[#51525c]">{note}</span>
    </>
  ) : null;

  if (variant === "centered") {
    return (
      <section className={`${SECTION} pt-10 lg:pt-[91px]`}>
        <AnimateIn>
          <h1 className="mx-auto max-w-[1000px] whitespace-pre-line text-center text-[34px] font-bold leading-[1.2] text-[#18181b] sm:text-[44px] lg:text-[56px] lg:leading-[67.2px]">
            {title}
          </h1>
          <p className="mx-auto mt-[37px] max-w-[950px] whitespace-pre-line text-center text-[16px] leading-[26px] text-[#51525c] sm:text-[18px] sm:leading-[27px]">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-5">{buttons}</div>
          {noteBlock && <div className="mx-auto mt-6 flex max-w-[300px] items-start justify-center gap-3">{noteBlock}</div>}
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <CmsImage image={image!} priority className="mx-auto mt-[38px] h-auto w-full max-w-[950px] rounded-3xl" />
        </AnimateIn>
      </section>
    );
  }

  return (
    <section className={`${SECTION} pt-10 lg:pt-[91px]`}>
      <div className="grid items-start gap-10 lg:grid-cols-[641px_500px] lg:gap-[29px]">
        <AnimateIn className="lg:pt-[38px]">
          <h1 className="whitespace-pre-line text-[34px] font-semibold leading-[1.2] text-[#18181b] sm:text-[42px] lg:text-[48px] lg:leading-[57.6px]">
            {title}
          </h1>
          <p className="mt-[33px] whitespace-pre-line text-[16px] leading-[26px] text-[#51525c] sm:text-[18px] sm:leading-[27px]">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-5">{buttons}</div>
          {noteBlock && <div className="mt-[50px] flex max-w-[300px] items-start gap-3">{noteBlock}</div>}
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <CmsImage image={image!} priority className="h-auto w-full rounded-2xl lg:h-[450px] lg:w-[500px] lg:object-cover" />
        </AnimateIn>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function IndustryPainPoints({
  content,
  id = "features",
  // Each design sets its own measure for this heading block.
  headingWidth = "max-w-[706px]",
}: {
  content: PainPointsContent;
  id?: string;
  headingWidth?: string;
}) {
  return (
    <section id={id} className={SECTION}>
      <AnimateIn>
        <h2 className={`mx-auto ${headingWidth} text-center ${H2_CLASS}`}>{content.title}</h2>
        <p className={`mx-auto mt-[35px] ${headingWidth} whitespace-pre-line text-center text-[16px] leading-[25.6px] text-[#45556c]`}>
          {content.subtitle}
        </p>
      </AnimateIn>
      <div className="mt-[108px] grid gap-[30px] md:grid-cols-3">
        {content.items.map(({ title, body, icon }, i) => (
          <AnimateIn key={i} delay={0.1 * i} className="h-full">
            <article className="flex h-full flex-col rounded-2xl border border-[#e4e4e7] bg-white p-8 lg:min-h-[252px]">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4f4f5] text-[#52525b]">
                <CmsIcon name={icon} className="h-5 w-5" strokeWidth={1.7} />
              </div>
              <h3 className="mt-7 text-[20px] font-semibold leading-[28px] text-[#26272b]">{title}</h3>
              <p className="mt-2 whitespace-pre-line text-[16px] leading-[25.6px] text-[#70707b]">{body}</p>
            </article>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function IndustryWorkflow({ content, id = "workflow" }: { content: WorkflowContent; id?: string }) {
  return (
    <section id={id} className={`${SECTION} pt-[120px]`}>
      <AnimateIn>
        <div className="rounded-[32px] bg-white p-8 sm:p-10">
          <h2 className={`max-w-[530px] ${H2_CLASS}`}>{content.title}</h2>
          <div className="mt-[57px] grid items-center gap-10 lg:grid-cols-[1fr_500px] lg:gap-[60px]">
            <div className="space-y-8 lg:space-y-[62px]">
              {content.steps.map(({ title, body, icon }, i) => (
                <div className="flex gap-6" key={i}>
                  <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl bg-[#f4f4f5] text-[#52525b]">
                    <CmsIcon name={icon} className="h-7 w-7" strokeWidth={1.45} />
                  </span>
                  <div>
                    <h3 className="text-[20px] font-semibold leading-[28px] text-[#3f3f46]">{title}</h3>
                    <p className="mt-2 max-w-[430px] whitespace-pre-line text-[16px] leading-[25.6px] text-[#70707b]">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <CmsImage image={content.image!} className="h-auto w-full rounded-2xl lg:h-[450px] lg:w-[500px] lg:object-cover" />
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/**
 * One copy/artwork row. The artwork is an image or a flat colour panel —
 * the template uses plain tinted panels where the design has no artwork yet.
 */
export function IndustryFeatureRow({
  content,
  reversed = false,
  topPadding = "pt-[120px]",
}: {
  content: FeatureRowContent;
  reversed?: boolean;
  topPadding?: string;
}) {
  const { title, body, checklist, mediaKind, image, panelColor } = content;
  const mediaNode =
    mediaKind === "image" && image ? (
      <CmsImage image={image} fallback={{ width: 1140, height: 900 }} className="h-auto w-full rounded-3xl lg:h-[450px] lg:object-cover" />
    ) : (
      <div className="h-[280px] rounded-3xl sm:h-[360px] lg:h-[450px]" style={{ backgroundColor: panelColor }} />
    );
  const copy = (
    <>
      <h2 className={`max-w-[502px] ${H2_CLASS}`}>{title}</h2>
      <p className="mt-[38px] max-w-[463px] whitespace-pre-line text-[16px] leading-[25.6px] text-[#70707b]">{body}</p>
      <CheckList items={checklist.map((c) => c.text)} />
    </>
  );

  return (
    <section className={`${SECTION} ${topPadding}`}>
      <div className="grid items-start gap-10 lg:grid-cols-[570px_570px] lg:gap-[30px]">
        <AnimateIn className={reversed ? "order-2 lg:order-1" : undefined}>{reversed ? mediaNode : copy}</AnimateIn>
        <AnimateIn delay={0.1} className={reversed ? "order-1 lg:order-2" : undefined}>
          {reversed ? copy : mediaNode}
        </AnimateIn>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function IndustryCentered({ content }: { content: CenteredContent }) {
  return (
    <section className={`${SECTION} pt-[120px]`}>
      <AnimateIn>
        <h2 className={`mx-auto max-w-[716px] text-center ${H2_CLASS}`}>{content.title}</h2>
        <p className="mx-auto mt-[40px] max-w-[716px] whitespace-pre-line text-center text-[16px] leading-[25.6px] text-[#70707b]">
          {content.body}
        </p>
      </AnimateIn>
      <AnimateIn delay={0.1}>
        <CmsImage image={content.image!} fallback={{ width: 1540, height: 1000 }} className="mx-auto mt-[80px] h-auto w-full max-w-[770px] rounded-3xl" />
      </AnimateIn>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function IndustryTestimonials({ content }: { content: TestimonialsContent }) {
  return (
    <section className={`${SECTION} pt-[120px]`}>
      <div className="grid gap-10 lg:grid-cols-[600px_1fr] lg:gap-[106px]">
        <div className="order-2 space-y-4 lg:order-1">
          {content.items.map(({ quote, body, name, role, avatar }, i) => (
            <AnimateIn key={i} delay={0.08 * i}>
              <article className="rounded-2xl bg-white p-7">
                <div className="text-[18px] tracking-[0.12em] text-[#ffc41e]">
                  &#9733;&#9733;&#9733;&#9733;&#9733;
                </div>
                <p className="mt-5 text-[18px] font-medium leading-[30px] text-[#3f3f46] sm:text-[20px]">
                  <span className="block">&ldquo;{quote}&rdquo;</span>
                  {body}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  {avatar ? (
                    <CmsImage image={{ ...avatar, alt: "" }} fallback={{ width: 96, height: 96 }} className="h-12 w-12 rounded-full object-cover" />
                  ) : (
                    <span aria-hidden className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e4e4e7] text-[14px] font-semibold text-[#51525c]">
                      {initials(name)}
                    </span>
                  )}
                  <span>
                    <strong className="block text-[16px] font-semibold text-[#51525c]">{name}</strong>
                    <span className="block text-[14px] leading-5 text-[#70707b]">{role}</span>
                  </span>
                </div>
              </article>
            </AnimateIn>
          ))}
        </div>
        {/* The heading stays pinned while the testimonial column scrolls past it. */}
        <AnimateIn className="order-1 lg:order-2 lg:h-full">
          <div className="lg:sticky lg:top-[120px]">
            <h2 className={`max-w-[464px] ${H2_CLASS}`}>{content.title}</h2>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function IndustryIntegrations({ content }: { content: IntegrationsContent }) {
  return (
    <section className={`${SECTION} pt-[120px]`}>
      <AnimateIn>
        <h2 className={`text-center ${H2_CLASS}`}>{content.title}</h2>
        <p className="mx-auto mt-[40px] max-w-[640px] whitespace-pre-line text-center text-[16px] leading-[25.6px] text-[#70707b]">
          {content.subtitle}
        </p>
      </AnimateIn>
      <div className="mt-[63px] grid grid-cols-2 gap-4 sm:grid-cols-3">
        {content.items.map(({ name, category, logo, mark }, index) => (
          <AnimateIn key={index} delay={0.04 * index} className="h-full">
            <article className="flex h-full min-h-[166px] flex-col items-center justify-center rounded-2xl bg-white p-6 text-center">
              {logo ? (
                <CmsImage image={{ ...logo, alt: "" }} fallback={{ width: 128, height: 128 }} className="h-16 w-16 object-contain" />
              ) : (
                <span aria-hidden className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f4f4f5] text-[20px] font-bold text-[#52525b]">
                  {mark || initials(name)}
                </span>
              )}
              <h3 className="mt-4 text-[14px] font-semibold leading-[17.5px] text-[#26272b]">{name}</h3>
              <p className="mt-1 text-[12px] leading-4 text-[#a0a0ab]">{category}</p>
            </article>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function IndustryFAQ({
  content,
  openIndex,
  onToggle,
}: {
  content: FaqContent;
  openIndex: number;
  onToggle: (index: number) => void;
}) {
  // The template puts the smaller half on the left (2 of 5, then 3).
  const items = content.items;
  const half = Math.floor(items.length / 2);
  const columns = [items.slice(0, half), items.slice(half)];

  return (
    <section className={`${SECTION} pt-[120px]`}>
      <AnimateIn>
        <h2 className={`text-center ${H2_CLASS}`}>{content.title}</h2>
      </AnimateIn>
      <div className="mt-[106px] grid gap-[30px] lg:grid-cols-2 lg:items-start">
        {columns.map((column, columnIndex) => (
          <div className="space-y-6" key={columnIndex}>
            {column.map(({ question, answer }, i) => {
              const index = columnIndex === 0 ? i : half + i;
              return (
                <FaqItem
                  key={index}
                  number={index + 1}
                  question={question}
                  answer={answer}
                  open={openIndex === index}
                  onClick={() => onToggle(index)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

function FaqItem({
  number,
  question,
  answer,
  open,
  onClick,
}: {
  number: number;
  question: string;
  answer: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <article
      className={`overflow-hidden rounded-[20px] border transition-colors ${
        open ? "border-[#d4c1fe] bg-[#e6f3fa]" : "border-transparent bg-white"
      }`}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={onClick}
        className="flex w-full items-center gap-4 px-6 py-7 text-left"
      >
        <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#f4f4f5] text-[16px] text-[#70707b]">
          {String(number).padStart(2, "0")}
        </span>
        <span className="flex-1 text-[18px] font-semibold leading-[21.6px] text-[#3f3f46]">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 transition-transform ${open ? "rotate-180 text-[#ff8a6f]" : "text-[#70707b]"}`}
          strokeWidth={1.6}
        />
      </button>
      {open ? <p className="whitespace-pre-line px-6 pb-7 pl-[92px] text-[16px] leading-6 text-[#70707b]">{answer}</p> : null}
    </article>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Full-bleed differentiator band over a photograph, with frosted-glass cards.
 * Breaks out of the page's horizontal padding via the negative margin.
 */
export function IndustryPhotoBand({ content }: { content: PhotoBandContent }) {
  return (
    <section className="relative -mx-5 mt-[120px] h-auto overflow-hidden py-16 sm:py-20 lg:h-[696px] lg:py-0">
      {content.image && (
        <Image src={content.image.url} alt="" fill sizes="100vw" unoptimized={content.image.url.endsWith(".svg")} className="-z-10 object-cover" />
      )}
      <div className="mx-auto flex h-full w-full max-w-[1170px] flex-col justify-center px-4 sm:px-6 lg:px-0">
        <AnimateIn>
          <h2 className="max-w-[870px] whitespace-pre-line text-[32px] font-semibold leading-[1.2] text-white sm:text-[40px] lg:text-[48px]">
            {content.title}
          </h2>
          <p className="mt-6 max-w-[870px] whitespace-pre-line text-[16px] leading-[25.6px] text-white/90">{content.body}</p>
        </AnimateIn>
        <div className="mt-[50px] grid gap-[30px] sm:grid-cols-3">
          {content.cards.map(({ title, body }, i) => (
            <AnimateIn key={i} delay={0.1 * i} className="h-full">
              <article className="flex h-full flex-col justify-center rounded-3xl border border-white/40 bg-white/10 p-5 backdrop-blur-[25px] lg:min-h-[250px]">
                <h3 className="text-[26px] font-semibold leading-[1.2] text-white sm:text-[32px]">{title}</h3>
                <p className="mt-3 text-[16px] leading-[25.6px] text-white/90">{body}</p>
              </article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/** Trust band: a left-aligned heading, four assurance cards, optional badges. */
export function IndustrySecurity({ content, headingWidth = "max-w-[672px]" }: { content: SecurityContent; headingWidth?: string }) {
  const { title, subtitle, items, pills } = content;
  return (
    <section className="mx-auto w-full max-w-[1140px] px-4 pt-[120px] sm:px-6 lg:px-0">
      <AnimateIn>
        <h2 className={`${headingWidth} ${H2_CLASS}`}>{title}</h2>
        {subtitle ? (
          <p className="mt-6 max-w-[760px] whitespace-pre-line text-[18px] leading-[1.6] text-[#70707b] sm:text-[20px]">{subtitle}</p>
        ) : null}
      </AnimateIn>
      <div
        className={`mt-[56px] grid gap-5 sm:grid-cols-2 ${
          items.length === 5 ? "lg:grid-cols-3" : "lg:grid-cols-4"
        }`}
      >
        {items.map(({ title: t, icon }, i) => (
          <AnimateIn key={i} delay={0.08 * i} className="h-full">
            <article className="flex h-full flex-col items-center justify-center rounded-2xl border border-[#e4e4e7] bg-white p-6 text-center lg:min-h-[181px]">
              <CmsIcon name={icon} className="h-6 w-6 text-[#18181b]" strokeWidth={1.6} />
              <h3 className="mt-6 text-[18px] font-semibold leading-[1.3] text-[#18181b]">{t}</h3>
            </article>
          </AnimateIn>
        ))}
      </div>
      {pills.length ? (
        <AnimateIn delay={0.1}>
          <ul className="mt-6 flex flex-wrap gap-3">
            {pills.map(({ text }, i) => (
              <li key={i} className="rounded-full bg-[#eef4fb] px-4 py-2 text-[14px] leading-5 text-[#51525c]">
                {text}
              </li>
            ))}
          </ul>
        </AnimateIn>
      ) : null}
    </section>
  );
}
