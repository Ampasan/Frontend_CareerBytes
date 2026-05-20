import StatCard from "../../../components/ui/StatCard";
import PeriodDropdown from "../../../components/ui/PeriodDropdown";
import GrowthDemandCard from "../../../components/ui/GrowhtDemandCard";
import TrendsSearchBar from "../../../components/ui/TrendsSearchBar";


function TrendsMain({
  periods,
  selectedPeriod,
  setSelectedPeriod,
  stats,
  loading,
  error,
  skillsData,
  handleSearch,

}) {
  return (
    <>
      <div className="w-full relative -mt-30 mb-5 bg-(--color-primary)">
        <div className="max-w-6xl mx-auto relative pt-40 pb-18 md:pb-20 px-6">

          {/* Judul + Dropdown */}
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-2">
                Trending Skills
              </h1>
              <p className="text-xs sm:text-sm ml-1">
                Explore the most in-demand skills in the job market
              </p>
            </div>
            <PeriodDropdown
              periods={periods}
              value={selectedPeriod}
              onChange={setSelectedPeriod}
              variant="main"
            />
          </div>

          {/* Cards - skeleton saat loading */}
          <div className="md:max-w-3xl flex flex-row flex-wrap gap-5 mt-8">
            {loading
              ? Array(3).fill(0).map((_, i) => (
                  <div key={i} className="flex-1 h-34.5 bg-white/20 rounded-2xl animate-pulse" />
                ))
              : error ? (
                <div className="flex items-center gap-2 text-xl py-4 min-h-34.5 font-semibold text-white">
                  <p className="w-xl">{error}</p>
                </div>
              ) : 
              stats.map((stat) => (
                  <StatCard
                    key={stat.id}
                    icon={stat.icon}
                    title={stat.title}
                    content={stat.content}
                    desc={stat.desc}
                  />
                ))
            }
          </div>

          {/* Search Bar */}
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 px-6 w-full flex justify-center">
            <div className="w-full max-w-6xl mx-auto">
              <TrendsSearchBar onSearch={handleSearch} />
            </div>
          </div>

        </div>
      </div>

      {/* Growth & Demand */}
      <div className="max-w-6xl mx-auto px-7 md:px-2 py-10 md:py-20">
        {skillsData && (
          <GrowthDemandCard
            year={skillsData.year}
            skills={skillsData.skills}
          />
        )}
      </div>
    </>
  );
}

export default TrendsMain;