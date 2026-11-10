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
      "Architecting and maintaining production-grade real-time monitoring and observability dashboards using Grafana and Prometheus.",
      "Configuring granular metric exporters to track mission-critical system health, uptime, latency, and application-level performance metrics.",
      "Developing proactive alert rules, threshold notifications, and diagnostic panels to detect runtime anomalies before service degradation occurs."
    ],
    skills: ["Grafana", "Prometheus", "System Monitoring", "Linux", "DevOps", "Metric Exporters"],
    icon: "Activity"
  },
  {
    id: "iiit-nr",
    role: "AI Research Intern",
    organization: "IIIT Naya Raipur",
    location: "Naya Raipur, Chhattisgarh, India",
    period: "May 2026 – Jul 2026",
    badge: "Research & Publication",
    description: [
      "Conducted a rigorous critical evaluation of an existing IEEE Access multi-agent AI system (CowNet-AI) across real-world dairy cattle benchmark datasets.",
      "Identified 10 systemic deployment and architectural gaps, including communication latency overheads, edge disconnect vulnerabilities, and absence of explainability.",
      "Co-authored an IEEE-format research paper proposing an edge-cloud hybrid architecture featuring temporal graph transformers, multimodal sensor fusion, SHAP/LIME explainability, and privacy-preserving federated learning.",
      "Presented the peer-reviewed research findings at ICNACT 2026 (3rd International Conference on Nonlinear Analysis & Computational Techniques), VIT Bhopal University."
    ],
    skills: ["Applied AI/ML", "Temporal Graph Transformers", "Multimodal Fusion", "SHAP/LIME", "Federated Learning", "IEEE Paper"],
    icon: "Brain"
  },
  {
    id: "cdo-ayodhya",
    role: "Team Manager — CDO Intern",
    organization: "Chief Development Office",
    location: "Ayodhya, Uttar Pradesh, India",
    period: "Apr 2025 – Jun 2025",
    badge: "Leadership & Deployment",
    description: [
      "Spearheaded a cross-functional engineering team to design, build, and deploy a full-stack Self Help Group (SHG) Inventory Management System from inception through field deployment.",
      "Engineered real-time inventory tracking, daily sales and net profit analytics pipelines, and dynamic QR-code data ingestion to eliminate manual ledger errors.",
      "Conducted user research and iterative testing with administrative officials and rural self-help groups, cutting data processing turnaround times significantly."
    ],
    skills: ["React", "Node.js", "MongoDB", "QR Data Ingestion", "Team Leadership", "Agile Management"],
    icon: "Users"
  }
];
