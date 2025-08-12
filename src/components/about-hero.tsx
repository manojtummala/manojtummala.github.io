"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Mail, Download, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function Counter({ to = 10, duration = 900 }: { to?: number; duration?: number }) {
  const [mounted, setMounted] = useState(false);
  const [val, setVal] = useState(0);
  const start = useRef<number | null>(null);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!mounted) return;
    const step = (t: number) => {
      if (start.current == null) start.current = t;
      const p = Math.min((t - start.current) / duration, 1);
      setVal(Math.round(p * to));
      if (p < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [mounted, to, duration]);
  return <span>{mounted ? val : 0}</span>;
}

const skills = ["Next.js","TypeScript","React","Node.js","Python","AWS","PostgreSQL","Kafka","Docker","PyTorch","Pandas"];

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* subtle background grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]
                      [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]
                      bg-[radial-gradient(circle_at_1px_1px,theme(colors.zinc.500)_1px,transparent_1px)]
                      [background-size:16px_16px]" />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 gap-8 md:grid-cols-[160px,1fr]"
      >
        {/* Avatar / initials */}
        <div className="flex md:block items-center">
          <div className="h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-500 p-[2px]">
            <div className="h-full w-full rounded-full bg-background grid place-items-center text-2xl font-semibold">
              MT
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-bold leading-tight tracking-tight">
              Hi, I’m Manoj — I build{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
                reliable systems
              </span>{" "}
              & data products.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              USC MS CS grad focused on full-stack engineering and ML/DS. I ship clean APIs,
              performant UIs, and measurable impact.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link href="#projects" className="btn btn-ghost">
              View Projects <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/resume" className="btn btn-primary">
              Resume <Download className="h-4 w-4" />
            </Link>
            <div className="ml-auto flex gap-2">
              <a href="https://github.com/manojtummala" target="_blank" rel="noreferrer" className="btn btn-ghost p-2" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
              <a href="https://www.linkedin.com/in/manojtummala/" target="_blank" rel="noreferrer" className="btn btn-ghost p-2" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="mailto:manoj@example.com" className="btn btn-ghost p-2" aria-label="Email">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Skills */}
          <ul className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <li key={s} className="chip">{s}</li>
            ))}
          </ul>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 max-w-md">
            <div className="card">
              <div className="text-2xl font-semibold"><Counter to={12} />+</div>
              <div className="text-xs text-muted-foreground">Projects</div>
            </div>
            <div className="card">
              <div className="text-2xl font-semibold"><Counter to={30} />%</div>
              <div className="text-xs text-muted-foreground">Latency reduced</div>
            </div>
            <div className="card">
              <div className="text-2xl font-semibold"><Counter to={5} />+</div>
              <div className="text-xs text-muted-foreground">Prod systems</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}