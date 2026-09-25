import { MediaKind } from "@prisma/client";

const MB = 1024 * 1024;

export interface MediaRule {
  kind: MediaKind;
  ext: string;
  maxBytes: number;
  label: string;
}

export const MEDIA_RULES: Record<string, MediaRule> = {
  "image/jpeg": { kind: "image", ext: "jpg", maxBytes: 10 * MB, label: "JPEG" },
  "image/png": { kind: "image", ext: "png", maxBytes: 10 * MB, label: "PNG" },
  "image/webp": { kind: "image", ext: "webp", maxBytes: 10 * MB, label: "WebP" },
  "image/avif": { kind: "image", ext: "avif", maxBytes: 10 * MB, label: "AVIF" },
  "image/gif": { kind: "image", ext: "gif", maxBytes: 10 * MB, label: "GIF" },
  "image/svg+xml": { kind: "image", ext: "svg", maxBytes: 1 * MB, label: "SVG" },
  "video/mp4": { kind: "video", ext: "mp4", maxBytes: 50 * MB, label: "MP4" },
  "video/webm": { kind: "video", ext: "webm", maxBytes: 50 * MB, label: "WebM" },
  "audio/mpeg": { kind: "audio", ext: "mp3", maxBytes: 20 * MB, label: "MP3" },
  "audio/mp4": { kind: "audio", ext: "m4a", maxBytes: 20 * MB, label: "M4A" },
  "audio/wav": { kind: "audio", ext: "wav", maxBytes: 20 * MB, label: "WAV" },
  "audio/ogg": { kind: "audio", ext: "ogg", maxBytes: 20 * MB, label: "OGG" },
};

// Other names browsers use for the same audio formats. Accepted as the declared type of an upload;
// the stored type is always the canonical one found by sniffMimeType.
for (const [alias, canonical] of [
  ["audio/mp3", "audio/mpeg"],
  ["audio/x-m4a", "audio/mp4"],
  ["audio/x-wav", "audio/wav"],
  ["audio/wave", "audio/wav"],
  ["audio/vnd.wave", "audio/wav"],
] as const) {
  MEDIA_RULES[alias] = MEDIA_RULES[canonical];
}

export const ALLOWED_MIME_TYPES = Object.keys(MEDIA_RULES);
export const BUCKET_SIZE_LIMIT = 50 * MB;

const ascii = (bytes: Buffer, start: number, end: number) => bytes.subarray(start, end).toString("latin1");

/** Identifies a file from its first bytes. Returns a MIME type from MEDIA_RULES or null. */
export function sniffMimeType(head: Buffer): string | null {
  if (head.length >= 3 && head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff) return "image/jpeg";
  if (head.length >= 8 && head.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return "image/png";
  }
  if (["GIF87a", "GIF89a"].includes(ascii(head, 0, 6))) return "image/gif";
  if (ascii(head, 0, 4) === "RIFF" && ascii(head, 8, 12) === "WEBP") return "image/webp";
  if (ascii(head, 0, 4) === "RIFF" && ascii(head, 8, 12) === "WAVE") return "audio/wav";
  if (ascii(head, 0, 4) === "OggS") return "audio/ogg";
  if (ascii(head, 0, 3) === "ID3") return "audio/mpeg";
  // An MPEG audio frame: 11 sync bits, then a version and a layer that aren't "reserved".
  if (head.length >= 2 && head[0] === 0xff && (head[1] & 0xe0) === 0xe0 && (head[1] & 0x18) !== 0x08 && (head[1] & 0x06) !== 0) {
    return "audio/mpeg";
  }
  if (head.length >= 4 && head[0] === 0x1a && head[1] === 0x45 && head[2] === 0xdf && head[3] === 0xa3) return "video/webm";
  if (ascii(head, 4, 8) === "ftyp") {
    const brand = ascii(head, 8, 12);
    if (brand === "avif" || brand === "avis") return "image/avif";
    if (brand === "M4A " || brand === "M4B ") return "audio/mp4";
    if (brand === "qt  ") return null;
    return "video/mp4";
  }
  const text = head.toString("utf8").replace(/^﻿/, "").trimStart();
  if (/^(<\?xml[\s\S]*?\?>\s*)?(<!--[\s\S]*?-->\s*)*(<!DOCTYPE svg[^>]*>\s*)?<svg[\s>]/i.test(text)) return "image/svg+xml";
  return null;
}

const SVG_DANGER = [
  /<script/i,
  /\son[a-z]+\s*=/i,
  /javascript:/i,
  /<foreignObject/i,
  /<(iframe|embed|object)/i,
  /(xlink:)?href\s*=\s*["']?\s*(https?:|data:|\/\/)/i,
];

export const isSafeSvg = (svg: string): boolean => !SVG_DANGER.some((re) => re.test(svg));
