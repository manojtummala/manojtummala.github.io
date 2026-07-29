import { projects } from "@/data/projects";
import ProjectCard from "@/components/project-card";

export default function ProjectsPage() {
  return (
    <section id="projects" className="py-16">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Projects
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Data pipelines, distributed systems, AI tools, and more.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(p => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
