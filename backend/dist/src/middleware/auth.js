"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../config/prisma"));
const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    if (!token) {
        res.status(401).json({ success: false, message: "Not authenticated" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await prisma_1.default.user.findUnique({ where: { id: decoded.id } });
        if (!user || !user.isActive) {
            res.status(401).json({ success: false, message: "User not found or inactive" });
            return;
        }
        req.user = user;
        next();
    }
    catch {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};
exports.protect = protect;
const restrictTo = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        res.status(403).json({ success: false, message: "Access denied" });
        return;
    }
    next();
};
exports.restrictTo = restrictTo;
//# sourceMappingURL=auth.js.map