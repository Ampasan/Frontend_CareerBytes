import { Dot } from "lucide-react";


function SkillComparison () {
    return(
        <>
        <div className="mx-auto flex flex-col items-center lg:items-start px-9 py-6 pb-12 gap-2 rounded-xl border border-[var(--color-primary)]">
            <div className="flex flex-wrap justify-center gap-2 lg:gap-35">
                <h1 className="text-2xl lg:text-4xl font-bold text-[var(--color-primary)]">Skill Comparison</h1>
                <div className="flex items-center gap-6 text-xs lg:text-sm font-semibold">
                    <div className="flex gap-2 items-center">
                        <div className="bg-[var(--color-primary)] h-2 w-2 lg:h-3.5 lg:w-3.5 rounded-full"></div>
                        <p>YOUR SKILL</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="bg-[var(--color-primary)]/20 h-2 w-2 lg:h-3.5 lg:w-3.5 rounded-full"></div>
                        <p>TARGET SKILL</p>
                    </div>

                </div>
            </div>
            <div className="bg-red-400 w-full">
                bar
            </div>

        </div>
        </>
    )
}

export default SkillComparison;