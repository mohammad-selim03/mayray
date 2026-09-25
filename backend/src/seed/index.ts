// Fills the database with the site's default content: the same data the site falls back to
// (frontend/lib/cms/fixtures, refreshed with `npm run content:snapshot`) and the CMS design defaults.
//
//   npm run seed              Add only what's missing. Existing content is never changed, so it's
//                             safe to run against a live database.
//   npm run seed -- --reset   Put everything back to the defaults: replaces every collection and
//                             publishes the defaults as a new version of each CMS page and block
//                             (earlier versions stay in History). Users and uploaded media are
//                             never touched.
import "dotenv/config";
import "./quiet-prisma";
import bcrypt from "bcryptjs";
import prisma from "../config/prisma";
import { writeDocumentVersion } from "../controllers/cmsController";
import { DOCUMENTS, cacheTag, documentDefaults } from "../cms/schema";
import { BLOG_POSTS } from "../cms/fixtures/blog-posts";
import { FEATURES, INDUSTRY_ROI, INTEGRATIONS, SCALING_STEPS, TESTIMONIALS, USE_CASES } from "../cms/fixtures/collections";
import { revalidateFrontend } from "../utils/revalidate";

const RESET = process.argv.includes("--reset");
const report: [string, string][] = [];

async function seedAdmin() {
  if ((await prisma.user.count({ where: { role: "admin" } })) > 0) {
    report.push(["Admin user", "exists, left alone"]);
    return;
  }
  const { ADMIN_EMAIL: email, ADMIN_PASSWORD: password } = process.env;
  if (!email || !password) {
    report.push(["Admin user", "skipped: set ADMIN_EMAIL and ADMIN_PASSWORD in .env"]);
    return;
  }
  await prisma.user.create({ data: { name: "Admin", email, password: await bcrypt.hash(password, 12), role: "admin" } });
  report.push(["Admin user", `created (${email})`]);
}

/** Returns the cache tags of documents that changed, so the site can refresh them. */
async function seedDocuments(): Promise<string[]> {
  const existing = new Set((await prisma.cmsDocument.findMany({ select: { key: true } })).map((d) => d.key));
  const changed: string[] = [];
  let created = 0;
  let reset = 0;
  for (const def of DOCUMENTS) {
    if (existing.has(def.key) && !RESET) continue;
    await writeDocumentVersion(def, documentDefaults(def), null, null);
    changed.push(cacheTag(def.key));
    if (existing.has(def.key)) reset++;
    else created++;
  }
  const kept = DOCUMENTS.length - created - reset;
  report.push([
    "CMS pages & blocks",
    [created && `${created} created`, reset && `${reset} reset to defaults (new version)`, kept && `${kept} already published, left alone`].filter(Boolean).join(", "),
  ]);
  return changed;
}

/** Fills a collection when it's empty; with --reset, replaces it. */
async function seedCollection(label: string, count: () => Promise<number>, replace: () => Promise<unknown>, size: number) {
  const current = await count();
  if (current > 0 && !RESET) {
    report.push([label, `${current} existing, left alone`]);
    return;
  }
  await replace();
  report.push([label, current > 0 ? `replaced ${current} with ${size} defaults` : `${size} added`]);
}

async function seedCollections() {
  await seedCollection(
    "Integrations",
    () => prisma.integration.count(),
    () => prisma.$transaction([prisma.integration.deleteMany(), prisma.integration.createMany({ data: INTEGRATIONS })]),
    INTEGRATIONS.length
  );
  await seedCollection(
    "Features",
    () => prisma.feature.count(),
    () => prisma.$transaction([prisma.feature.deleteMany(), prisma.feature.createMany({ data: FEATURES })]),
    FEATURES.length
  );
  await seedCollection(
    "Use cases",
    () => prisma.useCase.count(),
    () => prisma.$transaction([prisma.useCase.deleteMany(), prisma.useCase.createMany({ data: USE_CASES })]),
    USE_CASES.length
  );
  await seedCollection(
    "Testimonials",
    () => prisma.testimonial.count(),
    () => prisma.$transaction([prisma.testimonial.deleteMany(), prisma.testimonial.createMany({ data: TESTIMONIALS })]),
    TESTIMONIALS.length
  );
  await seedCollection(
    "Scaling steps",
    () => prisma.scalingStep.count(),
    () => prisma.$transaction([prisma.scalingStep.deleteMany(), prisma.scalingStep.createMany({ data: SCALING_STEPS })]),
    SCALING_STEPS.length
  );
  await seedCollection(
    "Industry ROI",
    () => prisma.industryROI.count(),
    () => prisma.$transaction([prisma.industryROI.deleteMany(), prisma.industryROI.createMany({ data: INDUSTRY_ROI })]),
    INDUSTRY_ROI.length
  );
  await seedCollection(
    "Blog posts",
    () => prisma.blog.count(),
    () =>
      prisma.$transaction([
        prisma.blog.deleteMany(),
        prisma.blog.createMany({
          data: BLOG_POSTS.map((p) => ({
            ...p,
            publishedAt: p.publishedAt ? new Date(p.publishedAt) : null,
            createdAt: new Date(p.createdAt),
          })),
        }),
      ]),
    BLOG_POSTS.length
  );
}

async function main() {
  console.log(RESET ? "Seeding: resetting all content to the defaults...\n" : "Seeding: adding anything that's missing...\n");
  await seedAdmin();
  const changedTags = await seedDocuments();
  await seedCollections();

  const width = Math.max(...report.map(([label]) => label.length));
  for (const [label, result] of report) console.log(`  ${label.padEnd(width)}  ${result}`);

  if (changedTags.length > 0) {
    if (!process.env.FRONTEND_URL || !process.env.REVALIDATE_SECRET) {
      console.log("\nFRONTEND_URL or REVALIDATE_SECRET isn't set, so the site wasn't asked to refresh; it shows the new content within 5 minutes.");
    } else if (await revalidateFrontend(changedTags)) {
      console.log("\nThe site was told to refresh.");
    } else {
      console.log("\nThe site didn't answer (is it running?); it shows the new content within 5 minutes.");
    }
  }
  console.log("\nDone.");
}

main()
  .catch((err) => {
    console.error("\nSeed failed:", err.message ?? err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
