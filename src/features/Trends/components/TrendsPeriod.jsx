import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PeriodDropdown from "../../../components/ui/PeriodDropdown";
import TrendsChart from "../../../components/ui/TrendsChart";
import TrendsKeyInsight from "../../../components/ui/TrendsKeyInsight";
import TrendsAction from "../../../components/ui/TrendsActions";
import StatsSummaryCard from "../../../components/ui/StatsSummaryCard";
import TrendsEmpty from "./TrendsEmpty";
import trendsService from "../services/trendsService";

function TrendsPeriod({ periods, selectedPeriod, setSelectedPeriod, userRole }) {
  const { year } = useParams();
  const [trendsData, setTrendsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPeriodReport = async () => {
      setLoading(true);

      try {
        const response = await trendsService.getPeriodReport(year, userRole);
        setTrendsData(response.success ? response.data : null);
      } catch {
        setTrendsData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPeriodReport();
  }, [year, userRole]);

  return (
    <div className="w-full relative -mt-30 mb-5">
      <div className="max-w-6xl mx-auto relative pt-40 pb-20 px-6">
        <div className="flex items-center justify-between">
          <div className="text-(--color-primary)">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-2">
              Trending Skills
            </h1>
            <p className="text-xs sm:text-sm text-(--color-primary-dark)">
              {trendsData
                ? trendsData.subtitle
                : `Market insights and skill popularity for ${year}`}
            </p>
          </div>
          <PeriodDropdown
            periods={periods}
            value={selectedPeriod}
            onChange={setSelectedPeriod}
            variant="period"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-(--color-primary)"></div>
          </div>
        ) : !trendsData ? (
          <TrendsEmpty periods={periods} />
        ) : (
          <>
            <TrendsChart data={trendsData.chartData} />
            <TrendsKeyInsight insights={trendsData.insights} />
            <TrendsAction actions={trendsData.actions} />
            <StatsSummaryCard stats={trendsData.stats} />
            <p className="text-sm text-(--color-primary) text-center mt-6">
              Data updated from backend trending skills records.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default TrendsPeriod;
