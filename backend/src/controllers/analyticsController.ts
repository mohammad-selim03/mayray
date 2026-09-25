import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";

export const getOverview = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [
      totalBlogs, publishedBlogs,
      totalContacts, newContacts,
      totalSubscribers, activeSubscribers,
      totalHealthChecks, pendingHealthChecks,
      totalTestimonials,
      blogViewsAgg,
    ] = await Promise.all([
      prisma.blog.count(),
      prisma.blog.count({ where: { status: "published" } }),
      prisma.contact.count(),
      prisma.contact.count({ where: { status: "new" } }),
      prisma.newsletter.count(),
      prisma.newsletter.count({ where: { isActive: true } }),
      prisma.healthCheck.count(),
      prisma.healthCheck.count({ where: { status: "pending" } }),
      prisma.testimonial.count(),
      prisma.blog.aggregate({ _sum: { views: true } }),
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
  } catch (err) {
    next(err);
  }
};

export const getBlogStats = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [topPosts, byStatusRaw] = await Promise.all([
      prisma.blog.findMany({
        where: { status: "published" },
        orderBy: { views: "desc" },
        take: 5,
        select: { id: true, title: true, views: true, publishedAt: true },
      }),
      prisma.blog.groupBy({ by: ["status"], _count: { _all: true } }),
    ]);
    const byStatus = byStatusRaw.map((r) => ({ _id: r.status, count: r._count._all }));
    res.json({ success: true, topPosts, byStatus });
  } catch (err) {
    next(err);
  }
};

export const getContactStats = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [byTypeRaw, byStatusRaw, recent] = await Promise.all([
      prisma.contact.groupBy({ by: ["type"], _count: { _all: true } }),
      prisma.contact.groupBy({ by: ["status"], _count: { _all: true } }),
      prisma.contact.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
    ]);
    const byType = byTypeRaw.map((r) => ({ _id: r.type, count: r._count._all }));
    const byStatus = byStatusRaw.map((r) => ({ _id: r.status, count: r._count._all }));
    res.json({ success: true, byType, byStatus, recent });
  } catch (err) {
    next(err);
  }
};
