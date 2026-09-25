import prisma from "../src/config/prisma";

interface SeedItem {
  page: string;
  section: string;
  key: string;
  value: string;
}

const items: SeedItem[] = [
  // ── HOME PAGE ──
  // Hero
  { page: "home", section: "hero", key: "headline", value: "Transform Your Office with AI Automation" },
  { page: "home", section: "hero", key: "highlight", value: "Your Office" },
  { page: "home", section: "hero", key: "subtitle", value: "Replace repetitive work with intelligent AI agents that handle emails, workflows, customer support, and operations 24/7." },
  { page: "home", section: "hero", key: "cta_primary", value: "Try now" },
  { page: "home", section: "hero", key: "cta_secondary", value: "How it works" },

  // Integrations
  { page: "home", section: "integrations", key: "banner_text", value: "The first cloud employee Uses all your apps for you." },

  // Voice Agents
  { page: "home", section: "voice_agents", key: "headline", value: "Next-Gen AI Voice & Workflow Agents for Modern Businesses" },
  { page: "home", section: "voice_agents", key: "description", value: "From first customer interaction to backend operations, our AI agents handle the work your team should not have to. Automate conversations, decisions, and workflows all in one system." },

  // Features A
  { page: "home", section: "features_a", key: "headline", value: "" },
  { page: "home", section: "features_a", key: "subheadline", value: "" },

  // Scaling
  { page: "home", section: "scaling", key: "headline", value: "AI & Automation for Scaling Businesses" },
  { page: "home", section: "scaling", key: "description", value: "Everything you need to automate, optimize, and grow without complexity." },

  // Features A2
  { page: "home", section: "features_a2", key: "headline", value: "" },
  { page: "home", section: "features_a2", key: "subheadline", value: "" },

  // Agent Areas
  { page: "home", section: "agent_areas", key: "headline", value: "Deliver Beautifully Simple Service with Mayray AI Agents" },
  { page: "home", section: "agent_areas", key: "description", value: "Automate conversations, workflows, and customer experiences with intelligent AI agents that work seamlessly behind the scenes." },

  // Ocean
  { page: "home", section: "ocean", key: "headline", value: "Made for one, serves thousands" },
  { page: "home", section: "ocean", key: "description", value: "Build a process once, and let AI handle it everywhere. Turn manual work into smart workflows. Scale processes without complexity" },
  { page: "home", section: "ocean", key: "avatars", value: JSON.stringify([
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
  ]) },

  // Languages
  { page: "home", section: "languages", key: "headline", value: "" },
  { page: "home", section: "languages", key: "badge_text", value: "99+ languages" },
  { page: "home", section: "languages", key: "codes", value: JSON.stringify([
    "us", "de", "fr", "bg", "cu", "hr", "au", "br",
    "bw", "bd", "tr", "az", "in", "kr",
    "bf", "my", "se", "nl", "us", "jp", "il", "fi"
  ]) },

  // Industry ROI
  { page: "home", section: "industry_roi", key: "headline", value: "Industry-Specific ROI Insights" },

  // Testimonials
  { page: "home", section: "testimonials", key: "headline", value: "What Businesses Are Saying" },

  // Marquee
  { page: "home", section: "marquee", key: "text", value: "AI Automation · Workflow Intelligence · 24/7 Operations · Smart Agents · Business Growth · Process Automation · AI Agents · Digital Transformation" },

  // FAQ
  { page: "home", section: "faq", key: "headline", value: "Frequently Asked Questions" },

  // Blog
  { page: "home", section: "blog", key: "headline", value: "Blog" },

  // Footer
  { page: "home", section: "footer", key: "cta_headline", value: "" },
  { page: "home", section: "footer", key: "cta_subtitle", value: "" },
  { page: "home", section: "footer", key: "cta_button", value: "" },

  // ── BLOG LIST PAGE ──
  { page: "blog", section: "hero", key: "badge", value: "Mayray AI Knowledge Hub & Insights" },
  { page: "blog", section: "hero", key: "headline", value: "Insights & Guides on AI Automation" },
  { page: "blog", section: "hero", key: "subtitle", value: "Discover actionable strategies, technical breakdowns, and industry case studies on scaling business operations with autonomous AI agents." },
  { page: "blog", section: "hero", key: "search_placeholder", value: "Search articles by keyword, topic, or industry..." },
  { page: "blog", section: "hero", key: "clear_button", value: "Clear" },

  { page: "blog", section: "newsletter", key: "badge", value: "Mayray AI Weekly Dispatch" },
  { page: "blog", section: "newsletter", key: "headline", value: "Stay ahead with practical AI automation breakdowns" },
  { page: "blog", section: "newsletter", key: "subtitle", value: "Join 15,000+ operations leaders, founders, and engineers. Get our weekly newsletter covering autonomous agents, CRM integrations, and ROI benchmarks." },
  { page: "blog", section: "newsletter", key: "placeholder", value: "Enter your work email..." },
  { page: "blog", section: "newsletter", key: "button_label", value: "Subscribe Free" },
  { page: "blog", section: "newsletter", key: "success_message", value: "You're subscribed!" },
  { page: "blog", section: "newsletter", key: "success_detail", value: "Check your inbox for our latest edition and welcome guide." },
  { page: "blog", section: "newsletter", key: "trust_text", value: "No spam guarantee" },

  { page: "blog", section: "grid", key: "heading", value: "All Articles" },
  { page: "blog", section: "grid", key: "subheading", value: "Showing top resources & tutorials" },
  { page: "blog", section: "grid", key: "empty_title", value: "No articles found" },
  { page: "blog", section: "grid", key: "empty_description", value: "Try adjusting your search query or switching selected categories." },

  { page: "blog", section: "featured", key: "label", value: "Featured Article Spotlight" },

  // ── BLOG DETAIL PAGE ──
  { page: "blog_detail", section: "hero", key: "back_label", value: "Back to All Articles" },
  { page: "blog_detail", section: "hero", key: "share_label", value: "Share:" },
  { page: "blog_detail", section: "hero", key: "copy_link_label", value: "Copy Link" },
  { page: "blog_detail", section: "hero", key: "copied_label", value: "Copied!" },

  { page: "blog_detail", section: "author", key: "bio", value: "Specializes in designing autonomous AI agents, sub-300ms voice pipelines, and enterprise CRM workflow integrations for high-growth operations." },

  { page: "blog_detail", section: "related", key: "heading", value: "Related Articles" },
  { page: "blog_detail", section: "related", key: "view_all_label", value: "View All Articles" },
  { page: "blog_detail", section: "related", key: "read_label", value: "Read Article" },

  // ── 404 PAGE ──
  { page: "not_found", section: "not_found", key: "badge", value: "404" },
  { page: "not_found", section: "not_found", key: "title", value: "Page not found" },
  { page: "not_found", section: "not_found", key: "description", value: "The page you're looking for doesn't exist or has been moved." },
  { page: "not_found", section: "not_found", key: "button_label", value: "Back to home" },
];

async function seedPageContent() {
  try {
    console.log(`Seeding ${items.length} page content items...`);

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

    console.log(`Successfully seeded ${items.length} page content items.`);
  } catch (error) {
    console.error("Error seeding page content:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedPageContent();
