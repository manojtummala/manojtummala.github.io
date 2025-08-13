"use client";

import { Suspense, useMemo, useState, useCallback, useEffect } from "react";
import { projects, ALL_TAGS } from "@/data/projects";
import ProjectCard from "@/components/project-card";

function ProjectsInner() {
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
    <section id="projects" className="py-16 bg-gradient-to-br from-slate-100/50 via-blue-100/30 to-indigo-100/30 dark:from-slate-800/50 dark:via-slate-700/30 dark:to-indigo-800/30">
      <div className="container">
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-800 to-indigo-700 dark:from-slate-100 dark:to-indigo-300 bg-clip-text text-transparent">
              Projects
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Explore my latest work and creative projects
            </p>
          </div>
          <div className="flex items-center gap-3">
            <input
              aria-label="Search projects"
              placeholder="Search projects…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full sm:w-64 rounded-xl border-2 px-4 py-2.5 text-sm bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:ring-blue-400/50 dark:focus:border-blue-400 transition-all duration-200"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-3">
          {ALL_TAGS.map(t => {
            const on = active.has(t);
            return (
              <button
                key={t}
                onClick={() => toggle(t)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  on 
                    ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-500/30" 
                    : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/80"
                }`}
              >
                {t}
              </button>
            );
          })}
          {active.size > 0 && (
            <button
              onClick={() => setActive(new Set())}
              className="px-4 py-2 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 border-2 border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600/80 transition-all duration-200"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-slate-600 dark:text-slate-400">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(p => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-16 text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <svg className="w-12 h-12 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
              No projects found
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Try adjusting your search or clearing some filters
            </p>
            <button
              onClick={() => {
                setQuery("");
                setActive(new Set());
              }}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div className="py-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    }>
      <ProjectsInner />
    </Suspense>
  );
}