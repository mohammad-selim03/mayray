// GENERATED FILE: edit frontend/lib/cms and run `pnpm cms:sync`.

// Defaults are the page's live copy at the time it moved into the CMS.
import { defineDocument, seoSection } from "../../fields";
import { centeredBlock, faqBlock, featureRowBlock, heroBlock, integrationsBlock, painPointsBlock, testimonialsBlock, workflowBlock } from "../../blocks/industry";

export const insurancePage = defineDocument({
  key: "insurance",
  label: "Insurance",
  kind: "page",
  route: "/insurance",
  sections: [
    heroBlock({
      "title": "Client call ends. Summarized, filed, followed up. Already done.",
      "subtitle": "Mayray AI turns sales and support calls into structured records, tracks renewal and claims deadlines, and drafts follow-ups automatically so your agents spend time talking to clients, not typing notes about them.",
      "primaryCta": {
        "label": "Try now",
        "href": "/contact"
      },
      "secondaryCta": {
        "label": "How it works",
        "href": "#workflow"
      },
      "note": "Works alongside your existing telephony and CRM.",
      "image": {
        "url": "/insurance/hero-call.jpg",
        "alt": "A client call transcribed, summarized, filed to the right record, and followed up automatically",
        "width": 1000,
        "height": 900
      }
    }),
    painPointsBlock({
      "title": "Hundreds of calls a day. Almost none of them get written down properly.",
      "subtitle": "Every call your team doesn't fully document is a renewal, a claim, or a complaint waiting to resurface with no context attached.",
      "items": [
        {
          "icon": "PhoneOff",
          "title": "Lost detail",
          "body": "An agent takes a coverage request over the phone and the details live only in their memory by the next call."
        },
        {
          "icon": "CalendarX",
          "title": "Missed renewals",
          "body": "A policy lapses because no one flagged the renewal date until the client called angry."
        },
        {
          "icon": "MessageSquareOff",
          "title": "Manual admin",
          "body": "Agents spend as much time logging calls as they do actually taking them."
        }
      ]
    }),
    workflowBlock({
      "title": "A new case, handled in four steps.",
      "steps": [
        {
          "icon": "Target",
          "title": "Capture",
          "body": "Every sales or support call is transcribed and summarized into a structured record automatically."
        },
        {
          "icon": "Zap",
          "title": "Route & Respond",
          "body": "Claims, renewals, and complaints are tagged and routed to the right agent or team."
        },
        {
          "icon": "ChartColumn",
          "title": "Track & Convert",
          "body": "Renewal dates, claim deadlines, and follow-up commitments sync to a shared calendar."
        },
        {
          "icon": "Send",
          "title": "Update",
          "body": "Clients get plain-language confirmations and reminders, reviewed by staff before sending."
        }
      ],
      "image": {
        "url": "/insurance/case-workflow.jpg",
        "alt": "Four-step call workflow: capture, route and respond, track and convert, update",
        "width": 1000,
        "height": 900
      }
    }),
    featureRowBlock("featureRow1", "First feature row", {
      "title": "Stop losing the details clients already gave you.",
      "body": "Every call is transcribed and condensed into a clean summary coverage requested, concerns raised, commitments made filed to the right client record automatically. No agent has to type it up after the fact.",
      "checklist": [
        "Auto-tags call type: new business, renewal, claim, complaint",
        "Flags anything that sounds like a compliance or complaint risk for manager review",
        "Cuts post-call admin time without adding a second tool for agents to learn"
      ],
      "mediaKind": "color",
      "panelColor": "#d7ffff"
    }),
    featureRowBlock("featureRow2", "Second feature row", {
      "title": "No renewal date lives in just one agent's head.",
      "body": "Policy renewal dates and claims deadlines are extracted from call and document data and synced to a shared calendar. If a deadline is approaching, the responsible agent not a shared inbox gets the reminder.",
      "checklist": [
        "Automatic renewal reminders well ahead of lapse dates",
        "Claims status tracked against carrier SLAs",
        "One view across every agent's book of business"
      ],
      "mediaKind": "image",
      "image": {
        "url": "/real-estate/schedule.jpg",
        "alt": "Shared calendar showing policy renewal dates and claim deadlines",
        "width": 1140,
        "height": 900
      }
    }),
    centeredBlock({
      "title": "Clients hear back before they have to ask",
      "body": "Mayray drafts confirmations, renewal reminders, and claim status updates in plain language using real call and policy data. Staff reviews and sends with one click clients stop calling to check if anything happened.",
      "image": {
        "url": "/insurance/client-updates.jpg",
        "alt": "A client receiving a renewal confirmation and claim status update",
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
          "question": "What happens to a call after an agent hangs up?",
          "answer": "The call is transcribed and condensed into a structured summary covering what was requested, what was raised, and what was promised, then filed against the right client record without the agent typing it up."
        },
        {
          "question": "How are renewal and claim deadlines tracked?",
          "answer": "Dates are extracted from call and document data and synced to a shared calendar. The reminder goes to the agent responsible for that book of business rather than into a shared inbox nobody owns."
        },
        {
          "question": "Will it work with our telephony and CRM?",
          "answer": "Yes. Mayray sits alongside the phone system and CRM you already run, so call records, tags, and reminders land in the systems your agents already work in."
        },
        {
          "question": "Can staff review client messages before they send?",
          "answer": "Confirmations, renewal reminders, and claim status updates are drafted for review. Your staff approves and sends with one click, so nothing client-facing goes out unchecked."
        },
        {
          "question": "How does it handle compliance-sensitive calls?",
          "answer": "Anything that reads as a complaint or a possible compliance issue is flagged for manager review rather than being quietly filed, giving you a clear audit point on the calls that matter most."
        }
      ]
    }),
    seoSection({"title":"AI for Insurance | Call Summaries & Renewal Tracking | Mayray AI","description":"Turn every sales and support call into a structured record. Mayray AI summarizes calls, tracks renewal and claim deadlines, and drafts client follow-ups for staff review."}),
  ],
});
