import { mockMissions } from "../../../constants/dummy/mission";

function TaskSummaryCard({
  taskNumber,
  title,
  description,
  requirements,
  children,
}) {
  const defaultTask = mockMissions.missions.find((m) => m.id === 2)?.assessment?.tasks[0];

  const displayTaskNumber = taskNumber !== undefined ? taskNumber : defaultTask?.id;
  const displayTitle = title || defaultTask?.taskName;
  const displayDescription = description || defaultTask?.description;
  const displayRequirements = requirements || defaultTask?.requirements;

  return (
    <div className="border border-(--color-primary) rounded-2xl p-6 lg:p-9 bg-(--color-surface)">
      <p className="text-xs lg:text-base text-(--color-primary) mb-3">
        Task {displayTaskNumber}
      </p>

      <h1 className="text-xl lg:text-2xl font-bold text-(--color-primary) leading-tight">
        {displayTitle}
      </h1>

      <p className="mt-3 font-medium text-sm lg:text-base text-(--color-primary)/90 leading-relaxed">
        {displayDescription}
      </p>

      {/* Requirements */}

      <div className="mt-8 rounded-2xl border border-(--color-primary) bg-(--color-primary)/10 p-5 lg:p-5">
        <h3 className="font-bold text-(--color-primary) text-lg mb-3">
          Requirements:
        </h3>

        <ul className="space-y-2">
          {displayRequirements?.map((item, index) => (
            <li key={index} className="font-medium flex gap-3 text-(--color-primary)/90 text-bold">
              <span>&bull;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {children}
    </div>
  );
}

export default TaskSummaryCard;
