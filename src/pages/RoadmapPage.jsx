import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import RoadmapHeader from "../features/roadmap/components/RoadmapHeader";
import RoadmapAbout from "../features/roadmap/components/RoadmapAbout";
import RoadmapStep from "../features/roadmap/components/RoadmapStep";
import RoadmapEmptyState from "../features/roadmap/components/RoadmapEmptyState";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";
import roadmapService from "../features/roadmap/services/roadmapService";

function RoadmapPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRoadmap = async (role) => {
    setLoading(true);
    setError(null);
    try {
      const response = await roadmapService.getRoadmapByRole(role);
      if (response.success) {
        setRoadmapData(response.data);
      } else {
        setError("Roadmap not found");
      }
    } catch {
      setError("Failed to fetch roadmap data");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch based on user role
  useEffect(() => {
    if (user?.role) {
      fetchRoadmap(user.role);
    }
  }, [user]);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() !== "") {
      fetchRoadmap(term);
    } else if (user?.role) {
      fetchRoadmap(user.role);
    }
  };

  // Handle popular role shortcut
  const handleSelectRole = (role) => {
    setSearchTerm(role);
    fetchRoadmap(role);
  };

  return (
    <>
      <Navbar />
      <RoadmapHeader onSearch={handleSearch} onSelectRole={handleSelectRole} />
      
      {loading ? (
        <div className="flex justify-center items-center py-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="mb-40 mt-10">
          <RoadmapEmptyState 
            searchTerm={searchTerm} 
            onSearchAgain={() => handleSearch("")}
            onSelectRole={handleSelectRole}
          />
        </div>
      ) : (
        <>
          {roadmapData && (
            <RoadmapAbout 
              title={roadmapData.title}
              description={roadmapData.description}
              level={roadmapData.level}
              estimate={roadmapData.estimate}
            />
          )}
          <RoadmapStep data={roadmapData?.steps} searchTerm={searchTerm} />
        </>
      )}
      
      <Footer />
    </>
  );
}

export default RoadmapPage;
