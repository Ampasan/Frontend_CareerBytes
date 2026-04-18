import Navbar from "../components/layout/Navbar"
import HeroSection from "../features/landing/components/HeroSection"
import AboutSection from "../features/landing/components/AboutSection"
import RoadmapSection from "../features/landing/components/RoadmapSection"

function LandingPage() {
    return(
        <>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <RoadmapSection />
        </>

    )
}

export default LandingPage