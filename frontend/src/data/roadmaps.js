// src/data/roadmaps.js
// Central data source for all career roadmap definitions
import { aiEngineerRoadmap } from "./roadmaps/ai-engineer";

export const categories = [
  { id: "all", label: "All" },
  { id: "engineering", label: "Engineering" },
  { id: "data", label: "Data & AI" },
  { id: "design", label: "Design" },
  { id: "security", label: "Security" },
  { id: "devops", label: "DevOps" },
  { id: "product", label: "Product" },
];

export const roadmaps = [
  {
    id: "frontend",
    title: "Frontend Developer",
    category: "engineering",
    icon: "web",
    color: "from-violet-500 to-purple-700",
    accent: "#a78bfa",
    skillCount: 12,
    stageCount: 4,
    time: "6m",
    description:
      "Master the art of building modern, responsive, and performant web interfaces. This path takes you from basic HTML to professional React development.",
    stages: [
      {
        id: 1,
        title: "Foundations",
        level: "Beginner",
        skills: [
          {
            id: "s1",
            name: "HTML/CSS Basics",
            done: true,
            resources: ["https://developer.mozilla.org/en-US/docs/Web/HTML"],
          },
          {
            id: "s2",
            name: "Modern CSS Layouts",
            done: true,
            resources: [
              "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
            ],
          },
          {
            id: "s3",
            name: "Responsive Design",
            done: false,
            resources: [
              "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design",
            ],
          },
        ],
      },
      {
        id: 2,
        title: "JavaScript Mastery",
        level: "Intermediate",
        skills: [
          {
            id: "s4",
            name: "Variables & Functions",
            done: false,
            resources: ["https://javascript.info/"],
          },
          {
            id: "s5",
            name: "DOM Manipulation",
            done: false,
            resources: ["https://javascript.info/document"],
          },
          {
            id: "s6",
            name: "Promises & Async/Await",
            done: false,
            resources: ["https://javascript.info/async"],
          },
          {
            id: "s7",
            name: "Fetch API & Ajax",
            done: false,
            resources: ["https://javascript.info/network"],
          },
          {
            id: "s8",
            name: "ES6+ Features",
            done: false,
            resources: ["https://javascript.info/"],
          },
        ],
      },
      {
        id: 3,
        title: "React Ecosystem",
        level: "Intermediate",
        skills: [
          {
            id: "s9",
            name: "React Components & Props",
            done: false,
            resources: ["https://react.dev/learn/your-first-component"],
          },
          {
            id: "s10",
            name: "React Hooks (useState, useEffect)",
            done: false,
            resources: ["https://react.dev/reference/react"],
          },
          {
            id: "s11",
            name: "State Management (Zustand)",
            done: false,
            resources: ["https://zustand-demo.pmnd.rs/"],
          },
        ],
      },
      {
        id: 4,
        title: "Production Skills",
        level: "Advanced",
        skills: [
          {
            id: "s12",
            name: "Testing & Deployment",
            done: false,
            resources: ["https://vitest.dev/"],
          },
        ],
      },
    ],
  },
  {
    id: "backend",
    title: "Backend Developer",
    category: "engineering",
    icon: "dns",
    color: "from-blue-500 to-cyan-700",
    accent: "#60a5fa",
    skillCount: 14,
    stageCount: 5,
    time: "8m",
    description:
      "Build scalable APIs, manage databases, and architect reliable server-side systems with Node.js or Python.",
    stages: [],
  },
  {
    id: "fullstack",
    title: "Full Stack Developer",
    category: "engineering",
    icon: "layers",
    color: "from-emerald-500 to-teal-700",
    accent: "#34d399",
    skillCount: 22,
    stageCount: 6,
    time: "12m",
    description:
      "Bridge frontend and backend expertise to ship complete products end-to-end independently.",
    stages: [],
  },
  aiEngineerRoadmap,
  {
    id: "datascience",
    title: "Data Scientist",
    category: "data",
    icon: "analytics",
    color: "from-orange-500 to-amber-700",
    accent: "#fb923c",
    skillCount: 15,
    stageCount: 5,
    time: "9m",
    description:
      "Explore machine learning, deep learning, and advanced statistical modeling to extract insights from data.",
    stages: [],
  },
  {
    id: "aiml",
    title: "AI/ML Engineer",
    category: "data",
    icon: "hub",
    color: "from-pink-500 to-rose-700",
    accent: "#f472b6",
    skillCount: 18,
    stageCount: 5,
    time: "10m",
    description:
      "Design and deploy production-grade machine learning systems, neural networks, and AI pipelines.",
    stages: [],
  },
  {
    id: "uiux",
    title: "UI/UX Designer",
    category: "design",
    icon: "palette",
    color: "from-fuchsia-500 to-purple-700",
    accent: "#c084fc",
    skillCount: 10,
    stageCount: 4,
    time: "5m",
    description:
      "Deep dive into user research, typography, accessibility, and high-fidelity prototyping with Figma.",
    stages: [],
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    category: "devops",
    icon: "cloud_sync",
    color: "from-sky-500 to-blue-700",
    accent: "#38bdf8",
    skillCount: 14,
    stageCount: 5,
    time: "7m",
    description:
      "Master CI/CD pipelines, containerization with Docker and Kubernetes, and cloud infrastructure automation.",
    stages: [],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Analyst",
    category: "security",
    icon: "security",
    color: "from-red-500 to-rose-700",
    accent: "#f87171",
    skillCount: 16,
    stageCount: 6,
    time: "8m",
    description:
      "Learn threat detection, digital forensics, network security, and ethical hacking methodologies.",
    stages: [],
  },
  {
    id: "mobile",
    title: "Mobile Developer",
    category: "engineering",
    icon: "smartphone",
    color: "from-lime-500 to-green-700",
    accent: "#a3e635",
    skillCount: 11,
    stageCount: 4,
    time: "6m",
    description:
      "Build cross-platform or native apps using Flutter, Swift, or Kotlin with modern mobile patterns.",
    stages: [],
  },
  {
    id: "productmanager",
    title: "Product Manager",
    category: "product",
    icon: "inventory_2",
    color: "from-yellow-500 to-amber-600",
    accent: "#facc15",
    skillCount: 9,
    stageCount: 4,
    time: "4m",
    description:
      "Define product vision, roadmap strategy, and work cross-functionally to ship products users love.",
    stages: [],
  },
];
