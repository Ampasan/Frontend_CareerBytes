import RoadmapCard from "./RoadmapCard";
import { getIcon, getOpacity } from "../../utils/RoadmapHelpers";

function RoadmapItems({ data }) {
    if (!data || data.length === 0) return null;

    return(
    <div className="relative">
        {/* LINE */}
        <div className="absolute left-5 lg:left-6.25 top-0 w-0.5 md:w-0.75 h-full bg-(--color-primary)"></div>

        <div className="flex flex-col gap-10 md:gap-15"> 
            {data.map((item, index) => (
                
                <div key={index} className="grid grid-cols-[40px_10px_1fr] lg:grid-cols-[50px_20px_1fr]">
                    {/* ICON */}
                    <div className={`bg-(--color-black)/5 w-10 h-10 flex justify-center items-center rounded-full border-2 text-(--color-primary) ${getOpacity(item.status)}`}>
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
                        tools={item.tools}
                    />
                </div>
            ))}
        </div>
    </div>
    )
}

export default RoadmapItems;
