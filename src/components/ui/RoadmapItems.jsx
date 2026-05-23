import RoadmapCard from "./RoadmapCard";
import { getIcon, getOpacity } from "../../utils/RoadmapHelpers";

function RoadmapItems({ data, density = "default", onLevelSelect }) {
    if (!data || data.length === 0) return null;

    const isLanding = density === "landing";
    const lineClass = isLanding
        ? "absolute left-16 top-0 h-full w-0.5 bg-(--color-primary) shadow-none"
        : "absolute left-[55px] lg:left-[70px] top-0 w-0.5 md:w-0.75 h-full bg-(--color-primary)";
    const listClass = isLanding
        ? "flex flex-col gap-14 md:gap-16"
        : "flex flex-col gap-10 md:gap-15";
    const rowClass = isLanding
        ? "grid grid-cols-[40px_56px_1fr]"
        : "grid grid-cols-[40px_30px_1fr] lg:grid-cols-[50px_40px_1fr]";
    const iconOuterClass = isLanding
        ? "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-(--color-primary-border-strong) bg-(--color-surface) text-(--color-primary) shadow-none"
        : "relative z-10 bg-black/5 w-10 h-10 flex justify-center items-center rounded-full border-2 text-(--color-primary)";

    return(
    <div className="relative">
        {/* LINE */}
        <div className={lineClass}></div>

        <div className={listClass}> 
            {data.map((item, index) => (
                
                <div key={index} className={rowClass}>
                    {/* ICON */}
                    <div className={`${iconOuterClass} ${getOpacity(item.status)}`}>
                        <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                            isLanding && item.status === "On Going"
                                ? "border-(--color-primary) bg-(--color-primary) text-white"
                                : "border-current"
                        }`}>
                            {getIcon(item.status)}
                        </div>
                    </div>

                    <div></div>

                    {/* CARD */} 
                    <RoadmapCard
                        title={item.title}
                        status={item.status}
                        description={item.description}
                        ChecklistItems={item.checklist}
                        progress={item.progress}
                        tools={item.tools}
                        density={density}
                        disabled={!item.isUnlocked && !item.isCompleted}
                        ariaLabel={`Open tasks for ${item.title}`}
                        onClick={
                            onLevelSelect && density !== "landing"
                                ? () => onLevelSelect(item)
                                : undefined
                        }
                    />
                </div>
            ))}
        </div>
    </div>
    )
}

export default RoadmapItems;
