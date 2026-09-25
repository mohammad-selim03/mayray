import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  statusCode?: number;
  code?: number;
  keyValue?: Record<string, unknown>;
  errors?: Record<string, { message: string }>;
}

const errorHandler = (err: AppError, _req: Request, res: Response, _next: NextFunction): void => {
  let status = err.statusCode ?? 500;
  let message = err.message ?? "Internal Server Error";

  if (err.name === "CastError") {
    status = 400;
    message = "Invalid ID format";
  }
  if (err.code === 11000 && err.keyValue) {
    status = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  }
  if (err.name === "ValidationError" && err.errors) {
    status = 400;
    message = Object.values(err.errors).map((e) => e.message).join(", ");
  }

  if (process.env.NODE_ENV === "development") console.error(err);

  res.status(status).json({ success: false, message });
};

export default errorHandler;
