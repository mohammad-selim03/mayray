// Defaults are the page's live copy at the time it moved into the CMS.
import { defineDocument, seoSection } from "../../fields";
import { centeredBlock, faqBlock, featureRowBlock, heroBlock, painPointsBlock, photoBandBlock, securityBlock, testimonialsBlock, workflowBlock } from "../../blocks/industry";

export const ecommercePage = defineDocument({
  key: "ecommerce",
  label: "E-commerce",
  kind: "page",
  route: "/ecommerce",
  sections: [
    heroBlock({
      "title": "Every \"where's my order\" ticket, answered before your team even sees it.",
      "subtitle": "Mayray AI reads support tickets, pulls the real order status, and drafts the response automatically so your team handles the exceptions that actually need a person, not the same five questions on repeat.",
      "primaryCta": {
        "label": "Try now",
        "href": "/contact"
      },
      "secondaryCta": {
        "label": "How it works",
        "href": "#workflow"
      },
      "note": "Works alongside your existing helpdesk and store platform.",
      "image": {
        "url": "/ecommerce/hero-chat.jpg",
        "alt": "A customer asking where their order is and receiving an automatic, verified delivery update",
        "width": 1900,
        "height": 900
      }
    }),
    painPointsBlock({
      "title": "Ninety percent of your tickets are the same three questions",
      "subtitle": "Every minute spent answering \"where's my order\" is a minute not spent on the customer who actually needs a human.",
      "items": [
        {
          "icon": "Inbox",
          "title": "Ticket pileup",
          "body": "Support volume spikes during a sale and response time doubles overnight."
        },
        {
          "icon": "Shuffle",
          "title": "Inconsistent logging",
          "body": "One agent offers a refund, another offers a replacement, for the same kind of issue."
        },
        {
          "icon": "Search",
          "title": "Manual lookups",
          "body": "Every ticket starts with an agent digging through three systems just to find the order."
        }
      ]
    }),
    photoBandBlock({
      "image": {
        "url": "/ecommerce/pricing-band.jpg",
        "alt": "",
        "width": 2880,
        "height": 1392
      },
      "title": "Pricing that doesn't punish you for having a good sales day.",
      "body": "Off-the-shelf AI tools can draft an email. They can't tell you an order was already refunded, that a customer has contacted you three times this week, or that a shipment is stuck in transit. Mayray is built around how support actually moves in ecommerce not a project-management template with the words swapped out.",
      "cards": [
        {
          "title": "Flat pricing",
          "body": "no per-ticket penalty at peak volume"
        },
        {
          "title": "Verified first",
          "body": "every resolution checked against real data"
        },
        {
          "title": "Policy-bound",
          "body": "no rogue refunds outside your rules"
        }
      ]
    }),
    workflowBlock({
      "title": "A support ticket, handled in four steps",
      "steps": [
        {
          "icon": "Target",
          "title": "Capture",
          "body": "Tickets from email, chat, or social are logged and matched to the right order automatically."
        },
        {
          "icon": "Search",
          "title": "Diagnose",
          "body": "Order status, shipping data, and past history are pulled together in seconds no manual lookup."
        },
        {
          "icon": "Zap",
          "title": "Resolve",
          "body": "Standard cases get a drafted resolution checked against your policy rules before it goes out."
        },
        {
          "icon": "ArrowUpRight",
          "title": "Escalate",
          "body": "Anything outside policy, or a frustrated customer, routes straight to a person with full context attached."
        }
      ],
      "image": {
        "url": "/ecommerce/ticket-workflow.jpg",
        "alt": "Four-step support workflow: capture, diagnose, resolve, escalate",
        "width": 1000,
        "height": 900
      }
    }),
    featureRowBlock("featureRow1", "First feature row", {
      "title": "Stop starting every ticket with a manual lookup",
      "body": "Every ticket is matched to the right order automatically, pulling shipping status, order history, and prior contact so an agent never opens three tabs to answer one question.",
      "checklist": [
        "Auto-matches tickets to orders, even from an unfamiliar email or handle",
        "Pulls shipping, payment, and return status into one view",
        "Flags repeat contacts and prior unresolved issues"
      ],
      "mediaKind": "color",
      "panelColor": "#e9f9f9"
    }),
    featureRowBlock("featureRow2", "Second feature row", {
      "title": "The same issue gets the same answer, every time",
      "body": "Refunds, replacements, and delay responses are drafted against your actual return and shipping policies consistently, whether it's a Tuesday morning or the middle of a flash sale.",
      "checklist": [
        "Resolutions drafted against your policy rules, not agent guesswork",
        "Consistent outcomes across your whole support team",
        "Clear escalation the moment a case falls outside standard policy"
      ],
      "mediaKind": "color",
      "panelColor": "#f5f5f5"
    }),
    centeredBlock({
      "title": "Customers get an answer in minutes, not a queue position",
      "body": "Mayray drafts responses in plain language using real order data not a canned template. An agent reviews and sends with one click, so customers stop waiting in a queue for an answer your system already had.",
      "image": {
        "url": "/ecommerce/fast-answers.jpg",
        "alt": "A customer receiving a fast, accurate response about their order",
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
      "title": "Customer and order data handled with the rigor your customers expect.",
      "subtitle": "",
      "items": [
        {
          "icon": "Lock",
          "title": "Encrypted in transit and at rest"
        },
        {
          "icon": "Eye",
          "title": "Role-based access agents see only what they need"
        },
        {
          "icon": "Database",
          "title": "Full audit trail on every resolution and refund decision"
        },
        {
          "icon": "ShieldCheck",
          "title": "No customer data used to train shared models"
        }
      ],
      "pills": []
    }),
    faqBlock({
      "title": "Frequently Asked Questions",
      "items": [
        {
          "question": "Which support channels can Mayray cover?",
          "answer": "Tickets arriving by email, live chat, contact form, or social DM are captured into one queue and matched to the right order, so your team works from a single view instead of four inboxes."
        },
        {
          "question": "How does it know which order a ticket belongs to?",
          "answer": "Mayray matches on order number where one is given, and otherwise on email, name, and purchase history, so it still finds the order when a customer writes in from an unfamiliar address or handle."
        },
        {
          "question": "Can it issue refunds on its own?",
          "answer": "Only inside the rules you set. Refunds, replacements, and goodwill credits are drafted against your actual return and shipping policy, and anything outside those limits is escalated to a person instead."
        },
        {
          "question": "Does it work with our helpdesk and store platform?",
          "answer": "Yes. Mayray runs alongside the helpdesk and storefront you already use, reading order and shipping data and writing responses back into the tools your agents work in."
        },
        {
          "question": "What happens during a peak sales period?",
          "answer": "Pricing is flat rather than per ticket, so a spike in volume does not change what you pay. Standard questions are absorbed automatically while your agents stay on the exceptions."
        }
      ]
    }),
    seoSection({"title":"AI for Ecommerce | Automated Customer Support | Mayray AI","description":"Answer \"where's my order\" tickets automatically. Mayray AI matches every ticket to the right order, drafts policy-checked resolutions, and escalates only real exceptions."}),
  ],
});
