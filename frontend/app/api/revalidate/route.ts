import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";

const TAG_PATTERN = /^cms:[a-z0-9-]+$/;

const matches = (given: string, expected: string) => {
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
};

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || !matches(request.headers.get("x-revalidate-secret") ?? "", secret)) {
    return Response.json({ revalidated: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const tags: string[] = Array.isArray(body?.tags)
    ? body.tags.filter((t: unknown): t is string => typeof t === "string" && TAG_PATTERN.test(t)).slice(0, 20)
    : [];
  if (tags.length === 0) {
    return Response.json({ revalidated: false, message: "No valid tags" }, { status: 400 });
  }

  // Webhook callers need the next request to see fresh data, so expire immediately.
  for (const tag of tags) revalidateTag(tag, { expire: 0 });
  return Response.json({ revalidated: true, tags });
}
