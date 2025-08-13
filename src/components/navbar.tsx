"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle }  from "./theme-toggle";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

function hrefFor(id: string, pathname: string) {
  return pathname === "/" ? `#${id}` : `/#${id}`;
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-3 z-40">
      <div className="container">
        <nav className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          {/* Left: name */}
          <div className="justify-self-start rounded-full px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm bg-white/60 dark:bg-slate-800/60 border border-slate-200/30 dark:border-slate-700/30 shadow-sm">
            <Link href="/" className="font-semibold tracking-tight text-base sm:text-lg text-slate-800 dark:text-slate-100">
              Manoj Tummala
            </Link>
          </div>

          {/* Center: island */}
          <div
            className="justify-self-center rounded-full border px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm 
                       bg-white/60 dark:bg-slate-800/60 border-slate-200/30 dark:border-slate-700/30 shadow-sm"
          >
            <ul className="flex items-center gap-1 sm:gap-2 text-base">
              {SECTIONS.map(s => (
                <li key={s.id}>
                  <Link
                    href={hrefFor(s.id, pathname)}
                    className="rounded-full px-3 py-1 hover:bg-slate-100/60 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: theme toggle */}
          <div className="justify-self-end">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}