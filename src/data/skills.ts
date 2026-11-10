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
    category: "Programming Languages",
    description: "Foundational syntaxes and strongly typed languages for algorithmic problem solving and backend systems.",
    skills: [
      { name: "JavaScript (ES6+)", level: "Advanced", highlight: true },
      { name: "TypeScript", level: "Advanced", highlight: true },
      { name: "Python", level: "Advanced", highlight: true },
      { name: "SQL", level: "Proficient", highlight: true },
      { name: "HTML5 / CSS3", level: "Advanced" },
      { name: "C / C++", level: "Proficient" }
    ]
  },
  {
    category: "Frameworks & Libraries",
    description: "Modern component-driven web frameworks, asynchronous runtimes, and styling toolchains.",
    skills: [
      { name: "React.js", level: "Advanced", highlight: true },
      { name: "Node.js", level: "Advanced", highlight: true },
      { name: "Express.js", level: "Advanced", highlight: true },
      { name: "Redux / Redux Toolkit", level: "Advanced", highlight: true },
      { name: "Tailwind CSS", level: "Advanced", highlight: true },
      { name: "Flask", level: "Proficient" },
      { name: "Chart.js", level: "Proficient" },
      { name: "Context API", level: "Advanced" }
    ]
  },
  {
    category: "Databases & Storage",
    description: "NoSQL document stores and relational database engines optimized for ACID compliance and high throughput.",
    skills: [
      { name: "MongoDB", level: "Advanced", highlight: true },
      { name: "Mongoose ODM", level: "Advanced", highlight: true },
      { name: "SQLite", level: "Proficient" },
      { name: "PostgreSQL / SQL", level: "Proficient", highlight: true },
      { name: "Schema Design & Indexing", level: "Advanced" }
    ]
  },
  {
    category: "Cloud, DevOps & Observability",
    description: "Infrastructure monitoring, deployment pipelines, metric telemetry, and distributed version control.",
    skills: [
      { name: "Grafana", level: "Advanced", highlight: true },
      { name: "Prometheus", level: "Advanced", highlight: true },
      { name: "Vercel", level: "Advanced", highlight: true },
      { name: "CI/CD Pipelines", level: "Proficient", highlight: true },
      { name: "Git & GitHub", level: "Advanced", highlight: true },
      { name: "Linux Environments", level: "Proficient" }
    ]
  },
  {
    category: "Core CS & Engineering Practices",
    description: "Algorithmic thinking, secure authentication protocols, and scalable system design patterns.",
    skills: [
      { name: "Data Structures & Algorithms", level: "Advanced", highlight: true },
      { name: "REST API Design", level: "Advanced", highlight: true },
      { name: "System Design", level: "Proficient", highlight: true },
      { name: "JWT Authentication & Bcrypt", level: "Advanced", highlight: true },
      { name: "Object-Oriented Programming (OOP)", level: "Advanced" },
      { name: "Agile / Scrum Methodologies", level: "Proficient" }
    ]
  }
];

export const allSkillsList = [
  "React.js", "TypeScript", "Node.js", "Python", "MongoDB", "Express.js",
  "Grafana", "Prometheus", "Tailwind CSS", "Redux", "REST APIs", "System Design",
  "JavaScript", "Vercel", "Git & GitHub", "SQL", "CI/CD", "JWT Auth", "DSA", "Explainable AI"
];
