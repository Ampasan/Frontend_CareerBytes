// ========================================
// Stats Card (search bar)
// ========================================
export const dummyStats = {
  "uiux": [
    { id: 1, icon: "trending", title: "Top Trending Skill", content: "UI/UX DESIGNER", desc: "+75% growth" },
    { id: 2, icon: null, title: "Skills Analyzed", content: "120+", desc: "Across all industries" },
    { id: 3, icon: null, title: "Data Sources", content: "50,000+", desc: "Job postings" },
  ],
  "frontend": [
    { id: 1, icon: "trending", title: "Top Trending Skill", content: "FRONT-END DEVELOPER", desc: "+80% growth" },
    { id: 2, icon: null, title: "Skills Analyzed", content: "95+", desc: "Across all industries" },
    { id: 3, icon: null, title: "Data Sources", content: "40,000+", desc: "Job postings" },
  ],
  "backend": [
    { id: 1, icon: "trending", title: "Top Trending Skill", content: "BACK-END DEVELOPER", desc: "+70% growth" },
    { id: 2, icon: null, title: "Skills Analyzed", content: "110+", desc: "Across all industries" },
    { id: 3, icon: null, title: "Data Sources", content: "45,000+", desc: "Job postings" },
  ],
  "data": [
    { id: 1, icon: "trending", title: "Top Trending Skill", content: "DATA ANALYST", desc: "+85% growth" },
    { id: 2, icon: null, title: "Skills Analyzed", content: "80+", desc: "Across all industries" },
    { id: 3, icon: null, title: "Data Sources", content: "35,000+", desc: "Job postings" },
  ],
  "product": [
    { id: 1, icon: "trending", title: "Top Trending Skill", content: "PRODUCT MANAGER", desc: "+65% growth" },
    { id: 2, icon: null, title: "Skills Analyzed", content: "70+", desc: "Across all industries" },
    { id: 3, icon: null, title: "Data Sources", content: "30,000+", desc: "Job postings" },
  ],
};

export const dummyPeriods = ["2026", "2025", "2024"];

// ========================================
// Growth & Demand Card
// ========================================
export const dummySkills = {
  year: "2025",
  skills: [
    { id: 1, name: "AI/Machine Learning", percent: "+95%", bars: [{ label: "Growth", progress: 70 }, { label: "Demand", progress: 95 }] },
    { id: 2, name: "Cloud Computing",     percent: "+85%", bars: [{ label: "Growth", progress: 60 }, { label: "Demand", progress: 85 }] },
    { id: 3, name: "Cybersecurity",       percent: "+92%", bars: [{ label: "Growth", progress: 75 }, { label: "Demand", progress: 92 }] },
    { id: 4, name: "Data Science",        percent: "+78%", bars: [{ label: "Growth", progress: 55 }, { label: "Demand", progress: 78 }] },
    { id: 5, name: "UI/UX Design",        percent: "+75%", bars: [{ label: "Growth", progress: 50 }, { label: "Demand", progress: 75 }] },
    { id: 6, name: "DevOps",              percent: "+72%", bars: [{ label: "Growth", progress: 48 }, { label: "Demand", progress: 72 }] },
    { id: 7, name: "Mobile Development",  percent: "+68%", bars: [{ label: "Growth", progress: 45 }, { label: "Demand", progress: 68 }] },
    { id: 8, name: "Product Management",  percent: "+65%", bars: [{ label: "Growth", progress: 40 }, { label: "Demand", progress: 65 }] },
  ],
};

// ========================================
// Shared Skill Insights — dipakai semua tahun
// Key = nama skill di chartData
// ========================================
export const skillInsights = {
  "AI/ML": {
    title: "AI and Machine Learning Dominance",
    description: "AI/ML skills continue to lead with strong industry adoption. Companies are investing heavily in AI-powered solutions across all sectors.",
  },
  "Cloud Computing": {
    title: "Cloud Infrastructure Growth",
    description: "Cloud computing remains critical as organizations shift to remote and hybrid models. AWS, Azure, and Google Cloud certifications are highly valued.",
  },
  "Cybersecurity": {
    title: "Security Takes Priority",
    description: "With rising cyber threats, cybersecurity skills have seen significant increase in demand. Companies are prioritizing security-first development practices.",
  },
  "Data Science": {
    title: "Data-Driven Decision Making",
    description: "Organizations increasingly rely on data science to optimize operations and drive business intelligence strategies.",
  },
  "UI/UX Design": {
    title: "User Experience Becomes Essential",
    description: "Companies are focusing more on intuitive user experiences to improve engagement, retention, and product satisfaction.",
  },
  "DevOps": {
    title: "DevOps Accelerates Delivery",
    description: "DevOps practices continue gaining traction as teams prioritize faster deployment cycles and system reliability.",
  },
  "Mobile Dev": {
    title: "Mobile Development Stays Relevant",
    description: "Mobile-first experiences remain a priority as smartphone usage continues to dominate digital interactions.",
  },
  "Product Mgmt": {
    title: "Product Strategy Gains Importance",
    description: "Companies increasingly rely on product managers to align business goals, user needs, and development priorities.",
  },
};

