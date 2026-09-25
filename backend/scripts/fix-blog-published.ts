import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const blogs = await prisma.blog.findMany({ where: { publishedAt: null } });
  for (const b of blogs) {
    await prisma.blog.update({ where: { id: b.id }, data: { publishedAt: new Date("2026-05-19T00:00:00Z") } });
    console.log("Fixed:", b.slug);
  }
  console.log("Done. Fixed", blogs.length, "blogs");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
