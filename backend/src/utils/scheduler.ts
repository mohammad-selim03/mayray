import cron from "node-cron";
import prisma from "../config/prisma";

export const startScheduler = (): void => {
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();
      const result = await prisma.blog.updateMany({
        where: { status: "scheduled", scheduledAt: { lte: now } },
        data: { status: "published", publishedAt: now },
      });
      if (result.count > 0) {
        console.log(`[scheduler] Published ${result.count} scheduled post(s)`);
      }
    } catch (err) {
      console.error("[scheduler] Error publishing scheduled posts:", err);
    }
  });
  console.log("[scheduler] Started — checking for scheduled posts every minute");
};
