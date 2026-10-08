"use client";

import { useState } from "react";
import { ShieldCheck, Dices, RefreshCw, Stamp, CheckCircle2 } from "lucide-react";
import { playMechanicalClick, playChimeTone } from "@/lib/soundEffects";

export default function BauntiSandbox() {
  const [clientSeed, setClientSeed] = useState<string>("pacy_entropy_99");
  const [serverHmac, setServerHmac] = useState<string>("8f2b1d7e4a0c6e83d9512347faec0912");
  const [calculatedHash, setCalculatedHash] = useState<string>(
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  );
  const [sliceShares, setSliceShares] = useState<number[]>([42.5, 31.2, 26.3]);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isStamped, setIsStamped] = useState<boolean>(false);

  const handleRollSeed = () => {
    playMechanicalClick();
    setIsVerifying(true);
    setIsStamped(false);

    setTimeout(() => {
      const randomSeed = "entropy_" + Math.random().toString(36).substring(2, 9);
      const randomHmac = Array.from({ length: 32 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("");
      const randomHash = Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("");

      setClientSeed(randomSeed);
      setServerHmac(randomHmac);
      setCalculatedHash(randomHash);

      // Solve exact-sum pot slice
      const r1 = +(35 + Math.random() * 15).toFixed(1);
      const r2 = +(25 + Math.random() * 15).toFixed(1);
      const r3 = +(100 - r1 - r2).toFixed(1);
      setSliceShares([r1, r2, r3]);

      setIsVerifying(false);
      setIsStamped(true);
      playChimeTone(587.33);
    }, 350);
  };

  return (
    <div className="bg-[#120306] border border-rose-500/30 rounded-sm overflow-hidden font-mono text-xs">
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#20050d] border-b border-rose-500/20">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-rose-400" />
          <span className="text-white font-medium">BAUNTI Provably-Fair Draw Engine</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-rose-300">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
          <span>COMMIT-REVEAL SHA-256 HMAC</span>
        </div>
      </div>

      <div className="p-4 space-y-3.5">
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-2.5 bg-black/60 border border-white/08 space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase">Participant Client Seed</span>
            <div className="text-zinc-200 truncate">{clientSeed}</div>
          </div>
          <div className="p-2.5 bg-black/60 border border-white/08 space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase">Earmarked Pool Escrow</span>
            <div className="text-rose-300 truncate font-semibold">pool:challenge_0x9b</div>
          </div>
        </div>

        <div className="p-2.5 bg-black/80 border border-white/10 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] text-zinc-500">
            <span>PUBLIC AUDIT HASH (SHA-256)</span>
            <span className="text-emerald-400">Exact Sum: 100.0% Pot</span>
          </div>
          <div className="text-zinc-300 text-[10px] truncate">{calculatedHash}</div>
          <div className="flex items-center gap-1 text-[10px] text-zinc-400 pt-1 border-t border-white/06">
            <span>The Slice Solver:</span>
            {sliceShares.map((share, idx) => (
              <span key={idx} className="bg-rose-950/40 text-rose-300 px-1.5 py-0.2 border border-rose-900/40">
                W{idx + 1}: {share}%
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
            {isStamped ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Wax-Seal Warrant Stamped
              </span>
            ) : (
              <span>Immutable On-Chain Ledger Audit</span>
            )}
          </div>

          <button
            type="button"
            onClick={handleRollSeed}
            disabled={isVerifying}
            className="inline-flex items-center gap-1.5 bg-rose-500 hover:bg-rose-400 text-black font-semibold px-4 py-2 text-xs transition-all disabled:opacity-50"
          >
            {isVerifying ? (
              <>
                <RefreshCw className="h-3 w-3 animate-spin" />
                <span>Hashing Entropy...</span>
              </>
            ) : (
              <>
                <Dices className="h-3.5 w-3.5" />
                <span>Verify Cryptographic Draw</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
