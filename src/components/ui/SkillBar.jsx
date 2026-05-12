import { FaRegCheckCircle } from "react-icons/fa";
import { RiAlertLine } from "react-icons/ri";

function SkillBar ({ percentage, text, type = "Match" }) {
    const icon = percentage > 50 ? <FaRegCheckCircle size={20}/> : <RiAlertLine size={20} />

    return (
        <div className="text-(--color-primary) bg-(--color-primary)/15 w-full px-6 grid grid-cols-2 lg:grid-cols-[20%_62%_12%] text-xs lg:text-sm font-semibold justify-between">
            <div className="order-1 lg:order-0 lg:pl-1 w-full flex justify-start items-center gap-2 py-6">
                {icon}
                <p>{text}</p>
            </div>

            <div className="order-3 col-span-2 lg:col-span-1 lg:order-0 w-full flex items-center pb-5 lg:pb-0">
                <div className="flex-1 bg-[#BACCF2] h-3 rounded-full ">
                    <div className="bg-[#14357F] h-full rounded-full"
                     style={{ width: `${percentage}%` }}>
                     </div>
                </div>
            </div>

            <div className="order-2 lg:order-0 w-full flex items-center justify-end font-[1000]">
                {percentage}% {type}
            </div>
        </div>
    )
}

export default SkillBar;