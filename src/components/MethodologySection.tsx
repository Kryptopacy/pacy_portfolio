import Link from "next/link";
import { ArrowRight, Stethoscope, ShieldCheck, Activity } from "lucide-react";

export default function MethodologySection() {
  return (
    <section id="framework" className="py-20 sm:py-28 bg-[#090a0d] hairline-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Section Heading - Clean typography, no vanity pills */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 mb-16 hairline-b">
          <div>
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="text-amber-400">03</span>
              <span>/</span>
              <span>CLINICAL PHILOSOPHY &bull; THE DIFFERENTIAL PARADIGM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white">
              Differential Diagnosis Applied to Systems Architecture
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-mono text-left sm:text-right">
            Why an active Doctor of Optometry builds high-concurrency software with zero catastrophic race conditions.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-12">
          {/* Left Essay (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
            <p>
              In clinical pathology and ophthalmology, diagnostic errors are irreversible. Across 1,500+ patient encounters at the University of Ilorin Teaching Hospital Eye Clinic and rural surgical outreaches, every diagnosis required building an exhaustive differential tree—systematically eliminating mimicking pathologies through exclusionary evidence before prescribing an intervention.
            </p>
            <p>
              Distributed computing operates under the exact same biological laws. A race condition under flash-sale checkout pressure, a double-booked hotel suite, or an agent hallucination during financial settlement is not an unpredictable glitch—it is an unmapped failure mode in an under-constrained system.
            </p>
            <p className="text-white font-normal">
              At Pacy Labs, codebases are treated as living physiological systems: forming empirical hypotheses, running boundary probes, and locking down state transitions with atomic database constraints (<code className="font-mono text-sm text-sky-300 bg-sky-950/40 px-1.5 py-0.5 border border-sky-500/30">SELECT FOR UPDATE</code>, strict PostgreSQL Row Level Security, and cryptographic session boundaries) so invalid states are physically impossible.
            </p>
          </div>

          {/* Right Principle Callouts (5 cols) */}
          <div className="lg:col-span-5 space-y-5 font-mono text-xs">
            <div className="border border-sky-500/20 bg-[#0e1015] p-6 sm:p-7 space-y-2">
              <div className="text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <Stethoscope className="h-3.5 w-3.5" />
                <span>Principle 01 / Exclusionary Triage</span>
              </div>
              <h3 className="text-base font-medium text-white">
                Eliminate Root Causes Before Code Touches Production
              </h3>
              <p className="text-zinc-400 leading-relaxed font-sans text-xs">
                We never patch superficial symptoms. We map every concurrent branch, stress-test isolation boundaries, and resolve the root physiological breakdown.
              </p>
            </div>

            <div className="border border-amber-500/20 bg-[#0e1015] p-6 sm:p-7 space-y-2">
              <div className="text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Principle 02 / Zero Margin for Error</span>
              </div>
              <h3 className="text-base font-medium text-white">
                Deterministic Financial &amp; State Invariants
              </h3>
              <p className="text-zinc-400 leading-relaxed font-sans text-xs">
                Whether managing patient health records or hotel room folio billing, financial and state mutations must be deterministic, atomic, and idempotent.
              </p>
            </div>

            <div className="border border-emerald-500/20 bg-[#0e1015] p-6 sm:p-7 space-y-2">
              <div className="text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5" />
                <span>Principle 03 / Continuous Telemetry</span>
              </div>
              <h3 className="text-base font-medium text-white">
                Active Probing &amp; Latency Shedding
              </h3>
              <p className="text-zinc-400 leading-relaxed font-sans text-xs">
                From autonomous agent registries (GEBO) to hardware retail counters (DreamwiseHUB), systems maintain autonomic self-healing and load-shedding under surge.
              </p>
            </div>
          </div>
        </div>

        {/* Link to Dossier */}
        <div className="flex justify-start">
          <Link
            href="/dossier"
            className="inline-flex items-center gap-2 font-mono text-xs text-sky-400 hover:text-sky-300 transition-colors"
          >
            <span>Read Complete Clinical Manifesto, Case Chronology &amp; Career Dossier</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
