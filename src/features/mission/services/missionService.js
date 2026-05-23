import api from "../../../services/api";
import {
  getToolIconUrl,
  getToolsForRoleLevel,
} from "../../../constants/careerTools";
import {
  getOptimisticLevelProgress,
  isTaskCompletedLocally,
  markTaskCompletedLocally,
  removeCompletedTaskLocally,
} from "./completedTasksStorage";

const normalizeText = (value = "") =>
  value.toString().toLowerCase().replace(/[^a-z0-9]/g, "");

const minutesLabel = (minutes) => {
  if (minutes === undefined || minutes === null || minutes === "") {
    return "Flexible";
  }

  if (typeof minutes === "string") {
    return minutes.toLowerCase().includes("min") ? minutes : `${minutes} min`;
  }

  return `${minutes} min`;
};

const normalizeDifficulty = (difficulty) => {
  const value = difficulty?.toString().trim();
  if (!value) return "Easy";

  const lowerValue = value.toLowerCase();
  if (lowerValue === "easy") return "Easy";
  if (lowerValue === "medium") return "Medium";
  if (lowerValue === "hard") return "Hard";

  return value;
};

const normalizeListResponse = (payload) => {
  if (Array.isArray(payload)) return payload;

  const possibleLists = [
    payload?.tasks,
    payload?.items,
    payload?.missions,
    payload?.levels,
    payload?.data,
  ];

  return possibleLists.find(Array.isArray) || [];
};

const getTaskSubmissionStatus = (task = {}) =>
  task.submissionStatus ||
  task.status ||
  task.userTaskSubmission?.status ||
  task.submission?.status ||
  "";

const hasSubmittedRecord = (task = {}) => {
  const submissionStatus = getTaskSubmissionStatus(task);
  if (submissionStatus) return isSubmittedStatus(submissionStatus);

  if (task.hasSubmission !== undefined) return Boolean(task.hasSubmission);
  if (task.submissionId !== undefined) return Boolean(task.submissionId);
  if (task.userTaskSubmission !== undefined) return Boolean(task.userTaskSubmission);
  if (task.submission !== undefined) return Boolean(task.submission);

  return false;
};

const isSubmittedStatus = (status = "") =>
  ["submitted", "completed", "done"].includes(
    status.toString().toLowerCase()
  );

const isDraftStatus = (status = "") =>
  status.toString().toLowerCase() === "draft";

const normalizeLevelTools = (roleName, level) => {
  const apiTools = level.tools || [];
  const fallbackTools = getToolsForRoleLevel(roleName, level.level);
  const seenTools = new Set();

  return [...apiTools, ...fallbackTools]
    .filter(Boolean)
    .map((tool) => {
      const name = typeof tool === "string" ? tool : tool.name || tool.label || "";
      const iconUrl = typeof tool === "string" ? getToolIconUrl(tool) : tool.iconUrl || getToolIconUrl(name);

      return { name, iconUrl };
    })
    .filter((tool) => tool.name || tool.iconUrl)
    .filter((tool) => {
      const key = tool.iconUrl || normalizeText(tool.name);
      if (seenTools.has(key)) return false;
      seenTools.add(key);
      return true;
    });
};

export const normalizeMissionLevel = (level = {}, roleName = "") => {
  const { rawProgress, submitted, total, percent, isCompleted } =
    getOptimisticLevelProgress(level);

  return {
    id: level.id,
    title: level.levelLabel || `${level.level || "Roadmap"} Level`,
    role: roleName,
    level: level.levelLabel || level.level || "Roadmap",
    estimateTime: `${submitted}/${total} tasks`,
    isCompleted,
    isUnlocked: Boolean(level.isUnlocked),
    description: level.description || "",
    progress: {
      ...rawProgress,
      submitted,
      total,
      percent,
    },
    skills: level.skills || [],
    tools: normalizeLevelTools(roleName, level),
    order: level.order,
  };
};

export const normalizeTaskListItem = (task = {}, roadmapLevelId) => {
  const id = task.id ?? task.taskId;
  const durationMinutes =
    task.durationMinutes ?? task.duration ?? task.estimatedMinutes;
  const isSubmitted = task.isSubmitted ?? task.isCompleted ?? task.completed;
  const submissionStatus = getTaskSubmissionStatus(task);
  const hasStoredSubmission = hasSubmittedRecord(task);
  const hasExplicitNoSubmission =
    task.hasSubmission === false ||
    task.submissionId === null ||
    task.userTaskSubmission === null ||
    task.submission === null;
  const hasServerSubmission =
    !hasExplicitNoSubmission &&
    (Boolean(isSubmitted) ||
      isSubmittedStatus(submissionStatus) ||
      hasStoredSubmission);
  const hasServerIncompleteStatus =
    !hasServerSubmission &&
    (isDraftStatus(submissionStatus) ||
      isSubmitted === false ||
      task.isCompleted === false ||
      task.completed === false ||
      hasExplicitNoSubmission);

  if (hasServerIncompleteStatus) {
    removeCompletedTaskLocally(id);
  }

  const isCompleted =
    hasServerSubmission ||
    (!hasServerIncompleteStatus && isTaskCompletedLocally(id));

  return {
    id,
    roadmapLevelId,
    order: task.order ?? task.taskNumber,
    title: task.title || task.taskName || "Untitled Task",
    role: task.category || task.role || "Daily Mission",
    level: normalizeDifficulty(task.difficulty || task.level),
    estimateTime: minutesLabel(durationMinutes),
    durationMinutes,
    isCompleted,
    isSubmitted: isCompleted,
  };
};

