// Defaults are the page's live copy at the time it moved into the CMS. The posts themselves are
// managed in Blog Posts; this document holds the wording and settings around them.
import { defineDocument, image, list, section, seoSection, text } from "../../fields";
import type { InferFields } from "../../types";

export const blogPage = defineDocument({
  key: "blog",
  label: "Blog",
  kind: "page",
  route: "/blog",
  sections: [
    section(
      "listing",
      "Blog page",
      [
        text("allLabel", '"All posts" tab', { required: true, maxLength: 20, default: "All" }),
        list("categories", "Category tabs", [text("name", "Category", { required: true, maxLength: 30 })], {
          max: 8,
          itemLabel: "tab",
          summaryKey: "name",
          hint: "Each tab shows the posts whose category matches its name.",
          default: ["Legal", "Real estate", "Insurance", "E-commerce"].map((name) => ({ name })),
        }),
        text("emptyText", "Message when a tab has no posts", { required: true, maxLength: 120, default: "No articles found in this category." }),
      ],
      "The newest post is featured at the top; the rest are listed below it."
    ),
    section("posts", "Every post", [
      image("fallbackImage", "Cover for posts without one", {
        required: true,
        recommended: { width: 970, height: 450 },
        default: { url: "/blogs/real-estate-gap.jpg", alt: "", width: 1376, height: 768 },
      }),
      text("defaultAuthor", "Author when a post has none", { required: true, maxLength: 60, default: "Mayray AI Team" }),
      text("titleSuffix", "Added to post titles in search results", {
        maxLength: 40,
        hint: 'A post called "Hello" appears as "Hello | Mayray AI Blog".',
        default: "Mayray AI Blog",
      }),
    ]),
    seoSection({
      title: "Blog | Mayray AI",
      description:
        "Discover actionable strategies, technical breakdowns, and industry case studies on scaling business operations with autonomous AI agents.",
    }),
  ],
});

type BlogSections = (typeof blogPage)["sections"][number];
export type BlogListingContent = InferFields<Extract<BlogSections, { key: "listing" }>["fields"]>;
export type BlogPostsContent = InferFields<Extract<BlogSections, { key: "posts" }>["fields"]>;
