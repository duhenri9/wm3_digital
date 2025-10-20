import { HeroSection } from '@/components/sections/hero';
import { AboutSection } from "@/components/sections/about";
import { FeaturesSection } from "@/components/sections/features";
import { BenefitsSection } from "@/components/sections/benefits";
import { CTASection } from "@/components/sections/cta";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <BenefitsSection />
      <CTASection />
    </main>
  );
}
