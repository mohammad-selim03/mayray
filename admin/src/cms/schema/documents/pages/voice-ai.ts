// GENERATED FILE: edit frontend/lib/cms and run `pnpm cms:sync`.

// Defaults are the page's live copy at the time it moved into the CMS.
import { defineDocument, seoSection } from "../../fields";
import { centeredBlock, faqBlock, featureRowBlock, heroBlock, painPointsBlock, securityBlock, testimonialsBlock, workflowBlock } from "../../blocks/industry";

export const voiceAiPage = defineDocument({
  key: "voice-ai",
  label: "Voice AI",
  kind: "page",
  route: "/voice-ai",
  sections: [
    heroBlock({
      "title": "Every call answered, understood, and filed without anyone reaching for a notepad.",
      "subtitle": "Mayray listens to your calls, pulls out what matters, and turns it into a structured record automatically so nothing depends on what an agent remembers to write down afterward.",
      "primaryCta": {
        "label": "Try now",
        "href": "/contact"
      },
      "secondaryCta": {
        "label": "How it works",
        "href": "#workflow"
      },
      "note": "Works with your existing phone system no new number to give out.",
      "image": {
        "url": "/voice-ai/hero-call.jpg",
        "alt": "A live call being transcribed, summarized, and filed to the right record automatically",
        "width": 1900,
        "height": 900
      }
    }),
    painPointsBlock({
      "title": "Cases don't wait for someone to catch up on email.",
      "subtitle": "Every hour a case sits in an inbox is an hour a competitor firm is already on the phone with that client.",
      "items": [
        {
          "icon": "PhoneOff",
          "title": "Lost detail",
          "body": "An agent promises to follow up by Friday. It's only in their memory."
        },
        {
          "icon": "MessageSquareOff",
          "title": "Inconsistent logging",
          "body": "One agent writes detailed notes. Another writes \"client called.\" Same job, different outcomes."
        },
        {
          "icon": "FileSearch",
          "title": "No searchable record",
          "body": "Six months later, no one can find what was actually said on that call."
        }
      ]
    }),
    workflowBlock({
      "title": "A call, handled in four steps",
      "steps": [
        {
          "icon": "Ear",
          "title": "Listen",
          "body": "Mayray joins the call inbound or outbound and transcribes it in real time."
        },
        {
          "icon": "Sparkles",
          "title": "Understand",
          "body": "Key details are pulled out automatically: what was requested, what was promised, what needs to happen next."
        },
        {
          "icon": "FileSearch",
          "title": "File",
          "body": "The summary is attached to the right client or case record, no manual entry."
        },
        {
          "icon": "Send",
          "title": "Act",
          "body": "Follow-ups, deadlines, or approvals triggered by the call are queued automatically, with a human reviewing before anything is sent."
        }
      ],
      "image": {
        "url": "/voice-ai/call-workflow.jpg",
        "alt": "Four-step call workflow: listen, understand, file, act",
        "width": 1000,
        "height": 900
      }
    }),
    featureRowBlock("featureRow1", "First feature row", {
      "title": "Every call, captured accurately not just the parts someone remembered to type",
      "body": "Full transcription happens as the call is in progress. Within moments of hanging up, a clean summary is ready no agent has to spend the next ten minutes writing it up from memory.",
      "checklist": [
        "Real-time transcription, not a delayed batch job",
        "Summaries written in plain language, not raw transcript dumps",
        "Flags anything that sounds like a complaint, a compliance risk, or an urgent request"
      ],
      "mediaKind": "color",
      "panelColor": "#ffffff"
    }),
    featureRowBlock("featureRow2", "Second feature row", {
      "title": "No one has to decide where a call summary belongs.",
      "body": "Calls are matched to the right client, case, or lead automatically and tagged by type sales inquiry, support issue, renewal, complaint. Managers get a clean, searchable record without anyone building it by hand.",
      "checklist": [
        "Matches calls to existing records automatically, even from unfamiliar numbers",
        "Tags by call type and urgency",
        "Fully searchable call history across the team"
      ],
      "mediaKind": "color",
      "panelColor": "#ffffff"
    }),
    centeredBlock({
      "title": "What gets promised on a call actually happens after it",
      "body": "If a call surfaces a deadline, a commitment, or a next step, Mayray drafts the follow-up an email confirmation, a calendar entry, a task automatically. A person reviews and sends. Nothing client-facing goes out without approval.",
      "image": {
        "url": "/voice-ai/follow-through.jpg",
        "alt": "A commitment made on a call turned into a drafted follow-up awaiting review",
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
      "title": "Call data handled with the same rigor as the conversations themselves.",
      "subtitle": "",
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
          "title": "Call recording consent handled per your local requirements"
        },
        {
          "icon": "ShieldCheck",
          "title": "No client data used to train shared models"
        }
      ],
      "pills": []
    }),
    faqBlock({
      "title": "Frequently Asked Questions",
      "items": [
        {
          "question": "Do we need a new phone number or system?",
          "answer": "No. Mayray works with the phone system you already run, so there is no new number to give out and no change to how your clients reach you."
        },
        {
          "question": "How accurate is the transcription?",
          "answer": "Transcription runs in real time as the call is in progress, and the summary is written in plain language rather than handed over as a raw transcript dump, so it is readable the moment the call ends."
        },
        {
          "question": "How does a call get attached to the right record?",
          "answer": "Calls are matched to the existing client, case, or lead automatically, including calls from numbers that are not already on file, then tagged by type such as sales inquiry, support issue, renewal, or complaint."
        },
        {
          "question": "Does anything get sent to a client automatically?",
          "answer": "No. Follow-ups, calendar entries, and confirmations triggered by a call are queued as drafts. A person reviews and sends, so nothing client-facing goes out without approval."
        },
        {
          "question": "Can managers search past calls?",
          "answer": "Yes. Every call summary is filed against a record and is fully searchable across the team, so a conversation from six months ago is findable without anyone having kept their own notes."
        }
      ]
    }),
    seoSection({"title":"Voice AI Agents | Sub-300ms Human-Like Phone Calls | Mayray AI","description":"Deploy voice AI agents that handle 10,000+ simultaneous calls with sub-300ms latency. Full-duplex turn-taking, natural conversation, and CRM integration."}),
  ],
});
