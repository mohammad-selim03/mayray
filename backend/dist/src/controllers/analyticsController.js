"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContactStats = exports.getBlogStats = exports.getOverview = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getOverview = async (_req, res, next) => {
    try {
        const [totalBlogs, publishedBlogs, totalContacts, newContacts, totalSubscribers, activeSubscribers, totalHealthChecks, pendingHealthChecks, totalTestimonials, blogViewsAgg,] = await Promise.all([
            prisma_1.default.blog.count(),
            prisma_1.default.blog.count({ where: { status: "published" } }),
            prisma_1.default.contact.count(),
            prisma_1.default.contact.count({ where: { status: "new" } }),
            prisma_1.default.newsletter.count(),
            prisma_1.default.newsletter.count({ where: { isActive: true } }),
            prisma_1.default.healthCheck.count(),
            prisma_1.default.healthCheck.count({ where: { status: "pending" } }),
            prisma_1.default.testimonial.count(),
            prisma_1.default.blog.aggregate({ _sum: { views: true } }),
        ]);
        res.json({
            success: true,
            stats: {
                blogs: { total: totalBlogs, published: publishedBlogs },
                contacts: { total: totalContacts, new: newContacts },
                newsletter: { total: totalSubscribers, active: activeSubscribers },
                healthChecks: { total: totalHealthChecks, pending: pendingHealthChecks },
                testimonials: { total: totalTestimonials },
                totalBlogViews: blogViewsAgg._sum.views ?? 0,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getOverview = getOverview;
const getBlogStats = async (_req, res, next) => {
    try {
        const [topPosts, byStatusRaw] = await Promise.all([
            prisma_1.default.blog.findMany({
                where: { status: "published" },
                orderBy: { views: "desc" },
                take: 5,
                select: { id: true, title: true, views: true, publishedAt: true },
            }),
            prisma_1.default.blog.groupBy({ by: ["status"], _count: { _all: true } }),
        ]);
        const byStatus = byStatusRaw.map((r) => ({ _id: r.status, count: r._count._all }));
        res.json({ success: true, topPosts, byStatus });
    }
    catch (err) {
        next(err);
    }
};
exports.getBlogStats = getBlogStats;
const getContactStats = async (_req, res, next) => {
    try {
        const [byTypeRaw, byStatusRaw, recent] = await Promise.all([
            prisma_1.default.contact.groupBy({ by: ["type"], _count: { _all: true } }),
            prisma_1.default.contact.groupBy({ by: ["status"], _count: { _all: true } }),
            prisma_1.default.contact.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
        ]);
        const byType = byTypeRaw.map((r) => ({ _id: r.type, count: r._count._all }));
        const byStatus = byStatusRaw.map((r) => ({ _id: r.status, count: r._count._all }));
        res.json({ success: true, byType, byStatus, recent });
    }
    catch (err) {
        next(err);
    }
};
exports.getContactStats = getContactStats;
//# sourceMappingURL=analyticsController.js.map