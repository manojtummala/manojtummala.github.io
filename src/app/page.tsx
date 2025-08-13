"use client";

import { Suspense, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { projects } from "@/data/projects";
import { CASE_REGISTRY } from "@/components/case-study-modal";
import AboutHero from "@/components/about-hero";
import ScrollCue from "@/components/scroll-cue";
import ProjectsCarousel from "@/components/projects-carousel";
import ExperienceStepper from "@/components/experience-stepper";
import CaseStudyModal from "@/components/case-study-modal";
import DropReveal from "@/components/drop-reveal";
import Contact from "@/components/contact";

function HomeInner() {
  const router = useRouter();
  const params = useSearchParams();
  const slug = params.get("case");
  const open = Boolean(slug);

  const openCase = useCallback((id: string) => {
    // If we have a case component, open modal via query param
    if (CASE_REGISTRY[id as keyof typeof CASE_REGISTRY]) {
      const q = new URLSearchParams(window.location.search);
      q.set("case", id);
      router.push(`/?${q.toString()}`, { scroll: false });
      return;
    }
    // Else try project repo/href
    const p = projects.find(p => p.id === id);
    const url = p?.href ?? p?.repo;
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    // (Optional) If you want to support experience-only GitHub via registry metadata:
    const gh = (CASE_REGISTRY as any)[id]?.github as string | undefined;
    if (gh) window.open(gh, "_blank", "noopener,noreferrer");
  }, [router]);

  const closeCase = useCallback(() => {
    const q = new URLSearchParams(window.location.search);
    q.delete("case");
    router.push(`/?${q.toString()}`, { scroll: false });
  }, [router]);

  // close on Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeCase(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeCase]);

  return (
    <>
      <div className="relative">
        <AboutHero />
        <ScrollCue targetId="projects" />
      </div>

      <ProjectsCarousel onOpen={openCase} />
      <ExperienceStepper />

      <DropReveal onOpen={openCase} />

      <Contact />

      <CaseStudyModal slug={slug} open={open} onClose={closeCase} />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeInner />
    </Suspense>
  );
  }