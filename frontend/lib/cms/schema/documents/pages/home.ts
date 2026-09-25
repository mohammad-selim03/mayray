// Defaults are the page's live copy at the time it moved into the CMS (Site Settings, the old
// page editor and the FAQ collection), so switching over changed nothing on the site.
import { COUNTRIES } from "../../countries";
import { audio, defineDocument, image, link, list, section, select, seoSection, text, video } from "../../fields";
import type { InferFields } from "../../types";
import { faqBlock } from "../../blocks/industry";

const COLLECTION_NOTE = (name: string) => `The items in this section are managed in Collections → ${name}.`;

const FLAGS = ["us", "de", "fr", "bg", "cu", "hr", "au", "br", "bw", "bd", "tr", "az", "in", "kr", "bf", "my", "se", "nl", "us", "jp", "il", "fi"] as const;

const AVATARS = [
  "photo-1534528741775-53994a69daeb",
  "photo-1506794778202-cad84cf45f1d",
  "photo-1494790108377-be9c29b29330",
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1438761681033-6461ffad8d80",
  "photo-1500648767791-00dcc994a43e",
  "photo-1544005313-94ddf0286df2",
];

const AGENT_TITLE = "Detects Intent, Responds Smartly, Executes Tasks";
const AGENT_BODY = "Understands customer needs instantly. Human-like conversations across channels.Completes workflows without manual input.";

