import { HeroSection } from '@/components/sections/hero';
import { StackMetricsSection } from '@/components/sections/stack-metrics';
import { AIServicesSection } from '@/components/sections/ai-services';
import { Mural } from '@/components/sections/mural';
import { DifferentialsSection } from '@/components/sections/differentials';
import { FeaturedProjectsSection } from '@/components/sections/featured-projects';
import { FinalCTASection } from '@/components/sections/final-cta';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StackMetricsSection />
      <AIServicesSection />
      <Mural language="pt" autoRotate />
      <DifferentialsSection />
      <FeaturedProjectsSection />
      <FinalCTASection />
    </main>
  );
}
