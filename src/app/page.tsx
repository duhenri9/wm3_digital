import Image from "next/image";

import { HeroSection } from '@/components/sections/hero';
import { AboutSection } from "@/components/sections/about";
import { FeaturesSection } from "@/components/sections/features";
import { CTASection } from "@/components/sections/cta";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <CTASection />
    </main>
  );
}
