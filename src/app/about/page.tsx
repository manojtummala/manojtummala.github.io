"use client";

import { motion } from "framer-motion";
import { Download, Github, Linkedin } from "lucide-react";
import RadarChart from "@/components/radar-chart";
import ExperienceStepper from "@/components/experience-stepper";

const SKILL_DOMAINS = [
  { label: "Data Engineering", value: 92 },
  { label: "SRE / Infra", value: 85 },
  { label: "AI / ML", value: 80 },
  { label: "Distributed Systems", value: 85 },
  { label: "Backend", value: 78 },
  { label: "Frontend", value: 72 },
];

const HIGHLIGHTS = [
  {
    title: "Data Pipelines & ETL",
    items: [
      "Kafka + Airflow + Spark for streaming and batch processing",
      "Delta Lake, Snowflake, BigQuery for warehousing",
      "OpenTelemetry tracing, retry logic, circuit breakers",
    ],
  },
  {
    title: "Infrastructure & Reliability",
    items: [
      "Docker, CI/CD, Jenkins for deployment automation",
      "Log tracing, alerting, fault-tolerant architecture",
      "SLO/SLI definition and incident response",
    ],
  },
  {
    title: "AI & Retrieval Systems",
    items: [
      "RAG pipelines with semantic chunking and embedding search",
      "LLM-as-judge evaluation for answer quality",
      "Multi-agent architectures for knowledge workflows",
    ],
  },
];

const SKILL_GROUPS = [
  {
    title: "Data Engineering",
    skills: ["Python", "Kafka", "Spark", "Airflow", "Delta Lake", "Snowflake", "PostgreSQL", "ETL"],
  },
  {
    title: "Infrastructure",
    skills: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD", "OpenTelemetry", "Monitoring"],
  },
  {
    title: "AI / ML",
    skills: ["RAG", "LLM APIs", "Vector DBs", "PyTorch", "LangChain", "LLM Evaluation"],
  },
  {
    title: "Backend & API",
    skills: ["FastAPI", "Node.js", "Express", "MongoDB", "Redis", "GraphQL"],
  },
];

const EDUCATION = [
  {
    degree: "M.S. Computer Science",
    school: "University of Southern California",
    period: "2023 – 2025",
  },
];

export default function About() {
  return (
    <div className="py-16">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              About Me
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              I build systems that scale, pipelines that stay reliable, and interfaces
              that make data useful. My background spans the full stack with a deep focus
              on the backend, infrastructure, and data layers.
            </p>
          </motion.div>

          {/* Quick info cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-10 grid gap-4 sm:grid-cols-3"
          >
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="font-mono text-[10px] font-semibold tracking-widest uppercase text-slate-400">
                Currently
              </span>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Research Engineer at USC — modular multi-agent architectures, agent orchestration, LLM evaluation.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="font-mono text-[10px] font-semibold tracking-widest uppercase text-slate-400">
                Location
              </span>
              <p className="mt-2 text-sm font-medium text-slate-700">
                San Francisco, CA
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="font-mono text-[10px] font-semibold tracking-widest uppercase text-slate-400">
                Education
              </span>
              <p className="mt-2 text-sm font-medium text-slate-700">
                MS CS — USC
              </p>
            </div>
          </motion.div>

          {/* Radar + highlights side by side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16 grid items-center gap-12 md:grid-cols-2"
          >
            <div className="flex justify-center">
              <RadarChart data={SKILL_DOMAINS} />
            </div>
            <div className="space-y-6">
              {HIGHLIGHTS.map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-semibold tracking-wider text-slate-900 uppercase">
                    {section.title}
                  </h3>
                  <ul className="mt-2 space-y-1.5">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Resume + socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="/Manoj_Tummala_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-primary shadow-lg hover:shadow-xl transition-all duration-300 px-5 py-2.5"
            >
              <Download className="h-4 w-4" /> Resume
            </a>
            <a
              href="https://github.com/manojtummala"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/manoj-tummala/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        {/* Experience timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-4xl"
        >
          <ExperienceStepper />
        </motion.div>

        {/* Skills groups */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-4xl"
        >
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Skills
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {SKILL_GROUPS.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="font-mono text-[10px] font-semibold tracking-widest uppercase text-slate-500">
                  {group.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] font-medium text-slate-600 transition hover:bg-slate-100"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-4xl"
        >
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Education
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {EDUCATION.map((edu) => (
              <div
                key={edu.degree}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-sm font-semibold text-slate-900">
                  {edu.degree}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {edu.school}
                </p>
                <span className="mt-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600">
                  {edu.period}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
