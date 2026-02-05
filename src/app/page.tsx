import { Hero } from "@/components/home/Hero";
import { HealthTips } from "@/components/home/HealthTips";
import { AboutSection } from "@/components/home/AboutSection";
import { Motivation } from "@/components/home/Motivation";
import { FeaturedArticles } from "@/components/home/FeaturedArticles";
import { Testimonials } from "@/components/home/Testimonials";
import { CTA } from "@/components/home/CTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Hero />
      <HealthTips />
      <AboutSection />
      <Motivation />
      <FeaturedArticles />
      <Testimonials />
      <CTA />
    </main>
  );
}
