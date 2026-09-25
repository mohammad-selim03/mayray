// Defaults are the page's live copy at the time it moved into the CMS.
import { defineDocument, link, list, section, select, seoSection, text, toggle } from "../../fields";
import type { InferFields } from "../../types";
import { faqBlock } from "../../blocks/industry";

/** The icons drawn in the pricing design; the site maps each key to its SVG. */
export const PRICING_ICONS = [
  { value: "check", label: "Tick in a circle" },
  { value: "chat", label: "Chat bubble" },
  { value: "mail", label: "Envelope" },
  { value: "pen", label: "Pen and lines" },
  { value: "video", label: "Video camera" },
  { value: "document", label: "Document" },
  { value: "apps", label: "Grid of apps" },
  { value: "expand", label: "Arrows apart" },
  { value: "team", label: "Two people" },
  { value: "key", label: "Key" },
  { value: "shield", label: "Shield with tick" },
  { value: "headset", label: "Headset" },
  { value: "user", label: "Person" },
  { value: "tick", label: "Blue tick" },
] as const;

type PricingIcon = (typeof PRICING_ICONS)[number]["value"];
const features = (icon: PricingIcon, ...texts: string[]) => texts.map((t) => ({ icon, text: t }));

const plan = (p: {
  name: string;
  annualPrice: string;
  monthlyPrice: string;
  priceSuffix: string;
  strikethrough?: boolean;
  subtitle: string;
  highlighted?: boolean;
  highlightLabel?: string;
  cta?: { label: string; href: string };
  ctaStyle?: "blue" | "dark";
  featuresHeading: string;
  features: { icon: PricingIcon; text: string }[];
}) => ({
  name: p.name,
  annualPrice: p.annualPrice,
  monthlyPrice: p.monthlyPrice,
  priceSuffix: p.priceSuffix,
  strikethrough: p.strikethrough ?? false,
  subtitle: p.subtitle,
  highlighted: p.highlighted ?? false,
  highlightLabel: p.highlightLabel ?? "",
  cta: p.cta ?? { label: "", href: "" },
  ctaStyle: p.ctaStyle ?? "blue",
  featuresHeading: p.featuresHeading,
  features: p.features,
});

