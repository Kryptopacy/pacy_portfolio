"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, MessageSquare } from "lucide-react";

interface HeaderProps {
  onOpenIntercom: () => void;
}

export default function Header({ onOpenIntercom }: HeaderProps) {
  const pathname = usePathname();

  const links = [
    { label: "Systems", href: "/projects" },
    { label: "Agent Skills", href: "/skills" },
    { label: "Clinical Dossier", href: "/dossier" },
    { label: "Commission An OS", href: "/build-with-us" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-bar">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4">
        {/* Brand Masthead */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative h-9 w-9 shrink-0 flex items-center justify-center p-0.5 rounded border border-[#d9a648]/40 bg-gradient-to-br from-[#3a0d1c]/80 via-[#22050f]/90 to-black/90 group-hover:border-[#d9a648]/80 group-hover:shadow-[0_0_20px_rgba(217,166,72,0.35)] transition-all duration-300">
            <Image
              src="/brand/pacylabs-logo-256.webp"
              alt="Pacy Labs Spade Logo"
              width={32}
              height={32}
              className="object-contain drop-shadow-[0_0_8px_rgba(217,166,72,0.5)] group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-white group-hover:text-[#f6dc8c] transition-colors">
                PACY LABS
              </span>
            </div>
            <span className="font-mono text-[9px] text-[#a39299] uppercase tracking-tight">
              Olamilekan David Adegoke &bull; OD
            </span>
          </div>
        </Link>

        {/* Minimalist Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-mono tracking-wider">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 ${
                  isActive
                    ? "text-[#f6dc8c] font-medium border-b border-[#d9a648]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Primary Actions */}
        <div className="flex items-center gap-3">
          <a
            href="/olamilekan_adegoke_resume.pdf"
            download="Olamilekan_David_Adegoke_Resume.pdf"
            className="hidden sm:inline-flex items-center gap-1.5 glass-chip px-3.5 py-1.5 font-mono text-xs text-zinc-300 hover:border-[#d9a648]/40 hover:text-[#f6dc8c] hover:bg-[#3a0d1c]/40 transition-all duration-200"
          >
            <span>Resume (PDF)</span>
            <ArrowUpRight className="h-3 w-3 text-[#d9a648]" />
          </a>

          <button
            onClick={onOpenIntercom}
            className="inline-flex items-center gap-2 border border-[#d9a648]/40 bg-gradient-to-r from-[#3a0d1c]/80 to-[#58142c]/70 hover:from-[#58142c]/90 hover:to-[#3a0d1c]/90 px-3.5 py-1.5 font-mono text-xs text-[#f6dc8c] hover:border-[#d9a648]/80 hover:shadow-[0_0_15px_rgba(217,166,72,0.25)] transition-all duration-200"
          >
            <span>Message Me</span>
            <MessageSquare className="h-3 w-3 text-[#f6dc8c]" />
          </button>
        </div>
      </div>
    </header>
  );
}
