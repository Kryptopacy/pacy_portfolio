"use client";

import {
  GraduationCap,
  Briefcase,
  Download,
  ExternalLink,
  Code2,
  Cpu,
  Layers,
  ShieldCheck,
  Stethoscope,
  Terminal,
} from "lucide-react";
import { EXECUTIVE_PROFILE, TECHNICAL_SKILLS_RESUME } from "@/data/portfolioData";

export default function DossierPage() {
  return (
    <div className="py-14 sm:py-24 bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="text-[#f6dc8c]">&bull;</span>
            <span className="text-[#f6dc8c]">EXECUTIVE DOSSIER</span>
            <span>&bull;</span>
            <span>CLINICIAN-TO-SYSTEMS ARCHITECT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-6">
            Clinical Diagnostic Rigor in Distributed Systems
          </h1>
          <p className="text-base sm:text-xl text-[#d4c5ca] font-light leading-relaxed mb-6">
            Medical diagnosis leaves zero room for trial-and-error in production. I translate the differential diagnostic methodology directly into software architecture—ruling out race conditions, proving concurrency boundaries, and engineering platforms that never fail under real monetary stakes.
          </p>

          <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-zinc-400">
            <a
              href="https://www.linkedin.com/in/olamilekanadegoke"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-[#f6dc8c] transition-colors border border-white/10 px-3 py-1.5 bg-black/40"
            >
              <span>LinkedIn / olamilekanadegoke</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://x.com/kryptopacy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-[#f6dc8c] transition-colors border border-white/10 px-3 py-1.5 bg-black/40"
            >
              <span>X / @kryptopacy</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://github.com/kryptopacy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-[#f6dc8c] transition-colors border border-white/10 px-3 py-1.5 bg-black/40"
            >
              <span>GitHub / kryptopacy</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* The Diagnostic Manifesto Card (2026 Glassmorphism) */}
        <div className="mb-16 glass-panel p-6 sm:p-10 border border-sky-500/30">
          <div className="font-mono text-xs text-[#f6dc8c] uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d9a648]" />
            <span>Architectural Philosophy &bull; The Differential Advantage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-white mb-6">
            Why Optometric Clinical Training Outperforms Pure Coding Intuition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-[#d4c5ca] font-light leading-relaxed">
            <p>
              In clinical medicine, symptom presentation is almost never the root pathology. Over 1,500+ patient encounters across tertiary hospital clinics (University of Ilorin Teaching Hospital) and outreach triages, every diagnosis required isolating confounding variables, ruling out the most catastrophic etiologies first, and establishing empirical certainty before prescribing an intervention.
            </p>
            <p>
              When applied to software engineering, this eliminates &ldquo;vibe-based debugging&rdquo;. Every database lock (<code className="font-mono text-xs text-[#f6dc8c] bg-[#3a0d1c]/60 px-1.5 py-0.5 border border-[#d9a648]/40 shadow-[0_0_8px_rgba(217,166,72,0.15)]">SELECT FOR UPDATE</code>), every RLS policy, every WebMCP client tool schema, and every payment webhook is treated as a critical physiological pathway: monitored with telemetry, hardened with atomic constraints, and guaranteed to maintain equilibrium under high concurrent stress.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COMPREHENSIVE RESUME TECHNICAL SKILLS MATRIX */}
        {/* ========================================================================= */}
        <div className="mb-20">
          <div className="border-b border-white/10 pb-4 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                <span className="text-indigo-400">01</span>
                <span>/</span>
                <span>TECHNICAL CAPABILITIES TAXONOMY</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-normal text-white">
                Technical Systems Mastery
              </h2>
            </div>
            <p className="text-xs font-mono text-zinc-400 max-w-sm">
              Extracted directly from master executive resume &bull; Verified in production codebases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Category 1: Languages & Runtimes */}
            <div className="border border-sky-500/25 glass-panel-interactive p-6">
              <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-wider mb-4 border-b border-white/10 pb-3">
                <Code2 className="h-4 w-4" />
                <span>Languages &amp; Runtimes</span>
              </div>
              <div className="space-y-4">
                {TECHNICAL_SKILLS_RESUME.languagesAndRuntimes.map((item, idx) => (
                  <div key={idx} className="border-b border-white/5 pb-3 last:border-none last:pb-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-sm font-medium text-white">{item.name}</span>
                      <span className="text-[10px] font-mono text-sky-300 border border-sky-500/30 px-1 py-0.5">
                        {item.level}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 2: Full-Stack Frameworks & Engines */}
            <div className="border border-indigo-500/25 glass-panel-interactive p-6">
              <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-wider mb-4 border-b border-white/10 pb-3">
                <Layers className="h-4 w-4" />
                <span>Full-Stack Frameworks &amp; Engines</span>
              </div>
              <div className="space-y-4">
                {TECHNICAL_SKILLS_RESUME.frameworksAndEngines.map((item, idx) => (
                  <div key={idx} className="border-b border-white/5 pb-3 last:border-none last:pb-0">
                    <div className="text-sm font-medium text-white mb-1">{item.name}</div>
                    <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 3: AI LLMOps & Evaluation */}
            <div className="border border-purple-500/25 glass-panel-interactive p-6">
              <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-wider mb-4 border-b border-white/10 pb-3">
                <Cpu className="h-4 w-4" />
                <span>AI LLMOps &amp; Evaluation</span>
              </div>
              <div className="space-y-4">
                {TECHNICAL_SKILLS_RESUME.aiAndEvaluation.map((item, idx) => (
                  <div key={idx} className="border-b border-white/5 pb-3 last:border-none last:pb-0">
                    <div className="text-sm font-medium text-white mb-1">{item.name}</div>
                    <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 4: Protocols & Hardware */}
            <div className="border border-emerald-500/25 glass-panel-interactive p-6">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-4 border-b border-white/10 pb-3">
                <Terminal className="h-4 w-4" />
                <span>Protocols &amp; Driverless Hardware</span>
              </div>
              <div className="space-y-4">
                {TECHNICAL_SKILLS_RESUME.protocolsAndHardware.map((item, idx) => (
                  <div key={idx} className="border-b border-white/5 pb-3 last:border-none last:pb-0">
                    <div className="text-sm font-medium text-white mb-1">{item.name}</div>
                    <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 5: Clinical Methodology */}
            <div className="border border-amber-500/25 glass-panel-interactive p-6 md:col-span-2">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider mb-4 border-b border-white/10 pb-3">
                <Stethoscope className="h-4 w-4" />
                <span>Clinical Differential Diagnostic Methodologies in Systems</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {TECHNICAL_SKILLS_RESUME.clinicalMethodology.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-sm font-medium text-white">{item.name}</div>
                    <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CREDENTIALS, CLINICAL HISTORY & CAREER CHRONOLOGY */}
        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* CREDENTIALS, CLINICAL HISTORY & CAREER CHRONOLOGY */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-16 items-start">
          {/* Left Column: Education & Clinical Credentials (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Formal Medical Degree */}
            <div className="glass-panel p-6 sm:p-8">
              <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-[#f6dc8c]" />
                <span>Formal Clinical Degree</span>
              </div>
              <h3 className="text-2xl font-normal text-white mb-1">
                {EXECUTIVE_PROFILE.education.degree}
              </h3>
              <p className="text-sm font-mono text-zinc-400 mb-4">
                {EXECUTIVE_PROFILE.education.institution} &bull; {EXECUTIVE_PROFILE.education.year}
              </p>
              <div className="border border-[#d9a648]/30 bg-[#3a0d1c]/40 p-3.5 font-mono text-xs text-[#f6dc8c]">
                {EXECUTIVE_PROFILE.education.license}
              </div>
            </div>

            {/* Clinical Practice History */}
            <div className="glass-panel p-6 sm:p-8 space-y-6">
              <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-[#d9a648]" />
                <span>Clinical Triage &amp; Hospital Practice</span>
              </div>

              {EXECUTIVE_PROFILE.clinicalHistory.map((item, idx) => (
                <div key={idx} className="border-l-2 border-[#d9a648]/40 pl-4 space-y-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-medium text-white">{item.role}</span>
                    <span className="font-mono text-[11px] text-zinc-500">{item.period}</span>
                  </div>
                  <div className="font-mono text-xs text-[#f6dc8c]">{item.organization}</div>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {item.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Engineering Career Chronology (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8">
            <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-8 flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-emerald-400" />
              <span>Systems Engineering Chronology &amp; Production Deployments</span>
            </div>

            <div className="space-y-10">
              {/* Role 1 */}
              <div className="border-l border-white/20 pl-6 relative">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <h4 className="text-lg font-medium text-white">
                    Independent Systems Architect &amp; Software Developer
                  </h4>
                  <span className="font-mono text-xs text-zinc-500">May 2023 – Present</span>
                </div>
                <div className="font-mono text-xs text-[#f6dc8c] mb-3">Pacy Labs &bull; Remote</div>
                <p className="text-sm text-zinc-300 leading-relaxed mb-4 font-light">
                  Architecting high-assurance production operating systems across commercial hospitality, hardware retail, autonomous agent protocols, and quantitative simulation.
                </p>
                <ul className="space-y-3 text-xs font-mono text-zinc-400">
                  <li className="leading-relaxed border-l-2 border-amber-500/40 pl-3">
                    <strong className="text-white">Joebrown Palace Hotel &amp; Suites (Commissioned Contract):</strong> Deployed end-to-end hospitality OS with atomic reservation locks (<code className="text-amber-300">book_room_atomically</code>), 2D canvas table management, multi-station KDS, and 11-tier RBAC.
                  </li>
                  <li className="leading-relaxed border-l-2 border-emerald-500/40 pl-3">
                    <strong className="text-white">DreamwiseHUB (Commissioned Contract):</strong> Architected retail POS and repair CRM with dual inventory isolation, 7-stage device diagnostic pipeline, hardware ESC/POS WebUSB printing, and human-in-the-loop Gemini Intercom.
                  </li>
                  <li className="leading-relaxed border-l-2 border-sky-500/40 pl-3">
                    <strong className="text-white">Wetaego &amp; W3C WebMCP:</strong> Engineered agent-native commerce platform supporting 8 canonical WebMCP tools on <code className="text-sky-300">document.modelContext</code> and 14 machine discovery standards.
                  </li>
                  <li className="leading-relaxed border-l-2 border-indigo-500/40 pl-3">
                    <strong className="text-white">CruiseHQ, Baunti &amp; Huiyi:</strong> City-scale social platform with closed-loop microeconomy, 9-algorithm provably-fair cryptographic draw engine, and zero-app multimodal video recap director.
                  </li>
                </ul>
              </div>

              {/* Role 2 */}
              <div className="border-l border-white/15 pl-6 relative">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <h4 className="text-lg font-medium text-white">
                    Clinical Optometrist (OD) &amp; Diagnostic Clinician
                  </h4>
                  <span className="font-mono text-xs text-zinc-500">2023 – Present</span>
                </div>
                <div className="font-mono text-xs text-amber-400 mb-3">Clinical Practice &bull; Nigeria</div>
                <p className="text-sm text-zinc-300 leading-relaxed font-light">
                  Conducted comprehensive differential diagnoses of ocular and systemic conditions, interpreting multi-spectral retinal imaging, visual field perimetry, and anterior segment biomicroscopy under zero-error margins. Translated rigorous diagnostic verification protocols directly into high-assurance distributed software.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Master Resume PDF Viewer & Direct Download Bar */}
        <div className="glass-panel p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#d9a648]/30">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-normal text-white">
              Official Executive Master Resume (PDF Edition)
            </h3>
            <p className="text-xs sm:text-sm font-mono text-zinc-400">
              Double-column master executive resume &bull; 676 KB verified PDF artifact.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/olamilekan_adegoke_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 glass-chip px-5 py-2.5 font-mono text-xs text-zinc-300 hover:border-[#d9a648]/40 hover:text-[#f6dc8c] transition-all"
            >
              <span>View In Browser</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <a
              href="/olamilekan_adegoke_resume.pdf"
              download="Olamilekan_David_Adegoke_Resume.pdf"
              className="inline-flex items-center gap-2 bg-[#f6dc8c] hover:bg-white px-5 py-2.5 font-mono text-xs font-semibold text-[#120207] transition-all shadow-[0_0_15px_rgba(217,166,72,0.25)]"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
