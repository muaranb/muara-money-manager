import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/500.css";
import "@fontsource/geist-sans/600.css";
import "@fontsource/geist-sans/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "@fontsource/jetbrains-mono/700.css";

import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";
import { BottomNav } from "@/components/layout/bottom-nav";

export const metadata: Metadata = {
  title: "Muara Money Manager | Executive Financial Intelligence",
  description: "AI-Powered Personal Financial Tracker & Banking Cash Flow Intelligence Monolith",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark scroll-smooth">
      <body className="bg-[#030712] text-slate-100 antialiased selection:bg-emerald-500/20 selection:text-emerald-300 min-h-screen flex">
        {/* Background Visual Effects */}
        <div className="fixed inset-0 bg-artisan-noise pointer-events-none z-50" />
        <div className="fixed inset-0 bg-radial-mesh pointer-events-none z-0" />

        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="relative z-10 flex flex-col flex-1 min-w-0 min-h-screen">
          <TopBar />
          <main className="flex-1 pb-20 md:pb-8">
            {children}
          </main>
          {/* Mobile Bottom Navigation */}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
