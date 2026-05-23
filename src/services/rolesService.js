import api from "./api";
import { POPULAR_ROLE_NAMES } from "../constants/careerTools";

export const normalizeRole = (role = {}) => {
  const safeRole = role || {};

  return {
    id: safeRole.id ?? safeRole.roleId ?? safeRole.role_id,
    name: safeRole.name || safeRole.roleName || safeRole.role_name || safeRole.title || "",
    description: safeRole.description || "",
    careerLevel: safeRole.careerLevel || "",
    estimateYears: safeRole.estimateYears || "",
    isPopular: Boolean(safeRole.isPopular),
  };
};

const normalizeRoadmapRole = (roadmap = {}) => {
  const safeRoadmap = roadmap || {};

  return normalizeRole({
    id: safeRoadmap.roleId ?? safeRoadmap.id,
    name: safeRoadmap.roleName || safeRoadmap.name || safeRoadmap.title,
    description: safeRoadmap.description,
    careerLevel: safeRoadmap.careerLevel,
    estimateYears: safeRoadmap.estimateYears,
  });
};

const pickExactRole = (roles = [], roleName = "") => {
  const normalizedRoleName = roleName.toLowerCase().trim();

  return (
    roles.find((role) => role.name?.toLowerCase().trim() === normalizedRoleName) ||
    roles.find((role) =>
      role.name?.toLowerCase().includes(normalizedRoleName)
    ) ||
    roles[0]
  );
};

const rolesService = {
  getPopularRoles: async () => {
    const response = await api.get("/api/roles/popular");
    const roles = response.data?.data || [];

    return {
      success: true,
      total: response.data?.total ?? roles.length,
      data: roles.map(normalizeRole),
    };
  },

  searchRoles: async (query) => {
    const response = await api.get("/api/roles", {
      params: { query },
    });
    const roles = response.data?.data || [];

    return {
      success: true,
      total: response.data?.total ?? roles.length,
      data: roles.map(normalizeRole),
      suggestions: response.data?.suggestions || POPULAR_ROLE_NAMES,
    };
  },

  resolveRoleByName: async (roleName) => {
    if (!roleName) return null;

    const result = await rolesService.searchRoles(roleName);
    return pickExactRole(result.data, roleName) || null;
  },

  resolveRoleById: async (roleId) => {
    if (!roleId) return null;

    try {
      const result = await rolesService.getPopularRoles();
      const popularRole = result.data.find((role) => String(role.id) === String(roleId));
      if (popularRole) return popularRole;
    } catch {
      // The current user's default roadmap is the authoritative fallback.
    }

    try {
      const currentUserRole = await rolesService.resolveCurrentUserRole();
      if (!currentUserRole) return null;

      return currentUserRole;
    } catch {
      return null;
    }
  },

  resolveCurrentUserRole: async () => {
    const response = await api.get("/api/career-roadmap/default");
    const role = normalizeRoadmapRole(response.data?.data);

    return role.name ? role : null;
  },
};

export default rolesService;
