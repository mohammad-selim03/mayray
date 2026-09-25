import prisma from "../config/prisma";
import { Prisma } from "@prisma/client";

export const logAudit = (
  userId: string | null,
  action: string,
  resource: string,
  resourceId?: string,
  details?: Record<string, unknown>,
  ipAddress?: string,
): void => {
  prisma.auditLog
    .create({ data: { userId, action, resource, resourceId, details: details as Prisma.InputJsonValue, ipAddress } })
    .catch(() => {});
};
