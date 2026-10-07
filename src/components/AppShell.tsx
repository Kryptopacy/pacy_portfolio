"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import NativeIntercom from "@/components/NativeIntercom";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isIntercomOpen, setIsIntercomOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#120207] text-[#ededed] relative pb-16 md:pb-0 overflow-x-hidden">
      {/* =========================================================================
          ATMOSPHERIC BURGUNDY & CIRCUIT GOLD BACKDROP (2026 REFRACTIVE CANVAS)
          ========================================================================= */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-100"
        aria-hidden="true"
      >
        {/* Architectural Micro-Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(rgba(217, 166, 72, 0.15) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Ambient Radial Mesh: Top Imperial Crown */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[750px] bg-[radial-gradient(ellipse_at_top,_rgba(78,14,35,0.65)_0%,_rgba(42,7,19,0.45)_45%,_transparent_75%)] blur-3xl" />

        {/* Mid-Page Wine Node (Right) */}
        <div className="absolute top-[35%] -right-48 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(58,13,28,0.45)_0%,_rgba(217,166,72,0.06)_35%,_transparent_70%)] blur-3xl" />

        {/* Mid-Page Wine Node (Left) */}
        <div className="absolute top-[65%] -left-48 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(72,12,32,0.40)_0%,_transparent_65%)] blur-3xl" />

        {/* Subtle Bottom Gold Corona */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_bottom,_rgba(58,13,28,0.5)_0%,_rgba(217,166,72,0.08)_40%,_transparent_75%)] blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header onOpenIntercom={() => setIsIntercomOpen(true)} />
        
        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </div>

      {/* Floating Bottom Mobile Dock */}
      <MobileNav />

      {/* Native In-App Intercom Drawer */}
      <NativeIntercom
        isOpen={isIntercomOpen}
        onOpen={() => setIsIntercomOpen(true)}
        onClose={() => setIsIntercomOpen(false)}
      />
    </div>
  );
}
