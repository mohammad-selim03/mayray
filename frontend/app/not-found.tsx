import Link from "next/link";
import { getPageContent } from "@/lib/getPageContent";

export default async function NotFound() {
  const content = await getPageContent("not_found");
  const nf = content["not_found"] || {};

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fafaf9] px-4 text-center">
      <p className="text-[14px] font-semibold uppercase tracking-widest text-[#13a0e7]">{nf["badge"] || "404"}</p>
      <h1 className="mt-4 text-[48px] font-bold leading-tight text-[#1c1917] sm:text-[64px]">
        {nf["title"] || "Page not found"}
      </h1>
      <p className="mt-4 max-w-[440px] text-[16px] leading-[1.6] text-[#78716c]">
        {nf["description"] || "The page you're looking for doesn't exist or has been moved."}
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#13a0e7] px-8 py-3 text-[15px] font-semibold text-white transition hover:bg-[#0e8fd0]"
      >
        {nf["button_label"] || "Back to home"}
      </Link>
    </div>
  );
}
