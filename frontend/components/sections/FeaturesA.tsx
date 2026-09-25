"use client";
import { integrationLogos } from "../../lib/data";
import { useSiteData } from "../../lib/SiteDataContext";
import type { HomeFeaturesContent } from "../../lib/cms/schema/documents/pages/home";
import { Button } from "../ui/Button";
import { AnimateIn } from "../ui/AnimateIn";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type Story = { title: string; description: string; video: string; apps: string[] };

const FALLBACK_VIDEO = "/features-svg/6.mp4";

export const FeaturesA = ({ content }: { content: HomeFeaturesContent }) => {
  const stories: Story[] = useSiteData()
    .features.filter((f) => f.group === "A")
    .map((f) => ({ title: f.title, description: f.description, video: f.videoUrl ?? FALLBACK_VIDEO, apps: f.apps }));
  const [loadedVideos, setLoadedVideos] = React.useState<Record<number, boolean>>({});
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);
  const [activeVideo, setActiveVideo] = React.useState<number | null>(null);

  const setLoaded = (idx: number) => {
    setLoadedVideos((prev) => ({ ...prev, [idx]: true }));
  };

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <section id="features" className="mx-auto mt-28 w-full max-w-[1170px] scroll-mt-28 space-y-24 px-4 sm:px-6 lg:px-0">
        {stories.map((story, idx) => (
          <AnimateIn key={story.title} direction={idx % 2 === 0 ? "right" : "left"} onViewportEnter={() => setLoaded(idx)}>
            <article className="relative flex flex-col items-center md:flex-row lg:flex-row">
              {/* Video Container */}
              <div className={`w-full md:w-1/2 lg:w-[55%] relative z-10 ${idx % 2 === 1 ? "md:order-2 lg:order-2" : "md:order-1 lg:order-1"}`}>
                <div className="overflow-hidden aspect-square sm:aspect-[4/3] w-full relative rounded-[24px] sm:rounded-3xl">
                  {loadedVideos[idx] && (
                    <motion.video
                      ref={(el) => {
                        videoRefs.current[idx] = el;
                      }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.6 }}
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      controlsList="nodownload"
                      className="w-4/5 h-4/5 sm:w-2/3 sm:h-2/3 object-cover absolute inset-0 m-auto rounded-[16px] sm:rounded-3xl overflow-hidden"
                    >
                      <source src={story.video} type="video/mp4" />
                    </motion.video>
                  )}
                </div>
              </div>

              {/* Text Card Container */}
              <div
                className={`mt-8 w-full md:mt-0 md:w-1/2 lg:w-[60%] bg-white rounded-[24px] sm:rounded-[40px] p-6 sm:p-10 lg:py-20 relative z-0 shadow-sm border border-black/[0.03] ${
                  idx % 2 === 1 ? "md:order-1 lg:order-1 lg:-mr-[15%] lg:pr-40" : "md:order-2 lg:order-2 lg:-ml-[15%] lg:pl-40"
                }`}
              >
                <div className="flex w-fit items-center gap-3 rounded-full bg-[#f4f4f4] px-4 py-2.5">
                  {story.apps
                    .map((app) => integrationLogos.find((l) => l.name === app))
                    .filter((logo): logo is { name: string; src: string } => logo !== undefined)
                    .slice(0, 3)
                    .map((logo) => (
                      <Image
                        key={logo.name}
                        src={logo.src}
                        alt={logo.name}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    ))}
                </div>
                <h3 className="mt-8 text-[28px] font-bold leading-[1.15] tracking-tight text-gray-900 sm:text-[36px] lg:text-[44px]">
                  {story.title}
                </h3>
                <p className="mt-5 text-[16px] leading-[1.6] text-gray-600 sm:text-[18px]">{story.description}</p>
                <Button variant="black" className="group mt-10" onClick={() => setActiveVideo(idx)}>
                  {content.watchLabel} <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">▷</span>
                </Button>
              </div>
            </article>
          </AnimateIn>
        ))}
      </section>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {activeVideo !== null && (
              <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setActiveVideo(null)}
              >
                <button
                  onClick={() => setActiveVideo(null)}
                  className="absolute right-5 top-5 z-10 grid size-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                  aria-label="Close"
                >
                  ✕
                </button>
                <motion.video
                  key={activeVideo}
                  className="max-h-screen w-full max-w-5xl"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  autoPlay
                  controls
                  loop
                  playsInline
                  onClick={(e) => e.stopPropagation()}
                >
                  <source src={stories[activeVideo].video} type="video/mp4" />
                </motion.video>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};
