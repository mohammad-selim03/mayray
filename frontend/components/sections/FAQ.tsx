"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { AnimateIn } from "../ui/AnimateIn";
import type { FaqContent } from "../../lib/cms/schema/blocks/industry";

const FAQItem = ({ number, question, answer, isOpen, onClick }: {
  number: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => (
  <article className={`rounded-3xl border transition-all duration-300 ${isOpen ? "border-[#cfe6f6] bg-[#eef6fc]" : "border-transparent bg-white"} p-6 shadow-sm`}>
    <button onClick={onClick} className="flex w-full items-center gap-4 text-left">
      <span className={`flex size-10 shrink-0 items-center justify-center rounded-full text-[14px] font-semibold text-[#44403c] ${isOpen ? "bg-white" : "bg-[#f4f4f5]"}`}>
        {String(number).padStart(2, "0")}
      </span>
      <h3 className="flex-1 text-[16px] font-semibold text-[#44403c] sm:text-[18px]">{question}</h3>
      {isOpen ? (
        <X className="size-5 shrink-0 text-[#ff5c35]" />
      ) : (
        <Plus className="size-5 shrink-0 text-[#44403c]" />
      )}
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
          <p className="ml-14 mt-3 text-[15px] leading-[1.5] text-[#44403c] sm:text-[16px]">{answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </article>
);

export const FAQ = ({ content }: { content: FaqContent }) => {
  const { title: headline, items: faqs } = content;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const left = faqs.slice(0, Math.ceil(faqs.length / 2));
  const right = faqs.slice(Math.ceil(faqs.length / 2));

  return (
    <section id="contact" className="mx-auto py-24 w-full max-w-[1170px] px-4 sm:px-6 lg:px-0">
      <AnimateIn>
        <h2 className="text-center text-[32px] font-semibold leading-[1.2] sm:text-[40px] lg:text-[48px]">
          {headline}
        </h2>
      </AnimateIn>
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          {left.map((faq, idx) => (
            <FAQItem
              key={idx}
              number={idx + 1}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
        <div className="space-y-6">
          {right.map((faq, idx) => (
            <FAQItem
              key={idx + left.length}
              number={idx + left.length + 1}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx + left.length}
              onClick={() => setOpenIndex(openIndex === idx + left.length ? null : idx + left.length)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
