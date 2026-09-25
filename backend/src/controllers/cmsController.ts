import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import { AuthRequest } from "../types";
import { logAudit } from "../utils/auditLog";
import { revalidateFrontend } from "../utils/revalidate";
import { sanitizeRichText } from "../cms/sanitize";
import { DOCUMENTS, cacheTag, getDocumentDef, validateDocument, type DocumentData, type DocumentDef } from "../cms/schema";

class VersionConflict extends Error {}

const notFound = (res: Response) => res.status(404).json({ success: false, message: "Unknown content document" });

/**
 * Stores `data` as the document's next version (and in its history). With `expectedVersion`, fails with
 * VersionConflict if someone else published in between. `userId` is null for the seed script.
 */
export function writeDocumentVersion(
  def: DocumentDef,
  data: DocumentData,
  expectedVersion: number | null,
  userId: string | null,
  restoredFrom?: number
) {
  return prisma.$transaction(async (tx) => {
    const current = await tx.cmsDocument.findUnique({ where: { key: def.key }, select: { version: true } });
    const currentVersion = current?.version ?? 0;
    if (expectedVersion !== null && expectedVersion !== currentVersion) throw new VersionConflict();
    const version = currentVersion + 1;
    const json = data as Prisma.InputJsonValue;

    if (current) {
      const { count } = await tx.cmsDocument.updateMany({
        where: { key: def.key, version: currentVersion },
        data: { data: json, version, updatedById: userId },
      });
      if (count === 0) throw new VersionConflict();
    } else {
      await tx.cmsDocument.create({ data: { key: def.key, data: json, version, updatedById: userId } });
    }
    await tx.cmsVersion.create({
      data: { documentKey: def.key, version, data: json, createdById: userId, restoredFrom },
    });
    return tx.cmsDocument.findUniqueOrThrow({ where: { key: def.key } });
  });
}

async function publish(
  def: DocumentDef,
  data: DocumentData,
  expectedVersion: number | null,
  userId: string,
  restoredFrom?: number
) {
  const saved = await writeDocumentVersion(def, data, expectedVersion, userId, restoredFrom);
  const revalidated = await revalidateFrontend([cacheTag(def.key)]);
  return { key: saved.key, data: saved.data, version: saved.version, updatedAt: saved.updatedAt, revalidated };
}

const isUniqueViolation = (err: unknown) =>
  err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002";

export const listDocuments = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const rows = await prisma.cmsDocument.findMany({ select: { key: true, version: true, updatedAt: true } });
    const byKey = new Map(rows.map((r) => [r.key, r]));
    const documents = DOCUMENTS.map((d) => ({
      key: d.key,
      label: d.label,
      kind: d.kind,
      route: d.route ?? null,
      version: byKey.get(d.key)?.version ?? 0,
      updatedAt: byKey.get(d.key)?.updatedAt ?? null,
    }));
    res.json({ success: true, documents });
  } catch (err) {
    next(err);
  }
};

export const getDocument = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const def = getDocumentDef(req.params.key);
    if (!def) {
      notFound(res);
      return;
    }
    const row = await prisma.cmsDocument.findUnique({ where: { key: def.key } });
    const { data } = validateDocument(def, row?.data);
    res.json({
      success: true,
      document: { key: def.key, data, version: row?.version ?? 0, updatedAt: row?.updatedAt ?? null },
    });
  } catch (err) {
    next(err);
  }
};

export const saveDocument = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const def = getDocumentDef(req.params.key);
    if (!def) {
      notFound(res);
      return;
    }
    const { data: input, version } = req.body ?? {};
    if (typeof version !== "number" || !Number.isInteger(version) || version < 0) {
      res.status(400).json({ success: false, message: "Include the version number you loaded" });
      return;
    }
    const { data, issues } = validateDocument(def, input, { sanitizeRichText });
    if (issues.length > 0) {
      res.status(422).json({ success: false, message: "Some fields need attention", issues });
      return;
    }

    const user = (req as AuthRequest).user;
    const document = await publish(def, data, version, user.id);
    logAudit(user.id, "publish", "cms_document", def.key, { version: document.version }, req.ip);
    res.json({ success: true, document });
  } catch (err) {
    if (err instanceof VersionConflict || isUniqueViolation(err)) {
      res.status(409).json({
        success: false,
        message: "This content was published from somewhere else. Reload to get the latest version.",
      });
      return;
    }
    next(err);
  }
};

export const listVersions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const def = getDocumentDef(req.params.key);
    if (!def) {
      notFound(res);
      return;
    }
    const versions = await prisma.cmsVersion.findMany({
      where: { documentKey: def.key },
      orderBy: { version: "desc" },
      take: 50,
      select: { id: true, version: true, restoredFrom: true, createdAt: true, createdById: true },
    });
    const userIds = [...new Set(versions.map((v) => v.createdById).filter((id): id is string => !!id))];
    const users = await prisma.user.findMany({ where: { id: { in: userIds } }, select: { id: true, name: true } });
    const names = new Map(users.map((u) => [u.id, u.name]));
    res.json({
      success: true,
      versions: versions.map(({ createdById, ...v }) => ({ ...v, createdBy: createdById ? names.get(createdById) ?? null : null })),
    });
  } catch (err) {
    next(err);
  }
};

export const restoreVersion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const def = getDocumentDef(req.params.key);
    if (!def) {
      notFound(res);
      return;
    }
    const snapshot = await prisma.cmsVersion.findFirst({ where: { id: req.params.versionId, documentKey: def.key } });
    if (!snapshot) {
      res.status(404).json({ success: false, message: "Version not found" });
      return;
    }
    // Fields added or changed since the snapshot fall back to their defaults.
    const { data } = validateDocument(def, snapshot.data, { sanitizeRichText });
    const user = (req as AuthRequest).user;
    const document = await publish(def, data, null, user.id, snapshot.version);
    logAudit(user.id, "restore", "cms_document", def.key, { version: document.version, restoredFrom: snapshot.version }, req.ip);
    res.json({ success: true, document });
  } catch (err) {
    if (err instanceof VersionConflict || isUniqueViolation(err)) {
      res.status(409).json({ success: false, message: "Content changed while restoring. Try again." });
      return;
    }
    next(err);
  }
};
