"use client";

import { useState } from "react";
import Link from "next/link";
import { AGENT_SKILLS } from "@/data/portfolioData";
import { Terminal, Copy, Check, ArrowUpRight, ArrowRight, Code2 } from "lucide-react";

export default function AgentSkillsSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="agent-protocols" className="py-20 sm:py-28 bg-[#090a0d] hairline-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Section Heading - No vanity pills */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 mb-16 hairline-b">
          <div>
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">
              03 / OPEN INFRASTRUCTURE &bull; AGENT SKILLS
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white">
              Published Agent Protocols &amp; Standards
            </h2>
          </div>
          <Link
            href="/skills"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-white transition-colors shrink-0"
          >
            <span>Open Terminal Simulation Suite</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {AGENT_SKILLS.map((skill) => (
            <div
              key={skill.id}
              className="flex flex-col justify-between border border-white/10 bg-[#0e1015] p-6 sm:p-8 hover:border-white/25 transition-colors"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-xl font-medium text-white tracking-tight">
                    {skill.name}
                  </h3>

                  <div className="flex items-center gap-2 shrink-0">
                    {skill.skillsShUrl && (
                      <a
                        href={skill.skillsShUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-white transition-colors p-1"
                        title="View on skills.sh"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                    {skill.repoUrl && (
                      <a
                        href={skill.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-white transition-colors p-1"
                        title="View GitHub Repository"
                      >
                        <Code2 className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-xs font-mono text-zinc-400 mb-4">
                  {skill.tagline}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                  {skill.description}
                </p>

                {/* Capabilities list */}
                <div className="space-y-2 mb-8 font-mono text-xs text-zinc-400 border-l border-white/10 pl-3">
                  {skill.capabilities.slice(0, 3).map((cap, i) => (
                    <div key={i} className="leading-relaxed">
                      {cap}
                    </div>
                  ))}
                </div>
              </div>

              {/* Install CLI Snippet Box */}
              <div className="pt-4 hairline-t font-mono text-xs">
                <div className="flex items-center justify-between text-zinc-500 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="h-3 w-3 text-zinc-400" />
                    <span>CLI Install</span>
                  </span>
                  <span>{copiedId === skill.id ? "Copied" : "Click to copy"}</span>
                </div>

                <div
                  onClick={() => handleCopy(skill.id, skill.installCommand)}
                  className="flex items-center justify-between gap-3 bg-black/80 border border-white/10 px-3.5 py-2.5 cursor-pointer hover:border-white/30 transition-colors"
                >
                  <code className="text-zinc-200 truncate select-all">
                    {skill.installCommand}
                  </code>
                  <button
                    type="button"
                    className="text-zinc-500 hover:text-white transition-colors shrink-0"
                    aria-label="Copy install command"
                  >
                    {copiedId === skill.id ? (
                      <Check className="h-4 w-4 text-zinc-200" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Link to Full Skills Page */}
        <div className="flex justify-center">
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 border border-white/20 bg-transparent px-6 py-2.5 font-mono text-xs text-zinc-300 hover:border-white/40 hover:text-white transition-colors"
          >
            <span>Open Dedicated Agent Skills &amp; Test Simulator Suite</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
