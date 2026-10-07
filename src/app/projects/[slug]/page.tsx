import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/data/portfolioData";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Database,
  Layers,
  Lock,
} from "lucide-react";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({
    slug: p.id,
  }));
}

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectCaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = PROJECTS.findIndex((p) => p.id === slug);
  const prevProject =
    currentIndex > 0 ? PROJECTS[currentIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject =
    currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : PROJECTS[0];

  return (
    <div className="py-12 sm:py-20 bg-transparent relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Navigation Breadcrumb (No vanity pills) */}
        <div className="mb-10 flex items-center justify-between font-mono text-xs text-zinc-400 hairline-b border-b-[#d9a648]/20 pb-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 hover:text-[#f6dc8c] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[#d9a648]" />
            <span>&larr; Back to Systems Catalog</span>
          </Link>

          <span className="uppercase text-[#f6dc8c] text-[10px] tracking-wider">
            {project.isClientContract
              ? `Commercial Contract / ${project.clientName}`
              : "Proprietary Architecture"}
          </span>
        </div>

        {/* Header Title Section */}
        <div className="mb-12 max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4">
            {project.name}
          </h1>
          <p className="text-base sm:text-2xl text-zinc-300 font-light leading-relaxed mb-6">
            {project.descriptor}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d9a648] to-[#f6dc8c] px-5 py-2.5 font-mono text-xs font-semibold text-black hover:brightness-110 transition-all shadow-[0_0_20px_rgba(217,166,72,0.25)]"
              >
                <span>Visit Live System</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}

            <Link
              href="/build-with-us"
              className="inline-flex items-center gap-2 glass-chip px-5 py-2.5 font-mono text-xs text-zinc-200 border-white/20 hover:border-[#d9a648]/60 hover:text-white transition-colors"
            >
              <span>Commission an Enterprise Build</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#d9a648]" />
            </Link>
          </div>
        </div>

        {/* Hero Visual Viewport (Actual Hero Screen) */}
        {project.image ? (
          <div className="mb-16 glass-panel overflow-hidden border border-[#d9a648]/25 shadow-[0_20px_50px_rgba(18,2,7,0.7)]">
            {/* Clean Browser Chrome */}
            <div className="flex items-center justify-between px-4 py-2.5 hairline-b border-b-[#d9a648]/20 bg-[#140308]/80 backdrop-blur-md font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#d9a648]/60" />
                <div className="h-2 w-2 rounded-full bg-[#f6dc8c]/60" />
                <div className="h-2 w-2 rounded-full bg-emerald-500/60" />
                <span className="ml-2 text-zinc-300 text-[11px]">
                  https://{project.urlLabel || `${project.id}.com`}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#f6dc8c]">
                <Lock className="h-3 w-3 text-[#d9a648]" />
                <span>Production</span>
              </div>
            </div>

            <div className="relative aspect-[16/9] min-h-[300px] sm:min-h-[500px] w-full overflow-hidden bg-black/40">
              <Image
                src={project.image}
                alt={`${project.name} Production Interface`}
                fill
                sizes="100vw"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        ) : (
          <div className="mb-16 glass-panel p-8 sm:p-12 font-mono">
            <div className="text-xs text-[#f6dc8c] uppercase tracking-widest mb-2">
              System Console
            </div>
            <h3 className="text-2xl font-light text-white mb-2">
              {project.name} Engine Architecture
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl font-sans">
              High-concurrency state machine with deterministic constraints, monotonic on-chain revocation, and zero-downtime scheduled probers.
            </p>
          </div>
        )}

        {/* Quantifiable Operational Metrics (Clean tabular layout) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 hairline-t hairline-b mb-16 font-mono">
          {project.metrics.map((metric, mIdx) => (
            <div key={mIdx}>
              <div className="text-2xl sm:text-3xl text-white font-light">
                {metric.value}
              </div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* System Overview & Client Context */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-normal text-white">
              Executive Architectural Overview
            </h2>
            <p className="text-base text-zinc-300 font-light leading-relaxed">
              {project.summary}
            </p>

            <div className="space-y-4 pt-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                Core Architectural Accomplishments
              </h3>
              <div className="space-y-3 font-mono text-xs text-zinc-300 border-l border-white/15 pl-4">
                {project.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="leading-relaxed">
                    {bullet}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Architectural Guarantee Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-[#d9a648]" />
                <h3 className="text-base font-medium text-white">
                  Deterministic Guarantees
                </h3>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="p-3.5 bg-[#120207]/70 border border-white/5">
                  <div className="text-[#f6dc8c] uppercase tracking-wider mb-1 text-[10px]">
                    Concurrency Model
                  </div>
                  <div className="text-zinc-200">
                    {project.architecture.concurrencyGuarantee}
                  </div>
                </div>

                <div className="p-3.5 bg-[#120207]/70 border border-white/5">
                  <div className="text-[#f6dc8c] uppercase tracking-wider mb-1 text-[10px]">
                    AI &amp; Protocol Layer
                  </div>
                  <div className="text-zinc-200">
                    {project.architecture.protocolOrAi}
                  </div>
                </div>

                <div className="p-3.5 bg-[#120207]/70 border border-white/5">
                  <div className="text-[#f6dc8c] uppercase tracking-wider mb-1 text-[10px]">
                    Database &amp; Infrastructure
                  </div>
                  <div className="text-zinc-200">
                    {project.architecture.dbOrInfra}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subsystems & Modules Breakdown */}
        <div className="mb-20">
          <div className="mb-8">
            <div className="font-mono text-xs text-[#f6dc8c] uppercase tracking-widest mb-1">
              SUBSYSTEMS &bull; ARCHITECTURAL MODULES
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal text-white">
              Integrated System Components
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.modules.map((mod, modIdx) => (
              <div
                key={modIdx}
                className="glass-panel-interactive p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-xs text-[#d9a648] mb-3">
                    MODULE 0{modIdx + 1}
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">
                    {mod.name}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                    {mod.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categorized Tech Stack Matrix */}
        <div className="mb-20">
          <div className="mb-8">
            <div className="font-mono text-xs text-[#f6dc8c] uppercase tracking-widest mb-1">
              PRODUCTION STACK &bull; VERIFIED
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal text-white">
              Technology Architecture Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Frontend */}
            <div className="glass-panel-interactive p-6 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#f6dc8c] uppercase tracking-wider">
                <Layers className="h-4 w-4 text-[#d9a648]" />
                <span>Frontend &amp; Runtime</span>
              </div>
              <ul className="space-y-2 font-mono text-xs text-zinc-300">
                {project.techStackByCategory.frontend.map((item, i) => (
                  <li key={i} className="border-b border-white/5 pb-1.5">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* DB & Concurrency */}
            <div className="glass-panel-interactive p-6 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#f6dc8c] uppercase tracking-wider">
                <Database className="h-4 w-4 text-[#d9a648]" />
                <span>DB &amp; Concurrency</span>
              </div>
              <ul className="space-y-2 font-mono text-xs text-zinc-300">
                {project.techStackByCategory.databaseAndConcurrency.map((item, i) => (
                  <li key={i} className="border-b border-white/5 pb-1.5">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* AI & Realtime */}
            <div className="glass-panel-interactive p-6 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#f6dc8c] uppercase tracking-wider">
                <Cpu className="h-4 w-4 text-[#d9a648]" />
                <span>AI &amp; Realtime</span>
              </div>
              <ul className="space-y-2 font-mono text-xs text-zinc-300">
                {project.techStackByCategory.aiAndRealtime.map((item, i) => (
                  <li key={i} className="border-b border-white/5 pb-1.5">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Payments & Protocols */}
            <div className="glass-panel-interactive p-6 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#f6dc8c] uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4 text-[#d9a648]" />
                <span>Payments &amp; Protocols</span>
              </div>
              <ul className="space-y-2 font-mono text-xs text-zinc-300">
                {project.techStackByCategory.paymentsAndProtocols.map((item, i) => (
                  <li key={i} className="border-b border-white/5 pb-1.5">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Project Navigation Footer */}
        <div className="pt-12 hairline-t border-t-[#d9a648]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href={`/projects/${prevProject.id}`}
            className="flex items-center gap-3 text-left text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 text-[#d9a648] group-hover:-translate-x-1 transition-transform" />
            <div>
              <div className="font-mono text-[10px] text-[#f6dc8c] uppercase">
                Previous Case Study
              </div>
              <div className="text-sm text-white">{prevProject.name}</div>
            </div>
          </Link>

          <Link
            href="/build-with-us"
            className="bg-gradient-to-r from-[#d9a648] to-[#f6dc8c] px-6 py-2.5 font-mono text-xs font-semibold text-black hover:brightness-110 transition-all shadow-[0_0_24px_rgba(217,166,72,0.25)]"
          >
            Commission an Enterprise Platform
          </Link>

          <Link
            href={`/projects/${nextProject.id}`}
            className="flex items-center gap-3 text-right text-zinc-400 hover:text-white transition-colors group"
          >
            <div>
              <div className="font-mono text-[10px] text-[#f6dc8c] uppercase">
                Next Case Study
              </div>
              <div className="text-sm text-white">{nextProject.name}</div>
            </div>
            <ArrowRight className="h-4 w-4 text-[#d9a648] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
