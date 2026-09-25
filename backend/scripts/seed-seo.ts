import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seoData = [
  { page: "home", section: "seo", key: "title", value: "Mayray AI — Autonomous AI Agents for Business Automation" },
  { page: "home", section: "seo", key: "description", value: "Deploy autonomous AI agents that handle calls, emails, and workflows 24/7. Sub-300ms voice AI, CRM integration, and enterprise-grade automation." },
  { page: "home", section: "seo", key: "keywords", value: "AI automation, voice AI, business automation, AI agents, CRM integration" },
  { page: "blog", section: "seo", key: "title", value: "Blog | AI Automation Insights & Guides | Mayray AI" },
  { page: "blog", section: "seo", key: "description", value: "Discover actionable strategies, technical breakdowns, and industry case studies on scaling business operations with autonomous AI agents." },
  { page: "blog", section: "seo", key: "keywords", value: "AI blog, automation guides, business AI insights" },
  { page: "blog_detail", section: "seo", key: "title", value: "Blog Post | Mayray AI" },
  { page: "blog_detail", section: "seo", key: "description", value: "Read this article from Mayray AI." },
  { page: "not_found", section: "seo", key: "title", value: "Page Not Found | Mayray AI" },
  { page: "not_found", section: "seo", key: "description", value: "The page you are looking for does not exist or has been moved." },
];

async function main() {
  for (const item of seoData) {
    await prisma.pageContent.upsert({
      where: { page_section_key: { page: item.page, section: item.section, key: item.key } },
      update: { value: item.value },
      create: item,
    });
    console.log(`✓ ${item.page}/${item.section}/${item.key}`);
  }
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
