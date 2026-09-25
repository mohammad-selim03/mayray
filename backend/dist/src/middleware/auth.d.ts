import { Request, Response, NextFunction } from "express";
import { UserRole } from "@prisma/client";
export declare const protect: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const restrictTo: (...roles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => void;
