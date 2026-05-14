import AnalysisResult from "../../../components/ui/AnalysisResult"
import SkillComparison from "../../../components/ui/SkillComparison"

const SkillData = [
    {percentage: 60, type: "Match", text: "Visual Design"},
    {percentage: 80, type: "Match", text: "Typography"},
    {percentage: 20, type: "Gap", text: "Prototyping"},
    {percentage: 10, type: "Gap", text: "Design System"}
]

function AssessmentStatistic () {
    return (
        <section 
        className="my-10 mb-20 mt-10 max-w-6xl px-5 mx-auto flex flex-wrap justify-between gap-10 lg:gap-0
                    md:grid md:grid-cols-[30%_64%]  lg:grid lg:grid-cols-[27%_70%]
        ">
            <AnalysisResult 
            role="UI/UX Designer"
            percentage={40} 
            level="INTERMEDIATE"
            />
            <SkillComparison data={SkillData} />
        </section>
    )
}

export default AssessmentStatistic;