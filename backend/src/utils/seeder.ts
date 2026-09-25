import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "../config/prisma";

const seed = async (): Promise<void> => {
  console.log("Seeding database...");

  await prisma.user.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.integration.deleteMany();
  await prisma.useCase.deleteMany();
  await prisma.faqItem.deleteMany();
  await prisma.scalingStep.deleteMany();
  await prisma.siteSetting.deleteMany();

  const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD ?? "Admin@123456", 12);
  await prisma.user.create({
    data: {
      name: "Admin",
      email: process.env.ADMIN_EMAIL ?? "admin@mayray.com",
      password: hashed,
      role: "admin",
    },
  });
  console.log("Admin user created");

  await prisma.integration.createMany({
    data: [
      { name: "Gmail", category: "communication", order: 0 },
      { name: "Slack", category: "communication", order: 1 },
      { name: "Salesforce", category: "crm", order: 2 },
      { name: "Google Calendar", category: "productivity", order: 3 },
      { name: "Microsoft Teams", category: "communication", order: 4 },
      { name: "Google Drive", category: "storage", order: 5 },
      { name: "Excel", category: "productivity", order: 6 },
      { name: "Outlook", category: "communication", order: 7 },
      { name: "LinkedIn", category: "other", order: 8 },
      { name: "Sheets", category: "productivity", order: 9 },
      { name: "SAP", category: "other", order: 10 },
      { name: "Word", category: "productivity", order: 11 },
      { name: "Instagram", category: "other", order: 12 },
      { name: "Chrome", category: "productivity", order: 13 },
      { name: "PowerPoint", category: "productivity", order: 14 },
      { name: "Google Keep", category: "productivity", order: 15 },
    ],
  });
  console.log("Integrations seeded");

  await prisma.testimonial.createMany({
    data: [
      { quote: "Mayray AI saved us 20+ hours weekly on repetitive tasks.", name: "Olivia Chen", role: "Operations Manager", rating: 5, order: 0 },
      { quote: "24/7 AI customer support changed everything for our team.", name: "Ethan Brooks", role: "Head of Support", rating: 5, order: 1 },
      { quote: "We scaled without hiring — Mayray made it possible.", name: "Daniel Foster", role: "Founder, Digital Agency", rating: 5, order: 2 },
    ],
  });
  console.log("Testimonials seeded");

  await prisma.useCase.createMany({
    data: [
      { title: "Marketing", description: "Drive faster growth with automated campaigns", category: "marketing", order: 0 },
      { title: "Sales", description: "AI-driven outreach and deal closing", category: "sales", order: 1 },
      { title: "Operations", description: "Smart workflows for teams", category: "operations", order: 2 },
      { title: "Customer Experience", description: "24/7 AI support management", category: "customer_experience", order: 3 },
      { title: "Finance", description: "Automated invoicing and reporting", category: "finance", order: 4 },
      { title: "IT", description: "Infrastructure automation and control", category: "it", order: 5 },
      { title: "People / HR", description: "Hiring to onboarding automation", category: "hr", order: 6 },
      { title: "Workplace Productivity", description: "Automate busy work", category: "productivity", order: 7 },
    ],
  });
  console.log("Use cases seeded");

  await prisma.blog.createMany({
    data: [
      {
        title: "How AI Automation is Transforming Modern Businesses in 2026",
        slug: "how-ai-automation-is-transforming-modern-businesses-2026",
        excerpt: "Discover the top ways AI is reshaping how businesses operate in 2026.",
        content: "<p>AI automation is no longer a luxury — it's a necessity for businesses that want to stay competitive...</p>",
        image: "/blogs/blog1.png",
        status: "published",
        publishedAt: new Date(),
        author: "Mayray AI Team",
        tags: ["AI", "automation", "business"],
      },
      {
        title: "5 Workflows Every Team Should Automate First",
        slug: "5-workflows-every-team-should-automate-first",
        excerpt: "Not sure where to start with automation? These five high-impact workflows deliver the fastest ROI.",
        content: "<p>When teams begin their automation journey, the hardest part is knowing where to start. Based on hundreds of deployments, these five workflows — inbox triage, lead routing, meeting scheduling, invoice processing, and customer follow-ups — consistently deliver the quickest wins...</p>",
        image: "/blogs/blog2.png",
        status: "published",
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        author: "Mayray AI Team",
        tags: ["automation", "workflows", "productivity"],
      },
      {
        title: "AI Agents vs. Traditional Automation: What's the Difference?",
        slug: "ai-agents-vs-traditional-automation",
        excerpt: "Rule-based automation breaks when reality changes. Here's how AI agents adapt, reason, and decide like a human employee.",
        content: "<p>Traditional automation follows rigid if-this-then-that rules and fails the moment something unexpected happens. AI agents, by contrast, understand context, make judgment calls, and learn from feedback — handling the messy edge cases that used to require a person. In this post we break down where each approach fits...</p>",
        image: "/blogs/blog3.png",
        status: "published",
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
        author: "Mayray AI Team",
        tags: ["AI", "agents", "automation"],
      },
    ],
  });
  console.log("Blogs seeded");

  await prisma.faqItem.createMany({
    data: [
      { question: "What exactly does Mayray AI do?", answer: "Mayray AI automates repetitive business tasks using intelligent AI agents that work across your existing tools — handling emails, workflows, customer support, and operations 24/7.", order: 0 },
      { question: "Can Mayray AI really replace human work?", answer: "Mayray AI handles high-volume, repetitive tasks so your team can focus on strategic, creative, and relationship-driven work that requires human judgment.", order: 1 },
      { question: "How is Mayray AI different from typical automation tools?", answer: "Unlike traditional rule-based automation, Mayray AI uses large language models to understand context, make decisions, and adapt — just like a human employee would.", order: 2 },
      { question: "How fast can I launch AI automation in my business?", answer: "Most clients see their first automated workflows live within 1–2 weeks. Our team handles setup, testing, and integration so you can start saving time immediately.", order: 3 },
      { question: "What integrations does Mayray AI support?", answer: "Mayray AI integrates with 16+ popular business tools including Gmail, Slack, Salesforce, Google Calendar, Microsoft Teams, Google Drive, and more.", order: 4 },
    ],
  });
  console.log("FAQ seeded");

  await prisma.scalingStep.createMany({
    data: [
      { step: "01", title: "Free Process Health Check", body: "Our consultants analyze your workflows to find where AI and automation can improve productivity and lower costs.", order: 0, isCard: false },
      { step: "02", title: "Personalized AI & Automation Roadmap", body: "We create a tailored roadmap with AI solutions and projected time and cost savings.", order: 1, isCard: false },
      { step: "03", title: "Implementation & Testing", body: "Our engineers automate your tasks and integrate your systems, ensuring everything works seamlessly.", order: 2, isCard: false },
      { step: "04", title: "Ongoing Support & Optimization", body: "Stay optimized with our support packages — updates, maintenance, and continuous improvements included.", order: 3, isCard: false },
      { step: "—", title: "Expertise That Turns Strategy Into Measurable Results", body: "Backed by experts in business, sales, marketing, and technology, our AI solutions are research-driven and tested to deliver reliable automation you can trust.", order: 0, isCard: true },
      { step: "—", title: "Customer Training", body: "We train your team to confidently use AI and automation in daily workflows. Through guided sessions and real-world examples, we ensure smooth adoption, faster onboarding, and long-term success.", order: 1, isCard: true },
    ],
  });
  console.log("Scaling steps seeded");

  await prisma.siteSetting.createMany({
    data: [
      { key: "hero.headline", value: "Transform Your Office with AI Automation" },
      { key: "hero.highlight", value: "Your Office" },
      { key: "hero.subtitle", value: "Replace repetitive work with intelligent AI agents that handle emails, workflows, customer support, and operations 24/7." },
      { key: "hero.cta_primary", value: "Try now" },
      { key: "hero.cta_secondary", value: "How it works" },
      { key: "marquee.text", value: "AI Automation · Workflow Intelligence · 24/7 Operations · Smart Agents · Business Growth · Process Automation · AI Agents · Digital Transformation" },
      { key: "navbar.brand", value: "Mayray AI" },
      { key: "footer.cta_headline", value: "Transform Your Office with AI Automation" },
      { key: "footer.cta_subtitle", value: "Replace repetitive work with intelligent AI agents that handle emails, workflows, customer support, and operations 24/7, across your entire business." },
      { key: "footer.cta_button", value: "Try now" },
    ],
  });
  console.log("Site settings seeded");

  console.log("\nSeeding complete!");
  await prisma.$disconnect();
};

seed().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
