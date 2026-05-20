import RoadmapItems from "../../../components/ui/RoadmapItems";
import { mockRoadmaps } from "../../../constants/dummy/roadmap";


function RoadmapSection() {
    const featuredRoadmap = mockRoadmaps["UI/UX Designer"];
    const roadmapData = featuredRoadmap?.steps ?? [];

    return(
      <section id="roadmap" className="scroll-mt-20 max-w-md lg:max-w-full mx-auto">
        {/* TEXT + LINE X */}
        <div className="px-6 lg:pl-22 pt-10 flex justify-center items-center gap-5 lg:gap-10">
          <h2 className="text-(--color-primary) text-2xl sm:text-3xl lg:text-5xl font-semibold tracking-tight lg:whitespace-normal text-center lg:text-left">Plan Your Career Path</h2>
          <div className="hidden lg:block flex-1 h-0.75 bg-(--color-primary) "></div> 
        </div>
        {/* BAGIAN BAWAH */}
        <div className="mb-3 max-w-6xl mx-auto px-6 lg:px-8 ">
          <div className="flex justify-center items-center mt-10 lg:mt-15">
            <h2 className="border border-(--color-primary) font-semibold text-xl sm:text-2xl lg:text-4xl p-3 px-5 mb-10 sm:mb-15 rounded-2xl leading-tight tracking-tight text-(--color-primary)">
            {featuredRoadmap?.title}
            </h2>
          </div>
          {/* ROADMAP ITEMS (ICON, LINE Y, CARD) */}
          <div className="mb-40">
            <RoadmapItems data={roadmapData} />
          </div>
        </div>
      </section>
    )
}

export default RoadmapSection;
