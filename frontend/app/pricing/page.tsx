import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getCmsDocument } from "@/lib/cms/getCmsDocument";
import { getCmsPageMetadata } from "@/lib/cms/getCmsPageMetadata";
import { PricingCards } from "@/components/sections/PricingCards";
import { TrustedBrands } from "@/components/sections/TrustedBrands";
import { PricingFAQ } from "@/components/sections/PricingFAQ";
import { PricingCTABanner } from "@/components/sections/PricingCTABanner";

export async function generateMetadata(): Promise<Metadata> {
  return getCmsPageMetadata("pricing");
}

export default async function PricingPage() {
  const content = await getCmsDocument("pricing");
  return (
    <main className="min-h-screen bg-white">
      <div className="px-5">
        <Navbar />
        <PricingCards header={content.header} plans={content.plans} />
        <TrustedBrands />
        <PricingFAQ content={content.faq} />
      </div>
      <PricingCTABanner />
      <Footer />
    </main>
  );
}
