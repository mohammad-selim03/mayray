// GENERATED FILE: edit frontend/lib/cms/schema and run `pnpm cms:sync`.

import { defineDocument, image, section, text } from "../fields";

export const seoDefaults = defineDocument({
  key: "seo-defaults",
  label: "SEO defaults",
  kind: "global",
  sections: [
    section("site", "Site identity", [
      text("siteName", "Site name", { required: true, maxLength: 40, default: "Mayray AI", hint: "Used by social networks when a page is shared." }),
      text("defaultTitle", "Default page title", {
        required: true,
        maxLength: 70,
        default: "Mayray AI | Next-Gen AI Voice & Workflow Agents",
        hint: "Used when a page has no title of its own.",
      }),
      text("description", "Default description", {
        multiline: true,
        maxLength: 170,
        default:
          "Transform your business with Mayray AI. Automate conversations, backend operations, and repetitive tasks with our intelligent AI agents 24/7.",
      }),
      image("shareImage", "Default share image", {
        hint: "Shown when a page without its own share image is posted on social media.",
        recommended: { width: 1200, height: 630 },
      }),
      text("xHandle", "X (Twitter) handle", { maxLength: 16, hint: "Optional, e.g. @mayrayai." }),
    ], "Fallbacks for every page. Each page's own SEO settings take priority."),
  ],
});
