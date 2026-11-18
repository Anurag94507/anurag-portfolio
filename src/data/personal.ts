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
    "Full-Stack Engineer",
    "AI/ML Researcher",
    "Edge AI & Computer Vision",
    "Real-Time Systems & Observability",
  ],
  tagline:
    "Full-stack engineer and AI/ML researcher shipping real-time computer vision on edge hardware, explainable livestock intelligence, and production web platforms.",
  availability: "Open for Full-Stack, AI/ML & Edge AI Roles",
  summary:
    "Full-stack engineer and AI/ML researcher pursuing a B.Tech in Information Technology. Currently engineering real-time multi-camera computer vision pipelines on NVIDIA Jetson AGX at C-DAC, co-authoring IEEE-format research on federated learning and explainable AI, and shipping production TypeScript/MERN platforms end to end.",
  aboutText: [
    "I am an Information Technology undergraduate at Dr. Ram Manohar Lohia Avadh University, Ayodhya (2023–2027), working across full-stack engineering, applied AI research, and edge computer vision.",
    "At C-DAC Thiruvananthapuram I build real-time multi-channel vision pipelines on NVIDIA Jetson AGX with DeepStream and GStreamer — ingesting live RTSP camera streams, driving CUDA-accelerated on-device inference, and exposing it through a PyQt5 control surface backed by Grafana and Prometheus observability.",
    "My research at IIIT Naya Raipur audited the published IEEE Access CowNet-AI multi-agent system, identified 10 deployment and architectural gaps, and proposed an edge-cloud hybrid architecture with temporal graph transformers, multimodal sensor fusion, SHAP/LIME explainability and federated learning — presented at ICNACT 2026, VIT Bhopal.",
    "On the product side I ship typed, production-ready applications end to end: HerdIntel for dairy welfare monitoring, the Ayodhya Blessings heritage platform, and an SHG inventory and billing system for the Chief Development Office that replaced manual stock ledgers for field-level operators.",
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
      "Machine Learning / AI",
      "Linear Algebra",
      "Probability & Statistics",
      "Database Management Systems",
      "Operating Systems",
      "Object-Oriented Programming",
      "Software Engineering",
      "System Design",
    ],
  },
  contact: {
    email: "mranurag0007@gmail.com",
    phone: "+91-7800509636",
    whatsapp: "https://wa.me/917800509636?text=Hi%20Anurag,%20I%20saw%20your%20portfolio",
    location: "Sultanpur, Uttar Pradesh, India",
    github: "https://github.com/Anurag94507",
    linkedin: "https://www.linkedin.com/in/anurag-mishra-21b87b244",
    resumeUrl: "/assets/Anurag_Mishra_Resume.pdf",
  },
  stats: [
    {
      label: "Production Projects",
      value: 6,
      suffix: "+",
      description: "Full-stack, edge AI and research-backed systems shipped end to end",
    },
    {
      label: "Metrics Monitored",
      value: 10,
      suffix: "+",
      description: "Grafana & Prometheus health, latency and application metrics in production",
    },
    {
      label: "Int'l Research Paper",
      value: 1,
      description: "Co-authored and presented at ICNACT 2026 (VIT Bhopal University)",
    },
    {
      label: "Internships & Roles",
      value: 3,
      description: "C-DAC Thiruvananthapuram, IIIT Naya Raipur & CDO Ayodhya",
    },
  ],
};
