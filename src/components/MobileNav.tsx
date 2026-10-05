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
      <div className="mx-auto max-w-sm border border-white/15 bg-[#090a0d]/95 p-1 shadow-2xl backdrop-blur-xl">
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
                  className={`flex flex-col items-center justify-center px-3 py-1.5 transition-colors ${
                    isActive
                      ? "text-white font-medium bg-white/10"
                      : "text-zinc-500 hover:text-zinc-300"
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
