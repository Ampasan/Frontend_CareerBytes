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
        <section id="mission" className="scroll-mt-15 bg-[var(--color-image)]">
            <div className="flex flex-col max-w-6xl mx-auto py-10 px-8 pb-25 gap-15">
                {/* SECTION TITLE */}
                <h1 className="text-5xl font-semibold tracking-tight mt-5">Track and Build Your Skills</h1>
                {/* SKILL ASSESMENT CARD + DAILY MISSION CARD */}
                <div className="grid grid-cols-[35%_65%] justify-center">
                    <div className="pr-2">
                        <SkillAsCard />
                    </div> 
                    <div className="ml-20">
                        <DailyMissionCard data={DailyCheckData} />
                    </div>

                </div>
            </div>
        </section>
    )

}

export default MissionSection;