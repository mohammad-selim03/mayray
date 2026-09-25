// Defaults are the page's live copy at the time it moved into the CMS.
import { defineDocument, seoSection } from "../../fields";
import { legalContactBlock, legalContentBlock, legalHeroBlock } from "../../blocks/legal";

export const termsPage = defineDocument({
  key: "terms",
  label: "Terms & Conditions",
  kind: "page",
  route: "/terms",
  sections: [
    legalHeroBlock({
      badge: "Legal Service Agreement & Enterprise Terms",
      title: "Terms & Conditions",
      subtitle:
        "Please read these terms carefully before deploying Mayray AI autonomous agents, telephony pipelines, or API integrations across your enterprise workflows.",
      updated: "Last Updated: September 6, 2026",
      effective: "Effective Immediately Upon Account Activation",
    }),
    legalContentBlock({
      tocTitle: "Terms Navigation",
      sections: [
        {
          anchor: "acceptance",
          title: "1. Acceptance of Terms & Service Scope",
          body:
            '<p>These Terms &amp; Conditions ("Terms") govern your access to and use of Mayray AI software platforms, API endpoints, telephony agents, and autonomous workflow modules provided by Mayray AI Inc. ("Mayray", "Company", "we").</p><p>By registering an account, integrating Mayray APIs, or deploying Mayray Voice AI agents, you agree to be bound by these Terms and our Privacy Policy.</p>',
        },
        {
          anchor: "sla-uptime",
          navLabel: "2. Service Level Agreement (SLA & Uptime)",
          title: "2. Service Level Agreement (SLA & 99.9% Uptime)",
          box: "highlight",
          boxIcon: "Zap",
          boxLabel: "Enterprise SLA Commitment",
          boxTitle: "99.9% Monthly Uptime Guarantee for Core Telephony & API Pipelines",
          boxText:
            "Mayray AI guarantees 99.9% uptime for core API execution and telephony call routing. In the event of an unexcused service disruption exceeding SLA thresholds, eligible enterprise plan customers receive service credits pursuant to our Master Services Agreement (MSA).",
        },
        {
          anchor: "acceptable-use",
          navLabel: "3. Acceptable Use & AI Restrictions",
          title: "3. Acceptable Use & Autonomous AI Restrictions",
          body: "<p>You agree to deploy Mayray AI agents in full compliance with local telecommunications rules, TCPA regulations, and industry guidelines.</p>",
          box: "warning",
          boxIcon: "TriangleAlert",
          boxLabel: "Prohibited Activities:",
          boxItems: [
            { text: "Unsolicited spam robocalling in violation of TCPA or TSR rules." },
            { text: "Impersonating government officials or emergency services." },
            { text: "Using voice AI agents for fraudulent, deceptive, or harassment activities." },
            { text: "Attempting to reverse-engineer or extract base weights from Mayray models." },
          ],
        },
        {
          anchor: "ip-ownership",
          navLabel: "4. Intellectual Property & Customer Ownership",
          title: "4. Intellectual Property & Customer Data Ownership",
          body:
            "<p><strong>Customer Ownership:</strong> You retain sole ownership of all customer inputs, prompts, custom fine-tuning data, voice recordings, and workflow configurations.</p><p><strong>Mayray Ownership:</strong> Mayray retains all right, title, and interest in and to Mayray platform software, core agent architectures, APIs, and trademark assets.</p>",
        },
        {
          anchor: "billing-telephony",
          navLabel: "5. Subscriptions, Fees & Telephony Billing",
          title: "5. Subscriptions, Fees & Telephony Metering",
          body: "<p>Platform subscription fees are billed in advance on a recurring monthly or annual basis. Telephony minutes and API execution tokens above subscription allowances are metered and billed based on your selected rate plan.</p>",
        },
        {
          anchor: "warranties-liability",
          title: "6. Warranties & Limitation of Liability",
          body: '<p>Except as expressly provided, Mayray services are provided "AS IS". To the maximum extent permitted by law, Mayray\'s total aggregate liability arising out of or related to these Terms shall not exceed the total fees paid by you in the 12 months preceding the event.</p>',
        },
        {
          anchor: "term-termination",
          title: "7. Term, Suspension & Data Export",
          body: "<p>Either party may terminate a subscription upon 30 days written notice prior to renewal. Upon termination, you have 30 days to export your CRM logs and configuration data before permanent deletion.</p>",
        },
        {
          anchor: "governing-law",
          navLabel: "8. Governing Law & Arbitration",
          title: "8. Governing Law & Dispute Resolution",
          body: "<p>These Terms shall be governed by the laws of the State of Delaware, without regard to conflict of law principles. Any dispute shall be resolved through binding confidential arbitration.</p>",
        },
      ],
    }),
    legalContactBlock({
      badge: "Legal Counsel & Master Service Agreements",
      title: "Need a custom Enterprise MSA or legal review?",
      text: "Our legal team works directly with enterprise procurement and legal counsel to structure custom SLA, DPA, and Master Service Agreements.",
      button: { label: "Contact Legal Department", href: "mailto:legal@mayray.ai" },
    }),
    seoSection({
      title: "Terms & Conditions | Mayray AI",
      description: "Mayray AI terms of service. Read our service level agreement, acceptable use policy, and legal terms.",
    }),
  ],
});
