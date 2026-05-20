import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

import AssessmentProgress from "../features/mission/components/AssessmentProgress";
import AssessmentForm from "../features/mission/components/AssessmentForm";
import MissionRewardCard from "../features/mission/components/MissionRewardCard";
import HeaderMission from "../components/ui/HeaderMission";
import { mockMissions } from "../constants/dummy/mission";
import { useNavigate } from "react-router-dom";

const scrollToPageTop = () => {
  window.setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
};

function TaskAssessmentPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [figmaLinks, setFigmaLinks] = useState({});
  const navigate = useNavigate();

  const mission = mockMissions.missions.find((m) => m.id === 2);
  const tasks = mission?.assessment?.tasks || [];
  const currentQuestion = tasks[currentQuestionIndex];
  const currentQuestionKey = currentQuestion?.id || currentQuestionIndex;
  const isLastQuestion = currentQuestionIndex === tasks.length - 1;
  const rewards = mission?.assessment?.rewards;

  useEffect(() => {
    scrollToPageTop();
  }, [currentQuestionIndex]);

  const handleAnswerChange = (event) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionKey]: event.target.value,
    }));
  };

  const handleFigmaLinkChange = (event) => {
    setFigmaLinks((prevLinks) => ({
      ...prevLinks,
      [currentQuestionKey]: event.target.value,
    }));
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    scrollToPageTop();
  };

  const handleSubmit = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      scrollToPageTop();
      return;
    }

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
          key={currentQuestionKey}
          question={currentQuestion}
          answerValue={answers[currentQuestionKey] || ""}
          onAnswerChange={handleAnswerChange}
          linkValue={figmaLinks[currentQuestionKey] || ""}
          onLinkChange={handleFigmaLinkChange}
          hintText={currentQuestion?.hint}
          onSubmit={handleSubmit}
          onPrevious={handlePreviousQuestion}
          canGoPrevious={currentQuestionIndex > 0}
          submitButtonText={isLastQuestion ? "Submit Task" : "Next Question"}
        />
        <MissionRewardCard rewards={rewards} />
      </main>
      <Footer />
    </>
  );
}

export default TaskAssessmentPage;
