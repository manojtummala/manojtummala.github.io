export type Project = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  stack: string[];
  metrics?: string;
  href?: string;
  repo?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    id: "multi-agent-trading",
    title: "Multi-Agent Algorithmic Trading Platform",
    summary:
      "Multi-agent system with plug-and-play connectors for intraday/interday market data, news, and sentiment. Custom interfaces for multi-asset portfolio hedging with human-in-the-loop approval controls.",
    tags: ["Distributed Systems", "AI/ML"],
    stack: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    metrics: "",
    href: "#",
  },
  {
    id: "agentic-os-assistant",
    title: "On-Device Agentic OS Assistant",
    summary:
      "Fully local, privacy-preserving desktop assistant using Phi-3 Mini, MLX, and custom RAG. Multimodal ingestion, semantic search, and tool-calling via Rust/Tauri backend and React UI.",
    tags: ["AI/ML", "Full-Stack"],
    stack: ["Python", "Rust", "React", "MLX", "Qdrant", "Tauri"],
    metrics: "Sub-second inference",
    href: "#",
  },
  {
    id: "self-improving-rag",
    title: "Self-Improving RAG Pipeline",
    summary:
      "Retrieval-augmented generation pipeline with automated LLM-as-judge evaluation, enabling iterative tuning of chunking and retrieval parameters for improved answer consistency.",
    tags: ["AI/ML", "Data Engineering"],
    stack: ["Python", "LangChain", "Qdrant", "OpenAI", "FastAPI"],
    metrics: "",
    href: "#",
  },
  {
    id: "open-data-analytics",
    title: "Open Data Analytics Platform",
    summary:
      "Production-style analytics pipeline over public datasets, handling schema evolution, late-arriving data, and metric consistency through layered SQL models and data quality checks.",
    tags: ["Data Engineering", "Infra"],
    stack: ["Python", "SQL", "Apache Spark", "Airflow", "Snowflake"],
    metrics: "",
    href: "#",
  },
  {
    id: "reviewsverse",
    title: "ReviewsVerse",
    summary:
      "Topic-tagged reviews platform with Kafka-S3 ingestion pipelines, OpenTelemetry tracing, and circuit breakers. 1,000+ concurrent users with strict SLOs.",
    tags: ["Data Engineering", "Infra", "Full-Stack"],
    stack: ["Next.js", "Node.js", "MongoDB", "Kafka", "S3", "Docker"],
    metrics: "↓ p95 latency 30%",
    href: "https://github.com/manojtummala/reviewsverse",
    repo: "https://github.com/manojtummala/reviewsverse",
  },
  {
    id: "lidar-car",
    title: "LiDAR Self-Driving Prototype",
    summary:
      "End-to-end perception and control on a micro vehicle with sensor fusion, path planning, and real-time evaluation.",
    tags: ["AI/ML", "Infra"],
    stack: ["Python", "PyTorch", "ROS", "OpenCV"],
    metrics: "↑ F1 +7.2 pts",
    href: "#",
  },
  {
    id: "clipy",
    title: "Clipy — Universal Clipboard",
    summary:
      "Encrypted cross-device clipboard with offline queueing and end-to-end sync.",
    tags: ["Distributed Systems", "Full-Stack"],
    stack: ["React", "TypeScript", "Firebase"],
    metrics: "Sync < 150ms",
    href: "#",
  },
  {
    id: "attendance-vision",
    title: "Vision-based Attendance",
    summary:
      "Face recognition pipeline with evaluation dashboard and automated reporting.",
    tags: ["AI/ML", "Data Engineering"],
    stack: ["Python", "FastAPI", "PostgreSQL", "Pandas"],
    metrics: "↑ Accuracy 4.5%",
    href: "#",
  },
];
