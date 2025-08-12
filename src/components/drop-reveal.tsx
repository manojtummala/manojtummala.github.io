// src/components/drop-reveal.tsx
"use client";
import { useState } from "react";
import { Inbox } from "lucide-react";
import { motion } from "framer-motion";

export default function DropReveal({ onOpen }: { onOpen: (slug: string)=>void }) {
  const [hover, setHover] = useState(false);

  return (
    <section className="py-16">
      <div className="container">
        <motion.div
          onDragOver={(e)=>{ e.preventDefault(); setHover(true); }}
          onDragLeave={()=>setHover(false)}
          onDrop={(e)=>{
            e.preventDefault();
            setHover(false);
            const slug = e.dataTransfer.getData("slug") || e.dataTransfer.getData("text/plain");
            if (slug) onOpen(slug);
          }}
          animate={{ scale: hover ? 1.02 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={[
            "mx-auto grid max-w-2xl place-items-center rounded-2xl border-2 border-dashed",
            "min-h-[160px] p-10 text-center bg-black/5 dark:bg-white/5",
            hover ? "ring-2 ring-blue-500/50" : "",
          ].join(" ")}
          style={{ borderColor: "var(--border)" }}
        >
          <Inbox className="h-6 w-6 opacity-70" />
          <p className="mt-2 text-sm text-muted-foreground">
            Drop a project or experience card here to read the full case study
          </p>
          <p className="text-xs text-muted-foreground">You can also click a card</p>
        </motion.div>
      </div>
    </section>
  );
}