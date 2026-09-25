"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderROI = exports.deleteROI = exports.updateROI = exports.createROI = exports.getROMAdmin = exports.listROI = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const listROI = async (req, res) => {
    try {
        const items = await prisma_1.default.industryROI.findMany({
            where: { isActive: true },
            orderBy: { order: "asc" },
        });
        res.json({ success: true, items });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch ROI data" });
    }
};
exports.listROI = listROI;
const getROMAdmin = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const [items, total] = await Promise.all([
            prisma_1.default.industryROI.findMany({
                skip,
                take: Number(limit),
                orderBy: { order: "asc" },
            }),
            prisma_1.default.industryROI.count(),
        ]);
        res.json({ success: true, items, total, page: Number(page) });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch ROI data" });
    }
};
exports.getROMAdmin = getROMAdmin;
const createROI = async (req, res) => {
    try {
        const { industry, cvr, showUp, image, useCases, isActive, order } = req.body;
        if (!industry || !cvr || !showUp) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        const item = await prisma_1.default.industryROI.create({
            data: {
                industry,
                cvr,
                showUp,
                image,
                useCases: Array.isArray(useCases) ? useCases : [],
                isActive,
                order,
            },
        });
        res.status(201).json({ success: true, item });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Failed to create ROI entry" });
    }
};
exports.createROI = createROI;
const updateROI = async (req, res) => {
    try {
        const { id } = req.params;
        const { industry, cvr, showUp, image, useCases, isActive, order } = req.body;
        const item = await prisma_1.default.industryROI.update({
            where: { id },
            data: {
                ...(industry && { industry }),
                ...(cvr && { cvr }),
                ...(showUp && { showUp }),
                ...(image !== undefined && { image }),
                ...(useCases && { useCases: Array.isArray(useCases) ? useCases : [] }),
                ...(isActive !== undefined && { isActive }),
                ...(order !== undefined && { order }),
            },
        });
        res.json({ success: true, item });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Failed to update ROI entry" });
    }
};
exports.updateROI = updateROI;
const deleteROI = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.industryROI.delete({ where: { id } });
        res.json({ success: true, message: "ROI entry deleted" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete ROI entry" });
    }
};
exports.deleteROI = deleteROI;
const reorderROI = async (req, res) => {
    try {
        const { ids } = req.body;
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid IDs array" });
        }
        await Promise.all(ids.map((id, idx) => prisma_1.default.industryROI.update({
            where: { id },
            data: { order: idx },
        })));
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Failed to reorder ROI entries" });
    }
};
exports.reorderROI = reorderROI;
//# sourceMappingURL=industryROIController.js.map