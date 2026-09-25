// Defaults are the page's live copy at the time it moved into the CMS.
import { defineDocument, seoSection } from "../../fields";
import { centeredBlock, faqBlock, featureRowBlock, heroBlock, integrationsBlock, painPointsBlock, testimonialsBlock, workflowBlock } from "../../blocks/industry";

export const legalPage = defineDocument({
  key: "legal",
  label: "Legal",
  kind: "page",
  route: "/legal",
  sections: [
    heroBlock({
      "title": "New case in. Drafted, scheduled, followed up. Before the coffee's cold.",
      "subtitle": "Mayray AI reads intake forms, drafts client communications, and keeps deadlines on your calendar automatically so your team spends billable hours on law, not admin.",
      "primaryCta": {
        "label": "Try now",
        "href": "#contact"
      },
      "secondaryCta": {
        "label": "How it works",
        "href": "#workflow"
      },
      "note": "No CRM overhaul. Works with what you already use.",
      "image": {
        "url": "/legal/legal-hero-flow.png",
        "alt": "New legal case automatically routed to follow-up, response, and a scheduled meeting",
        "width": 1120,
        "height": 720
      }
    }),
    painPointsBlock({
      "title": "Cases don't wait for someone to catch up on email.",
      "subtitle": "Every hour a case sits in an inbox is an hour a competitor firm is already on the phone with that client.",
      "items": [
        {
          "icon": "PhoneCall",
          "title": "Missed intake",
          "body": "A new client calls, someone jots notes on a sticky pad, and the case sits untouched for three days."
        },
        {
          "icon": "CalendarDays",
          "title": "Deadline risk",
          "body": "Filing dates live in someone's head, not a system. One missed reminder is a malpractice risk."
        },
        {
          "icon": "MessageSquare",
          "title": "Client silence",
          "body": "Clients want updates. Attorneys want to bill hours, not write status emails."
        }
      ]
    }),
    workflowBlock({
      "title": "A new case, handled in four steps.",
      "steps": [
        {
          "icon": "Target",
          "title": "Capture",
          "body": "Website or phone intake is logged automatically into a structured case file."
        },
        {
          "icon": "Zap",
          "title": "Route & Respond",
          "body": "The case is assigned to the right attorney based on practice area and current load."
        },
        {
          "icon": "CalendarDays",
          "title": "Track & Convert",
          "body": "Filing dates, hearings, and follow-ups are pulled onto the firm calendar, nothing typed twice."
        },
        {
          "icon": "Send",
          "title": "Update",
          "body": "Clients get plain-language status updates on autopilot, reviewed by staff before sending."
        }
      ],
      "image": {
        "url": "/legal/legal-case-workflow.png",
        "alt": "Four-step legal case workflow",
        "width": 900,
        "height": 700
      }
    }),
    featureRowBlock("featureRow1", "First feature row", {
      "title": "Stop losing clients to slow intake",
      "body": "Every inquiry web form, phone call transcript, or referral email becomes a structured case record in seconds. No one re-types a name, a claim type, or a phone number.",
      "checklist": [
        "Auto-tags case type and urgency",
        "Flags conflicts of interest before assignment",
        "Notifies the right attorney the moment a case is ready to review"
      ],
      "mediaKind": "color",
      "panelColor": "#d4fbfb"
    }),
    featureRowBlock("featureRow2", "Second feature row", {
      "title": "No deadline lives in just one person's head",
      "body": "Statute limitations, filing dates, and hearing schedules are extracted from case documents and synced to your firm calendar automatically. If a date shifts, every dependent task shifts with it.",
      "checklist": [
        "Court-date and filing-deadline extraction from uploaded documents",
        "Automatic reminders to the responsible attorney, not just the team",
        "A single calendar view across every open matter"
      ],
      "mediaKind": "image",
      "image": {
        "url": "/legal/legal-deadline-calendar.png",
        "alt": "Calendar view showing automated legal deadlines",
        "width": 1000,
        "height": 720
      }
    }),
    centeredBlock({
      "title": "Clients feel informed.\nAttorneys stay billable",
      "body": "Mayray drafts case status updates in plain language, using real case data not templates. Staff reviews and sends with one click. Clients stop calling to ask, “any news?”",
      "image": {
        "url": "/legal/legal-client-update.png",
        "alt": "Case update automatically delivered to a client",
        "width": 1540,
        "height": 1000
      }
    }),
    testimonialsBlock({
      "title": "What Businesses Are Saying",
      "items": [
        {
          "quote": "Mayray AI replaced hours of manual work overnight.",
          "body": "Before using Mayray AI, our team was buried in repetitive tasks. Now, workflows run automatically, and we've saved over 20+ hours every week.",
          "name": "Olivia Chen",
          "role": "Operations Manager, SaaS Company",
          "avatar": null
        },
        {
          "quote": "It feels like we hired a full support team without the cost.",
          "body": "Mayray AI handles customer queries instantly, 24/7. Our response time dropped dramatically, and customer satisfaction has never been higher.",
          "name": "Ethan Brooks",
          "role": "Head of Support, E-commerce Brand",
          "avatar": null
        },
        {
          "quote": "We scaled faster without increasing our team size.",
          "body": "Mayray AI didn't just automate tasks, it gave us the ability to grow without operational bottlenecks. The ROI was clear within the first month.",
          "name": "Daniel Foster",
          "role": "Founder, Digital Agency",
          "avatar": null
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
          "logo": null,
          "mark": "S"
        },
        {
          "name": "HubSpot",
          "category": "Marketing",
          "logo": null,
          "mark": "H"
        },
        {
          "name": "QuickBooks",
          "category": "Finance",
          "logo": null,
          "mark": "qb"
        },
        {
          "name": "Microsoft Teams",
          "category": "Communication",
          "logo": null,
          "mark": "T"
        },
        {
          "name": "Zapier",
          "category": "Automation",
          "logo": null,
          "mark": "Z"
        },
        {
          "name": "DocuSign",
          "category": "Documents",
          "logo": null,
          "mark": "D"
        },
        {
          "name": "Zoom",
          "category": "Video",
          "logo": null,
          "mark": "Z"
        },
        {
          "name": "Mailchimp",
          "category": "Email",
          "logo": null,
          "mark": "m"
        },
        {
          "name": "Calendly",
          "category": "Scheduling",
          "logo": null,
          "mark": "C"
        },
        {
          "name": "Slack",
          "category": "Communication",
          "logo": null,
          "mark": "S"
        },
        {
          "name": "Google Workspace",
          "category": "Productivity",
          "logo": null,
          "mark": "G"
        },
        {
          "name": "Stripe",
          "category": "Payments",
          "logo": null,
          "mark": "S"
        }
      ]
    }),
    faqBlock({
      "title": "Frequently Asked Questions",
      "items": [
        {
          "question": "What parts of legal intake can Mayray automate?",
          "answer": "Mayray captures web and phone enquiries, checks required matter details, routes work to the right person, and drafts the next client response for staff review."
        },
        {
          "question": "Will Mayray work with our current practice tools?",
          "answer": "Yes. Mayray is designed around the tools your team already uses, so new case information and reminders can flow into the systems that run your firm."
        },
        {
          "question": "How does Mayray keep client data secure?",
          "answer": "Each workflow is configured around the access controls and review steps your firm requires. Sensitive communications stay inside the systems your team approves."
        },
        {
          "question": "Can attorneys review AI-generated messages before they send?",
          "answer": "Yes. Client-facing updates can be held for approval, giving your staff a clear review point while removing repetitive drafting work."
        },
        {
          "question": "How quickly can a legal workflow go live?",
          "answer": "A focused workflow can be mapped and deployed in weeks, beginning with the highest-volume intake or deadline process."
        }
      ]
    }),
    seoSection({"title":"Legal Industry AI Automation | Mayray AI","description":"Mayray AI automates legal intake, case routing, deadline tracking, and client updates. Built for law firms — no CRM overhaul required."}),
  ],
});
