"use client";

import type React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { setCardDragGhost } from "@/lib/drag-ghost";

export default function ProjectCard({
  p,
  onOpen,
  size = "grid",
  solid = false,
}: {
  p: Project;
  onOpen?: (slug: string) => void;
  size?: "grid" | "deck";
  solid?: boolean;
}) {
  const hasExternal = Boolean(p.href || p.repo);
  const href = p.href ?? p.repo ?? undefined;

  const rootSize =
    size === "deck"
      ? "h-full w-full"
      : "group flex h-[260px] w-[320px] sm:w-[360px] flex-col";

  const surface = solid
    ? "rounded-2xl border-2 shadow-2xl bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-slate-800 dark:via-slate-700 dark:to-blue-900/30 border-slate-300 dark:border-slate-500"
    : "surface";

  const inner = (
    <div
      draggable
      onDragStart={(e: React.DragEvent) => {
        e.dataTransfer.setData("slug", p.id);
        e.dataTransfer.setData("type", "project");
        e.dataTransfer.setData("text/plain", p.id); // fallback
        e.dataTransfer.effectAllowed = "copy";
        setCardDragGhost(e);
      }}
    >
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`${rootSize} ${surface} p-6`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold leading-tight bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            {p.title}
          </h3>
          {hasExternal && (
            <ExternalLink className="h-5 w-5 opacity-60 transition group-hover:opacity-100 text-blue-600 dark:text-blue-400" />
          )}
        </div>

        {/* Summary */}
        <p className="mt-4 line-clamp-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {p.summary}
        </p>

        <div className="flex-1" />

        {/* Badges */}
        <div className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="chip bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200 font-medium">
              {t}
            </span>
          ))}
        </div>

        {/* Stack + metric */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {p.stack.slice(0, 3).map((s) => (
              <span key={s} className="rounded-full bg-slate-100 dark:bg-slate-700/50 px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                {s}
              </span>
            ))}
            {p.stack.length > 3 && (
              <span className="rounded-full bg-slate-100 dark:bg-slate-700/50 px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                +{p.stack.length - 3}
              </span>
            )}
          </div>
          {p.metrics && (
            <span className="rounded-xl border-2 px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 border-emerald-300 dark:border-emerald-600 text-emerald-800 dark:text-emerald-200">
              {p.metrics}
            </span>
          )}
        </div>
      </motion.article>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="block">{inner}</a>
  ) : (
    <button type="button" onClick={() => onOpen?.(p.id)} className="block text-left">{inner}</button>
  );
}