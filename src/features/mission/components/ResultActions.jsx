import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function ResultActions() {
    const navigate = useNavigate();

    return (
        <section className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                {/* BACK TO MISSION BUTTON */}
                <button
                    onClick={() => navigate("/daily-mission")}
                    className="w-full sm:w-auto px-6 py-2.5 sm:px-8 sm:py-3 bg-(--color-primary-muted) hover:bg-(--color-primary-muted)/70 rounded-xl text-(--color-primary) font-bold text-sm sm:text-base cursor-pointer transition text-center"
                >
                    <span className="inline-block scale-115">Back to Mission</span>
                </button>

                {/* CONTINUE LEARNING BUTTON */}
                <button
                    onClick={() => navigate("/daily-mission")}
                    className="w-full sm:w-auto px-6 py-2.5 sm:px-8 sm:py-3 bg-(--color-primary) hover:bg-(--color-primary)/70 rounded-xl text-white font-bold text-sm sm:text-base cursor-pointer transition flex items-center justify-center gap-2"
                >
                    <span className="inline-flex scale-115 items-center gap-2">
                        <span>Continue Learning</span>
                        <ChevronRight size={18} className="stroke-[2.5]" />
                    </span>
                </button>
            </div>
        </section>
    );
}

export default ResultActions;
