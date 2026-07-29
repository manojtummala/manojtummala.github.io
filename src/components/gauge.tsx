"use client";

import { useEffect, useRef, useState } from "react";

type GaugeProps = {
  value: number;
  max: number;
  label: string;
  unit?: string;
  color?: string;
  delay?: number;
};

export default function Gauge({ value, max, label, unit = "", color = "#0f172a", delay = 0 }: GaugeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), delay * 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!animated) return;
    const dur = 1200;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [animated, value]);

  const pct = Math.min(n / max, 1);
  const radius = 44;
  const circumference = Math.PI * radius;
  const offset = circumference * (1 - pct);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <svg width="120" height="68" viewBox="0 0 120 68" className="overflow-visible">
        <path
          d="M 10 58 A 50 50 0 0 1 110 58"
          fill="none"
          stroke="currentColor"
          className="text-slate-200"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M 10 58 A 50 50 0 0 1 110 58"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? offset : circumference}
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
        <text
          x="60" y="44"
          textAnchor="middle"
          fill="currentColor"
          className="text-2xl font-bold"
          dominantBaseline="middle"
        >
          {n}{unit}
        </text>
      </svg>
      <span className="text-xs font-medium text-slate-500 text-center leading-tight">
        {label}
      </span>
    </div>
  );
}
