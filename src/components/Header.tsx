"use client";

import Link from "next/link";
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
    <header className="sticky top-0 z-40 w-full hairline-b bg-[#090a0d]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4">
        {/* Brand Masthead */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="h-7 w-7 border border-white/20 bg-black flex items-center justify-center font-mono text-xs font-semibold text-white">
            PL
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-white">
              PACY LABS
            </span>
            <span className="font-mono text-[9px] text-zinc-500 uppercase">
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
                    ? "text-white font-medium border-b border-white"
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
            className="hidden sm:inline-flex items-center gap-1.5 border border-white/15 px-3.5 py-1.5 font-mono text-xs text-zinc-300 hover:border-white/30 hover:text-white transition-colors"
          >
            <span>Resume (PDF)</span>
            <ArrowUpRight className="h-3 w-3 text-zinc-500" />
          </a>

          <button
            onClick={onOpenIntercom}
            className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3.5 py-1.5 font-mono text-xs text-white hover:bg-white/10 hover:border-white/40 transition-colors"
          >
            <span>Dispatch</span>
            <MessageSquare className="h-3 w-3 text-zinc-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
