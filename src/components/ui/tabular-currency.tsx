import * as React from "react";
import { splitIDRParts } from "@/lib/money";
import { cn } from "@/lib/utils";

export interface TabularCurrencyProps extends React.HTMLAttributes<HTMLSpanElement> {
  cents: number; // Integer cents (IDR x 100)
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  color?: "default" | "income" | "expense" | "transfer" | "muted";
  showSign?: boolean;
  showDecimals?: boolean;
}

export function TabularCurrency({
  cents,
  size = "md",
  color = "default",
  showSign = false,
  showDecimals = true,
  className,
  ...props
}: TabularCurrencyProps) {
  const parts = splitIDRParts(cents);

  const sizeClasses = {
    sm: {
      prefix: "text-[10px] mr-0.5",
      whole: "text-xs font-semibold",
      decimals: "text-[10px] ml-0.5",
    },
    md: {
      prefix: "text-xs mr-1",
      whole: "text-sm font-bold",
      decimals: "text-xs ml-0.5",
    },
    lg: {
      prefix: "text-xs md:text-sm mr-1",
      whole: "text-lg md:text-xl font-bold",
      decimals: "text-xs font-mono ml-0.5",
    },
    xl: {
      prefix: "text-sm md:text-base mr-1",
      whole: "text-2xl md:text-3xl font-extrabold tracking-tight",
      decimals: "text-xs md:text-sm font-mono ml-0.5",
    },
    "2xl": {
      prefix: "text-base md:text-lg mr-1.5",
      whole: "text-3xl md:text-5xl font-black tracking-tight",
      decimals: "text-sm md:text-base font-mono ml-1",
    },
  };

  const colorClasses = {
    default: "text-slate-100",
    income: "text-emerald-400",
    expense: "text-rose-400",
    transfer: "text-indigo-400",
    muted: "text-slate-400",
  };

  const currentSize = sizeClasses[size];
  const currentColor = colorClasses[color];

  const sign = showSign && cents > 0 ? "+" : parts.sign;

  return (
    <span
      className={cn("inline-flex items-baseline font-mono select-all", className)}
      {...props}
    >
      {sign && (
        <span className={cn(currentSize.prefix, currentColor, "font-bold")}>
          {sign}
        </span>
      )}
      <span className={cn(currentSize.prefix, "text-slate-400 font-medium")}>
        Rp
      </span>
      <span className={cn(currentSize.whole, currentColor, "tabular-nums")}>
        {parts.whole}
      </span>
      {showDecimals && (
        <span className={cn(currentSize.decimals, "text-slate-500 tabular-nums")}>
          ,{parts.decimals}
        </span>
      )}
    </span>
  );
}
