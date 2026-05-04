import RoadmapItems from "../../../components/ui/RoadmapItems";
import EmptyState from "../../../components/layout/EmptyState";

function RoadmapStep({ data = [], searchTerm = "" }) {
    return(
      <section id="roadmap" className="scroll-mt-20 max-w-full mx-auto">
        {/* BAGIAN BAWAH */}
        <div className="mb-3 max-w-6xl mx-auto px-6 lg:px-8 ">
          <div className="flex justify-center items-center mt-10 lg:mt-15">
          </div>
          {/* ROADMAP ITEMS (ICON, LINE Y, CARD) */}
          <div className="mb-40">
            {data && data.length > 0 ? (
              <RoadmapItems data={data} />
            ) : (
              <EmptyState searchTerm={searchTerm} />
            )}
          </div>
        </div>
      </section>
    )
}

export default RoadmapStep;