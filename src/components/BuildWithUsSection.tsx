"use client";

import { useState } from "react";
import { MessageSquare, Mail, Copy, Check, Building2, Sparkles, ShieldCheck } from "lucide-react";

export default function BuildWithUsSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("Client Enterprise Platform (POS, PMS, CRM)");
  const [budget, setBudget] = useState("₦3M – ₦10M (Enterprise Build)");
  const [reference, setReference] = useState("");
  const [vision, setVision] = useState("");
  const [copied, setCopied] = useState(false);

  const formatBrief = () => {
    return `*PROJECT COMMISSION BRIEF // PACY LABS*
---------------------------------------
*Client / Organization:* ${name || "Not specified"}
*WhatsApp / Contact:* ${phone || "Not specified"}
*Engagement Category:* ${category}
*Target Budget Range:* ${budget}
*Existing URL / Reference:* ${reference || "None"}
*Project Vision & Technical Requirements:*
${vision || "Please reach out to review full technical specification."}
---------------------------------------
Dispatched via pacylabs.xyz`;
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(formatBrief());
    window.open(`https://wa.me/2349130262529?text=${text}`, "_blank");
  };

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Commission: ${category} - ${name || "Client"}`);
    const body = encodeURIComponent(formatBrief());
    window.location.href = `mailto:pacy@cruisehq.fun?subject=${subject}&body=${body}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formatBrief());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="build-with-us" className="relative py-20 sm:py-28 bg-[#090a0d] hairline-b overflow-hidden">
      {/* Brand Ambient Glow */}
      <div className="pointer-events-none absolute -bottom-20 right-10 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(58,13,28,0.35)_0%,_rgba(217,166,72,0.1)_40%,_transparent_75%)] blur-3xl opacity-70" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="text-[#f6dc8c] font-semibold border border-[#d9a648]/40 bg-[#3a0d1c]/40 px-1.5 py-0.5">05</span>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-300">COMMISSIONS &bull; CLIENT ADVISORY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-white mb-4">
                Build With Pacy Labs
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed mb-4">
                We engineer mission-critical enterprise platforms where failure is catastrophic. From bespoke hospitality operating systems like <strong className="text-white font-medium">Joebrown Palace Hotel</strong> to omnichannel hardware retail systems like <strong className="text-white font-medium">DreamwiseHUB</strong>, our clients trust us with their revenue cores.
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Whether you need a bespoke operational OS, an autonomous agent-ready WebMCP platform, or an exhaustive architectural audit before launch, we build with clinical precision.
              </p>
            </div>

            <div className="space-y-4 pt-2 font-mono text-xs">
              <div className="border border-white/10 bg-[#0e1015] p-4 space-y-1">
                <div className="text-white font-medium">
                  Client Enterprise Systems
                </div>
                <p className="text-zinc-400 font-sans text-xs">
                  Custom point-of-sale, multi-tier RBAC, property management, and isolated internal inventory state machines.
                </p>
              </div>

              <div className="border border-white/10 bg-[#0e1015] p-4 space-y-1">
                <div className="text-white font-medium">
                  W3C WebMCP &amp; Agent Infrastructure
                </div>
                <p className="text-zinc-400 font-sans text-xs">
                  Transforming conventional websites into native MCP-enabled platforms operated by AI browsing agents.
                </p>
              </div>

              <div className="border border-white/10 bg-[#0e1015] p-4 space-y-1">
                <div className="text-white font-medium">
                  Paranoid Codebase Audits
                </div>
                <p className="text-zinc-400 font-sans text-xs">
                  Pre-ship verification enforcing empirical proof for RLS policies, concurrency locks, and operational states.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Intake Form (7 cols) */}
          <div className="lg:col-span-7 border border-white/10 bg-[#0e1015] p-6 sm:p-8">
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-6 hairline-b pb-3">
              Direct Project Commission Intake
            </div>

            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-zinc-400 mb-1.5">
                    Client / Organization Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Joebrown Hotel, Dreamwise"
                    className="w-full border border-white/10 bg-black/60 px-3.5 py-2.5 font-mono text-xs text-white placeholder-zinc-600 focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-zinc-400 mb-1.5">
                    WhatsApp or Email
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234... or email@company.com"
                    className="w-full border border-white/10 bg-black/60 px-3.5 py-2.5 font-mono text-xs text-white placeholder-zinc-600 focus:border-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-zinc-400 mb-1.5">
                    Engagement Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-white/10 bg-black/60 px-3.5 py-2.5 font-mono text-xs text-white focus:border-white focus:outline-none"
                  >
                    <option value="Client Enterprise Platform (POS, PMS, CRM)">Client Enterprise Platform</option>
                    <option value="WebMCP Integration & AI Agent Architecture">WebMCP Integration &amp; Agent Tooling</option>
                    <option value="Pre-Ship Codebase Audit & Security Sign-Off">Pre-Ship Codebase Audit</option>
                    <option value="High-Concurrency Database Optimization">High-Concurrency Database Optimization</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs text-zinc-400 mb-1.5">
                    Target Budget Range
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full border border-white/10 bg-black/60 px-3.5 py-2.5 font-mono text-xs text-white focus:border-white focus:outline-none"
                  >
                    <option value="₦1.5M – ₦3M (Targeted Sprint)">₦1.5M – ₦3M (Targeted Sprint)</option>
                    <option value="₦3M – ₦10M (Enterprise Build)">₦3M – ₦10M (Enterprise Build)</option>
                    <option value="₦10M+ (Institutional Architecture)">₦10M+ (Institutional Architecture)</option>
                    <option value="Global / USD Tier ($3k – $15k+)">Global / USD Tier ($3k – $15k+)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-zinc-400 mb-1.5">
                  Existing Product URL or Wireframe (Optional)
                </label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="https://..."
                  className="w-full border border-white/10 bg-black/60 px-3.5 py-2.5 font-mono text-xs text-white placeholder-zinc-600 focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-zinc-400 mb-1.5">
                  Project Vision &amp; Technical Requirements
                </label>
                <textarea
                  rows={4}
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                  placeholder="Outline operational bottlenecks, required user roles, payment channels, expected transaction volume, or target delivery date..."
                  className="w-full border border-white/10 bg-black/60 px-3.5 py-2.5 font-mono text-xs text-white placeholder-zinc-600 focus:border-white focus:outline-none resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#d9a648] to-[#f6dc8c] hover:brightness-105 px-5 py-2.5 font-mono text-xs font-semibold text-black transition-all shadow-[0_0_20px_rgba(217,166,72,0.2)]"
                >
                  <MessageSquare className="h-4 w-4 text-black" />
                  <span>Send via WhatsApp (+234 913 026 2529)</span>
                </button>

                <button
                  type="button"
                  onClick={handleEmail}
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 px-5 py-2.5 font-mono text-xs font-semibold text-white transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>Send via Email</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-2 border border-white/10 px-4 py-2.5 font-mono text-xs text-zinc-400 hover:border-white/30 hover:text-white transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-zinc-200" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy Brief</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
