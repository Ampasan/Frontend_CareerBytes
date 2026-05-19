import { dummyStats, dummySkills } from "../../../constants/dummy/trendsDummy";

const trendsService = {
  getStatsByRole: async (role) => {
    await new Promise((resolve) => setTimeout(resolve, 800)); // simulasi loading

    if (!role) {
      return { success: false, message: "Role is required" };
    }

    // Cari exact match dulu, lalu fallback ke partial match
    const result =
      dummyStats[role] ||
      Object.entries(dummyStats).find(([key]) =>
        key.includes(role.toLowerCase()) ||
        role.toLowerCase().includes(key)
      )?.[1];

    if (result) {
      return { success: true, data: result };
    } else {
      return { success: false, message: "Role not found" };
    }
  },

  getTrendingSkills: async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true, data: dummySkills };
  },
};

export default trendsService;