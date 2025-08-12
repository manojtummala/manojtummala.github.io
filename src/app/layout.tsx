import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Manoj Tummala — Portfolio",
  description: "Full-Stack & ML/DS portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {/* remove the max-w clamp here */}
          <main className="w-full">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}