"use client";

import { Suspense, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AboutHero from "@/components/about-hero";
import CaseStudyModal from "@/components/case-study-modal";
import ChatPanel from "@/components/chat-panel";

function HomeInner() {
  const router = useRouter();
  const params = useSearchParams();
  const slug = params.get("case");
  const open = Boolean(slug);

  const closeCase = useCallback(() => {
    const q = new URLSearchParams(window.location.search);
    q.delete("case");
    router.push(`/?${q.toString()}`, { scroll: false });
  }, [router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeCase(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeCase]);

  return (
    <>
      <AboutHero />
      <CaseStudyModal slug={slug} open={open} onClose={closeCase} />
      <ChatPanel />
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
