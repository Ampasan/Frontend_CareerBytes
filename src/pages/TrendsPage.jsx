import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { dummyPeriods } from "../constants/dummy/trendsDummy";
import { useAuth } from "../context/AuthContext";
import trendsService from "../features/Trends/services/trendsService";
import TrendsMain from "../features/Trends/components/TrendsMain";
import TrendsPeriod from "../features/Trends/components/TrendsPeriod";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const DEFAULT_TRENDS_ROLE = "Frontend Developer";

const getUserRole = (user) =>
    user?.role || user?.careerRole || user?.career || user?.careerPath || "";

function TrendsPage () {
    const { user } = useAuth();
    const [selectedPeriod, setSelectedPeriod] = useState("");
    const [stats, setStats] = useState([]);
    const [skillsData, setSkillsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const periods = dummyPeriods;

    const fetchStats = async (role) => {
    setLoading(true);
    setError(null);
    try {
        const response = await trendsService.getStatsByRole(role);
        if (response.success) {
        setStats(response.data);
        } else {
        setStats([]);
        setError(`No results found for "${role}". Try searching for roles like UI/UX, Frontend, or Backend.`);
        }
    } catch {
        setError("Something went wrong. Please try again");
    } finally {
        setLoading(false);
    }
    };

    const fetchSkills = async () => {
        try {
        const response = await trendsService.getTrendingSkills();
        if (response.success) setSkillsData(response.data);
        } catch {
        console.error("Failed to fetch skills");
        }
    };

    useEffect(() => {
        const defaultRole = getUserRole(user) || DEFAULT_TRENDS_ROLE;
        fetchStats(defaultRole);
        fetchSkills();
    }, [user]);

    // Handle search
    const handleSearch = (term) => {
        if (term.trim() !== "") {
        fetchStats(term);
        } else {
        fetchStats(getUserRole(user) || DEFAULT_TRENDS_ROLE);
        }
    };

    const { year } = useParams();
    console.log(year);

    return (
        <>
        <Navbar />
            {year ? (
                <TrendsPeriod
                    periods={periods}
                    selectedPeriod={selectedPeriod}
                    setSelectedPeriod={setSelectedPeriod}
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
    )
}

export default TrendsPage;
