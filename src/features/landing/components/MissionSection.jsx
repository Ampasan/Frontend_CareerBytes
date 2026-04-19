import DailyMissionCard from "../../../components/ui/DailyMissionCard";
import SkillAsCard from "../../../components/ui/SkillAsCard";


function MissionSection() {
    return(
        <section className="bg-[var(--color-image)]">
            <div className="flex flex-col max-w-5xl mx-auto py-10 gap-15">
                <h1 className="text-5xl font-semibold tracking-tight mt-5">Track and Build Your Skills</h1>
                <div className="bg-purple-500 grid grid-cols-[35%_65%] gap justify-center items-center">
                    <div className="bg-green-400">
                        <SkillAsCard />
                    </div> 
                    <div className="bg-sky-500 ml-20">
                        <DailyMissionCard />
                    </div>

                </div>
            </div>
        </section>
    )

}

export default MissionSection;