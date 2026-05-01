import RoadmapItems from "../../../components/ui/RoadmapItems";
import GdocsLogo from "../../../assets/logo/gdocs.svg";
import FigmaLogo from "../../../assets/logo/figma.svg";
import AdobeXDLogo from "../../../assets/logo/adobe_xd.svg";
import NotionLogo from "../../../assets/logo/notion.svg";


function RoadmapSection() {
    // SETTING BUAT ROADMAP
      const roadmapData = [
    {
      title: "Beginner Level",
      status: "Completed",
      description: "Building the foundation of visual communication and user empathy.",
      checklist: [
        { isCheck: true, text: "User research" },
        { isCheck: true, text: "Wireframe" },
      ],
      progress: 100,
      tools: [GdocsLogo, FigmaLogo]
    },
    {
      title: "Intermediate Level",
      status: "On Going",
      description: "Mastering interaction patterns and shipping complex design systems.",
      checklist: [
        { isCheck: true, text: "Auto Layout" },
        { isCheck: false, text: "Prototyping" },
      ],
      progress: 80,
      tools: [FigmaLogo, AdobeXDLogo]
    },
    {
      title: "Advanced Level",
      status: false,
      description: "Leading design vision, mentoring teams, and driving business strategy through UX.",
      checklist: [
        { isCheck: false, text: "Leadership" },
        { isCheck: false, text: "UX Strategy" },
      ],
      progress: 0,
      tools: [NotionLogo]
    },
  ];

    return(
      <section id="roadmap" className="scroll-mt-20 max-w-md lg:max-w-full mx-auto">
        {/* TEXT + LINE X */}
        <div className="pl-12 lg:pl-22 pt-10 flex justify-center items-center gap-5 lg:gap-10">
          <h2 className="text-[var(--color-primary)] text-3xl lg:text-5xl font-semibold tracking-tight">Plan Your Career Path</h2>
          <div className="flex-1 h-[3px] bg-[var(--color-primary)] "></div> 
        </div>
        {/* BAGIAN BAWAH */}
        <div className="mb-3 max-w-6xl mx-auto px-8 ">
          <div className="flex justify-center items-center mt-10 lg:mt-15">
            <h2 className="border border-2 border-[var(--color-primary)] font-semibold text-2xl lg:text-4xl p-3 px-5 mb-15 rounded-2xl leading-tight tracking-tight text-[var(--color-primary)]">
            UI/UX Designer
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