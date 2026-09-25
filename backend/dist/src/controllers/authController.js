"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.getMe = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../config/prisma"));
const signToken = (id) => 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, { expiresIn: (process.env.JWT_EXPIRES_IN ?? "7d") });
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ success: false, message: "Email and password required" });
            return;
        }
        const user = await prisma_1.default.user.findUnique({ where: { email: email.toLowerCase() } });
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            res.status(401).json({ success: false, message: "Invalid credentials" });
            return;
        }
        if (!user.isActive) {
            res.status(401).json({ success: false, message: "Account deactivated" });
            return;
        }
        await prisma_1.default.user.update({ where: { id: user.id }, data: { lastLogin: new Date() } });
        const { password: _, ...safeUser } = user;
        const token = signToken(user.id);
        res.json({ success: true, token, user: safeUser });
    }
    catch (err) {
        next(err);
    }
};
exports.login = login;
const getMe = (req, res) => {
    const { password: _, ...safeUser } = req.user;
    res.json({ success: true, user: safeUser });
};
exports.getMe = getMe;
const updatePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = req.user;
        if (!(await bcryptjs_1.default.compare(currentPassword, user.password))) {
            res.status(401).json({ success: false, message: "Current password incorrect" });
            return;
        }
        const hashed = await bcryptjs_1.default.hash(newPassword, 12);
        await prisma_1.default.user.update({ where: { id: user.id }, data: { password: hashed } });
        const token = signToken(user.id);
        res.json({ success: true, token });
    }
    catch (err) {
        next(err);
    }
};
exports.updatePassword = updatePassword;
//# sourceMappingURL=authController.js.map