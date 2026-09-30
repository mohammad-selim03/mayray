import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { Navbar } from "../components/layout/Navbar";
import { Hero } from "../components/sections/Hero";
import { SiteDataProvider } from "../lib/SiteDataContext";
import { getSiteData } from "../lib/getSiteData";
import { getCmsDocument } from "../lib/cms/getCmsDocument";
import { getCmsPageMetadata } from "../lib/cms/getCmsPageMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getCmsPageMetadata("home");
}

const Integrations = dynamic(() => import("../components/sections/Integrations").then((m) => m.Integrations));
const VoiceAgents = dynamic(() => import("../components/sections/VoiceAgents").then((m) => m.VoiceAgents));
const FeaturesA = dynamic(() => import("../components/sections/FeaturesA").then((m) => m.FeaturesA));
const FeaturesA2 = dynamic(() => import("@/components/sections/FeaturesA2").then((m) => m.FeaturesA2));
const AgentAreas = dynamic(() => import("../components/sections/AgentAreas").then((m) => m.AgentAreas));
const OceanSection = dynamic(() => import("../components/sections/OceanSection").then((m) => m.OceanSection));
const Languages = dynamic(() => import("../components/sections/Languages").then((m) => m.Languages));
const IndustryROI = dynamic(() => import("../components/sections/IndustryROI").then((m) => m.IndustryROI));
const Testimonials = dynamic(() => import("../components/sections/Testimonials").then((m) => m.Testimonials));
const FAQ = dynamic(() => import("../components/sections/FAQ").then((m) => m.FAQ));
const Blog = dynamic(() => import("../components/sections/Blog").then((m) => m.Blog));
const Footer = dynamic(() => import("../components/layout/Footer").then((m) => m.Footer));

// v2 sections.
const ScalingV2 = dynamic(() => import("../components/sections/v2/ScalingV2").then((m) => m.ScalingV2));
const DiscoverHours = dynamic(() => import("../components/sections/v2/DiscoverHours").then((m) => m.DiscoverHours));
const MarqueeV2 = dynamic(() => import("../components/sections/v2/MarqueeV2").then((m) => m.MarqueeV2));
const CtaV2 = dynamic(() => import("../components/sections/v2/CtaV2").then((m) => m.CtaV2));

export default async function Home() {
  const [siteData, content] = await Promise.all([getSiteData(), getCmsDocument("home")]);
  return (
    <main className="min-h-screen bg-white">
      <SiteDataProvider value={siteData}>
        <div>
          <Navbar />
          <Hero content={content.hero} />
          <Integrations content={content.integrations} />
          <VoiceAgents content={content.voiceAgents} />
          <FeaturesA content={content.features} />
          <ScalingV2 content={content.scaling} />
          <FeaturesA2 content={content.features} />
          <DiscoverHours />
          <AgentAreas content={content.agentAreas} />
          <OceanSection content={content.ocean} />
          <Languages content={content.languages} />
          <IndustryROI content={content.industryRoi} />
          <Testimonials content={content.testimonials} />
          <MarqueeV2 content={content.marquee} />
          <FAQ content={content.faq} />
          <Blog content={content.blog} />
          <CtaV2 content={content.hero} />
          <Footer />
        </div>
      </SiteDataProvider>
    </main>
  );
}
