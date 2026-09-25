import AboutSection from "@/modules/public/components/AboutSection";
import CTASection from "@/modules/public/components/CTASection";
import FeaturedTeams from "@/modules/public/components/FeaturedTeams";
import HeroSection from "@/modules/public/components/HeroSection";
import PublicFooter from "@/modules/public/components/PublicFooter";
import PublicNavbar from "@/modules/public/components/PublicNavbar";
import StandingsPreview from "@/modules/public/components/StandingsPreview";
import UpcomingMatches from "@/modules/public/components/UpcomingMatches";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <PublicNavbar />

      <HeroSection />

      <AboutSection />

      <FeaturedTeams />

      <UpcomingMatches />

      <StandingsPreview />

      <CTASection />

      <PublicFooter />
    </main>
  );
}