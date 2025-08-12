"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AboutHero from "@/components/about-hero";
import ScrollCue from "@/components/scroll-cue";
import ProjectsCarousel from "@/components/projects-carousel";
import ExperienceStepper from "@/components/experience-stepper";
import CaseStudyModal from "@/components/case-study-modal";
import DropReveal from "@/components/drop-reveal";

export default function Home() {
  const router = useRouter();
  const params = useSearchParams();
  const slug = params.get("case");
  const open = Boolean(slug);

  const openCase = useCallback((id: string) => {
    const q = new URLSearchParams(window.location.search);
    q.set("case", id);
    router.push(`/?${q.toString()}`, { scroll: false });
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
      <ExperienceStepper onOpen={openCase} />

      <DropReveal onOpen={openCase} />

      <CaseStudyModal slug={slug} open={open} onClose={closeCase} />
    </>
  );
}