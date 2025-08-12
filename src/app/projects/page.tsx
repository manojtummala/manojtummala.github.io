"use client";

import { useMemo, useState } from "react";
import { projects, ALL_TAGS } from "@/data/projects";
import ProjectCard from "@/components/project-card";

export default function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Set<string>>(new Set());

  const toggle = (t: string) => {
    const next = new Set(active);
    if (next.has(t)) next.delete(t); else next.add(t);
    setActive(next);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter(p => {
      const matchesQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.stack.join(" ").toLowerCase().includes(q);
      const matchesTags =
        active.size === 0 || p.tags.some(t => active.has(t));
      return matchesQ && matchesTags;
    });
  }, [query, active]);

  return (
    <section id="projects" className="py-16">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Projects</h1>
        <input
          aria-label="Search projects"
          placeholder="Search…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full sm:w-64 rounded-xl border px-3 py-2 text-sm"
          style={{ borderColor: "var(--border)" }}
        />
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {ALL_TAGS.map(t => {
          const on = active.has(t);
          return (
            <button
              key={t}
              onClick={() => toggle(t)}
              className={`chip ${on ? "ring-2" : ""}`}
              style={{
                borderColor: "var(--border)",
                boxShadow: on ? "0 0 0 2px color-mix(in oklab, var(--foreground) 20%, transparent)" : undefined
              }}
            >
              {t}
            </button>
          );
        })}
        {active.size > 0 && (
          <button
            onClick={() => setActive(new Set())}
            className="chip"
            style={{ borderColor: "var(--border)" }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(p => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className="mt-10 text-sm text-muted-foreground">
          No projects found. Try a different search or clear filters.
        </p>
      )}
    </section>
  );
}