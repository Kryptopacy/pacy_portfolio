import { ArrowUpRight, GraduationCap, Briefcase, FileDown } from "lucide-react";
import { EXECUTIVE_PROFILE } from "@/data/portfolioData";

export default function ResumeDossier() {
  return (
    <section id="dossier" className="py-28 sm:py-36 bg-[#050608] hairline-b">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 mb-16 hairline-b">
          <div>
            <div className="font-mono text-xs text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span>05 // Executive Dossier</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
              Credentials &amp; Master Resume
            </h2>
          </div>

          <a
            href="/olamilekan_adegoke_resume.pdf"
            download="Olamilekan_David_Adegoke_Resume.pdf"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 font-mono text-xs sm:text-sm font-semibold text-black hover:bg-zinc-200 transition-colors shadow-xl shrink-0"
          >
            <span>Download Master Resume (PDF)</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Education & Core Profile (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-2xl border border-white/10 bg-[#090b12]/50 p-6 sm:p-8">
              <div className="font-mono text-xs text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span>Formal Medical Degree</span>
              </div>
              <h3 className="text-2xl font-light text-white mb-1">
                {EXECUTIVE_PROFILE.education.degree}
              </h3>
              <p className="text-sm font-mono text-zinc-400 mb-4">
                {EXECUTIVE_PROFILE.education.institution} • {EXECUTIVE_PROFILE.education.year}
              </p>
              <div className="rounded-lg border border-white/10 bg-black/40 p-3.5 font-mono text-xs text-zinc-400">
                {EXECUTIVE_PROFILE.education.license}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#090b12]/50 p-6 sm:p-8">
              <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-4">
                Core Systems Expertise
              </div>
              <div className="space-y-3 font-mono text-xs text-zinc-300">
                <div className="flex justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-zinc-500">Core Languages:</span>
                  <span className="text-white">TypeScript, Rust, Python, Dart</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-zinc-500">Full-Stack Frameworks:</span>
                  <span className="text-white">Next.js 16, React 19, Flutter</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-zinc-500">Database &amp; Concurrency:</span>
                  <span className="text-white">PostgreSQL RLS, Supabase, Redis</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-zinc-500">Agent Standards:</span>
                  <span className="text-white">W3C WebMCP, Gemini Live API</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Decentralized Protocols:</span>
                  <span className="text-white">ERC-8004, ERC-8183 APEX, EIP-7702</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Experience Chronology (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#090b12]/50 p-6 sm:p-8">
            <div className="font-mono text-xs text-blue-400 uppercase tracking-widest mb-8 flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span>Career Chronology</span>
            </div>

            <div className="space-y-10">
              {/* Role 1 */}
              <div className="border-l border-blue-500/40 pl-6 relative">
                <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-blue-500" />
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <h4 className="text-lg font-light text-white">
                    Independent Systems Architect &amp; Software Developer
                  </h4>
                  <span className="font-mono text-xs text-zinc-500">May 2023 – Present</span>
                </div>
                <div className="font-mono text-xs text-blue-400 mb-3">Pacy Labs // Remote</div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Architecting production platforms across enterprise retail, hospitality, Web3, and AI. Built and deployed full-scale commercial operating systems (Joebrown Palace Hotel, DreamwiseHUB, Wetaego, CruiseHQ) with zero double-booking and zero inventory overselling guarantees.
                </p>
              </div>

              {/* Role 2 */}
              <div className="border-l border-white/15 pl-6 relative">
                <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-zinc-600" />
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <h4 className="text-lg font-light text-white">
                    Intern Optometrist
                  </h4>
                  <span className="font-mono text-xs text-zinc-500">May 2024 – May 2025</span>
                </div>
                <div className="font-mono text-xs text-zinc-500 mb-3">Catholic Optic Outreach | Nigeria</div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Managed cumulative volume of 1,500+ patient encounters, translating differential clinical triage into structured benchmark datasets and medical reasoning QA to evaluate health-tech algorithms with zero defect tolerance.
                </p>
              </div>

              {/* Role 3 */}
              <div className="border-l border-white/15 pl-6 relative">
                <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-zinc-600" />
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <h4 className="text-lg font-light text-white">
                    Extern Optometrist
                  </h4>
                  <span className="font-mono text-xs text-zinc-500">Apr 2022 – Oct 2022</span>
                </div>
                <div className="font-mono text-xs text-zinc-500 mb-3">University of Ilorin Teaching Hospital Eye Clinic</div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Conducted high-volume tertiary hospital clinical evaluations, refining diagnostic precision under high-pressure conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
