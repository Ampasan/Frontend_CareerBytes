import RoadmapCard from "./RoadmapCard";
import { getIcon, getOpacity } from "../../utils/RoadmapHelpers";

function RoadmapItems({ data }) {
    return(
    <div className="mx-25 relative">
        {/* LINE */}
        <div className="absolute left-[50px] top-0 w-[3px] h-full bg-black/50"></div>

        <div className="flex flex-col gap-15"> 
            {data.map((item, index) => (
                
                <div key={index} className="grid grid-cols-[30px_20px_1fr]">
                    {/* ICON */}
                    <div className={`bg-black/5 w-10 h-10 flex justify-center items-center rounded-full border-1 border-[var(--color-text)] text-gray-400 ${getOpacity(item.status)}`}>
                        <div className="rounded-full w-5 h-5 border flex items-center justify-center">{getIcon(item.status)}</div>
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
                    />
                </div>
            ))}
        </div>
    </div>
    )
}

export default RoadmapItems;