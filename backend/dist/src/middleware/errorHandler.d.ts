import { Request, Response, NextFunction } from "express";
interface AppError extends Error {
    statusCode?: number;
    code?: number;
    keyValue?: Record<string, unknown>;
    errors?: Record<string, {
        message: string;
    }>;
}
declare const errorHandler: (err: AppError, _req: Request, res: Response, _next: NextFunction) => void;
export default errorHandler;
