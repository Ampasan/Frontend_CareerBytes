import React from "react";

function RoadmapTimeline({ title, description, level, estimate }) {
  return (
    <div className="w-full max-w-6xl mx-auto my-8 bg-linear-to-r from-blue-600 to-blue-900 text-white rounded-3xl lg:rounded-2xl shadow-xl px-6 py-10 lg:px-12 lg:py-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
      {/* Left Content */}
      <div className="max-w-3xl">
        <h1 className="text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
          {title}
        </h1>
        <p className="text-blue-100 text-base lg:text-lg leading-relaxed max-w-md">
          {description}
        </p>
      </div>

      {/* Right Badges */}
      <div className="flex flex-col gap-5 items-start">
        <div className="bg-blue-100 text-blue-400 px-6 py-3 rounded-full font-semibold text-base shadow-md">
          Level: <span className="font-bold text-blue-700">{level}</span>
        </div>
        <div className="bg-blue-100 text-blue-400 px-6 py-3 rounded-full font-semibold text-base shadow-md">
          Estimate : <span className="font-bold text-blue-700">{estimate}</span>
        </div>
      </div>
    </div>
  );
}

export default RoadmapTimeline;
