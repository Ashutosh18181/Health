import { Hero } from "@/components/home/Hero";
import { HealthTips } from "@/components/home/HealthTips";
import { Motivation } from "@/components/home/Motivation";
import { FeaturedArticles } from "@/components/home/FeaturedArticles";
import { CTA } from "@/components/home/CTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Hero />
      <HealthTips />
      <Motivation />
      <FeaturedArticles />
      <CTA />
    </main>
  );
}