// ========================================
// Shared Skill Actions — dipakai semua tahun
// ========================================
export const skillActions = {
  "AI/ML": {
    title: "Start Learning AI Fundamentals",
    description: "Begin with machine learning basics and Python programming to position yourself for high-growth opportunities.",
    linkText: "View AI Roadmap",
    path: "/career-roadmap",
  },
  "Cloud Computing": {
    title: "Earn Cloud Certifications",
    description: "Consider AWS or Azure certifications to demonstrate cloud infrastructure expertise to employers.",
    linkText: "Explore Courses",
    path: "/career-roadmap",
  },
  "Cybersecurity": {
    title: "Learn Security Best Practices",
    description: "Build secure coding habits and understand modern cyber threats to stay industry-ready.",
    linkText: "Explore Security",
    path: "/career-roadmap",
  },
  "Data Science": {
    title: "Practice Data Analytics",
    description: "Strengthen your analytical thinking and master Python-based data workflows.",
    linkText: "View Learning Path",
    path: "/career-roadmap",
  },
  "UI/UX Design": {
    title: "Deepen Your Design Skills",
    description: "Improve your Figma proficiency, design systems knowledge, and user research techniques.",
    linkText: "View Design Roadmap",
    path: "/career-roadmap",
  },
  "DevOps": {
    title: "Master DevOps Practices",
    description: "Learn CI/CD pipelines, containerization with Docker, and infrastructure as code.",
    linkText: "Explore DevOps Path",
    path: "/career-roadmap",
  },
  "Mobile Dev": {
    title: "Build Mobile Applications",
    description: "Start with React Native or Flutter to build cross-platform mobile apps efficiently.",
    linkText: "View Mobile Roadmap",
    path: "/career-roadmap",
  },
  "Product Mgmt": {
    title: "Strengthen Product Strategy",
    description: "Improve roadmap planning, stakeholder communication, and product analysis skills.",
    linkText: "See Product Resources",
    path: "/career-roadmap",
  },
};

// ===============================================
// Role Actions - Card ke-3 menyesuaikan role user
// ===============================================
export const roleActions = {
  "UIUX Designer": {
    title: "Strengthen Your Current Skills",
    description: "If you're already in UI/UX Design, consider adding AI/UX integration skills to stay competitive.",
    linkText: "See Recommendations",
    path: "/mission",
  },
  "Frontend Developer": {
    title: "Level Up Your Frontend Skills",
    description: "Explore advanced React patterns, performance optimization, and modern CSS techniques to stand out.",
    linkText: "View Frontend Roadmap",
    path: "/mission",
  },
  "Backend Developer": {
    title: "Master Scalable Backend Systems",
    description: "Strengthen your API architecture, database optimization, and cloud deployment knowledge.",
    linkText: "View Backend Roadmap",
    path: "/mission",
  },
  "Data Analyst": {
    title: "Advance Your Data Skills",
    description: "Explore machine learning basics and advanced SQL to transition into higher-value data roles.",
    linkText: "View Data Roadmap",
    path: "/mission",
  },
  "Product Manager": {
    title: "Sharpen Your Product Strategy",
    description: "Deepen your understanding of OKRs, user research, and data-driven product decisions.",
    linkText: "View PM Resources",
    path: "/mission",
  },
};

// ========================================
// Period Reports — hanya data yang unik per tahun
// insights & actions TIDAK disimpan di sini,
// melainkan di-drive dari chartData di TrendsPeriod
// ========================================
export const dummyPeriodReports = {
  "2025": {
    year: "2025",
    subtitle: "Market insights and skill popularity for 2025",
    chartData: [
      { skill: "AI/ML",           score: 95 },
      { skill: "Cloud Computing", score: 82 },
      { skill: "Cybersecurity",   score: 78 },
      { skill: "Data Science",    score: 74 },
      { skill: "UI/UX Design",    score: 70 },
      { skill: "DevOps",          score: 65 },
      { skill: "Mobile Dev",      score: 62 },
      { skill: "Product Mgmt",    score: 58 },
    ],
    stats: [
      { id: 1, icon: "trending", value: "95%",  label: "Top Skill Growth (AI/ML)" },
      { id: 2, icon: null,       value: "8",    label: "High-Demand Skills" },
      { id: 3, icon: null,       value: "50K+", label: "Job Postings Analyzed" },
    ],
  },
  "2024": {
    year: "2024",
    subtitle: "Market insights and skill popularity for 2024",
    chartData: [
      { skill: "Data Science",    score: 90 },  
      { skill: "AI/ML",           score: 88 },
      { skill: "Cloud Computing", score: 98 },
      { skill: "Cybersecurity",   score: 74 },
      { skill: "UI/UX Design",    score: 66 },
      { skill: "DevOps",          score: 61 },
      { skill: "Mobile Dev",      score: 58 },
      { skill: "Product Mgmt",    score: 54 },
    ],
    stats: [
      { id: 1, icon: "trending", value: "90%",  label: "Top Skill Growth" },
      { id: 2, icon: null,       value: "7",    label: "High-Demand Skills" },
      { id: 3, icon: null,       value: "42K+", label: "Job Postings Analyzed" },
    ],
  },
};