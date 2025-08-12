"use client";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/40 border-b">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="font-semibold tracking-tight">
          Manoj Tummala
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/projects" className="hover:underline">Projects</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/resume" className="hover:underline">Resume</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}