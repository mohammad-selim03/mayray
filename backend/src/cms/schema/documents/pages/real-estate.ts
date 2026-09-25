// GENERATED FILE: edit frontend/lib/cms/schema and run `pnpm cms:sync`.

// Defaults are the page's live copy at the time it moved into the CMS.
import { defineDocument, seoSection } from "../../fields";
import { centeredBlock, faqBlock, featureRowBlock, heroBlock, integrationsBlock, painPointsBlock, testimonialsBlock, workflowBlock } from "../../blocks/industry";

export const realEstatePage = defineDocument({
  key: "real-estate",
  label: "Real Estate",
  kind: "page",
  route: "/real-estate",
  sections: [
    heroBlock({
      "title": "Maintenance request in. Triaged, assigned, tracked. Before they finish typing.",
      "subtitle": "Mayray AI reads tenant requests, routes them to the right vendor, and keeps owners updated automatically so your team manages more units without adding headcount.",
      "primaryCta": {
        "label": "Try now",
        "href": "/contact"
      },
      "secondaryCta": {
        "label": "How it works",
        "href": "#workflow"
      },
      "note": "Works alongside your existing property management software.",
      "image": {
        "url": "/real-estate/hero-flow.jpg",
        "alt": "A tenant maintenance request captured, triaged, assigned to a vendor, and tracked to completion",
        "width": 1000,
        "height": 900
      }
    }),
    painPointsBlock({
      "title": "A leaking faucet shouldn’t take three phone calls to fix",
      "subtitle": "Every delay is a tenant complaint, an owner question, or a vendor no-show waiting to happen.",
      "items": [
        {
          "icon": "PhoneOff",
          "title": "Slow triage",
          "body": "A maintenance request sits in a group inbox until someone has time to read it."
        },
        {
          "icon": "CalendarX",
          "title": "Vendor chaos",
          "body": "No one knows which vendor is available, which one already no-showed twice."
        },
        {
          "icon": "MessageSquareOff",
          "title": "Owner silence",
          "body": "Owners find out about a $4,000 repair after it’s already done."
        }
      ]
    }),
    workflowBlock({
      "title": "A new case, handled in four steps.",
      "steps": [
        {
          "icon": "Target",
          "title": "Capture",
          "body": "Tenant requests text, email, or portal are logged as structured work orders automatically."
        },
        {
          "icon": "Zap",
          "title": "Route & Respond",
          "body": "The request is assigned to an available, qualified vendor based on issue type and unit location."
        },
        {
          "icon": "ChartColumn",
          "title": "Track & Convert",
          "body": "Vendor progress and completion dates sync to a live portfolio-wide schedule."
        },
        {
          "icon": "Send",
          "title": "Update",
          "body": "Owners get plain-language status updates on higher-cost or time-sensitive repairs, reviewed by staff before sending."
        }
      ],
      "image": {
        "url": "/real-estate/case-workflow.jpg",
        "alt": "Four-step maintenance workflow: capture, route and respond, track and convert, update",
        "width": 1000,
        "height": 900
      }
    }),
    featureRowBlock("featureRow1", "First feature row", {
      "title": "Stop losing hours to manual triage",
      "body": "Every tenant request text, email, or portal submission becomes a categorized work order in seconds. Urgent issues (no heat, no water, safety hazards) are flagged and escalated automatically.",
      "checklist": [
        "Auto-categorizes by issue type and urgency",
        "Matches requests to the right vendor by trade and availability",
        "Escalates anything unresolved after your defined SLA"
      ],
      "mediaKind": "color",
      "panelColor": "#d7ffff"
    }),
    featureRowBlock("featureRow2", "Second feature row", {
      "title": "Know exactly where every job stands, across every property",
      "body": "Vendor assignments, scheduled visits, and completion status live on one portfolio-wide calendar. If a vendor reschedules, dependent tasks and the tenant notification update automatically.",
      "checklist": [
        "One schedule view across all properties and units",
        "Vendor reliability tracked automatically (response time, no-shows, completion rate)",
        "Reminders go to the vendor, not just a shared inbox"
      ],
      "mediaKind": "image",
      "image": {
        "url": "/real-estate/schedule.jpg",
        "alt": "Portfolio-wide calendar showing vendor visits and completion status",
        "width": 1140,
        "height": 900
      }
    }),
    centeredBlock({
      "title": "Owners stay informed. Your team stays focused on the property, not the phone",
      "body": "Mayray drafts owner updates in plain language using real work-order data cost estimates, vendor, timeline. Staff reviews and sends with one click. Owners stop calling to ask “what’s happening with unit 4B?”",
      "image": {
        "url": "/real-estate/owner-portal.jpg",
        "alt": "Owner portal app showing maintenance updates, rent payments, and scheduled inspections",
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
          "question": "What kinds of tenant requests can Mayray handle?",
          "answer": "Mayray reads maintenance requests arriving by text, email, or resident portal, categorises them by issue type and urgency, and turns each one into a structured work order without anyone re-typing the details."
        },
        {
          "question": "How does Mayray decide which vendor gets the job?",
          "answer": "Requests are matched to vendors by trade, service area, and current availability. If a vendor does not respond inside your defined SLA, the request escalates automatically rather than sitting unassigned."
        },
        {
          "question": "Will this replace our property management software?",
          "answer": "No. Mayray works alongside the system you already run. Work orders, schedules, and status changes flow into the tools your team uses, so there is no migration and no CRM overhaul."
        },
        {
          "question": "Do owners get updates automatically?",
          "answer": "Mayray drafts owner updates in plain language from real work-order data such as cost estimates, vendor, and timeline. Your staff reviews and sends with one click, so nothing goes out unchecked."
        },
        {
          "question": "How long does it take to go live?",
          "answer": "Most teams start with their highest-volume workflow, usually maintenance intake and vendor dispatch, and have it running in a matter of weeks rather than months."
        }
      ]
    }),
    seoSection({"title":"AI for Real Estate | Lead Response & Showing Automation | Mayray AI","description":"Automate Zillow/Realtor lead response in 12 seconds. AI-powered showing scheduling, pre-qualification, and CRM follow-ups for real estate teams."}),
  ],
});
