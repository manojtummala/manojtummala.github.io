export type Project = {
  id: string;
  title: string;
  summary: string;
  tags: string[];        // e.g., ["Full-Stack","ML/DS"]
  stack: string[];       // tech badges
  metrics?: string;      // one punchy stat
  href?: string;         // live/case study/demo link
  repo?: string;         // GitHub
  image?: string;        // /images/xyz.png (optional)
};

export const ALL_TAGS = ["Full-Stack", "ML/DS", "Infra", "Frontend", "Backend"];


export const projects: Project[] = [
  {
    id: "reviewsverse",
    title: "ReviewsVerse",
    summary: "Topic-tagged reviews platform; built APIs, ingestion, and ETL. MongoDB for metadata, S3 for blobs, Kafka ETL.",
    tags: ["Full-Stack", "Infra"],
    stack: ["Next.js", "Node.js", "MongoDB", "Kafka", "S3", "Docker"],
    metrics: "↓ p95 latency 30%",
    href: "https://github.com/manojtummala/reviewsverse", // TODO: case study
    repo: "https://github.com/manojtummala/reviewsverse" // if you have it
  },
  {
    id: "lidar-car",
    title: "LiDAR Self-Driving Prototype",
    summary: "End-to-end perception & control on micro vehicle; sensor fusion and path planning.",
    tags: ["ML/DS", "Infra"],
    stack: ["Python", "PyTorch", "ROS", "OpenCV"],
    metrics: "↑ F1 +7.2 pts",
    href: "#"
  },
  {
    id: "clipy",
    title: "Clipy — Universal Clipboard",
    summary: "Encrypted cross-device clipboard with offline queueing.",
    tags: ["Full-Stack", "Frontend"],
    stack: ["React", "TypeScript", "Firebase"],
    metrics: "Sync < 150ms",
    href: "#"
  },
  {
    id: "attendance-vision",
    title: "Vision-based Attendance",
    summary: "Face recognition pipeline with evaluation dashboard.",
    tags: ["ML/DS", "Backend"],
    stack: ["Python", "FastAPI", "PostgreSQL", "Pandas"],
    metrics: "↑ Accuracy 4.5%",
    href: "#"
  },
];