import { dummyStats, dummySkills, dummyPeriodReports } from "../../../constants/dummy/trendsDummy";

const normalizeRole = (role = "") =>
  role.toString().toLowerCase().replace(/[^a-z0-9]/g, "");

const trendsService = {
  getStatsByRole: async (role) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (!role) return { success: false, message: "Role is required" };
    const normalizedRole = normalizeRole(role);
    const result =
      dummyStats[normalizedRole] ||
      Object.entries(dummyStats).find(([key]) =>
        key.includes(normalizedRole) || normalizedRole.includes(key)
      )?.[1];
    return result
      ? { success: true, data: result }
      : { success: false, message: "Role not found" };
  },

  getTrendingSkills: async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true, data: dummySkills };
  },

  // ← tambah ini
  getPeriodReport: async (year) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (!year) return { success: false, message: "Year is required" };
    const result = dummyPeriodReports[year];
    return result
      ? { success: true, data: result }
      : { success: false, message: "Report not found for this period" };
  },
};

export default trendsService;
