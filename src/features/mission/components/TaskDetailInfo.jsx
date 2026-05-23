import { Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/ui/Button";
import HeaderMission from "../../../components/ui/HeaderMission";

const defaultTaskDetail = {
  id: "default",
  title: "Daily Mission Task",
  role: "Daily Mission",
  level: "Easy",
  estimateTime: "Flexible",
  description: "Complete this task and submit your work.",
  learningGoal: "Practice the skills from your current roadmap level.",
  instructions: [],
};

function TaskDetailInfo({ taskDetail, roadmapLevelId }) {
  const navigate = useNavigate();
  const task = taskDetail || defaultTaskDetail;
  const instructions = task.instructions || [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-13 text-(--color-primary)">
      <HeaderMission task={task} />

      {/* Main Card */}
      <div className="border border-(--color-primary) rounded-2xl p-6 lg:p-9">
        {/* Description */}
        <div className="mb-9">
          <h2 className="font-bold text-xl lg:text-xl mb-3">Description</h2>

          <p className="font-medium text-sm lg:text-base leading-8 text-(--color-primary)/90">
            {task.description}
          </p>
        </div>

        {/* Learning Goal */}
        <div className="border border-(--color-primary) rounded-2xl p-5 lg:p-7 mb-8 bg-(--color-primary)/5">
          <div className="flex items-center gap-3 mb-2">
            <Target size={20} />
            <h3 className="font-bold text-lg">Learning Goal</h3>
          </div>

          <p className="font-medium text-sm lg:text-base leading-8 pl-0 lg:pl-8">
            {task.learningGoal}
          </p>
        </div>

        {/* Instructions */}
        <div>
          <h2 className="font-bold text-xl lg:text-xl mb-5">
            Step-by-Step Instructions
          </h2>

          <div className="flex flex-col gap-5">
            {instructions.map((item, index) => (
              <div key={index} className="flex items-start gap-5">
                <div className="min-w-7 h-7 rounded-full bg-(--color-primary) text-white flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>

                <p className="font-medium text-sm lg:text-base leading-7">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col lg:flex-row justify-between gap-5 mt-8">
        <Button
          text="Start Task"
          className="w-full lg:w-125 rounded-xl py-4 text-xl"
          onClick={() => {
            const route = roadmapLevelId
              ? `/daily-mission/task/${roadmapLevelId}/${task.id}/assessment`
              : `/daily-mission/task/${task.id}/assessment`;
            navigate(route);
          }}
        />

        <button className="font-medium border border-(--color-primary)/50 rounded-xl px-8 py-4 text-lg hover:bg-(--color-primary)/70 cursor-pointer">
          Save for Later
        </button>
      </div>

      {/* Bottom text */}
      <div className="text-center mt-8 mb-3 text-sm">
        Need help? Check out our resource library
      </div>
    </div>
  );
}

export default TaskDetailInfo;
