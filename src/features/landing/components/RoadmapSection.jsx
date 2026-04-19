import RoadmapItems from "../../../components/ui/RoadmapItems";

function RoadmapSection() {

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
        <section>
                <div className="pl-22 pt-10 flex justify-center items-center gap-10">
                    <h2 className="text-5xl font-semibold tracking-tight">Plan Your Career Path</h2>
                    <div className="flex-1 h-[3px] bg-black"></div>
                </div>
                <div>
                    <div className="flex justify-center items-center mt-25">
                        <h2 className="bg-black/10 font-semibold text-4xl p-3 px-5 mb-15 rounded-2xl leading-tight tracking-tight ">UI/UX Designer</h2>
                    </div>
                </div>
                <RoadmapItems data={roadmapData} />
        </section>
    )
}

export default RoadmapSection;