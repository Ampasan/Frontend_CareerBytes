import api, { getStoredToken } from "../../../services/api";
import rolesService from "../../../services/rolesService";
import {
  getRoleConfig,
  getToolIconUrl,
  getToolsForRoleLevel,
  POPULAR_ROLE_NAMES,
} from "../../../constants/careerTools";
import { getOptimisticLevelProgress } from "../../mission/services/completedTasksStorage";

const DEFAULT_ROADMAP_LEVEL = "Entry Level";
const DEFAULT_ROADMAP_ESTIMATE = "1 - 2 Years";
const FALLBACK_LEVELS = [
  {
    key: "beginner",
    label: "Beginner Level",
    description:
      "Build the core foundations, learn the workflow, and get comfortable with essential tools.",
    defaultSkills: ["Core fundamentals", "Workflow basics", "Guided practice"],
  },
  {
    key: "intermediate",
    label: "Intermediate Level",
    description:
      "Turn the basics into project work, collaboration habits, and portfolio-ready output.",
    defaultSkills: ["Project practice", "Collaboration workflow", "Portfolio deliverable"],
  },
  {
    key: "advanced",
    label: "Advanced Level",
    description:
      "Strengthen advanced delivery, production standards, and career-ready decision making.",
    defaultSkills: ["Advanced patterns", "Production quality", "Career-ready review"],
  },
];

const normalizeText = (value = "") =>
  value.toString().toLowerCase().replace(/[^a-z0-9]/g, "");

const firstFilled = (...values) =>
  values.find(
    (value) =>
      value !== null &&
      value !== undefined &&
      value.toString().trim() !== ""
  );

