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
      className="group absolute left-1/2 bottom-6 -translate-x-1/2 rounded-full border px-3 py-2 backdrop-blur
                 supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-black/30
                 hover:scale-105 transition"
    >
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-5 w-5" />
      </motion.div>
    </button>
  );
}