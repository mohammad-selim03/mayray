import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LegalContent } from "@/components/sections/legal/LegalContent";
import { getCmsDocument } from "@/lib/cms/getCmsDocument";
import { getCmsPageMetadata } from "@/lib/cms/getCmsPageMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getCmsPageMetadata("privacy");
}

export default async function PrivacyPolicyPage() {
  const content = await getCmsDocument("privacy");
  return (
    <main className="min-h-screen bg-white text-[#1c1917]">
      <div>
        <Navbar />
        <LegalContent content={content.content} theme="light" />
        <Footer />
      </div>
    </main>
  );
}
