import GdocsLogo from "../../assets/logo/gdocs.svg";
import FigmaLogo from "../../assets/logo/figma.svg";
import AdobeXDLogo from "../../assets/logo/adobe_xd.svg";
import NotionLogo from "../../assets/logo/notion.svg";
import GithubLogo from "../../assets/logo/github.svg";

export const mockRoadmaps = {
  "UI/UX Designer": {
    title: "UI/UX Designer",
    description: "Design intuitive and engaging digital experiences by understanding user needs and translating them into effective interfaces.",
    level: "Mid Career",
    estimate: "3 - 4 Years",
    steps: [
      {
        title: "Beginner Level",
        status: "Completed",
        description: "Building the foundation of visual communication and user empathy.",
        checklist: [
          { isCheck: true, text: "User research" },
          { isCheck: true, text: "Wireframe" },
          { isCheck: true, text: "Basic Typography" },
          { isCheck: true, text: "Color Theory" },
        ],
        progress: 100,
        tools: [GdocsLogo, FigmaLogo]
      },
      {
        title: "Intermediate Level",
        status: "On Going",
        description: "Mastering interaction patterns and shipping complex design systems.",
        checklist: [
          { isCheck: true, text: "Auto Layout" },
          { isCheck: false, text: "Prototyping" },
          { isCheck: false, text: "Design Systems" },
          { isCheck: false, text: "Usability Testing" },
        ],
        progress: 80,
        tools: [FigmaLogo, AdobeXDLogo]
      },
      {
        title: "Advanced Level",
        status: false,
        description: "Leading design vision, mentoring teams, and driving business strategy through UX.",
        checklist: [
          { isCheck: false, text: "Leadership" },
          { isCheck: false, text: "UX Strategy" },
          { isCheck: false, text: "Stakeholder Management" },
          { isCheck: false, text: "Advanced Interaction" },
        ],
        progress: 0,
        tools: [NotionLogo, FigmaLogo]
      },
    ]
  },
  "Frontend Developer": {
    title: "Frontend Developer",
    description: "Build beautiful and responsive web applications using modern web technologies and frameworks.",
    level: "Low Level",
    estimate: "1 - 2 Years",
    steps: [
      {
        title: "Beginner Level",
        status: "On Going",
        description: "Learning HTML, CSS, and basic JavaScript to build static websites.",
        checklist: [
          { isCheck: true, text: "HTML5 & CSS3" },
          { isCheck: true, text: "Responsive Design" },
          { isCheck: false, text: "JavaScript ES6+" },
          { isCheck: false, text: "Git Basics" },
        ],
        progress: 50,
        tools: [GithubLogo, FigmaLogo]
      },
      {
        title: "Intermediate Level",
        status: false,
        description: "Working with React, state management, and API integrations.",
        checklist: [
          { isCheck: false, text: "React Hooks" },
          { isCheck: false, text: "Tailwind CSS" },
          { isCheck: false, text: "Redux / Context API" },
          { isCheck: false, text: "Unit Testing" },
        ],
        progress: 0,
        tools: [GithubLogo, NotionLogo]
      },
      {
        title: "Advanced Level",
        status: false,
        description: "Architecting large-scale applications and optimizing performance.",
        checklist: [
          { isCheck: false, text: "Next.js & SSR" },
          { isCheck: false, text: "CI/CD Pipelines" },
          { isCheck: false, text: "Performance Audits" },
          { isCheck: false, text: "Team Mentorship" },
        ],
        progress: 0,
        tools: [GithubLogo, NotionLogo]
      },
    ]
  },
  "Data Analyst": {
    title: "Data Analyst",
    description: "Transform raw data into meaningful insights to help businesses make data-driven decisions.",
    level: "Low Level",
    estimate: "1 - 2 Years",
    steps: [
      {
        title: "Beginner Level",
        status: "On Going",
        description: "Learning Excel, SQL, and basic statistics for data cleaning and analysis.",
        checklist: [
          { isCheck: true, text: "Advanced Excel" },
          { isCheck: true, text: "Basic SQL" },
          { isCheck: false, text: "Statistics" },
          { isCheck: false, text: "Data Visualization" },
        ],
        progress: 40,
        tools: [GdocsLogo]
      },
      {
        title: "Intermediate Level",
        status: false,
        description: "Using Python/R and BI tools like Tableau or PowerBI for complex analysis.",
        checklist: [
          { isCheck: false, text: "Python (Pandas, Numpy)" },
          { isCheck: false, text: "Tableau / PowerBI" },
          { isCheck: false, text: "Intermediate SQL" },
          { isCheck: false, text: "A/B Testing" },
        ],
        progress: 0,
        tools: [GithubLogo, GdocsLogo]
      },
      {
        title: "Advanced Level",
        status: false,
        description: "Predictive modeling and communicating insights to executive leadership.",
        checklist: [
          { isCheck: false, text: "Machine Learning Basics" },
          { isCheck: false, text: "Data Governance" },
          { isCheck: false, text: "Advanced Storytelling" },
          { isCheck: false, text: "Cloud Data Warehousing" },
        ],
        progress: 0,
        tools: [GithubLogo, NotionLogo]
      },
    ]
  }
};
