"use client";

import { useState } from "react";
import {
  MessageSquare,
  Mail,
  Check,
} from "lucide-react";

export default function BuildWithUsPage() {
  const [platformType, setPlatformType] = useState("Hospitality / Booking Operating System");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "Atomic Concurrency & Row Locks (Zero Double-Booking)",
    "PostgreSQL Row-Level Security (RLS) & Hardened RBAC",
  ]);
  const [timeline, setTimeline] = useState("3-6 Weeks Enterprise Sprint");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientOrg, setClientOrg] = useState("");
  const [projectBrief, setProjectBrief] = useState("");

  const availableFeatures = [
    "Atomic Concurrency & Row Locks (Zero Double-Booking)",
    "PostgreSQL Row-Level Security (RLS) & Hardened RBAC",
    "Gemini Multimodal Live API Voice & Vision Agent",
    "W3C WebMCP Integration (document.modelContext)",
    "Multi-Station KDS & Driverless Thermal Printing (WebUSB/WebSerial)",
    "Dual-Rail Payments (Bachs, Paystack, Crypto x402)",
    "Interactive 2D Drag-and-Drop Floor Plan Canvas",
    "Pacy Codebase Auditor 20-Point Launch Sign-Off",
  ];

  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const getStructuredBrief = () => {
    return `### Enterprise Platform Commission Brief
**Client:** ${clientName || "Prospective Client"} (${clientOrg || "Private Client"})
**Email:** ${clientEmail || "Not provided"}
**Target Platform:** ${platformType}
**Target Timeline:** ${timeline}

**Required Architectural Modules:**
${selectedFeatures.map((f) => `- ${f}`).join("\n")}

**Project Context & Requirements:**
${projectBrief || "Full architecture consultation requested."}
`;
  };

  const handleWhatsAppDispatch = () => {
    const brief = getStructuredBrief();
    const encoded = encodeURIComponent(brief);
    window.open(`https://wa.me/2349130262529?text=${encoded}`, "_blank");
  };

  const handleEmailDispatch = () => {
    const brief = getStructuredBrief();
    const subject = encodeURIComponent(`Enterprise Architecture Commission: ${platformType} - ${clientOrg || clientName || "Inquiry"}`);
    const body = encodeURIComponent(brief);
    window.location.href = `mailto:pacy@cruisehq.fun?subject=${subject}&body=${body}`;
  };

  return (
    <div className="py-14 sm:py-24 bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="text-[#f6dc8c]">&bull;</span>
            <span>COMMISSIONS &bull; CLIENT ADVISORY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-6">
            Commission an Enterprise Platform
          </h1>
          <p className="text-base sm:text-xl text-[#d4c5ca] font-light leading-relaxed">
            I partner directly with founders, enterprise executives, and institutions requiring zero-error operational systems. From custom hotel operating systems to W3C WebMCP agent infrastructure, every build is delivered with clinical diagnostic precision.
          </p>
        </div>

        {/* Interactive Scope & Architecture Configurator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          {/* Left Column: Configurator Form (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Step 1: Platform Type */}
            <div className="space-y-4">
              <label className="block font-mono text-xs text-[#f6dc8c] uppercase tracking-wider flex items-center gap-2">
                <span>01</span>
                <span>/</span>
                <span>SELECT PLATFORM ARCHITECTURE</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                {[
                  "Hospitality / Booking Operating System",
                  "Hardware Retail POS & Repair CRM",
                  "Agent-Native WebMCP Platform",
                  "Real-Time Social / Voice Concierge",
                  "Escrowed Prize & Cryptographic Draw Engine",
                  "Custom High-Concurrency Web App",
                ].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPlatformType(type)}
                    className={`p-3.5 text-left border transition-all ${
                      platformType === type
                        ? "bg-[#3a0d1c] text-[#f6dc8c] border-[#d9a648]/50 font-semibold shadow-[0_0_12px_rgba(217,166,72,0.2)]"
                        : "glass-chip text-zinc-400 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Concurrency & Infrastructure Features */}
            <div className="space-y-4">
              <label className="block font-mono text-xs text-[#f6dc8c] uppercase tracking-wider flex items-center gap-2">
                <span>02</span>
                <span>/</span>
                <span>REQUIRED ARCHITECTURAL MODULES</span>
              </label>
              <div className="grid grid-cols-1 gap-2.5 font-mono text-xs">
                {availableFeatures.map((feature) => {
                  const isChecked = selectedFeatures.includes(feature);
                  return (
                    <button
                      key={feature}
                      type="button"
                      onClick={() => toggleFeature(feature)}
                      className={`flex items-center gap-3 p-3 text-left border transition-all ${
                        isChecked
                          ? "border-[#d9a648]/40 bg-[#3a0d1c]/40 text-[#f6dc8c] shadow-[0_0_10px_rgba(217,166,72,0.15)]"
                          : "glass-chip text-zinc-400 hover:border-white/25 hover:text-white"
                      }`}
                    >
                      <div
                        className={`h-4 w-4 border flex items-center justify-center shrink-0 ${
                          isChecked
                            ? "border-[#d9a648] bg-[#d9a648] text-[#120207]"
                            : "border-white/20"
                        }`}
                      >
                        {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                      <span>{feature}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Target Timeline */}
            <div className="space-y-4">
              <label className="block font-mono text-xs text-[#f6dc8c] uppercase tracking-wider flex items-center gap-2">
                <span>03</span>
                <span>/</span>
                <span>TARGET DELIVERY WINDOW</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                {[
                  "2-4 Weeks Sprint",
                  "3-6 Weeks Enterprise",
                  "2-3 Months Full Build",
                ].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTimeline(t)}
                    className={`p-3 text-center border transition-all ${
                      timeline === t
                        ? "bg-[#3a0d1c] text-[#f6dc8c] border-[#d9a648]/50 font-semibold shadow-[0_0_12px_rgba(217,166,72,0.2)]"
                        : "glass-chip text-zinc-400 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Contact Details */}
            <div className="space-y-4">
              <label className="block font-mono text-xs text-[#f6dc8c] uppercase tracking-wider flex items-center gap-2">
                <span>04</span>
                <span>/</span>
                <span>CONTACT INFORMATION &amp; BRIEF</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="glass-input p-3 font-mono text-xs text-white placeholder-zinc-500 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="glass-input p-3 font-mono text-xs text-white placeholder-zinc-500 focus:outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="Company / Organization Name"
                value={clientOrg}
                onChange={(e) => setClientOrg(e.target.value)}
                className="w-full glass-input p-3 font-mono text-xs text-white placeholder-zinc-500 focus:outline-none"
              />
              <textarea
                rows={4}
                placeholder="Briefly describe operational bottlenecks, required user roles, payment channels, or expected launch timing..."
                value={projectBrief}
                onChange={(e) => setProjectBrief(e.target.value)}
                className="w-full glass-input p-3 font-mono text-xs text-white placeholder-zinc-500 focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Right Column: Dynamic Spec & Dispatch (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-24 glass-panel p-6 sm:p-8 space-y-6 rounded-sm">
              <div className="pb-4 hairline-b font-mono text-xs text-[#f6dc8c] flex items-center justify-between">
                <span>COMMISSION SPECIFICATION</span>
                <span className="text-[10px] border border-[#d9a648]/40 bg-[#3a0d1c]/50 px-1.5 py-0.5">ENCRYPTED</span>
              </div>

              {/* Dynamic Summary */}
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="text-zinc-500 uppercase text-[10px]">Architecture</div>
                  <div className="text-white font-medium text-sm mt-0.5">{platformType}</div>
                </div>

                <div>
                  <div className="text-zinc-500 uppercase text-[10px]">Delivery Window</div>
                  <div className="text-white mt-0.5">{timeline}</div>
                </div>

                <div>
                  <div className="text-zinc-500 uppercase text-[10px] mb-1">
                    Modules Selected ({selectedFeatures.length})
                  </div>
                  <ul className="space-y-1.5 text-zinc-300 max-h-36 overflow-y-auto pr-1">
                    {selectedFeatures.map((f, i) => (
                      <li key={i} className="text-xs text-zinc-400 border-l border-[#d9a648]/40 pl-2 leading-relaxed">
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Two Primary Dispatch Buttons */}
              <div className="space-y-3 pt-4 hairline-t">
                {/* WhatsApp Dispatch */}
                <button
                  type="button"
                  onClick={handleWhatsAppDispatch}
                  className="flex items-center justify-center gap-2.5 w-full bg-gradient-to-r from-[#d9a648] to-[#f6dc8c] hover:brightness-105 p-3.5 font-mono text-xs font-semibold text-[#120207] transition-all shadow-[0_0_20px_rgba(217,166,72,0.25)]"
                >
                  <MessageSquare className="h-4 w-4 text-[#120207]" />
                  <span>Dispatch via WhatsApp (+234 913 026 2529)</span>
                </button>

                {/* Direct Email Dispatch */}
                <button
                  type="button"
                  onClick={handleEmailDispatch}
                  className="flex items-center justify-center gap-2.5 w-full glass-chip hover:border-[#d9a648]/40 hover:text-[#f6dc8c] p-3.5 font-mono text-xs font-semibold text-white transition-all"
                >
                  <Mail className="h-4 w-4" />
                  <span>Send Direct Email (pacy@cruisehq.fun)</span>
                </button>
              </div>

              {/* SLA Specification */}
              <div className="glass-chip p-4 font-mono text-xs text-zinc-400 space-y-2 border border-[#d9a648]/20">
                <div className="text-[#f6dc8c] font-medium flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d9a648]" />
                  <span>Pacy Labs Architecture SLA</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Guaranteed zero race conditions, atomic database transactions, 100% test coverage on mission-critical revenue RPCs, and full post-deployment handover documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
