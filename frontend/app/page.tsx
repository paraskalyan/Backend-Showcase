import { CTASection } from "@/components/landing/cta-section";
import { DemoPreview } from "@/components/landing/demo-preview";
import { FeaturesSection } from "@/components/landing/features-section";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { StatsSection } from "@/components/landing/stats-section";
import Image from "next/image";

export default function Home() {
  return (
   <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <DemoPreview />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