export const pricingPage = defineDocument({
  key: "pricing",
  label: "Pricing",
  kind: "page",
  route: "/pricing",
  sections: [
    section("header", "Heading", [
      text("title", "Headline", { required: true, maxLength: 60, default: "Pricing" }),
      text("subtitle", "Subtitle", { maxLength: 200, default: "Start with 7 days free. Cancel anytime." }),
      text("annualLabel", "Annual switch label", { required: true, maxLength: 20, default: "Annual" }),
      text("monthlyLabel", "Monthly switch label", { required: true, maxLength: 20, default: "Monthly" }),
    ]),
    section("plans", "Plans", [
      text("featuresLabel", "Label above each feature list", { required: true, maxLength: 30, default: "Features:" }),
      list(
        "items",
        "Plans",
        [
          text("name", "Plan name", { required: true, maxLength: 40 }),
          text("annualPrice", "Price, billed annually", { required: true, maxLength: 20, hint: 'For example "$49", or "Contact us".' }),
          text("monthlyPrice", "Price, billed monthly", { required: true, maxLength: 20 }),
          text("priceSuffix", "After the price", { maxLength: 20, hint: 'For example "/monthly". Leave empty for none.' }),
          toggle("strikethrough", "Cross out the price"),
          text("subtitle", "Tagline", { maxLength: 120 }),
          toggle("highlighted", "Highlight this plan", { hint: "Blue border with a label bar on top." }),
          text("highlightLabel", "Highlight label", { maxLength: 30, hint: 'For example "Most popular".' }),
          link("cta", "Button", { hint: "Leave the label empty for no button." }),
          select("ctaStyle", "Button colour", [
            { value: "blue", label: "Blue" },
            { value: "dark", label: "Dark" },
          ] as const),
          text("featuresHeading", "Features intro", { maxLength: 80 }),
          list("features", "Features", [select("icon", "Icon", PRICING_ICONS), text("text", "Feature", { required: true, maxLength: 80 })], {
            min: 1,
            max: 12,
            itemLabel: "feature",
            summaryKey: "text",
          }),
        ],
        {
          min: 1,
          max: 4,
          itemLabel: "plan",
          summaryKey: "name",
          default: [
            plan({
              name: "Human Assistant",
              annualPrice: "$500",
              monthlyPrice: "$500",
              priceSuffix: "/monthly",
              strikethrough: true,
              subtitle: "Boring!",
              featuresHeading: "Everything in Freelancer, plus:",
              features: features(
                "check",
                "40 hrs/week",
                "Available 9am-5pm, Mon-Fri",
                "Email triage (during business hours)",
                "Drafts professional responses (sometimes)",
                "Meeting note taking (when available)",
                "Can make mistakes (they're only human)",
                "Novice excel user"
              ),
            }),
            plan({
              name: "Plus",
              annualPrice: "$49",
              monthlyPrice: "$79",
              priceSuffix: "/monthly",
              subtitle: "The ultimate AI work assistant.",
              highlighted: true,
              highlightLabel: "Most popular",
              cta: { label: "Try for free", href: "/contact" },
              ctaStyle: "blue",
              featuresHeading: "Everything in Freelancer, plus:",
              features: [
                { icon: "chat", text: "Message with your AI assistant 24/7" },
                { icon: "mail", text: "Manages your inbox automatically" },
                { icon: "pen", text: "Drafts replies in your voice" },
                { icon: "pen", text: "Meeting scheduling, prep and follow-up" },
                { icon: "video", text: "Meeting recording and note taking" },
                { icon: "document", text: "Learns your style over time" },
                { icon: "apps", text: "Hundreds of integrations" },
              ],
            }),
            plan({
              name: "Enterprise",
              annualPrice: "Contact us",
              monthlyPrice: "Contact us",
              priceSuffix: "",
              subtitle: "AI assistants to everyone on your team.",
              cta: { label: "Talk to sales", href: "/contact" },
              ctaStyle: "dark",
              featuresHeading: "Everything in Freelancer, plus:",
              features: [
                { icon: "check", text: "Everything in Pro" },
                { icon: "expand", text: "Expanded usage" },
                { icon: "team", text: "Team settings" },
                { icon: "key", text: "SSO, SCIM, Audit logs" },
                { icon: "shield", text: "HIPAA Compliant and signed BAA" },
                { icon: "headset", text: "Dedicated support" },
                { icon: "user", text: "Onboarding and enablement" },
              ],
            }),
          ],
        }
      ),
    ]),
    faqBlock({
      title: "Frequently Asked Questions",
      items: [
        {
          question: "What is included in the free trial?",
          answer: "You get full access to all Plus plan features for 7 days. No credit card required. Cancel anytime before the trial ends and you won't be charged.",
        },
        {
          question: "Can I switch plans later?",
          answer: "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately and billing is adjusted pro-rata.",
        },
        {
          question: "What happens after the free trial?",
          answer: "After 7 days, you'll be automatically enrolled in your selected plan. You can cancel before the trial ends to avoid any charges.",
        },
        {
          question: "Do you offer refunds?",
          answer: "We offer a full refund within the first 30 days of any paid subscription. Contact our support team and we'll process it promptly.",
        },
        {
          question: "Is my data secure?",
          answer: "Absolutely. We use enterprise-grade encryption, SOC 2 compliance, and HIPAA-ready infrastructure to keep your data safe and private.",
        },
      ],
    }),
    seoSection({
      title: "Pricing | Mayray AI",
      description: "Mayray AI plans and pricing. Start with 7 days free and cancel anytime.",
    }),
  ],
});

type PricingSections = (typeof pricingPage)["sections"][number];
export type PricingHeaderContent = InferFields<Extract<PricingSections, { key: "header" }>["fields"]>;
export type PricingPlansContent = InferFields<Extract<PricingSections, { key: "plans" }>["fields"]>;
export type PricingPlan = PricingPlansContent["items"][number];
