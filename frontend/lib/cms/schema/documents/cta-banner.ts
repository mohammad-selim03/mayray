import { defineDocument, image, link, section, text } from "../fields";

export const ctaBanner = defineDocument({
  key: "cta-banner",
  label: "CTA banner",
  kind: "global",
  sections: [
    section("content", "Banner", [
      text("headline", "Headline", {
        multiline: true,
        required: true,
        maxLength: 120,
        hint: "Each new line starts a new line on desktop.",
        default: "Turn Repetitive Tasks\nInto AI Agents",
      }),
      link("button", "Button", { required: true, default: { label: "Try now free", href: "/contact" } }),
      image("artwork", "Artwork", {
        hint: "Transparent PNG or WebP works best.",
        recommended: { width: 984, height: 810 },
        default: { url: "/blog/cta-art.webp", alt: "" },
      }),
    ]),
  ],
});
