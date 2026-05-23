import { AlertCircle, CheckCircle } from "lucide-react";

function TaskSuccessBanner({ submission }) {
    const taskTitle = submission?.data?.taskTitle || "Daily Mission Task";
    const category = submission?.data?.category;
    const difficulty = submission?.data?.difficulty;
    const apiErrorMessage = submission?.data?.apiErrorMessage;
    const isSubmitted = submission?.success !== false && !apiErrorMessage;
    const Icon = isSubmitted ? CheckCircle : AlertCircle;

    return (
        <section className="w-full">
            <div className="bg-(--color-primary)/5 border border-(--color-primary) rounded-4xl p-8 sm:p-16 flex flex-col items-center justify-center shadow-[0_14px_36px_var(--color-shadow-subtle)]">
                {/* ICON */}
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-(--color-primary) flex items-center justify-center shadow-md mb-6 transition hover:scale-105">
                    <Icon
                        size={42}
                        strokeWidth={2.5}
                        className="text-white"
                    />
                </div>

                {/* TITLE */}
                <h1 className="text-(--color-primary) font-bold text-2xl sm:text-[2.25rem] text-center leading-tight mb-3">
                    {isSubmitted ? "Task Completed Successfully!" : "Submission Not Completed Yet"}
                </h1>

                {/* DESCRIPTION */}
                <p className="text-(--color-primary)/85 text-sm sm:text-lg font-medium text-center mb-3 max-w-xl">
                    {submission?.message || "Great work! Your submission has been saved."}
                </p>

                {apiErrorMessage && (
                    <p className="text-(--color-primary)/70 text-xs sm:text-sm font-semibold text-center mb-7 max-w-xl">
                        Server message: {apiErrorMessage}
                    </p>
                )}

                {/* TAG */}
                <div className="rounded-full bg-(--color-primary)/10 px-6 py-2 text-(--color-primary) text-xs sm:text-sm font-bold tracking-wide">
                    {taskTitle}
                </div>

                {(category || difficulty) && (
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs sm:text-sm font-semibold text-(--color-primary)">
                        {category && (
                            <span className="rounded-full bg-(--color-surface) border border-(--color-primary)/30 px-4 py-1">
                                {category}
                            </span>
                        )}
                        {difficulty && (
                            <span className="rounded-full bg-(--color-surface) border border-(--color-primary)/30 px-4 py-1">
                                {difficulty}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

export default TaskSuccessBanner;
