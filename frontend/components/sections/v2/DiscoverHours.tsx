import Image from "next/image";
import { AnimateIn } from "../../ui/AnimateIn";

// Home v2: "Discover Where AI Can Save You 20+ Hours Every Week" — a centred headline above a
// desktop mockup flanked by photos that peek in from the sides.
const SIDES = [
  { src: "/homev2/discover-left-1.webp", className: "left-0 top-[64px] h-[263px] w-[99px] rounded-l-[12px]" },
  { src: "/homev2/discover-left-2.webp", className: "left-[90px] top-[40px] h-[311px] w-[131px] rounded-l-[12px]" },
  { src: "/homev2/discover-right-2.webp", className: "left-[955px] top-[40px] h-[311px] w-[131px] rounded-tr-[12px]" },
  { src: "/homev2/discover-right-1.webp", className: "left-[1071px] top-[64px] h-[263px] w-[99px] rounded-r-[12px]" },
];

export const DiscoverHours = () => (
  <section className="mx-auto mt-28 flex w-full max-w-[1170px] flex-col items-center gap-12 px-4 sm:px-6 lg:px-0">
    <AnimateIn className="w-full">
      <div className="mx-auto flex max-w-[800px] flex-col items-center gap-6 text-center">
        <h2 className="text-[32px] font-semibold leading-[1.2] text-[#18181b] sm:text-[40px] lg:text-[48px]">
          Discover Where AI Can Save You 20+ Hours Every Week
        </h2>
        <p className="text-[16px] leading-[1.6] text-[#70707b]">
          Get a free Process Health Check and uncover high-impact automation opportunities tailored to your business with clear ROI insights.
        </p>
      </div>
    </AnimateIn>

    <AnimateIn direction="up" className="w-full">
      {/* Desktop: mockup centred over the side photos. */}
      <div className="relative mx-auto hidden h-[392px] w-full max-w-[1170px] lg:block">
        {SIDES.map((s) => (
          <div key={s.src} className={`absolute overflow-hidden ${s.className}`}>
            <Image src={s.src} alt="" fill sizes="150px" className="object-cover" />
          </div>
        ))}
        <div className="absolute left-1/2 top-0 h-[392px] w-[770px] -translate-x-1/2 overflow-hidden rounded-[24px] shadow-[0_24px_60px_rgba(24,24,27,0.18)]">
          <Image src="/homev2/discover-center.webp" alt="The Mayray AI assistant welcome screen" fill sizes="770px" className="object-cover" priority={false} />
        </div>
      </div>

      {/* Mobile / tablet: just the mockup. */}
      <div className="relative mx-auto aspect-[770/392] w-full max-w-[560px] overflow-hidden rounded-[20px] shadow-[0_16px_40px_rgba(24,24,27,0.16)] lg:hidden">
        <Image src="/homev2/discover-center.webp" alt="The Mayray AI assistant welcome screen" fill sizes="560px" className="object-cover" />
      </div>
    </AnimateIn>
  </section>
);
