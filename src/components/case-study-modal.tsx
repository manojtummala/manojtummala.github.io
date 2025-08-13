"use client";
import type React from "react";
import { useEffect } from "react";
import { X, Github, ExternalLink } from "lucide-react";
import ReviewsVerseCase from "@/content/case/reviewsverse";
import SchoolTalkzCase from "@/content/case/schooltalkz";
import ZeeCase from "@/content/case/zee";

const REGISTRY: Record<string, { title: string; Comp: React.ComponentType; github?: string }> = {
  // Projects
  reviewsverse:        { title: "ReviewsVerse — Case Study", Comp: ReviewsVerseCase, github: "https://github.com/your/reviewsverse" },

  // Experience aliases (map your experience IDs to the same components)
  "reviewsverse-2024": { title: "ReviewsVerse — Case Study", Comp: ReviewsVerseCase, github: "https://github.com/your/reviewsverse" },
  schooltalkz:         { title: "SchoolTalkz — Case Study",  Comp: SchoolTalkzCase,  github: "https://github.com/your/schooltalkz" },
  "schooltalkz-2023":  { title: "SchoolTalkz — Case Study",  Comp: SchoolTalkzCase,  github: "https://github.com/your/schooltalkz" },
  zee:                 { title: "Zee Media — Case Study",    Comp: ZeeCase },
  "zee-2022":          { title: "Zee Media — Case Study",    Comp: ZeeCase },
};

export const CASE_REGISTRY = REGISTRY;
export type CaseSlug = keyof typeof CASE_REGISTRY;

export default function CaseStudyModal({
  slug, open, onClose,
}: { slug: string | null; open: boolean; onClose: () => void }) {
  const entry = slug ? REGISTRY[slug] : undefined;
  const isOpen = Boolean(open && entry);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen || !entry) return null;

  const { title, github, Comp } = entry;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose} 
      />
      
      {/* Modal */}
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-4xl -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-2xl border-2 shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Header */}
          <header className="flex items-center justify-between gap-3 border-b-2 border-slate-200 dark:border-slate-700 px-6 py-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
            <div className="text-lg font-semibold text-slate-800 dark:text-slate-200">{title}</div>
            <div className="flex items-center gap-3">
              {github && (
                <a 
                  href={github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="rounded-xl border-2 border-slate-200 dark:border-slate-600 p-2.5 bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200" 
                  aria-label="View on GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              <button 
                onClick={onClose} 
                className="rounded-xl border-2 border-slate-200 dark:border-slate-600 p-2.5 bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200" 
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>
          
          {/* Content */}
          <div className="max-h-[75vh] overflow-y-auto px-6 py-6 bg-white dark:bg-slate-900">
            <Comp />
          </div>
        </div>
      </div>
    </div>
  );
}