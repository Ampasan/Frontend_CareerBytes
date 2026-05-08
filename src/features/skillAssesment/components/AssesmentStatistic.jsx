import AnalysisResult from "../../../components/ui/AnalysisResult"
import SkillComparison from "../../../components/ui/SkillComparison"

const SkillData = [
    {percentage: 60, type: "Match", text: "Visual Design"},
    {percentage: 80, type: "Match", text: "Typography"},
    {percentage: 20, type: "Match", text: "Prototyping"},
    {percentage: 10, type: "Match", text: "Typography"}
]

function AssesmentStatistic () {
    return (
        <div className="my-10 mb-20 mt-10 max-w-6xl px-5 mx-auto flex flex-wrap gap-10 justify-between">
            <AnalysisResult 
            role="UI/UX Designer"
            percentage={40} 
            level="INTERMEDIATE"
            />
            <SkillComparison data={SkillData} />
        </div>
    )
}

export default AssesmentStatistic;