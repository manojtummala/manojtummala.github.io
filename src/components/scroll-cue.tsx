"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function ScrollCue({ targetId = "about" }: { targetId?: string }) {
  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      aria-label="Scroll to content"
      onClick={handleClick}
      className="group absolute left-1/2 bottom-6 -translate-x-1/2 rounded-full border-2 px-3 py-2 backdrop-blur
                 supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-slate-800/80
                 hover:scale-110 hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-600
                 shadow-md hover:shadow-xl"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-slate-600 dark:text-slate-300"
      >
        <ChevronDown className="h-5 w-5" />
      </motion.div>
    </button>
  );
}