"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by rendering the icon only after mount
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-xl px-3 py-2 text-sm hover:bg-muted transition backdrop-blur"
    >
      {mounted ? (
        isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />
      ) : (
        // placeholder to keep layout stable on server render
        <span className="inline-block h-4 w-4" />
      )}
    </button>
  );
}