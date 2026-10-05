"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import NativeIntercom from "@/components/NativeIntercom";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isIntercomOpen, setIsIntercomOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0d] text-[#ededed] relative selection:bg-zinc-700 selection:text-white pb-16 md:pb-0">
      <Header onOpenIntercom={() => setIsIntercomOpen(true)} />
      
      <main className="flex-1">
        {children}
      </main>

      <Footer />

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
