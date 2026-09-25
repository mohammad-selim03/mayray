import prisma from "../src/config/prisma";
import { FeatureGroup } from "@prisma/client";

const featuresData = [
  // Group A
  {
    title: "AI Office Automation",
    description:
      "Automate repetitive tasks across your business from data entry to internal workflows so your team can focus on high-impact work.",
    videoUrl: "/features-svg/6.mp4",
    thumbnail: null,
    apps: ["Excel", "Word", "Google Keep"],
    group: FeatureGroup.A,
    isActive: true,
    order: 0,
  },
  {
    title: "Email & Communication Management",
    description:
      "AI handles inbox sorting, replies, follow-ups, and internal communication reducing overload and response time.",
    videoUrl: "/features-svg/7.mp4",
    thumbnail: null,
    apps: ["Gmail", "Outlook", "Microsoft Teams"],
    group: FeatureGroup.A,
    isActive: true,
    order: 1,
  },
  {
    title: "AI-Powered Customer Support",
    description:
      "Provide instant, intelligent responses to customers 24/7 without increasing support costs.",
    videoUrl: "/features-svg/8.mp4",
    thumbnail: null,
    apps: ["Salesforce", "LinkedIn", "Chrome"],
    group: FeatureGroup.A,
    isActive: true,
    order: 2,
  },

  // Group A2
  {
    title: "AI Office Automation",
    description:
      "Automate repetitive tasks across your business from data entry to internal workflows so your team can focus on high-impact work.",
    videoUrl: "/features-svg/6.mp4",
    thumbnail: null,
    apps: ["Word", "Keep", "X", "Chrome", "LinkedIn", "Instagram"],
    group: FeatureGroup.A2,
    isActive: true,
    order: 0,
  },
  {
    title: "Email & Communication Management",
    description:
      "AI handles inbox sorting, replies, follow-ups, and internal communication reducing overload and response time.",
    videoUrl: "/features-svg/7.mp4",
    thumbnail: null,
    apps: ["Gmail", "Slack", "Teams"],
    group: FeatureGroup.A2,
    isActive: true,
    order: 1,
  },

  // Group B
  {
    title: "AI-Powered HR Automation",
    description:
      "Automate hiring workflows, onboarding, and employee management processes with intelligent AI agents.",
    videoUrl: null,
    thumbnail: "/blogbg.png",
    apps: [],
    group: FeatureGroup.B,
    isActive: true,
    order: 0,
  },
  {
    title: "AI Automation for E-commerce",
    description:
      "From order handling to customer queries automate your entire sales and fulfillment workflow.",
    videoUrl: null,
    thumbnail: "/bgg.png",
    apps: [],
    group: FeatureGroup.B,
    isActive: true,
    order: 1,
  },
];

async function seedFeatures() {
  try {
    console.log("Seeding features...");

    for (const data of featuresData) {
      const existing = await prisma.feature.findFirst({
        where: { title: data.title, group: data.group },
      });

      if (!existing) {
        await prisma.feature.create({ data: data as any });
        console.log(`✓ Created [${data.group}] ${data.title}`);
      } else {
        console.log(`- Already exists [${data.group}] ${data.title}`);
      }
    }

    console.log("Features seeding complete!");
  } catch (error) {
    console.error("Error seeding features:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedFeatures();
