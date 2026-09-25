// Defaults are the page's live copy at the time it moved into the CMS.
import { defineDocument, link, section, text } from "../../fields";

export const notFoundPage = defineDocument({
  key: "not-found",
  label: "404 page",
  kind: "page",
  sections: [
    section(
      "content",
      "Message",
      [
        text("badge", "Small line above", { maxLength: 20, default: "404" }),
        text("title", "Headline", { required: true, maxLength: 60, default: "Page not found" }),
        text("description", "Text", { multiline: true, maxLength: 200, default: "The page you're looking for doesn't exist or has been moved." }),
        link("button", "Button", { required: true, default: { label: "Back to home", href: "/" } }),
      ],
      "Shown for any address that doesn't exist on the site."
    ),
  ],
});
