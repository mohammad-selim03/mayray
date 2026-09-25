import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import prisma from "../config/prisma";
import { sendEmail } from "../utils/email";

export const submit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, company, industry, processDescription } = req.body as {
      email: string; company?: string; industry?: string; processDescription?: string;
    };
    if (!email) { res.status(400).json({ success: false, message: "Email required" }); return; }

    const assessmentId = uuidv4().split("-")[0].toUpperCase();
    await prisma.healthCheck.create({ data: { email, company, industry, processDescription, assessmentId } });

    sendEmail({
      to: email,
      subject: "Your Mayray AI Health Check Assessment",
      html: `<h2>Thank you${company ? `, ${company}` : ""}!</h2><p>Your assessment ID is <strong>${assessmentId}</strong>. Our team will review your submission and contact you within 24 hours.</p>`,
    }).catch(() => {});

    res.status(201).json({ success: true, assessmentId, message: "Assessment submitted. We will contact you within 24 hours." });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, page = "1", limit = "20" } = req.query as Record<string, string>;
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const where = status ? { status: status as never } : {};
    const [total, items] = await prisma.$transaction([
      prisma.healthCheck.count({ where }),
      prisma.healthCheck.findMany({ where, orderBy: { createdAt: "desc" }, skip, take: parseInt(limit, 10) }),
    ]);
    res.json({ success: true, total, items });
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { recommendations, ...rest } = req.body as { recommendations?: string | string[]; [key: string]: unknown };
    const item = await prisma.healthCheck.update({
      where: { id: req.params.id },
      data: { ...rest, ...(recommendations && { recommendations: Array.isArray(recommendations) ? recommendations : [recommendations] }) },
    });
    res.json({ success: true, item });
  } catch (err) {
    next(err);
  }
};
