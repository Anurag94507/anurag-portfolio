export interface PersonalInfo {
  name: string;
  avatarUrl: string;
  titles: string[];
  tagline: string;
  availability: string;
  summary: string;
  aboutText: string[];
  education: {
    institution: string;
    degree: string;
    field: string;
    period: string;
    location: string;
    cgpaYear1: string;
    cgpaYear2: string;
    cgpaYear3?: string;
    coursework: string[];
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    location: string;
    github: string;
    linkedin: string;
    resumeUrl: string;
  };
  stats: {
    label: string;
    value: number;
    suffix?: string;
    prefix?: string;
    description: string;
  }[];
}

export const personalInfo: PersonalInfo = {
  name: "Anurag Mishra",
  avatarUrl: "/assets/anurag-mishra.jpg",
  titles: [
    "DevOps & Cloud Engineer",
    "Full-Stack Software Engineer",
    "AI/ML Researcher & Systems Architect",
    "Observability Specialist (Prometheus & Grafana)",
  ],
  tagline: "Engineering production-grade full-stack architectures, real-time observability pipelines & applied AI intelligence.",
  availability: "Open for DevOps, Full-Stack & AI/ML Engineering Roles",
  summary: "B.Tech Information Technology student, DevOps & Full-Stack software engineer, and AI/ML researcher with proven experience building real-time observability telemetry, multi-agent evaluation frameworks, and high-availability production web systems.",
  aboutText: [
    "I am an Information Technology undergraduate at Dr. Ram Manohar Lohia Avadh University, Ayodhya (2023 - 2027), operating across DevOps observability, modern full-stack engineering, and applied artificial intelligence.",
    "My technical stack spans JavaScript, TypeScript, Python, React, Node.js, Express, and MongoDB, bolstered by hands-on DevOps telemetry using Prometheus, Grafana, Linux server architecture, and automated CI/CD pipelines.",
    "Beyond software craftsmanship, I conduct applied AI/ML research. I co-authored and presented an IEEE-format research paper at ICNACT 2026 (VIT Bhopal), identifying 10 critical deployment gaps in dairy cattle welfare monitoring and proposing an edge-cloud hybrid with temporal graph transformers and SHAP-based explainability.",
    "Whether developing real-time monitoring and observability dashboards at C-DAC or leading cross-functional engineering teams for government administrative initiatives in Ayodhya, I build resilient, observable software that makes a tangible impact."
  ],
  education: {
    institution: "Dr. Ram Manohar Lohia Avadh University",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Information Technology",
    period: "Jul 2023 - Jul 2027 (Expected)",
    location: "Ayodhya, India",
    cgpaYear1: "7.22 CGPA",
    cgpaYear2: "7.05 CGPA",
    cgpaYear3: "7.12 CGPA",
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Operating Systems & Linux",
      "Software Engineering & DevOps",
      "System Design & Cloud Architecture",
      "Artificial Intelligence & Machine Learning"
    ]
  },
  contact: {
    email: "mranurag0007@gmail.com",
    phone: "+91-7800509636",
    whatsapp: "https://wa.me/917800509636?text=Hi%20Anurag,%20I%20saw%20your%20portfolio",
    location: "Sultanpur / Ayodhya, Uttar Pradesh, India",
    github: "https://github.com/Anurag94507",
    linkedin: "https://www.linkedin.com/in/anurag-mishra-21b87b244",
    resumeUrl: "/assets/Anurag_Mishra_Resume.pdf",
  },
  stats: [
    {
      label: "Deployed Projects",
      value: 6,
      suffix: "+",
      description: "Full-stack & DevOps systems live in production with real user bases"
    },
    {
      label: "AI Deployment Gaps",
      value: 10,
      description: "Identified & resolved in published multi-agent benchmark"
    },
    {
      label: "Int'l Research Paper",
      value: 1,
      description: "Presented at ICNACT 2026 (VIT Bhopal University)"
    },
    {
      label: "Internships & Roles",
      value: 3,
      description: "C-DAC Thiruvananthapuram, IIIT Naya Raipur & CDO Ayodhya"
    }
  ]
};
