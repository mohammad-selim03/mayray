"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const path_1 = __importDefault(require("path"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const auth_1 = __importDefault(require("./routes/auth"));
const blog_1 = __importDefault(require("./routes/blog"));
const testimonials_1 = __importDefault(require("./routes/testimonials"));
const contact_1 = __importDefault(require("./routes/contact"));
const newsletter_1 = __importDefault(require("./routes/newsletter"));
const integrations_1 = __importDefault(require("./routes/integrations"));
const features_1 = __importDefault(require("./routes/features"));
const useCases_1 = __importDefault(require("./routes/useCases"));
const healthCheck_1 = __importDefault(require("./routes/healthCheck"));
const analytics_1 = __importDefault(require("./routes/analytics"));
const users_1 = __importDefault(require("./routes/users"));
const upload_1 = __importDefault(require("./routes/upload"));
const auditLogs_1 = __importDefault(require("./routes/auditLogs"));
const settings_1 = __importDefault(require("./routes/settings"));
const faq_1 = __importDefault(require("./routes/faq"));
const scaling_1 = __importDefault(require("./routes/scaling"));
const industryROI_1 = __importDefault(require("./routes/industryROI"));
const pageContent_1 = __importDefault(require("./routes/pageContent"));
const app = (0, express_1.default)();
app.use((0, compression_1.default)());
app.use((0, helmet_1.default)({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use((0, cors_1.default)({
    origin: [
        process.env.FRONTEND_URL ?? "http://localhost:3000",
        process.env.ADMIN_URL ?? "http://localhost:5173",
    ],
    credentials: true,
}));
const limiter = (0, express_rate_limit_1.default)({ windowMs: 15 * 60 * 1000, max: 200 });
app.use("/api", limiter);
app.use((0, morgan_1.default)(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.use("/api/auth", auth_1.default);
app.use("/api/blog", blog_1.default);
app.use("/api/testimonials", testimonials_1.default);
app.use("/api/contact", contact_1.default);
app.use("/api/newsletter", newsletter_1.default);
app.use("/api/integrations", integrations_1.default);
app.use("/api/features", features_1.default);
app.use("/api/use-cases", useCases_1.default);
app.use("/api/health-check", healthCheck_1.default);
app.use("/api/analytics", analytics_1.default);
app.use("/api/users", users_1.default);
app.use("/api/upload", upload_1.default);
app.use("/api/audit-logs", auditLogs_1.default);
app.use("/api/settings", settings_1.default);
app.use("/api/faq", faq_1.default);
app.use("/api/scaling", scaling_1.default);
app.use("/api/industry-roi", industryROI_1.default);
app.use("/api/page-content", pageContent_1.default);
app.get("/api/health", (_req, res) => res.json({ status: "ok", timestamp: new Date() }));
app.use(errorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map