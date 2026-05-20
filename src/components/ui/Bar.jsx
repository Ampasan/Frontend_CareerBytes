function Bar({
  progress,
  color = "bg-(--color-success-progress)",
  fontWeight = "font-semibold",
  text,
  variant = "A",
  height = "h-2",
  bgColor = "bg-(--color-primary)/20",
  textColor = "text-(--color-primary)",
  fontSize = "text-sm",
}) {
  return (
    <div className={`flex flex-col gap-1 w-full ${fontWeight}`}>

      {/* VARIANT C = ada text + persen di atas */}
      {variant === "C" && (
        <div className={`${textColor} ${fontSize} flex justify-between mb-1`}>
          <span>{text}</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}

      {/* BAR */}
      <div className="flex items-center gap-2">
        <div className={`flex-1 ${bgColor} ${height} rounded-full overflow-hidden`}>
          <div
            className={`${color} h-full rounded-full transition-all duration-500`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* VARIANT B = persen + text di kanan */}
        {variant === "B" && (
          <span className={`ml-4 text-xs ${textColor}`}>{Math.round(progress)}% {text}</span>
        )}
      </div>

    </div>
  );
}

export default Bar;
