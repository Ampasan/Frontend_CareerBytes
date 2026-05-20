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
        <div className={`${textColor} ${fontSize} flex justify-between mb-1`}>
          <span>{text}</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}

      {/* BAR */}
      <div className="flex items-center gap-2">
<<<<<<< HEAD
        <div className={`flex-1 ${bgColor} ${height} rounded-full overflow-hidden`}>
          <div
            className={`${color} h-full rounded-full transition-all duration-500`}
=======
        <div className={`flex-1 bg-(--color-primary)/20 ${barHeight} rounded-xl overflow-hidden`}>
          <div
            className={`${color} h-full rounded-xl transition-all duration-500`}
>>>>>>> 01ee7de722b63bdd116a1e5c753390ba8560091a
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
