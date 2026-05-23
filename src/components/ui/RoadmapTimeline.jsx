function RoadmapTimeline({ title, description, level, estimate }) {
  const levelLabel = level || "Belum tersedia";
  const estimateLabel = estimate || "Belum tersedia";

  return (
    <div className="w-auto max-w-6xl mx-6 md:mx-auto my-8 bg-linear-to-r from-(--color-primary) to-(--color-primary-dark) text-white rounded-3xl lg:rounded-2xl shadow-xl px-8 py-10 lg:px-12 lg:py-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
      {/* Left Content */}
      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
          {title}
        </h1>
        <p className="text-(--color-primary-soft) text-base lg:text-lg leading-relaxed max-w-md">
          {description}
        </p>
      </div>

      {/* Right Badges */}
      <div className="flex flex-col gap-5 items-start">
        <div className="bg-(--color-primary-soft) text-(--color-primary-muted) px-6 py-3 rounded-full font-semibold text-base shadow-md">
          Level: <span className="font-bold text-(--color-primary-hero)">{levelLabel}</span>
        </div>
        <div className="bg-(--color-primary-soft) text-(--color-primary-muted) px-6 py-3 rounded-full font-semibold text-base shadow-md">
          Estimate : <span className="font-bold text-(--color-primary-hero)">{estimateLabel}</span>
        </div>
      </div>
    </div>
  );
}

export default RoadmapTimeline;
