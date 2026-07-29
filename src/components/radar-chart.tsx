"use client";

import { useEffect, useRef, useState } from "react";

type RadarData = { label: string; value: number; }[];

const AXIS_COUNT = 6;
const SIZE = 320;
const CENTER = SIZE / 2;
const RADIUS = (SIZE / 2) - 32;

function polarToCartesian(angle: number, radius: number) {
  const a = (angle * Math.PI) / 180 - Math.PI / 2;
  return { x: CENTER + radius * Math.cos(a), y: CENTER + radius * Math.sin(a) };
}

export default function RadarChart({ data }: { data: RadarData }) {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const maxVal = 100;
  const angleStep = 360 / AXIS_COUNT;

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1];

  return (
    <div ref={ref} className="flex justify-center">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        {/* Grid rings */}
        {gridLevels.map((level) => {
          const r = RADIUS * level;
          const pts = Array.from({ length: AXIS_COUNT }, (_, i) => {
            const p = polarToCartesian(i * angleStep, r);
            return `${p.x},${p.y}`;
          });
          return (
            <polygon
              key={`grid-${level}`}
              points={pts.join(" ")}
              fill="none"
              stroke="currentColor"
              className="text-slate-200"
              strokeWidth={1}
            />
          );
        })}

        {/* Axis lines */}
        {data.map((_, i) => {
          const p = polarToCartesian(i * angleStep, RADIUS);
          return (
            <line
              key={`axis-${i}`}
              x1={CENTER}
              y1={CENTER}
              x2={p.x}
              y2={p.y}
              stroke="currentColor"
              className="text-slate-200"
              strokeWidth={1}
            />
          );
        })}

        {/* Data polygon */}
        {data.length > 0 && (
          <g style={{ transition: "opacity 0.6s ease", opacity: animated ? 1 : 0 }}>
            <polygon
              points={data
                .map((d, i) => {
                  const p = polarToCartesian(i * angleStep, (d.value / maxVal) * RADIUS);
                  return `${p.x},${p.y}`;
                })
                .join(" ")}
              fill="currentColor"
              className="text-slate-900/15"
            />
            <polygon
              points={data
                .map((d, i) => {
                  const p = polarToCartesian(i * angleStep, (d.value / maxVal) * RADIUS);
                  return `${p.x},${p.y}`;
                })
                .join(" ")}
              fill="none"
              stroke="currentColor"
              className="text-slate-900"
              strokeWidth={2}
            />
          </g>
        )}

        {/* Data points */}
        {data.map((d, i) => {
          const r = (d.value / maxVal) * RADIUS;
          const p = polarToCartesian(i * angleStep, animated ? r : 0);
          return (
            <circle
              key={`pt-${i}`}
              cx={p.x}
              cy={p.y}
              r={4}
              fill="currentColor"
              className="text-slate-900 transition-all duration-700"
              style={{
                transitionDelay: `${i * 0.1}s`,
              }}
            />
          );
        })}

        {/* Labels */}
        {data.map((d, i) => {
          const p = polarToCartesian(i * angleStep, RADIUS + 20);
          return (
            <text
              key={`label-${i}`}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[11px] font-medium fill-slate-600"
            >
              {d.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
