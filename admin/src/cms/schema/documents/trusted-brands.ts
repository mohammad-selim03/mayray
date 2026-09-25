// GENERATED FILE: edit frontend/lib/cms/schema and run `pnpm cms:sync`.

import { color, defineDocument, icon, image, list, section, select, text } from "../fields";

const brand = (name: string, hex: string, extra: { style?: "serifItalic"; icon?: string } = {}) => ({
  name,
  logo: null,
  color: hex,
  style: extra.style ?? ("bold" as const),
  icon: extra.icon ?? "",
});

export const trustedBrands = defineDocument({
  key: "trusted-brands",
  label: "Trusted brands strip",
  kind: "global",
  sections: [
    section("content", "Brands", [
      text("heading", "Heading", { multiline: true, required: true, maxLength: 80, default: "Trusted by Leading\nBusiness Teams" }),
      list(
        "brands",
        "Brands",
        [
          text("name", "Name", { required: true, maxLength: 40 }),
          image("logo", "Logo", { hint: "Optional. When set, the logo shows instead of the name.", recommended: { width: 320, height: 80 } }),
          color("color", "Text colour", { default: "#18181b" }),
          select("style", "Text style", [
            { value: "bold", label: "Bold" },
            { value: "serifItalic", label: "Serif italic" },
          ]),
          icon("icon", "Icon before the name"),
        ],
        {
          min: 1,
          max: 20,
          itemLabel: "brand",
          summaryKey: "name",
          hint: "The strip scrolls continuously on the Pricing page and every industry page.",
          default: [
            brand("Adobe", "#ff0000"),
            brand("afterpay", "#000000", { style: "serifItalic" }),
            brand("airbnb", "#ff5a5f", { icon: "Droplet" }),
            brand("Airwallex", "#000000"),
            brand("Airtable", "#18bfff"),
            brand("Airtasker", "#000000"),
            brand("amazon", "#ff9900"),
          ],
        }
      ),
    ]),
  ],
});
