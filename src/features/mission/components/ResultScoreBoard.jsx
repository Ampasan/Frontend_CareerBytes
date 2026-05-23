import { Star } from "lucide-react";

function ResultScoreBoard({ result }) {
    const score = Math.max(0, Math.min(100, Math.round(result?.score ?? 0)));
    const stars = Math.max(0, Math.min(5, Math.round(result?.stars ?? 0)));
    const radius = 82;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference - (score / 100) * circumference;

    return (
        <section className="w-full">
            <div className="bg-(--color-surface-muted) border border-(--color-primary-border-strong) rounded-4xl shadow-[0_10px_30px_var(--color-shadow-subtle)] px-5 py-4 sm:px-8 sm:py-2">
                <div className="flex flex-col lg:flex-row items-center lg:items-center gap-6 lg:gap-12">
                    {/* LEFT - SCORE CIRCLE */}
                    <div className="shrink-0 lg:ml-10">
                        <div className="relative flex items-center justify-center">
                            
                            {/* CUSTOM CIRCLE */}
                            <div className="relative w-50 h-50 sm:w-60 sm:h-60">
                                <svg
                                    viewBox="0 0 220 220"
                                    className="w-full h-full"
                                >
                                    <circle
                                        cx="110"
                                        cy="110"
                                        r={radius}
                                        fill="none"
                                        stroke="var(--color-progress-track)"
                                        strokeWidth="18"
                                        strokeLinecap="round"
                                    />

                                    <circle
                                        cx="110"
                                        cy="110"
                                        r={radius}
                                        fill="none"
                                        stroke="var(--color-primary)"
                                        strokeWidth="18"
                                        strokeLinecap="round"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={progressOffset}
                                        transform="rotate(-90 110 110)"
                                    />
                                </svg>

                                <svg
                                    viewBox="0 0 220 220"
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <circle
                                        cx="110"
                                        cy="110"
                                        r="55"
                                        fill="var(--color-surface-muted)"
                                        stroke="var(--color-primary)"
                                        strokeOpacity="0"
                                    />
                                </svg>

                                {/* CENTER TEXT */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <h1 className="text-[3.1rem] leading-none font-bold text-(--color-primary)">
                                        {score}
                                    </h1>

                                    <p className="text-(--color-primary-muted) text-[1.1rem] mt-1">
                                        / 100
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="flex flex-col justify-center text-center lg:text-left pb-10 w-full">
                        {/* TITLE */}
                        <h1 className="text-(--color-primary) font-bold text-[2rem] sm:text-[2rem] leading-tight">
                            {result?.rating}
                        </h1>

                        {/* SUMMARY */}
                        <p className="text-(--color-primary) text-sm sm:text-[1rem] mt-3 max-w-3xl leading-relaxed">
                            {result?.summary}
                        </p>

                        {/* STARS */}
                        <div className="flex items-center justify-center lg:justify-start gap-2 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={25}
                                    className={
                                        star <= stars
                                            ? "fill-(--color-primary) text-(--color-primary)"
                                            : "text-(--color-primary-icon-muted)"
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ResultScoreBoard;
