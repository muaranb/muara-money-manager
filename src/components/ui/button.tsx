import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary" | "subtle";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.985]";

    const variants = {
      default:
        "bg-emerald-500 text-slate-950 font-semibold shadow-lg shadow-emerald-500/20 hover:bg-emerald-400",
      secondary:
        "bg-slate-800 text-slate-100 hover:bg-slate-700 border border-white/10",
      outline:
        "border border-white/10 bg-slate-900/40 text-slate-200 hover:bg-slate-800/80 hover:border-white/20",
      ghost: "text-slate-300 hover:bg-white/5 hover:text-white",
      destructive:
        "bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30",
      subtle:
        "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-8 rounded-lg px-3 text-xs",
      lg: "h-12 rounded-2xl px-6 text-base",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
