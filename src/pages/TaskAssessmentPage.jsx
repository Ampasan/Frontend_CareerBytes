import { useState } from "react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

import AssessmentProgress from "../features/mission/components/AssessmentProgress";
import AssessmentForm from "../features/mission/components/AssessmentForm";
import MissionRewardCard from "../features/mission/components/MissionRewardCard";
import HeaderMission from "../components/ui/HeaderMission";
import { mockMissions } from "../constants/dummy/mission";
import { useNavigate } from "react-router-dom";

function TaskAssessmentPage() {
  const [currentQuestionIndex] = useState(0);
  const navigate = useNavigate();

  const mission = mockMissions.missions.find((m) => m.id === 2);
  const tasks = mission?.assessment?.tasks || [];
  const currentQuestion = tasks[currentQuestionIndex];
  const rewards = mission?.assessment?.rewards;

  const handleSubmit = () => {
    navigate("/daily-mission/task/result");
  };

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-13 text-(--color-primary) space-y-6">
        {mission && (
          <HeaderMission
            task={mission}
            backText="Back to Mission Detail"
            backRoute="/daily-mission/task"
          />
        )}
        <AssessmentProgress
          totalQuestions={tasks.length}
          currentQuestionIndex={currentQuestionIndex}
        />
        <AssessmentForm
          question={currentQuestion}
          hintText={currentQuestion?.hint}
          onSubmit={handleSubmit}
        />
        <MissionRewardCard rewards={rewards} />
      </main>
      <Footer />
    </>
  );
}

export default TaskAssessmentPage;
