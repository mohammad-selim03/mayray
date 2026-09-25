import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";

export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const where: Record<string, unknown> = req.headers.authorization ? {} : { isActive: true };
    if (req.query.category) where.category = req.query.category;
    const items = await prisma.useCase.findMany({ where, orderBy: { order: "asc" } });
    res.json({ success: true, useCases: items });
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = await prisma.useCase.findUnique({ where: { id: req.params.id } });
    if (!item) { res.status(404).json({ success: false, message: "Not found" }); return; }
    res.json({ success: true, useCase: item });
  } catch (err) {
    next(err);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = await prisma.useCase.create({ data: req.body });
    res.status(201).json({ success: true, useCase: item });
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = await prisma.useCase.update({ where: { id: req.params.id }, data: req.body });
    res.json({ success: true, useCase: item });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.useCase.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

export const reorder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { ids } = req.body as { ids: string[] };
    await prisma.$transaction(ids.map((id, i) => prisma.useCase.update({ where: { id }, data: { order: i } })));
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
