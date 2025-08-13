"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "@/components/project-card";
import { projects } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";

// More vertical card footprint for the deck view - phone panel size
const CARD_W = 320; // px (narrower like phone)
const CARD_H = 420; // px (taller like phone panel)

export default function ProjectsCarousel({ onOpen }: { onOpen: (slug: string) => void }) {
  const featured = projects.slice(0, 8);
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1); // direction for swipe animation
  const [pulse, setPulse] = useState(false); // brief backdrop emphasis on change
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const clamp = (n: number) => Math.max(0, Math.min(featured.length - 1, n));
  const nudge = useCallback((d: 1 | -1) => {
    setDir(d);
    setI((prev) => clamp(prev + d));
  }, [featured.length]);

  // Emphasize back cards briefly when index changes
  useEffect(() => {
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 480);
    return () => clearTimeout(t);
  }, [i]);

  // Mouse movement for parallax effect
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x: x - 0.5, y: y - 0.5 });
  }, []);

  // Touch / Pointer drag navigation only (no wheel)
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => (startX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 40) nudge(-1);
    if (dx < -40) nudge(1);
    startX.current = null;
  };
  const onPointerDown = (e: React.PointerEvent) => (startX.current = e.clientX);
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    if (dx > 40) nudge(1);
    if (dx < -40) nudge(-1);
    startX.current = null;
  };

  return (
    <section id="projects" className="py-16 bg-gradient-to-br from-slate-100/50 via-blue-100/30 to-indigo-100/30 dark:from-slate-800/50 dark:via-slate-700/30 dark:to-indigo-800/30">
      <div className="container">
        {/* Main content with left-right split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Carousel with cards */}
          <div className="relative flex items-center justify-center">
            {/* Left arrow - positioned very close to cards */}
            <button
              className="absolute -left-2 z-20 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-2.5 hover:scale-110 hover:bg-white dark:hover:bg-slate-700 transition-all duration-200 shadow-lg"
              onClick={() => nudge(-1)}
              disabled={i === 0}
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5 text-slate-700 dark:text-slate-300" />
            </button>

            {/* Right arrow - positioned very close to cards */}
            <button
              className="absolute -right-2 z-20 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-2.5 hover:scale-110 hover:bg-white dark:hover:bg-slate-700 transition-all duration-200 shadow-lg"
              onClick={() => nudge(1)}
              disabled={i === featured.length - 1}
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5 text-slate-700 dark:text-slate-300" />
            </button>

            {/* Deck */}
            <div
              className="relative mx-auto grid place-items-center select-none"
              style={{ minHeight: CARD_H + 80, width: '100%', maxWidth: '800px' }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onMouseMove={handleMouseMove}
            >
              {/* Constellation Backdrop */}
              <ConstellationBackdrop index={i} pulse={pulse} mousePos={mousePos} />

              {/* Animated main card (solid) */}
              <div className="relative z-10" style={{ width: CARD_W, height: CARD_H }}>
                <AnimatePresence mode="wait" custom={dir} initial={false}>
                  <motion.div
                    key={featured[i]?.id}
                    custom={dir}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    className="h-full"
                  >
                    <ProjectCard p={featured[i]} onOpen={onOpen} size="deck" solid />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          
          {/* Right side - Projects header and See all button */}
          <div className="flex flex-col items-start gap-6">
            <h2 className="heading text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Projects
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
              Explore my latest work and creative projects, showcasing innovative solutions and cutting-edge technologies.
            </p>
            <Link href="/projects" className="btn-primary text-lg px-6 py-3">
              See all projects →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const cardVariants = {
  enter: (dir: 1 | -1) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
    rotate: dir > 0 ? 1 : -1, // Minimal rotation for straighter cards
    scale: 0.98,
  }),
  center: { x: 0, opacity: 1, rotate: 0, scale: 1 },
  exit: (dir: 1 | -1) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
    rotate: dir > 0 ? -2 : 2, // Minimal rotation for straighter cards
    scale: 0.985,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

interface Point {
  id: string | number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkle: number;
}

function ConstellationBackdrop({ index, pulse, mousePos }: { 
  index: number; 
  pulse: boolean; 
  mousePos: { x: number; y: number }; 
}) {
  // Generate constellation points (embedding space) - much larger area
  const generatePoints = () => {
    const points = [];
    for (let i = 0; i < 200; i++) {
      points.push({
        id: i,
        x: Math.random() * 1200 - 600, // Larger area
        y: Math.random() * 900 - 450,   // Larger area
        size: Math.random() * 3 + 1.5,  // Bigger points
        opacity: Math.random() * 0.8 + 0.3, // More visible
        twinkle: Math.random() * 0.6 + 0.4,
      });
    }
    return points;
  };

  // Generate cluster for current project - much more prominent
  const generateCluster = (projectIndex: number) => {
    const cluster = [];
    const centerX = (Math.random() - 0.5) * 300; // Larger cluster area
    const centerY = (Math.random() - 0.5) * 300;
    
    for (let i = 0; i < 8 + (projectIndex % 4); i++) { // More cluster points
      cluster.push({
        id: `cluster-${i}`,
        x: centerX + (Math.random() - 0.5) * 120, // Bigger cluster spread
        y: centerY + (Math.random() - 0.5) * 120,
        size: Math.random() * 4 + 3, // Much bigger cluster points
        opacity: 0.9 + Math.random() * 0.1,
        twinkle: 1,
      });
    }
    return cluster;
  };

  // Initialize with empty arrays to avoid hydration mismatch
  const [points, setPoints] = useState<Point[]>([]);
  const [cluster, setCluster] = useState<Point[]>([]);

  // Generate points only on client side after mount
  useEffect(() => {
    setPoints(generatePoints());
  }, []);

  // Update cluster when project changes
  useEffect(() => {
    setCluster(generateCluster(index));
  }, [index]);

  // Enhanced parallax effect with smoother movement
  const parallaxOffset = {
    x: mousePos.x * 40, // Increased movement range
    y: mousePos.y * 40,
  };

  // Don't render until points are generated (client-side only)
  if (points.length === 0 || cluster.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Background constellation points - much larger area */}
      <svg 
        width="1200" 
        height="900" 
        viewBox="-600 -450 1200 900"
        className="absolute"
        style={{
          transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Smoother movement
        }}
      >
        {points.map((point) => (
          <motion.circle
            key={point.id}
            cx={point.x}
            cy={point.y}
            r={point.size}
            fill="currentColor"
            className="text-slate-400 dark:text-slate-500" // More visible
            style={{ opacity: point.opacity }}
            animate={{
              opacity: [
                point.opacity * point.twinkle,
                point.opacity,
                point.opacity * point.twinkle,
              ],
            }}
            transition={{
              duration: 2 + (Number(point.id) % 3), // Use deterministic values instead of Math.random()
              repeat: Infinity,
              ease: "easeInOut",
              delay: (Number(point.id) % 2) * 0.5, // Use deterministic values instead of Math.random()
            }}
          />
        ))}
      </svg>

      {/* Active cluster with much more prominent halo effect */}
      <svg 
        width="1200" 
        height="900" 
        viewBox="-600 -450 1200 900"
        className="absolute"
      >
        {/* Enhanced halo effect */}
        <defs>
          <radialGradient id={`clusterHalo-${index}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" /> {/* More opaque */}
            <stop offset="40%" stopColor="rgba(59, 130, 246, 0.3)" />
            <stop offset="80%" stopColor="rgba(59, 130, 246, 0.1)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          
          {/* Additional glow effect */}
          <radialGradient id={`clusterGlow-${index}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(147, 197, 253, 0.4)" />
            <stop offset="60%" stopColor="rgba(147, 197, 253, 0.1)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        
        {/* Primary cluster halo - much bigger */}
        <motion.circle
          cx={cluster[0]?.x || 0}
          cy={cluster[0]?.y || 0}
          r={pulse ? 180 : 150} // Much bigger halo
          fill="url(#clusterHalo-${index})"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: pulse ? 1 : 0.9, 
            scale: pulse ? 1.15 : 1,
            cx: cluster[0]?.x || 0,
            cy: cluster[0]?.y || 0,
          }}
          transition={{ 
            duration: 1, 
            ease: "easeOut",
            cx: { duration: 0.8, ease: "easeInOut" },
            cy: { duration: 0.8, ease: "easeInOut" },
          }}
        />

        {/* Secondary glow effect */}
        <motion.circle
          cx={cluster[0]?.x || 0}
          cy={cluster[0]?.y || 0}
          r={pulse ? 220 : 200}
          fill="url(#clusterGlow-${index})"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: pulse ? 0.6 : 0.4, 
            scale: pulse ? 1.1 : 1,
            cx: cluster[0]?.x || 0,
            cy: cluster[0]?.y || 0,
          }}
          transition={{ 
            duration: 1.2, 
            ease: "easeOut",
            delay: 0.1,
            cx: { duration: 0.8, ease: "easeInOut" },
            cy: { duration: 0.8, ease: "easeInOut" },
          }}
        />

        {/* Connection lines between cluster points - more prominent */}
        {cluster.slice(0, -1).map((point, i) => {
          const nextPoint = cluster[i + 1];
          if (nextPoint) {
            return (
              <motion.line
                key={`line-${point.id}-${nextPoint.id}`}
                x1={point.x}
                y1={point.y}
                x2={nextPoint.x}
                y2={nextPoint.y}
                stroke="currentColor"
                strokeWidth="2" // Thicker lines
                className="text-blue-400/60 dark:text-blue-300/60" // More visible
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ 
                  opacity: 0.6,
                  pathLength: 1,
                }}
                transition={{ 
                  duration: 1, 
                  ease: "easeOut",
                  delay: 0.4 + i * 0.1,
                }}
              />
            );
          }
          return null;
        })}

        {/* Cluster points - much bigger and more prominent */}
        {cluster.map((point) => (
          <motion.circle
            key={point.id}
            cx={point.x}
            cy={point.y}
            r={point.size}
            fill="currentColor"
            className="text-blue-500 dark:text-blue-400"
            style={{ opacity: point.opacity }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: point.opacity, 
              scale: 1,
              cx: point.x,
              cy: point.y,
            }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: (typeof point.id === 'string' ? parseInt(point.id.split('-')[1]) || 0 : point.id) * 0.1, // Use deterministic values instead of Math.random()
              cx: { duration: 0.8, ease: "easeInOut" },
              cy: { duration: 0.8, ease: "easeInOut" },
            }}
          />
        ))}

        {/* Additional sparkle effects around cluster */}
        {cluster.map((point, i) => (
          <motion.circle
            key={`sparkle-${point.id}`}
            cx={point.x + ((i % 3) - 1) * 20} // Use deterministic positioning instead of Math.random()
            cy={point.y + ((i % 2) - 0.5) * 20}
            r={1}
            fill="currentColor"
            className="text-blue-300 dark:text-blue-200"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8 + i * 0.2 + (i % 3) * 0.1, // Use deterministic values instead of Math.random()
            }}
          />
        ))}

        {/* Orbital rings around cluster center for extra visual impact */}
        <motion.circle
          cx={cluster[0]?.x || 0}
          cy={cluster[0]?.y || 0}
          r={pulse ? 140 : 120}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-blue-400/30 dark:text-blue-300/30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: pulse ? 0.4 : 0.3, 
            scale: pulse ? 1.05 : 1,
            cx: cluster[0]?.x || 0,
            cy: cluster[0]?.y || 0,
          }}
          transition={{ 
            duration: 1.5, 
            ease: "easeOut",
            delay: 0.2,
            cx: { duration: 0.8, ease: "easeInOut" },
            cy: { duration: 0.8, ease: "easeInOut" },
          }}
        />

        {/* Second orbital ring */}
        <motion.circle
          cx={cluster[0]?.x || 0}
          cy={cluster[0]?.y || 0}
          r={pulse ? 200 : 180}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-blue-400/20 dark:text-blue-300/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: pulse ? 0.3 : 0.2, 
            scale: pulse ? 1.02 : 1,
            cx: cluster[0]?.x || 0,
            cy: cluster[0]?.y || 0,
          }}
          transition={{ 
            duration: 1.8, 
            ease: "easeOut",
            delay: 0.4,
            cx: { duration: 0.8, ease: "easeInOut" },
            cy: { duration: 0.8, ease: "easeInOut" },
          }}
        />
      </svg>
    </div>
  );
}
