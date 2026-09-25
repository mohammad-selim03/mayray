import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";

export const subscribe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body as { email: string };
    if (!email) { res.status(400).json({ success: false, message: "Email required" }); return; }

    const existing = await prisma.newsletter.findUnique({ where: { email: email.toLowerCase() } });
    if (existing) {
      if (existing.isActive) { res.json({ success: true, message: "Already subscribed" }); return; }
      const sub = await prisma.newsletter.update({
        where: { email: email.toLowerCase() },
        data: { isActive: true, unsubscribedAt: null },
      });
      res.json({ success: true, message: "Re-subscribed", subscriptionId: sub.id });
      return;
    }

    const sub = await prisma.newsletter.create({ data: { email: email.toLowerCase() } });
    res.status(201).json({ success: true, subscriptionId: sub.id });
  } catch (err) {
    next(err);
  }
};

export const unsubscribe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const email = (req.body as { email: string }).email?.toLowerCase();
    const sub = await prisma.newsletter.findUnique({ where: { email } });
    if (!sub) { res.status(404).json({ success: false, message: "Not subscribed" }); return; }
    await prisma.newsletter.update({ where: { email }, data: { isActive: false, unsubscribedAt: new Date() } });
    res.json({ success: true, message: "Unsubscribed" });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { active, page = "1", limit = "30" } = req.query as Record<string, string>;
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const where = active !== undefined ? { isActive: active === "true" } : {};
    const [total, items] = await prisma.$transaction([
      prisma.newsletter.count({ where }),
      prisma.newsletter.findMany({ where, orderBy: { subscribedAt: "desc" }, skip, take: parseInt(limit, 10) }),
    ]);
    res.json({ success: true, total, items });
  } catch (err) {
    next(err);
  }
};
