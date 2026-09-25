"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorder = exports.remove = exports.update = exports.create = exports.getAll = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getAll = async (_req, res) => {
    try {
        const items = await prisma_1.default.scalingStep.findMany({ orderBy: [{ isCard: "asc" }, { order: "asc" }] });
        res.json({ success: true, items });
    }
    catch {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.getAll = getAll;
const create = async (req, res) => {
    try {
        const { step, title, body, icon, isCard = false, order = 0 } = req.body;
        const item = await prisma_1.default.scalingStep.create({ data: { step, title, body, icon, isCard, order } });
        res.status(201).json({ success: true, item });
    }
    catch {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.create = create;
const update = async (req, res) => {
    try {
        const item = await prisma_1.default.scalingStep.update({ where: { id: req.params.id }, data: req.body });
        res.json({ success: true, item });
    }
    catch {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.update = update;
const remove = async (req, res) => {
    try {
        await prisma_1.default.scalingStep.delete({ where: { id: req.params.id } });
        res.json({ success: true, message: "Deleted" });
    }
    catch {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.remove = remove;
const reorder = async (req, res) => {
    try {
        const { ids } = req.body;
        await Promise.all(ids.map((id, order) => prisma_1.default.scalingStep.update({ where: { id }, data: { order } })));
        res.json({ success: true });
    }
    catch {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.reorder = reorder;
//# sourceMappingURL=scalingController.js.map