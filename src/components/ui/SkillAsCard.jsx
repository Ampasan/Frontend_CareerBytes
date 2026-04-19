import { CircleQuestionMark } from "lucide-react";
import RoadmapCard from "./RoadmapCard";

function SkillAsCard() {
    return(
        <div className="bg-white p-5 rounded-xl flex flex-col gap-3">
            <div className="bg-black w-[12%] rounded-sm">
                <div className="flex justify-center items-center">
                    <CircleQuestionMark color="#ffffff" size={20}/>
                </div>
            </div>
            <h2 className="font-semibold text-2xl">Skill Assesment</h2>
            <div className="bg-black/15 px-5 py-3 rounded-xl text-sm">
                <h3 className="font-semibold text-black/50">Question 07 of 20</h3>
                <h3 className="font-semibold text-black tracking-tight leading-tight mb-10">How familiar are you with User Research?</h3>
                <div className="flex items-center justify-between">
                    <h3 className="bg-white px-4 py-1 rounded font-semibold text-black">1</h3>
                    <h3 className="bg-white px-4 py-1 rounded font-semibold text-black">2</h3>
                    <h3 className="bg-white px-4 py-1 rounded font-semibold text-black">3</h3>
                    <h3 className="bg-black/30 px-4 py-1 rounded font-semibold text-black">4</h3>
                    <h3 className="bg-white px-4 py-1 rounded font-semibold text-black">5</h3>
                </div>
            </div>
        </div>
    )
}

export default SkillAsCard;