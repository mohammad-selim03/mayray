"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.reorder = exports.bulkUpsert = exports.upsert = exports.getByPageAdmin = exports.getByPage = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const auditLog_1 = require("../utils/auditLog");
const getByPage = async (req, res, next) => {
    try {
        const { page } = req.params;
        const items = await prisma_1.default.pageContent.findMany({
            where: { page },
            orderBy: { order: "asc" },
        });
        res.json({ success: true, items });
    }
    catch (err) {
        next(err);
    }
};
exports.getByPage = getByPage;
const getByPageAdmin = async (req, res, next) => {
    try {
        const { page } = req.params;
        const items = await prisma_1.default.pageContent.findMany({
            where: { page },
            orderBy: { order: "asc" },
        });
        res.json({ success: true, items });
    }
    catch (err) {
        next(err);
    }
};
exports.getByPageAdmin = getByPageAdmin;
const upsert = async (req, res, next) => {
    try {
        const { page, section, key, value, isActive, order } = req.body;
        if (!page || !section || !key) {
            res.status(400).json({ success: false, message: "page, section, and key are required" });
            return;
        }
        const item = await prisma_1.default.pageContent.upsert({
            where: { page_section_key: { page, section, key } },
            update: { value, isActive, order },
            create: { page, section, key, value, isActive, order: order ?? 0 },
        });
        (0, auditLog_1.logAudit)(req.user.id, "upsert", "page_content", item.id, { page, section, key }, req.ip);
        res.json({ success: true, item });
    }
    catch (err) {
        next(err);
    }
};
exports.upsert = upsert;
const bulkUpsert = async (req, res, next) => {
    try {
        const { items } = req.body;
        if (!Array.isArray(items) || items.length === 0) {
            res.status(400).json({ success: false, message: "items array is required" });
            return;
        }
        const results = await Promise.all(items.map((item) => prisma_1.default.pageContent.upsert({
            where: { page_section_key: { page: item.page, section: item.section, key: item.key } },
            update: { value: item.value, isActive: item.isActive ?? true, order: item.order ?? 0 },
            create: { page: item.page, section: item.section, key: item.key, value: item.value, isActive: item.isActive ?? true, order: item.order ?? 0 },
        })));
        (0, auditLog_1.logAudit)(req.user.id, "bulk_upsert", "page_content", undefined, { count: results.length }, req.ip);
        res.json({ success: true, count: results.length });
    }
    catch (err) {
        next(err);
    }
};
exports.bulkUpsert = bulkUpsert;
const reorder = async (req, res, next) => {
    try {
        const { items } = req.body;
        if (!Array.isArray(items)) {
            res.status(400).json({ success: false, message: "items array is required" });
            return;
        }
        await Promise.all(items.map((item) => prisma_1.default.pageContent.update({
            where: { id: item.id },
            data: { order: item.order },
        })));
        res.json({ success: true });
    }
    catch (err) {
        next(err);
    }
};
exports.reorder = reorder;
const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma_1.default.pageContent.delete({ where: { id } });
        (0, auditLog_1.logAudit)(req.user.id, "delete", "page_content", id, {}, req.ip);
        res.json({ success: true, message: "Item deleted" });
    }
    catch (err) {
        next(err);
    }
};
exports.remove = remove;
//# sourceMappingURL=pageContentController.js.map