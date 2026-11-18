export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  badge: string;
  description: string[];
  skills: string[];
  icon: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: "cdac",
    role: "Software Trainee — Work-Based Learning (WBL)",
    organization: "C-DAC (Centre for Development of Advanced Computing)",
    location: "Thiruvananthapuram, Kerala, India",
    period: "Aug 2026 – Feb 2027",
    badge: "Current / Active",
    description: [
      "Engineered real-time multi-channel computer vision pipelines on NVIDIA Jetson AGX using the DeepStream SDK and GStreamer, ingesting live RTSP camera streams for low-latency, on-device AI inference in production.",
      "Developed a PyQt5-based GUI streamer to display and control DeepStream video feeds, giving operators a single-pane, interactive interface for live multi-camera inference output and cutting response time.",
      "Built and maintained distributed observability dashboards in Grafana and Prometheus tracking 10+ system-health and application-level metrics, ensuring zero-downtime visibility across live infrastructure.",
      "Worked hands-on with CUDA-accelerated GPU inference, edge AI deployment, fault-tolerant system design and scalable observability pipelines in a mission-critical production environment.",
    ],
    skills: [
      "DeepStream SDK",
      "GStreamer",
      "NVIDIA Jetson AGX",
      "CUDA",
      "PyQt5",
      "RTSP",
      "Grafana",
      "Prometheus",
    ],
    icon: "Activity",
  },
  {
    id: "iiit-nr",
    role: "AI Research Intern — Full-Stack & Data Engineering",
    organization: "IIIT Naya Raipur",
    location: "Naya Raipur, Chhattisgarh, India",
    period: "May 2026 – Jul 2026",
    badge: "Research & Publication",
    description: [
      "Identified 10 specific deployment and architectural gaps in CowNet-AI, a published IEEE Access multi-agent system, through structured critical analysis against benchmark data — the evidence base for a novel architecture proposal.",
      "Co-authored an IEEE-format research paper proposing an edge-cloud hybrid architecture with temporal graph transformers, multimodal sensor fusion, federated learning and SHAP/LIME explainability for precision livestock monitoring.",
      "Presented the research at ICNACT 2026 (3rd International Conference on Nonlinear Analysis & Computational Techniques), VIT Bhopal University, gaining international peer-reviewed exposure.",
      "Designed and shipped a multi-tiered full-stack platform (Next.js, Node.js, MongoDB Atlas) end to end under a 6-week deadline, integrating third-party APIs with graceful-degradation fallbacks.",
    ],
    skills: [
      "Applied AI/ML",
      "Temporal Graph Transformers",
      "Multimodal Fusion",
      "SHAP/LIME",
      "Federated Learning",
      "Next.js",
      "MongoDB Atlas",
      "IEEE Paper",
    ],
    icon: "Brain",
  },
  {
    id: "cdo-ayodhya",
    role: "Team Manager — CDO Intern (Full-Stack)",
    organization: "Chief Development Office, Ayodhya · Govt. of UP",
    location: "Ayodhya, Uttar Pradesh, India",
    period: "Apr 2025 – Jun 2025",
    badge: "Leadership & Deployment",
    description: [
      "Led a cross-functional team of engineers to design, build and ship a full-stack SHG Inventory Management System end to end — requirements through production deployment — cutting manual stock-entry errors for Self Help Group operators.",
      "Delivered live inventory tracking, sales and profit monitoring, and QR-code data ingestion as core features, improving operational efficiency and real-time stock visibility for non-technical, field-level users.",
      "Ran requirements gathering and iterative field testing with administrative officials and rural SHG operators, translating feedback directly into shipped features.",
    ],
    skills: ["React", "Node.js", "MongoDB", "QR Data Ingestion", "Team Leadership", "Agile Delivery"],
    icon: "Users",
  },
];
