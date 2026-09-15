"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { usePrivacyStore } from "@/store/use-privacy-store";
import { cn } from "@/lib/utils";

export interface PrivacyToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md";
}

export function PrivacyToggle({
  size = "sm",
  className,
  ...props
}: PrivacyToggleProps) {
  const isBalanceHidden = usePrivacyStore((s) => s.isBalanceHidden);
  const toggleBalanceVisibility = usePrivacyStore((s) => s.toggleBalanceVisibility);

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
  };

  const label = isBalanceHidden ? "Tampilkan nominal" : "Sembunyikan nominal";

  return (
    <button
      type="button"
      onClick={toggleBalanceVisibility}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-emerald-400/70 hover:text-emerald-300 hover:bg-emerald-500/15 active:scale-95 transition-all duration-150 p-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400",
        className
      )}
      {...props}
    >
      {isBalanceHidden ? (
        <EyeOff className={iconSizes[size]} />
      ) : (
        <Eye className={iconSizes[size]} />
      )}
      <span className="sr-only">{label}</span>
    </button>
  );
}
