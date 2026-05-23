import { CircleQuestionMark } from "lucide-react";
import RoadmapCard from "./RoadmapCard";
import Bar from "./Bar";

function SkillAsCard() {
    return(
        <div className="bg-(--color-surface) p-6 rounded-xl flex flex-col gap-3 shadow-[0_4px_6px_-1px_var(--color-shadow-subtle),0_2px_4px_-2px_var(--color-shadow-subtle)]">
            {/* ICON TANDA TANYA */}
            <div className="bg-(--color-primary) w-[12%] rounded-sm">
                <div className="flex justify-center items-center">
                    <CircleQuestionMark color="var(--color-white)" size={20}/>
                </div>
            </div>
            {/* CARD TITLE */}
            <h2 className="font-semibold text-2xl text-(--color-primary)">Skill Assessment</h2>
            {/* CARD CONTENT */}
            <div className="bg-(--color-primary)/20 px-5 py-3 rounded-xl text-sm">
                <h3 className="font-semibold text-(--color-primary)/50">Question 07 of 20</h3>
                <h3 className="lg:max-w-50 font-semibold text-(--color-primary) tracking-tight leading-tight mb-10">How familiar are you with User Research?</h3>
                <div className="flex items-center justify-between mb-5">
                    <h3 className="bg-(--color-surface) px-4 py-1 rounded font-semibold text-black">1</h3>
                    <h3 className="bg-(--color-surface) px-4 py-1 rounded font-semibold text-black">2</h3>
                    <h3 className="bg-(--color-surface) px-4 py-1 rounded font-semibold text-black">3</h3>
                    <h3 className="bg-(--color-secondary) px-4 py-1 rounded font-semibold text-black">4</h3>
                    <h3 className="bg-(--color-surface) px-4 py-1 rounded font-semibold text-black">5</h3>
                </div>
            </div>
            {/* CARD BAR */}
            <Bar variant="B" progress={75} text="Gap Identified"/>
        </div>
    )
}

export default SkillAsCard;
