// Defaults are the page's live copy at the time it moved into the CMS.
import { defineDocument, image, link, list, section, seoSection, text } from "../../fields";
import type { InferFields } from "../../types";

export const contactPage = defineDocument({
  key: "contact",
  label: "Contact",
  kind: "page",
  route: "/contact",
  sections: [
    section("hero", "Hero", [
      text("eyebrow", "Small line above", { maxLength: 40, default: "Get in Touch" }),
      text("title", "Headline", { required: true, maxLength: 80, default: "Contact Mayray AI" }),
      text("subtitle", "Subtitle", { multiline: true, maxLength: 200, default: "We would love to hear from you. We will respond promptly." }),
    ]),
    section(
      "form",
      "Message form",
      [
        image("image", "Photo beside the form", {
          required: true,
          recommended: { width: 1140, height: 1102 },
          default: { url: "/contact/contact-hero.jpg", alt: "Person using a phone to get in touch with Mayray AI", width: 1140, height: 1102 },
        }),
        text("title", "Form headline", { required: true, maxLength: 60, default: "Send Us a Message" }),
        text("nameLabel", "Name label", { required: true, maxLength: 40, default: "Your Name" }),
        text("namePlaceholder", "Name placeholder", { maxLength: 60, default: "Full name" }),
        text("phoneLabel", "Phone label", { required: true, maxLength: 40, default: "Phone number" }),
        text("phonePlaceholder", "Phone placeholder", { maxLength: 60, default: "+01 XXXXX XXXXX" }),
        text("emailLabel", "Email label", { required: true, maxLength: 40, default: "Email" }),
        text("emailPlaceholder", "Email placeholder", { maxLength: 60, default: "olivia@domain.com" }),
        text("messageLabel", "Message label", { required: true, maxLength: 40, default: "Your message" }),
        text("messagePlaceholder", "Message placeholder", { maxLength: 80, default: "Type your message here" }),
        text("submitLabel", "Send button", { required: true, maxLength: 30, default: "Send message" }),
        text("sendingLabel", "Button while sending", { required: true, maxLength: 30, default: "Sending…" }),
        text("successMessage", "Thank-you message", { required: true, maxLength: 200, default: "Thanks — your message is on its way. We'll be in touch shortly." }),
        text("footnote", "Note under the form", { maxLength: 120, default: "We typically respond within 48 hours." }),
      ],
      "Messages arrive in Leads → Contacts."
    ),
    section("office", "Head office", [
      text("title", "Headline", { required: true, maxLength: 60, default: "Head Office" }),
      text("company", "Company name", { maxLength: 60, default: "Mayray AI" }),
      text("address", "Address", { multiline: true, maxLength: 200, default: "C-49, Industrial Area, Naini," }),
      text("phone", "Phone", { maxLength: 40, default: "+01 XXXXX XXXXX" }),
      text("hours", "Opening hours", { maxLength: 60, default: "Mon - Sat, 9:00 AM - 6:00 PM" }),
      link("whatsapp", "WhatsApp link", {
        hint: "Use a https://wa.me/ link with your number. Leave the label empty to hide it.",
        default: { label: "WhatsApp", href: "https://wa.me/", newTab: true },
      }),
      text("whatsappNote", "Line under WhatsApp", { maxLength: 60, default: "Or reach us directly on" }),
      list("emails", "Email addresses", [text("text", "Address and team", { required: true, maxLength: 80 })], {
        max: 6,
        itemLabel: "address",
        summaryKey: "text",
        default: ["info@domain.com (General)", "sales@domain.com (Sales)", "investors@domain.com (Investors)", "hr@domain.com (HR / Careers)"].map((t) => ({ text: t })),
      }),
      image("map", "Map image", {
        required: true,
        recommended: { width: 1140, height: 822 },
        default: { url: "/contact/office-map.jpg", alt: "Map showing the Mayray AI head office location", width: 1140, height: 822 },
      }),
    ]),
    seoSection({
      title: "Contact Mayray AI | Talk to Our Automation Team",
      description:
        "Get in touch with Mayray AI. Send us a message, reach our head office, or contact sales, support, investors, and careers directly. We respond within 48 hours.",
    }),
  ],
});

type ContactSections = (typeof contactPage)["sections"][number];
export type ContactHeroContent = InferFields<Extract<ContactSections, { key: "hero" }>["fields"]>;
export type ContactFormContent = InferFields<Extract<ContactSections, { key: "form" }>["fields"]>;
export type ContactOfficeContent = InferFields<Extract<ContactSections, { key: "office" }>["fields"]>;
