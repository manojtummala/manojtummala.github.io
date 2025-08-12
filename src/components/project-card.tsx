"use client";

import type React from "react"; // for React.DragEvent typing
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { setCardDragGhost } from "@/lib/drag-ghost";

export default function ProjectCard({
  p, onOpen,
}: { p: Project; onOpen?: (slug: string) => void }) {
  const hasExternal = Boolean(p.href || p.repo);
  const href = p.href ?? p.repo ?? undefined;

  const inner = (
    <div
      draggable
      onDragStart={(e: React.DragEvent) => {
        e.dataTransfer.setData("slug", p.id);
        e.dataTransfer.setData("type", "project");
        e.dataTransfer.setData("text/plain", p.id);
        e.dataTransfer.effectAllowed = "copy";
        setCardDragGhost(e);
      }}
    >
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="group flex h-[260px] w-[320px] sm:w-[360px] flex-col rounded-2xl border p-5 shadow-sm"
        style={{ borderColor: "var(--border)" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
          {hasExternal && (
            <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100 transition" />
          )}
        </div>

        {/* Summary */}
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.summary}</p>

        {/* grow spacer to push badges/metric to bottom */}
        <div className="flex-1" />

        {/* Badges */}
        <div className="mt-3 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>

        {/* Stack + metric */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {p.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="rounded-full bg-black/5 dark:bg-white/5 px-2 py-0.5 text-[11px]"
              >
                {s}
              </span>
            ))}
            {p.stack.length > 4 && (
              <span className="rounded-full bg-black/5 dark:bg-white/5 px-2 py-0.5 text-[11px]">
                +{p.stack.length - 4}
              </span>
            )}
          </div>
          {p.metrics && (
            <span
              className="rounded-xl border px-2.5 py-1 text-xs"
              style={{ borderColor: "var(--border)" }}
            >
              {p.metrics}
            </span>
          )}
        </div>
      </motion.article>
    </div>
  );

  // If there’s an external link, make the whole card a link; otherwise act as button for modal
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="block">
      {inner}
    </a>
  ) : (
    <button type="button" onClick={() => onOpen?.(p.id)} className="block text-left">
      {inner}
    </button>
  );
}