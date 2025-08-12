"use client";
import { useRef } from "react";

export default function Spotlight({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
  }

  return (
    <div ref={ref} onMouseMove={onMove} className="relative">
      {/* Put ABOVE the section bg (z-0), slightly stronger and blended */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(220px 220px at var(--spot-x,50%) var(--spot-y,50%), rgba(255,255,255,.10), transparent 60%)",
          mixBlendMode: "screen",
        }}
      />
      {/* content needs position relative z-10 so it sits above the overlay */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}