import { mockRoadmaps } from "../../../constants/dummy/roadmap";

const roadmapService = {
  getRoadmapByRole: async (role) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    if (!role) {
       return { success: false, message: "Role is required" };
    }

    const result = mockRoadmaps[role] || 
                   Object.values(mockRoadmaps).find(r => r.title.toLowerCase().includes(role.toLowerCase()));
    
    if (result) {
      return {
        success: true,
        data: result
      };
    } else {
      return {
        success: false,
        message: "Roadmap not found"
      };
    }
  }
};

export default roadmapService;
