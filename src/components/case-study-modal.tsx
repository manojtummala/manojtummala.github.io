// src/components/case-study-modal.tsx
"use client";
import { useEffect } from "react";
import { X, Github } from "lucide-react";
import ReviewsVerseCase from "@/content/case/reviewsverse";
// import SchoolTalkzCase from "@/content/case/schooltalkz";
// import ZeeCase from "@/content/case/zee";

const REGISTRY: Record<string, { title: string; Comp: React.ComponentType; github?: string }> = {
  reviewsverse: { title: "ReviewsVerse — Case Study", Comp: ReviewsVerseCase, github: "https://github.com/your/reviewsverse" },
  // schooltalkz:  { title: "SchoolTalkz — Case Study", Comp: SchoolTalkzCase, github: "https://github.com/your/schooltalkz" },
  // zee:          { title: "Zee Media — Case Study",   Comp: ZeeCase }, // no GH link? leave undefined
};

export default function CaseStudyModal({
  slug, open, onClose,
}: { slug: string | null; open: boolean; onClose: () => void }) {
  const entry = slug ? REGISTRY[slug] : undefined;
  const Comp = entry?.Comp;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open || !Comp) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-2xl border shadow-xl bg-background">
          <header className="flex items-center justify-between gap-3 border-b px-4 py-3">
            <div className="text-sm font-medium">{entry?.title}</div>
            <div className="flex items-center gap-2">
              {entry?.github && (
                <a href={entry.github} target="_blank" rel="noreferrer" className="rounded-xl border p-2" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              )}
              <button onClick={onClose} className="rounded-xl border p-2" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>
          <div className="max-h-[75vh] overflow-y-auto px-5 py-5">
            <Comp />
          </div>
        </div>
      </div>
    </div>
  );
}