import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";

export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const where = req.headers.authorization ? {} : { isActive: true };
    const items = await prisma.integration.findMany({ where, orderBy: [{ order: "asc" }, { name: "asc" }] });
    res.json({ success: true, integrations: items });
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = await prisma.integration.findUnique({ where: { id: req.params.id } });
    if (!item) { res.status(404).json({ success: false, message: "Not found" }); return; }
    res.json({ success: true, integration: item });
  } catch (err) {
    next(err);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = await prisma.integration.create({ data: req.body });
    res.status(201).json({ success: true, integration: item });
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = await prisma.integration.update({ where: { id: req.params.id }, data: req.body });
    res.json({ success: true, integration: item });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.integration.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

export const reorder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { ids } = req.body as { ids: string[] };
    await prisma.$transaction(ids.map((id, i) => prisma.integration.update({ where: { id }, data: { order: i } })));
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
