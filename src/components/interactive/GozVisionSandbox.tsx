"use client";

import { useState } from "react";
import { Eye, Stethoscope, ShieldCheck, Sparkles, Sliders, DollarSign, Activity } from "lucide-react";
import { playMechanicalClick, playChimeTone, playLightLocatorTone } from "@/lib/soundEffects";

export default function GozVisionSandbox() {
  const [activeTab, setActiveTab] = useState<"scribe" | "cv" | "rtm">("scribe");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Scribe State
  const [scribeStage, setScribeStage] = useState<"ready" | "scribing" | "documented">("documented");

  // CV State
  const [cvFilter, setCvFilter] = useState<"clahe" | "glare" | "ocr">("clahe");

  // RTM State
  const [telemetryDays, setTelemetryDays] = useState<number>(18);

  const handleRunScribe = () => {
    playMechanicalClick();
    setIsProcessing(true);
    setScribeStage("scribing");

    setTimeout(() => {
      setIsProcessing(false);
      setScribeStage("documented");
      playChimeTone(523.25);
    }, 450);
  };

  const handleFilterChange = (filter: "clahe" | "glare" | "ocr") => {
    playMechanicalClick();
    setCvFilter(filter);
    playLightLocatorTone(filter === "clahe" ? 3 : filter === "glare" ? 1 : 5);
  };

  return (
    <div className="bg-[#040e08] border border-emerald-500/30 rounded-sm overflow-hidden font-mono text-xs">
      {/* Chrome Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 bg-[#08180e] border-b border-emerald-500/20">
        <div className="flex items-center gap-2">
          <Eye className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-white font-medium">GozVision Practice Operating Console</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>HL7 FHIR R4 &bull; WCAG 2.2 AAA</span>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-3 border-b border-emerald-500/15 bg-black/40 text-[11px]">
        <button
          type="button"
          onClick={() => {
            playMechanicalClick();
            setActiveTab("scribe");
          }}
          className={`py-2 px-2 text-center transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === "scribe"
              ? "bg-emerald-950/60 text-emerald-300 border-b-2 border-emerald-400 font-medium"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Stethoscope className="h-3 w-3" />
          <span>Ambient Scribe</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playMechanicalClick();
            setActiveTab("cv");
          }}
          className={`py-2 px-2 text-center transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === "cv"
              ? "bg-emerald-950/60 text-emerald-300 border-b-2 border-emerald-400 font-medium"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Sliders className="h-3 w-3" />
          <span>OpenCV 5.0 Edge</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playMechanicalClick();
            setActiveTab("rtm");
          }}
          className={`py-2 px-2 text-center transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === "rtm"
              ? "bg-emerald-950/60 text-emerald-300 border-b-2 border-emerald-400 font-medium"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <DollarSign className="h-3 w-3" />
          <span>CMS RTM Billing</span>
        </button>
      </div>

      {/* Main Sandbox Interactive Body */}
      <div className="p-4 space-y-4">
        {/* TAB 1: AMBIENT SCRIBE (OLD CARTS) */}
        {activeTab === "scribe" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-400">Doctor-Patient Encounter Audio Stream:</span>
              <button
                type="button"
                onClick={handleRunScribe}
                disabled={isProcessing}
                className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-xs flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(16,185,129,0.15)] disabled:opacity-50"
              >
                <Sparkles className="h-3 w-3" />
                <span>{isProcessing ? "Extracting OLD CARTS..." : "Re-Scribe Encounter"}</span>
              </button>
            </div>

            <div className="p-2.5 bg-black/60 border border-emerald-500/20 text-zinc-300 rounded text-[11px] leading-relaxed">
              <span className="text-emerald-400 font-medium block mb-1">
                Encounter Audio Snippet (Dr. Adegoke, O.D. $\leftrightarrow$ Patient):
              </span>
              <p className="italic text-zinc-400">
                &ldquo;Patient reports severe burning and foreign-body sensation in both eyes for the past 3 weeks, aggravated by screen work and air conditioning. Tear Break-Up Time 4s OD, 3s OS.&rdquo;
              </p>
            </div>

            {/* Generated FHIR R4 Clinical Note */}
            <div className="p-3 bg-[#020804] border border-emerald-500/30 rounded space-y-2">
              <div className="flex items-center justify-between text-[10px] text-emerald-400 border-b border-emerald-500/20 pb-1.5 font-semibold uppercase tracking-wider">
                <span>Structured OLD CARTS Case History (FHIR R4 Condition)</span>
                <span className="text-white bg-emerald-950 px-1.5 py-0.5 border border-emerald-500/30">ICD-10 H04.123</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-1.5 bg-black/40 border border-white/05">
                  <span className="text-zinc-500 block">Onset &amp; Location:</span>
                  <span className="text-zinc-200">3 weeks ago &bull; Bilateral Ocular Surface</span>
                </div>
                <div className="p-1.5 bg-black/40 border border-white/05">
                  <span className="text-zinc-500 block">Character &amp; Severity:</span>
                  <span className="text-zinc-200">Gritty foreign-body &bull; 6/10 Discomfort</span>
                </div>
                <div className="p-1.5 bg-black/40 border border-white/05">
                  <span className="text-zinc-500 block">Aggravating Factors:</span>
                  <span className="text-zinc-200">Screen use (VDT) &bull; AC airflow</span>
                </div>
                <div className="p-1.5 bg-black/40 border border-white/05">
                  <span className="text-zinc-500 block">Clinical Findings:</span>
                  <span className="text-emerald-300">TBUT: 4s OD / 3s OS &bull; Grade 2 Staining</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[10px] text-zinc-400 border-t border-emerald-500/15">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="h-3 w-3" />
                  <span>SMART on FHIR Ready &bull; Epic / Eyefinity Synced</span>
                </span>
                <span className="text-zinc-500">Air-Gapped WebGPU</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OPENCV 5.0 EDGE CV PIPELINE */}
        {activeTab === "cv" && (
          <div className="space-y-3">
            <div className="text-[11px] text-zinc-400">Select Edge CV Transformation Filter:</div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleFilterChange("clahe")}
                className={`p-2 text-left rounded-xs border transition-all ${
                  cvFilter === "clahe"
                    ? "bg-emerald-950/60 border-emerald-400 text-white shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                    : "bg-black/40 border-white/10 text-zinc-400 hover:text-white"
                }`}
              >
                <div className="font-medium text-emerald-300 text-[10px]">Adaptive CLAHE</div>
                <div className="text-[9px] text-zinc-500">+40% Local Contrast</div>
              </button>

              <button
                type="button"
                onClick={() => handleFilterChange("glare")}
                className={`p-2 text-left rounded-xs border transition-all ${
                  cvFilter === "glare"
                    ? "bg-emerald-950/60 border-emerald-400 text-white shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                    : "bg-black/40 border-white/10 text-zinc-400 hover:text-white"
                }`}
              >
                <div className="font-medium text-emerald-300 text-[10px]">Glare Shield</div>
                <div className="text-[9px] text-zinc-500">Photophobia Attenuation</div>
              </button>

              <button
                type="button"
                onClick={() => handleFilterChange("ocr")}
                className={`p-2 text-left rounded-xs border transition-all ${
                  cvFilter === "ocr"
                    ? "bg-emerald-950/60 border-emerald-400 text-white shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                    : "bg-black/40 border-white/10 text-zinc-400 hover:text-white"
                }`}
              >
                <div className="font-medium text-emerald-300 text-[10px]">Reading Zone</div>
                <div className="text-[9px] text-zinc-500">Morphological Rx OCR</div>
              </button>
            </div>

            {/* Filter Output Simulation */}
            <div className="p-3 bg-black/70 border border-emerald-500/20 rounded space-y-1.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-zinc-500 uppercase">Live Pipeline Frame Output</span>
                <span className="text-emerald-400">OpenCV 5.0 Wasm Edge &bull; 60 FPS</span>
              </div>

              {cvFilter === "clahe" && (
                <div className="text-[11px] text-emerald-200 leading-relaxed">
                  [LAB Color Space] L-channel histogram equalization active. Clip limit: 2.0, Tile grid: 8x8. Visual acuity target resolution recovered through cloudy cataract media.
                </div>
              )}

              {cvFilter === "glare" && (
                <div className="text-[11px] text-amber-200 leading-relaxed">
                  [Specular Attenuation] High-frequency glare hot-spots suppressed (-68% peak luminance). Eliminates corneal reflection flare for post-refractive &amp; photophobia patients.
                </div>
              )}

              {cvFilter === "ocr" && (
                <div className="text-[11px] text-cyan-200 leading-relaxed">
                  [Morphological Bounding] Isolated prescription label: <strong className="text-white">&ldquo;Timolol Maleate 0.5% Ophthalmic Solution. 1 drop BID. Exp: 06/2026.&rdquo;</strong> Verified sterile seal intact.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: CMS RTM REIMBURSEMENT (CPT 98975 / 98980) */}
        {activeTab === "rtm" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-400">30-Day Patient Telemetry Compliance:</span>
              <span className="text-emerald-300 font-medium">{telemetryDays} Days Active (&gt;16 Days Required)</span>
            </div>

            <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden border border-white/10">
              <div
                className="bg-gradient-to-r from-emerald-500 to-[#d9a648] h-2 transition-all duration-500"
                style={{ width: `${(telemetryDays / 30) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2.5 bg-black/60 border border-emerald-500/30 rounded">
                <div className="flex items-center justify-between text-emerald-400 font-semibold mb-1">
                  <span>CPT 98975</span>
                  <span>$19.38</span>
                </div>
                <p className="text-zinc-400 text-[9px] leading-snug">
                  Initial device set-up &amp; patient education on assistive optical copilot.
                </p>
                <div className="mt-2 text-[9px] text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Validated &bull; Ready to Batch</span>
                </div>
              </div>

              <div className="p-2.5 bg-black/60 border border-emerald-500/30 rounded">
                <div className="flex items-center justify-between text-emerald-400 font-semibold mb-1">
                  <span>CPT 98980</span>
                  <span>$50.18</span>
                </div>
                <p className="text-zinc-400 text-[9px] leading-snug">
                  First 20 min clinical staff time per calendar month monitoring low-vision telemetry.
                </p>
                <div className="mt-2 text-[9px] text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Validated &bull; 24 Min Logged</span>
                </div>
              </div>
            </div>

            <div className="p-2 bg-[#020804] border border-emerald-500/20 text-[10px] text-zinc-400 flex items-center justify-between">
              <span>Monthly Recurring Practice Reimbursement:</span>
              <span className="text-[#f6dc8c] font-bold text-xs">+$69.56 / patient / month</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CheckCircle2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
