import { randomUUID } from "crypto";
import path from "path";
import { Request, Response, NextFunction } from "express";
import { MediaKind, Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import supabase, { STORAGE_BUCKET } from "../config/supabase";
import { AuthRequest } from "../types";
import { logAudit } from "../utils/auditLog";
import { MEDIA_RULES, isSafeSvg, sniffMimeType } from "../cms/mediaRules";

const MB = 1024 * 1024;
// cms/<year>/<month>/<uuid>/<readable-name>.<ext>: unique, while the URL keeps the original file name.
const PATH_PATTERN = /^cms\/\d{4}\/\d{2}\/[0-9a-f-]{36}\/[a-z0-9-]{1,60}\.(jpg|png|webp|avif|gif|svg|mp4|webm|mp3|m4a|wav|ogg)$/;
const KINDS: readonly string[] = Object.values(MediaKind);

const slugify = (name: unknown) =>
  (typeof name === "string" ? path.parse(name).name : "")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/, "") || "file";

const cleanFilename = (name: unknown) =>
  typeof name === "string"
    ? path.basename(name).replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, 200) || "file"
    : "file";

const cleanAlt = (alt: unknown) => (typeof alt === "string" ? alt.trim().slice(0, 300) : "");

const cleanDimension = (n: unknown) =>
  typeof n === "number" && Number.isInteger(n) && n > 0 && n <= 20000 ? n : null;

const publicUrl = (objectPath: string) => supabase.storage.from(STORAGE_BUCKET).getPublicUrl(objectPath).data.publicUrl;

async function readHead(url: string, bytes: number): Promise<Buffer> {
  const res = await fetch(url, { headers: { Range: `bytes=0-${bytes - 1}` }, signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`Could not read uploaded file (${res.status})`);
  return Buffer.from(await res.arrayBuffer()).subarray(0, bytes);
}

async function removeObject(objectPath: string) {
  await supabase.storage.from(STORAGE_BUCKET).remove([objectPath]);
}

export const createUpload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { filename, mimeType, size } = req.body ?? {};
    const rule = typeof mimeType === "string" ? MEDIA_RULES[mimeType] : undefined;
    if (!rule) {
      res.status(400).json({
        success: false,
        message: "Upload a JPEG, PNG, WebP, AVIF, GIF or SVG image, an MP4 or WebM video, or an MP3, M4A, WAV or OGG audio file",
      });
      return;
    }
    if (typeof size !== "number" || size <= 0 || size > rule.maxBytes) {
      res.status(400).json({ success: false, message: `${rule.label} files must be ${rule.maxBytes / MB} MB or smaller` });
      return;
    }
    const now = new Date();
    const month = String(now.getUTCMonth() + 1).padStart(2, "0");
    const objectPath = `cms/${now.getUTCFullYear()}/${month}/${randomUUID()}/${slugify(filename)}.${rule.ext}`;
    const { data, error } = await supabase.storage.from(STORAGE_BUCKET).createSignedUploadUrl(objectPath);
    if (error || !data) throw error ?? new Error("Could not create upload URL");
    res.json({ success: true, upload: { url: data.signedUrl, path: objectPath, contentType: mimeType } });
  } catch (err) {
    next(err);
  }
};

export const completeUpload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { path: objectPath, filename, alt, width, height } = req.body ?? {};
    if (typeof objectPath !== "string" || !PATH_PATTERN.test(objectPath)) {
      res.status(400).json({ success: false, message: "Unknown upload" });
      return;
    }
    const existing = await prisma.media.findUnique({ where: { path: objectPath } });
    if (existing) {
      res.json({ success: true, media: existing });
      return;
    }

    const dir = path.posix.dirname(objectPath);
    const name = path.posix.basename(objectPath);
    const { data: listing, error } = await supabase.storage.from(STORAGE_BUCKET).list(dir, { search: name, limit: 1 });
    const object = listing?.find((o) => o.name === name);
    if (error || !object) {
      res.status(400).json({ success: false, message: "The file didn't finish uploading. Try again." });
      return;
    }

    const url = publicUrl(objectPath);
    const declared = MEDIA_RULES[`${object.metadata?.mimetype ?? ""}`];
    const head = await readHead(url, 512);
    let sniffed = sniffMimeType(head);
    // Many M4A files carry a generic MP4 brand, so trust the declared audio type for those.
    if (sniffed === "video/mp4" && declared?.kind === "audio") sniffed = "audio/mp4";
    const rule = sniffed ? MEDIA_RULES[sniffed] : undefined;
    const size = Number(object.metadata?.size ?? 0);

    const reject = async (message: string) => {
      await removeObject(objectPath);
      res.status(400).json({ success: false, message });
    };
    if (!rule || !sniffed || (declared && declared.kind !== rule.kind)) {
      await reject("This file's contents don't match a supported image, video or audio format.");
      return;
    }
    if (size > rule.maxBytes) {
      await reject(`${rule.label} files must be ${rule.maxBytes / MB} MB or smaller`);
      return;
    }
    if (sniffed === "image/svg+xml") {
      const svg = (await readHead(url, rule.maxBytes)).toString("utf8");
      if (!isSafeSvg(svg)) {
        await reject("This SVG contains scripts or external links. Export a plain SVG and try again.");
        return;
      }
    }

    const user = (req as AuthRequest).user;
    const media = await prisma.media.create({
      data: {
        path: objectPath,
        url,
        filename: cleanFilename(filename),
        mimeType: sniffed,
        size,
        kind: rule.kind,
        width: cleanDimension(width),
        height: cleanDimension(height),
        alt: cleanAlt(alt),
        uploadedById: user.id,
      },
    });
    logAudit(user.id, "upload", "media", media.id, { path: objectPath, size }, req.ip);
    res.status(201).json({ success: true, media });
  } catch (err) {
    next(err);
  }
};

export const listMedia = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = Math.max(1, parseInt(String(req.query.page ?? "1"), 10) || 1);
    const limit = Math.min(60, Math.max(1, parseInt(String(req.query.limit ?? "30"), 10) || 30));
    const search = typeof req.query.search === "string" ? req.query.search.trim() : "";
    const kind = typeof req.query.kind === "string" && KINDS.includes(req.query.kind) ? (req.query.kind as MediaKind) : undefined;

    const where: Prisma.MediaWhereInput = {
      ...(kind ? { kind } : {}),
      ...(search
        ? { OR: [{ filename: { contains: search, mode: "insensitive" } }, { alt: { contains: search, mode: "insensitive" } }] }
        : {}),
    };
    const [items, total] = await Promise.all([
      prisma.media.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * limit, take: limit }),
      prisma.media.count({ where }),
    ]);
    res.json({ success: true, items, total, page, limit });
  } catch (err) {
    next(err);
  }
};

export const updateMedia = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const media = await prisma.media.update({ where: { id: req.params.id }, data: { alt: cleanAlt(req.body?.alt) } });
    res.json({ success: true, media });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      res.status(404).json({ success: false, message: "File not found" });
      return;
    }
    next(err);
  }
};

export const deleteMedia = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const media = await prisma.media.findUnique({ where: { id: req.params.id } });
    if (!media) {
      res.status(404).json({ success: false, message: "File not found" });
      return;
    }
    await removeObject(media.path);
    await prisma.media.delete({ where: { id: media.id } });
    logAudit((req as AuthRequest).user.id, "delete", "media", media.id, { path: media.path }, req.ip);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
