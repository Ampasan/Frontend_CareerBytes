import Navbar from "../components/layout/Navbar";
import HeroSection from "../features/landing/components/HeroSection";
import AboutSection from "../features/landing/components/AboutSection";
import RoadmapSection from "../features/landing/components/RoadmapSection";
import MissionSection from "../features/landing/components/MissionSection";
import TrendsSection from "../features/landing/components/TrendsSection";
import Footer from "../components/layout/Footer";

function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <RoadmapSection />
      <MissionSection />
      <TrendsSection />
      <Footer />
    </>
  );
}

export default LandingPage;
