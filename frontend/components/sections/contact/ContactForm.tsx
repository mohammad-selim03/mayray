"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { api } from "@/lib/api";

type FormState = "idle" | "loading" | "success" | "error";

const LABEL = "text-[14px] font-medium leading-[20px] text-[#3f3f46]";
const FIELD =
  "h-11 w-full rounded-lg border border-[#d1d1d6] bg-white px-3.5 text-[16px] leading-6 text-[#18181b] outline-none transition placeholder:text-[#a0a0ab] focus:border-[#13a0e7] focus:ring-2 focus:ring-[#13a0e7]/20";

export const ContactForm = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setError("");
    try {
      // The contact API accepts name/email/message only, so the phone number
      // rides along in the message body rather than being dropped.
      const message = form.phone.trim()
        ? `${form.message}\n\nPhone: ${form.phone}`
        : form.message;
      await api.contact.submit({ name: form.name, email: form.email, message, type: "contact" });
      setState("success");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setState("error");
    }
  };

  return (
    <div className="grid gap-[30px] lg:grid-cols-2">
      <AnimateIn className="h-full">
        <div className="relative h-[280px] overflow-hidden rounded-[20px] bg-white sm:h-[400px] lg:h-[551px]">
          <Image
            src="/contact/contact-hero.jpg"
            alt="Person using a phone to get in touch with Mayray AI"
            fill
            sizes="(max-width: 1024px) 100vw, 570px"
            className="object-cover"
            priority
          />
        </div>
      </AnimateIn>

      <AnimateIn delay={0.1} className="h-full">
        <div className="flex h-full flex-col rounded-[20px] bg-white px-6 py-4 lg:h-[550px]">
          <form onSubmit={onSubmit} className="flex flex-1 flex-col gap-10">
            <h2 className="text-[26px] font-semibold leading-[38.4px] text-[#18181b] sm:text-[32px]">
              Send Us a Message
            </h2>

            <div className="flex flex-col gap-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className={LABEL}>Your Name</label>
                  <input id="name" name="name" value={form.name} onChange={onChange} required placeholder="Full name" className={FIELD} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className={LABEL}>Phone number</label>
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="+01 XXXXX XXXXX" className={FIELD} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className={LABEL}>Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={onChange} required placeholder="olivia@domain.com" className={FIELD} />
              </div>

              <div>
                <label htmlFor="message" className="block text-[14px] font-medium leading-[14px] text-[#3f3f46]">Your message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Type your message here"
                  className="mt-1.5 block h-20 w-full resize-none rounded-md border border-[#d1d1d6] bg-white px-3 py-2 text-[14px] leading-5 text-[#18181b] outline-none transition placeholder:text-[#a0a0ab] focus:border-[#13a0e7] focus:ring-2 focus:ring-[#13a0e7]/20"
                />
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className={clsx(
                    "mt-2 h-10 w-full rounded-full px-4 text-[14px] font-medium leading-6 text-white transition",
                    state === "loading" ? "cursor-not-allowed bg-[#0f172a]/70" : "bg-[#0f172a] hover:bg-[#1e293b]"
                  )}
                >
                  {state === "loading" ? "Sending…" : "Send message"}
                </button>

                {state === "success" && (
                  <p role="status" className="mt-2 text-[13px] leading-5 text-[#15803d]">
                    Thanks — your message is on its way. We&apos;ll be in touch shortly.
                  </p>
                )}
                {state === "error" && (
                  <p role="alert" className="mt-2 text-[13px] leading-5 text-[#dc2626]">{error}</p>
                )}
              </div>
            </div>
          </form>

          <p className="mt-8 text-center text-[13px] leading-[15.7px] text-[#70707b] lg:mt-auto lg:pt-8">
            We typically respond within 48 hours.
          </p>
        </div>
      </AnimateIn>
    </div>
  );
};
