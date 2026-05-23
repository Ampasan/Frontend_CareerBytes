import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import trendsService from "../features/Trends/services/trendsService";
import TrendsMain from "../features/Trends/components/TrendsMain";
import TrendsPeriod from "../features/Trends/components/TrendsPeriod";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const DEFAULT_TRENDS_ROLE = "Frontend Developer";

const getUserRole = (user) =>
  user?.role || user?.careerRole || user?.career || user?.careerPath || "";

function TrendsPage() {
  const { user } = useAuth();
  const { year } = useParams();
  const userRole = getUserRole(user) || DEFAULT_TRENDS_ROLE;
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(year || "");
  const [stats, setStats] = useState([]);
  const [skillsData, setSkillsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async (role) => {
    setLoading(true);
    setError(null);

    try {
      const response = await trendsService.getStatsByRole(role);
      if (response.success) {
        setStats(response.data);
      } else {
        setStats([]);
        setError(`No results found for "${role}". Try another role.`);
      }
    } catch (error) {
      setError(error.message || "Something went wrong. Please try again");
    } finally {
      setLoading(false);
    }
  };

  const fetchSkills = async (targetYear) => {
    try {
      const response = await trendsService.getTrendingSkills(targetYear);
      if (response.success) setSkillsData(response.data);
    } catch {
      setSkillsData(null);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchPeriods = async () => {
      try {
        const response = await trendsService.getPeriods();
        if (!isMounted) return;

        setPeriods(response.data);
        setSelectedPeriod(
          (currentPeriod) => currentPeriod || response.data[0] || ""
        );
      } catch {
        if (!isMounted) return;
        setPeriods([]);
      }
    };

    fetchPeriods();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    fetchStats(userRole);
  }, [userRole]);

  useEffect(() => {
    if (!year && selectedPeriod) {
      fetchSkills(selectedPeriod);
    }
  }, [year, selectedPeriod]);

  useEffect(() => {
    if (year) setSelectedPeriod(year);
  }, [year]);

  const handleSearch = (term) => {
    if (term.trim() !== "") {
      fetchStats(term);
    } else {
      fetchStats(getUserRole(user) || DEFAULT_TRENDS_ROLE);
    }
  };

  return (
    <>
      <Navbar />
      {year ? (
        <TrendsPeriod
          periods={periods}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          userRole={userRole}
        />
      ) : (
        <TrendsMain
          periods={periods}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          stats={stats}
          loading={loading}
          error={error}
          skillsData={skillsData}
          handleSearch={handleSearch}
        />
      )}
      <Footer />
    </>
  );
}

export default TrendsPage;
