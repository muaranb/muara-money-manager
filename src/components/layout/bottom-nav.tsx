"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Receipt,
  UploadCloud,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Beranda", icon: LayoutDashboard },
    { href: "/monthly", label: "Bulanan", icon: BarChart3 },
    { href: "/transactions", label: "Transaksi", icon: Receipt },
    { href: "/import", label: "Ingestion", icon: UploadCloud },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-2xl border-t border-white/10 pb-safe">
      <div className="grid grid-cols-4 h-14 items-center px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-1 rounded-xl transition-all relative",
                isActive ? "text-emerald-400 font-semibold" : "text-slate-400 hover:text-slate-200"
              )}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
              {isActive && (
                <span className="absolute -top-1 w-1 h-1 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
