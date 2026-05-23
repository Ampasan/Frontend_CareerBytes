import api from "../../../services/api";
import rolesService from "../../../services/rolesService";

const normalizeQuestion = (question = {}) => ({
  id: question.id,
  question: question.question,
  options: question.options || [],
  skillName: question.skillName || "",
  difficulty: question.difficulty || "",
});

export const normalizeAssessmentResult = (result = {}) => ({
  user_id: result.user_id,
  role_applied: result.role_applied || "",
  overall_match: result.overall_match ?? 0,
  level_badge: result.level_badge || "BEGINNER",
  skills_analysis: result.skills_analysis || [],
});

const skillAssessmentService = {
  getQuestions: async (role) => {
    const response = await api.get("/api/skill-assessment/questions", {
      params: { role },
    });

    return {
      success: true,
      role: response.data?.role || role,
      total: response.data?.total || 0,
      data: (response.data?.data || []).map(normalizeQuestion),
      message: response.data?.message || "Success",
    };
  },

  submitAssessment: async ({ roleId, role, answers }) => {
    let resolvedRoleId = roleId;

    if (!resolvedRoleId && role) {
      const resolvedRole = await rolesService.resolveRoleByName(role);
      resolvedRoleId = resolvedRole?.id;
    }

    const response = await api.post("/api/skill-assessment/submit", {
      roleId: resolvedRoleId,
      answers,
    });

    return {
      success: true,
      data: normalizeAssessmentResult(response.data?.data),
      message: response.data?.message || "Assessment Complete!",
    };
  },

  getLatestResult: async () => {
    const response = await api.get("/api/skill-assessment/result");

    return {
      success: true,
      data: normalizeAssessmentResult(response.data?.data),
      message: response.data?.message || "Success",
    };
  },
};

export default skillAssessmentService;
