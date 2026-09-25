import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";
import { sendEmail } from "../utils/email";

export const submit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, name, message, type = "contact" } = req.body as {
      email: string; name: string; message?: string; type?: string;
    };
    if (!email || !name) {
      res.status(400).json({ success: false, message: "Name and email required" });
      return;
    }

    await prisma.contact.create({ data: { email, name, message, type: type as never, ipAddress: req.ip } });

    sendEmail({
      to: process.env.ADMIN_EMAIL!,
      subject: `New ${type} submission from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message ?? "N/A"}</p>`,
    }).catch(() => {});

    res.status(201).json({ success: true, message: "Message received. We'll get back to you soon." });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, type, page = "1", limit = "20" } = req.query as Record<string, string>;
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const where: Record<string, string> = {};
    if (status) where.status = status;
    if (type) where.type = type;

    const [total, items] = await prisma.$transaction([
      prisma.contact.count({ where }),
      prisma.contact.findMany({ where, orderBy: { createdAt: "desc" }, skip, take: parseInt(limit, 10) }),
    ]);
    res.json({ success: true, total, items });
  } catch (err) {
    next(err);
  }
};

export const updateStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = await prisma.contact.update({
      where: { id: req.params.id },
      data: { status: req.body.status },
    });
    res.json({ success: true, contact: item });
  } catch (err) {
    next(err);
  }
};
