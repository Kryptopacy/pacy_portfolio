"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldAlert, Cpu, Sparkles, Clock, Hammer } from "lucide-react";
import { playMechanicalClick } from "@/lib/soundEffects";

const ENGAGEMENT_MODELS = [
  {
    tier: "01 // TURNKEY COMMISSION",
    title: "Full-Stack Systems & OS Build",
    duration: "4 – 8 Weeks Sprint",
    idealFor: "Funded startups, hospitality groups, multi-location retail, or Web3 foundations needing bespoke platforms.",
    summary:
      "End-to-end design and engineering of an enterprise platform or operating system with deterministic concurrency guarantees, custom PostgreSQL schemas, modern Next.js/React frontend, and autonomous agent readiness.",
    deliverables: [
      "Custom PostgreSQL schema with strict RLS & atomic PL/pgSQL locks",
      "Next.js 16 / React 19 high-craft interface with sub-100ms UI targets",
      "Multi-rail payment gateway (Cards, USSD, Crypto, x402 micropayments)",
      "Role-based staff portals & real-time WebSocket state machines",
      "Full source code ownership, zero-defect deployment, and CI/CD pipelines",
    ],
    ctaText: "Commission an Enterprise OS",
    ctaHref: "/build-with-us",
    featured: true,
  },
  {
    tier: "02 // FORENSIC SPRINT",
    title: "Systems & Concurrency Audit",
    duration: "1 Week Intensive",
    idealFor: "Existing production applications experiencing race conditions, double-spend collisions, or preparing for high-traffic launch.",
    summary:
      "A forensic, hospital-grade triage audit of your codebase. We stress-test state transitions, eliminate memory leaks and race conditions, tune database locks, and harden API boundaries.",
    deliverables: [
      "Exhaustive differential architecture & debt report",
      "Elimination of race conditions via SELECT FOR UPDATE row-locking",
      "Database query & index tuning (expression indexes, pooler vacuuming)",
      "W3C WebMCP readiness & agent security evaluation",
      "Executive sign-off verdict: Approved, Held, or Hardened",
    ],
    ctaText: "Request Forensic Audit",
    ctaHref: "/build-with-us",
    featured: false,
  },
  {
    tier: "03 // FRACTIONAL ADVISORY",
    title: "Principal Systems Architect",
    duration: "Monthly Retainer",
    idealFor: "Founders and CTOs needing world-class systems leadership without hiring a full-time executive salary.",
    summary:
      "Direct technical advisory on system design, distributed consensus, agentic protocols, and multimodal AI pipelines. Weekly architecture reviews, RFC design, and code vetting.",
    deliverables: [
      "Weekly synchronous architectural design reviews",
      "Review & sign-off on PRs, database migrations, and protocols",
      "Evaluation and calibration of LLM/multimodal agent pipelines",
      "Direct WhatsApp & Slack hotline for critical incident triage",
      "Priority scheduling for engineering sprint execution",
    ],
    ctaText: "Inquire for Retainer",
    ctaHref: "/build-with-us",
    featured: false,
  },
];

export default function ClientEngagements() {
  return (
    <section id="engagements" className="relative py-20 sm:py-28 bg-transparent hairline-b overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle,_rgba(58,13,28,0.30)_0%,_rgba(217,166,72,0.06)_40%,_transparent_75%)] blur-3xl opacity-70" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 mb-16 hairline-b">
          <div className="max-w-2xl">
            <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="text-[#f6dc8c]">&bull;</span>
              <span>COMMISSION STRUCTURE &bull; HOW WE ENGAGE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white mb-3">
              Engagement Models &amp; Sprints
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
              We operate as a high-velocity, sovereign engineering lab. Engagements are structured with clear deliverables, deterministic milestones, and zero architectural debt.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 shrink-0">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Accepting Q4 2026 Commissions</span>
          </div>
        </div>

        {/* 3-Tier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {ENGAGEMENT_MODELS.map((model, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-between rounded-sm p-6 sm:p-8 transition-all duration-300 ${
                model.featured
                  ? "bg-gradient-to-b from-[#2d0814]/90 via-[#18030b]/95 to-[#100105] border border-[#d9a648]/60 shadow-[0_20px_50px_rgba(217,166,72,0.12)] relative"
                  : "glass-panel border border-white/10 hover:border-white/20"
              }`}
            >
              {model.featured && (
                <div className="absolute -top-3 left-6 bg-[#d9a648] text-black font-mono text-[10px] font-bold px-2.5 py-0.5 tracking-wider uppercase">
                  Flagship Engagement
                </div>
              )}

              <div>
                {/* Header */}
                <div className="font-mono text-[10px] text-[#f6dc8c] uppercase tracking-wider mb-2">
                  {model.tier}
                </div>

                <h3 className="text-xl sm:text-2xl font-medium text-white mb-2">
                  {model.title}
                </h3>

                <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 mb-4 pb-3 border-b border-white/08">
                  <Clock className="h-3.5 w-3.5 text-[#d9a648]" />
                  <span>{model.duration}</span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                  {model.summary}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2.5 pt-4 border-t border-white/08 mb-8">
                  <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                    Core Deliverables:
                  </div>
                  {model.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-zinc-300 font-light">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#d9a648] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Button */}
              <div className="pt-4 border-t border-white/10">
                <Link
                  href={model.ctaHref}
                  onClick={playMechanicalClick}
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 font-mono text-xs font-semibold transition-all ${
                    model.featured
                      ? "bg-gradient-to-r from-[#d9a648] to-[#f6dc8c] text-black hover:brightness-110 shadow-[0_0_20px_rgba(217,166,72,0.25)]"
                      : "glass-chip text-white border-white/20 hover:border-[#d9a648]/60 hover:text-[#f6dc8c]"
                  }`}
                >
                  <span>{model.ctaText}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
