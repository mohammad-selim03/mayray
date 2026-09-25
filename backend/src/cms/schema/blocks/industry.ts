// GENERATED FILE: edit frontend/lib/cms/schema and run `pnpm cms:sync`.

// Content blocks shared by the industry landing pages. Each builder takes the page's current copy as defaults.
import { color, icon, image, link, list, section, select, text } from "../fields";
import type { ImageValue, InferFields, LinkValue } from "../types";

interface IconCard {
  icon: string;
  title: string;
  body: string;
}

const iconCardFields = [
  icon("icon", "Icon", { required: true }),
  text("title", "Title", { required: true, maxLength: 80 }),
  text("body", "Text", { multiline: true, maxLength: 300 }),
] as const;

export const heroBlock = (d: { title: string; subtitle: string; primaryCta: LinkValue; secondaryCta: LinkValue; note: string; image: ImageValue }) =>
  section("hero", "Hero", [
    text("title", "Headline", { multiline: true, required: true, maxLength: 160, default: d.title }),
    text("subtitle", "Subtitle", { multiline: true, maxLength: 400, default: d.subtitle }),
    link("primaryCta", "Main button", { required: true, default: d.primaryCta }),
    link("secondaryCta", "Second button", { required: true, default: d.secondaryCta }),
    text("note", "Note under the buttons", { maxLength: 120, default: d.note }),
    image("image", "Hero image", { required: true, recommended: { width: 1000, height: 900 }, default: d.image }),
  ]);

export const introBlock = (d: { title: string; body: string }) =>
  section("intro", "Intro statement", [
    text("title", "Headline", { multiline: true, required: true, maxLength: 200, default: d.title }),
    text("body", "Text", { multiline: true, maxLength: 800, default: d.body }),
  ]);

export const painPointsBlock = (d: { title: string; subtitle: string; items: IconCard[] }) =>
  section("painPoints", "Pain points", [
    text("title", "Headline", { multiline: true, required: true, maxLength: 160, default: d.title }),
    text("subtitle", "Subtitle", { multiline: true, maxLength: 400, default: d.subtitle }),
    list("items", "Cards", iconCardFields, { min: 1, max: 6, itemLabel: "card", summaryKey: "title", default: d.items }),
  ]);

export const photoBandBlock = (d: { image: ImageValue; title: string; body: string; cards: { title: string; body: string }[] }) =>
  section("photoBand", "Photo band", [
    image("image", "Background photo", { required: true, recommended: { width: 2880, height: 1392 }, default: d.image }),
    text("title", "Headline", { multiline: true, required: true, maxLength: 160, default: d.title }),
    text("body", "Text", { multiline: true, maxLength: 800, default: d.body }),
    list(
      "cards",
      "Glass cards",
      [text("title", "Title", { required: true, maxLength: 40 }), text("body", "Text", { maxLength: 120 })],
      { min: 1, max: 3, itemLabel: "card", summaryKey: "title", default: d.cards }
    ),
  ]);

export const workflowBlock = (d: { title: string; steps: IconCard[]; image: ImageValue }) =>
  section("workflow", "Workflow", [
    text("title", "Headline", { multiline: true, required: true, maxLength: 120, default: d.title }),
    list("steps", "Steps", iconCardFields, { min: 1, max: 6, itemLabel: "step", summaryKey: "title", default: d.steps }),
    image("image", "Image", { required: true, recommended: { width: 1000, height: 900 }, default: d.image }),
  ]);

export type FeatureMedia = { mediaKind: "image"; image: ImageValue } | { mediaKind: "color"; panelColor: string };

export const featureRowBlock = <K extends string>(
  key: K,
  label: string,
  d: { title: string; body: string; checklist: string[] } & FeatureMedia
) =>
  section(key, label, [
    text("title", "Headline", { multiline: true, required: true, maxLength: 120, default: d.title }),
    text("body", "Text", { multiline: true, maxLength: 600, default: d.body }),
    list("checklist", "Checklist", [text("text", "Point", { required: true, maxLength: 160 })], {
      max: 6,
      itemLabel: "point",
      summaryKey: "text",
      default: d.checklist.map((t) => ({ text: t })),
    }),
    select(
      "mediaKind",
      "Beside the text",
      [
        { value: "image", label: "An image" },
        { value: "color", label: "A plain colour panel" },
      ],
      { default: d.mediaKind }
    ),
    image("image", "Image", {
      hint: "Shown when “An image” is selected above.",
      recommended: { width: 1140, height: 900 },
      default: d.mediaKind === "image" ? d.image : null,
    }),
    color("panelColor", "Panel colour", {
      hint: "Shown when “A plain colour panel” is selected above.",
      default: d.mediaKind === "color" ? d.panelColor : "#d7ffff",
    }),
  ]);

