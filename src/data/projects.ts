export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  repoName: string;
  category: "Full-Stack" | "AI/Research" | "GovTech" | "Backend/Python" | "Web Apps";
  featured: boolean;
  liveUrl?: string;
  githubUrl: string;
  paperUrl?: string;
  language: string;
  image: string;
  technologies: string[];
  gradient: string;
  description: string;
  highlights: string[];
  metrics?: { label: string; value: string }[];
}

export const projects: ProjectItem[] = [
  {
    id: "anurag-portfolio",
    title: "Anurag Mishra — Flagship Interactive Portfolio & AI Platform",
    subtitle: "Cyber-spatial 3D UI, multi-lingual contextual AI companion, real-time telemetry & recruiter vault",
    repoName: "Anurag94507/anurag-portfolio",
    category: "Full-Stack",
    featured: true,
    liveUrl: "https://anurag-portfolio.vercel.app/",
    githubUrl: "https://github.com/Anurag94507/anurag-portfolio",
    language: "TypeScript",
    image: "/assets/projects/portfolio.png",
    technologies: ["React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "IndexedDB", "Node.js"],
    gradient: "from-cyan-500/25 via-violet-600/15 to-emerald-900/30",
    description: "Personal flagship web ecosystem engineered with modern 3D physics, gyro card depth, a multi-lingual AI conversational assistant, multi-page routing with breadcrumb history, and persistent client-side database storage with cloud sync.",
    highlights: [
      "Interactive multi-lingual AI companion capable of auto-detecting language (Hindi, English, Hinglish, Spanish, French, etc.) with natural conversational fluency.",
      "Persistent database architecture (IndexedDB + localStorage + cloud sync) with an administrative dashboard to manage leads, chat histories, and employer queries.",
      "Immersive 3D physics & gyro entrance animation on load for high-impact executive presentation.",
      "Universal dual-theme support with high-contrast obsidian dark mode and crystal-clear light mode."
    ],
    metrics: [
      { label: "Performance", value: "99 Lighthouse" },
      { label: "Architecture", value: "Vite + TS + DB" },
      { label: "AI Support", value: "10+ Languages" }
    ]
  },
  {
    id: "herdintel-ai",
    title: "HerdIntel-AI — Precision Dairy Intelligence",
    subtitle: "Real-time livestock welfare telemetry, social graph diagnostics & AI edge analytics",
    repoName: "Anurag94507/HerdIntel-AI",
    category: "AI/Research",
    featured: true,
    liveUrl: "https://cownet-ai.vercel.app/",
    githubUrl: "https://github.com/Anurag94507/HerdIntel-AI",
    paperUrl: "#research",
    language: "JavaScript",
    image: "/assets/projects/herdintel.jpg",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Chart.js", "Tailwind CSS"],
    gradient: "from-cyan-500/20 via-blue-600/10 to-indigo-900/30",
    description: "Full-stack livestock intelligence platform designed to monitor dairy cattle welfare, detect isolation risks, and visualize herd social-network graphs. Backed by an IEEE paper co-authored and presented at ICNACT 2026.",
    highlights: [
      "Backed by an IEEE-format research paper presented at ICNACT 2026 (VIT Bhopal University).",
      "Interactive social-network topology graphs tracking cattle interactions and herd hierarchy.",
      "Automated risk scoring algorithms that identify isolated, lethargic, or distressed animals early.",
      "Production-ready decoupled micro-services architecture deployed live on Vercel."
    ],
    metrics: [
      { label: "Paper Audit", value: "10 Gaps Fixed" },
      { label: "Alert Latency", value: "< 250ms" },
      { label: "Deployment", value: "Live on Vercel" }
    ]
  },
  {
    id: "ayodhya-blessings-main",
    title: "The-divine-of-Ayodhya-main-1-",
    subtitle: "Modern TypeScript heritage discovery portal with decoupled Vite & Node.js backend",
    repoName: "Anurag94507/The-divine-of-Ayodhya-main-1-",
    category: "Full-Stack",
    featured: true,
    liveUrl: "https://the-divine-of-ayodhya-main-1-ed91.vercel.app/",
    githubUrl: "https://github.com/Anurag94507/The-divine-of-Ayodhya-main-1-",
    language: "TypeScript",
    image: "/assets/projects/ayodhya.jpg",
    technologies: ["React (TypeScript)", "Vite", "Node.js", "Express.js", "Tailwind CSS"],
    gradient: "from-amber-500/20 via-orange-600/10 to-violet-900/30",
    description: "A fast, fully-typed modern web application exploring Ayodhya's historical temples, sanctified ghats, and spiritual heritage sites. Features dynamic map routing, rich multimedia narratives, and decoupled client-server architecture.",
    highlights: [
      "Independently engineered and version-controlled with complete TypeScript safety.",
      "Optimized Vite bundling achieving near-instant load times and 98+ Lighthouse scores.",
      "Comprehensive directory of temple history, ceremonial timings, and navigational guidance.",
      "Responsive fluid layouts designed with mobile-first aesthetics."
    ],
    metrics: [
      { label: "Type Safety", value: "100% TS" },
      { label: "Framework", value: "Vite + Express" },
      { label: "Status", value: "Live Demo" }
    ]
  },
  {
    id: "ayodhya-shg-billing",
    title: "Ayodhya Airport SHG Billing & Inventory",
    subtitle: "Enterprise resource planning, dynamic billing & QR stock ingestion",
    repoName: "Anurag94507/ayodhya-airport-shg-billing-inventory-management-system",
    category: "GovTech",
    featured: true,
    githubUrl: "https://github.com/Anurag94507/ayodhya-airport-shg-billing-inventory-management-system",
    language: "TypeScript",
    image: "/assets/projects/shg_inventory.jpg",
    technologies: ["TypeScript", "React", "Node.js", "Express", "MongoDB", "QR Scanning API"],
    gradient: "from-purple-500/20 via-fuchsia-600/10 to-slate-900/30",
    description: "Custom enterprise inventory and billing solution built for the Chief Development Office (CDO) Ayodhya and Ayodhya Airport outlets to track multi-facility stock, real-time product valuations, and rural producer profits.",
    highlights: [
      "Role-Based Access Control (RBAC) separating administrative officials and Self-Help Group leads.",
      "Integrated dynamic QR-code scanning for rapid batch stock intake, eliminating human entry errors.",
      "Live analytics dashboards summarizing profit margins, product shelf velocity, and deficit alerts.",
      "Direct field deployment adopted by administrative personnel across Ayodhya district."
    ],
    metrics: [
      { label: "Verification", value: "QR Code API" },
      { label: "Deployment", value: "CDO Ayodhya" },
      { label: "Impact", value: "Zero Ledger Drift" }
    ]
  },
  {
    id: "restaurant-management",
    title: "Restaurant Management Project",
    subtitle: "Automated table booking, billing calculations, and culinary order routing",
    repoName: "Anurag94507/restaurant_management_project",
    category: "Backend/Python",
    featured: true,
    githubUrl: "https://github.com/Anurag94507/restaurant_management_project",
    language: "Python",
    image: "/assets/projects/restaurant.jpg",
    technologies: ["Python", "Flask / Django", "SQLite / MySQL", "REST APIs", "CRUD Engine"],
    gradient: "from-blue-500/20 via-indigo-600/10 to-cyan-900/30",
    description: "Comprehensive culinary hospitality and management engine built with Python. Features table reservation scheduling, automated customer bill computation with tax logic, inventory alert thresholds, and staff roster management.",
    highlights: [
      "Modular Python backend architecture with clean separation of business logic and data persistence.",
      "Automated bill generation and receipt printing with itemized tax and gratuity calculations.",
      "Real-time table reservation status tracking to eliminate double-booking friction.",
      "Extensive unit testing and exception handling across concurrent order dispatch workflows."
    ],
    metrics: [
      { label: "Language", value: "Python" },
      { label: "Architecture", value: "Modular MVC" },
      { label: "Database", value: "SQL Engine" }
    ]
  },
  {
    id: "divine-of-ayodhya-base",
    title: "The-divine-of-Ayodhya",
    subtitle: "Core architectural foundation and cultural knowledge repository for Ayodhya heritage",
    repoName: "Anurag94507/The-divine-of-Ayodhya",
    category: "Full-Stack",
    featured: false,
    githubUrl: "https://github.com/Anurag94507/The-divine-of-Ayodhya",
    language: "TypeScript",
    image: "/assets/projects/ayodhya.jpg",
    technologies: ["TypeScript", "React", "Node.js", "Express", "CSS3"],
    gradient: "from-rose-500/20 via-pink-600/10 to-slate-900/30",
    description: "The initial open-source repository establishing the cultural information schema, temple geospatial coordinates, and historical content pipeline for Ayodhya exploration.",
    highlights: [
      "Structured JSON schema modeling 50+ historical monuments, ghats, and cultural milestones.",
      "Optimized query endpoints for localized filtering and pilgrim route planning.",
      "Foundation for the subsequent Vite-powered high-performance edition."
    ],
    metrics: [
      { label: "Type Safety", value: "TypeScript" },
      { label: "Data Model", value: "GeoJSON + REST" }
    ]
  },
  {
    id: "cellstart-site",
    title: "cellstart-site",
    subtitle: "Responsive corporate website for AI & biotech learning modules",
    repoName: "Anurag94507/cellstart-site",
    category: "Web Apps",
    featured: false,
    githubUrl: "https://github.com/Anurag94507/cellstart-site",
    language: "HTML / JS",
    image: "/assets/projects/cellstart.jpg",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Flexbox/Grid"],
    gradient: "from-teal-500/20 via-emerald-600/10 to-slate-900/30",
    description: "Modern, responsive static web platform engineered for curriculum showcase, interactive module registration, and student resource downloads.",
    highlights: [
      "Clean semantic HTML5 structure with high accessibility and SEO optimization.",
      "Lightweight Vanilla JavaScript for interactive navigation and dynamic accordions.",
      "Mobile-responsive layouts tested across mobile, tablet, and ultra-wide displays."
    ],
    metrics: [
      { label: "Stack", value: "HTML5 / CSS3 / JS" },
      { label: "Speed", value: "100 Lighthouse" }
    ]
  },
  {
    id: "mern-ecommerce",
    title: "React E-Commerce MERN Engine",
    subtitle: "Enterprise-grade digital commerce architecture with Redux Toolkit & CI/CD",
    repoName: "Anurag94507/react-ecommerce-mern",
    category: "Full-Stack",
    featured: true,
    githubUrl: "https://github.com/Anurag94507",
    language: "TypeScript",
    image: "/assets/projects/ecommerce.jpg",
    technologies: ["React (TypeScript)", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "JWT"],
    gradient: "from-emerald-500/20 via-teal-600/10 to-indigo-950/30",
    description: "Production-ready MERN electronic commerce application featuring secure authentication, payment gateway simulation, persistent shopping carts, and dynamic inventory management.",
    highlights: [
      "Rigorous security implementation: bcrypt password hashing and tamper-proof JWT token auth.",
      "Global state management driven by Redux Toolkit for seamless cart-to-checkout flows.",
      "Administrative portal for stock reconciliation, sales reports, and customer order management.",
      "Continuous Integration and Continuous Deployment (CI/CD) automated testing pipeline."
    ],
    metrics: [
      { label: "State", value: "Redux Toolkit" },
      { label: "Auth", value: "JWT + Bcrypt" },
      { label: "Pipeline", value: "CI/CD Ready" }
    ]
  }
];
