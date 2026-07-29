import type { Project } from "@/data/projects";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">{p.title}</h3>

      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
        {p.summary}
      </p>

      <div className="flex-1" />

      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-600"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1">
          {p.stack.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700"
            >
              {s}
            </span>
          ))}
          {p.stack.length > 3 && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">
              +{p.stack.length - 3}
            </span>
          )}
        </div>
        {p.metrics && (
          <span className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
            {p.metrics}
          </span>
        )}
      </div>
    </div>
  );
}
