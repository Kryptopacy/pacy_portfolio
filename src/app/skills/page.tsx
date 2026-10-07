"use client";

import { useState } from "react";
import { AGENT_SKILLS } from "@/data/portfolioData";
import {
  Copy,
  Check,
  ExternalLink,
  Code2,
  Play,
  RotateCcw,
} from "lucide-react";

export default function SkillsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedSkillId, setSelectedSkillId] = useState<string>("webmcp-auditor");
  const [simState, setSimState] = useState<"idle" | "running" | "completed">("idle");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const selectedSkill =
    AGENT_SKILLS.find((s) => s.id === selectedSkillId) || AGENT_SKILLS[0];

  const runSimulation = () => {
    setSimState("running");
    setTerminalLogs([`$ ${selectedSkill.installCommand}`, "Resolving package dependencies..."]);

    const simLines: Record<string, string[]> = {
      "webmcp-auditor": [
        "Analyzing window.document for WebMCP registration...",
        "Found document.modelContext.registerTool: [search_catalog, add_to_cart, initiate_checkout]",
        "Inspecting JSONSchema input declarations: STRICT PASS (RFC 8288 compatible)",
        "Checking human-in-the-loop payment gate: CONFIRMED (requires confirmation modal)",
        "Audit Score: 98/100 [GRADE: S-TIER PRODUCTION READY]",
      ],
      "codebase-auditor": [
        "Running Developer Pay Handoff Simulator...",
        "Scanning PostgreSQL RLS policies: 14/14 tables secured with deny-by-default",
        "Evaluating SELECT FOR UPDATE inventory lock semantics: ZERO RACE CONDITIONS",
        "Checking error boundaries and mobile touch targets: ALL CLEAR",
        "Verdict: APPROVED FOR MERGE & PAYMENT RELEASE",
      ],
      "reverse-otp": [
        "Generating cryptographic verification nonce: uuid_v4(9f8a2-c4e1)",
        "Constructing deep-link target: https://wa.me/2349130262529?text=VERIFY_9f8a2",
        "Simulating inbound webhook trigger from WhatsApp Cloud API...",
        "Nonce match verified. Token issued with zero outbound SMS telco fees.",
        "Status: 100% INBOUND VERIFICATION SUCCESS",
      ],
    };

    const targetLines = simLines[selectedSkill.id] || simLines["webmcp-auditor"];

    targetLines.forEach((line, index) => {
      setTimeout(() => {
        setTerminalLogs((prev) => [...prev, line]);
        if (index === targetLines.length - 1) {
          setSimState("completed");
        }
      }, (index + 1) * 550);
    });
  };

  const resetSimulation = () => {
    setSimState("idle");
    setTerminalLogs([]);
  };

  return (
    <div className="py-14 sm:py-24 bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="text-[#f6dc8c]">&bull;</span>
            <span>AGENT CAPABILITIES &bull; OPEN TOOLING</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-6">
            Autonomous Agent Protocols &amp; Audit Skills
          </h1>
          <p className="text-base sm:text-xl text-[#d4c5ca] font-light leading-relaxed">
            I don’t just build applications for human eyes—I architect protocols that instruct autonomous AI coding agents (Claude Code, Cursor, OpenCode, Codex) to integrate open standards, conduct paranoid security audits, and verify production guarantees.
          </p>
        </div>

        {/* Interactive Terminal Simulator Box (2026 Glassmorphism) */}
        <div className="mb-16 glass-panel overflow-hidden">
          {/* Terminal Title Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3.5 hairline-b bg-[#16030a]/75 backdrop-blur-md font-mono text-xs">
            <span className="text-zinc-300 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#d9a648] animate-pulse" />
              <span>pacy-agent-runner / interactive_eval</span>
            </span>

            {/* Clean Segmented Buttons */}
            <div className="flex items-center glass-chip p-0.5">
              {AGENT_SKILLS.map((skill) => (
                <button
                  key={skill.id}
                  onClick={() => {
                    setSelectedSkillId(skill.id);
                    resetSimulation();
                  }}
                  className={`px-3 py-1 transition-all ${
                    selectedSkillId === skill.id
                      ? "bg-[#3a0d1c] text-[#f6dc8c] border border-[#d9a648]/40 font-semibold shadow-[0_0_10px_rgba(217,166,72,0.2)]"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {skill.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm min-h-[260px] flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-zinc-500">
                # Target: <span className="text-white">{selectedSkill.name}</span> ({selectedSkill.packageSlug})
              </div>

              {simState === "idle" && (
                <div className="text-zinc-400 py-6 font-sans">
                  Ready to test. Click <span className="text-white font-medium">&ldquo;Run Live Simulation&rdquo;</span> below to see how AI agents execute this skill in production.
                </div>
              )}

              {terminalLogs.map((log, index) => (
                <div
                  key={index}
                  className={`leading-relaxed ${
                    log.startsWith("$")
                      ? "text-zinc-100 font-bold"
                      : log.includes("APPROVED") || log.includes("SUCCESS") || log.includes("S-TIER")
                      ? "text-emerald-400 font-medium"
                      : "text-zinc-400"
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 hairline-t mt-6">
              <div className="flex items-center gap-3">
                {simState !== "running" ? (
                  <button
                    onClick={runSimulation}
                    className="inline-flex items-center gap-2 bg-[#f6dc8c] hover:bg-white px-4 py-2 font-mono text-xs font-semibold text-[#120207] transition-all shadow-[0_0_15px_rgba(217,166,72,0.25)]"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Run Live Simulation</span>
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-2 glass-chip px-4 py-2 font-mono text-xs text-[#f6dc8c]">
                    <span>Executing Protocol Checks...</span>
                  </div>
                )}

                {simState !== "idle" && (
                  <button
                    onClick={resetSimulation}
                    className="inline-flex items-center gap-1.5 glass-chip px-3 py-2 font-mono text-xs text-zinc-400 hover:text-white transition-colors"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Copy Install Command */}
              <button
                onClick={() => handleCopy(selectedSkill.id, selectedSkill.installCommand)}
                className="inline-flex items-center gap-2 glass-chip px-3.5 py-2 font-mono text-xs text-zinc-300 hover:border-[#d9a648]/40 hover:text-[#f6dc8c] transition-all"
              >
                {copiedId === selectedSkill.id ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#f6dc8c]" />
                    <span className="text-[#f6dc8c]">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-zinc-500" />
                    <span>Copy: {selectedSkill.installCommand}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Skill Cards */}
        <div className="space-y-12">
          {AGENT_SKILLS.map((skill) => (
            <div
              key={skill.id}
              className="glass-panel-interactive p-6 sm:p-10"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
                <div>
                  <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span className="text-[#f6dc8c]">&bull;</span>
                    <span>Published Agent Protocol</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-normal text-white mb-2">
                    {skill.name}
                  </h2>
                  <p className="text-sm text-zinc-400 font-mono">
                    {skill.tagline}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  {skill.skillsShUrl && (
                    <a
                      href={skill.skillsShUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 glass-chip px-4 py-2 font-mono text-xs text-zinc-300 hover:border-[#d9a648]/40 hover:text-[#f6dc8c] transition-all"
                    >
                      <span>skills.sh Listing</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}

                  {skill.repoUrl && (
                    <a
                      href={skill.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 glass-chip px-4 py-2 font-mono text-xs text-zinc-300 hover:border-[#d9a648]/40 hover:text-[#f6dc8c] transition-all"
                    >
                      <span>GitHub</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Install Bar */}
              <div className="mb-8 glass-input p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-zinc-300 overflow-x-auto">
                  <span className="text-zinc-500 select-none">$</span>
                  <code>{skill.installCommand}</code>
                </div>
                <button
                  onClick={() => handleCopy(skill.id, skill.installCommand)}
                  className="inline-flex items-center gap-1.5 border border-white/15 px-3 py-1.5 text-zinc-300 hover:border-white/30 hover:text-white transition-colors shrink-0"
                >
                  {copiedId === skill.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-zinc-200" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-zinc-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed mb-8">
                {skill.description}
              </p>

              {/* Capabilities & Rubric */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 hairline-t font-mono text-xs">
                <div>
                  <h4 className="uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-2">
                    <Code2 className="h-4 w-4" />
                    <span>Agent Capabilities &amp; Probes</span>
                  </h4>
                  <ul className="space-y-3 text-zinc-300 border-l border-white/10 pl-3">
                    {skill.capabilities.map((cap, cIdx) => (
                      <li key={cIdx} className="leading-relaxed">
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>

                {skill.pillarsOrRubric && (
                  <div>
                    <h4 className="uppercase tracking-wider text-zinc-500 mb-4">
                      Audit Rubric &amp; Verification Flow
                    </h4>
                    <ul className="space-y-3 text-zinc-300 border-l border-white/10 pl-3">
                      {skill.pillarsOrRubric.map((pil, pIdx) => (
                        <li key={pIdx} className="leading-relaxed">
                          {pil}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
