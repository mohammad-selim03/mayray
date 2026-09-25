// GENERATED FILE: edit frontend/lib/cms and run `pnpm cms:sync`.

// Defaults are the page's live copy at the time it moved into the CMS.
import { defineDocument, seoSection } from "../../fields";
import { centeredBlock, faqBlock, featureRowBlock, heroBlock, introBlock, photoBandBlock, securityBlock, testimonialsBlock, workflowBlock } from "../../blocks/industry";

export const aiAutomationPage = defineDocument({
  key: "ai-automation",
  label: "AI Automation",
  kind: "page",
  route: "/ai-automation",
  sections: [
    heroBlock({
      "title": "The repetitive work behind every deal, case, and claim handled automatically",
      "subtitle": "Mayray AI turns incoming requests into structured records, tracks every deadline that follows, and drafts the follow-up so your team spends time on the work only a person can do.",
      "primaryCta": {
        "label": "Try now",
        "href": "/contact"
      },
      "secondaryCta": {
        "label": "How it works",
        "href": "#workflow"
      },
      "note": "Works alongside the tools your team already uses.",
      "image": {
        "url": "/ai-automation/hero-flow.jpg",
        "alt": "Incoming requests turned into structured records, tracked to deadline, and followed up automatically",
        "width": 1900,
        "height": 900
      }
    }),
    introBlock({
      "title": "Every industry has the same hidden tax: admin that eats the hours you meant to spend on clients.",
      "body": "Off-the-shelf AI tools can draft an email. They can't tell you a filing deadline just moved, that a new client conflicts with an existing case, or that a renewal is about to lapse. Mayray is built around how the work actually moves in your industry not a project-management template with the words swapped out."
    }),
    photoBandBlock({
      "image": {
        "url": "/ecommerce/pricing-band.jpg",
        "alt": "",
        "width": 2880,
        "height": 1392
      },
      "title": "Not a generic AI wearing your industry's name tag.",
      "body": "Off-the-shelf AI tools can draft an email. They can't tell you a filing deadline just moved, that a new client conflicts with an existing case, or that a renewal is about to lapse. Mayray is built around how the work actually moves in your industry not a project-management template with the words swapped out.",
      "cards": [
        {
          "title": "Industry-specific",
          "body": "logic for every workflow"
        },
        {
          "title": "Real deadlines",
          "body": "extracted from your data"
        },
        {
          "title": "Human-reviewed",
          "body": "before anything is sent"
        }
      ]
    }),
    workflowBlock({
      "title": "Capture it. Track it. Follow up on it",
      "steps": [
        {
          "icon": "Target",
          "title": "Capture",
          "body": "Every inquiry, call, or document becomes a structured record automatically, no matter where it came in."
        },
        {
          "icon": "Zap",
          "title": "Track",
          "body": "Deadlines, approvals, and next steps are extracted and kept current on one shared calendar."
        },
        {
          "icon": "Send",
          "title": "Follow up",
          "body": "Plain-language updates are drafted from real data and sent after a quick human review."
        }
      ],
      "image": {
        "url": "/ai-automation/case-workflow.jpg",
        "alt": "Three-step workflow: capture, track, follow up",
        "width": 1000,
        "height": 900
      }
    }),
    featureRowBlock("featureRow1", "First feature row", {
      "title": "Nothing sits in an inbox waiting to be noticed",
      "body": "Forms, calls, and documents are read, tagged, and filed the moment they arrive as a case, a work order, a lead, or a claim, depending on your business. No one re-types what a client already told you.",
      "checklist": [
        "Reads forms, call transcripts, and documents on arrival",
        "Tags and files each one against the right record",
        "Nobody re-types what a client already told you"
      ],
      "mediaKind": "image",
      "image": {
        "url": "/ai-automation/intake.jpg",
        "alt": "Incoming forms, calls, and documents filed automatically",
        "width": 1140,
        "height": 900
      }
    }),
    featureRowBlock("featureRow2", "Second feature row", {
      "title": "No date lives in just one person's head",
      "body": "Filing dates, renewal dates, delivery dates, approval steps extracted automatically and synced to a shared view. If something shifts, everything downstream shifts with it.",
      "checklist": [
        "Deadlines extracted from calls and documents automatically",
        "One shared view across every open item",
        "Downstream steps move when a date shifts"
      ],
      "mediaKind": "image",
      "image": {
        "url": "/ai-automation/deadlines.jpg",
        "alt": "Shared calendar view of filing, renewal, and delivery dates",
        "width": 1140,
        "height": 900
      }
    }),
    centeredBlock({
      "title": "Every update, written before anyone has to ask for it",
      "body": "Status updates, confirmations, and reminders are drafted in plain language from your real data. A person reviews and sends Mayray never contacts a client without a human in the loop.",
      "image": {
        "url": "/ai-automation/updates.jpg",
        "alt": "Drafted project updates and summaries awaiting human review",
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
    securityBlock({
      "title": "Your data handled with the rigor your clients expect",
      "subtitle": "Connect with your favorite tools and platforms. Mayray integrates with 100+ business applications.",
      "items": [
        {
          "icon": "Lock",
          "title": "Encrypted in transit and at rest"
        },
        {
          "icon": "Eye",
          "title": "Role-based access on every record"
        },
        {
          "icon": "Database",
          "title": "Full audit trail on every action Mayray takes"
        },
        {
          "icon": "ShieldCheck",
          "title": "No client data used to train shared models"
        }
      ],
      "pills": [
        "SOC 2 Type II — In Progress",
        "GDPR-ready",
        "Zero-retention options"
      ]
    }),
    faqBlock({
      "title": "Frequently Asked Questions",
      "items": [
        {
          "question": "What kinds of work can Mayray automate?",
          "answer": "The repetitive middle of a process: reading an incoming request, turning it into a structured record, tracking the deadlines that follow, and drafting the update that goes back out. What that record is called differs by industry, but the shape of the work does not."
        },
        {
          "question": "How is this different from a generic AI assistant?",
          "answer": "A generic tool can draft an email. It cannot tell you a filing deadline moved, that a new client conflicts with an existing matter, or that a renewal is about to lapse. Mayray is built around how the work actually moves rather than a project-management template with the words swapped out."
        },
        {
          "question": "Does anything reach a client without review?",
          "answer": "No. Status updates, confirmations, and reminders are drafted for a person to review and send. There is always a human in the loop before a client hears from Mayray."
        },
        {
          "question": "Will it work with the systems we already run?",
          "answer": "Yes. Mayray runs alongside your existing CRM, calendar, and document tools, reading from them and writing records, deadlines, and updates back into them, so there is no migration."
        },
        {
          "question": "How long does it take to get started?",
          "answer": "Most teams begin with a single high-volume workflow and have it running in weeks rather than months, then extend to adjacent processes once the first one is proven."
        }
      ]
    }),
    seoSection({"title":"AI Automation for Business | Mayray AI","description":"Automate repetitive tasks with autonomous AI agents. Connect your CRM, calendar, and telephony stack for 24/7 intelligent workflow automation."}),
  ],
});
