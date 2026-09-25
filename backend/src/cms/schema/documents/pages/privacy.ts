// GENERATED FILE: edit frontend/lib/cms and run `pnpm cms:sync`.

// Defaults are the page's live copy at the time it moved into the CMS.
import { defineDocument, seoSection } from "../../fields";
import { legalContentBlock } from "../../blocks/legal";

export const privacyPage = defineDocument({
  key: "privacy",
  label: "Privacy Policy",
  kind: "page",
  route: "/privacy-policy",
  sections: [
    legalContentBlock({
      tocTitle: "Table of Contents",
      sections: [
        {
          anchor: "collection",
          title: "1. Information We Collect",
          body: '<p>Mayray AI ("Mayray", "we", "our", or "us") collects information necessary to provide autonomous AI agent services across web chat, telephony, and connected CRMs.</p>',
          box: "note",
          boxLabel: "A. Information Provided directly by Users:",
          boxItems: [
            { text: "Account registration credentials (Name, Work Email, Organization Name, Phone Number)." },
            { text: "Conversational prompts, workflow definitions, and agent playbooks." },
            { text: "CRM API keys, SIP telephony credentials, and third-party Webhook endpoints." },
          ],
        },
        {
          anchor: "zero-training",
          title: "2. Zero AI Model Training Guarantee",
          box: "highlight",
          boxIcon: "ShieldCheck",
          boxLabel: "Strict Enterprise Isolation Guarantee",
          boxTitle: "Your customer conversations are NEVER used to train public foundation models.",
          boxText:
            "All prompts, transcripts, customer inputs, and proprietary documents processed by Mayray AI are strictly isolated inside your organization's private tenancy boundary. We maintain binding Zero-Data Retention (ZDR) agreements with underlying LLM vendors.",
        },
        {
          anchor: "telephony-crm",
          title: "3. Telephony & CRM Data Processing",
          body: "<p>When you deploy Mayray Voice AI agents connected to your SIP trunk, Twilio numbers, or CRM software (e.g. Clio, Follow Up Boss, Salesforce):</p>",
          checks: [
            { text: "Audio streams are transmitted securely over SRTP / WebRTC with TLS 1.3 encryption." },
            { text: "Real-time speech recognition outputs are processed in volatile memory without persistent disk logging." },
            { text: "Extracted lead metadata (name, pre-approval status, appointment date) is posted directly to your CRM." },
          ],
          checkColor: "green",
        },
        {
          anchor: "security-encryption",
          title: "4. Security, Encryption & Compliance",
          body: "<p>Mayray AI enforces enterprise-grade security protocols across all infrastructure:</p>",
          cards: [
            { icon: "Lock", title: "AES-256 Encryption", text: "All data at rest is encrypted with military-grade AES-256 keys.", color: "blue" },
            { icon: "Server", title: "SOC2 & HIPAA Compliant", text: "Audited data handling for legal, healthcare, and financial sectors.", color: "green" },
          ],
        },
        {
          anchor: "retention-purge",
          title: "5. Data Retention & Automatic Purging",
          body:
            "<p>Organizations can configure customized retention policies:</p><ul><li><strong>Default Retention:</strong> Transcripts stored for 30 days for operational audit logs.</li><li><strong>Zero Retention Toggle:</strong> Immediately purge audio recordings and call logs after CRM payload delivery.</li><li><strong>Automatic Purge:</strong> Schedule automated 7-day or 14-day permanent data deletion.</li></ul>",
        },
        {
          anchor: "user-rights",
          title: "6. Your Rights & Data Sovereignty",
          body: "<p>Under GDPR, CCPA/CPRA, and global privacy standards, users maintain complete authority to:</p>",
          checks: [
            { text: "Request a full export of stored agent logs and customer records." },
            { text: "Execute immediate account and workspace data erasure." },
            { text: "Restrict processing or revoke API access tokens instantly." },
          ],
          checkColor: "blue",
        },
        {
          anchor: "cookies-analytics",
          title: "7. Cookies & Analytical Tracking",
          body: "<p>We use strictly necessary cookies to maintain secure sessions and performance metrics. We do not sell user data to third-party ad networks or data brokers.</p>",
        },
        {
          anchor: "contact-dpo",
          navLabel: "8. Contact Data Protection Officer",
          title: "8. Contact Our Data Protection Officer",
          body: '<p>If you have questions regarding this Privacy Policy or wish to submit a data subject access request, contact our security team at <a href="mailto:privacy@mayray.ai"><strong>privacy@mayray.ai</strong></a>.</p>',
        },
      ],
    }),
    seoSection({
      title: "Privacy Policy | Mayray AI",
      description: "Mayray AI privacy policy. Learn how we collect, use, and protect your personal information. Zero AI training on customer data.",
    }),
  ],
});
