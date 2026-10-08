"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/data/portfolioData";
import { ArrowUpRight, ArrowRight, ExternalLink, ShieldCheck, Cpu, Database, Terminal, Sparkles } from "lucide-react";
import WetaegoSandbox from "@/components/interactive/WetaegoSandbox";
import GozAISandbox from "@/components/interactive/GozAISandbox";
import BauntiSandbox from "@/components/interactive/BauntiSandbox";
import { playMechanicalClick } from "@/lib/soundEffects";

export default function SystemsSection() {
  const [filter, setFilter] = useState<"all" | "proprietary" | "client">("all");
  const [sandboxViews, setSandboxViews] = useState<{ [key: string]: "preview" | "sandbox" }>({
    wetaego: "preview",
    gozai: "preview",
    baunti: "preview",
  });

  const toggleSandbox = (id: string, mode: "preview" | "sandbox") => {
    playMechanicalClick();
    setSandboxViews((prev) => ({ ...prev, [id]: mode }));
  };

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === "proprietary") return !p.isClientContract;
    if (filter === "client") return p.isClientContract;
    return true;
  });

  const proprietaryCount = PROJECTS.filter((p) => !p.isClientContract).length;
  const clientCount = PROJECTS.filter((p) => p.isClientContract).length;

  // Split out flagship (Wetaego) when viewing All
  const flagship = PROJECTS.find((p) => p.id === "wetaego");
  const secondaryFlagships = PROJECTS.filter((p) => p.id === "cruisehq" || p.id === "gozai");
  const otherProjects = filteredProjects.filter(
    (p) => filter !== "all" || (p.id !== "wetaego" && p.id !== "cruisehq" && p.id !== "gozai")
  );

  return (
    <section id="platforms" className="relative py-20 sm:py-32 bg-transparent hairline-b overflow-hidden">
      {/* Subtle brand ambient glow */}
      <div className="pointer-events-none absolute top-1/4 right-0 w-[700px] h-[700px] bg-[radial-gradient(circle,_rgba(58,13,28,0.40)_0%,_rgba(217,166,72,0.06)_40%,_transparent_70%)] blur-3xl opacity-70" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Section Header & Segment Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 hairline-b">
          <div className="max-w-2xl">
            <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="text-[#f6dc8c]">&bull;</span>
              <span>PRODUCTION SYSTEMS &bull; ARCHITECTURAL SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal text-white tracking-tight mb-4">
              Systems &amp; Architectures
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
              Every platform documented here is an active production architecture running real-world workloads—from original distributed protocols and W3C WebMCP runtimes to enterprise webapps engineered under contract.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 glass-panel p-1 font-mono text-xs rounded-xs shrink-0">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`px-3.5 py-1.5 transition-all ${
                filter === "all"
                  ? "bg-[#3a0d1c] text-[#f6dc8c] border border-[#d9a648]/40 font-semibold shadow-[0_0_15px_rgba(217,166,72,0.15)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              All ({PROJECTS.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("proprietary")}
              className={`px-3.5 py-1.5 transition-all ${
                filter === "proprietary"
                  ? "bg-[#3a0d1c] text-[#f6dc8c] border border-[#d9a648]/40 font-semibold shadow-[0_0_15px_rgba(217,166,72,0.15)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Proprietary ({proprietaryCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter("client")}
              className={`px-3.5 py-1.5 transition-all ${
                filter === "client"
                  ? "bg-[#3a0d1c] text-[#f6dc8c] border border-[#d9a648]/40 font-semibold shadow-[0_0_15px_rgba(217,166,72,0.15)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Client Contracts ({clientCount})
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TIER 1: MONUMENTAL FLAGSHIP SPOTLIGHT (Wetaego) - Shown when "All" */}
        {/* ========================================================================= */}
        {filter === "all" && flagship && (
          <div className="mb-14 sm:mb-20 glass-panel border border-[#d9a648]/40 overflow-hidden rounded-sm hover:border-[#d9a648]/70 transition-all duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Flagship Screenshot Viewport (7 Cols) */}
              <div className="lg:col-span-7 relative flex flex-col border-b lg:border-b-0 lg:border-r border-white/10 bg-black/60">
                {/* Viewport Chrome Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#140308]/90 border-b border-white/10 font-mono text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-zinc-200 font-medium">{flagship.urlLabel}</span>
                  </div>

                  {/* Switcher: Preview vs Interactive Sandbox */}
                  <div className="flex items-center gap-1 bg-black/60 p-0.5 rounded border border-white/10 text-[11px]">
                    <button
                      type="button"
                      onClick={() => toggleSandbox("wetaego", "preview")}
                      className={`px-2.5 py-1 transition-all rounded-xs flex items-center gap-1.5 ${
                        sandboxViews.wetaego === "preview"
                          ? "bg-[#3a0d1c] text-[#f6dc8c] border border-[#d9a648]/40 font-medium shadow-[0_0_10px_rgba(217,166,72,0.15)]"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      <span>🖼️ Preview</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleSandbox("wetaego", "sandbox")}
                      className={`px-2.5 py-1 transition-all rounded-xs flex items-center gap-1.5 ${
                        sandboxViews.wetaego === "sandbox"
                          ? "bg-[#3a0d1c] text-[#f6dc8c] border border-[#d9a648]/40 font-medium shadow-[0_0_12px_rgba(217,166,72,0.25)]"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#f6dc8c] animate-ping" />
                      <span>⚡ Live WebMCP Sandbox</span>
                    </button>
                  </div>

                  {flagship.url && (
                    <a
                      href={flagship.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-1 text-[#f6dc8c] hover:underline text-[11px]"
                    >
                      <span>Visit Live</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  )}
                </div>

                {/* Main Hero Visual OR Interactive Sandbox */}
                {sandboxViews.wetaego === "sandbox" ? (
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center bg-black/90">
                    <WetaegoSandbox />
                  </div>
                ) : (
                  <Link
                    href={`/projects/${flagship.id}`}
                    className="group block relative aspect-[16/10] sm:aspect-[16/9] w-full flex-1 overflow-hidden"
                  >
                    {flagship.image && (
                      <Image
                        src={flagship.image}
                        alt={`${flagship.name} interface preview`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                        priority
                        unoptimized
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                )}
              </div>

              {/* Flagship Technical Deep Dive (5 Cols) */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-br from-[#23040e]/80 via-[#160209]/90 to-[#100106]">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 font-mono text-[10px]">
                    <span className="text-[#f6dc8c] tracking-widest uppercase font-semibold">
                      FLAGSHIP ARCHITECTURE // 01
                    </span>
                    <span className="border border-sky-500/40 bg-sky-950/40 text-sky-300 px-2 py-0.5">
                      Proprietary Platform
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-tight mb-2">
                    {flagship.name}
                  </h3>

                  <p className="font-mono text-xs text-[#d9a648] leading-relaxed mb-4">
                    {flagship.descriptor}
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                    {flagship.summary}
                  </p>

                  {/* High-Impact 4-Metric Grid */}
                  <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-white/10 font-mono text-xs">
                    {flagship.metrics.map((m, idx) => (
                      <div key={idx} className="p-2.5 bg-black/40 border border-white/06">
                        <div className="text-white font-medium text-xs sm:text-sm">{m.value}</div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Link CTAs */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() =>
                      toggleSandbox("wetaego", sandboxViews.wetaego === "sandbox" ? "preview" : "sandbox")
                    }
                    className="text-[#f6dc8c] hover:underline flex items-center gap-1.5 text-[11px]"
                  >
                    <span>{sandboxViews.wetaego === "sandbox" ? "← Back to Preview" : "⚡ Test Live WebMCP Tool Call"}</span>
                  </button>

                  <Link
                    href={`/projects/${flagship.id}`}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d9a648] to-[#f6dc8c] text-black px-4 py-2 font-semibold hover:brightness-110 transition-all shadow-[0_0_15px_rgba(217,166,72,0.25)]"
                  >
                    <span>Read Architectural Blueprint</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TIER 2: CO-FLAGSHIPS (CruiseHQ & GozAI) - Shown when "All" */}
        {/* ========================================================================= */}
        {filter === "all" && secondaryFlagships.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14 sm:mb-20">
            {secondaryFlagships.map((project) => (
              <div
                key={project.id}
                className="group glass-panel border border-white/12 hover:border-[#d9a648]/60 transition-all duration-300 rounded-sm overflow-hidden flex flex-col hover:shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
              >
                {/* Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#140308]/90 border-b border-white/08 font-mono text-xs text-zinc-400">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d9a648] shrink-0" />
                    <span className="text-zinc-200 font-medium truncate">{project.urlLabel || "pacylabs.xyz"}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {project.id === "gozai" && (
                      <div className="flex items-center gap-1 bg-black/60 p-0.5 rounded border border-white/10 text-[10px]">
                        <button
                          type="button"
                          onClick={() => toggleSandbox("gozai", "preview")}
                          className={`px-2 py-0.5 transition-all rounded-xs ${
                            sandboxViews.gozai === "preview"
                              ? "bg-[#3a0d1c] text-[#f6dc8c] border border-[#d9a648]/40 font-medium"
                              : "text-zinc-400 hover:text-white"
                          }`}
                        >
                          Preview
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleSandbox("gozai", "sandbox")}
                          className={`px-2 py-0.5 transition-all rounded-xs flex items-center gap-1 ${
                            sandboxViews.gozai === "sandbox"
                              ? "bg-[#3a0d1c] text-[#f6dc8c] border border-[#d9a648]/40 font-medium shadow-[0_0_10px_rgba(217,166,72,0.2)]"
                              : "text-zinc-400 hover:text-white"
                          }`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                          <span>⚡ Triage Sandbox</span>
                        </button>
                      </div>
                    )}

                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#f6dc8c] hover:underline text-[11px]"
                      >
                        <span>Live</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Screenshot OR Interactive Sandbox */}
                {project.id === "gozai" && sandboxViews.gozai === "sandbox" ? (
                  <div className="p-3 bg-black/90 border-b border-white/08">
                    <GozAISandbox />
                  </div>
                ) : (
                  <Link
                    href={`/projects/${project.id}`}
                    className="block relative aspect-[16/10] w-full bg-black/60 overflow-hidden border-b border-white/08"
                  >
                    {project.image && (
                      <Image
                        src={project.image}
                        alt={`${project.name} preview`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        unoptimized
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                )}

                {/* Card Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-xl font-medium text-white group-hover:text-[#f6dc8c] transition-colors">
                        {project.name}
                      </h4>
                      <span className="text-[10px] font-mono border border-sky-500/30 bg-sky-950/40 text-sky-300 px-2 py-0.5">
                        Proprietary
                      </span>
                    </div>

                    <p className="font-mono text-xs text-[#d9a648] line-clamp-1 mb-3">
                      {project.descriptor}
                    </p>

                    <p className="text-xs sm:text-sm text-zinc-300 font-light line-clamp-2 leading-relaxed mb-4">
                      {project.summary}
                    </p>

                    {/* Metric Chips */}
                    <div className="grid grid-cols-2 gap-2 font-mono text-xs pt-3 border-t border-white/08">
                      {project.metrics.slice(0, 2).map((m, idx) => (
                        <div key={idx} className="p-2 bg-black/30 border border-white/05">
                          <span className="text-white font-medium block">{m.value}</span>
                          <span className="text-[10px] text-zinc-500 uppercase">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/08 flex items-center justify-between font-mono text-xs">
                    <span className="text-zinc-500 text-[11px]">{project.architecture.category}</span>
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-1.5 text-[#f6dc8c] hover:text-white transition-colors"
                    >
                      <span>Blueprint</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TIER 3: OTHER PRODUCTION PLATFORMS & CLIENT CONTRACTS */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {otherProjects.map((project) => {
            const topMetric = project.metrics[0];

            return (
              <div
                key={project.id}
                className="group glass-panel border border-white/10 hover:border-[#d9a648]/50 transition-all duration-300 rounded-sm overflow-hidden flex flex-col hover:shadow-[0_16px_36px_rgba(0,0,0,0.85)]"
              >
                {/* Viewport Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-1.5 px-3.5 py-2 border-b border-white/08 bg-[#16030a]/80 font-mono text-[11px] text-zinc-400">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d9a648]/80 shrink-0" />
                    <span className="text-zinc-300 truncate max-w-[130px] font-medium">
                      {project.urlLabel || "pacylabs.xyz"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {project.id === "baunti" && (
                      <div className="flex items-center gap-0.5 bg-black/60 p-0.5 rounded border border-white/10 text-[9px]">
                        <button
                          type="button"
                          onClick={() => toggleSandbox("baunti", "preview")}
                          className={`px-1.5 py-0.5 transition-all rounded-xs ${
                            sandboxViews.baunti === "preview"
                              ? "bg-[#3a0d1c] text-[#f6dc8c] border border-[#d9a648]/40 font-medium"
                              : "text-zinc-400 hover:text-white"
                          }`}
                        >
                          Preview
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleSandbox("baunti", "sandbox")}
                          className={`px-1.5 py-0.5 transition-all rounded-xs flex items-center gap-1 ${
                            sandboxViews.baunti === "sandbox"
                              ? "bg-[#3a0d1c] text-[#f6dc8c] border border-[#d9a648]/40 font-medium shadow-[0_0_8px_rgba(217,166,72,0.2)]"
                              : "text-zinc-400 hover:text-white"
                          }`}
                        >
                          <span className="h-1 w-1 rounded-full bg-rose-400 animate-ping" />
                          <span>⚡ Fair Draw</span>
                        </button>
                      </div>
                    )}

                    {project.id === "wetaego" && (
                      <button
                        type="button"
                        onClick={() => toggleSandbox("wetaego", sandboxViews.wetaego === "sandbox" ? "preview" : "sandbox")}
                        className="px-1.5 py-0.5 text-[9px] bg-black/60 text-[#f6dc8c] border border-white/10 rounded-xs"
                      >
                        {sandboxViews.wetaego === "sandbox" ? "Preview" : "⚡ Sandbox"}
                      </button>
                    )}

                    {project.id === "gozai" && (
                      <button
                        type="button"
                        onClick={() => toggleSandbox("gozai", sandboxViews.gozai === "sandbox" ? "preview" : "sandbox")}
                        className="px-1.5 py-0.5 text-[9px] bg-black/60 text-[#f6dc8c] border border-white/10 rounded-xs"
                      >
                        {sandboxViews.gozai === "sandbox" ? "Preview" : "⚡ Sandbox"}
                      </button>
                    )}

                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#f6dc8c] hover:underline text-[10px]"
                      >
                        <span>Live</span>
                        <ArrowUpRight className="h-2.5 w-2.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Hero Screenshot Preview OR Interactive Sandbox */}
                {project.id === "baunti" && sandboxViews.baunti === "sandbox" ? (
                  <div className="p-2.5 bg-black/90 border-b border-white/08">
                    <BauntiSandbox />
                  </div>
                ) : project.id === "wetaego" && sandboxViews.wetaego === "sandbox" ? (
                  <div className="p-2.5 bg-black/90 border-b border-white/08">
                    <WetaegoSandbox />
                  </div>
                ) : project.id === "gozai" && sandboxViews.gozai === "sandbox" ? (
                  <div className="p-2.5 bg-black/90 border-b border-white/08">
                    <GozAISandbox />
                  </div>
                ) : (
                  <Link
                    href={`/projects/${project.id}`}
                    className="block relative aspect-[16/10] w-full bg-zinc-950 overflow-hidden border-b border-white/08"
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`${project.name} interface preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        unoptimized
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center font-mono text-xs text-zinc-600">
                        {project.name.toUpperCase()} PREVIEW
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                )}

                {/* Project Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-base sm:text-lg font-medium text-white group-hover:text-[#f6dc8c] transition-colors">
                        {project.name}
                      </h4>
                      {project.isClientContract ? (
                        <span className="text-[9px] font-mono border border-amber-500/30 bg-amber-950/40 text-amber-300 px-1.5 py-0.2 shrink-0">
                          Client
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono border border-sky-500/30 bg-sky-950/40 text-sky-300 px-1.5 py-0.2 shrink-0">
                          Proprietary
                        </span>
                      )}
                    </div>

                    <p className="font-mono text-xs text-[#d9a648] line-clamp-1 mb-2">
                      {project.descriptor}
                    </p>

                    <p className="text-xs text-zinc-300 font-light line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Footer Bar: Key Metric + Link */}
                  <div className="pt-3 border-t border-white/08 flex items-center justify-between font-mono text-xs">
                    {topMetric ? (
                      <div className="min-w-0">
                        <span className="text-white font-medium">{topMetric.value}</span>
                        <span className="text-[10px] text-zinc-500 ml-1.5 uppercase hidden sm:inline">
                          {topMetric.label}
                        </span>
                      </div>
                    ) : (
                      <span className="text-zinc-500">Production</span>
                    )}

                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-1 text-[#f6dc8c] hover:text-white transition-colors"
                    >
                      <span>Blueprint</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
