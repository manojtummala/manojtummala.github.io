"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { motion, useInView, easeInOut } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function AboutHero() {
  return (
    <section id="about" className="relative section p-8 scroll-mt-28 min-h-[86svh] bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 dark:from-slate-900 dark:via-slate-800/50 dark:to-indigo-900/20">
      <div className="container grid items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-[family-name:var(--font-display)] text-4xl lg:text-6xl leading-[1.03] font-bold"
          >
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-700 dark:from-slate-100 dark:via-blue-200 dark:to-indigo-300 bg-clip-text text-transparent">
              Hi, I'm Manoj
            </span>
            <br />
            <span className="text-slate-700 dark:text-slate-200 font-semibold">
              I build <span className="whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent font-bold">reliable systems</span> & data products.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 max-w-3xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium"
          >
            USC MS CS grad focused on full‑stack engineering and ML/DS. I ship clean APIs,
            performant UIs, and measurable impact.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-4 max-w-3xl text-sm sm:text-base text-slate-600 dark:text-slate-300"
          >
            Comfortable across the stack: Next.js/React & Node services, typed APIs, and Postgres/Mongo.
            In ML/DS I build data pipelines, evaluation harnesses, and deploy models behind lean endpoints.
            I enjoy infrastructure that doesn't get in the way—Docker, queues, observability—and pushing
            changes safely to production with tests and CI.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-4 max-w-3xl text-sm sm:text-base text-slate-600 dark:text-slate-300"
          >
            As a CS enthusiast, I'm driven by creating reliable systems that are simple to operate, measurable
            in impact, and a pleasure to use.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a href="/resume_fs.pdf" target="_blank" rel="noreferrer" className="btn-primary shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-6 py-3">
              <Download className="h-5 w-5" /> Resume
            </a>
          </motion.div>

          {/* tech chips */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 flex flex-wrap gap-3 text-sm"
          >
            {["Next.js","TypeScript","React","Node.js","Python","AWS","PostgreSQL","Kafka","Docker","PyTorch","Pandas"]
              .map((t, i) => (
                <motion.span 
                  key={t} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.9 + i * 0.05 }}
                  className="chip bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200 font-medium hover:scale-105 transition-transform px-4 py-2 text-sm"
                >
                  {t}
                </motion.span>
              ))}
          </motion.div>
        </div>

        {/* Right side - Avatar above dice */}
        <div className="md:col-span-4 relative min-h-[260px] flex flex-col items-center justify-start gap-6">
          {/* Avatar - simple fade in animation */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-40 h-40 rounded-full overflow-hidden border-1 border-slate-200 dark:border-slate-700 shadow-lg"
          >
            <img 
              src="/avatar.png" 
              alt="Manoj Tummala" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Metrics (scattered dice) */}
          <div className="relative w-full h-48 flex items-center justify-center">
            <ScatteredMetrics />
          </div>
        </div>
      </div>
    </section>
  );
}

function ScatteredMetrics() {
  // Enhanced metrics with better descriptions
  const metrics = [
    { value: 12, suffix: "+", label: "Projects Built" },
    { value: 30, suffix: "%", label: "Performance Boost" },
    { value: 5, suffix: "+", label: "Production Systems" },
  ];
  
  // Optimized scatter positions for smaller container
  const scatter = [
    { top: "15%", left: "20%", rotate: -25, rotateX: 20, rotateY: -15, z: 2 },
    { top: "60%", left: "40%", rotate: 25, rotateX: -18, rotateY: 18, z: 1 },
    { top: "35%", left: "75%", rotate: -15, rotateX: 28, rotateY: -22, z: 3 },
  ];
  
  return (
    <div className="absolute inset-0 w-full h-full" style={{ perspective: 1000 }}>
      {metrics.map((m, i) => (
        <AnimatedMetric
          key={m.label}
          {...m}
          customScatter={scatter[i]}
          delay={i * 0.2}
        />
      ))}
    </div>
  );
}

type AnimatedMetricProps = {
  value: number;
  suffix?: string;
  label: string;
  customScatter?: { top: string; left: string; rotate: number; rotateX: number; rotateY: number; z: number };
  delay?: number;
};

