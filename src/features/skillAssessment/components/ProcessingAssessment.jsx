import { use, useEffect, useState } from "react";
import { Check, LoaderCircle, Circle, CircleCheckBig } from "lucide-react";
import { PiLineVerticalBold } from "react-icons/pi";

function ProcessingAssessment({ onComplete }) {
    const processData = [
    "Analyzing your answers",
    "Comparing with role requirements",
    "Generating your results"
    ];
    const [currentStep, setCurrentStep] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    // AUTO CHANGE PROCESS STEP EVERY 2 SECONDS
    useEffect(() => {
        const interval = setInterval(() => {

        setCurrentStep((prev) => {
            if (prev < processData.length -1) return prev + 1;
            clearInterval(interval);
            setTimeout(() => {
                setIsFinished(true);
            }, 1500);
            return prev;
        });
        }, 2000);
        return () => clearInterval(interval);
    }, []);
    const isLastProcess = processData.length -1;

    // REDIRECT TO RESULT PAGE AFTER ALL PROCESS FINISHED
    useEffect(() => {
        if (isFinished) {
            const timeout = setTimeout(() => onComplete(), 1500);
            return () => clearTimeout(timeout);
        }
    }, [isFinished]);

    return(
        <section className="max-w-full mx-auto">
            <div className="max-w-md mx-auto flex flex-col justify-center items-center gap-3 text-(--color-primary) my-15">
                <div className={`h-20 w-20 rounded-full flex justify-center items-center
                    ${isFinished ? "bg-(--color-primary) text-white" : "bg-(--color-primary)/20"}
                    `}>
                    {isFinished ? <CircleCheckBig size={50}/> : <LoaderCircle className="animate-spin h-10 w-10" />}
                </div>
                <h1 className="text-3xl font-bold">Processing Your Assessment</h1>
                <p className="text-center text-sm max-w-md">We're analyzing your responses to create a personalized skill profile and career recommendations.</p>
                
                <div className="bg-white shadow-[0px_1.5px_5px_2px] shadow-black/10 w-full h-72 rounded-xl flex flex-col gap-5 p-8">
                    {processData.map((process, index) => {
                        const isDone = index < currentStep || 
                        (isFinished && index === currentStep);
                        const isActive = index === currentStep && !isFinished;

                        return(
                            <div key={index}
                            className="flex flex-col items-start "
                            >
                                <div className="flex justify-between items-center w-full">
                                    {/* LEFT SIDE */}
                                    <div className="flex items-center gap-4">
                                        {/* ICON */}
                                        <div className={`h-10 w-10 rounded-full flex justify-center items-center border-2 font-bold
                                            ${isDone ? "bg-(--color-primary) text-white border-(--color-primary)" : ""}
                                            ${isActive ? "bg-(--color-primary)/15 text-[var(--color-primary)] animate-pulse" : ""}
                                            ${!isDone && !isActive ?
                                                "bg-(--color-primary)/15 border-transparent text-(--color-primary)/40" : ""
                                            }
                                            `}>
                                            {isDone ? <Check size={20} /> : <LoaderCircle className="animate-spin h-5 w-5"/>}
                                        </div>
                                        {/* TEXT */}
                                        <p className="font-medium text-sm">
                                            {process}
                                        </p>
                                    </div>

                                    {/* RIGHT SIDE STATUS */}
                                    <div className={`text-xs px-2 h-7 rounded-full flex justify-center items-center
                                        ${isDone ? "bg-(--color-primary) text-white" : ""}
                                        ${isActive ? "bg-(--color-primary)/15 text-(--color-primary)" : "" }
                                        ${!isDone && !isActive ? "bg-gray-100 text-gray-400" : ""}
                                        `}>
                                        {isDone ? "Done" : isActive ? "In Progress" : "Waiting"}
                                    </div>
                                </div>
                                <div className={`ml-2 mt-1
                                    ${isDone ? "text-(--color-primary)" : ""}
                                        ${isActive ? "text-(--color-primary)/20" : "" }
                                        ${!isDone && !isActive ? "hidden" : ""}
                                        ${isLastProcess === index ? "hidden" : ""}
                                        
                                    `}><PiLineVerticalBold size={25} /></div>
                            </div>
                        )
                    })}
                </div>

                <p className="text-center text-sm mt-5">
                    This will only take a few seconds
                </p>
                {/* DOT LOADING */}
                <div className="flex items-center gap-1 mt-1">
                    {[0, 1, 2].map((dot, index) => (
                        <Circle
                            key={index}
                            size={10}
                            fill="currentColor"
                            className="animate-pulse "
                            style={{
                                animationDelay: `${index * 0.2}s`
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
export default ProcessingAssessment;