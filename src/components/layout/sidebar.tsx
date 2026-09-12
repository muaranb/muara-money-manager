"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  UploadCloud,
  Wallet2,
  Receipt,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState<boolean>(false);

  const navItems = [
    { href: "/", label: "Beranda", icon: LayoutDashboard },
    { href: "/monthly", label: "Analisis Bulanan", icon: BarChart3 },
    { href: "/import", label: "Smart Ingestion", icon: UploadCloud },
    { href: "/accounts", label: "Rekening & Dompet", icon: Wallet2 },
    { href: "/transactions", label: "Daftar Transaksi", icon: Receipt },
  ];

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col justify-between h-screen sticky top-0 bg-[#030712]/90 backdrop-blur-2xl border-r border-white/[0.08] transition-all duration-300 z-40",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Monogram Header */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/[0.08]">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-black text-slate-950 text-xl tracking-tighter shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
              M
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-sm text-white tracking-tight leading-none">
                  MUARA
                </span>
                <span className="text-[10px] font-mono text-emerald-400 tracking-wider mt-1">
                  FINANCIAL OS
                </span>
              </div>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5">
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
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative",
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-500/10 font-semibold"
                    : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]"
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 shrink-0 transition-transform group-hover:scale-110",
                    isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-slate-200"
                  )}
                />
                {!collapsed && <span>{item.label}</span>}
                {isActive && (
                  <span className="absolute right-2 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Security Badge */}
      <div className="p-3 border-t border-white/[0.08]">
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900/60 border border-white/5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          {!collapsed && (
            <div className="text-[10px] font-mono text-slate-400 leading-tight">
              <span>TURSO EDGE</span> • <span className="text-emerald-400">INTEGER SEN</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
