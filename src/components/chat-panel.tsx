"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

type Message = {
  role: "user" | "bot";
  text: string;
};

const SUGGESTIONS = [
  "What projects have you worked on?",
  "Tell me about your Spark experience",
  "What's your background in AI/ML?",
  "Describe your infrastructure work",
];

const MOCK: Record<string, string> = {
  "projects":
    "I've worked on several projects — a multi-agent algorithmic trading platform, an on-device OS assistant with local RAG, a self-improving RAG pipeline, and ReviewsVerse, a topic-tagged reviews platform handling 1,000+ concurrent users.",
  "spark":
    "I've built production ETL pipelines using Apache Spark for stream and batch processing, integrated with Delta Lake, Airflow, and Snowflake for warehousing and orchestration.",
  "ai":
    "My AI/ML work includes RAG pipelines with LLM-as-judge evaluation, multi-agent architectures for knowledge workflows, and on-device models using MLX and Phi-3 Mini.",
  "infrastructure":
    "I've designed fault-tolerant systems with Docker, Kubernetes, CI/CD, OpenTelemetry tracing, circuit breakers, and SLO-driven incident response.",
};

function respond(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, reply] of Object.entries(MOCK)) {
    if (lower.includes(key)) return reply;
  }
  return "I can tell you about my projects, Spark/Airflow pipelines, AI/ML work, or infrastructure experience. What would you like to know?";
}

export default function ChatPanel() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  function send(text: string) {
    if (!text.trim() || busy) return;
    const userMsg: Message = { role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setBusy(true);
    setTimeout(() => {
      const botMsg: Message = { role: "bot", text: respond(text.trim()) };
      setMessages((prev) => [...prev, botMsg]);
      setBusy(false);
    }, 600);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition hover:bg-slate-800 hover:shadow-xl"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 flex w-80 flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl sm:w-96"
            style={{ maxHeight: "min(560px, calc(100vh - 160px))" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <span className="text-sm font-semibold text-slate-900">Ask me anything</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                mock
              </span>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed text-slate-500">
                    Hi! Ask me about my experience, projects, or skills. Or pick a suggestion below.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-800"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-slate-900 text-white"
                        : "border border-slate-200 bg-slate-50 text-slate-700"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {busy && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-400">
                    <span className="inline-flex gap-0.5">
                      <span className="animate-pulse">·</span>
                      <span className="animate-pulse animation-delay-200">·</span>
                      <span className="animate-pulse animation-delay-400">·</span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-slate-100 px-4 py-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 focus-within:border-slate-400">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Type a message..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || busy}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white transition hover:bg-slate-800 disabled:opacity-30"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
