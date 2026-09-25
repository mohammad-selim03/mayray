import prisma from "../src/config/prisma";

interface SeedItem {
  page: string;
  section: string;
  key: string;
  value: string;
}

const items: SeedItem[] = [
  // ══════════════════════════════════════════════
  // AI AUTOMATION PAGE
  // ══════════════════════════════════════════════

  // Hero
  { page: "ai-automation", section: "hero", key: "headline", value: "The repetitive work behind every deal, case, and claim handled automatically" },
  { page: "ai-automation", section: "hero", key: "subheadline", value: "Mayray AI turns incoming requests into structured records, tracks every deadline that follows, and drafts the follow-up so your team spends time on the work only a person can do." },
  { page: "ai-automation", section: "hero", key: "cta_primary", value: "Try now" },
  { page: "ai-automation", section: "hero", key: "cta_secondary", value: "How it works" },
  { page: "ai-automation", section: "hero", key: "image", value: "/ai-automation/automation-hero.png" },

  // Brand Logos
  { page: "ai-automation", section: "brands", key: "headline", value: "Trusted by leading business teams" },
  { page: "ai-automation", section: "brands", key: "items", value: JSON.stringify(["Adobe", "afterpay", "airbnb", "Airwallex", "Airtable", "Airtasker", "amazon"]) },

  // Problem
  { page: "ai-automation", section: "problem", key: "headline", value: "Every industry has the same hidden tax: admin that eats the hours you meant to spend on clients." },
  { page: "ai-automation", section: "problem", key: "description", value: "Off-the-shelf AI tools can draft an email. They can't tell you a filing deadline just moved, a client's intake form is incomplete, or a referral came in from a partner who expects a call today." },

  // Industry Background
  { page: "ai-automation", section: "industry", key: "headline", value: "Not a generic AI wearing your industry's name tag." },
  { page: "ai-automation", section: "industry", key: "description", value: "Off-the-shelf AI tools can draft an email. They can't tell you a filing deadline just moved, a client's intake form is incomplete, or a referral came in from a partner who expects a call today." },
  { page: "ai-automation", section: "industry", key: "features", value: JSON.stringify([
    { title: "Industry-specific", subtitle: "logic for every workflow" },
    { title: "Real deadlines", subtitle: "extracted from your data" },
    { title: "Human-reviewed", subtitle: "before anything is sent" }
  ]) },
  { page: "ai-automation", section: "industry", key: "image", value: "/ai-automation/automation-industry-background.png" },

  // Workflow
  { page: "ai-automation", section: "workflow", key: "headline", value: "Capture it. Track it. Follow up on it" },
  { page: "ai-automation", section: "workflow", key: "items", value: JSON.stringify([
    { title: "Capture", body: "Every inquiry, call, and document is read, tagged, and filed the moment it arrives.", icon: "📥" },
    { title: "Track", body: "Filing dates, renewal dates, delivery dates, and approval steps are extracted automatically.", icon: "📅" },
    { title: "Follow up", body: "Status updates, confirmations, and reminders are drafted in plain language from your real data.", icon: "✅" }
  ]) },
  { page: "ai-automation", section: "workflow", key: "image", value: "/ai-automation/automation-workflow.png" },

  // Inbox
  { page: "ai-automation", section: "inbox", key: "headline", value: "Nothing sits in an inbox waiting to be noticed" },
  { page: "ai-automation", section: "inbox", key: "description", value: "Forms, calls, and documents are read, tagged, and filed the moment they arrive. No lead sits unread. No deadline gets missed." },
  { page: "ai-automation", section: "inbox", key: "image", value: "/ai-automation/automation-inbox.png" },

  // Calendar
  { page: "ai-automation", section: "calendar", key: "headline", value: "No date lives in just one person's head" },
  { page: "ai-automation", section: "calendar", key: "description", value: "Filing dates, renewal dates, delivery dates, approval steps are extracted automatically from your documents and synced across your team's calendar." },
  { page: "ai-automation", section: "calendar", key: "image", value: "/ai-automation/automation-calendar.png" },

  // Updates
  { page: "ai-automation", section: "updates", key: "headline", value: "Every update, written before anyone has to ask for it" },
  { page: "ai-automation", section: "updates", key: "description", value: "Status updates, confirmations, and reminders are drafted in plain language from your real data — not templates, not generic messages." },
  { page: "ai-automation", section: "updates", key: "image", value: "/ai-automation/automation-updates.png" },

  // Testimonials
  { page: "ai-automation", section: "testimonials", key: "headline", value: "What Businesses Are Saying" },

  // Security
  { page: "ai-automation", section: "security", key: "headline", value: "Your data handled with the rigor your clients expect" },
  { page: "ai-automation", section: "security", key: "description", value: "Connect with your favorite tools and platforms. Mayray integrates with 100+ business applications." },
  { page: "ai-automation", section: "security", key: "items", value: JSON.stringify([
    { label: "Encrypted in transit", icon: "🔒" },
    { label: "Role-based access", icon: "👥" },
    { label: "Full audit trail", icon: "📋" },
    { label: "No client data training", icon: "🛡️" }
  ]) },
  { page: "ai-automation", section: "security", key: "badges", value: JSON.stringify(["SOC 2 Type II — In Progress", "GDPR-ready", "Zero-retention options"]) },

  // FAQ
  { page: "ai-automation", section: "faq", key: "headline", value: "Frequently Asked Questions" },
  { page: "ai-automation", section: "faq", key: "items", value: JSON.stringify([
    { question: "How does Mayray AI automate repetitive tasks?", answer: "Mayray AI uses intelligent agents that read, tag, and file incoming data automatically. Every inquiry, call, and document is processed in real-time without manual input." },
    { question: "What integrations does Mayray support?", answer: "Mayray integrates with 100+ business applications including CRM systems, calendar tools, email platforms, and industry-specific software." },
    { question: "Is there a human review step?", answer: "Yes. All AI-generated drafts and actions can be configured for human review before anything is sent or executed." },
    { question: "How is my data handled?", answer: "Your data is encrypted in transit and at rest. We offer zero-retention options and never train AI models on your client data." },
    { question: "How long does deployment take?", answer: "Most teams are fully deployed within 2-4 weeks, depending on the complexity of your workflows and integrations." }
  ]) },

  // CTA
  { page: "ai-automation", section: "cta", key: "headline", value: "Turn Repetitive Tasks Into AI Agents" },
  { page: "ai-automation", section: "cta", key: "button_label", value: "Try now free" },
  { page: "ai-automation", section: "cta", key: "image", value: "/ai-automation/automation-cta-art.png" },

  // ══════════════════════════════════════════════
  // LEGAL PAGE
  // ══════════════════════════════════════════════

  // Hero
  { page: "legal", section: "hero", key: "headline", value: "New case in. Drafted, scheduled, followed up. Before the coffee's cold." },
  { page: "legal", section: "hero", key: "subheadline", value: "Mayray AI reads intake forms, drafts client communications, and keeps deadlines on your calendar automatically — so your firm moves faster without hiring more staff." },
  { page: "legal", section: "hero", key: "cta_primary", value: "Try now" },
  { page: "legal", section: "hero", key: "cta_secondary", value: "How it works" },
  { page: "legal", section: "hero", key: "tip", value: "No CRM overhaul. Works with what you already use." },
  { page: "legal", section: "hero", key: "image", value: "/legal/legal-hero-flow.png" },

  // Brand Logos
  { page: "legal", section: "brands", key: "headline", value: "Trusted by leading business teams" },
  { page: "legal", section: "brands", key: "items", value: JSON.stringify(["Adobe", "afterpay", "airbnb", "Airwallex", "Airtable", "Airtasker", "amazon"]) },

  // Pain Points
  { page: "legal", section: "pain_points", key: "headline", value: "Cases don't wait for someone to catch up on email." },
  { page: "legal", section: "pain_points", key: "description", value: "Every hour a case sits in an inbox is an hour a competitor firm is already on the phone with that client." },
  { page: "legal", section: "pain_points", key: "items", value: JSON.stringify([
    { title: "Missed intake", body: "Potential clients call after hours. If no one answers, they call the next firm." },
    { title: "Deadline risk", body: "Statute limitations, filing dates, and hearing schedules slip through the cracks." },
    { title: "Client silence", body: "Clients feel ignored when they don't receive timely updates on their case." }
  ]) },

  // Workflow
  { page: "legal", section: "workflow", key: "headline", value: "A new case, handled in four steps." },
  { page: "legal", section: "workflow", key: "items", value: JSON.stringify([
    { title: "Capture", body: "Every inquiry becomes a structured case record in seconds.", icon: "📥" },
    { title: "Route & Respond", body: "Cases are tagged, conflict-checked, and assigned to the right attorney.", icon: "⚖️" },
    { title: "Track & Convert", body: "Deadlines are extracted, reminders are set, and nothing falls through.", icon: "📅" },
    { title: "Update", body: "Clients receive plain-language status updates automatically.", icon: "✅" }
  ]) },
  { page: "legal", section: "workflow", key: "image", value: "/legal/legal-case-workflow.png" },

  // Intake
  { page: "legal", section: "intake", key: "headline", value: "Stop losing clients to slow intake" },
  { page: "legal", section: "intake", key: "description", value: "Every inquiry web form, phone call transcript, or referral email becomes a structured case record in seconds." },
  { page: "legal", section: "intake", key: "checklist", value: JSON.stringify([
    "Auto-tags case type and urgency",
    "Flags conflicts of interest before assignment",
    "Notifies the right attorney the moment a case is ready to review"
  ]) },

  // Deadline
  { page: "legal", section: "deadline", key: "headline", value: "No deadline lives in just one person's head" },
  { page: "legal", section: "deadline", key: "description", value: "Statute limitations, filing dates, and hearing schedules are extracted from case documents and synced across your team's calendar." },
  { page: "legal", section: "deadline", key: "checklist", value: JSON.stringify([
    "Court-date and filing-deadline extraction from uploaded documents",
    "Automatic reminders to the responsible attorney, not just the team",
    "A single calendar view across every open matter"
  ]) },
  { page: "legal", section: "deadline", key: "image", value: "/legal/legal-deadline-calendar.png" },

  // Client Updates
  { page: "legal", section: "client_updates", key: "headline", value: "Clients feel informed. Attorneys stay billable" },
  { page: "legal", section: "client_updates", key: "description", value: "Mayray drafts case status updates in plain language, using real case data not templates — so clients stay informed and attorneys stay focused on billable work." },
  { page: "legal", section: "client_updates", key: "image", value: "/legal/legal-client-update.png" },

  // Testimonials
  { page: "legal", section: "testimonials", key: "headline", value: "What Businesses Are Saying" },

  // Integrations
  { page: "legal", section: "integrations", key: "headline", value: "Seamless Integrations" },
  { page: "legal", section: "integrations", key: "description", value: "Connect with your favorite tools and platforms. Mayray integrates with 100+ business applications." },
  { page: "legal", section: "integrations", key: "items", value: JSON.stringify([
    { name: "Salesforce", category: "CRM", type: "Bi-directional Lead Sync" },
    { name: "HubSpot", category: "Marketing", type: "Automated Lead Route" },
    { name: "QuickBooks", category: "Accounting", type: "Invoice Auto-Fill" },
    { name: "Microsoft Teams", category: "Communication", type: "Internal Notifications" },
    { name: "Zapier", category: "Automation", type: "Custom Workflow Triggers" },
    { name: "DocuSign", category: "E-Signature", type: "Automated Agreement Issue" },
    { name: "Zoom", category: "Video", type: "Meeting Auto-Schedule" },
    { name: "Mailchimp", category: "Email", type: "Drip Campaign Sync" },
    { name: "Calendly", category: "Scheduling", type: "Consultation Booking" },
    { name: "Slack", category: "Communication", type: "Case Update Alerts" },
    { name: "Google Workspace", category: "Productivity", type: "Calendar & Docs Sync" },
    { name: "Stripe", category: "Payments", type: "Automated Billing" }
  ]) },

  // FAQ
  { page: "legal", section: "faq", key: "headline", value: "Frequently Asked Questions" },
  { page: "legal", section: "faq", key: "items", value: JSON.stringify([
    { question: "How does Mayray handle legal intake?", answer: "Mayray reads intake forms, phone transcripts, and referral emails to create structured case records automatically — tagging case type, urgency, and conflict checks." },
    { question: "What practice management tools does Mayray integrate with?", answer: "Mayray integrates with Clio, MyCase, PracticePanther, and other leading legal practice management platforms." },
    { question: "Is client data secure?", answer: "Yes. All data is encrypted in transit and at rest. We offer HIPAA-compliant pipelines and zero-retention options for sensitive case data." },
    { question: "Can attorneys review before anything is sent?", answer: "Absolutely. All AI-generated drafts and communications can be configured for attorney review before delivery." },
    { question: "How quickly can we deploy?", answer: "Most law firms are fully deployed within 2-4 weeks, depending on the complexity of your intake and case management workflows." }
  ]) },

  // CTA
  { page: "legal", section: "cta", key: "headline", value: "Turn Repetitive Tasks Into AI Agents" },
  { page: "legal", section: "cta", key: "button_label", value: "Try now free" },
  { page: "legal", section: "cta", key: "image", value: "/legal/legal-cta-art.png" },

  // ══════════════════════════════════════════════
  // VOICE AI PAGE
  // ══════════════════════════════════════════════

  // Hero
  { page: "voice-ai", section: "hero", key: "badge", value: "Live AI Voice Technology" },
  { page: "voice-ai", section: "hero", key: "headline", value: "AI Voice Agents That Sound Human, Work 24/7" },
  { page: "voice-ai", section: "hero", key: "subheadline", value: "Deploy intelligent voice agents that handle inbound calls, qualify leads, book appointments, and resolve support issues — all with natural, human-like conversation." },
  { page: "voice-ai", section: "hero", key: "cta_primary", value: "Start Free Trial" },
  { page: "voice-ai", section: "hero", key: "cta_secondary", value: "Book a Demo" },

  // Simulator
  { page: "voice-ai", section: "simulator", key: "badge", value: "Interactive Voice Agent Sandbox" },
  { page: "voice-ai", section: "simulator", key: "headline", value: "Try Mayray Voice Agents in action" },
  { page: "voice-ai", section: "simulator", key: "description", value: "Select a specialized voice agent persona below and test how they handle natural conversations, extract data, and book calendar appointments in real time." },
  { page: "voice-ai", section: "simulator", key: "personas", value: JSON.stringify([
    { id: "alex", name: "Alex — Sales Qualifier", role: "Inbound Lead Response", industry: "Real Estate & Auto", avatar: "👨‍💼", sampleText: "Hi! Thanks for inquiring about 412 Park Avenue. Are you looking to purchase within 30 days, and do you have pre-approval ready?", accent: "US Professional", crmSync: "Follow Up Boss / Salesforce" },
    { id: "sarah", name: "Sarah — Legal Intake", role: "24/7 Client Intake Specialist", industry: "Law Firms & Legal", avatar: "👩‍⚖️", sampleText: "Welcome to Miller Legal Group. I can capture your case details immediately. Were you injured in an accident, or is this a contract review?", accent: "US Neutral", crmSync: "Clio / MyCase" },
    { id: "marcus", name: "Marcus — Service Coordinator", role: "Appointment Booking Agent", industry: "Healthcare & Home Services", avatar: "👨‍⚕️", sampleText: "Hello! I have an opening available this Thursday at 10:00 AM for your annual checkup. Should I lock that slot in for you?", accent: "UK Friendly", crmSync: "Kareo / Epic / Google Cal" }
  ]) },

  // Use Cases
  { page: "voice-ai", section: "use_cases", key: "headline", value: "Built for Every Industry" },

  // Features
  { page: "voice-ai", section: "features", key: "headline", value: "Enterprise Voice AI Features" },

  // Integrations
  { page: "voice-ai", section: "integrations", key: "badge", value: "Telephony & Software Stack" },
  { page: "voice-ai", section: "integrations", key: "headline", value: "Plugs into your existing phone numbers & CRMs" },
  { page: "voice-ai", section: "integrations", key: "description", value: "Connect Mayray Voice AI to your existing Twilio, SIP trunk, or phone provider in under 5 minutes. No porting or phone number change required." },
  { page: "voice-ai", section: "integrations", key: "items", value: JSON.stringify([
    { name: "Twilio", type: "SIP & Programmable Voice", icon: "📞" },
    { name: "Retell AI", type: "Ultra-Fast Voice Engine", icon: "🎙️" },
    { name: "Vapi AI", type: "Voice Pipeline Orchestrator", icon: "⚡" },
    { name: "SIP Trunks / WebRTC", type: "Custom Telephony Infrastructure", icon: "🌐" },
    { name: "Salesforce CRM", type: "Real-time Contact & Deal Sync", icon: "☁️" },
    { name: "Clio", type: "Legal Practice Management", icon: "⚖️" },
    { name: "Follow Up Boss", type: "Real Estate CRM & Lead Routing", icon: "🏠" },
    { name: "HubSpot", type: "Marketing & Sales Automation", icon: "🟧" }
  ]) },
  { page: "voice-ai", section: "integrations", key: "custom_headline", value: "Custom Webhooks & REST APIs" },
  { page: "voice-ai", section: "integrations", key: "custom_description", value: "Trigger custom API calls during live phone calls to verify user balances, query databases, or execute transactions." },
  { page: "voice-ai", section: "integrations", key: "custom_button", value: "Request Custom Integration →" },

  // Security
  { page: "voice-ai", section: "security", key: "badge", value: "Enterprise Privacy & Security" },
  { page: "voice-ai", section: "security", key: "headline", value: "Bank-grade security for every phone conversation" },
  { page: "voice-ai", section: "security", key: "description", value: "Built from the ground up for strict regulatory environments including healthcare, legal, and financial services." },
  { page: "voice-ai", section: "security", key: "items", value: JSON.stringify([
    { title: "SOC 2 Type II Certified", description: "Independently audited data controls for enterprise voice operations and confidential calls." },
    { title: "HIPAA & BAA Voice Pipeline", description: "Compliant voice data processing for medical practices, telehealth, and clinical intake." },
    { title: "Zero Voice Retention Option", description: "Optionally purge audio recordings and transcripts immediately after real-time CRM extraction." },
    { title: "AES-256 & TLS 1.3 Encryption", description: "All WebRTC streams, SIP audio packets, and metadata are encrypted in transit and at rest." }
  ]) },
  { page: "voice-ai", section: "security", key: "verified_label", value: "Verified Compliance" },

  // FAQ
  { page: "voice-ai", section: "faq", key: "headline", value: "Frequently Asked Questions" },

  // CTA
  { page: "voice-ai", section: "cta", key: "headline", value: "Ready to Deploy AI Voice Agents?" },
  { page: "voice-ai", section: "cta", key: "button_label", value: "Start Free Trial" },

  // ══════════════════════════════════════════════
  // REAL ESTATE PAGE
  // ══════════════════════════════════════════════

  // Hero
  { page: "real-estate", section: "hero", key: "badge", value: "AI-Powered Real Estate" },
  { page: "real-estate", section: "hero", key: "headline", value: "Close More Deals with AI That Works 24/7" },
  { page: "real-estate", section: "hero", key: "subheadline", value: "Mayray AI responds to leads in seconds, schedules showings, qualifies buyers, and nurtures dormant contacts — so your agents focus on closing, not chasing." },
  { page: "real-estate", section: "hero", key: "cta_primary", value: "Start Free Trial" },
  { page: "real-estate", section: "hero", key: "cta_secondary", value: "Book a Demo" },

  // Features
  { page: "real-estate", section: "features", key: "headline", value: "Real Estate AI Features" },

  // Workflow Simulator
  { page: "real-estate", section: "workflow", key: "badge", value: "Interactive Real Estate Playground" },
  { page: "real-estate", section: "workflow", key: "headline", value: "See Mayray AI Power Property Sales" },
  { page: "real-estate", section: "workflow", key: "description", value: "Click through the workflow modules below to see how our AI agents automate lead response, showing coordination, and CRM nurturing." },
  { page: "real-estate", section: "workflow", key: "items", value: JSON.stringify([
    {
      id: "inquiry-triage",
      title: "12-Second Property Inquiry Triage",
      shortDesc: "Respond instantly to Zillow, Realtor.com, and website leads.",
      steps: ["Parse inquiry source", "Extract property interest", "Generate personalized response"],
      mockTitle: "Zillow Inquiry Response",
      mockBadge: "Speed to Lead: 12 Seconds",
      mockContent: {
        input: "Incoming Zillow Inquiry",
        inputValue: "Subject: 4-Bed Listing #90421 | Lead: Alex & Emily Rivera",
        output: "Automated AI Response",
        outputValue: ["Sent property brochure + floor plan", "Included HOA fees + 3D tour link", "Offered Saturday showing slot"]
      },
      timeSaved: "3.5 hrs saved / day"
    },
    {
      id: "tour-scheduler",
      title: "Automated Showing Coordinator",
      shortDesc: "Schedule private showings without phone tag.",
      steps: ["Check agent availability", "Lock showing slot", "Send confirmation SMS"],
      mockTitle: "Showing Tour Booking Engine",
      mockBadge: "Status: Tour Locked",
      mockContent: {
        input: "Showing Request",
        inputValue: "Property: 1408 Ocean Drive | Date: Saturday 2:00 PM",
        output: "Automation Execution",
        outputValue: ["Locked showing slot with listing agent", "Activated smart lockbox code", "Sent SMS confirmation to buyer + agent"]
      },
      timeSaved: "Eliminate 5+ phone calls per booking"
    },
    {
      id: "buyer-prequal",
      title: "Buyer & Seller Pre-Qualification",
      shortDesc: "Filter out unqualified tire-kickers.",
      steps: ["Capture buyer data", "Score intent", "Route to best-matched agent"],
      mockTitle: "Conversational Pre-Qualifying",
      mockBadge: "Intent Score: 92/100",
      mockContent: {
        input: "Captured Buyer Data",
        inputValue: "Budget: $950,000 | Down Payment: 20% | Pre-Approved: Wells Fargo",
        output: "CRM Sync & Lead Route",
        outputValue: ["Created buyer profile in CRM", "Matched to 3 neighborhood listings", "Assigned to top luxury agent"]
      },
      timeSaved: "Save 12 hrs / week on cold calls"
    },
    {
      id: "crm-nurture",
      title: "Dormant Lead Re-Engagement",
      shortDesc: "Automatically scan past CRM leads and re-engage dormant buyers.",
      steps: ["Scan dormant leads", "Personalize outreach", "Book re-engagement calls"],
      mockTitle: "Database Reactivation Campaign",
      mockBadge: "Re-engaged: 28 Leads",
      mockContent: {
        input: "Target Segment",
        inputValue: "340 Inactive Leads (Last active: 90 days ago)",
        output: "Campaign Output",
        outputValue: ["Sent personalized SMS to 340 leads", "28 leads replied with interest", "6 showings booked this week"]
      },
      timeSaved: "Unlock $45,000+ in extra commissions"
    }
  ]) },
  { page: "real-estate", section: "workflow", key: "deploy_button", value: "Deploy for Your Brokerage" },

  // ROI Calculator
  { page: "real-estate", section: "roi", key: "badge", value: "Interactive Brokerage ROI Calculator" },
  { page: "real-estate", section: "roi", key: "headline", value: "Calculate Your Commission Revenue Lift" },
  { page: "real-estate", section: "roi", key: "description", value: "Adjust the parameters below to calculate how many extra deals your team can close each year by responding in seconds with Mayray AI." },
  { page: "real-estate", section: "roi", key: "cvr_label", value: "Average CVR Lift" },
  { page: "real-estate", section: "roi", key: "cvr_description", value: "Real estate clients boost lead-to-showing conversion by +250%." },
  { page: "real-estate", section: "roi", key: "agents_label", value: "Active Agents / Team Members" },
  { page: "real-estate", section: "roi", key: "agents_unit", value: "Agents" },
  { page: "real-estate", section: "roi", key: "leads_label", value: "Monthly Leads per Agent" },
  { page: "real-estate", section: "roi", key: "leads_unit", value: "leads / mo" },
  { page: "real-estate", section: "roi", key: "commission_label", value: "Average Commission per Closed Deal ($)" },
  { page: "real-estate", section: "roi", key: "results_deals", value: "Extra Closed Deals / Yr" },
  { page: "real-estate", section: "roi", key: "results_revenue", value: "Added Annual Commission" },
  { page: "real-estate", section: "roi", key: "results_roi", value: "Projected Return on Investment" },
  { page: "real-estate", section: "roi", key: "cta_button", value: "Get Team Proposal" },
  { page: "real-estate", section: "roi", key: "disclaimer", value: "* Projections based on real estate customer conversion benchmarks. Results may vary depending on local market inventory and lead response parameters." },

  // Integrations
  { page: "real-estate", section: "integrations", key: "badge", value: "Real Estate Software Ecosystem" },
  { page: "real-estate", section: "integrations", key: "headline", value: "Plugs Directly Into Your Real Estate CRM & MLS Stack" },
  { page: "real-estate", section: "integrations", key: "description", value: "Zero friction setup. Mayray AI syncs natively with your existing lead channels, showing tools, transaction platforms, and CRM pipelines." },
  { page: "real-estate", section: "integrations", key: "items", value: JSON.stringify([
    { name: "Follow Up Boss", category: "Real Estate CRM", syncType: "Bi-directional Lead Sync" },
    { name: "KvCORE", category: "Brokerage Platform", syncType: "Automated Lead Route" },
    { name: "Zillow Premier Agent", category: "Lead Source", syncType: "Instant 12s Response" },
    { name: "Realtor.com", category: "Lead Source", syncType: "API Webhook Sync" },
    { name: "Salesforce Real Estate", category: "Enterprise CRM", syncType: "Custom Object Sync" },
    { name: "Dotloop", category: "Transaction Management", syncType: "Contract Auto-Fill" },
    { name: "DocuSign", category: "E-Signature", syncType: "Automated Agreement Issue" },
    { name: "Local MLS Feed", category: "Property Database", syncType: "Live Inventory Sync" },
    { name: "WhatsApp & SMS", category: "Client Communication", syncType: "Omnichannel Messaging" }
  ]) },

  // Security
  { page: "real-estate", section: "security", key: "badge", value: "Compliance & Data Protection" },
  { page: "real-estate", section: "security", key: "headline", value: "Built for Fair Housing Compliance & Lead Privacy" },
  { page: "real-estate", section: "security", key: "description", value: "We understand real estate regulation. Mayray AI satisfies Fair Housing Act standards, state real estate commission guidelines, and enterprise data privacy requirements." },
  { page: "real-estate", section: "security", key: "items", value: JSON.stringify([
    { title: "Fair Housing Compliant", description: "Our AI response templates strictly adhere to Equal Housing Opportunity regulations, preventing prohibited steering or demographic discrimination.", tag: "Equal Housing Guardrails" },
    { title: "Zero Data Retention", description: "Your buyer phone numbers, pre-approval letters, and CRM notes remain 100% private. We NEVER train AI models on your brokerage data.", tag: "Isolated Cloud Environment" },
    { title: "Team Lead Protection", description: "Granular role permissions ensure assigned agents only see their own assigned leads, protecting brokerage team lead routing policies.", tag: "Agent Privilege Boundaries" },
    { title: "Audit Trail & TCPA Ready", description: "Full logging of all SMS and email conversations ensures TCPA consent compliance and complete brokerage risk management oversight.", tag: "TCPA Opt-In Management" }
  ]) },
  { page: "real-estate", section: "security", key: "cta_text", value: "Have custom brokerage compliance requirements? Talk to our enterprise real estate compliance specialists." },

  // FAQ
  { page: "real-estate", section: "faq", key: "headline", value: "Frequently Asked Questions" },

  // CTA
  { page: "real-estate", section: "cta", key: "headline", value: "Ready to Close More Deals?" },
  { page: "real-estate", section: "cta", key: "button_label", value: "Start Free Trial" },

  // ══════════════════════════════════════════════
  // HOME PAGE — FeaturesA2 & Navbar
  // ══════════════════════════════════════════════

  // Features A2
  { page: "home", section: "features_a2", key: "stories", value: JSON.stringify([
    { title: "AI-Powered HR Automation", description: "Automate hiring workflows, onboarding, and employee management processes with intelligent AI agents.", video: "/features-svg/6.mp4", apps: ["Gmail", "LinkedIn", "Sheet"] },
    { title: "AI Automation for E-commerce", description: "From order handling to customer queries automate your entire sales and fulfillment workflow.", video: "/features-svg/7.mp4", apps: ["Wordpress", "Stripe", "Ebay", "Amazon", "Woocommerce"] }
  ]) },

  // Navbar
  { page: "home", section: "navbar", key: "links", value: JSON.stringify([
    { label: "Features", href: "#features" },
    { label: "Use Cases", href: "#use-cases" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact Us", href: "#contact" }
  ]) },
];

async function seedDynamicPageContent() {
  try {
    console.log(`Seeding ${items.length} dynamic page content items...`);

    for (const item of items) {
      await prisma.pageContent.upsert({
        where: {
          page_section_key: {
            page: item.page,
            section: item.section,
            key: item.key,
          },
        },
        update: { value: item.value },
        create: {
          page: item.page,
          section: item.section,
          key: item.key,
          value: item.value,
        },
      });
    }

    console.log(`Successfully seeded ${items.length} dynamic page content items.`);
  } catch (error) {
    console.error("Error seeding dynamic page content:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedDynamicPageContent();
