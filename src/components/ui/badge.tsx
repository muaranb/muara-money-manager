import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "income" | "expense" | "transfer" | "outline" | "warning";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold font-mono tracking-tight transition-colors";

  const variants = {
    default: "bg-slate-800 text-slate-300 border border-white/10",
    income: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm shadow-emerald-500/10",
    expense: "bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-sm shadow-rose-500/10",
    transfer: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-sm shadow-indigo-500/10",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm shadow-amber-500/10",
    outline: "text-slate-400 border border-white/10",
  };

  return <div className={cn(base, variants[variant], className)} {...props} />;
}
