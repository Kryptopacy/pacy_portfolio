"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, Cpu, FileText, Sparkles } from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Systems", href: "/projects", icon: Layers },
    { label: "Skills", href: "/skills", icon: Cpu },
    { label: "Dossier", href: "/dossier", icon: FileText },
    { label: "Commission", href: "/build-with-us", icon: Sparkles },
  ];

  return (
    <nav className="fixed bottom-3 left-3 right-3 z-50 md:hidden">
      <div className="mx-auto max-w-sm glass-bar p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.85)] border border-white/15 rounded-md">
        <ul className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex flex-col items-center justify-center px-3 py-1.5 transition-all ${
                    isActive
                      ? "text-[#f6dc8c] font-medium bg-[#3a0d1c]/80 border border-[#d9a648]/40 shadow-[0_0_10px_rgba(217,166,72,0.25)] rounded-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="mt-0.5 font-mono text-[9px] tracking-tight">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
