import { ChevronLeft, ChevronRight } from "lucide-react";
import Bar from "./Bar";

function QuizCard ({ 
    questions, 
    options, 
    onNext,
    onBack,
    currentQuestIDX,
    totalQuest,
    isLastQuest 
}) {
    return (
        <>
        <div className="bg-white flex flex-col gap-2 p-6 px-10 w-full rounded-xl shadow shadow-[0_2px_5px_1px_lightgray]">
            <div className="w-2xl">
                <Bar progress={20} color="bg-(--color-primary)" variant="C" fontWeight="font-normal" text={`Question ${currentQuestIDX+1} of ${totalQuest}`}/>
            </div>
            <h1 className="text-(--color-primary) font-bold text-3xl mt-10">
                {questions}
            </h1>
            <p className="text-sm mb-4">
                Select the option that best describes your current skill level
            </p>
            {/* OPTION */}
            <div className="flex flex-col gap-5">
                {options.map((option, index) => (
                <div className="flex flex-col items-start p-3 border-2 border-(--color-primary)/30 rounded-lg font-semibold
                                hover:bg-(--color-primary) hover:text-white transition">
                    <div className="flex justify-center items-center gap-3 text-sm ">
                        <div className="flex items-center justify-center h-7 w-7 text-xs rounded-full border-2 border-(--color-primary)/30">
                        {index + 1}
                        </div>
                        <p>{option}</p>
                    </div>
                </div>
                ))}
            </div>
            {/* BUTTON */}
            <div className={`text-sm mt-5 flex ${currentQuestIDX > 0 ? "justify-between" : "justify-end"}`}>
                {currentQuestIDX > 0 && (
                    <button 
                    className="bg-transparent border-1 hover:bg-(--color-primary) text-(--color-primary) hover:text-white p-2 px-7 rounded-md cursor-pointer flex items-center justify-center gap-2"
                    onClick={onBack}
                    >
                        <p>Back</p>
                    </button>
                    )
                }

                <button 
                className="bg-(--color-primary) hover:bg-transparent text-white hover:text-(--color-primary) border-1 p-2 px-7 rounded-md cursor-pointer flex items-center justify-center gap-2"
                onClick={onNext}
                >
                    <p>{isLastQuest ? "Finish" : "Next"}</p>
                    <ChevronRight size={13} />
                </button>
            </div>
        </div>
        </>
    )
}

export default QuizCard;