import { useParams } from "react-router-dom";
import {
  dummyPeriodReports,
  skillInsights,
  skillActions,
  roleActions,
  dummyPeriods,
} from "../../../constants/dummy/trendsDummy";
import PeriodDropdown from "../../../components/ui/PeriodDropdown";
import TrendsChart from "../../../components/ui/TrendsChart";
import TrendsKeyInsight from "../../../components/ui/TrendsKeyInsight";
import TrendsAction from "../../../components/ui/TrendsActions";
import { useAuth } from "../../../context/AuthContext";
import StatsSummaryCard from "../../../components/ui/StatsSummaryCard";
import TrendsEmpty from "./TrendsEmpty";

const missionActionLabels = new Set(["Explore Courses", "See Recommendations"]);
const missionPagePath = "/daily-mission";
const normalizeRole = (role = "") =>
  role.toString().toLowerCase().replace(/[^a-z0-9]/g, "");

function TrendsPeriod({ selectedPeriod, setSelectedPeriod }) {
  const { year } = useParams();
  const { user } = useAuth();

  const trendsData = dummyPeriodReports[year];

  // Kalkulasi aman dengan fallback kosong
  const topSkills = trendsData
    ? [...trendsData.chartData].sort((a, b) => b.score - a.score).slice(0, 3)
    : [];

  const insights = topSkills
    .map((skill) => skillInsights[skill.skill])
    .filter(Boolean);

  const normalizedUserRole = normalizeRole(user?.role);
  const userRoleAction = Object.entries(roleActions).find(([key]) => {
    if (!normalizedUserRole) return false;
    const normalizedKey = normalizeRole(key);
    return (
      normalizedKey.includes(normalizedUserRole) ||
      normalizedUserRole.includes(normalizedKey)
    );
  })?.[1];

  const resolveActionPath = (action) =>
    missionActionLabels.has(action.linkText?.trim()) ? missionPagePath : action.path;

  const actions = trendsData
    ? [
        skillActions[topSkills[0]?.skill] && {
          ...skillActions[topSkills[0].skill],
          path: resolveActionPath(skillActions[topSkills[0].skill]),
        },
        skillActions[topSkills[1]?.skill] && {
          ...skillActions[topSkills[1].skill],
          path: resolveActionPath(skillActions[topSkills[1].skill]),
        },
        userRoleAction && {
          ...userRoleAction,
          path: resolveActionPath(userRoleAction),
        },
      ].filter(Boolean)
    : [];

  return (
    <div className="w-full relative -mt-30 mb-5">
      <div className="max-w-6xl mx-auto relative pt-40 pb-20 px-6">

        {/* Judul + Dropdown — selalu tampil */}
        <div className="flex items-center justify-between">
          <div className="text-(--color-primary)">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl  font-bold mb-2">Trending Skills</h1>
            <p className="text-xs sm:text-sm text-(--color-primary-dark)">
              {trendsData
                ? trendsData.subtitle
                : `Market insights and skill popularity for ${year}`}
            </p>
          </div>
          <PeriodDropdown
            periods={dummyPeriods}
            value={selectedPeriod}
            onChange={setSelectedPeriod}
            variant="period"
          />
        </div>

        {/* Konten — kondisional */}
        {!trendsData ? (
          <TrendsEmpty />
        ) : (
          <>
            <TrendsChart data={trendsData.chartData} />
            <TrendsKeyInsight insights={insights} />
            <TrendsAction actions={actions} />
            <StatsSummaryCard stats={trendsData.stats} />
            <p className="text-sm text-(--color-primary) text-center mt-6">
              Data updated monthly from industry job boards, employer surveys, and market research
            </p>
          </>
        )}

      </div>
    </div>
  );
}

export default TrendsPeriod;
