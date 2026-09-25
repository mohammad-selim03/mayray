"use client";

import { useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { AnimateIn } from "../ui/AnimateIn";

const FAQS = [
  {
    q: "What is included in the free trial?",
    a: "You get full access to all Plus plan features for 7 days. No credit card required. Cancel anytime before the trial ends and you won't be charged.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately and billing is adjusted pro-rata.",
  },
  {
    q: "What happens after the free trial?",
    a: "After 7 days, you'll be automatically enrolled in your selected plan. You can cancel before the trial ends to avoid any charges.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer a full refund within the first 30 days of any paid subscription. Contact our support team and we'll process it promptly.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. We use enterprise-grade encryption, SOC 2 compliance, and HIPAA-ready infrastructure to keep your data safe and private.",
  },
];

const FAQItem = ({
  number,
  question,
  answer,
  isOpen,
  onClick,
}: {
  number: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => (
  <div
    className={clsx(
      "rounded-2xl border transition-all duration-300 p-6",
      isOpen
        ? "border-[#bbdefb] bg-[#e3f2fd]/50"
        : "border-transparent bg-white"
    )}
  >
    <button onClick={onClick} className="flex w-full items-center gap-4 text-left">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f0f4f8] text-[14px] font-semibold text-[#44403c]">
        {String(number).padStart(2, "0")}
      </span>
      <h3 className="flex-1 text-[16px] font-semibold text-[#1c1917]">
        {question}
      </h3>
      <motion.div
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.2 }}
        className="shrink-0"
      >
        {isOpen ? (
          <X className="size-5 text-[#13a0e7]" />
        ) : (
          <span className="flex size-6 items-center justify-center rounded-full border border-[#e7e5e4] text-[16px] text-[#78716c]">
            +
          </span>
        )}
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="ml-14 mt-3 text-[14px] leading-[1.6] text-[#78716c]">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const PricingFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const left = FAQS.slice(0, Math.ceil(FAQS.length / 2));
  const right = FAQS.slice(Math.ceil(FAQS.length / 2));

  return (
    <section className="mx-auto w-full max-w-[1170px] px-4 py-20 sm:px-6 lg:px-0">
      <AnimateIn>
        <h2 className="text-center text-[32px] font-bold leading-[1.2] sm:text-[40px] lg:text-[48px]">
          Frequently Asked Questions
        </h2>
      </AnimateIn>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {left.map((faq, idx) => (
            <FAQItem
              key={idx}
              number={idx + 1}
              question={faq.q}
              answer={faq.a}
              isOpen={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
        <div className="space-y-4">
          {right.map((faq, idx) => (
            <FAQItem
              key={idx}
              number={idx + left.length + 1}
              question={faq.q}
              answer={faq.a}
              isOpen={openIndex === idx + left.length}
              onClick={() =>
                setOpenIndex(
                  openIndex === idx + left.length ? null : idx + left.length
                )
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};
