"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getAll = async (req, res, next) => {
    try {
        const { page = "1", limit = "50", resource, userId } = req.query;
        const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
        const where = {};
        if (resource)
            where.resource = resource;
        if (userId)
            where.userId = userId;
        const [total, logs] = await prisma_1.default.$transaction([
            prisma_1.default.auditLog.count({ where }),
            prisma_1.default.auditLog.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip,
                take: parseInt(limit, 10),
            }),
        ]);
        res.json({ success: true, total, logs });
    }
    catch (err) {
        next(err);
    }
};
exports.getAll = getAll;
//# sourceMappingURL=auditLogController.js.map