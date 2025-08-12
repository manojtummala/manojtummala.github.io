"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ProjectCard from "@/components/project-card";
import { projects } from "@/data/projects";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function ProjectsTeaser() {
  // Pick the first few as “featured” (reorder your data to control which show up)
  const featured = projects.slice(0, 3);

  return (
    <section id="projects" className="py-16">
      <div className="container">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Projects</h2>
        <Link href="/projects" className="btn btn-ghost">
          See all projects →
        </Link>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {featured.map((p) => (
          <motion.div key={p.id} variants={item}>
            <ProjectCard p={p} />
          </motion.div>
        ))}
      </motion.div>
      </div>
    </section>
  );
}