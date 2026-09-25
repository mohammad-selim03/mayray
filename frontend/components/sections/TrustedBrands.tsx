"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimateIn } from "../ui/AnimateIn";
import { useCmsGlobal } from "@/lib/cms/CmsGlobalsContext";
import { CMS_ICONS } from "@/lib/cms/icons";
import { isIconName, type DocumentContent } from "@/lib/cms/schema";

type Brand = DocumentContent<"trusted-brands">["content"]["brands"][number];

const BrandLogo = ({ brand }: { brand: Brand }) => {
  const Icon = isIconName(brand.icon) ? CMS_ICONS[brand.icon] : null;
  return (
    <div className="flex items-center justify-center px-6 sm:px-10 shrink-0">
      {brand.logo ? (
        <Image
          src={brand.logo.url}
          alt={brand.logo.alt || brand.name}
          width={160}
          height={40}
          unoptimized={brand.logo.url.endsWith(".svg")}
          className="h-8 w-auto max-w-[180px] object-contain sm:h-10"
        />
      ) : (
        <span
          className={`text-[22px] font-bold sm:text-[26px] lg:text-[30px] whitespace-nowrap ${brand.style === "serifItalic" ? "font-serif italic" : ""}`}
          style={{ color: brand.color }}
        >
          {Icon && <Icon aria-hidden className="mr-1.5 inline-block size-[22px] align-middle" fill="currentColor" strokeWidth={0} />}
          {brand.name}
        </span>
      )}
    </div>
  );
};

export const TrustedBrands = () => {
  const { heading, brands } = useCmsGlobal("trusted-brands").content;
  const tripled = [...brands, ...brands, ...brands];
  const duration = Math.max(20, brands.length * 3);

  return (
    <section className="w-full overflow-hidden py-20">
      <AnimateIn>
        <h2 className="whitespace-pre-line text-center text-[32px] font-bold leading-[1.2] sm:text-[40px] lg:text-[48px]">
          {heading}
        </h2>
      </AnimateIn>

      <div className="mt-12 overflow-hidden">
        <motion.div
          className="flex items-center will-change-transform"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
        >
          {tripled.map((brand, idx) => (
            <BrandLogo key={`${brand.name}-${idx}`} brand={brand} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