const getQuestion = (detail, key, fallback) =>
  detail[key] || fallback;

export const normalizeTaskDetail = (detail = {}) => {
  const questions = [
    {
      key: "answer1",
      title: "Reflection 1",
      question: getQuestion(
        detail,
        "question1",
        "Apa tantangan terbesar yang kamu hadapi saat mengerjakan task ini?"
      ),
    },
    {
      key: "answer2",
      title: "Reflection 2",
      question: getQuestion(
        detail,
        "question2",
        "Apa yang kamu pelajari dari task ini?"
      ),
    },
    {
      key: "answer3",
      title: "Reflection 3",
      question: getQuestion(
        detail,
        "question3",
        "Bagaimana kamu akan mengembangkan hasil kerjamu lebih lanjut?"
      ),
    },
  ];

  return {
    id: detail.id,
    title: detail.title || detail.taskName || "Untitled Task",
    role: detail.category || "Daily Mission",
    level: normalizeDifficulty(detail.difficulty || detail.level),
    estimateTime: minutesLabel(
      detail.durationMinutes ?? detail.duration ?? detail.estimatedMinutes
    ),
    durationMinutes:
      detail.durationMinutes ?? detail.duration ?? detail.estimatedMinutes,
    description: detail.description || "",
    learningGoal: detail.learningGoal || "",
    instructions: detail.instructions || [],
    requirements: detail.requirements || [],
    hint: detail.hint,
    acceptsFigmaLink: Boolean(detail.acceptsFigmaLink),
    acceptsFileUpload: Boolean(detail.acceptsFileUpload),
    questions,
    assessment: {
      tasks: questions.map((question, index) => ({
        id: question.key,
        taskName: question.title,
        description: question.question,
        requirements: detail.requirements || [],
        hint: detail.hint,
        submission: {
          workMethods: [
            detail.acceptsFileUpload && "upload",
            detail.acceptsFigmaLink && "figmaLink",
            "textExplanation",
          ].filter(Boolean),
          linkInput: detail.acceptsFigmaLink
            ? {
                placeholder: "Paste your work link here...",
                helperText: "Make sure sharing permission is set to public.",
              }
            : null,
          essay: {
            label: question.question,
            placeholder: "Tulis jawaban minimal 10 karakter...",
            rows: index === 2 ? 5 : 4,
          },
        },
      })),
    },
  };
};

const missionService = {
  markTaskCompleted: markTaskCompletedLocally,

  getRoadmapLevels: async (roleId) => {
    const response = await api.get(`/api/daily-mission/roadmap/${roleId}`);
    const data = response.data?.data || {};
    const levels = data.levels || [];

    return {
      success: true,
      data: {
        roleId: data.roleId,
        roleName: data.roleName,
        levels: levels.map((level) => normalizeMissionLevel(level, data.roleName)),
      },
      message: response.data?.message || "Success",
    };
  },

  getTasksByLevel: async (roadmapLevelId) => {
    const response = await api.get(`/api/daily-mission/tasks/${roadmapLevelId}`);
    const tasks = normalizeListResponse(response.data?.data ?? response.data);

    return {
      success: true,
      data: tasks.map((task) => normalizeTaskListItem(task, roadmapLevelId)),
      message: response.data?.message || "Success",
    };
  },

  getTaskDetail: async (taskId) => {
    const response = await api.get(`/api/daily-mission/task/${taskId}`);

    return {
      success: true,
      data: normalizeTaskDetail(response.data?.data),
      message: response.data?.message || "Success",
    };
  },

  saveDraft: async (taskId, payload = {}) => {
    const response = await api.post(`/api/daily-mission/task/${taskId}/draft`, payload);

    return {
      success: true,
      data: response.data?.data,
      message: response.data?.message || "Draft berhasil disimpan",
    };
  },

  submitTask: async (taskId, payload) => {
    const response = await api.post(`/api/daily-mission/task/${taskId}/submit`, payload);

    return {
      success: true,
      data: response.data?.data,
      message: response.data?.message || "Task berhasil di-submit",
    };
  },
};

export default missionService;
