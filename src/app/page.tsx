"use client";

import AboutHero from "@/components/about-hero";
import ScrollCue from "@/components/scroll-cue";

export default function Home() {
  return (
    <>
      <div className="relative">
        <AboutHero />
        <ScrollCue targetId="projects" />
      </div>

      {/* Home-page Projects teaser (anchor target for the cue).
          Replace with a real grid later or keep as a placeholder. */}
      <section id="projects" className="py-16">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Projects</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          A few highlights — filterable, animated cards coming next.
        </p>
      </section>
    </>
  );
}