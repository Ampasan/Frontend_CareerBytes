import { mockMissions } from "../../../constants/dummy/mission";

function SkillBreakdown() {
    const mission = mockMissions.missions.find((item) => item.id === 2);
    const skillBreakdown = mission?.result?.skillBreakdown;

    if (!skillBreakdown) return null;

    // Convert object to array for easier mapping
    const skills = Object.entries(skillBreakdown).map(([name, value]) => ({
        name,
        value,
    }));

    return (
        <section className="w-full">
            {/* TITLE */}
            <h2 className="text-(--color-primary) font-bold text-2xl sm:text-2xl mb-4">
                Skill Breakdown
            </h2>

            {/* GRID (2x2 on desktop, stacked on mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                    <div
                        key={index}
                        className="bg-(--color-surface) border border-(--color-primary) rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between"
                    >
                        <div>
                            {/* Skill Name */}
                            <p className="text-(--color-primary)/90 font-bold text-sm sm:text-sm mb-4">
                                {skill.name}
                            </p>

                            {/* Percentage */}
                            <h1 className="text-(--color-primary) font-bold text-3xl sm:text-[1.9rem] leading-none mb-4">
                                {skill.value}%
                            </h1>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-2/3 bg-(--color-primary-soft) h-2 rounded-full overflow-hidden">
                          <div
                                className="bg-(--color-primary) h-full rounded-full transition-all duration-1000"
                                style={{ width: `${skill.value}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default SkillBreakdown;
