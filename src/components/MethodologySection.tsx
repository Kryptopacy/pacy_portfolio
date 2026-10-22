import Link from "next/link";
import { ArrowRight, Stethoscope, ShieldCheck, Activity } from "lucide-react";

export default function MethodologySection() {
  return (
    <section id="framework" className="relative py-20 sm:py-28 bg-transparent hairline-b overflow-hidden">
      {/* Brand Ambiance */}
      <div className="pointer-events-none absolute top-1/2 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(58,13,28,0.35)_0%,_rgba(217,166,72,0.06)_40%,_transparent_70%)] blur-3xl opacity-60" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 mb-16 hairline-b">
          <div>
            <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="text-[#f6dc8c] font-semibold border border-[#d9a648]/40 bg-[#3a0d1c]/50 px-1.5 py-0.5 shadow-[0_0_8px_rgba(217,166,72,0.2)]">04</span>
              <span className="text-zinc-600">/</span>
              <span>ENGINEERING DISCIPLINE &bull; THE DIAGNOSTIC PARADIGM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white">
              Diagnostic Thinking Applied to Systems Architecture
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-mono text-left sm:text-right">
            How clinical diagnostic training informs root-cause debugging, concurrency controls, and high-assurance software engineering.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-12">
          {/* Left Essay (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#d4c5ca] font-light leading-relaxed">
            <p>
              In clinical healthcare, diagnostic errors carry real-world consequences. Across 1,500+ patient encounters at the University of Ilorin Teaching Hospital Eye Clinic and surgical outreaches, every diagnosis required systematic differential analysis—eliminating mimicking pathologies through exclusionary evidence before prescribing an intervention.
            </p>
            <p>
              Complex distributed systems benefit from the exact same discipline. A race condition under flash-sale checkout pressure, an overbooked hotel room, or an agent tool failure during financial settlement is rarely an isolated anomaly—it is an unmapped failure mode in an under-constrained system.
            </p>
            <p className="text-white font-normal">
              At Pacy Labs, we approach codebases with diagnostic rigor: forming falsifiable hypotheses, validating boundary conditions, and enforcing state transitions with atomic database constraints (<code className="font-mono text-sm text-[#f6dc8c] bg-[#3a0d1c]/60 px-1.5 py-0.5 border border-[#d9a648]/40 shadow-[0_0_8px_rgba(217,166,72,0.15)]">SELECT FOR UPDATE</code>, strict PostgreSQL Row-Level Security, and typed schemas) so invalid states are structurally impossible.
            </p>
          </div>

          {/* Right Principle Callouts (5 cols) */}
          <div className="lg:col-span-5 space-y-5 font-mono text-xs">
            <div className="glass-panel-interactive border border-sky-500/25 p-6 sm:p-7 space-y-2">
              <div className="text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <Stethoscope className="h-3.5 w-3.5" />
                <span>Principle 01 / Root-Cause Diagnosis</span>
              </div>
              <h3 className="text-base font-medium text-white">
                Eliminate Root Causes, Not Just Surface Symptoms
              </h3>
              <p className="text-zinc-400 leading-relaxed font-sans text-xs">
                We avoid superficial patches. We trace issues back to schema design, race conditions, or isolation boundaries, fixing the underlying failure mode at the source.
              </p>
            </div>

            <div className="glass-panel-interactive border border-amber-500/25 p-6 sm:p-7 space-y-2">
              <div className="text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Principle 02 / Deterministic State</span>
              </div>
              <h3 className="text-base font-medium text-white">
                Deterministic Invariants &amp; Financial Integrity
              </h3>
              <p className="text-zinc-400 leading-relaxed font-sans text-xs">
                Whether managing guest folios, retail checkout carts, or balance transfers, state mutations must be atomic, idempotent, and backed by database constraints.
              </p>
            </div>

            <div className="glass-panel-interactive border border-emerald-500/25 p-6 sm:p-7 space-y-2">
              <div className="text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5" />
                <span>Principle 03 / Continuous Observability</span>
              </div>
              <h3 className="text-base font-medium text-white">
                Active Verification &amp; Graceful Degradation
              </h3>
              <p className="text-zinc-400 leading-relaxed font-sans text-xs">
                From autonomous agent workflows to offline-first retail POS terminals, systems are designed to monitor performance, handle network drops, and degrade gracefully under load.
              </p>
            </div>
          </div>
        </div>

        {/* Link to Dossier */}
        <div className="flex justify-start">
          <Link
            href="/dossier"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#f6dc8c] hover:text-white transition-colors"
          >
            <span>Read Complete Engineering Manifesto &amp; Career Dossier</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
