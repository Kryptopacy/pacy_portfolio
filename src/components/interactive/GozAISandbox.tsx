"use client";

import { useState } from "react";
import { Eye, Volume2, ShieldCheck, AlertTriangle, Sparkles, Sun } from "lucide-react";
import { playMechanicalClick, playLightLocatorTone, playChimeTone } from "@/lib/soundEffects";

export default function GozAISandbox() {
  const [activeMode, setActiveMode] = useState<"medication" | "hazard" | "sound">("medication");
  const [lightLevel, setLightLevel] = useState<number>(3);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [lastSpeech, setLastSpeech] = useState<string>(
    "\"Timolol Maleate Ophthalmic Solution 0.5%. Take 1 drop twice daily. Expires June 2026. Bottle verified sterile.\""
  );

  const handleTestLightTone = (lvl: number) => {
    setLightLevel(lvl);
    playLightLocatorTone(lvl);
  };

  const handleRunAudit = (mode: "medication" | "hazard") => {
    playMechanicalClick();
    setIsAuditing(true);
    setActiveMode(mode);

    setTimeout(() => {
      setIsAuditing(false);
      playChimeTone(523.25);
      if (mode === "medication") {
        setLastSpeech(
          "\"Timolol Maleate Ophthalmic Solution 0.5%. Take 1 drop twice daily. Expires June 2026. Bottle verified sterile.\""
        );
      } else {
        setLastSpeech(
          "\"Caution: Low-contrast flight of 4 descending concrete stairs 1.8 meters ahead. Step down on left handrail.\""
        );
      }
    }, 400);
  };

  return (
    <div className="bg-[#050e08] border border-emerald-500/30 rounded-sm overflow-hidden font-mono text-xs">
      {/* Top Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#08180e] border-b border-emerald-500/20">
        <div className="flex items-center gap-2">
          <Eye className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-white font-medium">GozAI Clinical Triage &amp; Wayfinding Console</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>PLOS ONE &bull; NIH ACCESS GROUNDED</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Mode Selector */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleRunAudit("medication")}
            className={`px-2 py-2 text-left border transition-all text-[11px] ${
              activeMode === "medication"
                ? "bg-emerald-950/60 border-emerald-400 text-emerald-200 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                : "bg-black/40 border-white/10 text-zinc-400 hover:text-white"
            }`}
          >
            01. Rx Medication OCR
          </button>

          <button
            type="button"
            onClick={() => handleRunAudit("hazard")}
            className={`px-2 py-2 text-left border transition-all text-[11px] ${
              activeMode === "hazard"
                ? "bg-emerald-950/60 border-emerald-400 text-emerald-200 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                : "bg-black/40 border-white/10 text-zinc-400 hover:text-white"
            }`}
          >
            02. 1 FPS Spatial Hazard
          </button>

          <button
            type="button"
            onClick={() => {
              playMechanicalClick();
              setActiveMode("sound");
            }}
            className={`px-2 py-2 text-left border transition-all text-[11px] ${
              activeMode === "sound"
                ? "bg-emerald-950/60 border-emerald-400 text-emerald-200 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                : "bg-black/40 border-white/10 text-zinc-400 hover:text-white"
            }`}
          >
            03. Audio Light-Meter
          </button>
        </div>

        {/* Live Simulation Card */}
        {activeMode === "sound" ? (
          <div className="bg-black/80 border border-emerald-500/20 p-3.5 space-y-3">
            <div className="flex items-center justify-between text-zinc-400 text-[10px]">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Sun className="h-3 w-3" /> Offline Light Sensor Simulator
              </span>
              <span>Web Audio API Synthesizer</span>
            </div>
            <p className="text-zinc-300 text-[11px] font-sans">
              Emits rising harmonic frequencies as a visually-impaired user turns towards natural light sources (windows, doorways):
            </p>
            <div className="flex items-center gap-2 pt-1">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => handleTestLightTone(lvl)}
                  className={`flex-1 py-2 font-mono text-xs border transition-all ${
                    lightLevel === lvl
                      ? "bg-emerald-500 text-black font-semibold border-emerald-300"
                      : "bg-black/50 text-zinc-300 border-white/10 hover:border-emerald-500/50"
                  }`}
                >
                  {lvl * 20}% Lux
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-black/80 border border-emerald-500/20 p-3.5 space-y-2">
            <div className="flex items-center justify-between text-zinc-400 text-[10px]">
              <span className="text-emerald-400 flex items-center gap-1">
                <Volume2 className="h-3 w-3" /> Gemini Live Sub-500ms Audio Out
              </span>
              <span className="text-zinc-500">16kHz PCM WebSockets</span>
            </div>
            <div className="p-3 bg-emerald-950/30 border border-emerald-500/20 text-emerald-300 text-xs italic font-sans leading-relaxed">
              {isAuditing ? "Analyzing incoming camera feed..." : lastSpeech}
            </div>
            <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1">
              <span>Verified Clinical Foundation: 1,500+ patient encounters</span>
              <span className="text-emerald-400 font-semibold">Zero-Latency Speech</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
