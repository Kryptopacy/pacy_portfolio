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
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"projects" | "resume" | "profile" | "skills">("projects");
  
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
      <div className="min-h-screen bg-[#090a0d] flex items-center justify-center font-mono text-xs text-zinc-500">
        Verifying cryptographic session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090a0d] flex items-center justify-center p-4">
        <div className="w-full max-w-md border border-[#d9a648]/30 bg-[#0e1015] p-8 shadow-[0_0_30px_rgba(217,166,72,0.1)]">
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
              <p className="font-mono text-[10px] text-zinc-500 uppercase">
                Content Management &amp; Dispatch Console
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-mono text-xs text-zinc-400 mb-1.5">
                Admin Passkey
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full border border-white/10 bg-black/60 px-3.5 py-2.5 font-mono text-xs text-white placeholder-zinc-600 focus:border-[#d9a648] focus:outline-none"
                  autoFocus
                />
                <Lock className="absolute right-3 top-3 h-4 w-4 text-zinc-600" />
              </div>
            </div>

            {loginError && (
              <div className="font-mono text-xs text-rose-400 bg-rose-950/20 border border-rose-900/40 p-2.5 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#d9a648] to-[#f6dc8c] hover:brightness-105 py-2.5 font-mono text-xs font-semibold text-black transition-all shadow-[0_0_15px_rgba(217,166,72,0.2)] disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Unlock Dashboard"}
            </button>
          </form>

          <p className="mt-6 text-center font-mono text-[10px] text-zinc-600">
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
    <div className="min-h-screen bg-[#090a0d] text-white">
      {/* Top Admin Bar */}
      <header className="border-b border-white/10 bg-[#0e1015] px-4 sm:px-8 py-3.5 sticky top-0 z-50">
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
                          ? "border-[#d9a648] bg-[#0e1015] shadow-[0_0_15px_rgba(217,166,72,0.15)]"
                          : "border-white/08 bg-black/40 hover:border-white/20 hover:bg-black/60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-medium text-sm text-white truncate">
                          {p.name}
                        </div>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.2 border uppercase shrink-0 ${
                            p.isClientContract
                              ? "border-amber-500/30 text-amber-300 bg-amber-950/20"
                              : "border-sky-500/30 text-sky-300 bg-sky-950/20"
                          }`}
                        >
                          {p.isClientContract ? "Client" : "Proprietary"}
                        </span>
                      </div>
                      <div className="font-mono text-[11px] text-zinc-500 truncate mt-0.5">
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
            <div className="lg:col-span-8 border border-white/10 bg-[#0e1015] p-6 sm:p-8">
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
          <div className="max-w-3xl mx-auto border border-white/10 bg-[#0e1015] p-8 space-y-6">
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

            <div className="border-2 border-dashed border-white/20 bg-black/40 p-8 text-center space-y-4 hover:border-[#d9a648]/60 transition-colors">
              <FileText className="h-10 w-10 text-[#d9a648] mx-auto opacity-80" />
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

            <div className="border border-white/10 bg-black/40 p-4 flex items-center justify-between font-mono text-xs">
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
          <div className="max-w-3xl mx-auto border border-white/10 bg-[#0e1015] p-8 space-y-6">
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
      </div>
    </div>
  );
}
