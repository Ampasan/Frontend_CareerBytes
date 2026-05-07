import AnalysisResult from "../../components/ui/AnalysisResult"
import SkillComparison from "../../components/ui/SkillComparison"

function AnalysisSkill () {
    return (
        <div className="my-10 mt-10 max-w-6xl px-5 mx-auto flex flex-wrap gap-10 justify-between">
            <AnalysisResult 
            role="UI/UX Designer"
            percentage={40} 
            level="INTERMEDIATE"
            />
            <SkillComparison />
        </div>
    )
}

export default AnalysisSkill