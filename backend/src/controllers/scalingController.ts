import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await prisma.scalingStep.findMany({ orderBy: [{ isCard: "asc" }, { order: "asc" }, { createdAt: "desc" }] });
    res.json({ success: true, items });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { step, title, body, icon, isCard = false, order = 0 } = req.body;
    const item = await prisma.scalingStep.create({ data: { step, title, body, icon, isCard, order } });
    res.status(201).json({ success: true, item });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await prisma.scalingStep.update({ where: { id: req.params.id }, data: req.body });
    res.json({ success: true, item });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.scalingStep.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: "Deleted" });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const reorder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body as { ids: string[] };
    await Promise.all(ids.map((id, order) => prisma.scalingStep.update({ where: { id }, data: { order } })));
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
