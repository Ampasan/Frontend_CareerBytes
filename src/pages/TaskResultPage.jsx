import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

import TaskSuccessBanner from "../features/mission/components/TaskSuccessBanner";
import ResultScoreBoard from "../features/mission/components/ResultScoreBoard";
import SkillBreakdown from "../features/mission/components/SkillBreakdown";
import PerformanceFeedback from "../features/mission/components/PerformanceFeedback";
import ResultActions from "../features/mission/components/ResultActions";

function TaskResultPage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-13 text-(--color-primary) space-y-6">
        <button
          className="flex items-center gap-2 text-base font-semibold hover:opacity-70 cursor-pointer"
          onClick={() => navigate("/daily-mission")}
        >
          <ChevronLeft size={18} />
          <span>Back to Daily Mission</span>
        </button>
        <TaskSuccessBanner />
        <ResultScoreBoard />
        <PerformanceFeedback />
        <ResultActions />
        <SkillBreakdown />
      </main>
      <Footer />
    </>
  );
}

export default TaskResultPage;
