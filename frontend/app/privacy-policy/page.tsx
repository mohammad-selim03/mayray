import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { PrivacyHero } from "@/components/sections/privacy/PrivacyHero";
import { PrivacyContent } from "@/components/sections/privacy/PrivacyContent";
import { PrivacyContactCard } from "@/components/sections/privacy/PrivacyContactCard";
import { Footer } from "@/components/layout/Footer";
import { SiteDataProvider, EMPTY_SITE_DATA } from "@/lib/SiteDataContext";
import { getPageMetadata } from "@/lib/getPageMetadata";
import { getPageContent } from "@/lib/getPageContent";
import { PageContentProvider } from "@/lib/PageContentContext";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("privacy");
}

export default async function PrivacyPolicyPage() {
  const pageContent = await getPageContent("privacy");

  return (
    <main className="min-h-screen bg-white text-[#1c1917]">
      <SiteDataProvider value={EMPTY_SITE_DATA}>
        <PageContentProvider value={pageContent}>
          <div>
            <Navbar />
            {/* <PrivacyHero /> */}
            <PrivacyContent />
            {/* <PrivacyContactCard /> */}
            <Footer />
          </div>
        </PageContentProvider>
      </SiteDataProvider>
    </main>
  );
}
