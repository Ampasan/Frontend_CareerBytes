import QuizCard from "../../../components/ui/QuizCard";
import { useEffect, useMemo, useState } from "react";
import { getApiErrorMessage } from "../../../services/api";
import skillAssessmentService from "../services/skillAssessmentService";

const fallbackQuestions = [
  {
    id: "fallback-1",
    question: "How familiar are you with the fundamentals of your selected role?",
    options: ["Not familiar", "Beginner", "Intermediate", "Advanced"],
  },
];

function QuizAssessment({ onExit, onFinish, role, roleId }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestIDX, setCurrentQuestIDX] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const activeQuestions = questions.length > 0 ? questions : fallbackQuestions;
  const currentQuestion = activeQuestions[currentQuestIDX];
  const totalQuest = activeQuestions.length;
  const isLastQuest = currentQuestIDX === totalQuest - 1;

  const answeredQuestions = useMemo(
    () => selectedAnswers.filter((answer) => answer !== undefined).length,
    [selectedAnswers]
  );
  const progressPercentage = (answeredQuestions / totalQuest) * 100;

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError("");

      if (!role) {
        setError("Role karier belum terbaca. Kembali dan pilih role karier terlebih dahulu.");
        setLoading(false);
        return;
      }

      try {
        const response = await skillAssessmentService.getQuestions(role);
        setQuestions(response.data);
      } catch (error) {
        setError(getApiErrorMessage(error, "Failed to fetch assessment questions"));
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [role]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [currentQuestIDX]);

  const submitAnswers = async () => {
    setSubmitting(true);
    setError("");

    try {
      const answers = questions.map((question, index) => ({
        questionId: question.id,
        selectedOption: selectedAnswers[index],
      }));

      const response = await skillAssessmentService.submitAssessment({
        roleId,
        role,
        answers,
      });

      onFinish(response.data);
    } catch (error) {
      setError(getApiErrorMessage(error, "Failed to submit assessment"));
    } finally {
      setSubmitting(false);
    }
  };

  function handleNextQuest() {
    if (isLastQuest) {
      submitAnswers();
    } else {
      setCurrentQuestIDX(currentQuestIDX + 1);
    }
  }

  function handleBackQuest() {
    setCurrentQuestIDX(currentQuestIDX - 1);
  }

  function handleSelectOption(optionIndex) {
    const updatedAnswers = [...selectedAnswers];

    if (selectedAnswers[currentQuestIDX] === optionIndex) {
      updatedAnswers[currentQuestIDX] = undefined;
    } else {
      updatedAnswers[currentQuestIDX] = optionIndex;
    }

    setSelectedAnswers(updatedAnswers);
  }

  return (
    <section className="my-10 mt-15 max-w-full mx-auto">
      <div className="max-w-6xl mx-auto px-6 mb-30 flex flex-col items-center justify-center gap-4 text-(--color-primary)">
        <button
          className="underline cursor-pointer text-sm"
          onClick={onExit}
        >
          Exit Assessment
        </button>

        {loading ? (
          <div className="flex justify-center items-center py-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-(--color-primary)"></div>
          </div>
        ) : (
          <>
            {error && (
              <div className="w-full rounded-xl border border-(--color-primary) bg-(--color-primary)/5 p-4 font-semibold">
                {error}
              </div>
            )}

            <QuizCard
              questions={currentQuestion.question}
              options={currentQuestion.options}
              onNext={handleNextQuest}
              onBack={handleBackQuest}
              currentQuestIDX={currentQuestIDX}
              totalQuest={totalQuest}
              isLastQuest={isLastQuest}
              selectedAnswers={selectedAnswers}
              onSelectOption={handleSelectOption}
              progressPercentage={Number(progressPercentage.toFixed(2))}
              nextButtonText={submitting ? "Submitting..." : undefined}
            />
          </>
        )}

        <p className="text-(--color-primary) text-sm">
          Your responses help us personalize your learning path
        </p>
      </div>
    </section>
  );
}

export default QuizAssessment;
