import { Request, Response, NextFunction } from "express";
export declare const getByPage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getByPageAdmin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const upsert: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const bulkUpsert: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const reorder: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const remove: (req: Request, res: Response, next: NextFunction) => Promise<void>;
