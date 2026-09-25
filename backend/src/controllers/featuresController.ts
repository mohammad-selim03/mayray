import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";

export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const where: Record<string, unknown> = req.headers.authorization ? {} : { isActive: true };
    if (req.query.group) where.group = req.query.group;
    const items = await prisma.feature.findMany({ where, orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
    res.json({ success: true, features: items });
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = await prisma.feature.findUnique({ where: { id: req.params.id } });
    if (!item) { res.status(404).json({ success: false, message: "Not found" }); return; }
    res.json({ success: true, feature: item });
  } catch (err) {
    next(err);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { apps, ...rest } = req.body as { apps: string | string[]; [key: string]: unknown };
    const item = await prisma.feature.create({
      data: { ...rest, apps: Array.isArray(apps) ? apps : (apps ? String(apps).split(",").map((a) => a.trim()) : []) } as never,
    });
    res.status(201).json({ success: true, feature: item });
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { apps, ...rest } = req.body as { apps?: string | string[]; [key: string]: unknown };
    const item = await prisma.feature.update({
      where: { id: req.params.id },
      data: { ...rest, ...(apps !== undefined && { apps: Array.isArray(apps) ? apps : String(apps).split(",").map((a) => a.trim()) }) },
    });
    res.json({ success: true, feature: item });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.feature.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

export const reorder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { ids } = req.body as { ids: string[] };
    await prisma.$transaction(ids.map((id, i) => prisma.feature.update({ where: { id }, data: { order: i } })));
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
