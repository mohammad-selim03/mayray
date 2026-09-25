"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logAudit = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const logAudit = (userId, action, resource, resourceId, details, ipAddress) => {
    prisma_1.default.auditLog
        .create({ data: { userId, action, resource, resourceId, details: details, ipAddress } })
        .catch(() => { });
};
exports.logAudit = logAudit;
//# sourceMappingURL=auditLog.js.map