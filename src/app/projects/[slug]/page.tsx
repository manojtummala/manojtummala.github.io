import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import ReviewsVerseCase from "@/content/case/reviewsverse";

const CASE_MAP: Record<string, React.ComponentType> = {
  reviewsverse: ReviewsVerseCase,
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  const CaseComponent = CASE_MAP[slug];

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" /> Back to projects
      </Link>

      {CaseComponent ? (
        <CaseComponent />
      ) : (
        <article className="space-y-6">
          <header className="space-y-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {project.title}
            </h1>
            <p className="text-sm leading-relaxed text-slate-600">
              {project.summary}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-200 px-2.5 py-0.5 text-[11px] font-medium text-slate-600"
                >
                  {t}
                </span>
              ))}
            </div>
          </header>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Stack</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          {project.metrics && (
            <section>
              <h2 className="text-lg font-semibold text-slate-900">Key Metric</h2>
              <p className="mt-1 text-sm text-slate-600">{project.metrics}</p>
            </section>
          )}

          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              <ExternalLink className="h-4 w-4" /> View Project
            </a>
          )}
        </article>
      )}
    </main>
  );
}
