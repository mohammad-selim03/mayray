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

const Integrations = dynamic(() => import("../components/sections/Integrations").then(mod => mod.Integrations));
const VoiceAgents = dynamic(() => import("../components/sections/VoiceAgents").then(mod => mod.VoiceAgents));
const FeaturesA = dynamic(() => import("../components/sections/FeaturesA").then(mod => mod.FeaturesA));
const Scaling = dynamic(() => import("../components/sections/Scaling").then(mod => mod.Scaling));
const FeaturesA2 = dynamic(() => import("@/components/sections/FeaturesA2").then(mod => mod.FeaturesA2));

const AgentAreas = dynamic(() => import("../components/sections/AgentAreas").then(mod => mod.AgentAreas));
const OceanSection = dynamic(() => import("../components/sections/OceanSection").then(mod => mod.OceanSection));
const Languages = dynamic(() => import("../components/sections/Languages").then(mod => mod.Languages));
const IndustryROI = dynamic(() => import("../components/sections/IndustryROI").then(mod => mod.IndustryROI));
const Testimonials = dynamic(() => import("../components/sections/Testimonials").then(mod => mod.Testimonials));
const Marquee = dynamic(() => import("../components/sections/Marquee").then(mod => mod.Marquee));
const FAQ = dynamic(() => import("../components/sections/FAQ").then(mod => mod.FAQ));
const Blog = dynamic(() => import("../components/sections/Blog").then(mod => mod.Blog));
const Footer = dynamic(() => import("../components/layout/Footer").then(mod => mod.Footer));

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
          <Scaling content={content.scaling} />
          <FeaturesA2 content={content.features} />
          <AgentAreas content={content.agentAreas} />
          <OceanSection content={content.ocean} />
          <Languages content={content.languages} />
          <IndustryROI content={content.industryRoi} />
          <Testimonials content={content.testimonials} />
          <Marquee content={content.marquee} />
          <FAQ content={content.faq} />
          <Blog content={content.blog} />
          <Footer />
        </div>
      </SiteDataProvider>
    </main>
  );
}