const sortByOrder = (items = []) =>
  [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

const uniqueRoadmaps = (roadmaps = []) => {
  const seenRoadmaps = new Set();

  return roadmaps.filter((roadmap) => {
    const key = normalizeText(roadmap.title || roadmap.id || "");
    if (!key || seenRoadmaps.has(key)) return false;

    seenRoadmaps.add(key);
    return true;
  });
};

const uniqueNames = (names = []) => {
  const seenNames = new Set();

  return names.filter((name) => {
    const key = normalizeText(name);
    if (!key || seenNames.has(key)) return false;

    seenNames.add(key);
    return true;
  });
};

const getStatus = (level, index, isCompleted = level.isCompleted) => {
  if (isCompleted) return "Completed";
  if (level.isUnlocked || index === 0) return "On Going";
  return false;
};

const createFallbackSkills = (roleName, levelKey, defaultSkills = []) => {
  const tools = getToolsForRoleLevel(roleName, levelKey);
  const toolSkills = tools.map((toolName) => `${toolName} practice`);

  return uniqueNames([...toolSkills, ...defaultSkills]).slice(0, 3);
};

const createFallbackRoadmap = (roleName, roadmapIndex = 0) =>
  normalizeRoadmap({
    id: `local-${normalizeText(roleName)}`,
    name: roleName,
    description: `A practical roadmap to grow into a ${roleName} role through focused skills, tools, and projects.`,
    careerLevel: DEFAULT_ROADMAP_LEVEL,
    estimateYears: DEFAULT_ROADMAP_ESTIMATE,
    levels: FALLBACK_LEVELS.map((level, index) => ({
      id: `local-${normalizeText(roleName)}-${level.key}`,
      level: level.key,
      levelLabel: level.label,
      description: level.description,
      skills: createFallbackSkills(roleName, level.key, level.defaultSkills),
      tools: getToolsForRoleLevel(roleName, level.key),
      order: index + 1,
      isUnlocked: index === 0,
      isCompleted: false,
      progress: { submitted: 0, total: 3, percent: 0 },
    })),
    order: roadmapIndex + 1,
  });

const getFallbackRoadmaps = ({ limit } = {}) => {
  const roleNames = Number.isFinite(limit)
    ? POPULAR_ROLE_NAMES.slice(0, limit)
    : POPULAR_ROLE_NAMES;
  const roadmaps = uniqueRoadmaps(roleNames.map(createFallbackRoadmap));

  return {
    success: roadmaps.length > 0,
    data: roadmaps,
    total: roadmaps.length,
    message: "Using local roadmap preview",
    isFallback: true,
  };
};

const normalizeTools = (roleName, level) => {
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

const resolveRoadmapRoleNames = async (role) => {
  const trimmedRole = role?.toString().trim();
  if (!trimmedRole) return [];

  const localRole = getRoleConfig(trimmedRole);
  const localRoleNames = localRole
    ? [localRole.name, ...(localRole.aliases || [])]
    : [];

  try {
    const resolvedRole = await rolesService.resolveRoleByName(trimmedRole);
    return uniqueNames([...localRoleNames, resolvedRole?.name, trimmedRole]);
  } catch {
    return uniqueNames([...localRoleNames, trimmedRole]);
  }
};

export const normalizeRoadmap = (roadmap = {}) => {
  const levels = sortByOrder(roadmap.levels || []);
  const title = firstFilled(roadmap.name, roadmap.roleName, roadmap.title) || "";
  const level =
    firstFilled(
      roadmap.careerLevel,
      roadmap.career_level,
      roadmap.level,
      roadmap.role?.careerLevel,
      roadmap.role?.career_level,
      roadmap.role?.level
    ) || DEFAULT_ROADMAP_LEVEL;
  const estimate =
    firstFilled(
      roadmap.estimateYears,
      roadmap.estimate_years,
      roadmap.estimate,
      roadmap.duration,
      roadmap.role?.estimateYears,
      roadmap.role?.estimate_years,
      roadmap.role?.estimate
    ) || DEFAULT_ROADMAP_ESTIMATE;

  return {
    id: roadmap.id,
    roleId: roadmap.id,
    title,
    description: roadmap.description || "",
    level,
    estimate,
    steps: levels.map((level, index) => {
      const optimisticProgress = getOptimisticLevelProgress(level);
      const progress = optimisticProgress.percent;
      const isCompleted = optimisticProgress.isCompleted;
      const skills = level.skills || [];
      const checkedCount = Math.round((progress / 100) * skills.length);

      return {
        id: level.id,
        level: level.level,
        title: level.levelLabel || `${level.level || "Roadmap"} Level`,
        status: getStatus(level, index, isCompleted),
        description: level.description || "",
        checklist: skills.map((skill, skillIndex) => ({
          isCheck: isCompleted || skillIndex < checkedCount,
          text: skill,
        })),
        progress,
        tools: normalizeTools(title, level),
        order: level.order ?? index + 1,
        isUnlocked: level.isUnlocked ?? index === 0,
        isCompleted,
      };
    }),
  };
};

const roadmapService = {
  getDefaultRoadmap: async () => {
    const response = await api.get("/api/career-roadmap/default");

    return {
      success: true,
      data: normalizeRoadmap(response.data?.data),
      message: response.data?.message || "Success",
    };
  },

  getRoadmapByRole: async (role) => {
    if (!role) {
      return roadmapService.getDefaultRoadmap();
    }

    const roleNames = await resolveRoadmapRoleNames(role);
    let lastError;

    for (const roleName of roleNames) {
      try {
        const response = await api.get("/api/career-roadmap", {
          params: { role: roleName },
        });

        return {
          success: true,
          data: normalizeRoadmap(response.data?.data),
          message: response.data?.message || "Success",
        };
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error("Role is required");
  },

  getAllRoadmaps: async ({ limit } = {}) => {
    if (!getStoredToken()) {
      return getFallbackRoadmaps({ limit });
    }

    let backendRoleNames = [];

    try {
      const rolesResponse = await rolesService.getPopularRoles();
      backendRoleNames = (rolesResponse.data || []).map((role) => role.name);
    } catch {
      backendRoleNames = [];
    }

    const allRoleNames = uniqueNames([...backendRoleNames, ...POPULAR_ROLE_NAMES])
      .filter(Boolean);
    const roleNames = Number.isFinite(limit)
      ? allRoleNames.slice(0, limit)
      : allRoleNames;

    if (roleNames.length === 0) {
      return getFallbackRoadmaps({ limit });
    }

    const roadmapResults = await Promise.allSettled(
      roleNames.map((roleName) => roadmapService.getRoadmapByRole(roleName))
    );
    const roadmaps = uniqueRoadmaps(
      roadmapResults
        .filter(
          (result) =>
            result.status === "fulfilled" &&
            result.value?.success &&
            result.value?.data?.steps?.length > 0
        )
        .map((result) => result.value.data)
    );

    if (roadmaps.length === 0) {
      return getFallbackRoadmaps({ limit });
    }

    return {
      success: true,
      data: roadmaps,
      total: roadmaps.length,
    };
  },

  getPopularRoadmaps: async (options) => roadmapService.getAllRoadmaps(options),
};

export default roadmapService;
