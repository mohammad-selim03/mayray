import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRole } from "@prisma/client";
import prisma from "../config/prisma";
import { AuthRequest } from "../types";

interface JwtPayload {
  id: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    res.status(401).json({ success: false, message: "Not authenticated" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user || !user.isActive) {
      res.status(401).json({ success: false, message: "User not found or inactive" });
      return;
    }
    (req as AuthRequest).user = user;
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const restrictTo = (...roles: UserRole[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    if (!roles.includes((req as AuthRequest).user.role)) {
      res.status(403).json({ success: false, message: "Access denied" });
      return;
    }
    next();
  };
