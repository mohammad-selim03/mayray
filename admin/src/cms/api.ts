import api from "../services/api";
import type { DocumentData, ValidationIssue } from "./schema";

export interface CmsDocumentSummary {
  key: string;
  label: string;
  kind: "page" | "global";
  route: string | null;
  version: number;
  updatedAt: string | null;
}

export interface CmsDocument {
  key: string;
  data: DocumentData;
  version: number;
  updatedAt: string | null;
  revalidated?: boolean;
}

export interface CmsVersion {
  id: string;
  version: number;
  restoredFrom: number | null;
  createdAt: string;
  createdBy: string | null;
}

export type MediaKind = "image" | "video" | "audio";

/** Wording and limits per kind; the limits mirror backend/src/cms/mediaRules.ts. */
export const KIND_INFO: Record<MediaKind, { article: string; plural: string; formats: string; wrongType: string }> = {
  image: { article: "an image", plural: "Images", formats: "JPEG, PNG, WebP, AVIF, GIF or SVG up to 10 MB", wrongType: "Choose an image file" },
  video: { article: "a video", plural: "Videos", formats: "MP4 or WebM up to 50 MB", wrongType: "Choose an MP4 or WebM video" },
  audio: { article: "an audio file", plural: "Audio", formats: "MP3, M4A, WAV or OGG up to 20 MB", wrongType: "Choose an MP3, M4A, WAV or OGG file" },
};

export interface MediaItem {
  id: string;
  url: string;
  path: string;
  filename: string;
  mimeType: string;
  size: number;
  kind: MediaKind;
  width: number | null;
  height: number | null;
  alt: string;
  createdAt: string;
}

export interface MediaPage {
  items: MediaItem[];
  total: number;
  page: number;
  limit: number;
}

export const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined) ?? "http://localhost:3000";

export const cmsApi = {
  list: () => api.get<{ documents: CmsDocumentSummary[] }>("/cms/documents").then((r) => r.data.documents),
  get: (key: string) => api.get<{ document: CmsDocument }>(`/cms/documents/${key}`).then((r) => r.data.document),
  publish: (key: string, data: DocumentData, version: number) =>
    api.put<{ document: CmsDocument }>(`/cms/documents/${key}`, { data, version }).then((r) => r.data.document),
  versions: (key: string) =>
    api.get<{ versions: CmsVersion[] }>(`/cms/documents/${key}/versions`).then((r) => r.data.versions),
  restore: (key: string, versionId: string) =>
    api.post<{ document: CmsDocument }>(`/cms/documents/${key}/versions/${versionId}/restore`).then((r) => r.data.document),
};

export const mediaApi = {
  list: (params: { kind?: MediaKind; search?: string; page?: number; limit?: number }) =>
    api.get<MediaPage>("/media", { params }).then((r) => r.data),
  updateAlt: (id: string, alt: string) => api.patch<{ media: MediaItem }>(`/media/${id}`, { alt }).then((r) => r.data.media),
  remove: (id: string) => api.delete(`/media/${id}`),
};

/** Pulls the per-field issues out of a 422 response, if that's what `error` is. */
export function validationIssues(error: unknown): ValidationIssue[] | null {
  const res = (error as { response?: { status?: number; data?: { issues?: ValidationIssue[] } } })?.response;
  return res?.status === 422 && Array.isArray(res.data?.issues) ? res.data.issues : null;
}

export function errorMessage(error: unknown, fallback = "Something went wrong. Try again."): string {
  const res = (error as { response?: { data?: { message?: string } } })?.response;
  return res?.data?.message ?? (error instanceof Error && error.message ? error.message : fallback);
}

export const ACCEPT = {
  image: "image/jpeg,image/png,image/webp,image/avif,image/gif,image/svg+xml",
  video: "video/mp4,video/webm",
  audio: "audio/mpeg,audio/mp4,audio/x-m4a,audio/wav,audio/x-wav,audio/ogg,.mp3,.m4a,.wav,.ogg",
} as const;

const RESIZABLE = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_EDGE = 2400;

interface Prepared {
  file: File;
  width?: number;
  height?: number;
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("This image couldn't be read. Try another file."));
    };
    img.src = url;
  });
}

function videoDimensions(file: File): Promise<{ width?: number; height?: number }> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      resolve({ width: video.videoWidth || undefined, height: video.videoHeight || undefined });
    };
    video.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({});
    };
    video.src = url;
  });
}

/** Scales large photos down and re-encodes JPEG/PNG as WebP; other formats pass through. */
async function prepare(file: File): Promise<Prepared> {
  if (file.type.startsWith("video/")) return { file, ...(await videoDimensions(file)) };
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") return { file };

  const img = await loadImage(file);
  const { naturalWidth: w, naturalHeight: h } = img;
  if (!RESIZABLE.has(file.type)) return { file, width: w, height: h };

  const scale = Math.min(1, MAX_EDGE / Math.max(w, h));
  const width = Math.round(w * scale);
  const height = Math.round(h * scale);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.86));

  if (!blob || (scale === 1 && blob.size >= file.size)) return { file, width: w, height: h };
  const name = file.name.replace(/\.[^.]+$/, "") + ".webp";
  return { file: new File([blob], name, { type: "image/webp" }), width, height };
}

function putWithProgress(url: string, file: File, contentType: string, onProgress?: (pct: number) => void) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-Type", contentType);
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress?.(Math.round((e.loaded / e.total) * 100));
    xhr.onload = () => (xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error("Upload failed. Try again.")));
    xhr.onerror = () => reject(new Error("Upload failed. Check your connection and try again."));
    xhr.send(file);
  });
}

export async function uploadMedia(
  original: File,
  opts: { alt?: string; onProgress?: (pct: number) => void } = {}
): Promise<MediaItem> {
  const { file, width, height } = await prepare(original);
  const start = await api.post<{ upload: { url: string; path: string; contentType: string } }>("/media/uploads", {
    filename: file.name,
    mimeType: file.type,
    size: file.size,
  });
  const { url, path, contentType } = start.data.upload;
  await putWithProgress(url, file, contentType, opts.onProgress);
  const done = await api.post<{ media: MediaItem }>("/media", { path, filename: file.name, alt: opts.alt ?? "", width, height });
  return done.data.media;
}

export const formatBytes = (bytes: number) =>
  bytes >= 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
