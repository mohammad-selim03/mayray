import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import prisma from "../config/prisma";
import { AuthRequest } from "../types";
import { logAudit } from "../utils/auditLog";

const safeSelect = { id: true, name: true, email: true, role: true, isActive: true, lastLogin: true, avatar: true, createdAt: true };

export const getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" }, select: safeSelect });
    res.json({ success: true, users });
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id }, select: safeSelect });
    if (!user) { res.status(404).json({ success: false, message: "Not found" }); return; }
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, role } = req.body as {
      name: string; email: string; password: string; role?: string;
    };
    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email: email.toLowerCase(), password: hashed, role: role as never },
      select: safeSelect,
    });
    logAudit((req as AuthRequest).user.id, "create", "user", user.id, { name: user.name, email: user.email }, req.ip);
    res.status(201).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, role, isActive, avatar } = req.body as {
      name?: string; role?: string; isActive?: boolean; avatar?: string;
    };
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { name, role: role as never, isActive, avatar },
      select: safeSelect,
    });
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.params.id === (req as AuthRequest).user.id) {
      res.status(400).json({ success: false, message: "Cannot delete yourself" });
      return;
    }
    await prisma.user.delete({ where: { id: req.params.id } });
    logAudit((req as AuthRequest).user.id, "delete", "user", req.params.id, {}, req.ip);
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    next(err);
  }
};
