import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Manoj Tummala",
  description: "Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
  <body className="bg-transparent text-foreground antialiased">
        {/* Background layers (don't block clicks) */}
        {/* Dark theme aurora */}
        <div className="pointer-events-none fixed inset-0 -z-50 hidden dark:block">
          <div
            className="absolute inset-0 [background:
              radial-gradient(900px_600px_at_10%_0%,hsl(258_93%_60%/.35),transparent_60%),
              radial-gradient(1000px_700px_at_92%_0%,hsl(199_89%_55%/.32),transparent_60%),
              radial-gradient(900px_650px_at_50%_105%,hsl(151_83%_45%/.24),transparent_60%)
            ]"
          />
          {/* grid */}
          <div className="absolute inset-0 opacity-30 [background:
            linear-gradient(transparent_95%,rgba(255,255,255,.06) 95%),
            linear-gradient(90deg,transparent_95%,rgba(255,255,255,.06) 95%)
          ] bg-[length:24px_24px]" />
        </div>

        {/* Light theme aurora (pastel) */}
        <div className="pointer-events-none fixed inset-0 -z-50 block dark:hidden">
          <div
            className="absolute inset-0 [background:
              radial-gradient(900px_620px_at_8%_0%,hsl(262_83%_65%/.28),transparent_60%),
              radial-gradient(1000px_700px_at_95%_0%,hsl(201_96%_58%/.25),transparent_60%),
              radial-gradient(900px_650px_at_50%_105%,hsl(157_72%_42%/.18),transparent_60%)
            ]"
          />
          <div className="absolute inset-0 opacity-20 [background:
            linear-gradient(transparent_95%,rgba(0,0,0,.06) 95%),
            linear-gradient(90deg,transparent_95%,rgba(0,0,0,.06) 95%)
          ] bg-[length:24px_24px]" />
        </div>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="w-full">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}