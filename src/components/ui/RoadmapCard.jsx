import Checklist from "./Checklist";

const roadmapVariants = {
    completed: {
        card: "bg-(--color-roadmap-completed-bg) text-(--color-white)",
        title: "text-(--color-white)",
        chip: "bg-(--color-roadmap-chip-bg) text-(--color-black)",
        checklist: "text-(--color-roadmap-check-text)",
        tool: "bg-(--color-surface)",
        progressTrack: "bg-(--color-surface)",
        sideText: "text-(--color-white)",
        progressText: "text-(--color-white)",
        progressFill: "bg-(--color-roadmap-progress)",
    },
    ongoing: {
        card: "bg-(--color-roadmap-ongoing-bg) text-(--color-roadmap-active-text)",
        title: "text-(--color-roadmap-active-text)",
        chip: "bg-(--color-roadmap-chip-bg)/80 text-(--color-roadmap-active-text)",
        checklist: "text-(--color-roadmap-check-text)",
        tool: "bg-(--color-surface)",
        progressTrack: "bg-(--color-surface)",
        sideText: "text-(--color-roadmap-active-text)",
        progressText: "text-(--color-roadmap-active-text)",
        progressFill: "bg-(--color-roadmap-progress)",
    },
    locked: {
        card: "bg-(--color-roadmap-locked-bg) text-(--color-roadmap-locked-text)",
        title: "text-(--color-roadmap-locked-text)",
        chip: "bg-(--color-roadmap-chip-bg)/70 text-(--color-roadmap-locked-text)",
        checklist: "text-(--color-roadmap-locked-text)",
        tool: "bg-(--color-surface)/70 opacity-60",
        progressTrack: "bg-(--color-roadmap-progress-track)",
        sideText: "text-(--color-roadmap-locked-text)",
        progressText: "text-(--color-roadmap-locked-text)",
        progressFill: "bg-(--color-roadmap-progress)",
    },
};

function getRoadmapVariant(status) {
    if (status === "Completed") return roadmapVariants.completed;
    if (status === "On Going") return roadmapVariants.ongoing;
    return roadmapVariants.locked;
}

function RoadmapCard({title, status, description, ChecklistItems, progress, tools}) {
    const variant = getRoadmapVariant(status);

    return(
        <div className={`${variant.card} grid lg:grid-cols-[80%_20%] justify-center items-center rounded-lg gap-5 lg:gap-0 px-6 py-8 lg:px-15 lg:py-10 shadow-[0_10px_15px_-3px_var(--color-shadow-card),0_4px_6px_-4px_var(--color-shadow-card)] hover:scale-101 transition`}>
            
            {/* BAGIAN KIRI */}
            <div className="order-1 flex flex-col gap-3 lg:mr-10">
                {/* ATAS: TITLE, STATUS, DESCRIPTION*/}
                <div className="flex flex-col sm:flex-row justify-between lg:justify-start gap-2 lg:gap-6 items-start sm:items-center">
                    <h2 className={`font-semibold text-base sm:text-lg lg:text-2xl leading-tight tracking-tight ${variant.title}`}>{title}</h2>
                    {status && (
                        <h2 className={`${variant.chip} px-2 py-0.5 text-xs sm:text-sm lg:text-md lg:px-3 rounded font-semibold flex items-center `}>{status}</h2>)}
                </div>
                <p className="mb-5 lg:mb-10 text-sm">{description}</p>
                {/* BAWAH: CHECKLIST */}
                {ChecklistItems?.map((item, index) => (
                    <Checklist 
                    key={index}
                    bgColor="var(--color-surface)"
                    bgColor2={variant.checklist}
                    isCheck={item.isCheck}
                    text={item.text}
                    />
                ))}
            </div>

            {/* BAGIAN KANAN */}
            <div className={`order-2 text-sm h-full flex flex-col font-bold justify-between ${variant.sideText} gap-4 lg:gap-0`}>
                {/* ATAS: TOOLS + KOTAK */}
                <div className="flex flex-col gap-2">
                    <h3 className="">Tools :</h3>
                    <div className="flex gap-2">
                        {tools && tools.length > 0 ? (
                            tools.map((tool, index) => (
                                <div key={index} className={`w-11.25 h-11.25 ${variant.tool} rounded-sm flex items-center justify-center overflow-hidden shadow-sm hover:scale-110 transition-transform cursor-pointer`}>
                                    <img src={tool} alt="tool icon" className="w-full h-full object-contain" />
                                </div>
                            ))
                        ) : (
                            <>
                                <div className={`w-11.25 h-11.25 ${variant.tool} rounded-sm`}></div>
                                <div className={`w-11.25 h-11.25 ${variant.tool} rounded-sm`}></div>
                                <div className={`w-11.25 h-11.25 ${variant.tool} rounded-sm`}></div>
                            </>
                        )}
                    </div>
                </div>
                {/* BAWAH: PROGRESS + BAR */}
                <div className="flex flex-col gap-1">
                    <h3>Progress</h3>
                    <div className="flex items-center gap-2">
                        {/* BAR */}
                        <div className={`flex-1 flex items-center ${variant.progressTrack} h-1.5 rounded overflow-hidden`}>
                            <div className={`${variant.progressFill} h-2 w-full rounded`} 
                            style={{width: `${progress}%`}}>
                            </div>
                        </div>
                        <p className={`min-w-9.25 font-bold text-sm text-right ${variant.progressText}`}>{progress}%</p>
                        {/* <Bar variant="B" progress={75} /> */} {/* BAR COMPONENT (OPSIONAL) */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoadmapCard;
