"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function DropReveal({ onOpen }: { onOpen: (slug: string)=>void }) {
  const [hover, setHover] = useState(false);

  return (
    <section className="py-16 bg-gradient-to-br from-slate-100/60 via-blue-100/30 to-indigo-100/30 dark:from-slate-800/60 dark:via-slate-700/30 dark:to-indigo-800/30">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12">
          {/* Computer Screen Drop Zone - smaller */}
          <motion.div
            onDragOver={(e)=>{ e.preventDefault(); setHover(true); }}
            onDragLeave={()=>setHover(false)}
            onDrop={(e)=>{
              e.preventDefault();
              setHover(false);
              const slug = e.dataTransfer.getData("slug") || e.dataTransfer.getData("text/plain");
              if (slug) onOpen(slug);
            }}
            animate={{ 
              scale: hover ? 1.05 : 1,
              y: hover ? -5 : 0
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={[
              "relative grid place-items-center rounded-2xl border-2 border-dashed",
              "w-64 h-40 bg-gradient-to-br from-slate-100 to-blue-100 dark:from-slate-700 dark:to-blue-800",
              hover ? "ring-4 ring-blue-500/30 shadow-2xl" : "shadow-lg",
            ].join(" ")}
            style={{ borderColor: hover ? "#3b82f6" : "var(--border)" }}
          >
            {/* Computer Screen Frame */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 p-1">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                {/* Screen Content */}
                <div className="text-center">
                  {hover ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-blue-600 dark:text-blue-400"
                    >
                      <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 13H5v-2h14v2z"/>
                      </svg>
                      <p className="text-xs font-medium">Drop here!</p>
                    </motion.div>
                  ) : (
                    <div className="text-slate-400 dark:text-slate-500">
                      <svg className="w-10 h-10 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
                      </svg>
                      <p className="text-xs">Monitor</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Stand */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-gradient-to-b from-slate-300 to-slate-400 dark:from-slate-500 dark:to-slate-600 rounded-b-full"></div>
          </motion.div>

          {/* Text Content on the Right - smaller */}
          <div className="text-center lg:text-left max-w-sm">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">
              Drag & Drop to Explore
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Drag and drop any project or experience card into the computer screen to see further details and case studies.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              You can also click directly on any card to open it
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}