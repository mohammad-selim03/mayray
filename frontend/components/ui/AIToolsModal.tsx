"use client";

import { useState, useEffect, RefObject } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const tools = [
  { name: "Gmail",          src: "/svg/gmail.svg",                                              text: "Automate your Gmail inbox with AI." },
  { name: "Word",           src: "/svg/ms-word 1.svg",                                          text: "Generate documents with AI instantly." },
  { name: "LinkedIn",       src: "/svg/linkedin.svg",                                           text: "Automate your LinkedIn outreach." },
  { name: "Google Drive",   src: "/svg/google-drive.svg",                                       text: "Organize your Drive with AI." },
  { name: "Salesforce",     src: "/svg/saleforce.svg",                                          text: "Let AI manage your Salesforce CRM." },
  { name: "Excel",          src: "/svg/excel.svg",                                              text: "Analyze your data with AI." },
  { name: "Outlook",        src: "/svg/ms-outlook 2.svg",                                       text: "Automate your Outlook emails." },
  { name: "Google Calendar",src: "/svg/google-calendar 1.svg",                                  text: "Let AI manage your calendar." },
  { name: "Teams",          src: "/svg/microsoft-team-management-business-office 1.svg",        text: "Automate your Teams messages." },
  { name: "Google Keep",    src: "/svg/google-keep.svg",                                        text: "Capture notes with AI assistance." },
  { name: "PowerPoint",     src: "/svg/microsoft-powerpoint-2013-logo 1.svg",                   text: "Create presentations with AI." },
  { name: "Instagram",      src: "/svg/instagram.svg",                                          text: "Automate your Instagram growth." },
  { name: "Chrome",         src: "/svg/chrome.svg",                                             text: "Browse and extract data with AI." },
  { name: "SAP",            src: "/svg/sap 1.svg",                                              text: "Streamline SAP workflows with AI." },
  { name: "Google Drive",   src: "/svg/google-drive.svg",                                       text: "Organize your Drive with AI." },
];

interface AIToolsModalProps {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
  selectedTool: number | null;
  onSelectTool: (i: number | null) => void;
}

export const AIToolsModal = ({ open, onClose, triggerRef, selectedTool, onSelectTool }: AIToolsModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 10, left: rect.left });
    }
  }, [open, triggerRef]);

  // Close when user scrolls away
  useEffect(() => {
    if (!open) return;
    const handleScroll = () => onClose();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed z-[9999] w-[340px] rounded-2xl border border-[#e7e5e4] bg-white p-4 shadow-2xl"
            style={{ top: pos.top, left: pos.left }}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-5 gap-2">
              {tools.map((tool, i) => {
                const isActive = selectedTool === i;
                return (
                  <motion.button
                    key={i}
                    className="flex flex-col items-center gap-1 focus:outline-none"
                    onClick={() => {
                      onSelectTool(isActive ? null : i);
                      if (!isActive) onClose();
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className={`grid size-12 place-items-center rounded-xl border shadow-sm transition-colors duration-150 ${isActive ? "border-[#13a0e7] bg-[#ebf8ff]" : "border-[#e7e5e4] bg-[#fafaf9]"}`}>
                      <div className="relative size-7">
                        <Image src={tool.src} alt={tool.name} fill className="object-contain" />
                      </div>
                    </div>
                    <span className={`text-center text-[9px] leading-tight ${isActive ? "font-medium text-[#13a0e7]" : "text-[#78716c]"}`}>
                      {tool.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-3 min-h-[36px]">
              <AnimatePresence mode="wait">
                {selectedTool !== null ? (
                  <motion.p
                    key={selectedTool}
                    className="rounded-lg bg-[#f0faff] px-3 py-2 text-xs leading-relaxed text-[#13a0e7]"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.16 }}
                  >
                    {tools[selectedTool].text}
                  </motion.p>
                ) : (
                  <motion.p
                    key="hint"
                    className="text-center text-[10px] text-[#a8a29e]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    Tap a tool to see what AI can do with it.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
};
