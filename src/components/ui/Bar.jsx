function Bar({
  progress = 0,
  color = "bg-(--color-success-progress)",
  fontWeight = "font-semibold",
  text,
  variant = "A",
  height,
  barHeight,
  bgColor = "bg-(--color-primary)/20",
  textColor = "text-(--color-primary)",
  fontSize = "text-sm",
}) {
  const numericProgress = Number(progress);
  const safeProgress = Number.isFinite(numericProgress) ? numericProgress : 0;
  const progressWidth = Math.min(Math.max(safeProgress, 0), 100);
  const resolvedHeight = height || barHeight || "h-2";

  return (
    <div className={`flex flex-col gap-1 w-full ${fontWeight}`}>
      {variant === "C" && (
        <div className={`${textColor} ${fontSize} flex justify-between mb-1`}>
          <span>{text}</span>
          <span>{Math.round(safeProgress)}%</span>
        </div>
      )}

      <div className="flex items-center gap-2">
        <div className={`flex-1 ${bgColor} ${resolvedHeight} rounded-full overflow-hidden`}>
          <div
            className={`${color} h-full rounded-full transition-all duration-500`}
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>

        {variant === "B" && (
          <span className={`ml-4 text-xs ${textColor}`}>
            {Math.round(safeProgress)}% {text}
          </span>
        )}
      </div>
    </div>
  );
}

export default Bar;
