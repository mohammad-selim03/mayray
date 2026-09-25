"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackView = exports.getBySlug = exports.remove = exports.update = exports.create = exports.getOne = exports.getPublished = exports.getAll = void 0;
const slugify_1 = __importDefault(require("slugify"));
const prisma_1 = __importDefault(require("../config/prisma"));
const auditLog_1 = require("../utils/auditLog");
const getAll = async (req, res, next) => {
    try {
        const { status, page = "1", limit = "10", search } = req.query;
        const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
        const where = {};
        if (status)
            where.status = status;
        if (search)
            where.OR = [
                { title: { contains: search, mode: "insensitive" } },
                { excerpt: { contains: search, mode: "insensitive" } },
            ];
        const [total, posts] = await prisma_1.default.$transaction([
            prisma_1.default.blog.count({ where }),
            prisma_1.default.blog.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip,
                take: parseInt(limit, 10),
                include: { createdBy: { select: { name: true, email: true } } },
            }),
        ]);
        res.json({ success: true, total, page: parseInt(page, 10), posts });
    }
    catch (err) {
        next(err);
    }
};
exports.getAll = getAll;
const getPublished = async (req, res, next) => {
    try {
        const limit = Math.min(parseInt(req.query.limit ?? "6", 10), 20);
        const posts = await prisma_1.default.blog.findMany({
            where: { status: "published" },
            orderBy: { publishedAt: "desc" },
            take: limit,
            select: { id: true, title: true, slug: true, excerpt: true, content: true, image: true, author: true, category: true, readTime: true, publishedAt: true, tags: true, views: true, metaTitle: true, metaDescription: true },
        });
        res.json({ success: true, posts });
    }
    catch (err) {
        next(err);
    }
};
exports.getPublished = getPublished;
const getOne = async (req, res, next) => {
    try {
        const post = await prisma_1.default.blog.findUnique({
            where: { id: req.params.id },
            include: { createdBy: { select: { name: true, email: true } } },
        });
        if (!post) {
            res.status(404).json({ success: false, message: "Post not found" });
            return;
        }
        res.json({ success: true, post });
    }
    catch (err) {
        next(err);
    }
};
exports.getOne = getOne;
const create = async (req, res, next) => {
    try {
        const { title, tags, status, ...rest } = req.body;
        let slug = (0, slugify_1.default)(title, { lower: true, strict: true });
        const existing = await prisma_1.default.blog.findUnique({ where: { slug } });
        if (existing)
            slug = `${slug}-${Date.now()}`;
        const post = await prisma_1.default.blog.create({
            data: {
                ...rest,
                title: title,
                slug,
                tags: Array.isArray(tags) ? tags : (tags ? String(tags).split(",").map((t) => t.trim()) : []),
                status: (status ?? "draft"),
                publishedAt: status === "published" ? new Date() : null,
                createdById: req.user.id,
            },
        });
        (0, auditLog_1.logAudit)(req.user.id, "create", "blog", post.id, { title: post.title }, req.ip);
        res.status(201).json({ success: true, post });
    }
    catch (err) {
        next(err);
    }
};
exports.create = create;
const update = async (req, res, next) => {
    try {
        const { tags, status, ...rest } = req.body;
        const current = await prisma_1.default.blog.findUnique({ where: { id: req.params.id } });
        if (!current) {
            res.status(404).json({ success: false, message: "Post not found" });
            return;
        }
        const post = await prisma_1.default.blog.update({
            where: { id: req.params.id },
            data: {
                ...rest,
                ...(tags !== undefined ? { tags: Array.isArray(tags) ? tags : String(tags).split(",").map((t) => t.trim()) } : {}),
                ...(status ? { status: status } : {}),
                ...(status === "published" && !current.publishedAt ? { publishedAt: new Date() } : {}),
            },
        });
        (0, auditLog_1.logAudit)(req.user.id, "update", "blog", req.params.id, {}, req.ip);
        res.json({ success: true, post });
    }
    catch (err) {
        next(err);
    }
};
exports.update = update;
const remove = async (req, res, next) => {
    try {
        await prisma_1.default.blog.delete({ where: { id: req.params.id } });
        (0, auditLog_1.logAudit)(req.user.id, "delete", "blog", req.params.id, {}, req.ip);
        res.json({ success: true, message: "Post deleted" });
    }
    catch (err) {
        next(err);
    }
};
exports.remove = remove;
const getBySlug = async (req, res, next) => {
    try {
        const post = await prisma_1.default.blog.findUnique({
            where: { slug: req.params.slug },
            select: { id: true, title: true, slug: true, excerpt: true, content: true, image: true, author: true, category: true, readTime: true, publishedAt: true, tags: true, views: true, metaTitle: true, metaDescription: true },
        });
        if (!post || !post.publishedAt) {
            res.status(404).json({ success: false, message: "Post not found" });
            return;
        }
        res.json({ success: true, post });
    }
    catch (err) {
        next(err);
    }
};
exports.getBySlug = getBySlug;
const trackView = async (req, res, next) => {
    try {
        await prisma_1.default.blog.update({ where: { id: req.params.id }, data: { views: { increment: 1 } } });
        res.json({ success: true });
    }
    catch (err) {
        next(err);
    }
};
exports.trackView = trackView;
//# sourceMappingURL=blogController.js.map