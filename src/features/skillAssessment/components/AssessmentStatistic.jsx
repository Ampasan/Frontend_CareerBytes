import AnalysisResult from "../../../components/ui/AnalysisResult"
import SkillComparison from "../../../components/ui/SkillComparison"
import { getRoleConfig } from "../../../constants/careerTools";

const FALLBACK_SKILLS = ["Core Skill", "Supporting Skill", "Tooling", "Advanced Practice"];

const formatStatus = (status = "") =>
    status.toLowerCase() === "match" ? "Match" : "Gap";

const getFallbackSkillData = (role = "") => {
    const roleConfig = getRoleConfig(role);
    const roleTools = roleConfig
        ? Object.values(roleConfig.tools).flat().slice(0, 4)
        : FALLBACK_SKILLS;

    return roleTools.map((skill) => ({
        percentage: 0,
        type: "Gap",
        text: skill,
    }));
};

function AssessmentStatistic ({ result, role }) {
    const activeRole = role || "Selected Career";
    const data = result?.skills_analysis?.length
        ? result.skills_analysis.map((skill) => ({
            percentage: Math.round(skill.score || 0),
            type: formatStatus(skill.status),
            text: skill.skill_name || skill.skillName || skill.name,
        }))
        : getFallbackSkillData(activeRole);

    return (
        <section 
        className="my-10 mb-20 mt-10 max-w-6xl px-5 mx-auto flex flex-wrap justify-between gap-10 lg:gap-0
                    md:grid md:grid-cols-[30%_64%]  lg:grid lg:grid-cols-[27%_70%]
        ">
            <AnalysisResult 
            role={activeRole}
            percentage={result?.overall_match ?? 0} 
            level={result?.level_badge || "BEGINNER"}
            />
            <SkillComparison data={data} />
        </section>
    )
}

export default AssessmentStatistic;
