"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS, Project } from "@/data/portfolioData";
import {
  ArrowUpRight,
  ArrowRight,
  Database,
  Cpu,
  Layers,
  LayoutGrid,
  ListFilter,
  CheckCircle2,
} from "lucide-react";

export default function SystemsSection() {
  const [filter, setFilter] = useState<"all" | "proprietary" | "client">("all");
  const [activeProjectId, setActiveProjectId] = useState<string>(PROJECTS[0].id);
  const [viewMode, setViewMode] = useState<"index" | "grid">("index");

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === "proprietary") return !p.isClientContract;
    if (filter === "client") return p.isClientContract;
    return true;
  });

  const activeProject =
    filteredProjects.find((p) => p.id === activeProjectId) ||
    filteredProjects[0] ||
    PROJECTS[0];

  const proprietaryCount = PROJECTS.filter((p) => !p.isClientContract).length;
  const clientCount = PROJECTS.filter((p) => p.isClientContract).length;

  return (
    <section id="platforms" className="relative py-20 sm:py-28 bg-transparent hairline-b overflow-hidden">
      {/* Subtle brand ambient glow */}
      <div className="pointer-events-none absolute top-1/4 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(58,13,28,0.40)_0%,_rgba(217,166,72,0.06)_40%,_transparent_70%)] blur-3xl opacity-70" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Section Header & View Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-5 hairline-b">
          <div>
            <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
              <span className="text-[#f6dc8c]">&bull;</span>
              <span>SYSTEMS ARCHITECTURE INDEX</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal text-white tracking-tight">
              Production Architectures
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter Pills */}
            <div className="flex items-center gap-1 glass-panel p-1 font-mono text-xs rounded-xs">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 transition-all ${
                  filter === "all"
                    ? "bg-[#3a0d1c] text-[#f6dc8c] border border-[#d9a648]/40 font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                All ({PROJECTS.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter("proprietary")}
                className={`px-3 py-1.5 transition-all ${
                  filter === "proprietary"
                    ? "bg-[#3a0d1c] text-[#f6dc8c] border border-[#d9a648]/40 font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Proprietary ({proprietaryCount})
              </button>
              <button
                type="button"
                onClick={() => setFilter("client")}
                className={`px-3 py-1.5 transition-all ${
                  filter === "client"
                    ? "bg-[#3a0d1c] text-[#f6dc8c] border border-[#d9a648]/40 font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Client ({clientCount})
              </button>
            </div>

            {/* Layout Toggle (Index vs Grid) */}
            <div className="hidden sm:flex items-center gap-1 glass-panel p-1 font-mono text-xs rounded-xs">
              <button
                type="button"
                onClick={() => setViewMode("index")}
                className={`p-1.5 transition-colors ${
                  viewMode === "index"
                    ? "bg-[#3a0d1c] text-[#f6dc8c] border border-[#d9a648]/40"
                    : "text-zinc-400 hover:text-white"
                }`}
                title="Interactive Split Index View"
              >
                <ListFilter className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 transition-colors ${
                  viewMode === "grid"
                    ? "bg-[#3a0d1c] text-[#f6dc8c] border border-[#d9a648]/40"
                    : "text-zinc-400 hover:text-white"
                }`}
                title="Bento Grid View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: INTERACTIVE SPLIT INDEX (DEFAULT - 5-SECOND GLANCEABILITY)        */}
        {/* ========================================================================= */}
        {viewMode === "index" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Interactive Project Index (7 cols) */}
            <div className="lg:col-span-7 divide-y divide-white/08 glass-panel border border-white/10 rounded-xs overflow-hidden">
              {filteredProjects.map((project, idx) => {
                const isActive = project.id === activeProject.id;
                const topMetric = project.metrics[0];

                return (
                  <div
                    key={project.id}
                    onMouseEnter={() => setActiveProjectId(project.id)}
                    onClick={() => setActiveProjectId(project.id)}
                    className={`group cursor-pointer p-4 sm:p-5 transition-all flex items-center justify-between gap-4 ${
                      isActive
                        ? "bg-[#3a0d1c]/80 border-l-2 border-[#d9a648] shadow-[inset_0_0_20px_rgba(217,166,72,0.12)]"
                        : "hover:bg-white/[0.03] border-l-2 border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span className="font-mono text-xs text-zinc-400 w-5">
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-medium text-white truncate group-hover:text-[#f6dc8c] transition-colors">
                            {project.name}
                          </h4>
                          {project.isClientContract ? (
                            <span className="text-[9px] font-mono border border-amber-500/30 bg-amber-950/40 text-amber-300 px-1.5 py-0.2 shrink-0">
                              Client Contract
                            </span>
                          ) : (
                            <span className="text-[9px] font-mono border border-sky-500/30 bg-sky-950/40 text-sky-300 px-1.5 py-0.2 shrink-0">
                              Proprietary
                            </span>
                          )}
                        </div>
                        <p className="font-mono text-xs text-zinc-400 truncate mt-0.5">
                          {project.descriptor}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 font-mono text-xs text-right">
                      {topMetric && (
                        <div className="hidden sm:block">
                          <div className="text-white font-medium text-xs">{topMetric.value}</div>
                          <div className="text-[10px] text-zinc-400 uppercase tracking-tight">{topMetric.label}</div>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/projects/${project.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xs transition-colors"
                          title="View Technical Deep Dive"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Sticky Architectural Inspector Viewport (5 cols) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
              <div className="glass-panel border border-[#d9a648]/30 rounded-xs overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                
                {/* Viewport Chrome Bar */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#16030a]/90 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#d9a648]" />
                    <span className="text-white font-medium">{activeProject.name}</span>
                    <span className="text-zinc-600">/</span>
                    <span className="text-zinc-400 text-[11px] truncate max-w-[140px]">
                      {activeProject.urlLabel || "pacylabs.xyz"}
                    </span>
                  </div>

                  {activeProject.url && (
                    <a
                      href={activeProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#f6dc8c] hover:underline text-[11px]"
                    >
                      <span>Live App</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  )}
                </div>

                {/* System Preview Banner */}
                {activeProject.image ? (
                  <div className="relative aspect-[16/10] w-full bg-black overflow-hidden border-b border-white/08">
                    <Image
                      src={activeProject.image}
                      alt={`${activeProject.name} preview`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-top transition-transform duration-500 hover:scale-105"
                      priority
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="h-48 w-full bg-zinc-950 flex items-center justify-center font-mono text-xs text-zinc-600 border-b border-white/08">
                    {activeProject.name.toUpperCase()} SYSTEM
                  </div>
                )}

                {/* Inspector Details */}
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1.5">
                      {activeProject.name}
                    </h3>
                    <p className="text-xs text-zinc-300 leading-relaxed font-light">
                      {activeProject.summary}
                    </p>
                  </div>

                  {/* Primary 2 Metrics */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/08 font-mono">
                    {activeProject.metrics.slice(0, 2).map((m, i) => (
                      <div key={i} className="p-2.5 bg-black/40 border border-white/08">
                        <div className="text-white font-medium text-xs truncate">{m.value}</div>
                        <div className="text-[10px] text-zinc-400 uppercase tracking-tight truncate mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Architectural Invariants Callout */}
                  <div className="p-3 bg-[#120207]/80 border border-[#d9a648]/20 space-y-1.5 font-mono text-xs">
                    <div className="text-[#f6dc8c] text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                      <Database className="h-3 w-3 text-[#d9a648]" />
                      <span>Concurrency &amp; Invariants Guarantee</span>
                    </div>
                    <div className="text-zinc-300 text-[11px] leading-relaxed">
                      {activeProject.architecture?.concurrencyGuarantee || "Row-level atomic locks with verified schema guards"}
                    </div>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeProject.tags.slice(0, 4).map((tag, i) => (
                      <span
                        key={i}
                        className="font-mono text-[10px] text-zinc-400 border border-white/10 px-2 py-0.5 bg-black/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Full Case Study CTA */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <Link
                      href={`/projects/${activeProject.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#f6dc8c] hover:bg-white text-black font-mono text-xs font-semibold py-2.5 transition-all shadow-[0_0_15px_rgba(217,166,72,0.25)]"
                    >
                      <span>Read Complete Architectural Blueprint</span>
                      <ArrowRight className="h-3.5 w-3.5 text-black" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: BENTO GRID VIEW (ALTERNATIVE LAYOUT)                              */}
        {/* ========================================================================= */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group glass-panel border border-white/10 hover:border-[#d9a648]/40 transition-all rounded-xs overflow-hidden flex flex-col"
              >
                {project.image ? (
                  <Link
                    href={`/projects/${project.id}`}
                    className="block relative aspect-[16/10] w-full bg-black overflow-hidden border-b border-white/08"
                  >
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  </Link>
                ) : (
                  <div className="h-44 w-full bg-zinc-950 flex items-center justify-center font-mono text-xs text-zinc-600 border-b border-white/08">
                    {project.name.toUpperCase()}
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-lg font-medium text-white group-hover:text-[#f6dc8c] transition-colors">
                        {project.name}
                      </h4>
                      {project.isClientContract ? (
                        <span className="text-[9px] font-mono border border-amber-500/30 text-amber-300 px-1.5 py-0.2">
                          Client
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono border border-sky-500/30 text-sky-300 px-1.5 py-0.2">
                          Proprietary
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-xs text-zinc-400 line-clamp-1 mb-2">
                      {project.descriptor}
                    </p>
                    <p className="text-xs text-zinc-400 font-light line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/08 flex items-center justify-between">
                    <span className="font-mono text-xs text-white font-medium">
                      {project.metrics[0]?.value || "100% Production"}
                    </span>
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-1 font-mono text-xs text-[#f6dc8c] hover:underline"
                    >
                      <span>Blueprint</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
