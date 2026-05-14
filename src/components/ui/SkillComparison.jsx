import Bar from "./Bar";
import { MdInsertChartOutlined } from "react-icons/md";
import SkillBar from "./SkillBar";


function SkillComparison ({ data }) {
    return(
        <>
        <div className="mx-auto w-full flex flex-col items-center lg:items-start py-6 gap-2 lg:gap-5 rounded-xl border border-[var(--color-primary)]">

            <div className="flex flex-wrap w-full justify-center sm:justify-between md:px-5 lg:px-6 gap-2">
                <div className="flex justify-center items-center gap-2 ">
                    <MdInsertChartOutlined size={32} color="var(--color-primary)"/>
                    <h1 className="text-xl lg:text-3xl font-bold text-[var(--color-primary)]">
                        Skill Comparison
                    </h1>
                </div>
                <div className="flex items-center gap-4 text-(--color-primary) text-xs font-semibold">
                    <div className="flex gap-1 items-center">
                        <div className="bg-[#14357F] h-2 w-2 lg:h-3.5 lg:w-3.5 rounded-full"></div>
                        <p>YOUR SKILL</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        <div className="bg-[#BACCF2] h-2 w-2 lg:h-3.5 lg:w-3.5 rounded-full"></div>
                        <p>TARGET SKILL</p>
                    </div>
                </div>
            </div>
            
            <div className="w-full flex flex-col gap-1 lg:gap-0.5">
                {data.map((item, index) => (
                    <SkillBar
                    key={index} 
                    percentage={item.percentage} 
                    text={item.text}
                    type={item.type} 
                    />
                ))}

            </div>
            

        </div>
        </>
    )
}

export default SkillComparison;