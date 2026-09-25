"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCmsGlobal } from "@/lib/cms/CmsGlobalsContext";
import { CMS_ICONS } from "@/lib/cms/icons";
import { isIconName, type DocumentContent } from "@/lib/cms/schema";

type MenuItem = DocumentContent<"navbar">["menu"]["items"][number];
type DropdownItem = MenuItem["children"][number];

interface NavbarProps {
  className?: string;
  sticky?: boolean;
}

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:5173";

const ChevronDown = ({ open = false }: { open?: boolean }) => (
  <svg aria-hidden="true" viewBox="0 0 10 6" className={`h-[6px] w-[10px] stroke-current transition-transform ${open ? "rotate-180" : ""}`} fill="none">
    <path d="M1 1L5 5L9 1" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const linkTarget = (link: { newTab?: boolean }) =>
  link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {};

function DropdownIcon({ name }: { name: string }) {
  const Icon = isIconName(name) ? CMS_ICONS[name] : null;
  if (!Icon) return null;
  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#ebf8ff] text-[#13a0e7]">
      <Icon className="size-[18px]" strokeWidth={1.8} />
    </span>
  );
}

function DesktopDropdown({ item }: { item: MenuItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // A mouse click right after hover-opening should keep the menu open, not toggle it shut.
  const hoverOpened = useRef(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (!open) hoverOpened.current = true;
    setOpen(true);
  };
  const hideSoon = () => {
    closeTimer.current = setTimeout(() => {
      hoverOpened.current = false;
      setOpen(false);
    }, 150);
  };
  const onClick = () => {
    if (hoverOpened.current) {
      hoverOpened.current = false;
      setOpen(true);
      return;
    }
    setOpen((o) => !o);
  };
  const wide = item.children.length > 4;

  return (
    <div
      ref={ref}
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && show()}
      onPointerLeave={(e) => e.pointerType === "mouse" && hideSoon()}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onClick}
        className="inline-flex items-center gap-2 whitespace-nowrap transition-colors duration-200 hover:text-black"
      >
        <span>{item.link.label}</span>
        <ChevronDown open={open} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-5"
          >
            <ul
              className={`grid gap-1 rounded-2xl border border-[#ece6e2] bg-white p-2 shadow-[0_16px_40px_rgba(24,24,27,0.10)] ${
                wide ? "w-[600px] grid-cols-2" : "w-[340px]"
              }`}
            >
              {item.children.map((child: DropdownItem) => (
                <li key={`${child.link.label}-${child.link.href}`}>
                  <Link
                    href={child.link.href || "#"}
                    {...linkTarget(child.link)}
                    onClick={() => setOpen(false)}
                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[#f4f4f5] focus-visible:bg-[#f4f4f5] focus-visible:outline-none"
                  >
                    <DropdownIcon name={child.icon} />
                    <span className="min-w-0">
                      <span className="block text-[15px] font-medium leading-5 text-[#18181b]">{child.link.label}</span>
                      {child.description && <span className="mt-0.5 block text-[13px] leading-[18px] text-[#70707b]">{child.description}</span>}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileItem({ item, onNavigate }: { item: MenuItem; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  if (item.children.length === 0) {
    return (
      <Link
        href={item.link.href || "/"}
        {...linkTarget(item.link)}
        onClick={onNavigate}
        className="flex items-center justify-between border-b border-gray-200/50 pb-4 hover:text-black"
      >
        {item.link.label}
      </Link>
    );
  }
  return (
    <div className="border-b border-gray-200/50 pb-4">
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between hover:text-black">
        <span>{item.link.label}</span>
        <ChevronDown open={open} />
      </button>
      {open && (
        <ul className="mt-3 space-y-1">
          {item.children.map((child) => (
            <li key={`${child.link.label}-${child.link.href}`}>
              <Link href={child.link.href || "#"} {...linkTarget(child.link)} onClick={onNavigate} className="flex items-center gap-3 rounded-xl py-2 text-[16px]">
                <DropdownIcon name={child.icon} />
                <span>
                  <span className="block">{child.link.label}</span>
                  {child.description && <span className="block text-[13px] font-normal text-[#70707b]">{child.description}</span>}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const Navbar = ({ className = "max-w-[1235px] mx-auto px-5 lg:px-0", sticky = true }: NavbarProps) => {
  const { brand, menu, login } = useCmsGlobal("navbar");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const positionClass = sticky ? "sticky top-5 z-50" : "";

  return (
    <header className={`${positionClass} ${className}`}>
      <div className="relative">
        <div className="flex items-center justify-between gap-3 rounded-full border border-[#ece6e2] bg-white px-4 sm:px-6 lg:px-8 py-3 backdrop-blur-sm relative z-50">
          <div className="flex items-center gap-5">
            <button
              className="lg:hidden p-2 -ml-2 text-gray-700 hover:text-black transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link href="/" className="flex shrink-0 items-center gap-2.5">
              <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#ddd8d4]">
                {brand.logo && (
                  <Image
                    src={brand.logo.url}
                    alt={brand.logo.alt}
                    width={26}
                    height={30}
                    unoptimized={brand.logo.url.endsWith(".svg")}
                    className="h-[30px] w-[26px] object-contain"
                  />
                )}
              </span>
              <span className="text-[16px] font-semibold leading-none tracking-[-0.01em] text-[#161411] sm:text-[17px]">
                {brand.name}
              </span>
            </Link>
            <nav className="hidden flex-1 items-center justify-center gap-8 px-3 text-[16px] font-medium text-[#201d1a] lg:flex">
              {menu.items.map((item) =>
                item.children.length > 0 ? (
                  <DesktopDropdown key={item.link.label} item={item} />
                ) : (
                  <Link
                    key={item.link.label}
                    href={item.link.href || "/"}
                    {...linkTarget(item.link)}
                    className="inline-flex items-center gap-2 whitespace-nowrap transition-colors duration-200 hover:text-black"
                  >
                    {item.link.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          {login.show && (
            <a
              href={`${ADMIN_URL}/login`}
              className="shrink-0 rounded-full border border-[#E7E5E4] bg-[#FAFAF9] px-5 py-2 text-[14px] font-medium leading-none text-[#272320] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-colors sm:px-6 sm:py-[10px] sm:text-[16px]"
            >
              {login.label}
            </a>
          )}
        </div>
        <div className="absolute -bottom-2 left-1/2 h-20 w-[98%] -translate-x-1/2 rounded-[400px] bg-gradient-to-b from-transparent to-white/60 z-10" />
        <div className="absolute -bottom-4.5 left-1/2 h-20 w-[95%] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent to-white/20 z-10" />
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-[110%] z-40 rounded-3xl border border-[#ece6e2] bg-[#f6f5f3]/98 p-6 shadow-xl backdrop-blur-md lg:hidden mx-4"
            >
              <nav className="flex flex-col gap-6 text-[18px] font-medium text-[#201d1a] [&>*:last-child]:border-0 [&>*:last-child]:pb-0">
                {menu.items.map((item) => (
                  <MobileItem key={item.link.label} item={item} onNavigate={() => setIsMobileMenuOpen(false)} />
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
