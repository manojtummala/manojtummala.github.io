"use client";

import type React from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "@/data/experiences";
import { setCardDragGhost } from "@/lib/drag-ghost";

export default function ExperienceStepper() {
  const [i, setI] = useState(0);
  const leftRef = useRef<HTMLDivElement>(null);
  const [leftH, setLeftH] = useState<number | null>(null);

  // measure left column to keep right column same height
  useLayoutEffect(() => {
    const el = leftRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setLeftH(el.getBoundingClientRect().height));
    ro.observe(el);
    setLeftH(el.getBoundingClientRect().height);
    return () => ro.disconnect();
  }, [i]);

  // keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setI((x) => Math.max(0, x - 1));
      if (e.key === "ArrowRight") setI((x) => Math.min(experiences.length - 1, x + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // drag helper
  const handleDragStart = (ev: React.DragEvent, id: string) => {
    ev.dataTransfer.setData("slug", id);
    ev.dataTransfer.setData("type", "experience");
    ev.dataTransfer.setData("text/plain", id);
    ev.dataTransfer.effectAllowed = "copy";
    setCardDragGhost(ev);
  };

  const e = experiences[i];

  return (
    <section id="experience" className="section scroll-mt-28 bg-gradient-to-br from-slate-100/40 via-blue-100/20 to-indigo-100/20 dark:from-slate-800/40 dark:via-slate-700/20 dark:to-indigo-800/20">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="heading text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 to-indigo-700 dark:from-slate-100 dark:to-indigo-300 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="flex items-center gap-2">
            <button 
              className="rounded-xl border-2 p-2.5 hover:scale-105 transition-all duration-200 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-700 shadow-lg"
              onClick={() => setI(Math.max(0, i - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              className="rounded-xl border-2 p-2.5 hover:scale-105 transition-all duration-200 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-700 shadow-lg"
              onClick={() => setI(Math.min(experiences.length - 1, i + 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* LEFT: main card */}
          <AnimatePresence mode="popLayout" initial={false}>
            <div
              key={e.id}
              ref={leftRef}
              className="h-full"
              draggable
              onDragStart={(ev) => handleDragStart(ev, e.id)}
            >
              <motion.article
                layout
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className="rounded-2xl border-2 border-slate-200 dark:border-slate-600 p-6 relative overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-lg font-semibold leading-tight text-slate-800 dark:text-slate-100">
                  {e.role} • {e.company}
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{e.period}</p>
                <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{e.summary}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {e.tags.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border px-3 py-1 text-xs bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-xs text-slate-600 dark:text-slate-400">
                  Drag this card (or any on the right) into the drop zone below to read the full case
                  study.
                </p>

                {/* soft glow */}
                <motion.div
                  aria-hidden
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full"
                  style={{ background: "radial-gradient(closest-side, rgba(59,130,246,.12), transparent)" }}
                />
              </motion.article>
            </div>
          </AnimatePresence>

          {/* RIGHT: neighbors (same height as left) */}
          <div className="flex flex-col gap-3" style={leftH ? { height: leftH } : undefined}>
            {experiences.map((x, idx) =>
              idx !== i ? (
                <div
                  key={x.id}
                  className="flex-1 min-h-0"
                  draggable
                  onDragStart={(ev) => handleDragStart(ev, x.id)}
                >
                  <motion.button
                    layout
                    onClick={() => setI(idx)}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-full w-full surface p-3 text-left text-sm hover:opacity-90"
                  >
                    <div className="font-medium line-clamp-1 text-slate-800 dark:text-slate-100">
                      {x.role} • {x.company}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">{x.period}</div>
                  </motion.button>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
