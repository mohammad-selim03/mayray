import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";

export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page = "1", limit = "50", resource, userId } = req.query as Record<string, string>;
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const where: Record<string, unknown> = {};
    if (resource) where.resource = resource;
    if (userId) where.userId = userId;

    const [total, logs] = await prisma.$transaction([
      prisma.auditLog.count({ where }),
      prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: parseInt(limit, 10),
      }),
    ]);

    res.json({ success: true, total, logs });
  } catch (err) {
    next(err);
  }
};
