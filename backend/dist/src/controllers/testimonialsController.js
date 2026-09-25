"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorder = exports.remove = exports.update = exports.create = exports.getOne = exports.getAll = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getAll = async (req, res, next) => {
    try {
        const where = req.headers.authorization ? {} : { isActive: true };
        const items = await prisma_1.default.testimonial.findMany({ where, orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
        res.json({ success: true, testimonials: items });
    }
    catch (err) {
        next(err);
    }
};
exports.getAll = getAll;
const getOne = async (req, res, next) => {
    try {
        const item = await prisma_1.default.testimonial.findUnique({ where: { id: req.params.id } });
        if (!item) {
            res.status(404).json({ success: false, message: "Not found" });
            return;
        }
        res.json({ success: true, testimonial: item });
    }
    catch (err) {
        next(err);
    }
};
exports.getOne = getOne;
const create = async (req, res, next) => {
    try {
        const item = await prisma_1.default.testimonial.create({ data: req.body });
        res.status(201).json({ success: true, testimonial: item });
    }
    catch (err) {
        next(err);
    }
};
exports.create = create;
const update = async (req, res, next) => {
    try {
        const item = await prisma_1.default.testimonial.update({ where: { id: req.params.id }, data: req.body });
        res.json({ success: true, testimonial: item });
    }
    catch (err) {
        next(err);
    }
};
exports.update = update;
const remove = async (req, res, next) => {
    try {
        await prisma_1.default.testimonial.delete({ where: { id: req.params.id } });
        res.json({ success: true, message: "Deleted" });
    }
    catch (err) {
        next(err);
    }
};
exports.remove = remove;
const reorder = async (req, res, next) => {
    try {
        const { ids } = req.body;
        await prisma_1.default.$transaction(ids.map((id, i) => prisma_1.default.testimonial.update({ where: { id }, data: { order: i } })));
        res.json({ success: true });
    }
    catch (err) {
        next(err);
    }
};
exports.reorder = reorder;
//# sourceMappingURL=testimonialsController.js.map