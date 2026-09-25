"use client";

import React, { useState } from "react";
import { ShieldCheck, Lock, CheckCircle2, Server, FileText } from "lucide-react";
import { usePageField } from "@/lib/PageContentContext";

const SECTIONS = [
  { id: "collection", title: "1. Information We Collect" },
  { id: "zero-training", title: "2. Zero AI Model Training Guarantee" },
  { id: "telephony-crm", title: "3. Telephony & CRM Data Processing" },
  { id: "security-encryption", title: "4. Security, Encryption & Compliance" },
  { id: "retention-purge", title: "5. Data Retention & Automatic Purging" },
  { id: "user-rights", title: "6. Your Rights & Data Sovereignty" },
  { id: "cookies-analytics", title: "7. Cookies & Analytical Tracking" },
  { id: "contact-dpo", title: "8. Contact Data Protection Officer" },
];

export const PrivacyContent = () => {
  const sectionsRaw = usePageField("content", "sections", "");

  let cmsSections: { title: string; content: string }[] = [];
  if (sectionsRaw) {
    try {
      const parsed = JSON.parse(sectionsRaw);
      if (Array.isArray(parsed)) {
        cmsSections = parsed;
      }
    } catch {}
  }

  const [activeSection, setActiveSection] = useState("collection");

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white py-16 text-white">
      <div className="mx-auto max-w-[1235px] px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Sticky Table of Contents Sidebar */}
          <aside className="lg:col-span-4 sticky top-24 rounded-3xl border border-white/10 bg-white p-6 shadow-xl hidden lg:block">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-emerald-400" />
              Table of Contents
            </h3>

            <nav className="space-y-1 text-xs font-medium">
              {SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollTo(sec.id)}
                    className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-all ${
                      isActive
                        ? "bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-500/30"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{sec.title}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Policy Main Content Column */}
          <main className="lg:col-span-8 space-y-14 text-sm sm:text-base leading-[1.8] text-gray-800">
            
            {cmsSections.length > 0 ? (
              cmsSections.map((section, i) => (
                <div key={i} className="space-y-4">
                  <h2 className="text-2xl font-bold text-white sm:text-3xl border-b border-white/10 pb-3">
                    {section.title}
                  </h2>
                  <p>{section.content}</p>
                </div>
              ))
            ) : (
              <>
                {/* Section 1 */}
                <div id="collection" className="scroll-mt-28 space-y-4">
                  <h2 className="text-2xl font-bold text-white sm:text-3xl border-b border-white/10 pb-3">
                    1. Information We Collect
                  </h2>
                  <p>
                    Mayray AI (&quot;Mayray&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) collects information necessary to provide autonomous AI agent services across web chat, telephony, and connected CRMs.
                  </p>
              
              <div className="rounded-2xl bg-white/5 border border-white/5 p-5 space-y-3">
                <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">A. Information Provided directly by Users:</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-gray-600">
                  <li>Account registration credentials (Name, Work Email, Organization Name, Phone Number).</li>
                  <li>Conversational prompts, workflow definitions, and agent playbooks.</li>
                  <li>CRM API keys, SIP telephony credentials, and third-party Webhook endpoints.</li>
                </ul>
              </div>
            </div>

            {/* Section 2 - Highlight Box */}
            <div id="zero-training" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl border-b border-white/10 pb-3">
                2. Zero AI Model Training Guarantee
              </h2>
              <div className="rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-6 sm:p-8 space-y-3 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Strict Enterprise Isolation Guarantee
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  Your customer conversations are NEVER used to train public foundation models.
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  All prompts, transcripts, customer inputs, and proprietary documents processed by Mayray AI are strictly isolated inside your organization&apos;s private tenancy boundary. We maintain binding Zero-Data Retention (ZDR) agreements with underlying LLM vendors.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div id="telephony-crm" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl border-b border-white/10 pb-3">
                3. Telephony & CRM Data Processing
              </h2>
              <p>
                When you deploy Mayray Voice AI agents connected to your SIP trunk, Twilio numbers, or CRM software (e.g. Clio, Follow Up Boss, Salesforce):
              </p>
              <ul className="space-y-2">
                {[
                  "Audio streams are transmitted securely over SRTP / WebRTC with TLS 1.3 encryption.",
                  "Real-time speech recognition outputs are processed in volatile memory without persistent disk logging.",
                  "Extracted lead metadata (name, pre-approval status, appointment date) is posted directly to your CRM.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 4 */}
            <div id="security-encryption" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl border-b border-white/10 pb-3">
                4. Security, Encryption & Compliance
              </h2>
              <p>
                Mayray AI enforces enterprise-grade security protocols across all infrastructure:
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="rounded-2xl border border-white/10 bg-white p-5">
                  <Lock className="h-6 w-6 text-cyan-400 mb-2" />
                  <h4 className="font-bold text-gray-800">AES-256 Encryption</h4>
                  <p className="text-xs text-gray-400 mt-1">All data at rest is encrypted with military-grade AES-256 keys.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white p-5">
                  <Server className="h-6 w-6 text-emerald-400 mb-2" />
                  <h4 className="font-bold text-gray-800">SOC2 & HIPAA Compliant</h4>
                  <p className="text-xs text-gray-400 mt-1">Audited data handling for legal, healthcare, and financial sectors.</p>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div id="retention-purge" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl border-b border-white/10 pb-3">
                5. Data Retention & Automatic Purging
              </h2>
              <p>
                Organizations can configure customized retention policies:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li><strong>Default Retention:</strong> Transcripts stored for 30 days for operational audit logs.</li>
                <li><strong>Zero Retention Toggle:</strong> Immediately purge audio recordings and call logs after CRM payload delivery.</li>
                <li><strong>Automatic Purge:</strong> Schedule automated 7-day or 14-day permanent data deletion.</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div id="user-rights" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl border-b border-white/10 pb-3">
                6. Your Rights & Data Sovereignty
              </h2>
              <p>
                Under GDPR, CCPA/CPRA, and global privacy standards, users maintain complete authority to:
              </p>
              <ul className="space-y-2">
                {[
                  "Request a full export of stored agent logs and customer records.",
                  "Execute immediate account and workspace data erasure.",
                  "Restrict processing or revoke API access tokens instantly.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-600">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 7 */}
            <div id="cookies-analytics" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl border-b border-white/10 pb-3">
                7. Cookies & Analytical Tracking
              </h2>
              <p>
                We use strictly necessary cookies to maintain secure sessions and performance metrics. We do not sell user data to third-party ad networks or data brokers.
              </p>
            </div>

            {/* Section 8 */}
            <div id="contact-dpo" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl border-b border-white/10 pb-3">
                8. Contact Our Data Protection Officer
              </h2>
              <p>
                If you have questions regarding this Privacy Policy or wish to submit a data subject access request, contact our security team at <strong className="text-emerald-400">privacy@mayray.ai</strong>.
              </p>
            </div>

              </>
            )}
          </main>

        </div>

      </div>
    </section>
  );
};
