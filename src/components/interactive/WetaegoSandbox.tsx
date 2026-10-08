"use client";

import { useState } from "react";
import { Terminal, Play, ShieldAlert, CheckCircle2, RefreshCw, Printer } from "lucide-react";
import { playMechanicalClick, playChimeTone } from "@/lib/soundEffects";

export default function WetaegoSandbox() {
  const [activeTab, setActiveTab] = useState<"webmcp" | "hardware">("webmcp");
  const [selectedTool, setSelectedTool] = useState<string>("search_catalog");
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLog, setExecutionLog] = useState<{
    status: "idle" | "running" | "success";
    tool: string;
    output: any;
    durationMs?: number;
  }>({
    status: "idle",
    tool: "search_catalog",
    output: {
      action: "System Ready",
      note: "Click 'Dispatch Tool' to simulate autonomous agent browsing via W3C WebMCP.",
    },
  });

  const tools = [
    {
      name: "search_catalog",
      description: "Queries multi-tenant PostgreSQL catalog across 6 polymorphic verticals.",
      samplePayload: { query: "Signature Tasting Menu", vertical: "dining", limit: 3 },
      response: {
        results: [
          { id: "item_901", name: "Chef's 5-Course Omakase", price: 45000, currency: "NGN", stock: 12 },
          { id: "item_902", name: "Sommelier Wine Pairing", price: 20000, currency: "NGN", stock: 8 },
        ],
        concurrency: "SELECT FOR UPDATE verified",
        latency: "18ms",
      },
    },
    {
      name: "add_to_cart",
      description: "Locks inventory row atomically and updates session state.",
      samplePayload: { itemId: "item_901", quantity: 2, reservationTime: "20:00 UTC" },
      response: {
        cartId: "cart_38f2a",
        itemsLocked: 2,
        ttlSeconds: 600,
        status: "RESERVED_LOCK_ACQUIRED",
      },
    },
    {
      name: "initiate_checkout",
      description: "Enforces Human-in-the-Loop permission gate before payment execution.",
      samplePayload: { cartId: "cart_38f2a", paymentMethod: "x402_micropayment" },
      response: {
        trustGate: "HUMAN_IN_THE_LOOP_REQUIRED",
        challenge: "User biometric/wallet confirmation prompt rendered to screen",
        protocol: "RFC 9727 HTTP 402 Payment Required",
      },
    },
  ];

  const handleRunTool = () => {
    playMechanicalClick();
    setIsExecuting(true);
    const targetTool = tools.find((t) => t.name === selectedTool) || tools[0];

    setTimeout(() => {
      setIsExecuting(false);
      playChimeTone(659.25);
      setExecutionLog({
        status: "success",
        tool: targetTool.name,
        output: targetTool.response,
        durationMs: Math.floor(Math.random() * 25) + 12,
      });
    }, 450);
  };

  return (
    <div className="bg-[#0e0205] border border-white/10 rounded-sm overflow-hidden font-mono text-xs">
      {/* Top Controller Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#18030b] border-b border-white/10">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-[#d9a648]" />
          <span className="text-white font-medium">W3C WebMCP Agent Runtime Simulator</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-zinc-400">document.modelContext ACTIVE</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Tool Selectors */}
        <div>
          <div className="text-[10px] text-zinc-400 uppercase tracking-wider mb-2">
            Select Autonomous Agent Tool Declaration:
          </div>
          <div className="grid grid-cols-3 gap-2">
            {tools.map((t) => (
              <button
                key={t.name}
                type="button"
                onClick={() => {
                  playMechanicalClick();
                  setSelectedTool(t.name);
                }}
                className={`px-2.5 py-1.5 text-left border transition-all truncate text-[11px] ${
                  selectedTool === t.name
                    ? "bg-[#3a0d1c] border-[#d9a648] text-[#f6dc8c] font-semibold shadow-[0_0_12px_rgba(217,166,72,0.2)]"
                    : "bg-black/40 border-white/10 text-zinc-400 hover:text-white"
                }`}
              >
                {t.name}()
              </button>
            ))}
          </div>
        </div>

        {/* Live Code / Output Panel */}
        <div className="bg-black/80 border border-white/10 p-3 rounded-xs text-[11px] space-y-2">
          <div className="flex items-center justify-between text-zinc-500 text-[10px] pb-1 border-b border-white/06">
            <span>REGISTRATION ON document.modelContext</span>
            {executionLog.durationMs && (
              <span className="text-emerald-400">{executionLog.durationMs}ms latency</span>
            )}
          </div>

          <pre className="text-sky-300 overflow-x-auto py-1">
            {`> window.modelContext.invokeTool("${selectedTool}", ${JSON.stringify(
              tools.find((t) => t.name === selectedTool)?.samplePayload,
              null,
              0
            )})`}
          </pre>

          <div className="pt-2 border-t border-white/06">
            <div className="text-[10px] text-zinc-400 mb-1 flex items-center justify-between">
              <span>OUTPUT RESPONSE:</span>
              {executionLog.status === "success" && (
                <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="h-2.5 w-2.5" /> VERIFIED
                </span>
              )}
            </div>
            <pre className="text-zinc-300 text-[10px] overflow-x-auto bg-black/60 p-2 border border-white/04 rounded-xs max-h-24">
              {JSON.stringify(executionLog.output, null, 2)}
            </pre>
          </div>
        </div>

        {/* Action Trigger Button */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] text-zinc-500">
            Mandatory Human-in-the-Loop payment security
          </span>

          <button
            type="button"
            onClick={handleRunTool}
            disabled={isExecuting}
            className="inline-flex items-center gap-1.5 bg-[#d9a648] hover:bg-[#f6dc8c] text-black font-semibold px-4 py-2 text-xs transition-all disabled:opacity-50"
          >
            {isExecuting ? (
              <>
                <RefreshCw className="h-3 w-3 animate-spin" />
                <span>Executing Tool...</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3 fill-current" />
                <span>Dispatch Tool Call</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
