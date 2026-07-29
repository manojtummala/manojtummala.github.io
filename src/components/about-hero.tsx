"use client";

import { Download, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import Gauge from "@/components/gauge";

export default function AboutHero() {
  return (
    <section id="about" className="relative section min-h-[86svh] scroll-mt-28">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className="font-mono text-xs font-semibold tracking-widest uppercase text-slate-500">
              Data Engineering &bull; SRE &bull; AI Systems
            </span>
            <span className="rounded-full border border-slate-300 bg-slate-100 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-slate-700">
              Open to Work
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            I build reliable systems{" "}
            <span className="text-slate-500">that scale.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            USC MS CS graduate with 3+ years building fault-tolerant data pipelines,
            distributed systems, and AI-powered retrieval workflows in production.
            I design infrastructure that stays up, pipelines that don&apos;t silently
            break, and systems you can measure. Currently seeking full-time opportunities
            in data engineering, SRE, and infrastructure.
          </motion.p>

          {/* Resume pill + social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 flex flex-wrap items-center gap-3"
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
            <span className="font-mono text-sm text-slate-400">
              manojtum@usc.edu
            </span>
          </motion.div>

          {/* Gauges row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            <Gauge value={15} max={15} label="Production Pipelines" unit="+" color="#0f172a" delay={0.4} />
            <Gauge value={1000} max={1000} label="Concurrent Users" unit="+" color="#0f172a" delay={0.5} />
            <Gauge value={30} max={30} label="Uptime Improvement" unit="%" color="#0f172a" delay={0.6} />
            <Gauge value={3} max={5} label="Years Experience" unit="+" color="#0f172a" delay={0.7} />
          </motion.div>

          {/* Tech chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {[
              "Python", "Kafka", "Spark", "Airflow", "AWS",
              "Docker", "Kubernetes", "PostgreSQL", "FastAPI",
              "RAG", "PyTorch", "Terraform", "CI/CD",
              "Snowflake", "Delta Lake", "Monitoring", "OpenTelemetry",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border border-slate-200 px-3 py-1 font-mono text-[11px] font-medium text-slate-600 transition hover:bg-slate-100"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
