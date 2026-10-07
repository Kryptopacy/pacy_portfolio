import Hero from "@/components/Hero";
import SystemsSection from "@/components/SystemsSection";
import AgentSkillsSection from "@/components/AgentSkillsSection";
import MethodologySection from "@/components/MethodologySection";
import FounderSection from "@/components/FounderSection";
import BuildWithUsSection from "@/components/BuildWithUsSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SystemsSection />
      <AgentSkillsSection />
      <MethodologySection />
      <FounderSection />
      <BuildWithUsSection />
    </>
  );
}
