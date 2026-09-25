"use client";

import React, { useState } from "react";
import { CircleCheck, FileText, Scale } from "lucide-react";
import { CMS_ICONS } from "@/lib/cms/icons";
import { isIconName } from "@/lib/cms/schema/icons";
import type { LegalContent as LegalContentData, LegalSection } from "@/lib/cms/schema/blocks/legal";

/**
 * The policy body shared by Privacy (light) and Terms (dark): a sticky table of contents beside
 * the sections. Each theme keeps the classes its page was designed with.
 */
const THEMES = {
  light: {
    outer: "bg-white py-16 text-white",
    aside: "border-white/10 bg-white",
    tocIcon: <FileText className="h-4 w-4 text-emerald-400" />,
    tocActive: "bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-500/30",
    main: "text-gray-800",
    h2: "text-gray-800",
    link: "[&_a]:text-emerald-400",
    note: { box: "rounded-2xl bg-white/5 border border-white/5 p-5 space-y-3", heading: "text-gray-800", list: "text-gray-600" },
    highlight: {
      box: "rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-6 sm:p-8 space-y-3 shadow-xl",
      label: "text-emerald-300",
      icon: "text-emerald-400",
      title: "text-gray-800",
      text: "text-gray-600",
    },
    warning: { box: "text-red-700", list: "text-gray-600" },
    check: "text-gray-600",
    card: { box: "border-white/10 bg-white", title: "text-gray-800" },
  },
  dark: {
    outer: "bg-[#0b0b12] py-16 text-white",
    aside: "border-white/10 bg-[#12121e]",
    tocIcon: <Scale className="h-4 w-4 text-cyan-400" />,
    tocActive: "bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30",
    main: "text-gray-300",
    h2: "text-white",
    link: "[&_a]:text-cyan-400",
    note: { box: "rounded-2xl bg-white/5 border border-white/5 p-5 space-y-3", heading: "text-white", list: "text-gray-400" },
    highlight: {
      box: "rounded-3xl border border-cyan-500/30 bg-cyan-500/10 p-6 sm:p-8 space-y-3 shadow-xl",
      label: "text-cyan-300",
      icon: "text-cyan-400",
      title: "text-white",
      text: "text-gray-200",
    },
    warning: { box: "text-red-200", list: "text-gray-300" },
    check: "text-gray-300",
    card: { box: "border-white/10 bg-[#12121e]", title: "text-white" },
  },
} as const;

type Theme = keyof typeof THEMES;
const TONE = { green: "text-emerald-400", blue: "text-cyan-400" } as const;

const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/^\d+\.\s*/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const sectionId = (s: LegalSection) => s.anchor || slug(s.title);

function BoxIcon({ name, className }: { name: string; className: string }) {
  const Icon = isIconName(name) ? CMS_ICONS[name] : null;
  return Icon ? <Icon className={className} /> : null;
}

function Section({ section: s, theme }: { section: LegalSection; theme: Theme }) {
  const t = THEMES[theme];
  return (
    <div id={sectionId(s)} className="scroll-mt-28 space-y-4">
      <h2 className={`text-2xl font-bold ${t.h2} sm:text-3xl border-b border-white/10 pb-3`}>{s.title}</h2>

      {/* Rich text is cleaned against an allowlist by the API when it's published (backend/src/cms/sanitize.ts). */}
      {s.body && (
        <div
          className={`[&>*+*]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:text-xs sm:[&_ul]:text-sm [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_a:hover]:underline ${t.link}`}
          dangerouslySetInnerHTML={{ __html: s.body }}
        />
      )}

      {s.box === "note" && (
        <div className={t.note.box}>
          {s.boxLabel && <h4 className={`text-sm font-bold ${t.note.heading} uppercase tracking-wider`}>{s.boxLabel}</h4>}
          {s.boxItems.length > 0 && (
            <ul className={`list-disc pl-5 space-y-1.5 text-xs sm:text-sm ${t.note.list}`}>
              {s.boxItems.map((item, i) => <li key={i}>{item.text}</li>)}
            </ul>
          )}
        </div>
      )}

      {s.box === "highlight" && (
        <div className={t.highlight.box}>
          {s.boxLabel && (
            <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${t.highlight.label}`}>
              <BoxIcon name={s.boxIcon} className={`h-4 w-4 ${t.highlight.icon}`} />
              {s.boxLabel}
            </div>
          )}
          {s.boxTitle && <h3 className={`text-lg sm:text-xl font-bold ${t.highlight.title}`}>{s.boxTitle}</h3>}
          {s.boxText && <p className={`text-xs sm:text-sm ${t.highlight.text} leading-relaxed`}>{s.boxText}</p>}
        </div>
      )}

      {s.box === "warning" && (
        <div className={`rounded-2xl bg-red-500/10 border border-red-500/20 p-5 space-y-2 text-xs sm:text-sm ${t.warning.box}`}>
          {s.boxLabel && (
            <div className="flex items-center gap-2 font-bold text-red-400">
              <BoxIcon name={s.boxIcon} className="h-4 w-4" /> {s.boxLabel}
            </div>
          )}
          {s.boxItems.length > 0 && (
            <ul className={`list-disc pl-5 space-y-1 ${t.warning.list}`}>
              {s.boxItems.map((item, i) => <li key={i}>{item.text}</li>)}
            </ul>
          )}
        </div>
      )}

      {s.checks.length > 0 && (
        <ul className="space-y-2">
          {s.checks.map((item, i) => (
            <li key={i} className={`flex items-start gap-3 text-xs sm:text-sm ${t.check}`}>
              <CircleCheck className={`h-4 w-4 ${TONE[s.checkColor]} shrink-0 mt-1`} />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      )}

      {s.cards.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          {s.cards.map((card, i) => (
            <div key={i} className={`rounded-2xl border ${t.card.box} p-5`}>
              <BoxIcon name={card.icon} className={`h-6 w-6 ${TONE[card.color]} mb-2`} />
              <h4 className={`font-bold ${t.card.title}`}>{card.title}</h4>
              {card.text && <p className="text-xs text-gray-400 mt-1">{card.text}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export const LegalContent = ({ content, theme }: { content: LegalContentData; theme: Theme }) => {
  const t = THEMES[theme];
  const [activeSection, setActiveSection] = useState(content.sections[0] ? sectionId(content.sections[0]) : "");

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={t.outer}>
      <div className="mx-auto max-w-[1235px] px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Sticky table of contents */}
          <aside className={`lg:col-span-4 sticky top-24 rounded-3xl border ${t.aside} p-6 shadow-xl hidden lg:block`}>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
              {t.tocIcon}
              {content.tocTitle}
            </h3>
            <nav className="space-y-1 text-xs font-medium">
              {content.sections.map((s) => {
                const id = sectionId(s);
                return (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-all ${
                      activeSection === id ? t.tocActive : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{s.navLabel || s.title}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <main className={`lg:col-span-8 space-y-14 text-sm sm:text-base leading-[1.8] ${t.main}`}>
            {content.sections.map((s, i) => (
              <Section key={i} section={s} theme={theme} />
            ))}
          </main>
        </div>
      </div>
    </section>
  );
};
