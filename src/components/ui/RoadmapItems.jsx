import RoadmapCard from "./RoadmapCard";
import { getIcon, getOpacity } from "../../utils/RoadmapHelpers";

function RoadmapItems({ data }) {
    return(
    <div className="relative">
        {/* LINE */}
        <div className="absolute left-[25px] lg:left-[50px] top-0 w-[2px] md:w-[3px] h-full bg-[var(--color-primary)]"></div>

        <div className="flex flex-col gap-10 md:gap-15"> 
            {data.map((item, index) => (
                
                <div key={index} className="grid grid-cols-[10px_2px_1fr] lg:grid-cols-[30px_20px_1fr]">
                    {/* ICON */}
                    <div className={`bg-black/5 w-10 h-10 flex justify-center items-center rounded-full border-2 bg-[var(--color-primary)] text-[var(--color-primary)] ${getOpacity(item.status)}`}>
                        <div className="rounded-full w-5 h-5 border border-2 flex items-center justify-center">{getIcon(item.status)}</div>
                    </div>

                    <div></div>

                    {/* CARD */} 
                    <RoadmapCard
                        opacity={getOpacity(item.status)}
                        title={item.title}
                        status={item.status}
                        description={item.description}
                        ChecklistItems={item.checklist}
                        progress={item.progress}
                        tools={item.tools}
                    />
                </div>
            ))}
        </div>
    </div>
    )
}

export default RoadmapItems;