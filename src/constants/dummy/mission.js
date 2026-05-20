import { Stars } from "lucide-react";

export const mockMissions = {
  missions: [
    {
      id: 1,
      title: "Complete UX Research Fundamentals",
      role: "UX Research",
      level: "Easy",
      estimateTime: "25 min",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Practice Wireframing with Figma",
      role: "UI Design",
      level: "Medium",
      estimateTime: "45 min",
      isCompleted: false,
      description: "Learn the fundamentals of wireframing by creating low-fidelity wireframes for a mobile app using Figma. This hands-on exercise will help you understand user flows and interface layouts.",
      learningGoal: "By the end of this task, you will be able to create clear, structured wireframes that communicate design ideas effectively and serve as a foundation for high-fidelity designs.",
      instructions: [
        "Watch the introduction video on wireframing principles (10 min)",
        "Open the provided Figma template and explore the example wireframes",
        "Sketch 3 screens for a task management mobile app on paper",
        "Recreate your sketches as low-fidelity wireframes in Figma",
        "Add annotations to explain user flows and interactions",
        "Submit your wireframes for peer review"
      ],
      assessment: {
        tasks: [
          {
            id: 1,
            taskName: "Create a Low-Fidelity Homepage Wireframe",
            description: "Design a low-fidelity wireframe for a task management app homepage in Figma. Focus on layout structure, hierarchy, and content placement.",
            requirements: [
              "Header section",
              "Search bar",
              "Task category cards",
              "Today's tasks section",
              "Bottom navigation"
            ],
            hint: "Focus on placement and hierarchy rather than visual design. Use simple shapes."
          },
          {
            id: 2,
            taskName: "Define User Flow for Adding a Task",
            description: "Explain or sketch the step-by-step user flow for adding a new task in the app, from the homepage to the success state.",
            requirements: [
              "Clear entry point",
              "Input fields definition",
              "Confirmation step",
              "Return to homepage flow"
            ],
            hint: "Keep the number of steps to a minimum to ensure a good user experience."
          },
          {
            id: 3,
            taskName: "Design Task Detail View",
            description: "Create a wireframe for the detail view of a task. What information is critical for the user to see?",
            requirements: [
              "Task title and description",
              "Due date and priority indicator",
              "Status toggle (Complete/Incomplete)",
              "Edit and delete actions"
            ],
            hint: "Hierarchy is key here. The most important information should be at the top."
          },
          {
            id: 4,
            taskName: "Implement Dark Mode Considerations",
            description: "Describe how your wireframe layout would adapt to a dark mode theme. What changes would you prioritize?",
            requirements: [
              "Contrast accessibility",
              "Visual hierarchy maintenance",
              "Background and surface color contrast",
              "Icon visibility"
            ],
            hint: "Focus on readability and reducing eye strain in low-light environments."
          },
          {
            id: 5,
            taskName: "Explain Navigation Decisions",
            description: "Write an essay explaining why you chose bottom navigation over a hamburger menu for this task management app.",
            requirements: [
              "Pros of bottom navigation for this context",
              "Cons of hamburger menu for mobile",
              "User reachability considerations",
              "Frequency of use for top-level destinations"
            ],
            hint: "Think about thumb zone mapping and thumb-driven design principles."
          }
        ],
        rewards: {
          xp: 50,
          badgeProgress: "3 of 5 tasks completed",
          skillGrowth: { "UI Structure": 5 }
        }
      },
      result: {
        score: 85,
        stars: 4,
        rating: "Strong Intermediate",
        summary: "You demonstrated solid layout structure and hierarchy understanding.",
        whatYouDidWell: [
          "Clear content hierarchy",
          "Good spacing consistency",
          "Effective section grouping"
        ],
        areasToImprove: [
          "Navigation could be clearer",
          "CTA placement needs stronger emphasis",
          "Search section alignment can improve"
        ],
        skillBreakdown: {
          "Layout Structure": 90,
          "Visual Hierarchy": 82,
          "Component Placement": 88,
          "User Flow Logic": 80
        }
      }
    },
    {
      id: 3,
      title: "Read Design System Documentation",
      role: "Design Systems",
      level: "Easy",
      estimateTime: "20 min",
      isCompleted: true,
    },
    {
      id: 4,
      title: "Advanced Prototyping Techniques",
      role: "Prototyping",
      level: "Hard",
      estimateTime: "60 min",
      isCompleted: false,
    },
    {
      id: 5,
      title: "User Interview Best Practices",
      role: "UX Research",
      level: "Medium",
      estimateTime: "30 min",
      isCompleted: false,
    },
    {
      id: 6,
      title: "Color Theory and Accessibility",
      role: "Visual Design",
      level: "Medium",
      estimateTime: "35 min",
      isCompleted: true,
    },
    {
      id: 7,
      title: "Information Architecture Workshop",
      role: "UX Strategy",
      level: "Hard",
      estimateTime: "50 min",
      isCompleted: false,
    },
    {
      id: 8,
      title: "Typography Fundamentals Quiz",
      role: "Visual Design",
      level: "Easy",
      estimateTime: "15 min",
      isCompleted: false,
    },
  ],
};
