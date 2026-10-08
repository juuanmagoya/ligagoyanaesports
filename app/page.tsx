import AboutSection from "@/modules/public/components/AboutSection";
import CTASection from "@/modules/public/components/CTASection";
import FeaturedTeams from "@/modules/public/components/FeaturedTeams";
import HeroSection from "@/modules/public/home/components/HeroSection";
import PublicFooter from "@/modules/public/components/PublicFooter";
import PublicNavbar from "@/modules/public/components/PublicNavbar";
import StandingsPreview from "@/modules/public/components/StandingsPreview";
import { getHomeData } from "@/modules/public/home/services/home.service";

export default async function HomePage() {
  const homeData = await getHomeData();

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <PublicNavbar />

      <HeroSection
        stats={homeData.stats}
        lastMatch={homeData.lastMatch}
        standings={homeData.standings}
      />

      <AboutSection />

      <FeaturedTeams teams={homeData.featuredTeams} />

       <StandingsPreview standings={homeData.standings} />

      <CTASection />

      <PublicFooter />
    </main>
  );
}