"use client";

import { useState, useEffect } from "react";
import { MessageSquare, X, Check, ArrowRight } from "lucide-react";

interface NativeIntercomProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function NativeIntercom({ isOpen, onClose, onOpen }: NativeIntercomProps) {
  const [intent, setIntent] = useState("Commission an Enterprise Platform");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Restore draft from localStorage
  useEffect(() => {
    try {
      const savedSender = localStorage.getItem("pacy_dispatch_sender");
      const savedMessage = localStorage.getItem("pacy_dispatch_message");
      if (savedSender) setSender(savedSender);
      if (savedMessage) setMessage(savedMessage);
    } catch {}
  }, []);

  const handleSenderChange = (val: string) => {
    setSender(val);
    try {
      localStorage.setItem("pacy_dispatch_sender", val);
    } catch {}
  };

  const handleMessageChange = (val: string) => {
    setMessage(val);
    try {
      localStorage.setItem("pacy_dispatch_message", val);
    } catch {}
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const formatted = `*DIRECT DISPATCH TO PACY LABS*
------------------------------------
*Intent:* ${intent}
*Sender Contact:* ${sender || "Not provided"}
*Message:*
${message}
------------------------------------
Dispatched from pacylabs.xyz`;

    const subject = encodeURIComponent(`[Direct Dispatch] ${intent} - ${sender || "Inquiry"}`);
    const body = encodeURIComponent(formatted);
    window.location.href = `mailto:pacy@cruisehq.fun?subject=${subject}&body=${body}`;

    setSubmitted(true);
    try {
      localStorage.removeItem("pacy_dispatch_message");
    } catch {}
  };

  const handleWhatsAppHandOff = () => {
    const formatted = `*DIRECT DISPATCH TO PACY LABS*
------------------------------------
*Intent:* ${intent}
*Sender Contact:* ${sender || "Not provided"}
*Message:*
${message}
------------------------------------
Dispatched from pacylabs.xyz`;
    window.open(`https://wa.me/2349130262529?text=${encodeURIComponent(formatted)}`, "_blank");
  };

  return (
    <>
      {/* Floating Trigger Button (Hidden on mobile to avoid overlapping with bottom dock) */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        {!isOpen && (
          <button
            onClick={onOpen}
            className="flex items-center gap-2 border border-white/20 bg-[#0e1015] px-4 py-2 text-white hover:bg-white hover:text-black transition-colors font-mono text-xs shadow-2xl"
            aria-label="Open Direct Dispatch"
          >
            <span>Dispatch / Message</span>
            <MessageSquare className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Floating Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-end justify-end p-4 sm:p-6 pointer-events-none">
          <div className="pointer-events-auto w-full max-w-md border border-white/20 bg-[#0e1015] p-6 shadow-2xl transition-all">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                  Direct Dispatch Channel
                </span>
                <h3 className="font-medium text-white text-sm">
                  Olamilekan David Adegoke
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3 font-mono text-xs">
                <Check className="h-8 w-8 text-zinc-200 mx-auto" />
                <h4 className="font-medium text-white text-sm">
                  Dispatch Brief Prepared
                </h4>
                <p className="text-zinc-400 max-w-xs mx-auto leading-relaxed">
                  Your mail client has been opened to send this brief directly to <span className="text-white">pacy@cruisehq.fun</span>.
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={handleWhatsAppHandOff}
                    className="w-full inline-flex items-center justify-center gap-2 bg-zinc-100 px-4 py-2 font-semibold text-black hover:bg-white transition-colors"
                  >
                    <span>Also send via WhatsApp (+234 913 026 2529)</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage("");
                    }}
                    className="text-zinc-500 hover:text-zinc-300 py-1"
                  >
                    Send another note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-xs text-zinc-400 mb-1">
                    Intent
                  </label>
                  <select
                    value={intent}
                    onChange={(e) => setIntent(e.target.value)}
                    className="w-full border border-white/10 bg-black/60 px-3 py-2 font-mono text-xs text-white focus:border-white focus:outline-none"
                  >
                    <option value="Commission an Enterprise Platform">Commission an Enterprise Platform</option>
                    <option value="W3C WebMCP & Agent Protocols">W3C WebMCP &amp; Agent Protocols</option>
                    <option value="Pre-Ship Codebase Audit">Pre-Ship Codebase Audit</option>
                    <option value="Architectural Advisory">Architectural Advisory</option>
                    <option value="Direct Clinical / Tech Inquiry">Direct Clinical / Tech Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs text-zinc-400 mb-1">
                    Your Contact (Email or WhatsApp)
                  </label>
                  <input
                    type="text"
                    value={sender}
                    onChange={(e) => handleSenderChange(e.target.value)}
                    placeholder="email@company.com or +234..."
                    className="w-full border border-white/10 bg-black/60 px-3 py-2 font-mono text-xs text-white placeholder-zinc-600 focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-zinc-400 mb-1">
                    Brief / Message
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => handleMessageChange(e.target.value)}
                    placeholder="Describe your technical challenge, timeline, or scope..."
                    className="w-full border border-white/10 bg-black/60 px-3 py-2 font-mono text-xs text-white placeholder-zinc-600 focus:border-white focus:outline-none resize-none"
                    required
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppHandOff}
                    className="font-mono text-xs text-zinc-400 hover:text-white transition-colors"
                  >
                    Quick WhatsApp &rarr;
                  </button>

                  <button
                    type="submit"
                    className="bg-zinc-100 hover:bg-white px-4 py-2 font-mono text-xs font-semibold text-black transition-colors"
                  >
                    Send Direct Note
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
