import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { TermsHero } from "@/components/sections/terms/TermsHero";
import { TermsContent } from "@/components/sections/terms/TermsContent";
import { TermsContactCard } from "@/components/sections/terms/TermsContactCard";
import { Footer } from "@/components/layout/Footer";
import { SiteDataProvider, EMPTY_SITE_DATA } from "@/lib/SiteDataContext";
import { getPageMetadata } from "@/lib/getPageMetadata";
import { getPageContent } from "@/lib/getPageContent";
import { PageContentProvider } from "@/lib/PageContentContext";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("terms");
}

export default async function TermsPage() {
  const pageContent = await getPageContent("terms");

  return (
    <main className="min-h-screen bg-white text-[#1c1917]">
      <SiteDataProvider value={EMPTY_SITE_DATA}>
        <PageContentProvider value={pageContent}>
          <div>
            <Navbar />
            <TermsHero />
            <TermsContent />
            <TermsContactCard />
            <Footer />
          </div>
        </PageContentProvider>
      </SiteDataProvider>
    </main>
  );
}
