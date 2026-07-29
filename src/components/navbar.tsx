"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PAGES = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-3 z-40">
      <div className="container">
        <nav className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="justify-self-start rounded-full px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm bg-white/60 border border-slate-200/30 shadow-sm">
            <Link href="/" className="font-semibold tracking-tight text-base sm:text-lg text-slate-800">
              Manoj Tummala
            </Link>
          </div>

          <div
            className="justify-self-center rounded-full border px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm 
                       bg-white/60 border-slate-200/30 shadow-sm"
          >
            <ul className="flex items-center gap-1 sm:gap-2 text-base">
              {PAGES.map(p => {
                const isActive = pathname === p.href || (p.href !== "/" && pathname.startsWith(p.href));
                return (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      className={`rounded-full px-3 py-1 transition-colors ${
                        isActive
                          ? "bg-slate-100 text-slate-900"
                          : "hover:bg-slate-100/60 text-slate-700"
                      }`}
                    >
                      {p.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
