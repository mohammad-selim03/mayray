const FIGMA_ASSET_PREFIX = "https://www.figma.com/api/mcp/asset/";

export const BLOCKED_ASSET_FALLBACK = "/window.svg";

export function disableFigmaAssetUrl(src: string, fallback = BLOCKED_ASSET_FALLBACK): string {
  if (src.startsWith(FIGMA_ASSET_PREFIX)) {
    return fallback;
  }

  return src;
}

export function sanitizeFigmaAssets<T>(value: T, fallback = BLOCKED_ASSET_FALLBACK): T {
  if (typeof value === "string") {
    return disableFigmaAssetUrl(value, fallback) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeFigmaAssets(item, fallback)) as T;
  }

  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).map(([key, entryValue]) => [
      key,
      sanitizeFigmaAssets(entryValue, fallback),
    ]);

    return Object.fromEntries(entries) as T;
  }

  return value;
}

export function sanitizeFigmaAssetsInPlace<T>(value: T, fallback = BLOCKED_ASSET_FALLBACK): T {
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i += 1) {
      value[i] = sanitizeFigmaAssetsInPlace(value[i], fallback);
    }
    return value;
  }

  if (value !== null && typeof value === "object") {
    const record = value as Record<string, unknown>;
    for (const key of Object.keys(record)) {
      record[key] = sanitizeFigmaAssetsInPlace(record[key], fallback);
    }
    return value;
  }

  if (typeof value === "string") {
    return disableFigmaAssetUrl(value, fallback) as T;
  }

  return value;
}
