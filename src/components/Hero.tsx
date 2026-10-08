"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Terminal, Layers, ShieldCheck, Cpu } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-16 sm:pt-32 sm:pb-24 hairline-b bg-transparent overflow-hidden">
      {/* Ambient Brand Atmosphere: Deep Imperial Burgundy Core & Circuit Gold Corona */}
      <div className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-[radial-gradient(ellipse_at_top,_rgba(88,18,42,0.65)_0%,_rgba(58,13,28,0.40)_32%,_rgba(217,166,72,0.12)_58%,_transparent_75%)] blur-3xl opacity-90" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Subtle Brand Eyebrow Pill */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#d9a648]/30 bg-[#2d0814]/70 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(217,166,72,0.12)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#d9a648] animate-pulse" />
          <span className="font-mono text-[11px] font-semibold text-[#f6dc8c] tracking-wider uppercase">
            PACY LABS
          </span>
          <span className="text-zinc-600">&bull;</span>
          <span className="font-mono text-[11px] text-zinc-300 tracking-wide">
            AUTONOMOUS SYSTEMS STUDIO
          </span>
        </div>

        {/* Master Headline Section */}
        <div className="max-w-5xl mb-10 sm:mb-12">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.05] mb-6">
            Engineering deterministic platforms and autonomous agent architectures.
          </h1>

          <p className="text-lg sm:text-2xl text-[#d4c5ca] font-light leading-relaxed max-w-3xl">
            An independent software architecture laboratory. We design and deploy high-throughput operating systems, W3C WebMCP agent protocols, and production web applications engineered for zero-defect execution under extreme concurrency.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-16 sm:mb-20">
          <a
            href="#platforms"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d9a648] to-[#f6dc8c] hover:brightness-110 px-6 py-3.5 font-mono text-xs font-semibold text-black transition-all shadow-[0_0_25px_rgba(217,166,72,0.3)]"
          >
            <span>Explore Systems Showcase</span>
            <ArrowRight className="h-4 w-4 text-black" />
          </a>

          <Link
            href="/build-with-us"
            className="inline-flex items-center gap-2 glass-chip px-6 py-3.5 font-mono text-xs text-zinc-200 border-white/20 hover:border-[#d9a648]/60 hover:text-white transition-all"
          >
            <span>Commission an Enterprise Build</span>
            <ArrowUpRight className="h-4 w-4 text-[#d9a648]" />
          </Link>

          <Link
            href="/dossier"
            className="inline-flex items-center gap-1.5 px-4 py-3.5 font-mono text-xs text-[#f6dc8c] hover:text-white hover:underline transition-colors"
          >
            <span>Principal Architect Dossier &rarr;</span>
          </Link>
        </div>

        {/* Clean Architectural Telemetry Strip (No fake card clutter) */}
        <div className="pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs">
          <div>
            <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">
              Production Portfolio
            </div>
            <div className="text-white text-sm sm:text-base font-medium flex items-center gap-1.5">
              <span className="text-[#f6dc8c]">10</span> Active Systems
            </div>
          </div>

          <div>
            <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">
              Agent Standards
            </div>
            <div className="text-white text-sm sm:text-base font-medium flex items-center gap-1.5">
              <span className="text-[#f6dc8c]">W3C</span> WebMCP Native
            </div>
          </div>

          <div>
            <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">
              Concurrency Invariant
            </div>
            <div className="text-white text-sm sm:text-base font-medium flex items-center gap-1.5">
              <span className="text-[#f6dc8c]">Zero</span> Race Conditions
            </div>
          </div>

          <div>
            <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">
              Methodology Foundation
            </div>
            <div className="text-white text-sm sm:text-base font-medium flex items-center gap-1.5">
              <span className="text-[#f6dc8c]">Clinical</span> Differential Triage
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
