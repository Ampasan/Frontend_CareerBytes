
import QuizCard from "../../../components/ui/QuizCard";
import { useState } from "react";

function QuizAssessment ({ onExit, onFinish }) {
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
            question: "How experienced are you with creating user personas and user journey maps?",
            options: [
                "No experience",
                "Understand the concept",
                "Created a few for projects",
                "Create them regularly",
                "Expert (lead research sessions)"
            ]
        },
        {
            question: "How would you rate your skill in creating high-fidelity interactive prototypes?",
            options: [
                "Never created one",
                "Static screens only",
                "Basic interactions (page links)",
                "Advanced smart-animates & variables",
                "Expert (micro-interactions & logic)"
            ]
        },
        {
            question: "How often do you conduct usability testing with real users?",
            options: [
                "Never done it",
                "Rarely (rely on intuition)",
                "Occasionally for major features",
                "Regularly before development",
                "Always (core part of design cycle)"
            ]
        }
    ];

    const [currentQuestIDX, setCurrentQuestIDX] = useState(0);
    const currentQuestion = questions[currentQuestIDX];
    const totalQuest = questions.length;
    const isLastQuest = currentQuestIDX === totalQuest - 1;
    const [selectedAnswers,setSelectedAnswers] = useState([])

    const answeredQuestions = selectedAnswers.filter(
        (answer) => answer !== undefined
    ).length;
    const progressPercentage = (answeredQuestions / totalQuest) * 100;

    // Back & Next Handler
    function handleNextQuest() {
        if(isLastQuest) {
            onFinish();
        } else {
            setCurrentQuestIDX(currentQuestIDX + 1);
        }
    };
    function handleBackQuest() {
        setCurrentQuestIDX(currentQuestIDX - 1);
    };

    //Answers Selection Handler
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
                {/* QUIZ CARD */}
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
                    
                />
                <p className="text-(--color-primary) text-sm">Your responses help us personalize your learning path</p>

            </div>
        </section>
    )
}

export default QuizAssessment;