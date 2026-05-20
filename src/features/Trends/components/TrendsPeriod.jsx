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

  const userRoleAction = Object.entries(roleActions).find(
    ([key]) => key.toLowerCase().trim() === user?.role?.toLowerCase().trim()
  )?.[1];

  const actions = trendsData
    ? [
        skillActions[topSkills[0]?.skill] && {
          ...skillActions[topSkills[0].skill],
          path: "/career-roadmap",
        },
        skillActions[topSkills[1]?.skill] && {
          ...skillActions[topSkills[1].skill],
          path: "/mission",
        },
        userRoleAction && {
          ...userRoleAction,
          path: "/mission",
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
            <p className="text-xs sm:text-sm text-[#14357F]">
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