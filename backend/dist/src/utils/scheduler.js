"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startScheduler = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const prisma_1 = __importDefault(require("../config/prisma"));
const startScheduler = () => {
    node_cron_1.default.schedule("* * * * *", async () => {
        try {
            const now = new Date();
            const result = await prisma_1.default.blog.updateMany({
                where: { status: "scheduled", scheduledAt: { lte: now } },
                data: { status: "published", publishedAt: now },
            });
            if (result.count > 0) {
                console.log(`[scheduler] Published ${result.count} scheduled post(s)`);
            }
        }
        catch (err) {
            console.error("[scheduler] Error publishing scheduled posts:", err);
        }
    });
    console.log("[scheduler] Started — checking for scheduled posts every minute");
};
exports.startScheduler = startScheduler;
//# sourceMappingURL=scheduler.js.map