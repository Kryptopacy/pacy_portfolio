"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS, Project } from "@/data/portfolioData";
import { ArrowUpRight, ArrowRight, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

// Per-vertical design tokens
const VERTICAL_THEMES: Record<
  string,
  {
    border: string;
    borderHover: string;
    textAccent: string;
    bgHover: string;
    leftAccent: string;
    badgeText: string;
    badgeBg: string;
    scanColor: string;
  }
> = {
  blue: {
    border: "border-sky-500/18",
    borderHover: "hover:border-sky-400/55",
    textAccent: "text-sky-400",
    bgHover: "hover:bg-sky-950/8",
    leftAccent: "bg-sky-500",
    badgeText: "text-sky-300",
    badgeBg: "bg-sky-950/40 border-sky-500/30",
    scanColor: "rgba(14, 165, 233, 0.5)",
  },
  indigo: {
    border: "border-indigo-500/18",
    borderHover: "hover:border-indigo-400/55",
    textAccent: "text-indigo-400",
    bgHover: "hover:bg-indigo-950/8",
    leftAccent: "bg-indigo-500",
    badgeText: "text-indigo-300",
    badgeBg: "bg-indigo-950/40 border-indigo-500/30",
    scanColor: "rgba(99, 102, 241, 0.5)",
  },
  rose: {
    border: "border-rose-500/18",
    borderHover: "hover:border-rose-400/55",
    textAccent: "text-rose-400",
    bgHover: "hover:bg-rose-950/8",
    leftAccent: "bg-rose-500",
    badgeText: "text-rose-300",
    badgeBg: "bg-rose-950/40 border-rose-500/30",
    scanColor: "rgba(244, 63, 94, 0.5)",
  },
  purple: {
    border: "border-purple-500/18",
    borderHover: "hover:border-purple-400/55",
    textAccent: "text-purple-400",
    bgHover: "hover:bg-purple-950/8",
    leftAccent: "bg-purple-500",
    badgeText: "text-purple-300",
    badgeBg: "bg-purple-950/40 border-purple-500/30",
    scanColor: "rgba(168, 85, 247, 0.5)",
  },
  cyan: {
    border: "border-cyan-500/18",
    borderHover: "hover:border-cyan-400/55",
    textAccent: "text-cyan-400",
    bgHover: "hover:bg-cyan-950/8",
    leftAccent: "bg-cyan-500",
    badgeText: "text-cyan-300",
    badgeBg: "bg-cyan-950/40 border-cyan-500/30",
    scanColor: "rgba(6, 182, 212, 0.5)",
  },
  emerald: {
    border: "border-emerald-500/18",
    borderHover: "hover:border-emerald-400/55",
    textAccent: "text-emerald-400",
    bgHover: "hover:bg-emerald-950/8",
    leftAccent: "bg-emerald-500",
    badgeText: "text-emerald-300",
    badgeBg: "bg-emerald-950/40 border-emerald-500/30",
    scanColor: "rgba(16, 185, 129, 0.5)",
  },
  amber: {
    border: "border-amber-500/18",
    borderHover: "hover:border-amber-400/55",
    textAccent: "text-amber-400",
    bgHover: "hover:bg-amber-950/8",
    leftAccent: "bg-amber-500",
    badgeText: "text-amber-300",
    badgeBg: "bg-amber-950/40 border-amber-500/30",
    scanColor: "rgba(245, 158, 11, 0.5)",
  },
};

export default function SystemsSection() {
  const [filter, setFilter] = useState<"all" | "proprietary" | "client">("all");
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const proprietaryPlatforms = PROJECTS.filter((p) => !p.isClientContract);
  const clientContracts = PROJECTS.filter((p) => p.isClientContract);

  return (
    <section id="platforms" className="relative py-16 sm:py-24 bg-[#090a0d] hairline-b overflow-hidden">
      {/* Subtle brand ambiance in background */}
      <div className="pointer-events-none absolute top-1/4 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(58,13,28,0.25)_0%,_rgba(217,166,72,0.06)_40%,_transparent_70%)] blur-3xl opacity-60" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(58,13,28,0.20)_0%,_rgba(217,166,72,0.05)_40%,_transparent_70%)] blur-3xl opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">

        {/* Global Fast Filter Bar (Glanceable UX) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-14 pb-5 hairline-b">
          <div>
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-1">
              SYSTEM CATALOG // ARCHITECTURAL INDEX
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal text-white">
              Production Architectures
            </h2>
          </div>

          {/* Quick Segment Filter */}
          <div className="flex items-center gap-1.5 border border-white/10 bg-black/60 p-1 font-mono text-xs">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 transition-colors ${
                filter === "all"
                  ? "bg-zinc-100 text-black font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              All ({PROJECTS.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("proprietary")}
              className={`px-3 py-1.5 transition-colors ${
                filter === "proprietary"
                  ? "bg-[#3a0d1c] text-[#f6dc8c] border border-[#d9a648]/40 font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Proprietary ({proprietaryPlatforms.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("client")}
              className={`px-3 py-1.5 transition-colors ${
                filter === "client"
                  ? "bg-[#3a0d1c] text-[#f6dc8c] border border-[#d9a648]/40 font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Client Contracts ({clientContracts.length})
            </button>
          </div>
        </div>

        {/* ===================================================================
            PART 1: FLAGSHIP PROPRIETARY PLATFORMS
            =================================================================== */}
        {(filter === "all" || filter === "proprietary") && (
          <div id="proprietary-platforms" className="mb-24">

            {/* Section Label */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 mb-10 hairline-b">
              <div>
                <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="text-[#f6dc8c] font-semibold border border-[#d9a648]/40 bg-[#3a0d1c]/40 px-1.5 py-0.5">01</span>
                  <span className="text-zinc-600">/</span>
                  <span className="text-zinc-300">PROPRIETARY SYSTEMS &amp; AUTONOMOUS AGENTS</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-normal text-white">
                  Original Platforms &amp; Protocols
                </h3>
              </div>
              <p className="text-xs text-zinc-500 font-mono max-w-sm">
                Glance through hero snapshots &bull; Expand for full RPCs &amp; metrics
              </p>
            </div>

            {/* Compact Responsive Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {proprietaryPlatforms.map((project, idx) => {
                const theme = VERTICAL_THEMES[project.accentColor || "blue"] || VERTICAL_THEMES.blue;
                const isExpanded = !!expandedCards[project.id];

                return (
                  <div
                    key={project.id}
                    className={`group flex flex-col border bg-[#0e1015] transition-all duration-300 ${theme.border} ${theme.borderHover} ${theme.bgHover} viewport-frame-hover glow-on-hover`}
                  >
                    {/* Browser Viewport Chrome + Hero Image */}
                    <div className="border-b border-white/08 overflow-hidden viewport-scanline">
                      <div className="flex items-center justify-between px-3 py-2 border-b border-white/08 font-mono text-[11px] text-zinc-500 bg-black/60">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 bg-zinc-700/80" />
                          <span className="h-2 w-2 bg-zinc-700/80" />
                          <span className="h-2 w-2 bg-zinc-700/80" />
                          <span className={`ml-2 truncate max-w-[150px] font-light ${theme.textAccent}`}>
                            {project.urlLabel}
                          </span>
                        </div>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1 ${theme.textAccent} hover:underline text-[10px]`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>Live</span>
                            <ArrowUpRight className="h-2.5 w-2.5" />
                          </a>
                        )}
                      </div>

                      {project.image ? (
                        <Link
                          href={`/projects/${project.id}`}
                          className="block relative aspect-[16/9] w-full overflow-hidden bg-zinc-950"
                          tabIndex={-1}
                        >
                          <Image
                            src={project.image}
                            alt={`${project.name} preview`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                            priority={idx < 2}
                            unoptimized
                          />
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: `linear-gradient(to top, ${theme.scanColor.replace('0.5', '0.08')}, transparent 60%)` }}
                          />
                        </Link>
                      ) : (
                        <div className="h-36 w-full bg-zinc-950 flex items-center justify-center font-mono text-xs text-zinc-700">
                          {project.name.toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Card Body - Tight and Glanceable */}
                    <div className="flex flex-col flex-1 p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h4 className="text-lg font-medium text-white group-hover:text-white transition-colors">
                          {project.name}
                        </h4>
                        <span className={`text-[9px] font-mono border px-1.5 py-0.2 uppercase shrink-0 ${theme.badgeBg} ${theme.badgeText}`}>
                          {project.architecture?.category?.split(" ")[0] || "SYSTEM"}
                        </span>
                      </div>

                      <p className={`text-[11px] font-mono mb-2.5 leading-snug truncate ${theme.textAccent}`}>
                        {project.descriptor}
                      </p>

                      {/* Summary with Expand/Collapse toggle for fast mobile scanning */}
                      <p className={`text-xs text-zinc-400 font-light leading-relaxed mb-3 ${isExpanded ? "" : "line-clamp-2"}`}>
                        {project.summary}
                      </p>

                      {/* Primary 2 Metrics (Always Visible at a Glance) */}
                      <div className="grid grid-cols-2 gap-2 mb-3 font-mono text-xs border-t border-white/08 pt-2.5">
                        {project.metrics.slice(0, 2).map((m, i) => (
                          <div key={i} className="min-w-0">
                            <div className="text-white font-medium text-xs truncate">{m.value}</div>
                            <div className="text-[9px] text-zinc-500 uppercase tracking-wider truncate">{m.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Expanded Section (Deep Details On-Demand) */}
                      {isExpanded && (
                        <div className="space-y-3 pt-2 border-t border-white/08 mb-3 font-mono text-xs animate-in fade-in duration-200">
                          {/* Remaining 2 Metrics */}
                          {project.metrics.length > 2 && (
                            <div className="grid grid-cols-2 gap-2">
                              {project.metrics.slice(2, 4).map((m, i) => (
                                <div key={i} className="min-w-0">
                                  <div className="text-white font-medium text-xs truncate">{m.value}</div>
                                  <div className="text-[9px] text-zinc-500 uppercase tracking-wider truncate">{m.label}</div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Tech Stack Tags */}
                          <div className="flex flex-wrap gap-1">
                            {project.tags.map((tag, i) => (
                              <span key={i} className="font-mono text-[9px] text-zinc-500 border border-white/08 px-1.5 py-0.5 bg-black/40">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Dual Action Bar: Expand Toggle + Blueprint Link */}
                      <div className="flex items-center gap-2 mt-auto pt-2 border-t border-white/08">
                        <button
                          type="button"
                          onClick={() => toggleExpand(project.id)}
                          className="flex items-center gap-1 border border-white/10 hover:border-white/25 px-2.5 py-1.5 font-mono text-[10px] text-zinc-400 hover:text-white transition-colors"
                        >
                          <span>{isExpanded ? "Collapse" : "Specs"}</span>
                          {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                        </button>

                        <Link
                          href={`/projects/${project.id}`}
                          className="flex-1 flex items-center justify-between border border-white/10 bg-black/40 hover:border-white/30 hover:bg-white/5 px-3 py-1.5 font-mono text-[11px] text-zinc-300 hover:text-white transition-all cta-slide"
                        >
                          <span>Blueprint</span>
                          <ArrowRight className="h-3 w-3 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================================================================
            PART 2: COMMERCIAL CLIENT CONTRACTS
            =================================================================== */}
        {(filter === "all" || filter === "client") && (
          <div id="commercial-contracts">

            {/* Section Label */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 mb-10 hairline-b">
              <div>
                <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="text-[#f6dc8c] font-semibold border border-[#d9a648]/40 bg-[#3a0d1c]/40 px-1.5 py-0.5">02</span>
                  <span className="text-zinc-600">/</span>
                  <span className="text-zinc-300">COMMERCIAL CLIENT CONTRACTS</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-normal text-white">
                  Commissioned Enterprise Webapps
                </h3>
              </div>
              <p className="text-xs text-zinc-500 font-mono max-w-sm">
                Engineered under contract &bull; Built to power revenue and operations
              </p>
            </div>

            {/* Client Contracts - Compact 2-Column Grid instead of huge full-page scroll */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {clientContracts.map((project, idx) => {
                const theme = VERTICAL_THEMES[project.accentColor || "amber"] || VERTICAL_THEMES.amber;
                const isExpanded = !!expandedCards[project.id];

                return (
                  <div
                    key={project.id}
                    className={`border ${theme.border} ${theme.borderHover} bg-[#0e1015] p-5 sm:p-6 transition-all duration-300 ${theme.bgHover} glow-on-hover flex flex-col`}
                  >
                    {/* Viewport Frame */}
                    <div className="border border-white/10 bg-black/60 overflow-hidden mb-4 group/img viewport-scanline">
                      <div className="flex items-center justify-between px-3 py-2 border-b border-white/08 bg-black/80 font-mono text-[11px] text-zinc-500">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 bg-zinc-700" />
                          <span className="h-2 w-2 bg-zinc-700" />
                          <span className="h-2 w-2 bg-zinc-700" />
                          <span className={`ml-2 font-light ${theme.textAccent}`}>
                            {project.urlLabel || `${project.id}.com`}
                          </span>
                        </div>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1 hover:underline ${theme.textAccent} text-[10px]`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>Live Production</span>
                            <ArrowUpRight className="h-2.5 w-2.5" />
                          </a>
                        )}
                      </div>

                      {project.image && (
                        <Link
                          href={`/projects/${project.id}`}
                          className="block relative aspect-[16/9] w-full overflow-hidden bg-zinc-950"
                          tabIndex={-1}
                        >
                          <Image
                            src={project.image}
                            alt={`${project.name} production`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover object-top transition-transform duration-500 group/img-hover:scale-[1.03]"
                            priority={idx === 0}
                            unoptimized
                          />
                        </Link>
                      )}
                    </div>

                    {/* Editorial Content */}
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-2">
                        <span className={`border px-1.5 py-0.2 ${theme.badgeBg} ${theme.badgeText}`}>
                          Contract
                        </span>
                        <span>&bull;</span>
                        <span className="text-zinc-400 truncate">{project.clientName}</span>
                      </div>

                      <h4 className="text-xl font-normal text-white mb-1">
                        {project.name}
                      </h4>

                      <p className={`text-[11px] font-mono mb-3 ${theme.textAccent}`}>
                        {project.descriptor}
                      </p>

                      <p className={`text-xs text-zinc-400 font-light leading-relaxed mb-4 ${isExpanded ? "" : "line-clamp-3"}`}>
                        {project.summary}
                      </p>

                      {/* Primary 2 Metrics */}
                      <div className="grid grid-cols-2 gap-3 mb-4 border-t border-white/08 pt-3 font-mono text-xs">
                        {project.metrics.slice(0, 2).map((m, mIdx) => (
                          <div key={mIdx}>
                            <div className="text-white font-medium text-xs">{m.value}</div>
                            <div className="text-[9px] text-zinc-500 uppercase tracking-wider">{m.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Detailed bullets on expand */}
                      {isExpanded && (
                        <div className="space-y-2 mb-4 pl-3 font-mono text-xs text-zinc-400 border-l-2 border-white/10 animate-in fade-in duration-200">
                          {project.bullets.slice(0, 3).map((bullet, bIdx) => (
                            <div key={bIdx} className="leading-relaxed text-[11px]">
                              &bull; {bullet}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Action Bar */}
                      <div className="flex items-center gap-3 pt-3 border-t border-white/08 mt-auto">
                        <button
                          type="button"
                          onClick={() => toggleExpand(project.id)}
                          className="flex items-center gap-1 border border-white/10 hover:border-white/25 px-2.5 py-1.5 font-mono text-[10px] text-zinc-400 hover:text-white transition-colors"
                        >
                          <span>{isExpanded ? "Collapse" : "Full Specs"}</span>
                          {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                        </button>

                        <Link
                          href={`/projects/${project.id}`}
                          className="flex-1 flex items-center justify-between bg-zinc-100 hover:bg-white px-3.5 py-1.5 font-mono text-xs font-semibold text-black transition-colors"
                        >
                          <span>Case Study</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
