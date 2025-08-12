"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "@/components/project-card";
import { projects } from "@/data/projects";

export default function ProjectsCarousel({ onOpen }: { onOpen: (slug: string)=>void }) {
  const scroller = useRef<HTMLDivElement>(null);
  const featured = projects.slice(0, 4);
  const nudge = (dir: number) => scroller.current?.scrollBy({ left: dir * 360, behavior: "smooth" });

  return (
    <section id="projects" className="py-16">
      <div className="container">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Projects</h2>
        <div className="flex items-center gap-2">
          <button className="rounded-xl border p-2" onClick={()=>nudge(-1)}><ChevronLeft className="h-4 w-4"/></button>
          <button className="rounded-xl border p-2" onClick={()=>nudge(1)}><ChevronRight className="h-4 w-4"/></button>
          <Link href="/projects" className="btn btn-ghost">See all →</Link>
        </div>
      </div>

      <div ref={scroller} className="container flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {featured.map((p) => (
          <div key={p.id} className="min-w-[320px] sm:min-w-[360px] snap-start">
            <ProjectCard p={p} onOpen={onOpen} />
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}