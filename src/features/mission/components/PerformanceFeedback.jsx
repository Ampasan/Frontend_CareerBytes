import { Star, Target, CheckCircle, Circle } from "lucide-react";
import { mockMissions } from "../../../constants/dummy/mission";

function PerformanceFeedback() {
    const mission = mockMissions.missions.find((item) => item.id === 2);
    const result = mission?.result;

    if (!result) return null;

    return (
        <section className="w-full mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* WHAT YOU DID WELL */}
                <div className="bg-(--color-surface) border border-(--color-border) rounded-3xl p-6 sm:p-6 shadow-sm flex flex-col">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-full bg-(--color-primary) flex items-center justify-center text-white shrink-0 shadow-sm">
                            <Star size={18} className="fill-none stroke-[2.5]" />
                        </div>
                        <h2 className="text-(--color-primary) font-bold text-lg sm:text-xl">
                            What You Did Well
                        </h2>
                    </div>
                    {/* List */}
                    <ul className="space-y-3">
                        {result.whatYouDidWell?.map((item, index) => (
                            <li key={index} className="flex items-center gap-3 text-(--color-primary)/85 text-sm sm:text-base font-medium">
                                <CheckCircle size={18} className="text-(--color-primary) shrink-0 stroke-2" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* AREAS TO IMPROVE */}
                <div className="bg-(--color-surface) border border-(--color-border) rounded-3xl p-6 sm:p-6 shadow-sm flex flex-col">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-full bg-(--color-primary) flex items-center justify-center text-white shrink-0 shadow-sm">
                            <Target size={18} className="stroke-[2.5]" />
                        </div>
                        <h2 className="text-(--color-primary) font-bold text-lg sm:text-xl">
                            Areas to Improve
                        </h2>
                    </div>
                    {/* List */}
                    <ul className="space-y-3">
                        {result.areasToImprove?.map((item, index) => (
                            <li key={index} className="flex items-center gap-3 text-(--color-primary)/85 text-sm sm:text-base font-medium">
                                <Circle size={18} className="text-(--color-primary) shrink-0 stroke-2" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default PerformanceFeedback;
