import { CircleQuestionMark } from "lucide-react";
import RoadmapCard from "./RoadmapCard";
import Bar from "./Bar";

function SkillAsCard() {
    return(
        <div className="bg-white p-6 rounded-xl flex flex-col gap-3 shadow-md shadow-black/10">
            {/* ICON TANDA TANYA */}
            <div className="bg-[var(--color-primary)] w-[12%] rounded-sm">
                <div className="flex justify-center items-center">
                    <CircleQuestionMark color="#ffffff" size={20}/>
                </div>
            </div>
            {/* CARD TITLE */}
            <h2 className="font-semibold text-2xl text-[var(--color-primary)]">Skill Assesment</h2>
            {/* CARD CONTENT */}
            <div className="bg-[var(--color-primary)]/20 px-5 py-3 rounded-xl text-sm">
                <h3 className="font-semibold text-[var(--color-primary)]/50">Question 07 of 20</h3>
                <h3 className="lg:max-w-[200px] font-semibold text-[var(--color-primary)] tracking-tight leading-tight mb-10">How familiar are you with User Research?</h3>
                <div className="flex items-center justify-between mb-5">
                    <h3 className="bg-white px-4 py-1 rounded font-semibold text-black">1</h3>
                    <h3 className="bg-white px-4 py-1 rounded font-semibold text-black">2</h3>
                    <h3 className="bg-white px-4 py-1 rounded font-semibold text-black">3</h3>
                    <h3 className="bg-[var(--color-secondary)] px-4 py-1 rounded font-semibold text-black">4</h3>
                    <h3 className="bg-white px-4 py-1 rounded font-semibold text-black">5</h3>
                </div>
            </div>
            {/* CARD BAR */}
            <Bar variant="B" progress={75} text="Gap Identified"/>
        </div>
    )
}

export default SkillAsCard;