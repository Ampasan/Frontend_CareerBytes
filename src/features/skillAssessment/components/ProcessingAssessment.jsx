import { useEffect, useState } from "react";
import { Check, LoaderCircle, Circle, CircleCheckBig } from "lucide-react";
import { PiLineVerticalBold } from "react-icons/pi";

const processData = [
    "Analyzing your answers",
    "Comparing with role requirements",
    "Generating your results"
];

function ProcessingAssessment({ onComplete }) {
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
    }, [isFinished, onComplete]);

    return(
        <section className="max-w-full mx-auto">
            <div className="max-w-xs lg:max-w-md mx-auto flex flex-col justify-center items-center gap-2 lg:gap-3 text-(--color-primary) my-15">
                <div className={`h-15 w-15 lg:h-20 lg:w-20 rounded-full flex justify-center items-center
                    ${isFinished ? "bg-(--color-primary) text-white" : "bg-(--color-primary)/20"}
                    `}>
                    {isFinished ? <CircleCheckBig size={50} className="h-10 lg:h-20"/> 
                    : 
                    <LoaderCircle size={40} className="animate-spin h-10 lg:h-20" />}
                </div>
                <h1 className="text-xl lg:text-3xl font-bold">Processing Your Assessment</h1>
                <p className="text-center text-xs lg:text-sm lg:max-w-md">We're analyzing your responses to create a personalized skill profile and career recommendations.</p>
                
                {/* PROCESS CARD */}
                <div className="bg-(--color-surface) shadow-[0px_1.5px_5px_2px_var(--color-shadow-subtle)] w-full h-60 lg:h-72 rounded-xl flex flex-col gap-5 p-5 lg:p-8">
                    {processData.map((process, index) => {
                        const isDone = index < currentStep || 
                        (isFinished && index === currentStep);
                        const isActive = index === currentStep && !isFinished;

                        return(
                            <div key={index}
                            className="flex flex-col items-start"
                            >
                                <div className="flex justify-between items-center w-full">
                                    {/* LEFT SIDE */}
                                    <div className="flex items-center gap-2 lg:gap-4">
                                        {/* ICON */}
                                        <div className={`h-8 w-8 lg:h-10 lg:w-10 rounded-full flex justify-center items-center border-2 font-bold
                                            ${isDone ? "bg-(--color-primary) text-white border-(--color-primary)" : ""}
                                            ${isActive ? "bg-(--color-primary)/15 text-(--color-primary) animate-pulse" : ""}
                                            ${!isDone && !isActive ?
                                                "bg-(--color-primary)/15 border-transparent text-(--color-primary)/40" : ""
                                            }
                                            `}>
                                            {isDone ? <Check size={20} /> : <LoaderCircle className="animate-spin h-5 w-5"/>}
                                        </div>
                                        {/* TEXT */}
                                        <p className="font-medium text-xs lg:text-sm">
                                            {process}
                                        </p>
                                    </div>

                                    {/* RIGHT SIDE STATUS */}
                                    <div className={`text-xs px-1 lg:px-2 h-7 rounded-full flex justify-center items-center
                                        ${isDone ? "bg-(--color-primary) text-white" : ""}
                                        ${isActive ? "bg-(--color-primary)/15 text-(--color-primary)" : "" }
                                        ${!isDone && !isActive ? "bg-(--color-neutral-soft) text-(--color-text-soft)" : ""}
                                        `}>
                                        {isDone ? "Done" : isActive ? "In Progress" : "Waiting"}
                                    </div>
                                </div>
                                <div className={`ml-1 lg:ml-2 mt-1
                                    ${isDone ? "text-(--color-primary)" : ""}
                                        ${isActive ? "text-(--color-primary)/20" : "" }
                                        ${!isDone && !isActive ? "hidden" : ""}
                                        ${isLastProcess === index ? "hidden" : ""}
                                        
                                    `}><PiLineVerticalBold size={25} /></div>
                            </div>
                        )
                    })}
                </div>

                <p className="text-center text-xs lg:text-sm mt-3 lg:mt-5">
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
