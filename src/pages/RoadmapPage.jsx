import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import RoadmapHeader from "../features/roadmap/components/RoadmapHeader";
import RoadmapAbout from "../features/roadmap/components/RoadmapAbout";
import RoadmapStep from "../features/roadmap/components/RoadmapStep";
import RoadmapEmptyState from "../features/roadmap/components/RoadmapEmptyState";
import Footer from "../components/layout/Footer";
import { useAuth } from "../hooks/useAuth";
import missionService from "../features/mission/services/missionService";
import roadmapService from "../features/roadmap/services/roadmapService";
import { getApiErrorMessage } from "../services/api";

const clampProgress = (progress) =>
  Math.min(Math.max(Number.isFinite(progress) ? progress : 0, 0), 100);

const getSyncedStatus = (step, index, isCompleted, isUnlocked) => {
  if (isCompleted) return "Completed";
  if (isUnlocked || index === 0) return "On Going";
  return false;
};

const syncChecklistProgress = (checklist = [], progress, isCompleted) => {
  const checkedCount = Math.round((progress / 100) * checklist.length);

  return checklist.map((item, index) => ({
    ...item,
    isCheck: isCompleted || index < checkedCount,
  }));
};

const syncRoadmapProgressWithTasks = async (roadmap) => {
  if (!roadmap?.steps?.length) return roadmap;

  let previousStepCompleted = false;
  const syncedSteps = [];

  for (const [index, step] of roadmap.steps.entries()) {
    if (!step?.id) {
      syncedSteps.push(step);
      previousStepCompleted = Boolean(step?.isCompleted);
      continue;
    }

    try {
      const response = await missionService.getTasksByLevel(step.id);
      const tasks = response.data || [];

      if (tasks.length === 0) {
        const isUnlocked = Boolean(step.isUnlocked) || previousStepCompleted || index === 0;
        const nextStep = {
          ...step,
          isUnlocked,
          status: getSyncedStatus(step, index, Boolean(step.isCompleted), isUnlocked),
        };

        syncedSteps.push(nextStep);
        previousStepCompleted = Boolean(nextStep.isCompleted);
        continue;
      }

      const total = tasks.length;
      const submitted = tasks.filter(
        (task) => task.isCompleted || task.isSubmitted
      ).length;
      const progress = clampProgress(Math.round((submitted / total) * 100));
      const isCompleted = submitted >= total;
      const isUnlocked =
        Boolean(step.isUnlocked) || previousStepCompleted || submitted > 0 || index === 0;

      const nextStep = {
        ...step,
        progress,
        status: getSyncedStatus(step, index, isCompleted, isUnlocked),
        checklist: syncChecklistProgress(step.checklist, progress, isCompleted),
        isCompleted,
        isUnlocked,
        taskProgress: {
          total,
          submitted,
          percent: progress,
        },
      };

      syncedSteps.push(nextStep);
      previousStepCompleted = isCompleted;
    } catch {
      syncedSteps.push(step);
      previousStepCompleted = Boolean(step.isCompleted);
    }
  }

  return {
    ...roadmap,
    steps: syncedSteps,
  };
};

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
        const syncedRoadmap = await syncRoadmapProgressWithTasks(response.data);
        setRoadmapData(syncedRoadmap);
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
              level={roadmapData.careerLevel}
              estimate={roadmapData.estimateYears}
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
