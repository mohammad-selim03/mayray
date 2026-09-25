"use client";

import React, { useState } from "react";
import { Scale, Zap, AlertTriangle } from "lucide-react";
import { usePageField } from "@/lib/PageContentContext";

const SECTIONS = [
  { id: "acceptance", title: "1. Acceptance of Terms & Service Scope" },
  { id: "sla-uptime", title: "2. Service Level Agreement (SLA & Uptime)" },
  { id: "acceptable-use", title: "3. Acceptable Use & AI Restrictions" },
  { id: "ip-ownership", title: "4. Intellectual Property & Customer Ownership" },
  { id: "billing-telephony", title: "5. Subscriptions, Fees & Telephony Billing" },
  { id: "warranties-liability", title: "6. Warranties & Limitation of Liability" },
  { id: "term-termination", title: "7. Term, Suspension & Data Export" },
  { id: "governing-law", title: "8. Governing Law & Arbitration" },
];

export const TermsContent = () => {
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

  const [activeSection, setActiveSection] = useState("acceptance");

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#0b0b12] py-16 text-white">
      <div className="mx-auto max-w-[1235px] px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Sticky Sidebar Table of Contents */}
          <aside className="lg:col-span-4 sticky top-24 rounded-3xl border border-white/10 bg-[#12121e] p-6 shadow-xl hidden lg:block">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
              <Scale className="h-4 w-4 text-cyan-400" />
              Terms Navigation
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
                        ? "bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30"
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
          <main className="lg:col-span-8 space-y-14 text-sm sm:text-base leading-[1.8] text-gray-300">
            
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
                <div id="acceptance" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-white sm:text-3xl border-b border-white/10 pb-3">
                1. Acceptance of Terms & Service Scope
              </h2>
              <p>
                These Terms & Conditions (&quot;Terms&quot;) govern your access to and use of Mayray AI software platforms, API endpoints, telephony agents, and autonomous workflow modules provided by Mayray AI Inc. (&quot;Mayray&quot;, &quot;Company&quot;, &quot;we&quot;).
              </p>
              <p>
                By registering an account, integrating Mayray APIs, or deploying Mayray Voice AI agents, you agree to be bound by these Terms and our Privacy Policy.
              </p>
            </div>

            {/* Section 2 - Highlight Card */}
            <div id="sla-uptime" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-white sm:text-3xl border-b border-white/10 pb-3">
                2. Service Level Agreement (SLA & 99.9% Uptime)
              </h2>
              <div className="rounded-3xl border border-cyan-500/30 bg-cyan-500/10 p-6 sm:p-8 space-y-3 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
                  <Zap className="h-4 w-4 text-cyan-400" />
                  Enterprise SLA Commitment
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  99.9% Monthly Uptime Guarantee for Core Telephony & API Pipelines
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                  Mayray AI guarantees 99.9% uptime for core API execution and telephony call routing. In the event of an unexcused service disruption exceeding SLA thresholds, eligible enterprise plan customers receive service credits pursuant to our Master Services Agreement (MSA).
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div id="acceptable-use" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-white sm:text-3xl border-b border-white/10 pb-3">
                3. Acceptable Use & Autonomous AI Restrictions
              </h2>
              <p>
                You agree to deploy Mayray AI agents in full compliance with local telecommunications rules, TCPA regulations, and industry guidelines.
              </p>
              <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 space-y-2 text-xs sm:text-sm text-red-200">
                <div className="flex items-center gap-2 font-bold text-red-400">
                  <AlertTriangle className="h-4 w-4" /> Prohibited Activities:
                </div>
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  <li>Unsolicited spam robocalling in violation of TCPA or TSR rules.</li>
                  <li>Impersonating government officials or emergency services.</li>
                  <li>Using voice AI agents for fraudulent, deceptive, or harassment activities.</li>
                  <li>Attempting to reverse-engineer or extract base weights from Mayray models.</li>
                </ul>
              </div>
            </div>

            {/* Section 4 */}
            <div id="ip-ownership" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-white sm:text-3xl border-b border-white/10 pb-3">
                4. Intellectual Property & Customer Data Ownership
              </h2>
              <p>
                <strong>Customer Ownership:</strong> You retain sole ownership of all customer inputs, prompts, custom fine-tuning data, voice recordings, and workflow configurations.
              </p>
              <p>
                <strong>Mayray Ownership:</strong> Mayray retains all right, title, and interest in and to Mayray platform software, core agent architectures, APIs, and trademark assets.
              </p>
            </div>

            {/* Section 5 */}
            <div id="billing-telephony" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-white sm:text-3xl border-b border-white/10 pb-3">
                5. Subscriptions, Fees & Telephony Metering
              </h2>
              <p>
                Platform subscription fees are billed in advance on a recurring monthly or annual basis. Telephony minutes and API execution tokens above subscription allowances are metered and billed based on your selected rate plan.
              </p>
            </div>

            {/* Section 6 */}
            <div id="warranties-liability" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-white sm:text-3xl border-b border-white/10 pb-3">
                6. Warranties & Limitation of Liability
              </h2>
              <p>
                Except as expressly provided, Mayray services are provided &quot;AS IS&quot;. To the maximum extent permitted by law, Mayray&apos;s total aggregate liability arising out of or related to these Terms shall not exceed the total fees paid by you in the 12 months preceding the event.
              </p>
            </div>

            {/* Section 7 */}
            <div id="term-termination" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-white sm:text-3xl border-b border-white/10 pb-3">
                7. Term, Suspension & Data Export
              </h2>
              <p>
                Either party may terminate a subscription upon 30 days written notice prior to renewal. Upon termination, you have 30 days to export your CRM logs and configuration data before permanent deletion.
              </p>
            </div>

            {/* Section 8 */}
            <div id="governing-law" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-white sm:text-3xl border-b border-white/10 pb-3">
                8. Governing Law & Dispute Resolution
              </h2>
              <p>
                These Terms shall be governed by the laws of the State of Delaware, without regard to conflict of law principles. Any dispute shall be resolved through binding confidential arbitration.
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
