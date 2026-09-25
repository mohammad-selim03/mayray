import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AutomotiveIndustryPage } from "@/components/sections/automotive/AutomotiveIndustryPage";
import { PricingCTABanner } from "@/components/sections/PricingCTABanner";
import { getCmsDocument } from "@/lib/cms/getCmsDocument";
import { getCmsPageMetadata } from "@/lib/cms/getCmsPageMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getCmsPageMetadata("automotive");
}

export default async function AutomotivePage() {
  const content = await getCmsDocument("automotive");

  return (
    <main className="relative min-h-screen bg-[#f4f4f5] text-[#18181b]">
      {/* Decorative backdrop washes, exported from the design. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[822px] overflow-hidden">
        <Image src="/automotive/bg-top.webp" alt="" fill sizes="100vw" className="object-cover object-top" priority />
      </div>

      <div className="relative z-10 px-5">
        <Navbar />
        <AutomotiveIndustryPage content={content} />

        <div className="relative z-0 -mx-5 pt-[120px]">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[822px] overflow-hidden">
            <Image src="/automotive/bg-bottom.webp" alt="" fill sizes="100vw" className="object-cover object-bottom" />
          </div>
          <PricingCTABanner />
          <Footer />
        </div>
      </div>
    </main>
  );
}
