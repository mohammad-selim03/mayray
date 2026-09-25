import prisma from "../src/config/prisma";

async function seedSettings() {
  try {
    console.log("Seeding site settings...");

    // Languages codes
    await prisma.siteSetting.upsert({
      where: { key: "languages.codes" },
      update: {
        value: JSON.stringify([
          "us",
          "de",
          "fr",
          "bg",
          "cu",
          "hr",
          "au",
          "br",
          "bw",
          "bd",
          "tr",
          "az",
          "in",
          "kr",
          "bf",
          "my",
          "se",
          "nl",
          "us",
          "jp",
          "il",
          "fi",
        ]),
      },
      create: {
        key: "languages.codes",
        value: JSON.stringify([
          "us",
          "de",
          "fr",
          "bg",
          "cu",
          "hr",
          "au",
          "br",
          "bw",
          "bd",
          "tr",
          "az",
          "in",
          "kr",
          "bf",
          "my",
          "se",
          "nl",
          "us",
          "jp",
          "il",
          "fi",
        ]),
      },
    });
    console.log("✓ Seeded languages.codes");

    // Ocean section headline
    await prisma.siteSetting.upsert({
      where: { key: "ocean.headline" },
      update: { value: "Made for one, serves thousands" },
      create: { key: "ocean.headline", value: "Made for one, serves thousands" },
    });
    console.log("✓ Seeded ocean.headline");

    // Ocean section description
    await prisma.siteSetting.upsert({
      where: { key: "ocean.description" },
      update: {
        value:
          "Build a process once, and let AI handle it everywhere. Turn manual work into smart workflows. Scale processes without complexity",
      },
      create: {
        key: "ocean.description",
        value:
          "Build a process once, and let AI handle it everywhere. Turn manual work into smart workflows. Scale processes without complexity",
      },
    });
    console.log("✓ Seeded ocean.description");

    // Ocean section avatars
    await prisma.siteSetting.upsert({
      where: { key: "ocean.avatars" },
      update: {
        value: JSON.stringify([
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
        ]),
      },
      create: {
        key: "ocean.avatars",
        value: JSON.stringify([
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
        ]),
      },
    });
    console.log("✓ Seeded ocean.avatars");

    // VoiceAgents section
    const voiceAgentsSettings = [
      {
        key: "voiceagents.headline",
        value: "Next-Gen AI Voice & Workflow Agents for Modern Businesses",
      },
      {
        key: "voiceagents.description",
        value: "From first customer interaction to backend operations, our AI agents handle the work your team should not have to. Automate conversations, decisions, and workflows all in one system.",
      },
      {
        key: "voiceagents.bullets",
        value: JSON.stringify([
          "Understands customer needs instantly.",
          "Human-like conversations across channels.",
          "Completes workflows without manual input.",
        ]),
      },
      { key: "voiceagents.hero_video", value: "/videos/2.mp4" },
      {
        key: "voiceagents.workflow_videos",
        value: JSON.stringify(["/videos/3.mp4", "/videos/4.mp4", "/videos/5.mp4"]),
      },
    ];

    for (const { key, value } of voiceAgentsSettings) {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
      console.log(`✓ Seeded ${key}`);
    }

    // Integrations
    await prisma.siteSetting.upsert({
      where: { key: "integrations.banner_text" },
      update: { value: "The first cloud employee Uses all your apps for you." },
      create: { key: "integrations.banner_text", value: "The first cloud employee Uses all your apps for you." },
    });
    console.log("✓ Seeded integrations.banner_text");

    // VoiceAgents card title
    await prisma.siteSetting.upsert({
      where: { key: "voiceagents.card_title" },
      update: { value: "Detects Intent, Responds Smartly, Executes Tasks" },
      create: { key: "voiceagents.card_title", value: "Detects Intent, Responds Smartly, Executes Tasks" },
    });
    console.log("✓ Seeded voiceagents.card_title");

    // Scaling section
    const scalingSettings = [
      { key: "scaling.headline", value: "AI & Automation for Scaling Businesses" },
      { key: "scaling.description", value: "Everything you need to automate, optimize, and grow without complexity." },
    ];
    for (const { key, value } of scalingSettings) {
      await prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
      console.log(`✓ Seeded ${key}`);
    }

    // AgentAreas section
    const agentAreasSettings = [
      { key: "agentareas.headline", value: "Deliver Beautifully Simple Service with Mayray AI Agents" },
      { key: "agentareas.description", value: "Automate conversations, workflows, and customer experiences with intelligent AI agents that work seamlessly behind the scenes." },
    ];
    for (const { key, value } of agentAreasSettings) {
      await prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
      console.log(`✓ Seeded ${key}`);
    }

    // Testimonials section
    await prisma.siteSetting.upsert({
      where: { key: "testimonials.headline" },
      update: { value: "What Businesses Are Saying" },
      create: { key: "testimonials.headline", value: "What Businesses Are Saying" },
    });
    console.log("✓ Seeded testimonials.headline");

    // FAQ section
    await prisma.siteSetting.upsert({
      where: { key: "faq.headline" },
      update: { value: "Frequently Asked Questions" },
      create: { key: "faq.headline", value: "Frequently Asked Questions" },
    });
    console.log("✓ Seeded faq.headline");

    // Contact section
    const contactSettings = [
      { key: "contact.headline", value: "Get in Touch" },
      { key: "contact.subheadline", value: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible." },
    ];
    for (const { key, value } of contactSettings) {
      await prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
      console.log(`✓ Seeded ${key}`);
    }

    // Footer
    const footerColumnsData = JSON.stringify([
      { title: "Services", links: ["AI Readiness Assessment", "Sales & Marketing Automation", "AI Agents", "Operational Automation", "System & Data Integration", "Secure AI Implementation"] },
      { title: "Pricing", links: ["Pricing Options", "Pricing FAQ"] },
      { title: "Resources", links: ["Blog", "Case Studies", "Support", "Contact"] },
      { title: "Company", links: ["About Us", "Careers", "Privacy Policy", "Terms & Conditions"] },
    ]);
    const footerServiceImages = JSON.stringify(["/footer/service1.png", "/footer/service2.png"]);
    const footerShowcaseLogos = JSON.stringify([
      { name: "monday.com", logo: "/footer/monday.png" },
      { name: "dropbox", logo: "/footer/dropbox.png" },
      { name: "Hubspot", logo: "/footer/hubspot.png" },
      { name: "Twilio", logo: "/footer/twilio.png" },
      { name: "Slack", logo: "/footer/slack.png" },
      { name: "Asana", logo: "/footer/asana.png" },
    ]);
    const footerSettings = [
      { key: "footer.cta_headline", value: "Transform Your Office with AI Automation" },
      { key: "footer.cta_subtitle", value: "Replace repetitive work with AI agents that handle emails, workflows, customer support, and operations 24/7, across your entire business." },
      { key: "footer.cta_button", value: "Try now" },
      { key: "footer.columns", value: footerColumnsData },
      { key: "footer.newsletter_title", value: "Stay in the loop" },
      { key: "footer.newsletter_subtitle", value: "Get AI automation insights and product updates." },
      { key: "footer.service_images", value: footerServiceImages },
      { key: "footer.showcase_logos", value: footerShowcaseLogos },
    ];
    for (const { key, value } of footerSettings) {
      await prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
      console.log(`✓ Seeded ${key}`);
    }

    // IndustryROI section
    await prisma.siteSetting.upsert({
      where: { key: "industryroi.headline" },
      update: { value: "Industry-Specific ROI Insights" },
      create: { key: "industryroi.headline", value: "Industry-Specific ROI Insights" },
    });
    console.log("✓ Seeded industryroi.headline");

    // Blog section
    await prisma.siteSetting.upsert({
      where: { key: "blog.headline" },
      update: { value: "Blog" },
      create: { key: "blog.headline", value: "Blog" },
    });
    console.log("✓ Seeded blog.headline");

    // Languages badge text
    await prisma.siteSetting.upsert({
      where: { key: "languages.badge_text" },
      update: { value: "99+ languages" },
      create: { key: "languages.badge_text", value: "99+ languages" },
    });
    console.log("✓ Seeded languages.badge_text");

    // Marquee text
    await prisma.siteSetting.upsert({
      where: { key: "marquee.text" },
      update: { value: "AI Automation · Workflow Intelligence · 24/7 Operations · Smart Agents · Business Growth · Process Automation · AI Agents · Digital Transformation" },
      create: { key: "marquee.text", value: "AI Automation · Workflow Intelligence · 24/7 Operations · Smart Agents · Business Growth · Process Automation · AI Agents · Digital Transformation" },
    });
    console.log("✓ Seeded marquee.text");

    console.log("Settings seeding complete!");
  } catch (error) {
    console.error("Error seeding settings:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedSettings();
