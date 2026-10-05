"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/data/portfolioData";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const VERTICAL_THEMES: Record<
  string,
  {
    border: string;
    borderHover: string;
    textAccent: string;
    bgHover: string;
    badgeBorder: string;
  }
> = {
  blue: {
    border: "border-sky-500/20",
    borderHover: "hover:border-sky-400/50",
    textAccent: "text-sky-400",
    bgHover: "hover:bg-sky-950/10",
    badgeBorder: "border-sky-500/30 text-sky-300",
  },
  indigo: {
    border: "border-indigo-500/20",
    borderHover: "hover:border-indigo-400/50",
    textAccent: "text-indigo-400",
    bgHover: "hover:bg-indigo-950/10",
    badgeBorder: "border-indigo-500/30 text-indigo-300",
  },
  rose: {
    border: "border-rose-500/20",
    borderHover: "hover:border-rose-400/50",
    textAccent: "text-rose-400",
    bgHover: "hover:bg-rose-950/10",
    badgeBorder: "border-rose-500/30 text-rose-300",
  },
  purple: {
    border: "border-purple-500/20",
    borderHover: "hover:border-purple-400/50",
    textAccent: "text-purple-400",
    bgHover: "hover:bg-purple-950/10",
    badgeBorder: "border-purple-500/30 text-purple-300",
  },
  cyan: {
    border: "border-cyan-500/20",
    borderHover: "hover:border-cyan-400/50",
    textAccent: "text-cyan-400",
    bgHover: "hover:bg-cyan-950/10",
    badgeBorder: "border-cyan-500/30 text-cyan-300",
  },
  emerald: {
    border: "border-emerald-500/20",
    borderHover: "hover:border-emerald-400/50",
    textAccent: "text-emerald-400",
    bgHover: "hover:bg-emerald-950/10",
    badgeBorder: "border-emerald-500/30 text-emerald-300",
  },
  amber: {
    border: "border-amber-500/20",
    borderHover: "hover:border-amber-400/50",
    textAccent: "text-amber-400",
    bgHover: "hover:bg-amber-950/10",
    badgeBorder: "border-amber-500/30 text-amber-300",
  },
};

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"all" | "proprietary" | "client">("all");

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === "proprietary") return !p.isClientContract;
    if (filter === "client") return p.isClientContract;
    return true;
  });

  return (
    <div className="py-14 sm:py-24 bg-[#090a0d]">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Header Section */}
        <div className="mb-14 max-w-3xl">
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span>DEPLOYED PLATFORMS &bull; ARCHITECTURAL BLUEPRINTS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-6">
            Production Systems Catalog
          </h1>
          <p className="text-base sm:text-xl text-zinc-300 font-light leading-relaxed">
            Every platform documented here is an active production architecture running real-world workloads—from original distributed protocols and W3C WebMCP runtimes to enterprise webapps engineered under contract for corporate brands.
          </p>
        </div>

        {/* Filter Bar (Clean architectural segments, no vanity pills) */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-6 hairline-b font-mono text-xs">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 border transition-colors ${
              filter === "all"
                ? "border-white bg-zinc-100 text-black font-semibold"
                : "border-white/10 text-zinc-400 hover:text-white hover:border-white/25"
            }`}
          >
            All Systems ({PROJECTS.length})
          </button>
          <button
            onClick={() => setFilter("proprietary")}
            className={`px-4 py-2 border transition-colors ${
              filter === "proprietary"
                ? "border-sky-400 bg-sky-950/40 text-sky-300 font-semibold"
                : "border-white/10 text-zinc-400 hover:text-white hover:border-white/25"
            }`}
          >
            Proprietary Architectures ({PROJECTS.filter((p) => !p.isClientContract).length})
          </button>
          <button
            onClick={() => setFilter("client")}
            className={`px-4 py-2 border transition-colors ${
              filter === "client"
                ? "border-amber-400 bg-amber-950/40 text-amber-300 font-semibold"
                : "border-white/10 text-zinc-400 hover:text-white hover:border-white/25"
            }`}
          >
            Commercial Client Contracts ({PROJECTS.filter((p) => p.isClientContract).length})
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {filteredProjects.map((project) => {
            const theme = VERTICAL_THEMES[project.accentColor || "blue"] || VERTICAL_THEMES.blue;

            return (
              <div
                key={project.id}
                className={`group flex flex-col justify-between border bg-[#0e1015] overflow-hidden transition-all duration-300 glow-on-hover ${theme.border} ${theme.borderHover} ${theme.bgHover}`}
              >
                <div>
                  {/* Visual Viewport with Browser Bar */}
                  <div className="border-b border-white/10 bg-black/60">
                    <div className="flex items-center justify-between px-4 py-2 font-mono text-xs text-zinc-400 bg-black/80 border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 bg-zinc-600" />
                        <span className="h-1.5 w-1.5 bg-zinc-600" />
                        <span className="h-1.5 w-1.5 bg-zinc-600" />
                        <span className="ml-2 text-zinc-300 font-light truncate max-w-[200px]">
                          https://{project.urlLabel || `${project.id}.com`}
                        </span>
                      </div>
                      <span className={`text-[10px] font-mono border px-1.5 py-0.5 uppercase tracking-wider ${theme.badgeBorder}`}>
                        {project.isClientContract ? "Hired Client Contract" : "Proprietary Platform"}
                      </span>
                    </div>

                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={`${project.name} Production Interface`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-mono text-zinc-500">
                          {project.name.toUpperCase()} ARCHITECTURE
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-2xl font-normal text-white group-hover:text-white transition-colors">
                        {project.name}
                      </h3>

                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1 font-mono text-xs shrink-0 hover:underline ${theme.textAccent}`}
                        >
                          <span>{project.urlLabel || "Live"}</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      )}
                    </div>

                    <p className={`text-xs font-mono mb-4 ${theme.textAccent}`}>
                      {project.descriptor}
                    </p>

                    <p className="text-sm text-zinc-300 font-light leading-relaxed mb-6 line-clamp-3">
                      {project.summary}
                    </p>

                    {/* Clean Tabular Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-6 border-t border-b border-white/10 py-3 font-mono text-xs bg-black/20 px-3">
                      {project.metrics.slice(0, 2).map((m, i) => (
                        <div key={i}>
                          <div className="text-white font-medium">{m.value}</div>
                          <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Tags - Clean Monospace Grid */}
                    <div className="flex flex-wrap gap-2 text-[11px] font-mono text-zinc-400">
                      {project.tags.slice(0, 5).map((tag) => (
                        <span key={tag} className="border border-white/10 px-2 py-0.5 bg-black/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="p-6 pt-0 sm:p-8 sm:pt-0">
                  <Link
                    href={`/projects/${project.id}`}
                    className="flex items-center justify-between w-full border border-white/15 bg-black/40 px-5 py-3 font-mono text-xs text-white hover:bg-white hover:text-black transition-all"
                  >
                    <span>Explore Architectural Blueprint</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
