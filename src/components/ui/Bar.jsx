function Bar({ 
  progress, 
  color = "bg-green-400", 
  fontWeight = "font-semibold", 
  text, 
  variant = "A",
  barHeight = "h-2"
}) {
  return (
    <div className={`flex flex-col gap-1 w-full ${fontWeight}`}>

      {/* VARIANT C = ada text + persen di atas */}
      {variant === "C" && (
        <div className="text-(--color-primary) flex justify-between text-sm mb-1">
          <span>{text}</span>
          <span>{progress}%</span>
        </div>
      )}

      {/* BAR */}
      <div className="flex items-center gap-2">
        <div className={`flex-1 bg-(--color-primary)/20 ${barHeight} rounded-xl overflow-hidden`}>
          <div
            className={`${color} h-full rounded-xl transition-all duration-500`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* VARIANT B = persen + text di kanan */}
        {variant === "B" && (
          <span className="ml-4 text-xs text-(--color-primary)">{progress}% {text}</span>
        )}
      </div>

    </div>
  );
}

export default Bar;