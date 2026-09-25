import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await prisma.faqItem.findMany({ orderBy: { order: "asc" } });
    res.json({ success: true, items });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { question, answer, order = 0, isActive = true } = req.body;
    const item = await prisma.faqItem.create({ data: { question, answer, order, isActive } });
    res.status(201).json({ success: true, item });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await prisma.faqItem.update({ where: { id: req.params.id }, data: req.body });
    res.json({ success: true, item });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.faqItem.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: "Deleted" });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const reorder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body as { ids: string[] };
    await Promise.all(ids.map((id, order) => prisma.faqItem.update({ where: { id }, data: { order } })));
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
