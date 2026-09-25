"use client";

import Image from "next/image";
import { MapPin, Phone, Mail, Move } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";

const EMAILS = [
  "info@domain.com (General)",
  "sales@domain.com (Sales)",
  "investors@domain.com (Investors)",
  "hr@domain.com (HR / Careers)",
];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="#25d366" aria-hidden="true" className="shrink-0">
    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
  </svg>
);

export const ContactOffice = () => (
  <div className="grid gap-[30px] lg:grid-cols-2 lg:items-center">
    <AnimateIn className="h-full">
      <div className="h-full rounded-[16px] bg-white px-6 pb-8 pt-[31px] lg:h-[411px]">
        <h2 className="text-[26px] font-semibold leading-[38.4px] text-[#18181b] sm:text-[32px]">
          Head Office
        </h2>

        <div className="mt-[19px] flex flex-col gap-7">
          <div className="flex gap-3">
            <MapPin size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#3f3f46]" />
            <div className="flex flex-col gap-1">
              <p className="text-[17px] font-bold leading-[20.6px] text-[#3f3f46]">Mayray AI</p>
              <p className="text-[17px] leading-[27.2px] text-[#70707b]">C-49, Industrial Area, Naini,</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Phone size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#3f3f46]" />
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-[25px]">
              <div className="flex flex-col gap-2">
                <p className="text-[17px] leading-[20.6px] text-[#3f3f46]">+01 XXXXX XXXXX</p>
                <p className="text-[15px] leading-[18.2px] text-[#a0a0ab]">Mon - Sat, 9:00 AM - 6:00 PM</p>
              </div>
              <div className="pl-4 sm:border-l sm:border-[#d1d1d6]">
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-jakarta text-[15px] font-semibold leading-6 text-[#25d366] hover:underline"
                >
                  <WhatsAppIcon />
                  WhatsApp
                </a>
                <p className="text-[12px] leading-6 text-[#a0a0ab]">Or reach us directly on</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Mail size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#3f3f46]" />
            <div className="flex flex-col gap-2">
              {EMAILS.map((e) => (
                <p key={e} className="font-jakarta text-[16px] leading-[22.7px] text-[#3f3f46] sm:text-[18px]">
                  {e}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimateIn>

    <AnimateIn delay={0.1} className="h-full">
      <div className="relative h-[280px] overflow-hidden rounded-[16px] sm:h-[340px] lg:h-[411px]">
        <Image
          src="/contact/office-map.jpg"
          alt="Map showing the Mayray AI head office location"
          fill
          sizes="(max-width: 1024px) 100vw, 570px"
          className="object-cover"
        />
        <span className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full bg-white shadow-sm">
          <Move size={20} strokeWidth={1.5} className="text-[#666666]" />
        </span>
      </div>
    </AnimateIn>
  </div>
);
