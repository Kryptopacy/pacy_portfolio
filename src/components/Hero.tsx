"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const PROPRIETARY_HIGHLIGHTS = [
  { id: "wetaego", label: "wetaego.com", sub: "W3C WebMCP Commerce OS", color: "text-sky-400", border: "border-sky-500/25", hoverBorder: "hover:border-sky-400/60" },
  { id: "cruisehq", label: "cruisehq.fun", sub: "City-Scale Social Platform", color: "text-indigo-400", border: "border-indigo-500/25", hoverBorder: "hover:border-indigo-400/60" },
  { id: "baunti", label: "baunti.cruisehq.fun", sub: "Escrow Bounty Protocol", color: "text-rose-400", border: "border-rose-500/25", hoverBorder: "hover:border-rose-400/60" },
  { id: "huiyi", label: "huiyi.cruisehq.fun", sub: "AI Multimodal Event Video", color: "text-purple-400", border: "border-purple-500/25", hoverBorder: "hover:border-purple-400/60" },
  { id: "caelumos", label: "caelumos.trade", sub: "Precision Trader OS", color: "text-cyan-400", border: "border-cyan-500/25", hoverBorder: "hover:border-cyan-400/60" },
  { id: "pitchbuddy", label: "pitchbuddy.cruisehq.fun", sub: "Football Venue OS", color: "text-emerald-400", border: "border-emerald-500/25", hoverBorder: "hover:border-emerald-400/60" },
  { id: "gebo", label: "gebo-bsc.vercel.app", sub: "Agent Verification Registry", color: "text-amber-400", border: "border-amber-500/25", hoverBorder: "hover:border-amber-400/60" },
];

