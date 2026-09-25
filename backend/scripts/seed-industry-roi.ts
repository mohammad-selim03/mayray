import prisma from "../src/config/prisma";

const industryROIData = [
  {
    industry: "Car",
    cvr: "400%",
    showUp: "20-40%",
    image: "/assets/car.png",
    useCases: ["Lead Qualification", "Support", "Appointment Confirmation"],
    isActive: true,
    order: 0,
  },
  {
    industry: "Real estate",
    cvr: "250%",
    showUp: "15-30%",
    image: "/assets/car.png",
    useCases: ["Property Inquiry", "Tour Scheduling", "Agent Follow-up"],
    isActive: true,
    order: 1,
  },
  {
    industry: "Legal",
    cvr: "180%",
    showUp: "40-60%",
    image: "/assets/car.png",
    useCases: ["Case Intake", "Conflict Checks", "Client Onboarding"],
    isActive: true,
    order: 2,
  },
  {
    industry: "Insurance",
    cvr: "320%",
    showUp: "25-45%",
    image: "/assets/car.png",
    useCases: ["Claims Processing", "Quote Generation", "Renewal Reminders"],
    isActive: true,
    order: 3,
  },
];

async function seedIndustryROI() {
  try {
    console.log("Seeding IndustryROI data...");

    for (const data of industryROIData) {
      const existing = await prisma.industryROI.findUnique({
        where: { industry: data.industry },
      });

      if (!existing) {
        await prisma.industryROI.create({ data });
        console.log(`✓ Created IndustryROI for ${data.industry}`);
      } else {
        console.log(`✓ ${data.industry} already exists`);
      }
    }

    console.log("IndustryROI seeding complete!");
  } catch (error) {
    console.error("Error seeding IndustryROI:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedIndustryROI();
