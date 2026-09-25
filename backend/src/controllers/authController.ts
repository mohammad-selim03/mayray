import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../config/prisma";
import { AuthRequest } from "../types";

const signToken = (id: string): string =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: (process.env.JWT_EXPIRES_IN ?? "7d") as any });

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) {
      res.status(400).json({ success: false, message: "Email and password required" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }
    if (!user.isActive) {
      res.status(401).json({ success: false, message: "Account deactivated" });
      return;
    }

    await prisma.user.update({ where: { id: user.id }, data: { lastLogin: new Date() } });

    const { password: _, ...safeUser } = user;
    const token = signToken(user.id);
    res.json({ success: true, token, user: safeUser });
  } catch (err) {
    next(err);
  }
};

export const getMe = (req: Request, res: Response): void => {
  const { password: _, ...safeUser } = (req as AuthRequest).user;
  res.json({ success: true, user: safeUser });
};

export const updatePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body as { currentPassword: string; newPassword: string };
    const user = (req as AuthRequest).user;
    if (!(await bcrypt.compare(currentPassword, user.password))) {
      res.status(401).json({ success: false, message: "Current password incorrect" });
      return;
    }
    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({ where: { id: user.id }, data: { password: hashed } });
    const token = signToken(user.id);
    res.json({ success: true, token });
  } catch (err) {
    next(err);
  }
};
