import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import RoadmapHeader from "../features/roadmap/components/RoadmapHeader";
import RoadmapAbout from "../features/roadmap/components/RoadmapAbout";
import RoadmapStep from "../features/roadmap/components/RoadmapStep";
import Footer from "../components/layout/Footer";

function RoadmapPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Navbar />
      <RoadmapHeader onSearch={setSearchTerm} />
      {searchTerm === "" && <RoadmapAbout />}
      <RoadmapStep searchTerm={searchTerm} />
      <Footer />
    </>
  );
}

export default RoadmapPage;
