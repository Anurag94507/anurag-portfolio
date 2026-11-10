export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  type: "Conference" | "Research" | "Government" | "Simulation" | "Contest";
  date: string;
  description: string;
  badge: string;
}

export const certifications: CertificationItem[] = [
  {
    id: "icnact-cert",
    title: "International Conference Presentation & Paper",
    issuer: "ICNACT 2026 — VIT Bhopal University",
    type: "Conference",
    date: "2026",
    description: "Co-authored, presented, and defended the peer-reviewed IEEE-format research paper on dairy cattle welfare intelligence and multi-agent systems.",
    badge: "International IEEE"
  },
  {
    id: "iiit-cert",
    title: "AI Research Internship Outreach Certificate",
    issuer: "IIIT Naya Raipur",
    type: "Research",
    date: "2026",
    description: "Honored for conducting critical benchmark evaluations of CowNet-AI and formulating the edge-cloud temporal graph transformer architecture.",
    badge: "Research Honors"
  },
  {
    id: "cdo-cert",
    title: "Engineering Leadership Participation Certificate",
    issuer: "Chief Development Office (CDO), Ayodhya",
    type: "Government",
    date: "2025",
    description: "Awarded for spearheading the engineering development and administrative deployment of the SHG Inventory Management System.",
    badge: "Public Sector Impact"
  },
  {
    id: "codealpha-cert",
    title: "Software Engineering Internship Certificate",
    issuer: "CodeAlpha",
    type: "Contest",
    date: "2024",
    description: "Completed intensive full-stack development assignments, algorithm challenges, and software architecture sprints.",
    badge: "Engineering"
  },
  {
    id: "olympiad-cert",
    title: "National / State Olympiad Participation",
    issuer: "Science & Cyber Olympiad Foundation",
    type: "Contest",
    date: "Academic",
    description: "Recognized for high-percentile problem solving, computational mathematics, and logical reasoning capability.",
    badge: "Academic Merit"
  },
  {
    id: "bcg-forage",
    title: "Strategy Consulting Virtual Experience",
    issuer: "Boston Consulting Group (BCG) — Forage",
    type: "Simulation",
    date: "2024",
    description: "Completed real-world business case analyses, digital transformation modeling, and strategic market entry synthesis.",
    badge: "Industry Simulation"
  },
  {
    id: "siemens-forage",
    title: "Operations & Industrial Engineering Simulation",
    issuer: "Siemens — Forage",
    type: "Simulation",
    date: "2024",
    description: "Executed factory automation modeling, production efficiency diagnosis, and industrial operational optimization protocols.",
    badge: "Industry Simulation"
  }
];
