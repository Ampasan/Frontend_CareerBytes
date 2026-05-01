import RoadmapItems from "../../../components/ui/RoadmapItems";

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
    },
  ];

    return(
      <section id="roadmap" className="scroll-mt-20">
        {/* TEXT + LINE X */}
        <div className="pl-22 pt-10 flex justify-center items-center gap-10">
        </div>
        {/* BAGIAN BAWAH */}
        <div className="mb-3 max-w-6xl mx-auto px-8 ">
          <div>
            <div className="flex justify-center items-center mt-15">
            </div>
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