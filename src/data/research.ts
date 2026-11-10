export interface ResearchPaper {
  id: string;
  title: string;
  conference: string;
  venue: string;
  status: string;
  companionUrl?: string;
  abstract: string;
  gapsIdentified: string[];
  proposedArchitecture: {
    name: string;
    description: string;
    icon: string;
  }[];
  keywords: string[];
}

export const researchData: ResearchPaper = {
  id: "icnact-2026",
  title: "HerdIntel: A web-based platform for tracking real-time dairy cow welfare monitoring and computation systems",
  conference: "ICNACT 2026 (3rd International Conference on Nonlinear Analysis & Computational Techniques)",
  venue: "VIT Bhopal University, India",
  status: "Presented & IEEE-Format Proceedings",
  companionUrl: "https://cownet-ai.vercel.app/",
  abstract: "Modern precision livestock farming demands continuous, non-invasive health and behavioral tracking. This research conducted a rigorous benchmark audit of the existing IEEE Access CowNet-AI multi-agent framework, identifying 10 critical deployment and architectural vulnerabilities in edge communication, model explainability, and real-time welfare alerts. We propose an edge-cloud hybrid architecture that combines Temporal Graph Transformers with multimodal sensor fusion, SHAP/LIME explainability, and privacy-preserving federated learning, delivered through the HerdIntel web platform.",
  gapsIdentified: [
    "High edge-to-cloud telemetry transmission latency causing alert lag",
    "Absence of transparent explainability (SHAP/LIME) for veterinary diagnoses",
    "Brittleness under intermittent rural network connectivity",
    "Lack of temporal graph modeling for cattle social-isolation detection",
    "Centralized training risks compromising farm proprietary livestock data",
    "Suboptimal sensor fusion between wearable accelerometers and ambient sensors",
    "Complex UI inaccessible to non-technical, rural agricultural caretakers",
    "Scalability bottlenecks during concurrent multi-agent decision routing",
    "Inadequate anomaly calibration under variable weather conditions",
    "Absence of localized edge fallback inference on lightweight nodes"
  ],
  proposedArchitecture: [
    {
      name: "Temporal Graph Transformers",
      description: "Models herd social dynamics, grooming clusters, and sudden isolation behaviors across continuous time series.",
      icon: "Network"
    },
    {
      name: "Multimodal Sensor Fusion",
      description: "Harmonizes high-frequency IMU sensor feeds, ambient barn environmental variables, and feeding logs.",
      icon: "Cpu"
    },
    {
      name: "Explainable AI (SHAP & LIME)",
      description: "Generates clear feature-importance rationales so veterinarians understand why an alert triggered.",
      icon: "Eye"
    },
    {
      name: "Federated Learning",
      description: "Trains distributed edge models locally on farms, preserving proprietary data while pooling global intelligence.",
      icon: "ShieldCheck"
    }
  ],
  keywords: [
    "Precision Livestock Farming",
    "Multi-Agent AI",
    "Temporal Graph Transformers",
    "Multimodal Fusion",
    "SHAP Explainability",
    "Federated Learning",
    "HerdIntel",
    "Edge-Cloud Hybrid"
  ]
};
