import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../types";
import { logAudit } from "../utils/auditLog";

export const getByPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page } = req.params;
    const items = await prisma.pageContent.findMany({
      where: { page },
      orderBy: { order: "asc" },
    });
    res.json({ success: true, items });
  } catch (err) {
    next(err);
  }
};

export const getByPageAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page } = req.params;
    const items = await prisma.pageContent.findMany({
      where: { page },
      orderBy: { order: "asc" },
    });
    res.json({ success: true, items });
  } catch (err) {
    next(err);
  }
};

export const upsert = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, section, key, value, isActive, order } = req.body;
    if (!page || !section || !key) {
      res.status(400).json({ success: false, message: "page, section, and key are required" });
      return;
    }

    const item = await prisma.pageContent.upsert({
      where: { page_section_key: { page, section, key } },
      update: { value, isActive, order },
      create: { page, section, key, value, isActive, order: order ?? 0 },
    });

    logAudit((req as AuthRequest).user.id, "upsert", "page_content", item.id, { page, section, key }, req.ip);
    res.json({ success: true, item });
  } catch (err) {
    next(err);
  }
};

export const bulkUpsert = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { items } = req.body as { items: Array<{ page: string; section: string; key: string; value: string; isActive?: boolean; order?: number }> };
    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ success: false, message: "items array is required" });
      return;
    }

    const results = await Promise.all(
      items.map((item) =>
        prisma.pageContent.upsert({
          where: { page_section_key: { page: item.page, section: item.section, key: item.key } },
          update: { value: item.value, isActive: item.isActive ?? true, order: item.order ?? 0 },
          create: { page: item.page, section: item.section, key: item.key, value: item.value, isActive: item.isActive ?? true, order: item.order ?? 0 },
        })
      )
    );

    logAudit((req as AuthRequest).user.id, "bulk_upsert", "page_content", undefined, { count: results.length }, req.ip);
    res.json({ success: true, count: results.length });
  } catch (err) {
    next(err);
  }
};

export const reorder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { items } = req.body as { items: Array<{ id: string; order: number }> };
    if (!Array.isArray(items)) {
      res.status(400).json({ success: false, message: "items array is required" });
      return;
    }

    await Promise.all(
      items.map((item) =>
        prisma.pageContent.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.pageContent.delete({ where: { id } });
    logAudit((req as AuthRequest).user.id, "delete", "page_content", id, {}, req.ip);
    res.json({ success: true, message: "Item deleted" });
  } catch (err) {
    next(err);
  }
};
