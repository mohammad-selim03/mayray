import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import path from "path";
import rateLimit from "express-rate-limit";
import errorHandler from "./middleware/errorHandler";

import authRoutes from "./routes/auth";
import blogRoutes from "./routes/blog";
import testimonialsRoutes from "./routes/testimonials";
import contactRoutes from "./routes/contact";
import newsletterRoutes from "./routes/newsletter";
import integrationsRoutes from "./routes/integrations";
import featuresRoutes from "./routes/features";
import useCasesRoutes from "./routes/useCases";
import healthCheckRoutes from "./routes/healthCheck";
import analyticsRoutes from "./routes/analytics";
import usersRoutes from "./routes/users";
import uploadRoutes from "./routes/upload";
import auditLogRoutes from "./routes/auditLogs";
import settingsRoutes from "./routes/settings";
import faqRoutes from "./routes/faq";
import scalingRoutes from "./routes/scaling";
import industryROIRoutes from "./routes/industryROI";
import pageContentRoutes from "./routes/pageContent";
import cmsRoutes from "./routes/cms";
import mediaRoutes from "./routes/media";

const app: Application = express();

app.use(compression());
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({
  origin: [
    process.env.FRONTEND_URL ?? "http://localhost:3000",
    process.env.ADMIN_URL ?? "http://localhost:5173",
  ],
  credentials: true,
}));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use("/api", limiter);

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/integrations", integrationsRoutes);
app.use("/api/features", featuresRoutes);
app.use("/api/use-cases", useCasesRoutes);
app.use("/api/health-check", healthCheckRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/audit-logs", auditLogRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/scaling", scalingRoutes);
app.use("/api/industry-roi", industryROIRoutes);
app.use("/api/page-content", pageContentRoutes);
app.use("/api/cms", cmsRoutes);
app.use("/api/media", mediaRoutes);

app.get("/api/health", (_req, res) => res.json({ status: "ok", timestamp: new Date() }));

app.use(errorHandler);

export default app;
