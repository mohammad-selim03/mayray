"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getOne = exports.getAll = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../config/prisma"));
const auditLog_1 = require("../utils/auditLog");
const safeSelect = { id: true, name: true, email: true, role: true, isActive: true, lastLogin: true, avatar: true, createdAt: true };
const getAll = async (_req, res, next) => {
    try {
        const users = await prisma_1.default.user.findMany({ orderBy: { createdAt: "desc" }, select: safeSelect });
        res.json({ success: true, users });
    }
    catch (err) {
        next(err);
    }
};
exports.getAll = getAll;
const getOne = async (req, res, next) => {
    try {
        const user = await prisma_1.default.user.findUnique({ where: { id: req.params.id }, select: safeSelect });
        if (!user) {
            res.status(404).json({ success: false, message: "Not found" });
            return;
        }
        res.json({ success: true, user });
    }
    catch (err) {
        next(err);
    }
};
exports.getOne = getOne;
const create = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const hashed = await bcryptjs_1.default.hash(password, 12);
        const user = await prisma_1.default.user.create({
            data: { name, email: email.toLowerCase(), password: hashed, role: role },
            select: safeSelect,
        });
        (0, auditLog_1.logAudit)(req.user.id, "create", "user", user.id, { name: user.name, email: user.email }, req.ip);
        res.status(201).json({ success: true, user });
    }
    catch (err) {
        next(err);
    }
};
exports.create = create;
const update = async (req, res, next) => {
    try {
        const { name, role, isActive, avatar } = req.body;
        const user = await prisma_1.default.user.update({
            where: { id: req.params.id },
            data: { name, role: role, isActive, avatar },
            select: safeSelect,
        });
        res.json({ success: true, user });
    }
    catch (err) {
        next(err);
    }
};
exports.update = update;
const remove = async (req, res, next) => {
    try {
        if (req.params.id === req.user.id) {
            res.status(400).json({ success: false, message: "Cannot delete yourself" });
            return;
        }
        await prisma_1.default.user.delete({ where: { id: req.params.id } });
        (0, auditLog_1.logAudit)(req.user.id, "delete", "user", req.params.id, {}, req.ip);
        res.json({ success: true, message: "User deleted" });
    }
    catch (err) {
        next(err);
    }
};
exports.remove = remove;
//# sourceMappingURL=usersController.js.map