import Link from "next/link";
import Image from "next/image";
import { Mail, MessageSquare, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#140308]/90 backdrop-blur-2xl pt-14 pb-20 md:pb-14 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Subtitle (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 shrink-0 flex items-center justify-center p-0.5 rounded border border-[#d9a648]/50 bg-gradient-to-br from-[#3a0d1c]/90 via-[#260510] to-[#140308] shadow-[0_0_15px_rgba(217,166,72,0.25)]">
                <Image
                  src="/brand/pacylabs-logo-256.webp"
                  alt="Pacy Labs Logo"
                  width={34}
                  height={34}
                  className="object-contain drop-shadow-[0_0_10px_rgba(217,166,72,0.4)]"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-sm font-semibold text-white tracking-widest flex items-center gap-2">
                  PACY LABS
                  <span className="text-[10px] text-[#f6dc8c] font-mono border border-[#d9a648]/40 px-1 py-0.2 bg-[#3a0d1c]/50 shadow-[0_0_8px_rgba(217,166,72,0.15)]">EST. 2026</span>
                </span>
                <span className="font-mono text-[11px] text-zinc-500">
                  pacylabs.xyz
                </span>
              </div>
            </div>
            <p className="text-xs text-[#d4c5ca] font-mono leading-relaxed max-w-sm">
              Olamilekan David Adegoke &bull; Doctor of Optometry (OD) &amp; Full-Stack Systems Architect. Engineering deterministic operating systems, high-concurrency commercial platforms, and W3C WebMCP agent tooling.
            </p>
          </div>

          {/* Site Navigation (3 cols) */}
          <div className="md:col-span-3 space-y-2.5 font-mono text-xs">
            <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-3">
              Navigation
            </div>
            <div>
              <Link href="/projects" className="hover:text-white transition-colors">
                Systems &amp; Case Studies
              </Link>
            </div>
            <div>
              <Link href="/skills" className="hover:text-white transition-colors">
                Agent Protocols &amp; Skills
              </Link>
            </div>
            <div>
              <Link href="/dossier" className="hover:text-white transition-colors">
                Clinical Logic &amp; Dossier
              </Link>
            </div>
            <div>
              <Link href="/build-with-us" className="text-zinc-200 hover:text-white transition-colors">
                Commission An Enterprise Build
              </Link>
            </div>
          </div>

          {/* External Links & Direct Dispatch (4 cols) */}
          <div className="md:col-span-4 space-y-2.5 font-mono text-xs">
            <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-3">
              Direct Contact &amp; Dispatch
            </div>
            <div>
              <a
                href="https://wa.me/2349130262529"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-200 hover:text-white transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5 text-zinc-400" />
                <span>WhatsApp: +234 913 026 2529</span>
              </a>
            </div>
            <div>
              <a
                href="mailto:pacy@cruisehq.fun"
                className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-zinc-400" />
                <span>Email: pacy@cruisehq.fun</span>
              </a>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://github.com/kryptopacy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
              <a
                href="https://dev.to/kryptopacy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
              >
                <span>Dev.to</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
              <a
                href="/olamilekan_adegoke_resume.pdf"
                download="Olamilekan_David_Adegoke_Resume.pdf"
                className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
              >
                <span>Resume (PDF)</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Attribution Bar (Per Pacy Labs Branding Rule) */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p className="text-zinc-500">
            &copy; {new Date().getFullYear()} Pacy Labs. All rights reserved.
          </p>

          <p className="flex items-center gap-1 text-zinc-400">
            Need a custom platform?{" "}
            <Link
              href="/build-with-us"
              className="text-white hover:underline font-medium transition-colors"
            >
              Build With Us (Pacy Labs)
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
