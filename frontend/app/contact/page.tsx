import type { Metadata } from "next";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getCmsDocument } from "@/lib/cms/getCmsDocument";
import { getCmsPageMetadata } from "@/lib/cms/getCmsPageMetadata";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactOffice } from "@/components/sections/contact/ContactOffice";
import { PricingCTABanner } from "@/components/sections/PricingCTABanner";

// Only this page uses Plus Jakarta Sans (office emails + WhatsApp link in the
// design), so it is loaded here rather than in the root layout.
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  return getCmsPageMetadata("contact");
}

export default async function ContactPage() {
  const content = await getCmsDocument("contact");

  return (
    <main className={`${plusJakarta.variable} relative min-h-screen bg-[#f4f4f5]`}>
      {/* Decorative backdrop washes, exported from the design. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[822px] overflow-hidden">
        <Image src="/contact/bg-top.webp" alt="" fill sizes="100vw" className="object-cover object-top" priority />
      </div>

      <div className="relative z-10 px-5">
        <Navbar />
        <ContactHero content={content.hero} />

        <section className="mx-auto w-full max-w-[1170px] px-4 pt-[84px] sm:px-6 lg:px-0">
          <div className="flex flex-col gap-[30px]">
            <ContactForm content={content.form} />
            <ContactOffice content={content.office} />
          </div>
        </section>

        <div className="relative z-0 -mx-5 pt-[120px]">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[822px] overflow-hidden">
            <Image src="/contact/bg-bottom.webp" alt="" fill sizes="100vw" className="object-cover object-bottom" />
          </div>
          <PricingCTABanner />
          <Footer />
        </div>
      </div>
    </main>
  );
}
