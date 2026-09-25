// Content blocks for the legal pages (Privacy Policy, Terms & Conditions).
import { icon, link, list, richText, section, select, text } from "../fields";
import type { InferFields, LinkValue } from "../types";

type Point = { text: string };

export interface LegalSectionDefault {
  title: string;
  navLabel?: string;
  anchor: string;
  body?: string;
  box?: "none" | "note" | "highlight" | "warning";
  boxIcon?: string;
  boxLabel?: string;
  boxTitle?: string;
  boxText?: string;
  boxItems?: Point[];
  checks?: Point[];
  checkColor?: "green" | "blue";
  cards?: { icon: string; title: string; text: string; color: "blue" | "green" }[];
}

const point = [text("text", "Point", { required: true, maxLength: 240 })] as const;

const sectionFields = [
  text("title", "Heading", { required: true, maxLength: 120 }),
  text("navLabel", "Sidebar label", { maxLength: 80, hint: "Shorter version for the table of contents. Leave empty to use the heading." }),
  text("anchor", "Link anchor", {
    maxLength: 40,
    hint: "Lets people link straight to this section, e.g. /privacy-policy#cookies. Lowercase letters, numbers and dashes.",
  }),
  richText("body", "Text"),
  select(
    "box",
    "Box under the text",
    [
      { value: "none", label: "No box" },
      { value: "note", label: "Grey note with a list" },
      { value: "highlight", label: "Coloured highlight" },
      { value: "warning", label: "Red warning with a list" },
    ] as const
  ),
  icon("boxIcon", "Box icon", { hint: "Shown before the box label on highlight and warning boxes." }),
  text("boxLabel", "Box label", { maxLength: 80 }),
  text("boxTitle", "Box headline", { maxLength: 160, hint: "Highlight boxes only." }),
  text("boxText", "Box text", { multiline: true, maxLength: 600, hint: "Highlight boxes only." }),
  list("boxItems", "Box list", point, { max: 10, itemLabel: "point", summaryKey: "text", hint: "Note and warning boxes only." }),
  list("checks", "Tick list", point, { max: 10, itemLabel: "point", summaryKey: "text" }),
  select("checkColor", "Tick colour", [
    { value: "green", label: "Green" },
    { value: "blue", label: "Blue" },
  ] as const),
  list(
    "cards",
    "Cards",
    [
      icon("icon", "Icon", { required: true }),
      text("title", "Title", { required: true, maxLength: 60 }),
      text("text", "Text", { maxLength: 200 }),
      select("color", "Icon colour", [
        { value: "blue", label: "Blue" },
        { value: "green", label: "Green" },
      ] as const),
    ],
    { max: 4, itemLabel: "card", summaryKey: "title" }
  ),
] as const;

export const legalContentBlock = (d: { tocTitle: string; sections: LegalSectionDefault[] }) =>
  section("content", "Policy", [
    text("tocTitle", "Table of contents heading", { required: true, maxLength: 40, default: d.tocTitle }),
    list("sections", "Sections", sectionFields, {
      min: 1,
      max: 20,
      itemLabel: "section",
      summaryKey: "title",
      default: d.sections.map((s) => ({
        title: s.title,
        navLabel: s.navLabel ?? "",
        anchor: s.anchor,
        body: s.body ?? "",
        box: s.box ?? "none",
        boxIcon: s.boxIcon ?? "",
        boxLabel: s.boxLabel ?? "",
        boxTitle: s.boxTitle ?? "",
        boxText: s.boxText ?? "",
        boxItems: s.boxItems ?? [],
        checks: s.checks ?? [],
        checkColor: s.checkColor ?? "green",
        cards: s.cards ?? [],
      })),
    }),
  ]);

export const legalHeroBlock = (d: { badge: string; title: string; subtitle: string; updated: string; effective: string }) =>
  section("hero", "Hero", [
    text("badge", "Badge", { maxLength: 80, default: d.badge }),
    text("title", "Headline", { required: true, maxLength: 80, default: d.title }),
    text("subtitle", "Subtitle", { multiline: true, maxLength: 300, default: d.subtitle }),
    text("updated", "Last updated", { maxLength: 60, hint: 'For example "Last Updated: September 6, 2026".', default: d.updated }),
    text("effective", "Second note", { maxLength: 80, default: d.effective }),
  ]);

export const legalContactBlock = (d: { badge: string; title: string; text: string; button: LinkValue }) =>
  section("contact", "Contact card", [
    text("badge", "Badge", { maxLength: 80, default: d.badge }),
    text("title", "Headline", { required: true, maxLength: 120, default: d.title }),
    text("text", "Text", { multiline: true, maxLength: 400, default: d.text }),
    link("button", "Button", { required: true, default: d.button }),
  ]);

export type LegalContent = InferFields<ReturnType<typeof legalContentBlock>["fields"]>;
export type LegalSection = LegalContent["sections"][number];
export type LegalHeroContent = InferFields<ReturnType<typeof legalHeroBlock>["fields"]>;
export type LegalContactContent = InferFields<ReturnType<typeof legalContactBlock>["fields"]>;
