// GENERATED FILE: edit frontend/lib/cms/schema and run `pnpm cms:sync`.

// Defaults are the page's live copy at the time it moved into the CMS.
import { defineDocument, seoSection } from "../../fields";
import { centeredBlock, faqBlock, featureRowBlock, heroBlock, integrationsBlock, painPointsBlock, testimonialsBlock, workflowBlock } from "../../blocks/industry";

export const automotivePage = defineDocument({
  key: "automotive",
  label: "Automotive",
  kind: "page",
  route: "/automotive",
  sections: [
    heroBlock({
      "title": "Follow every lead. Approve every deal. Track every delivery.",
      "subtitle": "Mayray AI routes leads to the right rep, moves financing approvals through your chain automatically, and keeps customers updated on delivery so deals don't stall waiting on someone to check an inbox.",
      "primaryCta": {
        "label": "Try now",
        "href": "/contact"
      },
      "secondaryCta": {
        "label": "How it works",
        "href": "#workflow"
      },
      "note": "Works alongside your existing DMS and CRM.",
      "image": {
        "url": "/automotive/hero-pipeline.jpg",
        "alt": "A vehicle lead captured, routed to a rep, approved, and tracked through to delivery",
        "width": 1000,
        "height": 900
      }
    }),
    painPointsBlock({
      "title": "A hot lead goes cold the moment it sits in an inbox overnight",
      "subtitle": "Every stalled approval or unassigned lead is a customer one phone call away from a competitor's lot.",
      "items": [
        {
          "icon": "PhoneOff",
          "title": "Slow lead response",
          "body": "A web inquiry comes in after hours and no one follows up until the next afternoon."
        },
        {
          "icon": "CalendarX",
          "title": "Approval bottlenecks",
          "body": "A financing exception sits waiting for a manager's signature while the customer waits in the showroom."
        },
        {
          "icon": "MessageSquareOff",
          "title": "Silent delivery timelines",
          "body": "A customer finds out their custom order is delayed only when they call to ask."
        }
      ]
    }),
    workflowBlock({
      "title": "A new case, handled in four steps.",
      "steps": [
        {
          "icon": "Target",
          "title": "Capture",
          "body": "Web, phone, and walk-in leads are logged as structured records automatically."
        },
        {
          "icon": "Zap",
          "title": "Route & Respond",
          "body": "Leads are assigned to the right rep by region, model interest, or current load."
        },
        {
          "icon": "ChartColumn",
          "title": "Track & Convert",
          "body": "Financing and discount exceptions move through your approval chain automatically, with every step logged."
        },
        {
          "icon": "Send",
          "title": "Update",
          "body": "Customers get plain-language updates on order and delivery status, reviewed by staff before sending."
        }
      ],
      "image": {
        "url": "/automotive/case-workflow.jpg",
        "alt": "Four-step deal workflow: capture, route and respond, track and convert, update",
        "width": 1000,
        "height": 900
      }
    }),
    featureRowBlock("featureRow1", "First feature row", {
      "title": "Stop losing leads to slow response times",
      "body": "Every inquiry web form, phone call, or walk-in note becomes a structured lead in seconds, tagged by model interest and urgency, and routed to the right rep automatically.",
      "checklist": [
        "Auto-tags lead source, model interest, and urgency",
        "Routes by region, rep specialty, or current pipeline load",
        "Flags leads with no rep response within your defined window"
      ],
      "mediaKind": "color",
      "panelColor": "#d7ffff"
    }),
    featureRowBlock("featureRow2", "Second feature row", {
      "title": "No deal stalls waiting for someone to notice an approval request",
      "body": "Discount exceptions and financing terms outside standard thresholds route automatically to the right approver, with the full deal context attached. Every approval and every deviation from standard terms is logged for audit.",
      "checklist": [
        "Automatic routing based on discount size or financing terms",
        "Manager gets full deal context, not just a bare notification",
        "Full audit trail on every approval and exception"
      ],
      "mediaKind": "color",
      "panelColor": "#ffffff"
    }),
    centeredBlock({
      "title": "Customers stay informed from signed deal to delivery day",
      "body": "Mayray drafts order and delivery status updates in plain language using real inventory and logistics data. Staff reviews and sends with one click customers stop calling to check where their vehicle is.",
      "image": {
        "url": "/automotive/delivery-updates.jpg",
        "alt": "A customer receiving an order and delivery status update for their vehicle",
        "width": 1540,
        "height": 1000
      }
    }),
    testimonialsBlock({
      "title": "What Businesses Are Saying",
      "items": [
        {
          "quote": "Mayray AI replaced hours of manual work overnight.",
          "body": "Before using Mayray AI, our team was buried in repetitive tasks. Now, workflows run automatically, and we have saved over 20+ hours every week.",
          "name": "Olivia Chen",
          "role": "Operations Manager, SaaS Company",
          "avatar": {
            "url": "/testimonials/avatar-1.jpg",
            "alt": "",
            "width": 96,
            "height": 96
          }
        },
        {
          "quote": "It feels like we hired a full support team without the cost.",
          "body": "Mayray AI handles customer queries instantly, 24/7. Our response time dropped dramatically, and customer satisfaction has never been higher.",
          "name": "Ethan Brooks",
          "role": "Head of Support, E-commerce Brand",
          "avatar": {
            "url": "/testimonials/avatar-2.jpg",
            "alt": "",
            "width": 96,
            "height": 96
          }
        },
        {
          "quote": "We scaled faster without increasing our team size.",
          "body": "Mayray AI did not just automate tasks it gave us the ability to grow without operational bottlenecks. The ROI was clear within the first month.",
          "name": "Daniel Foster",
          "role": "Founder, Digital Agency",
          "avatar": {
            "url": "/testimonials/avatar-3.jpg",
            "alt": "",
            "width": 96,
            "height": 96
          }
        }
      ]
    }),
    integrationsBlock({
      "title": "Seamless Integrations",
      "subtitle": "Connect with your favorite tools and platforms. Mayray integrates with 100+ business applications.",
      "items": [
        {
          "name": "Salesforce",
          "category": "CRM",
          "logo": {
            "url": "/real-estate/integrations/salesforce.webp",
            "alt": "",
            "width": 128,
            "height": 128
          },
          "mark": ""
        },
        {
          "name": "HubSpot",
          "category": "Marketing",
          "logo": {
            "url": "/real-estate/integrations/hubspot.webp",
            "alt": "",
            "width": 128,
            "height": 128
          },
          "mark": ""
        },
        {
          "name": "QuickBooks",
          "category": "Finance",
          "logo": {
            "url": "/real-estate/integrations/quickbooks.webp",
            "alt": "",
            "width": 128,
            "height": 128
          },
          "mark": ""
        },
        {
          "name": "Microsoft Teams",
          "category": "Communication",
          "logo": {
            "url": "/real-estate/integrations/microsoft-teams.webp",
            "alt": "",
            "width": 128,
            "height": 128
          },
          "mark": ""
        },
        {
          "name": "Zapier",
          "category": "Automation",
          "logo": {
            "url": "/real-estate/integrations/zapier.webp",
            "alt": "",
            "width": 128,
            "height": 128
          },
          "mark": ""
        },
        {
          "name": "DocuSign",
          "category": "Documents",
          "logo": {
            "url": "/real-estate/integrations/docusign.webp",
            "alt": "",
            "width": 128,
            "height": 128
          },
          "mark": ""
        },
        {
          "name": "Zoom",
          "category": "Video",
          "logo": {
            "url": "/real-estate/integrations/zoom.webp",
            "alt": "",
            "width": 128,
            "height": 128
          },
          "mark": ""
        },
        {
          "name": "Mailchimp",
          "category": "Email",
          "logo": {
            "url": "/real-estate/integrations/mailchimp.webp",
            "alt": "",
            "width": 128,
            "height": 128
          },
          "mark": ""
        },
        {
          "name": "Calendly",
          "category": "Scheduling",
          "logo": {
            "url": "/real-estate/integrations/calendly.webp",
            "alt": "",
            "width": 128,
            "height": 128
          },
          "mark": ""
        },
        {
          "name": "Slack",
          "category": "Communication",
          "logo": {
            "url": "/real-estate/integrations/slack.webp",
            "alt": "",
            "width": 128,
            "height": 128
          },
          "mark": ""
        },
        {
          "name": "Google Workspace",
          "category": "Productivity",
          "logo": {
            "url": "/real-estate/integrations/google-workspace.webp",
            "alt": "",
            "width": 128,
            "height": 128
          },
          "mark": ""
        },
        {
          "name": "Stripe",
          "category": "Payments",
          "logo": {
            "url": "/real-estate/integrations/stripe.webp",
            "alt": "",
            "width": 128,
            "height": 128
          },
          "mark": ""
        }
      ]
    }),
    faqBlock({
      "title": "Frequently Asked Questions",
      "items": [
        {
          "question": "How quickly does a new lead get picked up?",
          "answer": "Web, phone, and walk-in enquiries become structured lead records the moment they arrive and are routed straight to a rep, so an after-hours inquiry is assigned rather than waiting for someone to open the inbox."
        },
        {
          "question": "How are leads assigned to reps?",
          "answer": "Routing works on region, model interest, and current pipeline load, so a lead goes to someone with the right specialty and the capacity to work it rather than into a shared queue."
        },
        {
          "question": "Can it handle financing and discount approvals?",
          "answer": "Exceptions outside your standard thresholds route automatically to the right approver with the full deal context attached, and every approval or deviation is logged for audit."
        },
        {
          "question": "Will it work with our DMS and CRM?",
          "answer": "Yes. Mayray runs alongside the DMS and CRM you already use, reading inventory and deal data and writing leads, approvals, and status changes back into those systems."
        },
        {
          "question": "Do customers get delivery updates automatically?",
          "answer": "Order and delivery updates are drafted from real inventory and logistics data. Your staff reviews and sends with one click, so customers hear about a delay before they call to ask about it."
        }
      ]
    }),
    seoSection({"title":"AI for Automotive | Lead Routing & Deal Approvals | Mayray AI","description":"Route every lead to the right rep, move financing and discount approvals through your chain automatically, and keep customers updated from signed deal to delivery day."}),
  ],
});
