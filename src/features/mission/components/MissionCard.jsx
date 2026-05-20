import { Clock3, CircleCheck } from "lucide-react"
import Button from "../../../components/ui/Button"
import { mockMissions } from "../../../constants/dummy/mission"
import { useNavigate } from "react-router-dom"

function MissionCard() {
    const navigate = useNavigate();

    const difficultyStyle = {
        Easy: "bg-(--color-primary)/15 text-(--color-primary)",
        Medium: "bg-(--color-primary)/30 text-(--color-primary)",
        Hard: "bg-(--color-primary) text-(--color-white)",
    }

    return (
        <section className="mt-16 lg:mt-24 bg-(--color-primary) py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-5">

                {/* Mission Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {mockMissions.missions.map((mission) => (
                        <div
                            key={mission.id}
                            className={`rounded-2xl p-5 lg:p-6 pb-10 lg:pb-12 shadow-sm transition-all ${mission.isCompleted ? "bg-(--color-mission-card-completed)/90" : "bg-(--color-surface)"}`}
                        >
                            <div>
                                {/* Top Label */}
                                <div className={`w-full rounded-full px-2.5 py-1 text-[10px] lg:text-xs mb-5 ${mission.isCompleted ? "bg-(--color-mission-label-completed) text-(--color-primary)" : "bg-(--color-mission-label) text-(--color-primary)"}`}>
                                    {mission.role}
                                </div>

                                {/* Title */}
                                <h2 className={`text-base lg:text-lg leading-snug font-bold mb-5 ${mission.isCompleted ? "text-(--color-primary) line-through" : "text-(--color-primary)"}`}>
                                    {mission.title}
                                </h2>

                                {/* Info */}
                                <div className="flex items-center justify-between mb-5">

                                    {/* Duration */}
                                    <div className="flex items-center gap-2 text-(--color-primary)">
                                        <Clock3 size={16} strokeWidth={2.2} />

                                        <span className="text-xs lg:text-sm font-medium">
                                            {mission.estimateTime}
                                        </span>
                                    </div>

                                    {/* Difficulty */}
                                    <div className={`px-3 py-1 rounded-full text-[10px] lg:text-xs font-medium ${difficultyStyle[mission.level] || difficultyStyle.Easy}`}>
                                        {mission.level}
                                    </div>
                                </div>
                            </div>

                            {/* Button */}
                            {mission.isCompleted ? (
                                <div className="h-9.5 rounded-lg bg-(--color-primary-muted-strong) flex items-center justify-center gap-2 text-(--color-primary) font-large text-base">
                                    <CircleCheck size={16} />
                                    Completed
                                </div>
                            ) : (
                                <Button 
                                    text="Start Task"
                                    className="w-full h-10 flex items-center justify-center rounded-lg text-base font-large bg-(--color-primary) hover:bg-(--color-primary)/70 text-white"
                                    onClick={() => {
                                        if (mission.title === "Practice Wireframing with Figma") {
                                            navigate("/daily-mission/task");
                                        }
                                    }}
                                />
                            )}
                        </div>
                    ))}

                </div>

            </div>
        </section>
    )
}

export default MissionCard
