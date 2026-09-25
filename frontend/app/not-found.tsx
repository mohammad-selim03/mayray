import Link from "next/link";
import { getCmsDocument } from "@/lib/cms/getCmsDocument";

export default async function NotFound() {
  const { content } = await getCmsDocument("not-found");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fafaf9] px-4 text-center">
      <p className="text-[14px] font-semibold uppercase tracking-widest text-[#13a0e7]">{content.badge}</p>
      <h1 className="mt-4 text-[48px] font-bold leading-tight text-[#1c1917] sm:text-[64px]">{content.title}</h1>
      <p className="mt-4 max-w-[440px] text-[16px] leading-[1.6] text-[#78716c]">{content.description}</p>
      <Link
        href={content.button.href}
        {...(content.button.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#13a0e7] px-8 py-3 text-[15px] font-semibold text-white transition hover:bg-[#0e8fd0]"
      >
        {content.button.label}
      </Link>
    </div>
  );
}
