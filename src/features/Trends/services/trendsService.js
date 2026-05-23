import api from "../../../services/api";

const normalizeText = (value = "") =>
  value.toString().toLowerCase().replace(/[^a-z0-9]/g, "");

const toNumber = (value) => Number(value) || 0;

const normalizeTrendingSkill = (skill = {}) => ({
  id: skill.id,
  name: skill.skillName,
  skillName: skill.skillName,
  year: skill.year,
  popularityScore: skill.popularityScore ?? 0,
  growth: skill.growth ?? 0,
  demand: skill.demand ?? 0,
  createdAt: skill.createdAt,
});

const isPreferredSkill = (candidate, current) => {
  const candidateScores = [
    toNumber(candidate.year),
    toNumber(candidate.popularityScore),
    toNumber(candidate.demand),
    toNumber(candidate.growth),
  ];
  const currentScores = [
    toNumber(current.year),
    toNumber(current.popularityScore),
    toNumber(current.demand),
    toNumber(current.growth),
  ];

  for (let index = 0; index < candidateScores.length; index += 1) {
    if (candidateScores[index] !== currentScores[index]) {
      return candidateScores[index] > currentScores[index];
    }
  }

  return false;
};

const getUniqueTrendingSkills = (skills = []) => {
  const skillsByName = new Map();

  skills.forEach((skill) => {
    const key = normalizeText(skill.skillName);
    if (!key) return;

    const currentSkill = skillsByName.get(key);
    if (!currentSkill || isPreferredSkill(skill, currentSkill)) {
      skillsByName.set(key, skill);
    }
  });

  return Array.from(skillsByName.values());
};

const filterSkillsByYear = (skills = [], year) =>
  year ? skills.filter((skill) => String(skill.year) === String(year)) : skills;

const getReportYear = (skills = [], year) =>
  year ||
  skills.reduce((latestYear, skill) => {
    const skillYear = toNumber(skill.year);
    return skillYear > latestYear ? skillYear : latestYear;
  }, 0) ||
  new Date().getFullYear();

const toGrowthDemandData = (skills = [], year) => ({
  year: getReportYear(skills, year),
  skills: skills.map((skill) => ({
    id: skill.id,
    name: skill.skillName,
    bars: [
      { label: "Growth", progress: skill.growth },
      { label: "Demand", progress: skill.demand },
    ],
  })),
});

const toStats = (skills = [], role = "") => {
  const normalizedRole = normalizeText(role);
  const sortedSkills = [...skills].sort(
    (a, b) => b.popularityScore - a.popularityScore
  );
  const match =
    sortedSkills.find((skill) => normalizeText(skill.skillName) === normalizedRole) ||
    sortedSkills.find((skill) =>
      normalizeText(skill.skillName).includes(normalizedRole)
    ) ||
    sortedSkills[0];

  if (!match) return [];

  return [
    {
      id: 1,
      icon: "trending",
      title: "Top Trending Skill",
      content: match.skillName?.toUpperCase(),
      desc: `+${match.growth}% growth`,
    },
    {
      id: 2,
      icon: null,
      title: "Skills Analyzed",
      content: `${skills.length}`,
      desc: "Across market data",
    },
    {
      id: 3,
      icon: null,
      title: "Demand Score",
      content: `${match.demand}%`,
      desc: `${match.year} data`,
    },
  ];
};

const getRolePath = (basePath, role) =>
  role ? `${basePath}?role=${encodeURIComponent(role)}` : basePath;

const toPeriodReport = (skills = [], year, userRole = "") => {
  const sortedSkills = [...skills].sort(
    (a, b) => b.popularityScore - a.popularityScore
  );
  const topSkill = sortedSkills[0];
  const topRole = topSkill?.skillName || "Recommended Role";
  const currentRole = userRole || topRole;
  const isCurrentTopRole = normalizeText(currentRole) === normalizeText(topRole);

  return {
    year,
    subtitle: `Market insights and skill popularity for ${year}`,
    chartData: sortedSkills.map((skill) => ({
      skill: skill.skillName,
      score: skill.popularityScore,
    })),
    insights: sortedSkills.slice(0, 3).map((skill) => ({
      title: `${skill.skillName} demand is active`,
      description: `${skill.skillName} has ${skill.popularityScore}% popularity, ${skill.growth}% growth, and ${skill.demand}% demand in ${year}.`,
    })),
    actions: [
      {
        title: `Build Your ${topRole} Roadmap`,
        description: `${topRole} leads this period with ${topSkill?.popularityScore || 0}% popularity and ${topSkill?.growth || 0}% growth. Start with a focused roadmap for this role.`,
        linkText: `View ${topRole} Roadmap`,
        path: getRolePath("/career-roadmap", topRole),
      },
      {
        title: `Explore ${topRole} Missions`,
        description: `Practice daily missions aligned with the ${topRole} roadmap so your learning tasks match the role highlighted above.`,
        linkText: "Explore Courses",
        path: getRolePath("/daily-mission", topRole),
      },
      {
        title: isCurrentTopRole
          ? `Strengthen Your ${currentRole} Path`
          : `Connect Your ${currentRole} Path to ${topRole}`,
        description: isCurrentTopRole
          ? `${currentRole} already matches the top trend for ${year}. Review your roadmap recommendations to keep building the right next skills.`
          : `Your current role is ${currentRole}. Review its roadmap recommendations and compare the next skills with the rising demand for ${topRole}.`,
        linkText: "See Recommendations",
        path: getRolePath("/career-roadmap", currentRole),
      },
    ],
    stats: [
      {
        id: 1,
        icon: "trending",
        value: `${topSkill?.popularityScore || 0}%`,
        label: `Top Skill Popularity (${topSkill?.skillName || "-"})`,
      },
      {
        id: 2,
        icon: null,
        value: `${skills.length}`,
        label: "High-Demand Skills",
      },
      {
        id: 3,
        icon: null,
        value: `${topSkill?.demand || 0}%`,
        label: "Top Demand Score",
      },
    ],
  };
};

const trendsService = {
  getPeriods: async () => {
    const response = await api.get("/api/trending-skills/periods");

    return {
      success: true,
      data: (response.data?.data || []).map(String),
      message: response.data?.message || "Success",
    };
  },

  getStatsByRole: async (role) => {
    if (!role) return { success: false, message: "Role is required" };

    const response = await api.get("/api/trending-skills");
    const skills = getUniqueTrendingSkills(
      (response.data?.data || []).map(normalizeTrendingSkill)
    );
    const stats = toStats(skills, role);

    return stats.length
      ? { success: true, data: stats }
      : { success: false, message: "Role not found" };
  },

  getTrendingSkills: async (year) => {
    const response = await api.get("/api/trending-skills", {
      params: year ? { year } : {},
    });
    const skills = getUniqueTrendingSkills(
      filterSkillsByYear(
        (response.data?.data || []).map(normalizeTrendingSkill),
        year
      )
    );

    return {
      success: true,
      data: toGrowthDemandData(skills, year),
    };
  },

  getPeriodReport: async (year, userRole = "") => {
    const response = await api.get("/api/trending-skills", {
      params: { year },
    });
    const skills = getUniqueTrendingSkills(
      filterSkillsByYear(
        (response.data?.data || []).map(normalizeTrendingSkill),
        year
      )
    );

    return skills.length
      ? { success: true, data: toPeriodReport(skills, year, userRole) }
      : { success: false, message: "Report not found for this period" };
  },
};

export default trendsService;
