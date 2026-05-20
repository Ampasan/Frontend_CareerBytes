import DailyMissionCard from "../../../components/ui/DailyMissionCard";
import SkillAsCard from "../../../components/ui/SkillAsCard";


function MissionSection() {
    // DATA BUAT CARD DAILY MISSION
    const DailyCheckData = [
        { isCheck: true, text: "Define landing page structure", variant: "with-status" },
        { isCheck: false, text: "Create low-fidelity wireframe", variant: "with-status" },
        { isCheck: false, text: "Design hero section", variant: "with-status" },
    ]

    return(
        <section id="mission" className="scroll-mt-15 bg-(--color-primary)">
            <div className="flex flex-col max-w-md lg:max-w-6xl mx-auto py-10 px-6 lg:px-8 pb-25 gap-15">
                {/* SECTION TITLE */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mt-5 text-(--color-white) text-center lg:text-left">Track and Build Your Skills</h1>
                {/* SKILL ASSESMENT CARD + DAILY MISSION CARD */}
                <div className="grid lg:grid-cols-[35%_65%] gap-10 lg:gap-0 justify-center">
                    <div className="lg:pr-2">
                        <SkillAsCard />
                    </div> 
                    <div className="lg:ml-20">
                        <DailyMissionCard data={DailyCheckData} />
                    </div>

                </div>
            </div>
        </section>
    )

}

export default MissionSection;
