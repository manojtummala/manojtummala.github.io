export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  tags: string[];
  link?: string;
};

export const experiences: Experience[] = [
  {
    id: "usc-research-2025",
    company: "University of Southern California",
    role: "Research Engineer",
    period: "Jun 2025 – Present",
    summary:
      "Investigating modular multi-agent architectures for knowledge-intensive tasks.",
    highlights: [
      "Designing hierarchical multi-agent systems evaluating tradeoffs between agent specialization and inter-agent coordination overhead.",
      "Evaluating LLM-as-judge scoring and Chain-of-Thought prompting for self-correction in agentic loops.",
      "Prototyping a fault-tolerant agent orchestration framework with pluggable tool interfaces.",
    ],
    tags: ["Python", "LLM APIs", "RAG", "Vector Databases", "FastAPI"],
    link: "#",
  },
  {
    id: "reviewsverse-2024",
    company: "ReviewsVerse",
    role: "Full-Stack & Infra Developer",
    period: "May 2024 – May 2025",
    summary:
      "Scalable backend platform with Kafka-S3 ingestion pipelines and reliability-focused infrastructure.",
    highlights: [
      "Designed and deployed backend supporting 1,000+ concurrent users with strict SLIs/SLOs (<200ms latency).",
      "Built Kafka-S3 ingestion pipelines with OpenTelemetry tracing, retries, and circuit breakers, boosting pipeline uptime by 30%.",
      "Reduced ETL latency by 20% through query bottleneck analysis; eliminated false alerts by 30%.",
    ],
    tags: ["Next.js", "Node.js", "Kafka", "AWS S3", "MongoDB", "Docker", "OpenTelemetry"],
    link: "#",
  },
  {
    id: "schooltalkz-2023",
    company: "SchoolTalkz",
    role: "Data Engineer & React Developer",
    period: "May 2022 – May 2023",
    summary:
      "Automated data pipelines with Airflow, alerting, and self-healing capabilities.",
    highlights: [
      "Automated Airflow DAGs with retries and real-time alerting, eliminating manual operational toil.",
      "Reduced analytics reporting time by 40% by optimizing complex SQL aggregations with window functions and partition pruning.",
      "Instrumented ETL workflows with end-to-end telemetry for zero-loss data reconciliation.",
    ],
    tags: ["Python", "Airflow", "PostgreSQL", "React", "AWS", "ETL"],
    link: "#",
  },
  {
    id: "zee-2022",
    company: "Zee Media",
    role: "React & System Architecture Intern",
    period: "May 2022 – Sep 2022",
    summary:
      "Component architecture design and performance optimization for internal tools.",
    highlights: [
      "Refactored components to reduce re-renders; memoized expensive trees.",
      "Introduced lint/prettier and CI workflows for faster PR turnaround.",
      "Collaborated on auth/session flow and API consumption patterns.",
    ],
    tags: ["React", "TypeScript", "System Design"],
    link: "#",
  },
];
