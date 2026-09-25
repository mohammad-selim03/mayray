import { defineDocument, icon, image, link, list, section, text, toggle } from "../fields";

const dropdownItem = [
  link("link", "Label & page", { required: true }),
  icon("icon", "Icon"),
  text("description", "Short description", { maxLength: 70 }),
] as const;

export const navbar = defineDocument({
  key: "navbar",
  label: "Navigation",
  kind: "global",
  sections: [
    section("brand", "Logo & name", [
      image("logo", "Logo mark", {
        hint: "Shown inside the round badge at the start of the menu bar.",
        recommended: { width: 80, height: 80 },
        default: { url: "/brand/mayray-mark.svg", alt: "" },
      }),
      text("name", "Brand name", { required: true, maxLength: 40, default: "Mayray AI" }),
    ]),
    section("menu", "Menu", [
      list(
        "items",
        "Menu items",
        [
          link("link", "Label & page", {
            required: true,
            optionalHref: true,
            hint: "Leave the address empty when the item only opens a dropdown.",
          }),
          list("children", "Dropdown items", dropdownItem, { max: 8, itemLabel: "dropdown item", summaryKey: "link" }),
        ],
        {
          min: 1,
          max: 6,
          itemLabel: "menu item",
          summaryKey: "link",
          default: [
            {
              link: { label: "Features", href: "" },
              children: [
                { link: { label: "AI Automation", href: "/ai-automation" }, icon: "Workflow", description: "Automate repetitive work across your tools" },
                { link: { label: "Voice AI", href: "/voice-ai" }, icon: "PhoneCall", description: "Phone agents that answer every call" },
              ],
            },
            {
              link: { label: "Use Cases", href: "" },
              children: [
                { link: { label: "Legal", href: "/legal" }, icon: "Scale", description: "Client intake, deadlines and case updates" },
                { link: { label: "Real Estate", href: "/real-estate" }, icon: "Building2", description: "Instant lead response and showings" },
                { link: { label: "Insurance", href: "/insurance" }, icon: "ShieldCheck", description: "Call summaries and renewal tracking" },
                { link: { label: "Automotive", href: "/automotive" }, icon: "Car", description: "Lead routing and deal approvals" },
                { link: { label: "E-commerce", href: "/ecommerce" }, icon: "ShoppingCart", description: "Order-status tickets answered for you" },
              ],
            },
            { link: { label: "Pricing", href: "/pricing" }, children: [] },
            { link: { label: "Contact Us", href: "/contact" }, children: [] },
          ],
        }
      ),
    ]),
    section("login", "Log-in button", [
      toggle("show", "Show the log-in button", { default: true, hint: "It opens this admin dashboard's sign-in page." }),
      text("label", "Button label", { required: true, maxLength: 20, default: "Log in" }),
    ]),
  ],
});
