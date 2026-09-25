import { Request } from "express";
import { User } from "@prisma/client";
export interface AuthRequest extends Request {
    user: User;
}
export interface SendEmailOptions {
    to: string;
    subject: string;
    html?: string;
    text?: string;
}
export interface PaginationQuery {
    page?: string;
    limit?: string;
    search?: string;
}
