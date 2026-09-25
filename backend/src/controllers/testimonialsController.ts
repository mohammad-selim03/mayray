import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";

export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const where = req.headers.authorization ? {} : { isActive: true };
    const items = await prisma.testimonial.findMany({ where, orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
    res.json({ success: true, testimonials: items });
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = await prisma.testimonial.findUnique({ where: { id: req.params.id } });
    if (!item) { res.status(404).json({ success: false, message: "Not found" }); return; }
    res.json({ success: true, testimonial: item });
  } catch (err) {
    next(err);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = await prisma.testimonial.create({ data: req.body });
    res.status(201).json({ success: true, testimonial: item });
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = await prisma.testimonial.update({ where: { id: req.params.id }, data: req.body });
    res.json({ success: true, testimonial: item });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.testimonial.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

export const reorder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { ids } = req.body as { ids: string[] };
    await prisma.$transaction(ids.map((id, i) => prisma.testimonial.update({ where: { id }, data: { order: i } })));
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
