import { sanitizeFigmaAssetsInPlace } from "./assetUtils";

/** App icons shown on the feature stories, looked up by the app names in each Features item. */
export const integrationLogos = [
  { name: "Google Calendar", src: "/svg/google-calendar 1.svg" },
  { name: "Microsoft Teams", src: "/svg/microsoft-team-management-business-office 1.svg" },
  { name: "Slack", src: "/globe.svg" },
  { name: "Google Keep", src: "/svg/google-keep.svg" },
  { name: "PowerPoint", src: "/svg/microsoft-powerpoint-2013-logo 1.svg" },
  { name: "Google Drive", src: "/svg/google-drive.svg" },
  { name: "SAP", src: "/svg/sap 1.svg" },
  { name: "Salesforce", src: "/svg/saleforce.svg" },
  { name: "Chrome", src: "/svg/chrome.svg" },
  { name: "Instagram", src: "/svg/instagram.svg" },
  { name: "Excel", src: "/svg/excel.svg" },
  { name: "Word", src: "/svg/ms-word 1.svg" },
  { name: "LinkedIn", src: "/svg/linkedin.svg" },
  { name: "Gmail", src: "/svg/gmail.svg" },
  { name: "Sheet", src: "/globe.svg" },
  { name: "Sheets", src: "/globe.svg" },
  { name: "Outlook", src: "/svg/ms-outlook 2.svg" },
  { name: "Whatsapp", src: "/svg/whatsapp.svg" },
  { name: "Zendesk", src: "/svg/zendesk.svg" },
  { name: "Wordpress", src: "/svg/WordPress.svg" },
  { name: "Stripe", src: "/svg/Stripe.svg" },
  { name: "Ebay", src: "/svg/EBay.svg" },
  { name: "Amazon", src: "/svg/Amazon.svg" },
  { name: "Woocommerce", src: "/svg/WooCommerce.svg" },
];

sanitizeFigmaAssetsInPlace(integrationLogos);
