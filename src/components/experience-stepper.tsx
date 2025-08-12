// src/components/experience-stepper.tsx
"use client";

import type React from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "@/data/experiences";
import { setCardDragGhost } from "@/lib/drag-ghost";

export default function ExperienceStepper({ onOpen }: { onOpen: (slug: string)=>void }) {
  const [i, setI] = useState(0);
  const leftRef = useRef<HTMLDivElement>(null);
  const [leftH, setLeftH] = useState<number | null>(null);

  // native HTML5 dragstart helper (works with DropReveal)
  const handleDragStart = (ev: React.DragEvent, id: string, _label: string) => {
  ev.dataTransfer.setData("slug", id);
  ev.dataTransfer.setData("type", "experience");
  ev.dataTransfer.setData("text/plain", id);
  ev.dataTransfer.effectAllowed = "copy";
  setCardDragGhost(ev);
};

  // measure left column to make right column same height
  useLayoutEffect(() => {
    const el = leftRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setLeftH(el.getBoundingClientRect().height));
    ro.observe(el);
    setLeftH(el.getBoundingClientRect().height);
    return () => ro.disconnect();
  }, [i]);

  // arrow keys
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setI((x) => Math.max(0, x - 1));
      if (e.key === "ArrowRight") setI((x) => Math.min(experiences.length - 1, x + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const e = experiences[i];

  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Experience</h2>
          <div className="flex items-center gap-2">
            <button className="rounded-xl border p-2" onClick={()=>setI(Math.max(0, i-1))}><ChevronLeft className="h-4 w-4" /></button>
            <button className="rounded-xl border p-2" onClick={()=>setI(Math.min(experiences.length-1, i+1))}><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* LEFT: main (50%) */}
          <AnimatePresence mode="popLayout" initial={false}>
            <div
              className="h-full"
              draggable
              onDragStart={(ev) => handleDragStart(ev, e.id, `${e.role}`)}
            >
              <motion.article
                key={e.id}
                ref={leftRef}
                layout
                initial={{ opacity: 0, y: 10, scale: .98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: .98 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className="rounded-2xl border p-6 shadow-sm relative overflow-hidden"
                style={{ borderColor: "var(--border)" }}
              >
                <h3 className="text-lg font-semibold leading-tight">{e.role} • {e.company}</h3>
                <p className="text-xs text-muted-foreground mt-1">{e.period}</p>
                <p className="mt-3 text-sm text-muted-foreground">{e.summary}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {e.tags.slice(0,5).map(t=>(
                    <span key={t} className="rounded-full border px-3 py-1 text-xs" style={{ borderColor: "var(--border)" }}>
                      {t}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  Drag this card (or any on the right) into the drop zone below to read the full case study.
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

          {/* RIGHT: neighbors column (50%), fills same height as left */}
          <div className="flex flex-col gap-3" style={leftH ? { height: leftH } : undefined}>
            {experiences.map((x, idx)=> idx!==i && (
              <div
                key={x.id}
                className="flex-1 min-h-0"
                draggable
                onDragStart={(ev) => handleDragStart(ev, x.id, `${x.role}`)}
              >
                <motion.button
                  layout
                  onClick={() => setI(idx)}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-full w-full rounded-xl border p-3 text-left text-sm hover:opacity-90"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="font-medium line-clamp-1">{x.role} • {x.company}</div>
                  <div className="text-xs text-muted-foreground">{x.period}</div>
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}