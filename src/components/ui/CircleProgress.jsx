function CircleProgress({ percentage = 0}) {
  const radius = 100;
  const strokeWidth = 13;

  // Radius bersih
  const normalizedRadius = radius - strokeWidth / 2;

  // Keliling lingkaran
  const circumference = 2 * Math.PI * normalizedRadius;

  // Progress Bar yang disembunyikan
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center my-4">
        <svg
        viewBox="0 0 200 200"
        className="w-40 h-40 lg:w-50 lg:h-50 -rotate-90"
        >
            {/* Background circle */}
            <circle
                cx={radius}
                cy={radius}
                r={normalizedRadius}
                stroke="var(--color-primary)"
                strokeOpacity=".3"
                fill="transparent"
                strokeWidth={strokeWidth}
            />

            {/* Progress circle */}
            <circle
                cx={radius}
                cy={radius}
                r={normalizedRadius}
                stroke="var(--color-primary)"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{
                transition: "stroke-dashoffset 0.5s ease"
                }}
            />
        </svg>

        {/* Text */}
        <div className="absolute text-center flex flex-col gap-2">
            <h1 className="text-4xl lg:text-5xl font-bold text-blue-600">
                {percentage}%
            </h1>

            <p className="text-[var(--color-primary)] text-xs lg:text-sm font-bold">
                OVERALL MATCH
            </p>
        </div>
    </div>
  );
}

export default CircleProgress;