import React from "react";
import Link from "next/link";
import type { LinkValue } from "@/lib/cms/schema/types";

type Variant = "primary" | "secondary" | "black" | "outline" | "pill" | "active-pill";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: React.ReactNode;
}

const baseStyles = "rounded-full font-medium transition-all duration-200 active:scale-95";

const variants: Record<Variant, string> = {
  primary: "bg-[#13a0e7] text-white px-9 py-4 text-base",
  secondary: "bg-white text-black px-9 py-4 text-base",
  black: "bg-black text-white px-6 py-4 text-base",
  outline: "border border-black/10 bg-[#fafaf9] px-5 py-2 text-sm",
  pill: "border border-[#e7e5e4] bg-[#fafaf9] px-8 py-3 text-base text-[#44403c]",
  "active-pill": "border border-[#d9ebf7] bg-[#ebf8ff] text-[#13a0e7] px-8 py-3 text-base",
};

const buttonClass = (variant: Variant, className: string) => `${baseStyles} ${variants[variant] || variants.primary} ${className}`;

export const Button: React.FC<ButtonProps> = ({ variant = "primary", children, className = "", ...props }) => (
  <button className={buttonClass(variant, className)} {...props}>
    {children}
  </button>
);

/** A CMS link styled exactly like `Button`. */
export const ButtonLink = ({ link, variant = "primary", className = "" }: { link: LinkValue; variant?: Variant; className?: string }) => (
  <Link
    href={link.href}
    className={buttonClass(variant, `inline-block text-center ${className}`)}
    {...(link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
  >
    {link.label}
  </Link>
);
