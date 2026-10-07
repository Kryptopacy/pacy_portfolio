"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, GraduationCap, ShieldCheck, Cpu, FileDown } from "lucide-react";
import { EXECUTIVE_PROFILE } from "@/data/portfolioData";

export default function FounderSection() {
  return (
    <section id="founder" className="relative py-24 sm:py-32 bg-transparent hairline-b overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(88,18,42,0.45)_0%,_rgba(217,166,72,0.08)_50%,_transparent_75%)] blur-3xl opacity-70" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 mb-16 hairline-b">
          <div>
            <div className="font-mono text-xs text-[#f6dc8c] uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-[#d9a648]" />
              <span>05 // LEADERSHIP &amp; PRINCIPAL ARCHITECT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
              The Mind Behind Pacy Labs
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/olamilekan_adegoke_resume.pdf"
              download="Olamilekan_David_Adegoke_Resume.pdf"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d9a648] to-[#f6dc8c] hover:brightness-110 px-5 py-2.5 font-mono text-xs font-semibold text-black transition-all shadow-[0_0_20px_rgba(217,166,72,0.25)]"
            >
              <FileDown className="h-3.5 w-3.5" />
              <span>Download Resume (PDF)</span>
            </a>

            <Link
              href="/dossier"
              className="inline-flex items-center gap-1.5 glass-chip px-5 py-2.5 font-mono text-xs text-zinc-200 hover:border-[#d9a648]/60 hover:text-white transition-colors"
            >
              <span>Full Executive Dossier</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#d9a648]" />
            </Link>
          </div>
        </div>

        {/* 2-Column Split: Architect Profile & Rigor Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Founder Persona & Identity (5 cols) */}
          <div className="lg:col-span-5 glass-panel p-8 sm:p-10 flex flex-col justify-between border border-[#d9a648]/25 shadow-[0_20px_50px_rgba(18,2,7,0.7)]">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative h-16 w-16 shrink-0 rounded-lg p-1 border border-[#d9a648]/40 bg-gradient-to-br from-[#3a0d1c] to-[#120207] shadow-[0_0_20px_rgba(217,166,72,0.25)]">
                  <Image
                    src="/brand/pacylabs-logo-256.webp"
                    alt="Pacy Labs Logo Mark"
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-normal text-white">
                    Dr. Olamilekan David Adegoke
                  </h3>
                  <div className="font-mono text-xs text-[#f6dc8c] mt-0.5">
                    Founder &amp; Principal Systems Architect
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">
                    @kryptopacy &bull; Doctor of Optometry (OD)
                  </div>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed font-light mb-8">
                Operating at the rare intersection of clinical diagnostic triage and distributed computing, 
                Dr. Adegoke founded Pacy Labs to build software with the same zero-margin-for-error tolerance 
                demanded in clinical healthcare. He architects high-concurrency state machines, W3C WebMCP agent protocols, 
                and full-scale commercial platforms.
              </p>

              {/* Core Credentials Badges */}
              <div className="space-y-3 font-mono text-xs mb-8">
                <div className="p-3.5 bg-[#120207]/80 border border-white/08 flex items-start gap-3">
                  <GraduationCap className="h-4 w-4 text-[#d9a648] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-medium">Doctor of Optometry (OD)</div>
                    <div className="text-zinc-400 text-[11px]">
                      {EXECUTIVE_PROFILE.education.institution} &bull; {EXECUTIVE_PROFILE.education.year}
                    </div>
                    <div className="text-[#f6dc8c] text-[10px] mt-0.5">
                      {EXECUTIVE_PROFILE.education.license}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-[#120207]/80 border border-white/08 flex items-start gap-3">
                  <ShieldCheck className="h-4 w-4 text-[#d9a648] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-medium">Diagnostic Error Tolerance: Zero</div>
                    <div className="text-zinc-400 text-[11px]">
                      1,500+ patient encounters across tertiary clinics &amp; surgical triages translated into deterministic QA benchmarks.
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-[#120207]/80 border border-white/08 flex items-start gap-3">
                  <Cpu className="h-4 w-4 text-[#d9a648] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-medium">Core Stack Specialization</div>
                    <div className="text-zinc-400 text-[11px]">
                      TypeScript, Rust, Python, Next.js 16, PostgreSQL RLS, WebMCP, ERC-8004
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/olamilekanadegoke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-300 hover:text-[#f6dc8c] transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
                <span className="text-zinc-600">&bull;</span>
                <a
                  href="https://x.com/kryptopacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-300 hover:text-[#f6dc8c] transition-colors"
                >
                  <span>X (@kryptopacy)</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
              <a
                href="mailto:pacy@cruisehq.fun"
                className="text-[#f6dc8c] hover:underline"
              >
                pacy@cruisehq.fun
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Achievements & Timeline (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-[#f6dc8c] uppercase tracking-widest mb-3">
                FOUNDER ARCHITECTURAL RECORD
              </div>
              <h4 className="text-2xl font-light text-white mb-6">
                Clinical Rigor Applied to Production Software
              </h4>

              <div className="space-y-6">
                <div className="border-l border-[#d9a648]/40 pl-5 relative">
                  <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-[#d9a648]" />
                  <div className="font-mono text-xs text-[#f6dc8c] mb-1">
                    01 // High-Throughput Concurrency
                  </div>
                  <h5 className="text-base text-white font-normal mb-1">
                    Atomic State Machine Locks
                  </h5>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    Architected atomic PL/pgSQL transaction lifecycles using row-level locks (<code className="text-[#f6dc8c]">SELECT FOR UPDATE</code>) 
                    guaranteeing zero double-bookings across hospitality and retail enterprise deployments.
                  </p>
                </div>

                <div className="border-l border-white/15 pl-5 relative">
                  <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-zinc-500" />
                  <div className="font-mono text-xs text-[#f6dc8c] mb-1">
                    02 // Autonomous AI Systems
                  </div>
                  <h5 className="text-base text-white font-normal mb-1">
                    W3C WebMCP Standard Implementation
                  </h5>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    Implemented client-side Model Context Protocol registration with strict schemas, 
                    human-in-the-loop validation barriers, and bidirectional Gemini Live streaming audio pipelines.
                  </p>
                </div>

                <div className="border-l border-white/15 pl-5 relative">
                  <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-zinc-500" />
                  <div className="font-mono text-xs text-[#f6dc8c] mb-1">
                    03 // Decentralized Settlement
                  </div>
                  <h5 className="text-base text-white font-normal mb-1">
                    EIP-7702 &amp; Escrow Verification
                  </h5>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    Engineered monotonic milestone revocation, multi-sig escrow verification, 
                    and indexed 338,000+ autonomous agent identities on EVM networks.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <span className="text-zinc-400">
                Independent Systems Architect &bull; 2023 &ndash; Present
              </span>

              <Link
                href="/dossier"
                className="inline-flex items-center gap-1.5 text-[#f6dc8c] hover:underline"
              >
                <span>Read Full Career Dossier</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
