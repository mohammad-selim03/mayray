"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMany = exports.getAll = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const DEFAULTS = {
    "hero.headline": "Transform Your Office with AI Automation",
    "hero.highlight": "Your Office",
    "hero.subtitle": "Replace repetitive work with intelligent AI agents that handle emails, workflows, customer support, and operations 24/7.",
    "hero.cta_primary": "Try now",
    "hero.cta_secondary": "How it works",
    "marquee.text": "AI Automation · Workflow Intelligence · 24/7 Operations · Smart Agents · Business Growth · Process Automation · AI Agents · Digital Transformation",
    "navbar.brand": "Mayray AI",
    "footer.cta_headline": "Transform Your Office with AI Automation",
    "footer.cta_subtitle": "Replace repetitive work with intelligent AI agents that handle emails, workflows, customer support, and operations 24/7, across your entire business.",
    "footer.cta_button": "Try now",
};
// Settings change only on admin save, so cache reads in memory to avoid a
// cross-region DB round-trip on every request. Invalidated by updateMany().
const CACHE_TTL = 60000; // 60s
let cache = null;
const getAll = async (_req, res) => {
    try {
        if (cache && cache.expires > Date.now()) {
            res.json({ success: true, settings: cache.data });
            return;
        }
        const rows = await prisma_1.default.siteSetting.findMany();
        const settings = { ...DEFAULTS };
        rows.forEach((r) => { settings[r.key] = r.value; });
        cache = { data: settings, expires: Date.now() + CACHE_TTL };
        res.json({ success: true, settings });
    }
    catch {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.getAll = getAll;
const updateMany = async (req, res) => {
    try {
        const { settings } = req.body;
        await Promise.all(Object.entries(settings).map(([key, value]) => prisma_1.default.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } })));
        cache = null; // invalidate so the next read reflects the change immediately
        res.json({ success: true });
    }
    catch {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.updateMany = updateMany;
//# sourceMappingURL=settingsController.js.map