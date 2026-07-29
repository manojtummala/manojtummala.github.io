"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { experiences } from "@/data/experiences";

const NODE_COLORS = [
  { from: "#0f172a", to: "#09090b" },
  { from: "#334155", to: "#0f172a" },
  { from: "#475569", to: "#334155" },
  { from: "#1e293b", to: "#0f172a" },
];

export default function ExperienceStepper() {
  const [i, setI] = useState(0);

  const e = experiences[i];

  return (
    <div>
      <div>
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Experience
          </h2>
          <div className="flex items-center gap-2">
            <button
              className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100"
              onClick={() => setI(Math.max(0, i - 1))}
              disabled={i === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100"
              onClick={() => setI(Math.min(experiences.length - 1, i + 1))}
              disabled={i === experiences.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* DAG Pipeline Visualization */}
        <div className="mb-12 flex items-center justify-center gap-0">
          {experiences.map((exp, idx) => {
            const isActive = idx === i;
            const col = NODE_COLORS[idx % NODE_COLORS.length];
            return (
              <div key={exp.id} className="flex items-center">
                {/* Node */}
                <button
                  onClick={() => setI(idx)}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-xs font-bold text-white shadow-md transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${col.from}, ${col.to})`,
                      opacity: isActive ? 1 : 0.5,
                      transform: isActive ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    {idx + 1}
                  </div>
                  <span
                    className={`flex h-[36px] max-w-[80px] items-center justify-center text-center text-[10px] font-medium leading-tight transition-colors ${
                      isActive
                        ? "text-slate-900"
                        : "text-slate-400"
                    }`}
                  >
                    {exp.company}
                  </span>
                </button>

                {idx < experiences.length - 1 && (
                  <ArrowRight className="mx-2 h-4 w-4 text-slate-300" />
                )}
              </div>
            );
          })}
        </div>

        {/* Active detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={e.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-3xl"
          >
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {e.role}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {e.company}
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {e.period}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {e.summary}
              </p>

              <ul className="mt-4 space-y-2">
                {e.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                {e.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-slate-200 px-2.5 py-0.5 text-[11px] font-medium text-slate-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
