export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level: string; // e.g. "Advanced", "Proficient", "Core"
    highlight?: boolean;
  }[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    description: "Typed and dynamic languages used across frontend, backend, scripting and DSA work.",
    skills: [
      { name: "TypeScript", level: "Advanced", highlight: true },
      { name: "JavaScript (ES6+)", level: "Advanced", highlight: true },
      { name: "Python", level: "Advanced", highlight: true },
      { name: "SQL", level: "Proficient", highlight: true },
      { name: "Java", level: "Proficient" },
      { name: "HTML / CSS", level: "Advanced" },
    ],
  },
  {
    category: "Frameworks & Libraries",
    description: "Component-driven frontends, Node runtimes, Python tooling and desktop GUIs.",
    skills: [
      { name: "React.js", level: "Advanced", highlight: true },
      { name: "Node.js", level: "Advanced", highlight: true },
      { name: "Express.js", level: "Advanced", highlight: true },
      { name: "Next.js", level: "Proficient", highlight: true },
      { name: "Redux / Context API", level: "Advanced", highlight: true },
      { name: "Tailwind CSS", level: "Advanced", highlight: true },
      { name: "PyQt5", level: "Proficient", highlight: true },
      { name: "Flask", level: "Proficient" },
    ],
  },
  {
    category: "ML / AI",
    description: "Applied machine learning, explainability and privacy-preserving training.",
    skills: [
      { name: "scikit-learn", level: "Proficient", highlight: true },
      { name: "NumPy / pandas", level: "Proficient", highlight: true },
      { name: "Matplotlib", level: "Proficient" },
      { name: "PyTorch (exposure)", level: "Exposure" },
      { name: "TensorFlow (exposure)", level: "Exposure" },
      { name: "LLM / Gemini API", level: "Proficient", highlight: true },
      { name: "Federated Learning", level: "Proficient", highlight: true },
      { name: "Explainable AI (SHAP / LIME)", level: "Proficient", highlight: true },
    ],
  },
  {
    category: "Edge AI & Vision",
    description: "Real-time video ingestion, GPU inference and on-device deployment on NVIDIA hardware.",
    skills: [
      { name: "NVIDIA DeepStream SDK", level: "Proficient", highlight: true },
      { name: "GStreamer Pipelines", level: "Proficient", highlight: true },
      { name: "CUDA GPU Inference", level: "Proficient", highlight: true },
      { name: "NVIDIA Jetson AGX", level: "Proficient", highlight: true },
      { name: "RTSP Stream Processing", level: "Proficient", highlight: true },
      { name: "Real-Time Computer Vision", level: "Proficient", highlight: true },
    ],
  },
  {
    category: "Databases",
    description: "Document stores and relational engines, schema design and query optimisation.",
    skills: [
      { name: "MongoDB", level: "Advanced", highlight: true },
      { name: "Mongoose ODM", level: "Advanced", highlight: true },
      { name: "MySQL", level: "Proficient", highlight: true },
      { name: "SQLite", level: "Proficient" },
      { name: "SQL Query Optimisation", level: "Proficient" },
    ],
  },
  {
    category: "Cloud & DevOps",
    description: "Deployment pipelines, containers, telemetry and production observability.",
    skills: [
      { name: "Grafana", level: "Advanced", highlight: true },
      { name: "Prometheus", level: "Advanced", highlight: true },
      { name: "Docker", level: "Proficient", highlight: true },
      { name: "Git & GitHub", level: "Advanced", highlight: true },
      { name: "CI/CD Pipelines", level: "Proficient", highlight: true },
      { name: "Linux", level: "Proficient" },
      { name: "Vercel", level: "Advanced" },
      { name: "AWS (Forage simulation)", level: "Exposure" },
    ],
  },
  {
    category: "Core CS",
    description: "Algorithmic foundations, API design and the systems thinking behind the stack.",
    skills: [
      { name: "Data Structures & Algorithms", level: "Advanced", highlight: true },
      { name: "REST API Design", level: "Advanced", highlight: true },
      { name: "System Design", level: "Proficient", highlight: true },
      { name: "Distributed Systems", level: "Proficient", highlight: true },
      { name: "Fault-Tolerant Design", level: "Proficient" },
      { name: "OOP", level: "Advanced" },
      { name: "Agile / Scrum", level: "Proficient" },
    ],
  },
];

export const allSkillsList = [
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Python",
  "MongoDB",
  "Express.js",
  "DeepStream SDK",
  "GStreamer",
  "CUDA",
  "Jetson AGX",
  "PyQt5",
  "Grafana",
  "Prometheus",
  "Docker",
  "Tailwind CSS",
  "Redux",
  "REST APIs",
  "SHAP / LIME",
  "Federated Learning",
  "System Design",
  "MySQL",
  "CI/CD",
  "Java",
];
