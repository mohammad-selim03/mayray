import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getPageMetadata } from "@/lib/getPageMetadata";
import { getPageContent } from "@/lib/getPageContent";
import { PageContentProvider } from "@/lib/PageContentContext";
import { PricingCards } from "@/components/sections/PricingCards";
import { TrustedBrands } from "@/components/sections/TrustedBrands";
import { PricingFAQ } from "@/components/sections/PricingFAQ";
import { PricingCTABanner } from "@/components/sections/PricingCTABanner";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("pricing");
}

export default async function PricingPage() {
  const pageContent = await getPageContent("pricing");

  return (
    <main className="min-h-screen bg-white">
      <PageContentProvider value={pageContent}>
        <div className="px-5">
          <Navbar />
          <PricingCards />
          <TrustedBrands />
          <PricingFAQ />
        </div>
        <PricingCTABanner />
        <Footer />
      </PageContentProvider>
    </main>
  );
}
