import SearchBar from "../../../components/ui/SearchBar";
import FilterRole from "../../../components/ui/FilterRole";

function RoadmapHeader({ onSearch, onSelectRole }) {
  return (
    <div className="w-full relative -mt-30">
      
      {/* HERO */}
      <div className="relative bg-(--color-primary-hero) pt-40 lg:pt-50 pb-32 text-center text-white px-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
          Plan Your Career Path
        </h1>

        <p className="text-sm sm:text-base lg:text-lg text-(--color-primary-soft)">
          A clear path to help you build the right skills for your career goals.
        </p>

        {/* SEARCH */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-full px-6 flex justify-center">
          <div className="w-full max-w-4xl">
            <SearchBar onSearch={onSearch} />
          </div>
        </div>
      </div>

      {/* SECTION BAWAH */}
      <div className="bg-(--color-surface) pt-14 pb-10 px-6">
        <FilterRole onSelectRole={onSelectRole} />
      </div>

    </div>
  );
}

export default RoadmapHeader;
