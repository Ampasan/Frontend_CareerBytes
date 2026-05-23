import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import { useAuth } from "../hooks/useAuth";
import { getApiErrorMessage } from "../services/api";
import MissionHeader from "../features/mission/components/MissionHeader";
import MissionCard from "../features/mission/components/MissionCard";
import missionService from "../features/mission/services/missionService";
import rolesService from "../services/rolesService";

const syncLevelProgressWithTasks = async (levels = []) => {
  const syncedLevels = await Promise.all(
    levels.map(async (level) => {
      if (!level?.id) return level;

      try {
        const response = await missionService.getTasksByLevel(level.id);
        const tasks = response.data || [];
        const total = tasks.length;
        const submitted = tasks.filter((task) => task.isCompleted).length;
        const percent = total > 0 ? Math.round((submitted / total) * 100) : 0;

        return {
          ...level,
          estimateTime: `${submitted}/${total} tasks`,
          isCompleted: total > 0 && submitted >= total,
          progress: {
            ...(level.progress || {}),
            total,
            submitted,
            percent,
          },
        };
      } catch {
        return level;
      }
    })
  );

  return syncedLevels;
};

function DailyMissionPage() {
  const { user, refreshUser } = useAuth();
  const [searchParams] = useSearchParams();
  const missionRole = searchParams.get("role")?.trim() || "";
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const stats = useMemo(() => {
    const totalTasks = missions.reduce(
      (total, mission) => total + (mission.progress?.total || 0),
      0
    );
    const completed = missions.reduce(
      (total, mission) => total + (mission.progress?.submitted || 0),
      0
    );

    return {
      totalTasks,
      completed,
      remaining: Math.max(totalTasks - completed, 0),
    };
  }, [missions]);

  useEffect(() => {
    const fetchMissions = async () => {
      setLoading(true);
      setError("");

      try {
        let roleId;

        if (missionRole) {
          const role = await rolesService.resolveRoleByName(missionRole);
          roleId = role?.id;
        } else {
          const profile = user?.roleId ? user : await refreshUser();
          roleId = profile?.roleId;
        }

        if (!roleId) {
          setMissions([]);
          setError(
            missionRole
              ? `Daily mission untuk "${missionRole}" belum tersedia.`
              : "Kamu belum memilih role karier. Pilih role terlebih dahulu."
          );
          return;
        }

        const response = await missionService.getRoadmapLevels(roleId);
        const syncedLevels = await syncLevelProgressWithTasks(response.data.levels);
        setMissions(syncedLevels);
      } catch (error) {
        setError(getApiErrorMessage(error, "Failed to fetch daily missions"));
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, [missionRole, refreshUser, user]);

  return (
    <>
      <Navbar />
      <MissionHeader stats={stats} />
      <MissionCard missions={missions} loading={loading} error={error} />
      <div className="border-t border-(--color-primary)"></div>
      <Footer />
    </>
  );
}

export default DailyMissionPage;
