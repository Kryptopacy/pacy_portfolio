"use client";

import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/data/portfolioData";
import { ArrowUpRight, ArrowRight, ExternalLink } from "lucide-react";

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
  const proprietaryPlatforms = PROJECTS.filter((p) => !p.isClientContract);
  const clientContracts = PROJECTS.filter((p) => p.isClientContract);

  return (
    <section id="platforms" className="py-20 sm:py-28 bg-[#090a0d] hairline-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">

        {/* ===================================================================
            PART 1: FLAGSHIP PROPRIETARY PLATFORMS
            =================================================================== */}
        <div id="proprietary-platforms" className="mb-32">

          {/* Section Label */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 mb-16 hairline-b">
            <div>
              <div className="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="text-sky-400 font-medium">01</span>
                <span className="text-zinc-700">/</span>
                <span>PROPRIETARY SYSTEMS &amp; AUTONOMOUS AGENTS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white">
                Flagship Platform Architectures
              </h2>
            </div>
            <div className="max-w-sm text-left sm:text-right">
              <p className="text-xs text-zinc-500 font-mono leading-relaxed">
                Original distributed systems, W3C WebMCP agent platforms,
                cryptographic draw protocols, and multimodal AI engines — built from first principles.
              </p>
            </div>
          </div>

          {/* Proprietary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 fade-up-stagger">
            {proprietaryPlatforms.map((project, idx) => {
              const theme = VERTICAL_THEMES[project.accentColor || "blue"] || VERTICAL_THEMES.blue;

              return (
                <div
                  key={project.id}
                  className={`group flex flex-col border bg-[#0e1015] transition-all duration-300 ${theme.border} ${theme.borderHover} ${theme.bgHover} viewport-frame-hover glow-on-hover`}
                >
                  {/* Browser Viewport Chrome + Hero Image */}
                  <div className="border-b border-white/08 overflow-hidden viewport-scanline">
                    {/* Chrome Bar */}
                    <div className={`flex items-center justify-between px-3 py-2 border-b border-white/08 font-mono text-[11px] text-zinc-500 bg-black/50 group-hover:bg-black/70 transition-colors duration-300`}>
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-none bg-zinc-700/80" />
                        <span className="h-2 w-2 rounded-none bg-zinc-700/80" />
                        <span className="h-2 w-2 rounded-none bg-zinc-700/80" />
                        <span className={`ml-2 truncate max-w-[150px] font-light ${theme.textAccent} group-hover:opacity-100 opacity-70 transition-opacity`}>
                          {project.urlLabel}
                        </span>
                      </div>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1 ${theme.textAccent} opacity-0 group-hover:opacity-100 transition-all duration-200 hover:underline text-[10px]`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Live</span>
                          <ArrowUpRight className="h-2.5 w-2.5" />
                        </a>
                      )}
                    </div>

                    {/* Hero Viewport — actual production screenshot */}
                    {project.image ? (
                      <Link
                        href={`/projects/${project.id}`}
                        className="block relative aspect-[16/10] w-full overflow-hidden bg-zinc-950"
                        tabIndex={-1}
                      >
                        <Image
                          src={project.image}
                          alt={`${project.name} — live production interface`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                          priority={idx < 3}
                          unoptimized
                        />
                        {/* Hover overlay — subtle accent tint */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                          style={{ background: `linear-gradient(to top, ${theme.scanColor.replace('0.5', '0.08')}, transparent 60%)` }}
                        />
                      </Link>
                    ) : (
                      <div className="h-44 w-full bg-zinc-950 flex items-center justify-center font-mono text-xs text-zinc-700 tracking-widest">
                        {project.name.toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-col flex-1 p-5 sm:p-6">
                    {/* Title + Category Tag */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-xl font-medium text-white leading-tight group-hover:text-white transition-colors">
                        {project.name}
                      </h3>
                      <span className={`text-[10px] font-mono border px-1.5 py-0.5 uppercase tracking-wider shrink-0 ${theme.badgeBg} ${theme.badgeText}`}>
                        {project.architecture?.category?.split(" ")[0] || "SYSTEM"}
                      </span>
                    </div>

                    <p className={`text-xs font-mono mb-4 leading-relaxed ${theme.textAccent}`}>
                      {project.descriptor}
                    </p>

                    <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed mb-5 line-clamp-3 flex-1">
                      {project.summary}
                    </p>

                    {/* Metrics — tabular, no vanity pills */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-5 font-mono text-xs border-t border-white/08 pt-4">
                      {project.metrics.slice(0, 4).map((m, i) => (
                        <div key={i} className="min-w-0">
                          <div className="text-white font-medium truncate">{m.value}</div>
                          <div className="text-[10px] text-zinc-600 uppercase tracking-wider truncate">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Inline */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.slice(0, 4).map((tag, i) => (
                        <span key={i} className="font-mono text-[10px] text-zinc-600 border border-white/08 px-1.5 py-0.5 bg-black/30">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="font-mono text-[10px] text-zinc-700 border border-white/05 px-1.5 py-0.5 bg-black/20">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/projects/${project.id}`}
                      className={`inline-flex items-center justify-between w-full border border-white/10 bg-black/40 px-4 py-2.5 font-mono text-xs text-zinc-400 hover:border-white/30 hover:text-white hover:bg-white/5 transition-all duration-200 mt-auto cta-slide`}
                    >
                      <span>Read Architecture Blueprint</span>
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-600 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===================================================================
            PART 2: COMMERCIAL CLIENT CONTRACTS
            =================================================================== */}
        <div id="commercial-contracts">

          {/* Section Label */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 mb-16 hairline-b">
            <div>
              <div className="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="text-amber-400 font-medium">02</span>
                <span className="text-zinc-700">/</span>
                <span>COMMERCIAL CLIENT CONTRACTS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white">
                Commercial Client Webapps —<br className="hidden sm:block" /> Engineered Under Contract
              </h2>
            </div>
            <div className="max-w-sm text-left sm:text-right">
              <p className="text-xs text-zinc-500 font-mono leading-relaxed">
                Bespoke production webapps commissioned by enterprise brands to run
                high-stakes hospitality, retail, and revenue operations.
              </p>
            </div>
          </div>

          {/* Client System Showcase — full editorial layout */}
          <div className="space-y-20 fade-up-stagger">
            {clientContracts.map((project, idx) => {
              const theme = VERTICAL_THEMES[project.accentColor || "amber"] || VERTICAL_THEMES.amber;
              const isReversed = idx % 2 === 1;

              return (
                <div
                  key={project.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start border ${theme.border} ${theme.borderHover} bg-[#0e1015] p-6 sm:p-10 transition-all duration-300 ${theme.bgHover} glow-on-hover`}
                >
                  {/* Hero Visual (7 cols) */}
                  <div className={`lg:col-span-7 ${isReversed ? "lg:order-2" : ""}`}>
                    <div className="border border-white/10 bg-black/60 overflow-hidden group/img viewport-scanline">
                      {/* Chrome Bar */}
                      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/08 bg-black/80 font-mono text-xs text-zinc-500">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-zinc-700" />
                          <div className="h-2 w-2 bg-zinc-700" />
                          <div className="h-2 w-2 bg-zinc-700" />
                          <span className={`ml-2 font-light ${theme.textAccent}`}>
                            https://{project.urlLabel || `${project.id}.com`}
                          </span>
                        </div>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1 hover:underline ${theme.textAccent} text-[11px]`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>Live Production</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        )}
                      </div>

                      {/* Production Screenshot */}
                      {project.image && (
                        <Link
                          href={`/projects/${project.id}`}
                          className="block relative aspect-[16/10] min-h-[260px] sm:min-h-[360px] w-full overflow-hidden bg-zinc-950"
                          tabIndex={-1}
                        >
                          <Image
                            src={project.image}
                            alt={`${project.name} — production interface`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 60vw"
                            className="object-cover object-top transition-transform duration-500 group/img-hover:scale-[1.03]"
                            priority={idx === 0}
                            unoptimized
                          />
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: `linear-gradient(to top, ${theme.scanColor.replace('0.5', '0.10')}, transparent 55%)` }}
                          />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Editorial Breakdown (5 cols) */}
                  <div className={`lg:col-span-5 flex flex-col justify-center ${isReversed ? "lg:order-1" : ""}`}>
                    {/* Commission Badge */}
                    <div className="flex items-center flex-wrap gap-2 font-mono text-xs text-zinc-600 uppercase tracking-wider mb-4">
                      <span className={`border px-2 py-0.5 text-[10px] ${theme.badgeBg} ${theme.badgeText}`}>
                        Commissioned Contract
                      </span>
                      <span>·</span>
                      <span className="text-zinc-400">{project.clientName}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-normal text-white mb-2 leading-tight">
                      {project.name}
                    </h3>

                    <p className={`text-xs font-mono mb-5 leading-relaxed ${theme.textAccent}`}>
                      {project.descriptor}
                    </p>

                    <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
                      {project.summary}
                    </p>

                    {/* Architectural Bullets */}
                    <div className={`space-y-3 mb-7 pl-4 font-mono text-xs text-zinc-400 border-l-2 ${theme.leftAccent}/20`}>
                      {project.bullets.slice(0, 4).map((bullet, bIdx) => (
                        <div key={bIdx} className="leading-relaxed hover:text-zinc-300 transition-colors">
                          — {bullet}
                        </div>
                      ))}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-3 mb-7 border-t border-white/08 pt-4 font-mono text-xs">
                      {project.metrics.slice(0, 4).map((m, mIdx) => (
                        <div key={mIdx}>
                          <div className="text-white font-medium">{m.value}</div>
                          <div className="text-[10px] text-zinc-600 uppercase tracking-wider">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-7">
                      {project.tags.slice(0, 5).map((tag, i) => (
                        <span key={i} className="font-mono text-[10px] text-zinc-600 border border-white/08 px-1.5 py-0.5 bg-black/30">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/08">
                      <Link
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center gap-2 bg-zinc-100 px-5 py-2.5 font-mono text-xs font-semibold text-black hover:bg-white transition-colors duration-200"
                      >
                        <span>Inspect Case Study</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>

                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 font-mono text-xs hover:underline ${theme.textAccent} arrow-nudge`}
                        >
                          <span>Visit {project.urlLabel}</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
