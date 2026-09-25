"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.getAll = exports.submit = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const email_1 = require("../utils/email");
const submit = async (req, res, next) => {
    try {
        const { email, name, message, type = "contact" } = req.body;
        if (!email || !name) {
            res.status(400).json({ success: false, message: "Name and email required" });
            return;
        }
        await prisma_1.default.contact.create({ data: { email, name, message, type: type, ipAddress: req.ip } });
        (0, email_1.sendEmail)({
            to: process.env.ADMIN_EMAIL,
            subject: `New ${type} submission from ${name}`,
            html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message ?? "N/A"}</p>`,
        }).catch(() => { });
        res.status(201).json({ success: true, message: "Message received. We'll get back to you soon." });
    }
    catch (err) {
        next(err);
    }
};
exports.submit = submit;
const getAll = async (req, res, next) => {
    try {
        const { status, type, page = "1", limit = "20" } = req.query;
        const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
        const where = {};
        if (status)
            where.status = status;
        if (type)
            where.type = type;
        const [total, items] = await prisma_1.default.$transaction([
            prisma_1.default.contact.count({ where }),
            prisma_1.default.contact.findMany({ where, orderBy: { createdAt: "desc" }, skip, take: parseInt(limit, 10) }),
        ]);
        res.json({ success: true, total, items });
    }
    catch (err) {
        next(err);
    }
};
exports.getAll = getAll;
const updateStatus = async (req, res, next) => {
    try {
        const item = await prisma_1.default.contact.update({
            where: { id: req.params.id },
            data: { status: req.body.status },
        });
        res.json({ success: true, contact: item });
    }
    catch (err) {
        next(err);
    }
};
exports.updateStatus = updateStatus;
//# sourceMappingURL=contactController.js.map