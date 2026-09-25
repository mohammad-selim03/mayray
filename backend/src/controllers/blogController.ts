import { Request, Response, NextFunction } from "express";
import slugify from "slugify";
import prisma from "../config/prisma";
import { AuthRequest, PaginationQuery } from "../types";
import { logAudit } from "../utils/auditLog";

interface BlogQuery extends PaginationQuery {
  status?: string;
}

export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, page = "1", limit = "10", search } = req.query as BlogQuery;
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (search) where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { excerpt: { contains: search, mode: "insensitive" } },
    ];

    const [total, posts] = await prisma.$transaction([
      prisma.blog.count({ where }),
      prisma.blog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: parseInt(limit, 10),
        include: { createdBy: { select: { name: true, email: true } } },
      }),
    ]);

    res.json({ success: true, total, page: parseInt(page, 10), posts });
  } catch (err) {
    next(err);
  }
};

export const getPublished = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const limit = Math.min(parseInt((req.query.limit as string) ?? "6", 10), 20);
    const posts = await prisma.blog.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
      take: limit,
      select: { id: true, title: true, slug: true, excerpt: true, content: true, image: true, author: true, category: true, readTime: true, publishedAt: true, tags: true, views: true, metaTitle: true, metaDescription: true },
    });
    res.json({ success: true, posts });
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const post = await prisma.blog.findUnique({
      where: { id: req.params.id },
      include: { createdBy: { select: { name: true, email: true } } },
    });
    if (!post) { res.status(404).json({ success: false, message: "Post not found" }); return; }
    res.json({ success: true, post });
  } catch (err) {
    next(err);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, tags, status, ...rest } = req.body as Record<string, unknown>;
    let slug = slugify(title as string, { lower: true, strict: true });
    const existing = await prisma.blog.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const post = await prisma.blog.create({
      data: {
        ...rest,
        title: title as string,
        slug,
        tags: Array.isArray(tags) ? tags as string[] : (tags ? String(tags).split(",").map((t) => t.trim()) : []),
        status: ((status as string) ?? "draft") as never,
        publishedAt: status === "published" ? new Date() : null,
        createdById: (req as AuthRequest).user.id,
      } as never,
    });
    logAudit((req as AuthRequest).user.id, "create", "blog", post.id, { title: post.title }, req.ip);
    res.status(201).json({ success: true, post });
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { tags, status, ...rest } = req.body as Record<string, unknown>;
    const current = await prisma.blog.findUnique({ where: { id: req.params.id } });
    if (!current) { res.status(404).json({ success: false, message: "Post not found" }); return; }

    const post = await prisma.blog.update({
      where: { id: req.params.id },
      data: {
        ...rest,
        ...(tags !== undefined ? { tags: Array.isArray(tags) ? tags as string[] : String(tags).split(",").map((t) => t.trim()) } : {}),
        ...(status ? { status: status as never } : {}),
        ...(status === "published" && !current.publishedAt ? { publishedAt: new Date() } : {}),
      } as never,
    });
    logAudit((req as AuthRequest).user.id, "update", "blog", req.params.id, {}, req.ip);
    res.json({ success: true, post });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.blog.delete({ where: { id: req.params.id } });
    logAudit((req as AuthRequest).user.id, "delete", "blog", req.params.id, {}, req.ip);
    res.json({ success: true, message: "Post deleted" });
  } catch (err) {
    next(err);
  }
};

export const getBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const post = await prisma.blog.findUnique({
      where: { slug: req.params.slug },
      select: { id: true, title: true, slug: true, excerpt: true, content: true, image: true, author: true, category: true, readTime: true, publishedAt: true, tags: true, views: true, metaTitle: true, metaDescription: true },
    });
    if (!post || !post.publishedAt) {
      res.status(404).json({ success: false, message: "Post not found" });
      return;
    }
    res.json({ success: true, post });
  } catch (err) {
    next(err);
  }
};

export const trackView = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.blog.update({ where: { id: req.params.id }, data: { views: { increment: 1 } } });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
