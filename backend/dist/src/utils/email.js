"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const createTransporter = () => nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT ?? "587", 10),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});
const sendEmail = async ({ to, subject, html, text }) => {
    if (!process.env.SMTP_USER) {
        console.log(`[Email skipped] To: ${to} | Subject: ${subject}`);
        return;
    }
    const transporter = createTransporter();
    await transporter.sendMail({
        from: `"${process.env.FROM_NAME ?? "Mayray AI"}" <${process.env.FROM_EMAIL ?? process.env.SMTP_USER}>`,
        to,
        subject,
        html,
        text,
    });
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.js.map