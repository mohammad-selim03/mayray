"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.getAll = exports.submit = void 0;
const uuid_1 = require("uuid");
const prisma_1 = __importDefault(require("../config/prisma"));
const email_1 = require("../utils/email");
const submit = async (req, res, next) => {
    try {
        const { email, company, industry, processDescription } = req.body;
        if (!email) {
            res.status(400).json({ success: false, message: "Email required" });
            return;
        }
        const assessmentId = (0, uuid_1.v4)().split("-")[0].toUpperCase();
        await prisma_1.default.healthCheck.create({ data: { email, company, industry, processDescription, assessmentId } });
        (0, email_1.sendEmail)({
            to: email,
            subject: "Your Mayray AI Health Check Assessment",
            html: `<h2>Thank you${company ? `, ${company}` : ""}!</h2><p>Your assessment ID is <strong>${assessmentId}</strong>. Our team will review your submission and contact you within 24 hours.</p>`,
        }).catch(() => { });
        res.status(201).json({ success: true, assessmentId, message: "Assessment submitted. We will contact you within 24 hours." });
    }
    catch (err) {
        next(err);
    }
};
exports.submit = submit;
const getAll = async (req, res, next) => {
    try {
        const { status, page = "1", limit = "20" } = req.query;
        const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
        const where = status ? { status: status } : {};
        const [total, items] = await prisma_1.default.$transaction([
            prisma_1.default.healthCheck.count({ where }),
            prisma_1.default.healthCheck.findMany({ where, orderBy: { createdAt: "desc" }, skip, take: parseInt(limit, 10) }),
        ]);
        res.json({ success: true, total, items });
    }
    catch (err) {
        next(err);
    }
};
exports.getAll = getAll;
const update = async (req, res, next) => {
    try {
        const { recommendations, ...rest } = req.body;
        const item = await prisma_1.default.healthCheck.update({
            where: { id: req.params.id },
            data: { ...rest, ...(recommendations && { recommendations: Array.isArray(recommendations) ? recommendations : [recommendations] }) },
        });
        res.json({ success: true, item });
    }
    catch (err) {
        next(err);
    }
};
exports.update = update;
//# sourceMappingURL=healthCheckController.js.map