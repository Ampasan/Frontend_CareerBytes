import Bar from "./Bar";

const barColor = {
    "Growth": "bg-[#19439F]",
    "Demand": "bg-[#A1BEFA]",
};

function GrowthDemandCard ({ year = "2025", skills = [] }) {
    const sortedSkills = [...skills].sort((a, b) => {
    const demandA = a.bars.find(bar => bar.label === "Demand")?.progress ?? 0;
    const demandB = b.bars.find(bar => bar.label === "Demand")?.progress ?? 0;
    return demandB - demandA; // descending
    });

    return (
        <>
        <div className="shadow-[0_2px_8px_1px] shadow-black/10 text-(--color-primary) rounded-xl p-7">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">Skills by Growth & Demand</h1>
            <p className="mt-2 text-xs md:text-sm mb-6">Ranking based on job market data for {year}</p>

            <div>
                {sortedSkills.map((skill, index) => {
                    const demandBar = skill.bars.find(
                        (bar) => bar.label === "Demand"
                    );

                    return (

                    <div key={skill.id} className="text-xs md:text-sm py-2">
                        <div className="flex justify-between">
                            <div className="flex gap-2 md:gap-7">
                                <p>{index + 1}</p>
                                <p>{skill.name}</p>
                            </div>
                            <p>+{demandBar?.progress}</p>
                        </div>
                        
                        {/* Growth Demand Bar */}
                        <div className="w-full grid grid-cols-2 gap-2 justify-between items-center py-2 text-xs">
                            {skill.bars.map((bar) => (
                                <div key={bar.label}>
                                    <p className="mb-1">{bar.label}</p>
                                    <Bar 
                                    progress={bar.progress} 
                                    color={barColor[bar.label]} 
                                    barHeight="h-2 md:h-2.5"/>
                                </div>
                            ))}
                        </div>
                    </div>
                    )
                })}
            </div>

            <div className="flex text-xs md:text-sm justify-center gap-7 pt-5 mt-2 border-t border-(--color-primary)/10">
                <div className="flex items-center gap-2">
                    <div className="bg-[#19439F] h-3 w-3 md:h-4 md:w-4 rounded"></div>
                    <p>Growth Rate</p>
                </div>          
                <div className="flex items-center gap-2">
                    <div className="bg-[#A1BEFA] h-3 w-3 md:h-4 md:w-4 rounded"></div>
                    <p>Market Demand</p>
                </div>                 
            </div>
        </div>
        </>
    )
}

export default GrowthDemandCard;