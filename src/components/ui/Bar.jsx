function Bar({ progress, text, variant = "A" }) {
  return (
    <div className="flex flex-col gap-1 w-full">

      {/* VARIANT C = ada text + persen di atas */}
      {variant === "C" && (
        <div className="flex justify-between text-sm font-semibold mb-1">
          <span>{text}</span>
          <span>{progress}%</span>
        </div>
      )}

      {/* BAR */}
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-black/20 h-2 rounded overflow-hidden">
          <div
            className="bg-black/50 h-full rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* VARIANT B = persen + text di kanan */}
        {variant === "B" && (
          <span className="ml-4 text-xs font-semibold">{progress}% {text}</span>
        )}
      </div>

    </div>
  );
}

export default Bar;