"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  LogOut,
  Plus,
  Trash2,
  Save,
  Upload,
  CheckCircle,
  AlertCircle,
  FileText,
  Layers,
  Cpu,
  User,
  ArrowUpRight,
  RefreshCw,
  Eye,
  EyeOff,
  MessageSquare,
  Send,
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"projects" | "resume" | "profile" | "skills" | "intercom">("projects");
  
  // Data state
  const [projects, setProjects] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [skillsMatrix, setSkillsMatrix] = useState<any>(null);
  const [isGitHubConfigured, setIsGitHubConfigured] = useState(false);
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [uploadingResume, setUploadingResume] = useState(false);

  // Intercom state
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [founderReply, setFounderReply] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/auth");
      const data = await res.json();
      setIsAuthenticated(data.isAuthenticated);
      if (data.isAuthenticated) {
        loadContent();
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const err = await res.json();
        setLoginError(err.error || "Incorrect password");
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);
      loadContent();
    } catch {
      setLoginError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsAuthenticated(false);
    setPassword("");
  };

  const loadContent = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/content");
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
        setProfile(data.profile || null);
        setSkillsMatrix(data.skillsMatrix || null);
        setIsGitHubConfigured(data.isGitHubConfigured);
        if (data.projects?.length > 0 && !selectedProjectId) {
          setSelectedProjectId(data.projects[0].id);
        }
      }
    } catch (e) {
      notify("error", "Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  const notify = (type: "success" | "error", text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 5000);
  };

  // Load Intercom conversations
  const loadConversations = async () => {
    if (!isSupabaseConfigured || !supabase) return;
    try {
      const { data, error } = await supabase
        .from("intercom_conversations")
        .select("*")
        .order("updated_at", { ascending: false });

      if (data) {
        setConversations(data);
        if (data.length > 0 && !selectedConvId) {
          setSelectedConvId(data[0].id);
        }
      }
    } catch (err) {
      console.warn("Error loading intercom conversations:", err);
    }
  };

  // Load chat messages when selected conversation changes
  useEffect(() => {
    if (activeTab === "intercom") {
      loadConversations();
    }
  }, [activeTab]);

  useEffect(() => {
    if (!selectedConvId || !isSupabaseConfigured || !supabase) return;
    const client = supabase;

    const fetchMessages = async () => {
      const { data } = await client
        .from("intercom_messages")
        .select("*")
        .eq("conversation_id", selectedConvId)
        .order("created_at", { ascending: true });

      if (data) setChatMessages(data);
    };

    fetchMessages();

    // Subscribe to new messages for selected conversation
    const channel = client
      .channel(`admin:intercom:${selectedConvId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "intercom_messages",
          filter: `conversation_id=eq.${selectedConvId}`,
        },
        (payload) => {
          const newMsg = payload.new;
          if (newMsg) {
            setChatMessages((prev) => {
              if (prev.some((m) => m.id === newMsg.id)) return prev;
              return [...prev, newMsg];
            });
          }
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  }, [selectedConvId]);

  const sendFounderReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!founderReply.trim() || !selectedConvId || !isSupabaseConfigured || !supabase) return;

    setSendingReply(true);
    const replyText = founderReply.trim();
    try {
      await supabase.from("intercom_messages").insert({
        conversation_id: selectedConvId,
        sender_type: "founder",
        sender_name: "Dr. Olamilekan David Adegoke",
        text: replyText,
      });

      await supabase
        .from("intercom_conversations")
        .update({
          status: "founder_active",
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedConvId);

      setFounderReply("");
      notify("success", "Live reply dispatched to visitor");
    } catch (err: any) {
      notify("error", "Failed to send live reply: " + err.message);
    } finally {
      setSendingReply(false);
    }
  };

  const saveContent = async (type: "projects" | "profile" | "skills-matrix", data: any) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, data }),
      });

      const resData = await res.json();
      if (!res.ok) {
        notify("error", resData.error || "Failed to save");
      } else {
        notify(
          "success",
          resData.committedToGitHub
            ? "Saved and committed to GitHub! Vercel will rebuild automatically (~1m)."
            : "Saved locally! (To auto-deploy on live site, configure GITHUB_TOKEN)"
        );
      }
    } catch {
      notify("error", "Network error while saving");
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      notify("error", "File must be a PDF");
      return;
    }

    setUploadingResume(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("target", "resume");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        notify("error", data.error || "Upload failed");
      } else {
        notify(
          "success",
          "Resume PDF updated! Download links across the portfolio will now serve this file."
        );
      }
    } catch {
      notify("error", "Upload error");
    } finally {
      setUploadingResume(false);
    }
  };

  // Project management helpers
  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  const updateSelectedProject = (field: string, value: any) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === selectedProjectId ? { ...p, [field]: value } : p))
    );
  };

  const addNewProject = () => {
    const newId = `project-${Date.now().toString().slice(-4)}`;
    const newProject = {
      id: newId,
      name: "New System Project",
      descriptor: "High-Concurrency Autonomous Architecture",
      url: "https://",
      urlLabel: "newproject.xyz",
      isClientContract: false,
      image: "/projects/wetaego_hero.png",
      accentColor: "blue",
      hidden: false,
      summary: "Describe the system architectural challenge, operational stakes, and execution...",
      metrics: [
        { label: "Throughput / Scale", value: "10,000 req/s" },
        { label: "Concurrency Model", value: "Atomic RPC" },
      ],
      tags: ["Next.js 16", "PostgreSQL", "Supabase", "TypeScript"],
      techStackByCategory: {
        frontend: ["Next.js 16", "Tailwind CSS"],
        databaseAndConcurrency: ["PostgreSQL 16", "Atomic RPCs"],
        aiAndRealtime: ["Gemini AI"],
        paymentsAndProtocols: ["W3C WebMCP"],
      },
      modules: [
        {
          name: "Core Engine",
          description: "Deterministic state management and concurrency controls.",
        },
      ],
      bullets: [
        "Architected core transaction lifecycle with atomic locking primitives.",
        "Integrated real-time streaming telemetry across connected agents.",
      ],
      architecture: {
        category: "Proprietary Autonomous Architecture",
        concurrencyGuarantee: "Row-level locks (SELECT FOR UPDATE) with atomic RPC fallback",
        protocolOrAi: "W3C WebMCP dynamic tool registration",
        dbOrInfra: "PostgreSQL with dedicated RLS policies",
      },
    };

    setProjects([newProject, ...projects]);
    setSelectedProjectId(newId);
  };

  const deleteProject = (id: string) => {
    if (!confirm(`Are you sure you want to delete project "${id}"?`)) return;
    const remaining = projects.filter((p) => p.id !== id);
    setProjects(remaining);
    if (selectedProjectId === id) {
      setSelectedProjectId(remaining[0]?.id || null);
    }
  };

  // -------------------------------------------------------------------------
  // LOGIN SCREEN
  // -------------------------------------------------------------------------
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center font-mono text-xs text-[#f6dc8c]">
        Verifying cryptographic session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
        <div className="w-full max-w-md glass-panel p-8 shadow-[0_20px_50px_rgba(18,2,7,0.7)] border border-[#d9a648]/30">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="h-9 w-9 relative shrink-0 p-0.5 rounded border border-[#d9a648]/40 bg-[#3a0d1c]/40">
              <Image
                src="/brand/pacylabs-logo-256.webp"
                alt="Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="font-mono text-sm font-semibold tracking-wider text-white">
                PACY LABS CMS
              </h1>
              <p className="font-mono text-[10px] text-zinc-400 uppercase">
                Content Management &amp; Dispatch Console
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-mono text-xs text-zinc-300 mb-1.5">
                Admin Passkey
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full glass-input px-3.5 py-2.5 font-mono text-xs text-white placeholder-zinc-500 focus:border-[#d9a648] focus:outline-none"
                  autoFocus
                />
                <Lock className="absolute right-3 top-3 h-4 w-4 text-[#d9a648]" />
              </div>
            </div>

            {loginError && (
              <div className="font-mono text-xs text-rose-300 bg-rose-950/40 border border-rose-900/60 p-2.5 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#d9a648] to-[#f6dc8c] hover:brightness-110 py-2.5 font-mono text-xs font-semibold text-black transition-all shadow-[0_0_24px_rgba(217,166,72,0.25)] disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Unlock Dashboard"}
            </button>
          </form>

          <p className="mt-6 text-center font-mono text-[10px] text-zinc-400">
            Default passkey: <code className="text-[#f6dc8c]">pacy2026</code> (Set ADMIN_PASSWORD in environment to customize)
          </p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // DASHBOARD SCREEN
  // -------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-transparent text-white">
      {/* Top Admin Bar */}
      <header className="glass-bar border-b border-[#d9a648]/20 px-4 sm:px-8 py-3.5 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 relative shrink-0 p-0.5 rounded border border-[#d9a648]/40 bg-[#3a0d1c]/40">
              <Image
                src="/brand/pacylabs-logo-256.webp"
                alt="Logo"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-white">
                PACY LABS CMS
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-mono text-[#f6dc8c] border border-[#d9a648]/30 px-1.5 py-0.2 bg-[#3a0d1c]/30">
                ACTIVE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isGitHubConfigured ? (
              <span className="hidden md:inline-flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 border border-emerald-900/40 bg-emerald-950/20 px-2 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                GitHub Auto-Deploy Active
              </span>
            ) : (
              <span className="hidden md:inline-flex items-center gap-1.5 font-mono text-[10px] text-amber-400 border border-amber-900/40 bg-amber-950/20 px-2 py-1" title="Set GITHUB_TOKEN on Vercel to auto-commit and redeploy on save">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Local Mode (Add GITHUB_TOKEN on Vercel)
              </span>
            )}

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 font-mono text-xs text-zinc-400 hover:text-white border border-white/10 px-2.5 py-1.5 transition-colors"
            >
              <span>View Site</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-rose-400 border border-white/10 px-2.5 py-1.5 transition-colors"
            >
              <LogOut className="h-3 w-3" />
              <span className="hidden sm:inline">Lock</span>
            </button>
          </div>
        </div>
      </header>

      {/* Status Banner */}
      {statusMessage && (
        <div
          className={`px-4 sm:px-8 py-2.5 font-mono text-xs flex items-center justify-between border-b ${
            statusMessage.type === "success"
              ? "bg-emerald-950/40 border-emerald-900/50 text-emerald-300"
              : "bg-rose-950/40 border-rose-900/50 text-rose-300"
          }`}
        >
          <div className="mx-auto max-w-7xl w-full flex items-center gap-2">
            {statusMessage.type === "success" ? (
              <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Workspace */}
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 mb-8 pb-3 font-mono text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-3 py-1.5 border transition-all ${
              activeTab === "projects"
                ? "border-[#d9a648] bg-[#3a0d1c]/40 text-[#f6dc8c] font-semibold"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Projects &amp; Architectures ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("resume")}
            className={`flex items-center gap-2 px-3 py-1.5 border transition-all ${
              activeTab === "resume"
                ? "border-[#d9a648] bg-[#3a0d1c]/40 text-[#f6dc8c] font-semibold"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Resume PDF &amp; Documents</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-3 py-1.5 border transition-all ${
              activeTab === "profile"
                ? "border-[#d9a648] bg-[#3a0d1c]/40 text-[#f6dc8c] font-semibold"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            <User className="h-3.5 w-3.5" />
            <span>Profile &amp; Contact</span>
          </button>

          <button
            onClick={() => setActiveTab("intercom")}
            className={`flex items-center gap-2 px-3 py-1.5 border transition-all ${
              activeTab === "intercom"
                ? "border-[#d9a648] bg-[#3a0d1c]/40 text-[#f6dc8c] font-semibold"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5 text-[#f6dc8c]" />
            <span>Intercom Live Inbox ({conversations.length})</span>
          </button>
        </div>

        {/* =====================================================================
            TAB 1: PROJECTS MANAGEMENT
            ===================================================================== */}
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Project List (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                  Catalog ({projects.length})
                </span>
                <button
                  onClick={addNewProject}
                  className="inline-flex items-center gap-1 border border-[#d9a648]/40 bg-[#3a0d1c]/40 hover:bg-[#3a0d1c]/70 text-[#f6dc8c] px-2.5 py-1 font-mono text-xs transition-colors"
                >
                  <Plus className="h-3 w-3" />
                  <span>New System</span>
                </button>
              </div>

              <div className="space-y-1.5 max-h-[700px] overflow-y-auto pr-1">
                {projects.map((p) => {
                  const isSelected = p.id === selectedProjectId;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProjectId(p.id)}
                      className={`cursor-pointer border p-3 transition-all ${
                        isSelected
                          ? "border-[#d9a648] bg-[#3a0d1c]/40 shadow-[0_0_15px_rgba(217,166,72,0.2)]"
                          : "border-white/10 bg-black/40 hover:border-[#d9a648]/40 hover:bg-[#1a040b]/40"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-medium text-sm text-white truncate">
                          {p.name}
                        </div>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.2 border uppercase shrink-0 ${
                            p.isClientContract
                              ? "border-amber-500/40 text-[#f6dc8c] bg-amber-950/30"
                              : "border-[#d9a648]/40 text-[#f6dc8c] bg-[#3a0d1c]/30"
                          }`}
                        >
                          {p.isClientContract ? "Client" : "Proprietary"}
                        </span>
                      </div>
                      <div className="font-mono text-[11px] text-zinc-400 truncate mt-0.5">
                        {p.urlLabel || p.id}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => saveContent("projects", projects)}
                disabled={saving}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#d9a648] to-[#f6dc8c] hover:brightness-105 py-2.5 font-mono text-xs font-semibold text-black transition-all shadow-[0_0_20px_rgba(217,166,72,0.2)] disabled:opacity-50"
              >
                <Save className="h-3.5 w-3.5 text-black" />
                <span>{saving ? "Deploying Changes..." : "Save All Projects"}</span>
              </button>
            </div>

            {/* Right: Project Editor Form (8 cols) */}
            <div className="lg:col-span-8 glass-panel p-6 sm:p-8">
              {selectedProject ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <h2 className="text-xl font-normal text-white">
                        Edit System: <span className="font-medium">{selectedProject.name}</span>
                      </h2>
                      <span className="font-mono text-xs text-zinc-500">
                        ID: {selectedProject.id}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => deleteProject(selectedProject.id)}
                        className="inline-flex items-center gap-1 font-mono text-xs text-rose-400 hover:text-rose-300 border border-rose-900/40 px-2.5 py-1.5 transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>

                  {/* Basic Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-1">
                        System Name
                      </label>
                      <input
                        type="text"
                        value={selectedProject.name || ""}
                        onChange={(e) => updateSelectedProject("name", e.target.value)}
                        className="w-full border border-white/10 bg-black/60 px-3 py-2 font-mono text-xs text-white focus:border-[#d9a648] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-1">
                        Platform Type
                      </label>
                      <select
                        value={selectedProject.isClientContract ? "client" : "proprietary"}
                        onChange={(e) =>
                          updateSelectedProject("isClientContract", e.target.value === "client")
                        }
                        className="w-full border border-white/10 bg-black/60 px-3 py-2 font-mono text-xs text-white focus:border-[#d9a648] focus:outline-none"
                      >
                        <option value="proprietary">Proprietary Platform (Part 01)</option>
                        <option value="client">Commercial Client Contract (Part 02)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-1">
                        Live URL
                      </label>
                      <input
                        type="text"
                        value={selectedProject.url || ""}
                        onChange={(e) => updateSelectedProject("url", e.target.value)}
                        placeholder="https://..."
                        className="w-full border border-white/10 bg-black/60 px-3 py-2 font-mono text-xs text-white focus:border-[#d9a648] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-1">
                        URL Label
                      </label>
                      <input
                        type="text"
                        value={selectedProject.urlLabel || ""}
                        onChange={(e) => updateSelectedProject("urlLabel", e.target.value)}
                        placeholder="e.g. wetaego.com"
                        className="w-full border border-white/10 bg-black/60 px-3 py-2 font-mono text-xs text-white focus:border-[#d9a648] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-1">
                        Accent Color Theme
                      </label>
                      <select
                        value={selectedProject.accentColor || "blue"}
                        onChange={(e) => updateSelectedProject("accentColor", e.target.value)}
                        className="w-full border border-white/10 bg-black/60 px-3 py-2 font-mono text-xs text-white focus:border-[#d9a648] focus:outline-none"
                      >
                        <option value="blue">Blue (Sky Blue - Commerce)</option>
                        <option value="indigo">Indigo (Social / City-Scale)</option>
                        <option value="rose">Rose (Escrow / Cryptographic)</option>
                        <option value="purple">Purple (AI / Multimodal)</option>
                        <option value="cyan">Cyan (Trading / Precision)</option>
                        <option value="emerald">Emerald (Venue / Retail)</option>
                        <option value="amber">Amber (Hospitality / Verification)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-1">
                        Hero Screenshot Image Path
                      </label>
                      <input
                        type="text"
                        value={selectedProject.image || ""}
                        onChange={(e) => updateSelectedProject("image", e.target.value)}
                        placeholder="/projects/your_screenshot.png"
                        className="w-full border border-white/10 bg-black/60 px-3 py-2 font-mono text-xs text-white focus:border-[#d9a648] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-zinc-400 mb-1">
                      Descriptor Line
                    </label>
                    <input
                      type="text"
                      value={selectedProject.descriptor || ""}
                      onChange={(e) => updateSelectedProject("descriptor", e.target.value)}
                      className="w-full border border-white/10 bg-black/60 px-3 py-2 font-mono text-xs text-white focus:border-[#d9a648] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-zinc-400 mb-1">
                      Summary Narrative
                    </label>
                    <textarea
                      rows={3}
                      value={selectedProject.summary || ""}
                      onChange={(e) => updateSelectedProject("summary", e.target.value)}
                      className="w-full border border-white/10 bg-black/60 px-3 py-2 font-mono text-xs text-white focus:border-[#d9a648] focus:outline-none resize-none"
                    />
                  </div>

                  {/* Metrics Editor */}
                  <div>
                    <label className="block font-mono text-xs text-zinc-400 mb-2">
                      Key Architectural Metrics (Displayed in Card)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(selectedProject.metrics || []).map((m: any, mIdx: number) => (
                        <div key={mIdx} className="border border-white/10 bg-black/40 p-2.5 space-y-1">
                          <input
                            type="text"
                            value={m.value}
                            onChange={(e) => {
                              const updated = [...selectedProject.metrics];
                              updated[mIdx] = { ...updated[mIdx], value: e.target.value };
                              updateSelectedProject("metrics", updated);
                            }}
                            placeholder="Value (e.g. 20+ RPCs)"
                            className="w-full bg-transparent border-b border-white/10 px-1 py-0.5 font-mono text-xs text-white focus:border-[#d9a648] focus:outline-none"
                          />
                          <input
                            type="text"
                            value={m.label}
                            onChange={(e) => {
                              const updated = [...selectedProject.metrics];
                              updated[mIdx] = { ...updated[mIdx], label: e.target.value };
                              updateSelectedProject("metrics", updated);
                            }}
                            placeholder="Label (e.g. Concurrency Engine)"
                            className="w-full bg-transparent px-1 py-0.5 font-mono text-[10px] text-zinc-400 focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div>
                    <label className="block font-mono text-xs text-zinc-400 mb-1">
                      Tech Stack Tags (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={(selectedProject.tags || []).join(", ")}
                      onChange={(e) =>
                        updateSelectedProject(
                          "tags",
                          e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                        )
                      }
                      className="w-full border border-white/10 bg-black/60 px-3 py-2 font-mono text-xs text-white focus:border-[#d9a648] focus:outline-none"
                    />
                  </div>

                  <div className="pt-4 border-t border-white/10 flex justify-end">
                    <button
                      onClick={() => saveContent("projects", projects)}
                      disabled={saving}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d9a648] to-[#f6dc8c] hover:brightness-105 px-6 py-2.5 font-mono text-xs font-semibold text-black transition-all shadow-[0_0_20px_rgba(217,166,72,0.2)] disabled:opacity-50"
                    >
                      <Save className="h-3.5 w-3.5 text-black" />
                      <span>{saving ? "Saving & Deploying..." : "Save Projects"}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 font-mono text-xs text-zinc-500">
                  Select a project from the left or create a new one.
                </div>
              )}
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 2: RESUME UPLOAD & MANAGEMENT
            ===================================================================== */}
        {activeTab === "resume" && (
          <div className="max-w-3xl mx-auto glass-panel p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-normal text-white mb-2">
                Resume PDF File Management
              </h2>
              <p className="text-zinc-400 text-xs font-mono leading-relaxed">
                Upload your updated master resume PDF here. The file will replace{" "}
                <code className="text-[#f6dc8c]">/olamilekan_adegoke_resume.pdf</code> and update all
                download links across the header, footer, hero, and dossier without changing code.
              </p>
            </div>

            <div className="border-2 border-dashed border-[#d9a648]/30 bg-[#120207]/60 p-8 text-center space-y-4 hover:border-[#d9a648]/80 transition-colors">
              <FileText className="h-10 w-10 text-[#d9a648] mx-auto opacity-90" />
              <div>
                <div className="font-mono text-sm text-white font-medium mb-1">
                  Upload New Master Resume PDF
                </div>
                <div className="font-mono text-xs text-zinc-500">
                  Select a valid .pdf file from your computer
                </div>
              </div>

              <div>
                <label className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d9a648] to-[#f6dc8c] hover:brightness-105 px-5 py-2.5 font-mono text-xs font-semibold text-black cursor-pointer transition-all shadow-[0_0_20px_rgba(217,166,72,0.2)]">
                  <Upload className="h-4 w-4 text-black" />
                  <span>{uploadingResume ? "Uploading & Committing..." : "Choose PDF Document"}</span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleResumeUpload}
                    disabled={uploadingResume}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="border border-white/10 bg-[#120207]/60 p-4 flex items-center justify-between font-mono text-xs">
              <div>
                <div className="text-zinc-300 font-medium">Current Active Resume:</div>
                <div className="text-zinc-500 text-[11px]">/public/olamilekan_adegoke_resume.pdf</div>
              </div>
              <a
                href="/olamilekan_adegoke_resume.pdf"
                target="_blank"
                className="inline-flex items-center gap-1 text-[#f6dc8c] hover:underline"
              >
                <span>Preview Current</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 3: PROFILE & CONTACT MANAGEMENT
            ===================================================================== */}
        {activeTab === "profile" && profile && (
          <div className="max-w-3xl mx-auto glass-panel p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-normal text-white mb-2">
                Executive Profile &amp; Contact Details
              </h2>
              <p className="text-zinc-400 text-xs font-mono leading-relaxed">
                Update your active contact numbers, WhatsApp dispatch routing, and availability status.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs text-zinc-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name || ""}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full border border-white/10 bg-black/60 px-3 py-2 font-mono text-xs text-white focus:border-[#d9a648] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-zinc-400 mb-1">
                  Primary Role Descriptor
                </label>
                <input
                  type="text"
                  value={profile.role || ""}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  className="w-full border border-white/10 bg-black/60 px-3 py-2 font-mono text-xs text-white focus:border-[#d9a648] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-zinc-400 mb-1">
                  Phone (Formatted)
                </label>
                <input
                  type="text"
                  value={profile.phone || ""}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full border border-white/10 bg-black/60 px-3 py-2 font-mono text-xs text-white focus:border-[#d9a648] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-zinc-400 mb-1">
                  WhatsApp Number (Digits only, with country code)
                </label>
                <input
                  type="text"
                  value={profile.whatsapp || "2349130262529"}
                  onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
                  placeholder="2349130262529"
                  className="w-full border border-white/10 bg-black/60 px-3 py-2 font-mono text-xs text-white focus:border-[#d9a648] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-zinc-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email || ""}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full border border-white/10 bg-black/60 px-3 py-2 font-mono text-xs text-white focus:border-[#d9a648] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-zinc-400 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={profile.location || ""}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="w-full border border-white/10 bg-black/60 px-3 py-2 font-mono text-xs text-white focus:border-[#d9a648] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs text-zinc-400 mb-1">
                Availability Status Note
              </label>
              <input
                type="text"
                value={profile.availabilityNote || ""}
                onChange={(e) => setProfile({ ...profile, availabilityNote: e.target.value })}
                className="w-full border border-white/10 bg-black/60 px-3 py-2 font-mono text-xs text-white focus:border-[#d9a648] focus:outline-none"
              />
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => saveContent("profile", profile)}
                disabled={saving}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d9a648] to-[#f6dc8c] hover:brightness-105 px-6 py-2.5 font-mono text-xs font-semibold text-black transition-all shadow-[0_0_20px_rgba(217,166,72,0.2)] disabled:opacity-50"
              >
                <Save className="h-3.5 w-3.5 text-black" />
                <span>{saving ? "Saving..." : "Save Profile Details"}</span>
              </button>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 4: INTERCOM LIVE INBOX (FOUNDER TAKEOVER)
            ===================================================================== */}
        {activeTab === "intercom" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start h-[700px]">
            {/* Conversation Sessions List (4 cols) */}
            <div className="lg:col-span-4 glass-panel h-full flex flex-col border border-white/10 rounded-sm overflow-hidden">
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div>
                  <h3 className="font-mono text-xs font-semibold text-white uppercase tracking-wider">
                    Active Visitor Sessions
                  </h3>
                  <p className="text-[10px] text-zinc-400 font-mono">
                    {conversations.length} total • Realtime Sync
                  </p>
                </div>
                <button
                  onClick={loadConversations}
                  className="p-1.5 text-zinc-400 hover:text-white border border-white/10 hover:border-white/30 rounded-xs transition-colors"
                  title="Refresh Conversations"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {!isSupabaseConfigured && (
                <div className="p-3 bg-amber-950/30 border-b border-amber-800/40 text-[11px] font-mono text-amber-300">
                  ⚠️ Supabase not configured in environment yet. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable live multi-client takeover.
                </div>
              )}

              <div className="flex-1 overflow-y-auto divide-y divide-white/5">
                {conversations.length === 0 ? (
                  <div className="p-8 text-center text-zinc-400 font-mono text-xs space-y-2">
                    <MessageSquare className="w-6 h-6 mx-auto opacity-40 text-[#f6dc8c]" />
                    <p>No active visitor sessions recorded yet.</p>
                    <p className="text-[10px] text-zinc-400">
                      When visitors open and chat in the AI Intercom, their sessions will appear here live.
                    </p>
                  </div>
                ) : (
                  conversations.map((c) => {
                    const isSelected = selectedConvId === c.id;
                    const isWaiting = c.status === "waiting_founder";
                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedConvId(c.id)}
                        className={`w-full text-left p-3.5 transition-all flex flex-col gap-1.5 ${
                          isSelected
                            ? "bg-[#3a0d1c]/60 border-l-2 border-[#d9a648]"
                            : "hover:bg-white/[0.02]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-medium text-white truncate">
                            {c.visitor_contact || c.visitor_name || `Visitor ${c.visitor_id.slice(-4)}`}
                          </span>
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.5 rounded-xs border ${
                              isWaiting
                                ? "bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse"
                                : c.status === "founder_active"
                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                : "bg-zinc-800 text-zinc-400 border-zinc-700"
                            }`}
                          >
                            {isWaiting ? "NEEDS YOU" : c.status}
                          </span>
                        </div>
                        <div className="text-[11px] text-zinc-400 truncate font-mono">
                          {c.visitor_contact ? `Contact: ${c.visitor_contact}` : `Session ID: ${c.visitor_id}`}
                        </div>
                        <div className="text-[10px] text-zinc-400 font-mono">
                          {new Date(c.updated_at || c.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Live Chat Panel (8 cols) */}
            <div className="lg:col-span-8 glass-panel h-full flex flex-col border border-white/10 rounded-sm overflow-hidden">
              {selectedConvId ? (
                <>
                  <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-[#f6dc8c]">
                          Live Session: {selectedConvId.slice(0, 8)}...
                        </span>
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <p className="text-[11px] text-zinc-400 font-mono">
                        Founder Takeover Mode • Visitor receives your reply instantly via Supabase Realtime
                      </p>
                    </div>
                  </div>

                  {/* Messages Stream */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs bg-black/20">
                    {chatMessages.map((m) => {
                      const isVisitor = m.sender_type === "visitor";
                      const isFounder = m.sender_type === "founder";
                      return (
                        <div
                          key={m.id}
                          className={`flex flex-col ${isFounder ? "items-end" : "items-start"}`}
                        >
                          <div className="flex items-center gap-1.5 mb-1 px-1">
                            <span className="font-mono text-[10px] text-zinc-400">
                              {isFounder ? "You (Founder)" : isVisitor ? m.sender_name || "Visitor" : "Pacy Labs AI"}
                            </span>
                            <span className="text-[9px] text-zinc-400 font-mono">
                              {new Date(m.created_at).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <div
                            className={`max-w-[80%] rounded-sm p-3 leading-relaxed ${
                              isFounder
                                ? "bg-[#1f3a2b] text-emerald-100 border border-emerald-400/50"
                                : isVisitor
                                ? "bg-[#3a0d1c] text-white border border-[#d9a648]/30"
                                : "bg-white/[0.04] text-zinc-300 border border-white/10"
                            }`}
                          >
                            <p className="whitespace-pre-wrap">{m.text}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Reply Input Bar */}
                  <form
                    onSubmit={sendFounderReply}
                    className="p-3 border-t border-white/10 bg-[#16030a] flex gap-2"
                  >
                    <input
                      type="text"
                      value={founderReply}
                      onChange={(e) => setFounderReply(e.target.value)}
                      placeholder="Type your live message as Dr. Olamilekan David Adegoke..."
                      className="flex-1 bg-black/60 border border-white/15 rounded-sm px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d9a648]"
                    />
                    <button
                      type="submit"
                      disabled={!founderReply.trim() || sendingReply}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 disabled:opacity-40 text-white font-mono text-xs rounded-sm transition-all flex items-center gap-1.5 border border-emerald-400/30"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{sendingReply ? "Sending..." : "Reply Live"}</span>
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-zinc-400 font-mono text-xs">
                  <MessageSquare className="w-8 h-8 mb-2 opacity-30 text-[#f6dc8c]" />
                  <p>Select a visitor conversation on the left to start live chatting.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
