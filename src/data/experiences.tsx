export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;     // e.g., "May–Sep 2024"
  location?: string;
  summary: string;
  highlights: string[];
  tags: string[];
  link?: string;
};

export const experiences: Experience[] = [
  {
    id: "reviewsverse-2024",
    company: "ReviewsVerse",
    role: "Full-Stack Developer",
    period: "May–Sep 2024",
    summary:
      "Built topic-tagged reviews platform; led APIs, ingestion, ETL, and performance tuning.",
    highlights: [
      "Designed REST/GraphQL APIs; added rate-limiting and request tracing.",
      "Kafka ETL to denormalize review data; reduced end-to-end latency ~30%.",
      "S3 for media blobs + MongoDB for metadata; wrote backfills & data checks.",
    ],
    tags: ["Next.js", "Node.js", "MongoDB", "Kafka", "AWS S3", "Docker"],
    link: "#"
  },
  {
    id: "schooltalkz-2023",
    company: "SchoolTalkz",
    role: "Data Engineer & React Developer",
    period: "Feb–Jun 2023",
    summary:
      "Pipelines for analytics + React features for creator tools.",
    highlights: [
      "Built incremental ETL with Python; added schema validation & alerts.",
      "React UI for dashboards; improved load time with code-splitting.",
      "Wrote tests and CI workflows to cut regressions.",
    ],
    tags: ["Python", "React", "PostgreSQL", "Airflow/cron", "AWS"],
    link: "#"
  },
  {
    id: "zee-2022",
    company: "Zee Media",
    role: "React & System Architecture Intern",
    period: "May–Sep 2022",
    summary:
      "Helped design component architecture and perf optimizations for internal tools.",
    highlights: [
      "Refactored components to reduce re-renders; memoized expensive trees.",
      "Introduced lint/prettier + basic CI; faster PR turnaround.",
      "Collaborated on auth/session flow and API consumption patterns.",
    ],
    tags: ["React", "TypeScript", "System Design"],
    link: "#"
  }
];