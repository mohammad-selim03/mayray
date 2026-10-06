import Image from "next/image";
import { AnimateIn } from "../../ui/AnimateIn";

// Home v2: "Discover Where AI Can Save You 20+ Hours Every Week" — a centred headline above a
// responsive mockup flanked by side photos that scale across breakpoints.
const SIDES = [
  { src: "/homev2/discover-left-1.webp", alt: "Process automation example" },
  { src: "/homev2/discover-left-2.webp", alt: "Workflow automation example" },
  { src: "/homev2/discover-right-2.webp", alt: "AI assistant example" },
  { src: "/homev2/discover-right-1.webp", alt: "Time savings example" },
];

export const DiscoverHours = () => (
  <section className="mx-auto mt-16 w-full max-w-[1420px] flex-col items-center gap-10 px-4 sm:mt-20 sm:px-6 lg:px-8 xl:px-10">
    <AnimateIn className="w-full">
      <div className="mx-auto flex max-w-[900px] flex-col items-center gap-4 text-center px-2">
        <h2 className="text-[clamp(1.75rem,3.5vw,3rem)] font-semibold leading-[1.15] text-[#18181b] tracking-tight">
          Discover Where AI Can Save You 20+ Hours Every Week
        </h2>
        <p className="text-[clamp(0.95rem,1.2vw,1.125rem)] leading-[1.65] text-[#70707b] max-w-[640px]">
          Get a free Process Health Check and uncover high-impact automation opportunities tailored to your business with clear ROI insights.
        </p>
      </div>
    </AnimateIn>

    <AnimateIn direction="up" className="w-full">
      <div className="relative w-full aspect-[1170/392] max-w-[1170px] min-h-[280px]">
        {/* Center mockup - always visible, scales fluidly */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[770px] aspect-[770/392] overflow-hidden rounded-[clamp(16px,2.5vw,24px)] shadow-[0_16px_40px_rgba(24,24,27,0.16)] sm:shadow-[0_24px_60px_rgba(24,24,27,0.18)]">
          <Image
            src="/homev2/discover-center.webp"
            alt="The Mayray AI assistant welcome screen"
            fill
            sizes="(max-width: 640px) 95vw, (max-width: 1024px) 80vw, 770px"
            className="object-cover"
            priority={false}
          />
        </div>

        {/* Side photos - responsive positioning using percentages */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Left side - 2 photos */}
          <div className="absolute left-[2%] top-[18%] h-[67%] w-[11%] max-w-[99px] min-w-[60px] overflow-hidden rounded-l-[clamp(8px,1.5vw,12px)] lg:block hidden">
            <Image src="/homev2/discover-left-1.webp" alt="" fill sizes="(max-width: 1024px) 80px, 99px" className="object-cover" />
          </div>
          <div className="absolute left-[10%] top-[10%] h-[79%] w-[14%] max-w-[131px] min-w-[80px] overflow-hidden rounded-l-[clamp(8px,1.5vw,12px)] lg:block hidden">
            <Image src="/homev2/discover-left-2.webp" alt="" fill sizes="(max-width: 1024px) 100px, 131px" className="object-cover" />
          </div>

          {/* Right side - 2 photos */}
          <div className="absolute right-[10%] top-[10%] h-[79%] w-[14%] max-w-[131px] min-w-[80px] overflow-hidden rounded-r-[clamp(8px,1.5vw,12px)] lg:block hidden">
            <Image src="/homev2/discover-right-2.webp" alt="" fill sizes="(max-width: 1024px) 100px, 131px" className="object-cover" />
          </div>
          <div className="absolute right-[2%] top-[18%] h-[67%] w-[11%] max-w-[99px] min-w-[60px] overflow-hidden rounded-r-[clamp(8px,1.5vw,12px)] lg:block hidden">
            <Image src="/homev2/discover-right-1.webp" alt="" fill sizes="(max-width: 1024px) 80px, 99px" className="object-cover" />
          </div>
        </div>
      </div>

      {/* Mobile fallback - centered mockup only, for very small screens */}
      <div className="relative mx-auto aspect-[770/392] w-full max-w-[560px] overflow-hidden rounded-[20px] shadow-[0_16px_40px_rgba(24,24,27,0.16)] xl:hidden">
        <Image
          src="/homev2/discover-center.webp"
          alt="The Mayray AI assistant welcome screen"
          fill
          sizes="95vw"
          className="object-cover"
        />
      </div>
    </AnimateIn>
  </section>
);
