import CardRoadmap from "../../../components/ui/CardRoadmap";
import { CircleCheckBig, Check } from 'lucide-react';

function RoadmapSection() {
    return(
        <section>
                <div className="pl-22 pt-10 flex justify-center items-center gap-10">
                    <h2 className="text-5xl font-semibold tracking-tight">Plan Your Career Path</h2>
                    <div className="flex-1 h-[3px] bg-black"></div>
                </div>
                <div>
                    <div className="flex justify-center items-center mt-25">
                        <h2 className="bg-black/10 font-semibold text-4xl p-3 px-5 mb-15 rounded-2xl leading-tight tracking-tight ">UI/UX Designer</h2>
                    </div>
                </div>

                <div className=" grid grid-cols-[5%_5%_90%] justify-center mx-23">
                    {/* CHECK ICON */}
                    <div className="bg-black/5 w-10 h-10 flex justify-center items-center rounded-full border-1 border-[var(--color-text)] text-gray-400">
                        {<CircleCheckBig />}
                    </div>

                    {/* LINE */}
                    <div className="bg-black/50 w-[3px] h-full"></div>

                    {/* CARD */}
                    <CardRoadmap
                    opacity="opacity-100"
                    check={<Check size={15}/>}
                    title="Beginner Level"
                    status="Completed"
                    description="Building the foundation of visual communication and user empathy."
                    />
                </div>
                <div className=" grid grid-cols-[5%_5%_90%] justify-center mx-23">
                    {/* CHECK ICON */}
                    <div className="bg-black/5 w-10 h-10 flex justify-center items-center rounded-full border-1 border-[var(--color-text)] text-gray-400">
                        {<CircleCheckBig />}
                    </div>

                    {/* LINE */}
                    <div className="bg-black/50 w-[3px] h-full"></div>

                    {/* CARD */}
                    <CardRoadmap
                    opacity="opacity-50"
                    check={<Check size={15}/>}
                    title="Beginner Level"
                    status="Completed"
                    description="Building the foundation of visual communication and user empathy."
                    />
                </div>
        </section>
    )
}

export default RoadmapSection;