function AnimatedMetric({ value, suffix = "", label, customScatter, delay = 0 }: AnimatedMetricProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [n, setN] = useState(0);
  const tilt = customScatter || { rotate: 0, rotateX: 0, rotateY: 0, top: "0%", left: "0%", z: 1 };

  // Enhanced animation states
  const [animated, setAnimated] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  
  useEffect(() => {
    if (inView) {
      setAnimated(true);
      // Add rolling effect
      setIsRolling(true);
      setTimeout(() => setIsRolling(false), 1200);
    }
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    const dur = 1200; // Longer duration for better effect
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4); // Enhanced easing
      setN(Math.round(value * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  // Enhanced 3D cube with better sizing
  const size = 72; // Slightly larger for better visibility
  
  // Theme-aware styling with enhanced gradients
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const check = () => setIsDark(document.documentElement.classList.contains('dark'));
      check();
      const observer = new MutationObserver(check);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      return () => observer.disconnect();
    }
  }, []);

  const faceStyle: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: 600,
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
    border: isDark ? '2px solid #374151' : '2px solid #d1d5db',
  };

  // Enhanced cube animation with rolling effect
  const cubeAnim = animated
    ? {
        rotate: tilt.rotate + (isRolling ? 360 : 0),
        rotateX: tilt.rotateX + (isRolling ? 180 : 0),
        rotateY: tilt.rotateY + (isRolling ? 180 : 0),
        transition: { 
          duration: isRolling ? 1.2 : 1.4, 
          ease: isRolling ? easeInOut : easeInOut,
        },
      }
    : { rotate: 0, rotateX: 0, rotateY: 0 };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
      style={{
        position: "absolute",
        top: tilt.top,
        left: tilt.left,
        width: size,
        height: size,
        perspective: 800,
        zIndex: tilt.z,
      }}
    >
      <motion.div
        className="dice-cube"
        style={{
          width: size,
          height: size,
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
        animate={cubeAnim}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
      >
        {/* Front (metric) - Enhanced with gradient */}
        <div style={{
          ...faceStyle,
          background: isDark 
            ? 'linear-gradient(135deg, #1f2937, #374151)' 
            : 'linear-gradient(135deg, #ffffff, #f8fafc)',
          color: isDark ? '#ffffff' : '#1f2937',
          boxShadow: isDark
            ? '0 4px 20px 0 rgba(0,0,0,0.4), 0 2px 0 0 #4b5563 inset'
            : '0 8px 32px 0 rgba(0,0,0,0.15), 0 2px 0 0 #ffffff inset',
          transform: `rotateY(0deg) translateZ(${size/2}px)`,
        }}>
          <div className="flex flex-col items-center w-full">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              {n}{suffix}
            </span>
            <span className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 text-center px-2 leading-tight font-medium">
              {label}
            </span>
          </div>
        </div>
        
        {/* Back - Enhanced pattern */}
        <div style={{
          ...faceStyle,
          background: 'linear-gradient(135deg, #e2e8f0 60%, #cbd5e1)',
          color: '#64748b',
          transform: `rotateY(180deg) translateZ(${size/2}px)`,
        }}>
          <span className="opacity-70 text-lg">●●●</span>
        </div>
        
        {/* Right - Enhanced pattern */}
        <div style={{
          ...faceStyle,
          background: 'linear-gradient(90deg, #f1f5f9 60%, #e2e8f0)',
          color: '#64748b',
          transform: `rotateY(90deg) translateZ(${size/2}px)`,
        }}>
          <span className="opacity-60 text-lg">●●</span>
        </div>
        
        {/* Left - Enhanced pattern */}
        <div style={{
          ...faceStyle,
          background: 'linear-gradient(270deg, #f1f5f9 60%, #e2e8f0)',
          color: '#64748b',
          transform: `rotateY(-90deg) translateZ(${size/2}px)`,
        }}>
          <span className="opacity-60 text-lg">●</span>
        </div>
        
        {/* Top - Enhanced pattern */}
        <div style={{
          ...faceStyle,
          background: 'linear-gradient(0deg, #f1f5f9 60%, #e2e8f0)',
          color: '#64748b',
          transform: `rotateX(90deg) translateZ(${size/2}px)`,
        }}>
          <span className="opacity-50 text-lg">●●●●</span>
        </div>
        
        {/* Bottom - Enhanced pattern */}
        <div style={{
          ...faceStyle,
          background: 'linear-gradient(180deg, #f1f5f9 60%, #e2e8f0)',
          color: '#64748b',
          transform: `rotateX(-90deg) translateZ(${size/2}px)`,
        }}>
          <span className="opacity-50 text-lg">●●</span>
        </div>
      </motion.div>
    </motion.div>
  );
}