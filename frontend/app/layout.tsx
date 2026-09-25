import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "../components/ui/SmoothScroll";
import { CmsGlobalsProvider } from "../lib/cms/CmsGlobalsContext";
import { SITE_URL, getCmsGlobals } from "../lib/cms/getCmsGlobals";
import { getCmsDocument } from "../lib/cms/getCmsDocument";

const interSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getCmsDocument("seo-defaults");
  const images = site.shareImage ? [{ url: site.shareImage.url, alt: site.shareImage.alt }] : undefined;
  return {
    metadataBase: new URL(SITE_URL),
    title: site.defaultTitle,
    description: site.description,
    openGraph: { siteName: site.siteName, type: "website", images },
    twitter: { card: images ? "summary_large_image" : "summary", site: site.xHandle || undefined, images },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globals = await getCmsGlobals();
  return (
    <html
      lang="en"
      className={`${interSans.variable} h-full antialiased`}
    >
      <body>
        <CmsGlobalsProvider value={globals}>
          <SmoothScroll>{children}</SmoothScroll>
        </CmsGlobalsProvider>
      </body>
    </html>
  );
}
