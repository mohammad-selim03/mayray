// GENERATED FILE: edit frontend/lib/cms and run `pnpm cms:sync`.

import { defineDocument, image, link, list, section, text } from "../fields";

const page = (label: string, href: string) => ({ link: { label, href } });
const logo = (name: string, file: string) => ({ name, logo: { url: `/footer/${file}`, alt: "" } });

export const footer = defineDocument({
  key: "footer",
  label: "Footer",
  kind: "global",
  sections: [
    section("about", "About", [
      image("photo1", "Top photo", { recommended: { width: 540, height: 304 }, default: { url: "/footer/service1.png", alt: "" } }),
      image("photo2", "Bottom photo", { recommended: { width: 540, height: 304 }, default: { url: "/footer/service2.png", alt: "" } }),
      text("tagline", "Tagline", {
        multiline: true,
        maxLength: 200,
        default:
          "AI automation built for Legal, Real Estate, Insurance, Automotive, and Ecommerce teams from lead intake to close, without the manual work.",
      }),
      list("socials", "Social links", [link("link", "Name & address", { required: true, optionalHref: true })], {
        max: 6,
        itemLabel: "social link",
        summaryKey: "link",
        hint: "Without an address the name shows as plain text.",
        default: ["LinkedIn", "Twitter", "Facebook", "Reddit", "Youtube"].map((label) => ({ link: { label, href: "" } })),
      }),
    ]),
    section("columns", "Link columns", [
      list(
        "columns",
        "Columns",
        [
          text("title", "Heading", { required: true, maxLength: 30 }),
          list("links", "Links", [link("link", "Link", { required: true })], { max: 8, itemLabel: "link", summaryKey: "link" }),
        ],
        {
          min: 1,
          max: 4,
          itemLabel: "column",
          summaryKey: "title",
          default: [
            {
              title: "Solutions",
              links: [
                page("Legal", "/legal"),
                page("Real estate", "/real-estate"),
                page("Insurance", "/insurance"),
                page("Automotive", "/automotive"),
                page("Ecommerce", "/ecommerce"),
              ],
            },
            { title: "Resources", links: [page("Blog", "/blog"), page("Contact", "/contact")] },
            {
              title: "Company",
              links: [page("About Us", "/"), page("Privacy Policy", "/privacy-policy"), page("Terms & Conditions", "/terms")],
            },
          ],
        }
      ),
    ]),
    section("newsletter", "Newsletter", [
      text("title", "Heading", { required: true, maxLength: 80, default: "See how other teams automate with Mayray" }),
      text("text", "Text", {
        multiline: true,
        maxLength: 240,
        default: "Monthly breakdowns of real workflows from Legal, Real Estate, Insurance, Automotive, and Ecommerce teams using Mayray.",
      }),
      text("placeholder", "Email box placeholder", { required: true, maxLength: 40, default: "Email address" }),
      text("button", "Button label", { required: true, maxLength: 20, default: "Subscribe" }),
      text("success", "Message after subscribing", { required: true, maxLength: 120, default: "You're subscribed! Thanks for joining." }),
    ]),
    section("showcase", "Integration logos", [
      list("logos", "Floating logos", [text("name", "Name", { required: true, maxLength: 24 }), image("logo", "Logo", { required: true, recommended: { width: 80, height: 80 } })], {
        max: 6,
        itemLabel: "logo",
        summaryKey: "name",
        hint: "Places follow the design: the first two sit on the round mark, the rest on the Mayray wordmark.",
        default: [
          logo("monday.com", "monday.png"),
          logo("Dropbox", "dropbox.png"),
          logo("Hubspot", "hubspot.png"),
          logo("Twilio", "twilio.png"),
          logo("Slack", "slack.png"),
          logo("Asana", "asana.png"),
        ],
      }),
      text("copyright", "Copyright line", { required: true, maxLength: 120, default: "© 2026 Mayray AI · All rights reserved" }),
    ]),
  ],
});
