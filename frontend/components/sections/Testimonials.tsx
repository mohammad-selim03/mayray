"use client";

import { useSiteData } from "../../lib/SiteDataContext";
import type { HomeTestimonialsContent } from "../../lib/cms/schema/documents/pages/home";
import { AnimateIn } from "../ui/AnimateIn";
import { motion } from "framer-motion";
import Image from "next/image";

type Testimonial = { quote: string; name: string; role: string; avatar: string; rating?: number };

export const Testimonials = ({ content }: { content: HomeTestimonialsContent }) => {
  const headline = content.title;
  const serverItems = useSiteData().testimonials;
  const mapItem = (t: { quote: string; name: string; role: string; company: string | null; avatar: string | null; rating: number }): Testimonial => ({
    quote: t.quote,
    name: t.name,
    role: [t.role, t.company].filter(Boolean).join(", "),
    avatar: t.avatar ?? "/svg/avatar.svg",
    rating: t.rating,
  });
  const items: Testimonial[] = serverItems.map(mapItem);

  return (
    <section className="mx-auto mt-28 w-full max-w-[1170px] px-4 sm:px-6 lg:px-0">
      <div className="grid gap-10 md:grid-cols-[280px_1fr] lg:grid-cols-[400px_1fr] items-start md:gap-12 lg:gap-20">
        <div className="lg:sticky lg:top-32">
          <AnimateIn direction="right">
            <h2 className="text-[36px] font-bold leading-[1.1] tracking-tight sm:text-[42px] lg:text-[64px]">
              {headline}
            </h2>
          </AnimateIn>
        </div>
        <div className="space-y-6">
          {items.map((t, idx) => (
            <AnimateIn key={t.name} delay={idx * 0.1} direction="up">
              <motion.article
                className="rounded-[24px] bg-white p-6 sm:p-10 shadow-sm border border-black/5 hover:border-[#13a0e7] transition-all duration-300"
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}
              >
                <div className="flex gap-1 text-xl text-[#f3bc11]">
                  {[...Array(t.rating ?? 5)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                <p className="mt-6 text-[16px] leading-[1.6] text-gray-800 font-medium sm:text-[20px]">
                  &quot;{t.quote}&quot;
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="relative size-14 overflow-hidden rounded-full border-2 border-gray-50 shadow-sm">
                    <Image alt={t.name} fill sizes="56px" className="object-cover" src={t.avatar} />
                  </div>
                  <div>
                    <p className="text-[18px] font-bold leading-tight text-gray-900 sm:text-[20px]">{t.name}</p>
                    <p className="text-[15px] font-medium text-gray-500">{t.role}</p>
                  </div>
                </div>
              </motion.article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
};
