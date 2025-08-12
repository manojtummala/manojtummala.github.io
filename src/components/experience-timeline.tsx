"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { experiences } from "@/data/experiences";

export default function ExperienceTimeline() {
  const [openId, setOpenId] = useState<string | null>(experiences[0]?.id ?? null);
  const secRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0); // 0..1

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionHeight = el.offsetHeight;
      const total = Math.max(1, sectionHeight - window.innerHeight); // avoid /0

      const scrolled = window.scrollY - sectionTop;
      const p = Math.min(1, Math.max(0, scrolled / total));
      setProgress(p);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="experience" ref={secRef} className="py-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Experience</h2>
        <button
          className="rounded-xl border px-3 py-1.5 text-sm hover:opacity-90"
          style={{ borderColor: "var(--border)" }}
          onClick={() => setOpenId(openId === "ALL" ? experiences[0].id : "ALL")}
        >
          {openId === "ALL" ? "Collapse all" : "Expand all"}
        </button>
      </div>

      <div className="relative">
        {/* static rail */}
        <div
          className="absolute left-[11px] top-0 bottom-0 hidden sm:block rounded-full"
          style={{ width: 2, background: "var(--border)" }}
        />
        {/* progress fill (sits on top) */}
        <div
          className="absolute left-[11px] top-0 hidden sm:block rounded-full origin-top"
          style={{
            width: 2,
            height: `${progress * 100}%`,
            background:
              "linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 50%, transparent), transparent 100%)",
          }}
        />

        <ul className="space-y-4">
          {experiences.map((e, idx) => {
            const open = openId === "ALL" || openId === e.id;
            return (
              <motion.li
                key={e.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                className="relative pl-0 sm:pl-10"
              >
                {/* dot */}
                <div
                  className="hidden sm:block absolute left-0 top-3 h-3 w-3 rounded-full ring-4"
                  style={{
                    background: "currentColor",
                    color: "var(--foreground)",
                    boxSizing: "content-box",
                    borderRadius: "9999px",
                  }}
                />

                {/* --- Tilt wrapper (see #3) --- */}
                <TiltCard>
                  <header className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold leading-tight">
                        {e.role} • {e.company}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {e.period}{e.location ? ` • ${e.location}` : ""}
                      </p>
                    </div>
                    {e.link && (
                      <a
                        href={e.link}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl border p-2 hover:opacity-80 transition"
                        style={{ borderColor: "var(--border)" }}
                        aria-label="Open link"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </header>

                  <p className="mt-3 text-sm text-muted-foreground">{e.summary}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border px-3 py-1 text-xs"
                        style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setOpenId(open ? null : e.id)}
                    className="mt-4 inline-flex items-center gap-2 text-sm rounded-xl border px-3 py-1.5 hover:opacity-90 transition"
                    style={{ borderColor: "var(--border)" }}
                    aria-expanded={open}
                    aria-controls={`exp-${e.id}`}
                  >
                    Details
                    <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
                  </button>

                  <motion.div
                    id={`exp-${e.id}`}
                    initial={false}
                    animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-3 list-disc pl-5 space-y-1 text-sm">
                      {e.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </motion.div>
                </TiltCard>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------- tiny tilt component ---------- */
function TiltCard({ children }: { children: React.ReactNode }) {
  const [style, setStyle] = useState<React.CSSProperties>({});
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y - r.height / 2) / r.height) * -8;
    const ry = ((x - r.width / 2) / r.width) * 8;
    setStyle({
      transform: `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`,
      boxShadow:
        "0 8px 24px rgba(0,0,0,.12), inset 0 0 0 1px var(--border)",
    });
  }
  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={() => setStyle({})}
      style={style}
      className="rounded-2xl border p-5 transition-transform will-change-transform"
    >
      {children}
    </div>
  );
}