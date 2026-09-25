"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fafaf9] px-4 text-center">
      <p className="text-[14px] font-semibold uppercase tracking-widest text-red-500">Error</p>
      <h1 className="mt-4 text-[48px] font-bold leading-tight text-[#1c1917] sm:text-[64px]">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-[440px] text-[16px] leading-[1.6] text-[#78716c]">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#13a0e7] px-8 py-3 text-[15px] font-semibold text-white transition hover:bg-[#0e8fd0]"
      >
        Try again
      </button>
    </div>
  );
}
