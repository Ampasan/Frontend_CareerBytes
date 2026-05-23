import { useEffect, useState } from "react";
import { Clock3, CircleCheck } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import Button from "../components/ui/Button";
import { getApiErrorMessage } from "../services/api";
import missionService from "../features/mission/services/missionService";
import TaskDetailInfo from "../features/mission/components/TaskDetailInfo";
import MissionHeader from "../features/mission/components/MissionHeader";

const difficultyStyle = {
  easy: "bg-(--color-primary)/15 text-(--color-primary)",
  medium: "bg-(--color-primary)/20 text-(--color-primary)",
  hard: "bg-(--color-primary) text-(--color-white)",
};

const getDifficultyStyle = (level = "") =>
  difficultyStyle[level.toString().toLowerCase()] || difficultyStyle.easy;

function TaskList({ tasks, roadmapLevelId }) {
  const navigate = useNavigate();
  const completed = tasks.filter((task) => task.isCompleted).length;
  const stats = {
    totalTasks: tasks.length,
    completed,
    remaining: Math.max(tasks.length - completed, 0),
  };

  return (
    <>
      <MissionHeader stats={stats} />
      <section className="mt-16 lg:mt-24 bg-(--color-primary) py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-5">
          {tasks.length === 0 ? (
            <div className="rounded-lg bg-(--color-surface) p-6 text-center text-(--color-primary) font-semibold">
              Belum ada task untuk level ini.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {tasks.map((task) => (
                <article
                  key={task.id}
                  className={`rounded-lg p-5 lg:p-6 min-h-53 lg:min-h-56 shadow-sm flex flex-col justify-between ${
                    task.isCompleted
                      ? "bg-(--color-mission-card-completed)/95"
                      : "bg-(--color-surface)"
                  }`}
                >
                  <div>
                    <div
                      className={`h-5 w-full rounded-full px-3 flex items-center text-[10px] lg:text-xs font-semibold mb-5 ${
                        task.isCompleted
                          ? "bg-(--color-mission-label-completed) text-(--color-primary)"
                          : "bg-(--color-mission-label) text-(--color-primary)"
                      }`}
                    >
                      <span className="truncate">{task.role}</span>
                    </div>

                    <h2
                      className={`text-base lg:text-lg leading-snug font-bold ${
                        task.isCompleted
                          ? "text-(--color-primary) line-through"
                          : "text-(--color-primary)"
                      }`}
                    >
                      {task.title}
                    </h2>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-2 text-(--color-primary)">
                        <Clock3 size={16} strokeWidth={2.2} />
                        <span className="text-xs lg:text-sm font-medium">
                          {task.estimateTime}
                        </span>
                      </div>

                      <span
                        className={`shrink-0 px-3 py-1 rounded-full text-[10px] lg:text-xs font-semibold ${getDifficultyStyle(
                          task.level
                        )}`}
                      >
                        {task.level}
                      </span>
                    </div>

                    {task.isCompleted ? (
                      <div className="h-10 rounded-lg bg-(--color-primary-muted-strong) flex items-center justify-center gap-2 text-(--color-primary) text-sm lg:text-base font-semibold">
                        <CircleCheck size={16} />
                        Completed
                      </div>
                    ) : (
                      <Button
                        text="Start Task"
                        className="w-full h-10 flex items-center justify-center rounded-lg text-sm lg:text-base font-semibold bg-(--color-primary) hover:bg-(--color-primary)/70 text-white"
                        onClick={() =>
                          navigate(`/daily-mission/task/${roadmapLevelId}/${task.id}`)
                        }
                      />
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function TaskDetailPage() {
  const { roadmapLevelId, taskId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [taskDetail, setTaskDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        if (taskId) {
          const response = await missionService.getTaskDetail(taskId);
          setTaskDetail(response.data);
          setTasks([]);
          return;
        }

        if (!roadmapLevelId) {
          setError("Pilih level roadmap dari halaman Daily Mission terlebih dahulu.");
          return;
        }

        const response = await missionService.getTasksByLevel(roadmapLevelId);
        setTasks(response.data);
        setTaskDetail(null);
      } catch (error) {
        setError(getApiErrorMessage(error, "Failed to fetch task data"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roadmapLevelId, taskId]);

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center py-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-(--color-primary)"></div>
        </div>
      ) : error ? (
        <main className="max-w-7xl mx-auto px-6 py-20 text-(--color-primary)">
          <div className="border border-(--color-primary) rounded-2xl p-6 font-semibold">
            {error}
          </div>
        </main>
      ) : taskDetail ? (
        <TaskDetailInfo taskDetail={taskDetail} roadmapLevelId={roadmapLevelId} />
      ) : (
        <TaskList tasks={tasks} roadmapLevelId={roadmapLevelId} />
      )}
      <Footer />
    </>
  );
}

export default TaskDetailPage;
