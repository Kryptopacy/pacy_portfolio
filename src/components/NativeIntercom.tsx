"use client";

import { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  X,
  Send,
  User,
  Bot,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Loader2,
  PhoneCall,
  ExternalLink,
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface Message {
  id: string;
  sender_type: "visitor" | "ai" | "founder";
  sender_name: string;
  text: string;
  created_at: string;
}

interface NativeIntercomProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function NativeIntercom({ isOpen, onClose, onOpen }: NativeIntercomProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      sender_type: "ai",
      sender_name: "Pacy Labs Intercom",
      text: "Greetings. I am the autonomous systems assistant for Pacy Labs. Ask me anything about our architectures (Wetaego, CruiseHQ, Baunti, CaelumOS), founder Dr. Adegoke's clinical triage background, or commission availability.",
      created_at: new Date().toISOString(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [visitorId, setVisitorId] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [visitorContact, setVisitorContact] = useState("");
  const [contactCaptured, setContactCaptured] = useState(false);
  const [showContactPrompt, setShowContactPrompt] = useState(false);
  const [founderLiveActive, setFounderLiveActive] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize unique visitor ID and restore conversation
  useEffect(() => {
    let vid = "";
    try {
      vid = localStorage.getItem("pacy_intercom_visitor_id") || "";
      if (!vid) {
        vid = "v_" + Math.random().toString(36).substring(2, 10);
        localStorage.setItem("pacy_intercom_visitor_id", vid);
      }
      setVisitorId(vid);

      const savedContact = localStorage.getItem("pacy_intercom_contact");
      if (savedContact) {
        setVisitorContact(savedContact);
        setContactCaptured(true);
      }

      const savedChat = localStorage.getItem("pacy_intercom_history");
      if (savedChat) {
        const parsed = JSON.parse(savedChat);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {}
  }, []);

  // Save conversation history to local storage
  useEffect(() => {
    if (messages.length > 1) {
      try {
        localStorage.setItem("pacy_intercom_history", JSON.stringify(messages.slice(-30)));
      } catch {}
    }
  }, [messages]);

  // Scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  // Set up Supabase Realtime channel for live founder replies
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase || !conversationId) return;

    // Listen to new messages for this conversation
    const channel = supabase
      .channel(`intercom:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "intercom_messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMsg = payload.new as any;
          if (newMsg && newMsg.sender_type === "founder") {
            setFounderLiveActive(true);
            setMessages((prev) => {
              if (prev.some((m) => m.id === newMsg.id)) return prev;
              return [
                ...prev,
                {
                  id: newMsg.id,
                  sender_type: "founder",
                  sender_name: newMsg.sender_name || "Dr. Olamilekan David Adegoke",
                  text: newMsg.text,
                  created_at: newMsg.created_at || new Date().toISOString(),
                },
              ];
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  // Helper to sync or create conversation in Supabase
  const ensureSupabaseConversation = async () => {
    if (!isSupabaseConfigured || !supabase) return null;
    try {
      if (conversationId) return conversationId;

      // Check if conversation exists
      const { data: existing } = await supabase
        .from("intercom_conversations")
        .select("id")
        .eq("visitor_id", visitorId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (existing?.id) {
        setConversationId(existing.id);
        return existing.id;
      }

      // Create new conversation
      const { data: created, error } = await supabase
        .from("intercom_conversations")
        .insert({
          visitor_id: visitorId,
          visitor_contact: visitorContact || "",
          status: "ai_active",
        })
        .select("id")
        .single();

      if (created?.id) {
        setConversationId(created.id);
        return created.id;
      }
    } catch (e) {
      console.warn("Supabase conversation sync note:", e);
    }
    return null;
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const textToSend = inputText.trim();
    if (!textToSend || isTyping) return;

    const userMsg: Message = {
      id: "u_" + Date.now(),
      sender_type: "visitor",
      sender_name: "You",
      text: textToSend,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Save to Supabase if configured
    let activeConvId = conversationId;
    if (isSupabaseConfigured && supabase) {
      try {
        activeConvId = await ensureSupabaseConversation();
        if (activeConvId) {
          await supabase.from("intercom_messages").insert({
            conversation_id: activeConvId,
            sender_type: "visitor",
            sender_name: "Visitor (" + visitorId.slice(-4) + ")",
            text: textToSend,
          });
        }
      } catch (err) {
        console.warn("Supabase sync:", err);
      }
    }

    // Call Gemini / Intercom AI API
    try {
      const res = await fetch("/api/intercom/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-6).map((m) => ({
            role: m.sender_type === "visitor" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });

      const data = await res.json();
      const replyText = data.reply || "Thank you for reaching out to Pacy Labs.";

      const aiMsg: Message = {
        id: "ai_" + Date.now(),
        sender_type: "ai",
        sender_name: "Pacy Labs Intercom",
        text: replyText,
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Push AI reply to Supabase if active
      if (isSupabaseConfigured && supabase && activeConvId) {
        await supabase.from("intercom_messages").insert({
          conversation_id: activeConvId,
          sender_type: "ai",
          sender_name: "Pacy Labs Intercom",
          text: replyText,
        });
      }

      // Prompt for contact after 2 user questions if not already captured
      if (!contactCaptured && messages.filter((m) => m.sender_type === "visitor").length >= 1) {
        setShowContactPrompt(true);
      }
    } catch (err) {
      const fallbackMsg: Message = {
        id: "fb_" + Date.now(),
        sender_type: "ai",
        sender_name: "Pacy Labs Intercom",
        text: "I have recorded your dispatch. For immediate mission-critical responses, you can also reach Dr. Adegoke directly via WhatsApp (+234 913 026 2529) or email (pacy@cruisehq.fun).",
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSaveContact = async () => {
    if (!visitorContact.trim()) return;
    setContactCaptured(true);
    setShowContactPrompt(false);
    try {
      localStorage.setItem("pacy_intercom_contact", visitorContact);
      if (isSupabaseConfigured && supabase && conversationId) {
        await supabase
          .from("intercom_conversations")
          .update({
            visitor_contact: visitorContact,
            status: "waiting_founder",
          })
          .eq("id", conversationId);

        // Also add system notice
        const notice: Message = {
          id: "sys_" + Date.now(),
          sender_type: "ai",
          sender_name: "System Dispatch",
          text: `Contact synchronized (${visitorContact}). Dr. Adegoke has been alerted and can respond live or follow up directly.`,
          created_at: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, notice]);
      }
    } catch {}
  };

  const handleWhatsAppHandoff = () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.sender_type === "visitor")?.text || "Hello Pacy Labs";
    const text = `*INTERCOM INQUIRY FROM PACYLABS.XYZ*\n\nMessage: ${lastUserMsg}\nVisitor ID: ${visitorId}\nContact: ${visitorContact || "N/A"}`;
    window.open(`https://wa.me/2349130262529?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      {/* Floating Trigger Button on Desktop */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        {!isOpen && (
          <button
            onClick={onOpen}
            className="flex items-center gap-2.5 border border-[#d9a648]/40 bg-gradient-to-r from-[#2a0614]/95 via-[#3f0e21]/95 to-[#58142c]/95 px-4 py-2.5 text-[#f6dc8c] hover:border-[#d9a648]/80 hover:shadow-[0_0_25px_rgba(217,166,72,0.35)] transition-all font-mono text-xs shadow-2xl rounded-sm backdrop-blur-xl group"
            aria-label="Open AI Intercom"
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-[#d9a648] opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d9a648]" />
            </div>
            <span className="tracking-wide">AI Intercom</span>
            <MessageSquare className="h-3.5 w-3.5 text-[#f6dc8c] group-hover:scale-110 transition-transform" />
          </button>
        )}
      </div>

      {/* Floating Drawer / Interactive Intercom Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-end justify-end p-3 sm:p-6 pointer-events-none">
          <div className="pointer-events-auto w-full max-w-md sm:max-w-lg h-[85vh] max-h-[640px] flex flex-col bg-[#140309]/95 backdrop-blur-2xl shadow-[0_24px_70px_rgba(0,0,0,0.95)] transition-all rounded-sm border border-[#d9a648]/30 overflow-hidden font-sans">
            
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#220510]/80">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#3f0e21] to-[#80183b] flex items-center justify-center border border-[#d9a648]/40">
                    <Sparkles className="w-4 h-4 text-[#f6dc8c]" />
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-[#140309] ${founderLiveActive ? "bg-emerald-400 animate-pulse" : "bg-[#d9a648]"}`} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#f6dc8c] font-semibold">
                      {founderLiveActive ? "Dr. Adegoke Live" : "Pacy Labs Intercom"}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      {founderLiveActive ? "• Connected" : "• Autonomous"}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-300 truncate max-w-[240px]">
                    {founderLiveActive
                      ? "Founder live handoff in session"
                      : "Grounded on 9 platforms & clinical systems"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleWhatsAppHandoff}
                  title="Switch to WhatsApp"
                  className="p-1.5 text-zinc-400 hover:text-[#f6dc8c] hover:bg-white/5 rounded-sm transition-colors font-mono text-[11px] flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-sm transition-colors"
                  aria-label="Close Intercom"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Live Message History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              {messages.map((m) => {
                const isUser = m.sender_type === "visitor";
                const isFounder = m.sender_type === "founder";

                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      <span className="font-mono text-[10px] text-zinc-400">
                        {isUser ? "You" : isFounder ? "Dr. Olamilekan David Adegoke" : "Pacy Labs AI"}
                      </span>
                      {isFounder && (
                        <span className="px-1 py-0.2 bg-emerald-500/20 text-emerald-300 text-[9px] font-mono border border-emerald-500/30 rounded-xs">
                          Founder
                        </span>
                      )}
                    </div>
                    <div
                      className={`max-w-[88%] rounded-sm p-3.5 leading-relaxed ${
                        isUser
                          ? "bg-[#3f0e21] text-zinc-100 border border-[#d9a648]/40 shadow-sm"
                          : isFounder
                          ? "bg-[#1f3a2b] text-emerald-100 border border-emerald-400/50 shadow-md"
                          : "bg-white/[0.04] text-zinc-200 border border-white/10 backdrop-blur-sm"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{m.text}</p>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-2 text-zinc-400 font-mono text-[11px] p-2 bg-white/[0.02] border border-white/5 w-fit rounded-sm">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#d9a648]" />
                  <span>Synthesizing system reply...</span>
                </div>
              )}

              {/* Lead Capture Prompt */}
              {showContactPrompt && !contactCaptured && (
                <div className="p-3 bg-[#240612] border border-[#d9a648]/40 rounded-sm space-y-2 mt-2">
                  <div className="flex items-center gap-1.5 text-[#f6dc8c] font-mono text-[11px]">
                    <Sparkles className="w-3 h-3" />
                    <span>Want Dr. Adegoke to follow up directly?</span>
                  </div>
                  <p className="text-[11px] text-zinc-300">
                    Leave your email or WhatsApp number. Dr. Adegoke will receive this inquiry immediately.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={visitorContact}
                      onChange={(e) => setVisitorContact(e.target.value)}
                      placeholder="email@example.com or +1..."
                      className="flex-1 bg-black/40 border border-white/15 px-2.5 py-1 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d9a648]"
                    />
                    <button
                      onClick={handleSaveContact}
                      className="px-3 py-1 bg-[#d9a648] text-black font-semibold text-xs hover:bg-[#f6dc8c] transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Inquiry Suggestions */}
            <div className="px-4 py-2 border-t border-white/5 bg-black/20 flex gap-1.5 overflow-x-auto text-[10px] font-mono scrollbar-none">
              <button
                onClick={() => {
                  setInputText("What are your current commission rates and availability?");
                }}
                className="whitespace-nowrap px-2 py-1 bg-white/[0.03] hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 rounded-xs transition-colors"
              >
                Rates & Availability
              </button>
              <button
                onClick={() => {
                  setInputText("Tell me about Wetaego micro-lending on Solana.");
                }}
                className="whitespace-nowrap px-2 py-1 bg-white/[0.03] hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 rounded-xs transition-colors"
              >
                Wetaego Architecture
              </button>
              <button
                onClick={() => {
                  setInputText("How does Dr. Adegoke's medical background influence his system design?");
                }}
                className="whitespace-nowrap px-2 py-1 bg-white/[0.03] hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 rounded-xs transition-colors"
              >
                Clinical Triage Rigor
              </button>
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-[#1a040d]/90 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about systems, triage, or commissions..."
                className="flex-1 bg-black/50 border border-white/15 rounded-sm px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d9a648]/80 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="px-3.5 py-2 bg-gradient-to-r from-[#80183b] to-[#a3224d] hover:from-[#a3224d] hover:to-[#c42c5f] disabled:opacity-40 disabled:hover:from-[#80183b] text-white font-mono text-xs rounded-sm transition-all flex items-center justify-center border border-[#d9a648]/40 shadow-sm"
                aria-label="Send message"
              >
                <Send className="h-3.5 w-3.5 text-[#f6dc8c]" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
