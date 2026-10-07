"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, ShieldCheck, Cpu, Database, Activity, Sparkles } from "lucide-react";

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
  return (
    <section className="relative pt-16 pb-20 sm:pt-28 sm:pb-32 hairline-b bg-transparent overflow-hidden">
      {/* Ambient Brand Atmosphere: Deep Imperial Burgundy Core & Circuit Gold Corona */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-[radial-gradient(ellipse_at_top,_rgba(88,18,42,0.70)_0%,_rgba(58,13,28,0.45)_30%,_rgba(217,166,72,0.16)_55%,_transparent_75%)] blur-3xl opacity-90" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Top Eyebrow Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-12 hairline-b font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 shrink-0 flex items-center justify-center p-0.5 rounded border border-[#d9a648]/60 bg-gradient-to-br from-[#3a0d1c] via-[#23040e] to-[#120207] shadow-[0_0_16px_rgba(217,166,72,0.35)]">
              <Image
                src="/brand/pacylabs-logo-256.webp"
                alt="Pacy Labs Circuit Logo"
                width={26}
                height={26}
                className="object-contain"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#f6dc8c] font-semibold tracking-wider">PACY LABS</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-300">AUTONOMOUS SYSTEMS STUDIO</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-zinc-400">
            <span className="text-zinc-500 font-mono">EST. 2026</span>
          </div>
        </div>

        {/* Master Headline Section */}
        <div className="max-w-5xl mb-14">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.06] mb-8">
            Engineering deterministic platforms and autonomous agent architectures.
          </h1>

          <p className="text-lg sm:text-2xl text-[#e6d8dc] font-light leading-relaxed max-w-3xl">
            <strong className="text-white font-medium">Pacy Labs</strong> is an independent software laboratory. We architect high-throughput operating systems, W3C WebMCP agent protocols, and production web applications engineered for zero-defect execution under extreme scale.
          </p>
        </div>

        {/* Live Studio Architecture Telemetry HUD */}
        <div className="mb-14 glass-panel p-6 sm:p-8 border border-[#d9a648]/25 shadow-[0_20px_50px_rgba(18,2,7,0.7)]">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-medium">LIVE ARCHITECTURAL GUARANTEES</span>
              <span className="text-zinc-600">/</span>
              <span className="text-[#f6dc8c]">PROPRIETARY INVARIANTS</span>
            </div>
            <span className="hidden sm:inline text-[11px] text-zinc-500 uppercase tracking-wider">
              DETERMINISTIC CONCURRENCY MODEL
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
            {/* Guarantee 01 */}
            <div className="p-4 bg-[#120207]/70 border border-sky-500/20 space-y-2 hover:border-sky-400/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sky-400 text-[10px] tracking-widest uppercase">01 // CONCURRENCY</span>
                <span className="text-emerald-400 text-[9px] border border-emerald-900/60 bg-emerald-950/30 px-1.5 py-0.2">ROW LOCK</span>
              </div>
              <div className="text-white font-medium text-sm flex items-center gap-2">
                <Database className="h-4 w-4 text-sky-400" />
                <span>Atomic PL/pgSQL RPCs</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Row-level locks (<code className="text-sky-300">SELECT FOR UPDATE</code>) guaranteeing zero double-bookings and zero inventory overselling across high-traffic platforms.
              </p>
            </div>

            {/* Guarantee 02 */}
            <div className="p-4 bg-[#120207]/70 border border-indigo-500/20 space-y-2 hover:border-indigo-400/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-indigo-400 text-[10px] tracking-widest uppercase">02 // AGENT PROTOCOL</span>
                <span className="text-indigo-300 text-[9px] border border-indigo-900/60 bg-indigo-950/30 px-1.5 py-0.2">W3C VERIFIED</span>
              </div>
              <div className="text-white font-medium text-sm flex items-center gap-2">
                <Cpu className="h-4 w-4 text-indigo-400" />
                <span>W3C WebMCP Standard</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Dynamic Model Context Protocol registration on <code className="text-indigo-300">document.modelContext</code> with human-in-the-loop permission boundaries.
              </p>
            </div>

            {/* Guarantee 03 */}
            <div className="p-4 bg-[#120207]/70 border border-[#d9a648]/20 space-y-2 hover:border-[#d9a648]/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[#f6dc8c] text-[10px] tracking-widest uppercase">03 // SETTLEMENT</span>
                <span className="text-amber-400 text-[9px] border border-amber-900/60 bg-amber-950/30 px-1.5 py-0.2">NON-CUSTODIAL</span>
              </div>
              <div className="text-white font-medium text-sm flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#d9a648]" />
                <span>EIP-7702 &amp; APEX Escrow</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Monotonic revocation guards, milestone-locked escrow disbursement, and 338,000+ indexed autonomous agent identities.
              </p>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d9a648] to-[#f6dc8c] hover:brightness-110 px-6 py-3.5 font-mono text-xs font-semibold text-black transition-all duration-200 shadow-[0_0_25px_rgba(217,166,72,0.3)]"
          >
            <span>Explore Systems Catalog</span>
            <ArrowRight className="h-4 w-4 text-black" />
          </Link>

          <Link
            href="/build-with-us"
            className="inline-flex items-center gap-2 glass-chip px-6 py-3.5 font-mono text-xs text-zinc-200 border-white/20 hover:border-[#d9a648]/60 hover:text-white transition-all duration-200"
          >
            <span>Commission an Enterprise Build</span>
            <ArrowUpRight className="h-4 w-4 text-[#d9a648]" />
          </Link>

          <Link
            href="#founder"
            className="inline-flex items-center gap-2 px-5 py-3.5 font-mono text-xs text-[#f6dc8c] hover:text-white hover:underline transition-colors"
          >
            <span>Meet Principal Architect &rarr;</span>
          </Link>
        </div>

        {/* Proprietary Platforms Quick Strip */}
        <div>
          <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d9a648]" />
            <span>Proprietary Production Engines &bull; Direct Case Studies</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {PROPRIETARY_HIGHLIGHTS.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className={`group block border ${p.border} ${p.hoverBorder} glass-panel-interactive px-4 py-3`}
              >
                <div className={`text-xs font-mono font-medium truncate ${p.color} mb-1 flex items-center justify-between`}>
                  <span>{p.label}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider truncate">
                  {p.sub}
                </div>
              </Link>
            ))}
            {/* Commercial commissioning tile */}
            <Link
              href="/build-with-us"
              className="group block border border-[#d9a648]/40 hover:border-[#d9a648]/80 glass-panel-interactive px-4 py-3 bg-gradient-to-br from-[#3a0d1c]/40 to-transparent"
            >
              <div className="text-xs font-mono text-[#f6dc8c] group-hover:text-white mb-1 transition-colors flex items-center justify-between">
                <span>Commission an OS</span>
                <ArrowRight className="h-3 w-3 text-[#d9a648]" />
              </div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                Enterprise Contract
              </div>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
