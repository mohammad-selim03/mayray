"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.unsubscribe = exports.subscribe = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const subscribe = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ success: false, message: "Email required" });
            return;
        }
        const existing = await prisma_1.default.newsletter.findUnique({ where: { email: email.toLowerCase() } });
        if (existing) {
            if (existing.isActive) {
                res.json({ success: true, message: "Already subscribed" });
                return;
            }
            const sub = await prisma_1.default.newsletter.update({
                where: { email: email.toLowerCase() },
                data: { isActive: true, unsubscribedAt: null },
            });
            res.json({ success: true, message: "Re-subscribed", subscriptionId: sub.id });
            return;
        }
        const sub = await prisma_1.default.newsletter.create({ data: { email: email.toLowerCase() } });
        res.status(201).json({ success: true, subscriptionId: sub.id });
    }
    catch (err) {
        next(err);
    }
};
exports.subscribe = subscribe;
const unsubscribe = async (req, res, next) => {
    try {
        const email = req.body.email?.toLowerCase();
        const sub = await prisma_1.default.newsletter.findUnique({ where: { email } });
        if (!sub) {
            res.status(404).json({ success: false, message: "Not subscribed" });
            return;
        }
        await prisma_1.default.newsletter.update({ where: { email }, data: { isActive: false, unsubscribedAt: new Date() } });
        res.json({ success: true, message: "Unsubscribed" });
    }
    catch (err) {
        next(err);
    }
};
exports.unsubscribe = unsubscribe;
const getAll = async (req, res, next) => {
    try {
        const { active, page = "1", limit = "30" } = req.query;
        const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
        const where = active !== undefined ? { isActive: active === "true" } : {};
        const [total, items] = await prisma_1.default.$transaction([
            prisma_1.default.newsletter.count({ where }),
            prisma_1.default.newsletter.findMany({ where, orderBy: { subscribedAt: "desc" }, skip, take: parseInt(limit, 10) }),
        ]);
        res.json({ success: true, total, items });
    }
    catch (err) {
        next(err);
    }
};
exports.getAll = getAll;
//# sourceMappingURL=newsletterController.js.map