export default function Hero() {
  const [lensMode, setLensMode] = useState<"systems" | "clinical">("systems");

  return (
    <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 hairline-b bg-[#090a0d] overflow-hidden">
      {/* Ambient Brand Atmosphere: Deep Burgundy Core & Warm Circuit Gold Corona */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-[radial-gradient(ellipse_at_top,_rgba(58,13,28,0.45)_0%,_rgba(217,166,72,0.12)_40%,_transparent_75%)] blur-3xl opacity-80" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">

        {/* Editorial Topline with Pacy Labs Insignia */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-12 hairline-b font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-6 relative shrink-0 p-0.5 rounded border border-[#d9a648]/40 bg-[#3a0d1c]/40">
              <Image
                src="/brand/pacylabs-logo-256.webp"
                alt="Pacy Labs Logo Mark"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <span className="text-[#f6dc8c] font-semibold tracking-wider">PACY LABS</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-300">OLAMILEKAN DAVID ADEGOKE</span>
          </div>
          <div className="text-zinc-300 flex items-center gap-2">
            <span className="text-[#d9a648] font-medium tracking-wider">DOCTOR OF OPTOMETRY (OD)</span>
            <span className="text-zinc-600">·</span>
            <span className="text-emerald-400 font-medium tracking-wider">FULL-STACK SYSTEMS ARCHITECT</span>
          </div>
        </div>

        {/* Headline */}
        <div className="max-w-5xl mb-12">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.08] mb-7">
            Engineering deterministic platforms with clinical diagnostic precision.
          </h1>

          <p className="text-base sm:text-xl text-zinc-400 font-light leading-relaxed max-w-3xl">
            In clinical differential diagnosis across{" "}
            <span className="text-white font-medium">1,500+ patient encounters</span>,
            diagnostic triage leaves zero margin for error. I bring that clinical rigor directly
            to distributed software—architecting proprietary autonomous systems, W3C WebMCP agent
            protocols, and high-concurrency commercial webapps commissioned by enterprise brands.
          </p>
        </div>

        {/* Perspective Lens Toggle */}
        <div className="mb-14 max-w-4xl border border-white/10 bg-[#0e1015] p-6 sm:p-7 glow-on-hover transition-all duration-300">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <span className="font-mono text-xs tracking-wider text-zinc-400 uppercase flex items-center gap-2">
              <span className="text-sky-400">PERSPECTIVE MATRIX</span>
              <span className="text-zinc-600">/</span>
              <span>OPERATIONAL LENS</span>
            </span>

            {/* Segmented Control */}
            <div className="flex items-center border border-white/15 bg-black/60 p-0.5 font-mono text-xs">
              <button
                type="button"
                onClick={() => setLensMode("systems")}
                className={`px-3 py-1.5 transition-all duration-200 ${
                  lensMode === "systems"
                    ? "bg-zinc-100 text-black font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                Systems Architecture
              </button>
              <button
                type="button"
                onClick={() => setLensMode("clinical")}
                className={`px-3 py-1.5 transition-all duration-200 ${
                  lensMode === "clinical"
                    ? "bg-zinc-100 text-black font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                Clinical Differential
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            {lensMode === "systems" ? (
              <>
                <div className="space-y-1.5 border-l-2 border-sky-500/50 pl-4 bg-sky-950/10 py-2 transition-all duration-200 hover:bg-sky-950/20 hover:border-sky-400/70">
                  <div className="text-sky-400 uppercase text-[11px] tracking-widest">01 / Concurrency Control</div>
                  <div className="text-white font-medium text-sm">Atomic PL/pgSQL RPCs</div>
                  <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                    Row-level locks (<code className="text-sky-300">SELECT FOR UPDATE</code>) preventing double-bookings and race conditions on commercial platforms.
                  </p>
                </div>

                <div className="space-y-1.5 border-l-2 border-indigo-500/50 pl-4 bg-indigo-950/10 py-2 transition-all duration-200 hover:bg-indigo-950/20 hover:border-indigo-400/70">
                  <div className="text-indigo-400 uppercase text-[11px] tracking-widest">02 / Agent Protocols</div>
                  <div className="text-white font-medium text-sm">W3C WebMCP Standard</div>
                  <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                    8 canonical client tools dynamically registered on <code className="text-indigo-300">document.modelContext</code> with human-in-the-loop gates.
                  </p>
                </div>

                <div className="space-y-1.5 border-l-2 border-amber-500/50 pl-4 bg-amber-950/10 py-2 transition-all duration-200 hover:bg-amber-950/20 hover:border-amber-400/70">
                  <div className="text-amber-400 uppercase text-[11px] tracking-widest">03 / Blast Radius Bounds</div>
                  <div className="text-white font-medium text-sm">EIP-7702 &amp; APEX Escrow</div>
                  <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                    Monotonic revocation guards indexing 338k+ on-chain agents on BNB Smart Chain.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1.5 border-l-2 border-amber-500/50 pl-4 bg-amber-950/10 py-2 transition-all duration-200 hover:bg-amber-950/20 hover:border-amber-400/70">
                  <div className="text-amber-400 uppercase text-[11px] tracking-widest">01 / Differential Triage</div>
                  <div className="text-white font-medium text-sm">Isolating Pathologies</div>
                  <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                    1,500+ patient encounters ruling out mimicking pathologies through exclusionary evidence before prescribing interventions.
                  </p>
                </div>

                <div className="space-y-1.5 border-l-2 border-rose-500/50 pl-4 bg-rose-950/10 py-2 transition-all duration-200 hover:bg-rose-950/20 hover:border-rose-400/70">
                  <div className="text-rose-400 uppercase text-[11px] tracking-widest">02 / Error Tolerance</div>
                  <div className="text-white font-medium text-sm">Zero False-Positive Target</div>
                  <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                    Ophthalmic diagnostic rigor requires non-negotiable verification thresholds under irreversible biological stakes.
                  </p>
                </div>

                <div className="space-y-1.5 border-l-2 border-emerald-500/50 pl-4 bg-emerald-950/10 py-2 transition-all duration-200 hover:bg-emerald-950/20 hover:border-emerald-400/70">
                  <div className="text-emerald-400 uppercase text-[11px] tracking-widest">03 / Clinical Crossover</div>
                  <div className="text-white font-medium text-sm">Deterministic Software</div>
                  <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                    Treating software concurrency flaws with the exact same gravity, isolation, and telemetry as physiological emergencies.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Proprietary Platforms Index — No commercial links here */}
        <div className="mb-12">
          <div className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-4">
            — 7 Proprietary Systems
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 fade-up-stagger">
            {PROPRIETARY_HIGHLIGHTS.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className={`group block border ${p.border} ${p.hoverBorder} bg-[#0e1015] px-4 py-3 transition-all duration-250 hover:bg-[#12151c] lift-hover`}
              >
                <div className={`text-xs font-mono font-medium truncate ${p.color} mb-1 arrow-nudge`}>
                  {p.label}
                  <ArrowUpRight className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity -mt-0.5" />
                </div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider truncate">
                  {p.sub}
                </div>
              </Link>
            ))}
            {/* Commission CTA tile */}
            <Link
              href="/build-with-us"
              className="group block border border-white/10 hover:border-white/25 bg-[#0e1015] px-4 py-3 transition-all duration-250 hover:bg-[#12151c] lift-hover"
            >
              <div className="text-xs font-mono text-zinc-300 group-hover:text-white mb-1 transition-colors">
                Commission a Build
              </div>
              <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
                + Enterprise Contract →
              </div>
            </Link>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/08">
          <Link
            href="/build-with-us"
            className="inline-flex items-center gap-2 bg-zinc-100 px-6 py-3 font-mono text-xs font-semibold text-black hover:bg-white transition-all duration-200 cta-slide"
          >
            <span>Commission an Enterprise Build</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 border border-white/20 bg-black/40 px-6 py-3 font-mono text-xs text-zinc-300 hover:border-white/40 hover:text-white transition-all duration-200 hover:bg-white/5"
          >
            <span>Explore All Production Blueprints</span>
            <ArrowRight className="h-4 w-4 text-zinc-500 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
