const TIMEOUT_MS = 4000;
// A missed refresh leaves the site stale for up to 5 minutes, so one slow or failed attempt gets a
// patient retry in the background (e.g. a dev server compiling /api/revalidate on first use).
const RETRY_TIMEOUT_MS = 30000;

async function post(tags: string[], timeoutMs: number): Promise<boolean> {
  const secret = process.env.REVALIDATE_SECRET;
  const siteUrl = process.env.FRONTEND_URL;
  if (!secret || !siteUrl || tags.length === 0) return false;

  try {
    const res = await fetch(`${siteUrl.replace(/\/$/, "")}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-revalidate-secret": secret },
      body: JSON.stringify({ tags }),
      signal: AbortSignal.timeout(timeoutMs),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Asks the Next.js site to drop cached data for `tags`. Resolves false instead of throwing; when
 * the first attempt fails, a retry keeps going in the background after this resolves.
 */
export async function revalidateFrontend(tags: string[]): Promise<boolean> {
  if (await post(tags, TIMEOUT_MS)) return true;
  if (process.env.REVALIDATE_SECRET && process.env.FRONTEND_URL && tags.length > 0) {
    void post(tags, RETRY_TIMEOUT_MS).then((ok) =>
      console.log(`[revalidate] retry for ${tags.join(", ")} ${ok ? "succeeded" : "failed"}`)
    );
  }
  return false;
}
