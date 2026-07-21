import { HeroSection } from "@/components/sections/HeroSection";
import { CraftSection, SystemSection, VisionSection } from "@/components/sections/HomeSections";

export default function Home() {
  return (
    <>
      <HeroSection />
      <VisionSection />
      <SystemSection />
      <CraftSection />
    </>
  );
}
