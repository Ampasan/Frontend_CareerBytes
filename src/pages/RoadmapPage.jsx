import Navbar from "../components/layout/Navbar";
import RoadmapHeader from "../features/roadmap/components/RoadmapHeader";
import RoadmapAbout from "../features/roadmap/components/RoadmapAbout";
import RoadmapStep from "../features/roadmap/components/RoadmapStep";
import Footer from "../components/layout/Footer";

function RoadmapPage() {
  return (
    <>
      <Navbar />
      <RoadmapHeader />
      <RoadmapAbout />
      <RoadmapStep />
      <Footer />
    </>
  );
}

export default RoadmapPage;
