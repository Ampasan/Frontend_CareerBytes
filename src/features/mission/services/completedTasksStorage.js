const COMPLETED_TASKS_KEY = "careerbytes-completed-tasks";
const LEVEL_PROGRESS_KEY = "careerbytes-level-progress";
const isBrowser = typeof window !== "undefined";

const toStorageKey = (value) =>
  value === undefined || value === null ? "" : String(value);

const toNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const readJson = (key) => {
  if (!isBrowser) return {};

  try {
    return JSON.parse(window.localStorage.getItem(key)) || {};
  } catch {
    window.localStorage.removeItem(key);
    return {};
  }
};

const writeJson = (key, value) => {
  if (!isBrowser) return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const readCompletedTasks = () => readJson(COMPLETED_TASKS_KEY);

export const writeCompletedTasks = (completedTasks) => {
  writeJson(COMPLETED_TASKS_KEY, completedTasks);
};

export const readLevelProgress = () => readJson(LEVEL_PROGRESS_KEY);

export const getStoredLevelProgress = (roadmapLevelId) => {
  const key = toStorageKey(roadmapLevelId);
  if (!key) return null;

  return readLevelProgress()[key] || null;
};

export const getCompletedTask = (taskId) => {
  const key = toStorageKey(taskId);
  if (!key) return null;

  return readCompletedTasks()[key] || null;
};

export const isTaskCompletedLocally = (taskId) =>
  Boolean(getCompletedTask(taskId));

export const removeCompletedTaskLocally = (taskId) => {
  const key = toStorageKey(taskId);
  if (!key) return;

  const completedTasks = readCompletedTasks();
  delete completedTasks[key];
  writeCompletedTasks(completedTasks);
};

export const getCompletedTaskCountForLevel = (roadmapLevelId) => {
  const levelKey = toStorageKey(roadmapLevelId);
  if (!levelKey) return 0;

  const taskIds = new Set();
  Object.values(readCompletedTasks()).forEach((task) => {
    if (toStorageKey(task?.roadmapLevelId) === levelKey) {
      const taskKey = toStorageKey(task.taskId);
      if (taskKey) taskIds.add(taskKey);
    }
  });

  return taskIds.size;
};

export const markTaskCompletedLocally = ({
  taskId,
  roadmapLevelId,
  taskTitle,
  levelProgress,
  isLevelCompleted,
  nextLevelUnlocked,
} = {}) => {
  const taskKey = toStorageKey(taskId);
  if (!taskKey) return;

  const completedAt = new Date().toISOString();
  const completedTasks = readCompletedTasks();
  completedTasks[taskKey] = {
    ...completedTasks[taskKey],
    taskId,
    roadmapLevelId,
    taskTitle,
    completedAt: completedTasks[taskKey]?.completedAt || completedAt,
    updatedAt: completedAt,
  };

  writeCompletedTasks(completedTasks);

  const levelKey = toStorageKey(roadmapLevelId);
  if (!levelKey) return;

  const levelProgressMap = readLevelProgress();
  const previousLevelProgress = levelProgressMap[levelKey] || {};
  levelProgressMap[levelKey] = {
    ...previousLevelProgress,
    roadmapLevelId,
    progress: {
      ...(previousLevelProgress.progress || {}),
      ...(levelProgress || {}),
    },
    isLevelCompleted:
      isLevelCompleted ?? previousLevelProgress.isLevelCompleted ?? false,
    nextLevelUnlocked:
      nextLevelUnlocked ?? previousLevelProgress.nextLevelUnlocked ?? false,
    updatedAt: completedAt,
  };

  writeJson(LEVEL_PROGRESS_KEY, levelProgressMap);
};

export const getOptimisticLevelProgress = (level = {}) => {
  const rawProgress = level.progress || { submitted: 0, total: 0, percent: 0 };
  const storedLevelProgress = getStoredLevelProgress(level.id);
  const storedProgress = storedLevelProgress?.progress || {};
  const localCompletedCount = getCompletedTaskCountForLevel(level.id);
  const total = Math.max(
    toNumber(rawProgress.total),
    toNumber(storedProgress.total),
    toNumber(rawProgress.submitted),
    toNumber(storedProgress.submitted),
    localCompletedCount
  );
  const submitted = Math.min(
    total || Number.MAX_SAFE_INTEGER,
    Math.max(
      toNumber(rawProgress.submitted),
      toNumber(storedProgress.submitted),
      localCompletedCount
    )
  );
  const percent =
    total > 0
      ? Math.round((submitted / total) * 100)
      : Math.max(toNumber(rawProgress.percent), toNumber(storedProgress.percent));

  return {
    rawProgress,
    submitted,
    total,
    percent: Math.min(Math.max(percent, 0), 100),
    isCompleted:
      Boolean(level.isCompleted) ||
      Boolean(storedLevelProgress?.isLevelCompleted) ||
      (total > 0 && submitted >= total),
  };
};
