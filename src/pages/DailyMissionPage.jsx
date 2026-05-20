import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

import MissionHeader from "../features/mission/components/MissionHeader";
import MissionCard from "../features/mission/components/MissionCard";

function DailyMissionPage() {
  return (
    <>
      <Navbar />
      <MissionHeader />
      <MissionCard />
      <div className="border-t border-(--color-primary)"></div>
      <Footer />
    </>
  );
}

export default DailyMissionPage;