export const homePage = defineDocument({
  key: "home",
  label: "Home",
  kind: "page",
  route: "/",
  sections: [
    section("hero", "Hero", [
      text("title", "Headline", {
        required: true,
        highlight: true,
        maxLength: 120,
        hint: "Select words and press Highlight to draw the orange marker behind them. Words after the highlight start on a new line.",
        default: "Transform ==Your Office== with AI Automation",
      }),
      text("subtitle", "Subtitle", {
        multiline: true,
        maxLength: 300,
        default: "Replace repetitive work with intelligent AI agents that handle emails, workflows, customer support, and operations 24/7.",
      }),
      link("primaryCta", "Main button", { required: true, default: { label: "Try now", href: "/contact" } }),
      link("secondaryCta", "Second button", { required: true, default: { label: "How it works", href: "#how-it-works" } }),
      text("prompt", "Question on the card", { required: true, maxLength: 80, default: "What would you like to automate?" }),
      image("background", "Background image", {
        required: true,
        recommended: { width: 2880, height: 1788 },
        default: { url: "/assets/herobg.png", alt: "Hero Background", width: 1437, height: 894 },
      }),
    ]),
    section(
      "integrations",
      "Integrations strip",
      [text("banner", "Banner text", { required: true, maxLength: 120, default: "The first cloud employee Uses all your apps for you." })],
      COLLECTION_NOTE("Integrations (logos)")
    ),
    section("voiceAgents", "Voice agents", [
      text("title", "Headline", { multiline: true, required: true, maxLength: 120, default: "Next-Gen AI Voice & Workflow Agents for Modern Businesses" }),
      list("points", "Bullet points", [text("text", "Point", { required: true, maxLength: 200 })], {
        max: 5,
        itemLabel: "point",
        summaryKey: "text",
        default: [
          { text: "From first customer interaction to backend operations, our AI agents handle the work your team should not have to" },
          { text: "Automate conversations, decisions, and workflows all in one system" },
        ],
      }),
      list(
        "agents",
        "Agent cards",
        [
          text("tag", "Tag", { required: true, maxLength: 30, hint: "Small label on the open card on phones." }),
          text("title", "Title", { required: true, maxLength: 80 }),
          text("body", "Text", { multiline: true, maxLength: 300 }),
          video("video", "Video", { required: true, hint: "Plays muted on a loop inside the card." }),
          audio("audio", "Voice sample", { hint: "Plays when a visitor presses the play button on the open card." }),
        ],
        {
          min: 1,
          max: 6,
          itemLabel: "card",
          summaryKey: "tag",
          default: [
            { tag: "Medical", title: AGENT_TITLE, body: AGENT_BODY, video: { url: "/videos/2.mp4" }, audio: null },
            { tag: "Real Estate", title: AGENT_TITLE, body: AGENT_BODY, video: { url: "/videos/3.mp4" }, audio: null },
            { tag: "eCandleshop", title: AGENT_TITLE, body: AGENT_BODY, video: { url: "/videos/4.mp4" }, audio: null },
            { tag: "CallFluent AI", title: AGENT_TITLE, body: AGENT_BODY, video: { url: "/videos/5.mp4" }, audio: null },
          ],
        }
      ),
    ]),
    section(
      "features",
      "Feature stories",
      [text("watchLabel", "Video button label", { required: true, maxLength: 30, default: "Watch video" })],
      "Both feature blocks are managed in Collections → Features: group A fills the block after the voice agents, group B the block after the steps."
    ),
    section(
      "scaling",
      "How it works",
      [
        text("title", "Headline", { multiline: true, required: true, maxLength: 120, default: "AI & Automation for Scaling Businesses" }),
        text("subtitle", "Text", { multiline: true, maxLength: 300, default: "Everything you need to automate, optimize, and grow without complexity." }),
      ],
      COLLECTION_NOTE("Scaling Steps")
    ),
    section(
      "agentAreas",
      "Agent areas",
      [
        text("title", "Headline", { multiline: true, required: true, maxLength: 120, default: "Deliver Beautifully Simple Service with Mayray AI Agents" }),
        text("subtitle", "Text", {
          multiline: true,
          maxLength: 300,
          default: "Automate conversations, workflows, and customer experiences with intelligent AI agents that work seamlessly behind the scenes.",
        }),
      ],
      COLLECTION_NOTE("Use Cases")
    ),
    section("ocean", "Made for one", [
      text("title", "Headline", { multiline: true, required: true, maxLength: 120, default: "Made for one, serves thousands" }),
      text("subtitle", "Text", {
        multiline: true,
        maxLength: 300,
        default: "Build a process once, and let AI handle it everywhere. Turn manual work into smart workflows. Scale processes without complexity",
      }),
      list("avatars", "Avatar photos", [image("photo", "Photo", { required: true, recommended: { width: 88, height: 88 } })], {
        min: 1,
        max: 10,
        itemLabel: "photo",
        summaryKey: "photo",
        default: AVATARS.map((id, i) => ({
          photo: { url: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=100&q=80`, alt: `User avatar ${i + 1}` },
        })),
      }),
      video("video", "Video", { required: true, default: { url: "/manta.mp4" } }),
      image("background", "Background image", {
        required: true,
        recommended: { width: 2880, height: 2158 },
        default: { url: "/bgg.png", alt: "Background", width: 1440, height: 1079 },
      }),
    ]),
    section("languages", "Languages", [
      text("badge", "Badge text", { required: true, maxLength: 30, default: "99+ languages" }),
      list("flags", "Flags", [select("country", "Country", COUNTRIES)], {
        min: 22,
        max: 22,
        itemLabel: "flag",
        summaryKey: "country",
        hint: "The grid holds exactly 22 flags. Change a flag's country to swap it; drag to reorder.",
        default: FLAGS.map((country) => ({ country })),
      }),
    ]),
    section(
      "industryRoi",
      "Industry results",
      [
        text("title", "Headline", { multiline: true, required: true, maxLength: 120, default: "Industry-Specific ROI Insights" }),
        text("useCasesLabel", "Use-case intro", { required: true, maxLength: 80, default: "Popular use cases in the industry:" }),
        text("cvrLabel", "Label under the first figure", { required: true, maxLength: 40, default: "in CVR" }),
        text("showUpLabel", "Label under the second figure", { required: true, maxLength: 40, default: "in show-up rate" }),
        link("cta", "Button", { required: true, default: { label: "Speak With Our Experts", href: "/contact" } }),
      ],
      COLLECTION_NOTE("Industry ROI (industries, figures and photos)")
    ),
    section(
      "testimonials",
      "Testimonials",
      [text("title", "Headline", { multiline: true, required: true, maxLength: 120, default: "What Businesses Are Saying" })],
      COLLECTION_NOTE("Testimonials")
    ),
    section("marquee", "Scrolling banner", [
      list("items", "Phrases", [text("text", "Phrase", { required: true, maxLength: 40 })], {
        min: 1,
        max: 12,
        itemLabel: "phrase",
        summaryKey: "text",
        default: [
          "AI Automation",
          "Workflow Intelligence",
          "24/7 Operations",
          "Smart Agents",
          "Business Growth",
          "Process Automation",
          "AI Agents",
          "Digital Transformation",
        ].map((t) => ({ text: t })),
      }),
    ]),
    faqBlock({
      title: "Frequently Asked Questions",
      items: [
        {
          question: "What exactly does Mayray AI do?",
          answer:
            "Mayray AI automates repetitive business tasks using intelligent AI agents that work across your existing tools — handling emails, workflows, customer support, and operations 24/7.",
        },
        {
          question: "Can Mayray AI really replace human work?",
          answer:
            "Mayray AI handles high-volume, repetitive tasks so your team can focus on strategic, creative, and relationship-driven work that requires human judgment.",
        },
        {
          question: "How is Mayray AI different from typical automation tools?",
          answer:
            "Unlike traditional rule-based automation, Mayray AI uses large language models to understand context, make decisions, and adapt — just like a human employee would.",
        },
        {
          question: "How fast can I launch AI automation in my business?",
          answer:
            "Most clients see their first automated workflows live within 1–2 weeks. Our team handles setup, testing, and integration so you can start saving time immediately.",
        },
        {
          question: "What integrations does Mayray AI support?",
          answer:
            "Mayray AI integrates with 16+ popular business tools including Gmail, Slack, Salesforce, Google Calendar, Microsoft Teams, Google Drive, and more.",
        },
      ],
    }),
    section(
      "blog",
      "Blog",
      [
        text("title", "Headline", { required: true, maxLength: 60, default: "Blog" }),
        text("moreLabel", "See-more button", { required: true, maxLength: 30, hint: "Shown when there are more posts than fit.", default: "See More" }),
        select(
          "count",
          "Posts shown",
          [
            { value: "3", label: "One row (3 posts)" },
            { value: "6", label: "Two rows (6 posts)" },
          ],
          { default: "3" }
        ),
        image("background", "Background image", {
          required: true,
          recommended: { width: 2880, height: 2582 },
          default: { url: "/blogbg.png", alt: "", width: 1440, height: 1291 },
        }),
      ],
      "Posts are managed in Blog Posts; the newest published ones are shown."
    ),
    seoSection({
      title: "Mayray AI — Autonomous AI Agents for Business Automation",
      description:
        "Deploy autonomous AI agents that handle calls, emails, and workflows 24/7. Sub-300ms voice AI, CRM integration, and enterprise-grade automation.",
    }),
  ],
});

type HomeSections = (typeof homePage)["sections"][number];
type SectionContent<K extends HomeSections["key"]> = InferFields<Extract<HomeSections, { key: K }>["fields"]>;

export type HomeHeroContent = SectionContent<"hero">;
export type HomeVoiceAgentsContent = SectionContent<"voiceAgents">;
export type HomeFeaturesContent = SectionContent<"features">;
export type HomeScalingContent = SectionContent<"scaling">;
export type HomeAgentAreasContent = SectionContent<"agentAreas">;
export type HomeOceanContent = SectionContent<"ocean">;
export type HomeLanguagesContent = SectionContent<"languages">;
export type HomeIndustryRoiContent = SectionContent<"industryRoi">;
export type HomeTestimonialsContent = SectionContent<"testimonials">;
export type HomeMarqueeContent = SectionContent<"marquee">;
export type HomeIntegrationsContent = SectionContent<"integrations">;
export type HomeBlogContent = SectionContent<"blog">;