export const centeredBlock = (d: { title: string; body: string; image: ImageValue }) =>
  section("centered", "Centered statement", [
    text("title", "Headline", { multiline: true, required: true, maxLength: 120, default: d.title }),
    text("body", "Text", { multiline: true, maxLength: 600, default: d.body }),
    image("image", "Image", { required: true, recommended: { width: 1540, height: 1000 }, default: d.image }),
  ]);

export interface TestimonialDefault {
  quote: string;
  body: string;
  name: string;
  role: string;
  avatar: ImageValue | null;
}

export const testimonialsBlock = (d: { title: string; items: TestimonialDefault[] }) =>
  section("testimonials", "Testimonials", [
    text("title", "Headline", { multiline: true, required: true, maxLength: 80, default: d.title }),
    list(
      "items",
      "Quotes",
      [
        text("quote", "Quote", { required: true, maxLength: 160 }),
        text("body", "Story", { multiline: true, maxLength: 400 }),
        text("name", "Name", { required: true, maxLength: 60 }),
        text("role", "Role & company", { maxLength: 80 }),
        image("avatar", "Photo", { hint: "Without a photo, the person's initials are shown.", recommended: { width: 96, height: 96 } }),
      ],
      { min: 1, max: 6, itemLabel: "quote", summaryKey: "name", default: d.items }
    ),
  ]);

export interface IntegrationDefault {
  name: string;
  category: string;
  logo: ImageValue | null;
  mark: string;
}

export const integrationsBlock = (d: { title: string; subtitle: string; items: IntegrationDefault[] }) =>
  section("integrations", "Integrations", [
    text("title", "Headline", { required: true, maxLength: 80, default: d.title }),
    text("subtitle", "Subtitle", { multiline: true, maxLength: 300, default: d.subtitle }),
    list(
      "items",
      "Tools",
      [
        text("name", "Name", { required: true, maxLength: 40 }),
        text("category", "Category", { maxLength: 30 }),
        image("logo", "Logo", { recommended: { width: 128, height: 128 } }),
        text("mark", "Letters shown without a logo", { maxLength: 3 }),
      ],
      { min: 1, max: 24, itemLabel: "tool", summaryKey: "name", default: d.items }
    ),
  ]);

export const securityBlock = (d: { title: string; subtitle: string; items: { icon: string; title: string }[]; pills: string[] }) =>
  section("security", "Security", [
    text("title", "Headline", { multiline: true, required: true, maxLength: 120, default: d.title }),
    text("subtitle", "Subtitle", { multiline: true, maxLength: 300, default: d.subtitle }),
    list("items", "Assurances", [icon("icon", "Icon", { required: true }), text("title", "Text", { required: true, maxLength: 80 })], {
      min: 1,
      max: 5,
      itemLabel: "assurance",
      summaryKey: "title",
      default: d.items,
    }),
    list("pills", "Badges", [text("text", "Badge", { required: true, maxLength: 40 })], {
      max: 6,
      itemLabel: "badge",
      summaryKey: "text",
      default: d.pills.map((t) => ({ text: t })),
    }),
  ]);

export const faqBlock = (d: { title: string; items: { question: string; answer: string }[] }) =>
  section("faq", "FAQ", [
    text("title", "Headline", { required: true, maxLength: 80, default: d.title }),
    list(
      "items",
      "Questions",
      [text("question", "Question", { required: true, maxLength: 160 }), text("answer", "Answer", { multiline: true, required: true, maxLength: 800 })],
      { min: 1, max: 12, itemLabel: "question", summaryKey: "question", default: d.items }
    ),
  ]);

/** Content types for the site's block components. */
export type HeroContent = InferFields<ReturnType<typeof heroBlock>["fields"]>;
export type IntroContent = InferFields<ReturnType<typeof introBlock>["fields"]>;
export type PainPointsContent = InferFields<ReturnType<typeof painPointsBlock>["fields"]>;
export type PhotoBandContent = InferFields<ReturnType<typeof photoBandBlock>["fields"]>;
export type WorkflowContent = InferFields<ReturnType<typeof workflowBlock>["fields"]>;
export type FeatureRowContent = InferFields<ReturnType<typeof featureRowBlock<string>>["fields"]>;
export type CenteredContent = InferFields<ReturnType<typeof centeredBlock>["fields"]>;
export type TestimonialsContent = InferFields<ReturnType<typeof testimonialsBlock>["fields"]>;
export type IntegrationsContent = InferFields<ReturnType<typeof integrationsBlock>["fields"]>;
export type SecurityContent = InferFields<ReturnType<typeof securityBlock>["fields"]>;
export type FaqContent = InferFields<ReturnType<typeof faqBlock>["fields"]>;
