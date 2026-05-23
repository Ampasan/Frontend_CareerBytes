import Checklist from "./Checklist";
import { Check } from "lucide-react";

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

const normalizeTool = (tool) => {
    if (typeof tool === "string") {
        const isImageUrl = /^https?:\/\//.test(tool);
        return {
            name: isImageUrl ? "Tool" : tool,
            iconUrl: isImageUrl ? tool : "",
        };
    }

    return {
        name: tool?.name || "Tool",
        iconUrl: tool?.iconUrl || "",
    };
};

const getToolFallbackLabel = (name = "") =>
    name
        .split(/\s+|\/|-/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase() || "?";

function LandingChecklistItem({ item, variant }) {
    return (
        <div className={`flex min-h-9 items-center gap-2 rounded-sm bg-(--color-surface) px-3 py-2 text-xs leading-normal ${variant.checklist}`}>
            <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-current">
                {item.isCheck && <Check size={12} strokeWidth={2.4} />}
            </div>
            <p className="min-w-0 truncate font-semibold">{item.text}</p>
        </div>
    );
}

function ToolIcon({ tool, variant, density = "default", index }) {
    const normalizedTool = normalizeTool(tool);
    const sizeClass = density === "landing" ? "h-11 w-11" : "w-11.25 h-11.25";
    const shadowClass = density === "landing" ? "shadow-none" : "shadow-sm";

    return (
        <div key={`${normalizedTool.name}-${index}`} className={`${sizeClass} ${variant.tool} ${shadowClass} rounded-sm flex items-center justify-center overflow-hidden hover:scale-110 transition-transform cursor-pointer`}>
            {normalizedTool.iconUrl ? (
                <img src={normalizedTool.iconUrl} alt={normalizedTool.name} className="h-full w-full object-contain" />
            ) : (
                <span className="px-1 text-[10px] font-bold leading-tight text-center text-(--color-primary)">
                    {getToolFallbackLabel(normalizedTool.name)}
                </span>
            )}
        </div>
    );
}

function RoadmapCard({
    title,
    status,
    description,
    ChecklistItems,
    progress,
    tools,
    density = "default",
    onClick,
    disabled = false,
    ariaLabel,
}) {
    const variant = getRoadmapVariant(status);
    const isLanding = density === "landing";
    const isInteractive = typeof onClick === "function" && !isLanding;
    const visibleChecklist = isLanding ? ChecklistItems?.slice(0, 2) : ChecklistItems;
    const visibleTools = isLanding ? tools?.slice(0, 2) : tools;

    if (isLanding) {
        return (
            <div className={`${variant.card} grid min-h-55 lg:grid-cols-[76%_24%] items-center rounded-lg gap-5 px-7 py-7 lg:px-12 lg:py-8 shadow-none`}>
                <div className="order-1 flex flex-col gap-3 lg:pr-10">
                    <div className="flex flex-wrap items-center gap-4">
                        <h2 className={`font-semibold text-lg sm:text-xl leading-tight tracking-tight ${variant.title}`}>{title}</h2>
                        {status && (
                            <h2 className={`${variant.chip} rounded-sm px-3 py-1 text-xs font-bold leading-none`}>{status}</h2>
                        )}
                    </div>
                    <p className="mb-8 text-sm leading-snug">{description}</p>
                    <div className="flex flex-col gap-3">
                        {visibleChecklist?.map((item, index) => (
                            <LandingChecklistItem key={index} item={item} variant={variant} />
                        ))}
                    </div>
                </div>

                <div className={`order-2 flex h-full flex-col justify-between gap-6 text-sm font-bold ${variant.sideText}`}>
                    <div className="flex flex-col gap-3">
                        <h3>Tools :</h3>
                        <div className="flex gap-2">
                            {visibleTools && visibleTools.length > 0 ? (
                                visibleTools.map((tool, index) => (
                                    <ToolIcon key={index} tool={tool} variant={variant} density="landing" index={index} />
                                ))
                            ) : (
                                <>
                                    <div className={`h-11 w-11 ${variant.tool} rounded-sm`}></div>
                                    <div className={`h-11 w-11 ${variant.tool} rounded-sm`}></div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3>Progress</h3>
                        <div className="flex items-center gap-2">
                            <div className={`flex h-1.5 w-36 items-center overflow-hidden rounded ${variant.progressTrack}`}>
                                <div className={`${variant.progressFill} h-1.5 rounded`} style={{width: `${progress}%`}}></div>
                            </div>
                            <p className={`min-w-10 text-right text-sm font-bold ${variant.progressText}`}>{progress}%</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const CardElement = isInteractive ? "button" : "div";

    return(
        <CardElement
            type={isInteractive ? "button" : undefined}
            disabled={isInteractive ? disabled : undefined}
            aria-label={isInteractive ? ariaLabel : undefined}
            onClick={isInteractive ? onClick : undefined}
            className={`${variant.card} grid w-full lg:grid-cols-[80%_20%] justify-center items-center rounded-lg gap-5 lg:gap-0 px-6 py-8 lg:px-15 lg:py-10 shadow-[0_10px_15px_-3px_var(--color-shadow-card),0_4px_6px_-4px_var(--color-shadow-card)] transition text-left font-[inherit] border-0 appearance-none ${
                isInteractive && !disabled
                    ? "cursor-pointer hover:scale-101 focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:ring-offset-2"
                    : ""
            } ${isInteractive && disabled ? "cursor-not-allowed" : ""}`}
        >
            
            {/* BAGIAN KIRI */}
            <div className="order-1 flex flex-col gap-3 lg:mr-10">
                {/* ATAS: TITLE, STATUS, DESCRIPTION*/}
                <div className="flex flex-col sm:flex-row justify-between lg:justify-start gap-2 lg:gap-6 items-start sm:items-center">
                    <h2 className={`font-semibold text-base sm:text-lg lg:text-2xl leading-tight tracking-tight ${variant.title}`}>{title}</h2>
                    {status && (
                        <h2 className={`${variant.chip} px-2 py-0.5 text-xs sm:text-sm lg:text-md lg:px-3 rounded font-bold flex items-center `}>{status}</h2>)}
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
                    textClassName="font-semibold"
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
                                <ToolIcon key={index} tool={tool} variant={variant} index={index} />
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
        </CardElement>
    )
}

export default RoadmapCard;
