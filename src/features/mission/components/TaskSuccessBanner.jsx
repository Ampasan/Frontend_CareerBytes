import { CheckCircle } from "lucide-react";
import { mockMissions } from "../../../constants/dummy/mission";

function TaskSuccessBanner() {
    const mission = mockMissions.missions.find((item) => item.id === 2);

    return (
        <section className="w-full">
            <div className="bg-(--color-primary)/5 border border-(--color-primary) rounded-4xl p-8 sm:p-16 flex flex-col items-center justify-center shadow-[0_14px_36px_var(--color-shadow-subtle)]">
                {/* ICON */}
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-(--color-primary) flex items-center justify-center shadow-md mb-6 transition hover:scale-105">
                    <CheckCircle
                        size={42}
                        strokeWidth={2.5}
                        className="text-white"
                    />
                </div>

                {/* TITLE */}
                <h1 className="text-(--color-primary) font-bold text-2xl sm:text-[2.25rem] text-center leading-tight mb-3">
                    Task Completed Successfully!
                </h1>

                {/* DESCRIPTION */}
                <p className="text-(--color-primary)/85 text-sm sm:text-lg font-medium text-center mb-7 max-w-xl">
                    Great work! Your wireframing submission has been reviewed.
                </p>

                {/* TAG */}
                <div className="rounded-full bg-(--color-primary)/10 px-6 py-2 text-(--color-primary) text-xs sm:text-sm font-bold tracking-wide">
                    {mission?.title || "Practice Wireframing with Figma"}
                </div>
            </div>
        </section>
    );
}

export default TaskSuccessBanner;
