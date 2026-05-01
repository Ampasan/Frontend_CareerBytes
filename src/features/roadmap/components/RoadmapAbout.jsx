function RoadmapAbout() {
  return (
      <div className="w-full max-w-280 mx-auto my-8 bg-linear-to-r from-blue-600 to-blue-900 text-white rounded-2xl shadow-xl px-12 py-10 flex justify-between items-center">
        
        {/* Left Content */}
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-5 tracking-tight">
            UI/UX Designer
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed max-w-md">
            Design intuitive and engaging digital experiences by
            understanding user needs and translating them into effective
            interfaces.
          </p>
        </div>

        {/* Right Badges */}
        <div className="flex flex-col gap-5 items-start">
          <div className="bg-blue-100 text-blue-400 px-6 py-3 rounded-full font-semibold text-base shadow-md">
            Level: <span className="font-bold text-blue-700">Mid Career</span>
          </div>
          <div className="bg-blue-100 text-blue-400 px-6 py-3 rounded-full font-semibold text-base shadow-md">
            Estimate : <span className="font-bold text-blue-700">3 - 4 Years</span>
          </div>
        </div>

      </div>
  );
}

export default RoadmapAbout;