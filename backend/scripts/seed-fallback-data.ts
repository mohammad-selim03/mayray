import prisma from "../src/config/prisma";

async function seedAllFallbackData() {
  try {
    console.log("Starting comprehensive fallback data seed...\n");

    // ── 1. FEATURES (Group A, A2, B) ──
    console.log("Seeding features...");
    const features = [
      // Group A
      { title: "AI Office Automation", description: "Automate repetitive tasks across your business from data entry to internal workflows so your team can focus on high-impact work.", videoUrl: "/features-svg/6.mp4", apps: ["Excel", "Word", "Google Keep"], group: "A" as const, order: 0 },
      { title: "Email & Communication Management", description: "AI handles inbox sorting, replies, follow-ups, and internal communication reducing overload and response time.", videoUrl: "/features-svg/7.mp4", apps: ["Gmail", "Slack", "Microsoft Teams"], group: "A" as const, order: 1 },
      { title: "AI-Powered Customer Support", description: "Provide instant, intelligent responses to customers 24/7 without increasing support costs.", videoUrl: "/features-svg/8.mp4", apps: ["Salesforce", "Whatsapp", "Zendesk"], group: "A" as const, order: 2 },
      // Group A2
      { title: "AI-Powered HR Automation", description: "Automate hiring workflows, onboarding, and employee management processes with intelligent AI agents.", videoUrl: "/features-svg/6.mp4", apps: ["Gmail", "LinkedIn", "Sheet"], group: "A2" as const, order: 0 },
      { title: "AI Automation for E-commerce", description: "From order handling to customer queries automate your entire sales and fulfillment workflow.", videoUrl: "/features-svg/7.mp4", apps: ["Wordpress", "Stripe", "Ebay", "Amazon", "Woocommerce"], group: "A2" as const, order: 1 },
      // Group B
      { title: "AI-Powered HR Automation", description: "Automate hiring workflows, onboarding, and employee management processes with intelligent AI agents.", videoUrl: "/features-svg/6.mp4", apps: ["Gmail", "LinkedIn", "Sheet"], group: "B" as const, order: 0 },
      { title: "AI Automation for E-commerce", description: "From order handling to customer queries automate your entire sales and fulfillment workflow.", videoUrl: "/features-svg/7.mp4", apps: ["Wordpress", "Stripe", "Ebay", "Amazon", "Woocommerce"], group: "B" as const, order: 1 },
    ];

    for (const f of features) {
      const existing = await prisma.feature.findFirst({ where: { title: f.title, group: f.group } });
      if (existing) {
        await prisma.feature.update({ where: { id: existing.id }, data: f });
      } else {
        await prisma.feature.create({ data: f });
      }
    }
    console.log(`  ✓ ${features.length} features seeded`);

    // ── 2. INTEGRATIONS (with logos) ──
    console.log("Seeding integrations...");
    const integrations = [
      { name: "Gmail", logo: "/svg/gmail.svg", description: "Email automation and management", category: "communication" as const, order: 0 },
      { name: "Google Calendar", logo: "/svg/google-calendar 1.svg", description: "Calendar scheduling and event management", category: "productivity" as const, order: 1 },
      { name: "Google Drive", logo: "/svg/google-drive.svg", description: "Cloud file storage and sharing", category: "storage" as const, order: 2 },
      { name: "Google Keep", logo: "/svg/google-keep.svg", description: "Note-taking and task management", category: "productivity" as const, order: 3 },
      { name: "Microsoft Teams", logo: "/svg/microsoft-team-management-business-office 1.svg", description: "Team communication and collaboration", category: "communication" as const, order: 4 },
      { name: "Slack", logo: "/globe.svg", description: "Team messaging and workflow automation", category: "communication" as const, order: 5 },
      { name: "Salesforce", logo: "/svg/saleforce.svg", description: "CRM and sales pipeline management", category: "crm" as const, order: 6 },
      { name: "LinkedIn", logo: "/svg/linkedin.svg", description: "Professional networking and lead generation", category: "other" as const, order: 7 },
      { name: "Excel", logo: "/svg/excel.svg", description: "Spreadsheet data analysis and reporting", category: "productivity" as const, order: 8 },
      { name: "Word", logo: "/svg/ms-word 1.svg", description: "Document creation and management", category: "productivity" as const, order: 9 },
      { name: "PowerPoint", logo: "/svg/microsoft-powerpoint-2013-logo 1.svg", description: "Presentation creation and management", category: "productivity" as const, order: 10 },
      { name: "Outlook", logo: "/svg/ms-outlook 2.svg", description: "Email and calendar management", category: "communication" as const, order: 11 },
      { name: "Chrome", logo: "/svg/chrome.svg", description: "Web browsing and extension automation", category: "other" as const, order: 12 },
      { name: "Instagram", logo: "/svg/instagram.svg", description: "Social media management and marketing", category: "other" as const, order: 13 },
      { name: "SAP", logo: "/svg/sap 1.svg", description: "Enterprise resource planning integration", category: "other" as const, order: 14 },
      { name: "Zendesk", logo: "/svg/zendesk.svg", description: "Customer support ticket management", category: "communication" as const, order: 15 },
      { name: "Whatsapp", logo: "/svg/whatsapp.svg", description: "Messaging and customer communication", category: "communication" as const, order: 16 },
      { name: "Wordpress", logo: "/svg/WordPress.svg", description: "Content management and website automation", category: "other" as const, order: 17 },
      { name: "Stripe", logo: "/svg/Stripe.svg", description: "Payment processing and billing automation", category: "other" as const, order: 18 },
      { name: "Ebay", logo: "/svg/EBay.svg", description: "E-commerce marketplace integration", category: "other" as const, order: 19 },
      { name: "Amazon", logo: "/svg/Amazon.svg", description: "E-commerce marketplace integration", category: "other" as const, order: 20 },
      { name: "Woocommerce", logo: "/svg/WooCommerce.svg", description: "E-commerce store management", category: "other" as const, order: 21 },
      { name: "Sheet", logo: "/globe.svg", description: "Spreadsheet automation", category: "productivity" as const, order: 22 },
      { name: "Sheets", logo: "/globe.svg", description: "Google Sheets automation", category: "productivity" as const, order: 23 },
    ];

    for (const integration of integrations) {
      await prisma.integration.upsert({
        where: { name: integration.name },
        update: { logo: integration.logo, description: integration.description, category: integration.category, order: integration.order },
        create: integration,
      });
    }
    console.log(`  ✓ ${integrations.length} integrations seeded`);

    // ── 3. USE CASES (with icons) ──
    console.log("Seeding use cases...");
    const useCases = [
      { title: "Marketing", description: "Drive faster growth with automated campaigns and lead generation.", icon: "/agentareacard/noun-marketing-8045132 1.svg", category: "marketing" as const, order: 0 },
      { title: "Sales", description: "Level up your sales cycle to close more deals with AI-driven outreach.", icon: "/agentareacard/noun-sales-8011863 1.svg", category: "sales" as const, order: 1 },
      { title: "Operations", description: "Get teams and tools working together seamlessly with smart workflows.", icon: "/agentareacard/noun-it-operations-1909143 1.svg", category: "operations" as const, order: 2 },
      { title: "Customer Experience", description: "Manage time as well as you manage customer relationships with AI support.", icon: "/agentareacard/noun-customer-experience-7440062 1.svg", category: "customer_experience" as const, order: 3 },
      { title: "Finance", description: "Automate invoicing, expense tracking, and financial reporting.", icon: "/agentareacard/noun-finance-7033868 1.svg", category: "finance" as const, order: 4 },
      { title: "Information Technology", description: "Efficiently scale and control your IT infrastructure with AI agents.", icon: "/agentareacard/noun-information-technology-3918785 1.svg", category: "it" as const, order: 5 },
      { title: "People", description: "Get your HR processes running smoothly from hiring to onboarding.", icon: "/agentareacard/noun-it-operations-1909143 1 (1).svg", category: "hr" as const, order: 6 },
      { title: "Workplace Productivity", description: "Automate busy work to focus on what truly matters for your business.", icon: "/agentareacard/noun-customer-experience-7440062 1 (1).svg", category: "productivity" as const, order: 7 },
    ];

    for (const uc of useCases) {
      const existing = await prisma.useCase.findFirst({ where: { title: uc.title } });
      if (existing) {
        await prisma.useCase.update({ where: { id: existing.id }, data: uc });
      } else {
        await prisma.useCase.create({ data: uc });
      }
    }
    console.log(`  ✓ ${useCases.length} use cases seeded`);

    // ── 4. TESTIMONIALS (full quotes) ──
    console.log("Seeding testimonials...");
    const testimonials = [
      { quote: "Mayray AI replaced hours of manual work overnight. Before using Mayray AI, our team was buried in repetitive tasks. Now, workflows run automatically, and we have saved over 20+ hours every week.", name: "Olivia Chen", role: "Operations Manager", company: "SaaS Company", avatar: "/svg/avatar.svg", rating: 5, order: 0 },
      { quote: "It feels like we hired a full support team without the cost. Mayray AI handles customer queries instantly, 24/7. Our response time dropped dramatically, and customer satisfaction has never been higher.", name: "Ethan Brooks", role: "Head of Support", company: "E-commerce Brand", avatar: "/svg/avatar.svg", rating: 5, order: 1 },
      { quote: "We scaled faster without increasing our team size. Mayray AI did not just automate tasks it gave us the ability to grow without operational bottlenecks. The ROI was clear within the first month.", name: "Daniel Foster", role: "Founder", company: "Digital Agency", avatar: "/svg/avatar.svg", rating: 5, order: 2 },
    ];

    for (const t of testimonials) {
      const existing = await prisma.testimonial.findFirst({ where: { name: t.name } });
      if (existing) {
        await prisma.testimonial.update({ where: { id: existing.id }, data: t });
      } else {
        await prisma.testimonial.create({ data: t });
      }
    }
    console.log(`  ✓ ${testimonials.length} testimonials seeded`);

    // ── 5. INDUSTRY ROI ──
    console.log("Seeding industry ROI...");
    const industryROI = [
      { industry: "Car", cvr: "400%", showUp: "20-40%", image: "/assets/car.png", useCases: ["Lead Qualification", "Support", "Appointment Confirmation"], order: 0 },
      { industry: "Real estate", cvr: "250%", showUp: "15-30%", image: "/assets/car.png", useCases: ["Property Inquiry", "Tour Scheduling", "Agent Follow-up"], order: 1 },
      { industry: "Legal", cvr: "180%", showUp: "40-60%", image: "/assets/car.png", useCases: ["Case Intake", "Conflict Checks", "Client Onboarding"], order: 2 },
      { industry: "Insurance", cvr: "320%", showUp: "25-45%", image: "/assets/car.png", useCases: ["Claims Processing", "Quote Generation", "Renewal Reminders"], order: 3 },
    ];

    for (const roi of industryROI) {
      await prisma.industryROI.upsert({
        where: { industry: roi.industry },
        update: { cvr: roi.cvr, showUp: roi.showUp, image: roi.image, useCases: roi.useCases, order: roi.order },
        create: roi,
      });
    }
    console.log(`  ✓ ${industryROI.length} industry ROI items seeded`);

    // ── 6. SCALING STEPS (with icons) ──
    console.log("Seeding scaling steps...");
    const scalingSteps = [
      { step: "01", title: "Free Process Health Check", body: "Our consultants analyze your workflows to find where AI and automation can improve productivity and lower costs.", icon: "https://www.figma.com/api/mcp/asset/2cd39218-01c4-4326-b3e6-dddb303e0753", isCard: false, order: 0 },
      { step: "02", title: "Personalized AI & Automation Roadmap", body: "We create a tailored roadmap with AI solutions and projected time and cost savings.", icon: "https://www.figma.com/api/mcp/asset/acc44786-998a-44d0-afee-c19844dddbcc", isCard: false, order: 1 },
      { step: "03", title: "Implementation & Testing", body: "Our engineers automate your tasks and integrate your systems, ensuring everything works seamlessly.", icon: "https://www.figma.com/api/mcp/asset/354596a6-0045-4732-ba2b-a2fe057b4bea", isCard: false, order: 2 },
      { step: "04", title: "Ongoing Support & Optimization", body: "Stay optimized with our support packages — updates, maintenance, and continuous improvements included.", icon: "https://www.figma.com/api/mcp/asset/488e080c-f512-4539-8979-7bde39d1bc21", isCard: false, order: 3 },
      { step: "—", title: "Expertise That Turns Strategy Into Measurable Results", body: "Backed by experts in business, sales, marketing, and technology, our AI solutions are research-driven and tested to deliver reliable automation you can trust.", icon: "https://www.figma.com/api/mcp/asset/9e5e1c17-58ac-45fd-a323-159aacb4ef36", isCard: true, order: 0 },
      { step: "—", title: "Customer Training", body: "We train your team to confidently use AI and automation in daily workflows. Through guided sessions and real-world examples, we ensure smooth adoption, faster onboarding, and long-term success.", icon: "https://www.figma.com/api/mcp/asset/8b0abcc3-2552-485b-84b1-63e6777cefa5", isCard: true, order: 1 },
    ];

    // Delete existing and re-seed to ensure correct order
    await prisma.scalingStep.deleteMany({});
    await prisma.scalingStep.createMany({ data: scalingSteps });
    console.log(`  ✓ ${scalingSteps.length} scaling steps seeded`);

    // ── 7. FAQ ITEMS ──
    console.log("Seeding FAQ items...");
    const faqItems = [
      { question: "What exactly does Mayray AI do?", answer: "Mayray AI automates repetitive business tasks using intelligent AI agents that work across your existing tools — handling emails, workflows, customer support, and operations 24/7.", order: 0 },
      { question: "Can Mayray AI really replace human work?", answer: "Mayray AI handles high-volume, repetitive tasks so your team can focus on strategic, creative, and relationship-driven work that requires human judgment.", order: 1 },
      { question: "How is Mayray AI different from typical automation tools?", answer: "Unlike traditional rule-based automation, Mayray AI uses large language models to understand context, make decisions, and adapt — just like a human employee would.", order: 2 },
      { question: "How fast can I launch AI automation in my business?", answer: "Most clients see their first automated workflows live within 1–2 weeks. Our team handles setup, testing, and integration so you can start saving time immediately.", order: 3 },
      { question: "What integrations does Mayray AI support?", answer: "Mayray AI integrates with 16+ popular business tools including Gmail, Slack, Salesforce, Google Calendar, Microsoft Teams, Google Drive, and more.", order: 4 },
    ];

    // Delete existing and re-seed
    await prisma.faqItem.deleteMany({});
    await prisma.faqItem.createMany({ data: faqItems });
    console.log(`  ✓ ${faqItems.length} FAQ items seeded`);

    // ── 8. BLOG POSTS ──
    console.log("Seeding blog posts...");
    const blogs = [
      { title: "How AI Automation is Transforming Modern Businesses in 2026", slug: "how-ai-automation-is-transforming-modern-businesses-2026", excerpt: "Businesses today are under constant pressure to move faster, reduce costs, and deliver better customer experiences. AI automation is no longer a luxury — it's a competitive necessity.", content: "Businesses today are under constant pressure to move faster, reduce costs, and deliver better customer experiences. AI automation is no longer a luxury — it's a competitive necessity. In this article, we explore how leading companies are leveraging intelligent AI agents to transform their operations, from customer support to internal workflows.", author: "Mayray AI Team", category: "AI Automation", readTime: "5 min read", image: "/blogs/blog1.png", status: "published" as const, tags: ["AI", "Automation", "Business"], views: 0 },
      { title: "Tasks You Should Automate in Your Business Right Now", slug: "tasks-you-should-automate-in-your-business-right-now", excerpt: "If your team is overwhelmed with repetitive work, you are not alone. The good news? Many of these tasks can be automated instantly with AI agents.", content: "If your team is overwhelmed with repetitive work, you are not alone. The good news? Many of these tasks can be automated instantly with AI agents. From email management to data entry, we break down the top tasks you should automate to save time and boost productivity.", author: "Mayray AI Team", category: "AI Automation", readTime: "4 min read", image: "/blogs/blog2.png", status: "published" as const, tags: ["Automation", "Productivity", "AI"], views: 0 },
      { title: "Why AI Agents Are the Future of Work", slug: "why-ai-agents-are-the-future-of-work", excerpt: "The way we work is changing rapidly. AI agents are emerging as a powerful solution to handle tasks that once required entire teams.", content: "The way we work is changing rapidly. AI agents are emerging as a powerful solution to handle tasks that once required entire teams. In this article, we explore why AI agents represent the next evolution of workplace automation and how they're already transforming industries.", author: "Mayray AI Team", category: "AI Automation", readTime: "6 min read", image: "/blogs/blog3.png", status: "published" as const, tags: ["AI Agents", "Future of Work", "Automation"], views: 0 },
    ];

    for (const blog of blogs) {
      await prisma.blog.upsert({
        where: { slug: blog.slug },
        update: { title: blog.title, excerpt: blog.excerpt, content: blog.content, author: blog.author, category: blog.category, readTime: blog.readTime, image: blog.image, status: blog.status, tags: blog.tags },
        create: blog,
      });
    }
    console.log(`  ✓ ${blogs.length} blog posts seeded`);

    // ── 9. SITE SETTINGS (fix ocean.avatars) ──
    console.log("Seeding site settings (ocean.avatars fix)...");
    await prisma.siteSetting.upsert({
      where: { key: "ocean.avatars" },
      update: {
        value: JSON.stringify([
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
        ]),
      },
      create: {
        key: "ocean.avatars",
        value: JSON.stringify([
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
        ]),
      },
    });
    console.log("  ✓ ocean.avatars fixed (7 avatars)");

    console.log("\n✅ All fallback data seeded successfully!");
  } catch (error) {
    console.error("Error seeding fallback data:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedAllFallbackData();
