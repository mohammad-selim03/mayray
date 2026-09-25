import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TermsHero } from "@/components/sections/terms/TermsHero";
import { TermsContactCard } from "@/components/sections/terms/TermsContactCard";
import { LegalContent } from "@/components/sections/legal/LegalContent";
import { getCmsDocument } from "@/lib/cms/getCmsDocument";
import { getCmsPageMetadata } from "@/lib/cms/getCmsPageMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getCmsPageMetadata("terms");
}

export default async function TermsPage() {
  const content = await getCmsDocument("terms");
  return (
    <main className="min-h-screen bg-white text-[#1c1917]">
      <div>
        <Navbar />
        <TermsHero content={content.hero} />
        <LegalContent content={content.content} theme="dark" />
        <TermsContactCard content={content.contact} />
        <Footer />
      </div>
    </main>
  );
}
