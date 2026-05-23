import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import RoadmapHeader from "../features/roadmap/components/RoadmapHeader";
import RoadmapAbout from "../features/roadmap/components/RoadmapAbout";
import RoadmapStep from "../features/roadmap/components/RoadmapStep";
import RoadmapEmptyState from "../features/roadmap/components/RoadmapEmptyState";
import Footer from "../components/layout/Footer";
import { useAuth } from "../hooks/useAuth";
import roadmapService from "../features/roadmap/services/roadmapService";
import { getApiErrorMessage } from "../services/api";

function RoadmapPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const roadmapRole = searchParams.get("role")?.trim() || "";
  const [searchTerm, setSearchTerm] = useState("");
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRoadmap = useCallback(async (role = "", { preferDefault = false } = {}) => {
    setLoading(true);
    setError(null);
    try {
      let response;

      if (preferDefault) {
        try {
          response = await roadmapService.getDefaultRoadmap();
        } catch (defaultError) {
          if (!role) throw defaultError;
          response = await roadmapService.getRoadmapByRole(role);
        }
      } else {
        response = role
          ? await roadmapService.getRoadmapByRole(role)
          : await roadmapService.getDefaultRoadmap();
      }

      if (response.success) {
        setRoadmapData(response.data);
      } else {
        setError(response.message || "Roadmap not found");
      }
    } catch (error) {
      setError(getApiErrorMessage(error, "Failed to fetch roadmap data"));
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch based on user role
  useEffect(() => {
    if (roadmapRole) {
      setSearchTerm(roadmapRole);
      fetchRoadmap(roadmapRole);
      return;
    }

    setSearchTerm("");
    fetchRoadmap(user?.role || "", { preferDefault: true });
  }, [fetchRoadmap, roadmapRole, user?.role, user?.roleId]);

  // Handle search
  const handleSearch = (term) => {
    const nextTerm = term.trim();

    setSearchTerm(nextTerm);
    if (nextTerm !== "") {
      if (nextTerm === roadmapRole) {
        fetchRoadmap(nextTerm);
      } else {
        setSearchParams({ role: nextTerm });
      }
    } else if (user?.role) {
      if (roadmapRole) {
        setSearchParams({});
      } else {
        fetchRoadmap(user.role, { preferDefault: true });
      }
    } else {
      if (roadmapRole) {
        setSearchParams({});
      } else {
        fetchRoadmap("", { preferDefault: true });
      }
    }
  };

  // Handle popular role shortcut
  const handleSelectRole = (role) => {
    setSearchTerm(role);
    if (role === roadmapRole) {
      fetchRoadmap(role);
    } else {
      setSearchParams({ role });
    }
  };

  const handleOpenLevelTasks = (level) => {
    if (!level?.id || (!level.isUnlocked && !level.isCompleted)) return;

    navigate(`/daily-mission/task/${level.id}`);
  };

  return (
    <>
      <Navbar />
      <RoadmapHeader onSearch={handleSearch} onSelectRole={handleSelectRole} />
      
      {loading ? (
        <div className="flex justify-center items-center py-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-(--color-primary)"></div>
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
          <RoadmapStep
            data={roadmapData?.steps}
            searchTerm={searchTerm}
            onLevelSelect={handleOpenLevelTasks}
          />
        </>
      )}
      
      <Footer />
    </>
  );
}

export default RoadmapPage;
