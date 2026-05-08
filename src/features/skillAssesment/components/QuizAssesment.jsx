import QuizCard from "../../../components/ui/QuizCard";
import { useState } from "react";

function QuizAssesment ({ onExit }) {
    const questions = [
        {
            question:
            "How familiar are you with User Research?",

            options: [
                "Not familiar at all",
                "Slightly Familiar",
                "Moderately Familiar",
                "Familiar",
                "Very Familiar"
            ]
        },
        {
            question:
            "How familiar are you with Figma?",

            options: [
                "Never used",
                "Beginner",
                "Intermediate",
                "Advanced",
                "Expert"
            ]
        },
        {
            question:
            "How familiar are you with Typography?",

            options: [
                "Very Weak",
                "Weak",
                "Average",
                "Good",
                "Excellent"
            ]
        }
    ];

    const [currentQuestIDX, setCurrentQuestIDX] = useState(0);
    const currentQuestion = questions[currentQuestIDX];
    const totalQuest = questions.length;
    const isLastQuest = currentQuestIDX === totalQuest - 1;

    function handleNextQuest() {
        setCurrentQuestIDX(currentQuestIDX + 1);
    };
    function handleBackQuest() {
        setCurrentQuestIDX(currentQuestIDX - 1);
    };

    return (
        <section className="my-10 mt-15 max-w-full mx-auto">
            <div className="max-w-6xl mx-auto px-6 mb-30 flex flex-col items-center justify-center gap-4 text-(--color-primary)">
            
                <button 
                className="underline cursor-pointer text-sm"
                onClick={onExit}
                >
                    Exit Assessment
                </button>
                {/* QUIZ CARD */}
                <QuizCard
                    questions={currentQuestion.question}
                    options={currentQuestion.options}
                    onNext={handleNextQuest}
                    onBack={handleBackQuest}
                    currentQuestIDX={currentQuestIDX}
                    totalQuest={totalQuest}
                    isLastQuest={isLastQuest}
                    
                />
                <p className="text-(--color-primary) text-sm">Your responses help us personalize your learning path</p>

            </div>
        </section>
    )
}

export default QuizAssesment;