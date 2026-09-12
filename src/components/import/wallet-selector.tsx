"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Building2, Smartphone, Landmark } from "lucide-react";

export interface AccountOption {
  id: string;
  name: string;
  type: string;
  accountNumber?: string | null;
}

export interface WalletSelectorProps {
  value: string;
  onChange: (accountId: string, accountName: string) => void;
  accounts?: AccountOption[];
  className?: string;
}

export function WalletSelector({
  value,
  onChange,
  accounts = [],
  className,
}: WalletSelectorProps) {
  const bankAccounts = accounts.filter((a) => a.type === "BANK");
  const ewalletAccounts = accounts.filter((a) => a.type === "E_WALLET");
  const investmentAccounts = accounts.filter((a) => a.type === "INVESTMENT");

  const handleValueChange = (val: string) => {
    if (val === "AUTO") {
      onChange("AUTO", "Auto-Detect by AI");
    } else {
      const acc = accounts.find((a) => a.id === val);
      onChange(val, acc ? acc.name : "Unknown Wallet");
    }
  };

  return (
    <div className={className}>
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full h-11 bg-slate-900/80 border border-white/10 rounded-xl text-slate-100 font-sans focus:ring-emerald-400/50">
          <div className="flex items-center gap-2">
            {value === "AUTO" ? (
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
            )}
            <SelectValue placeholder="Pilih Lokasi Wallet Sumber..." />
          </div>
        </SelectTrigger>
        <SelectContent className="max-h-80">
          <SelectItem value="AUTO" className="text-emerald-400 font-medium">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>🤖 Auto-Detect by AI (Deteksi Otomatis)</span>
            </div>
          </SelectItem>

          {bankAccounts.length > 0 && (
            <SelectGroup>
              <SelectLabel className="flex items-center gap-1.5 text-slate-400">
                <Landmark className="w-3.5 h-3.5 text-slate-500" />
                <span>Rekening Bank</span>
              </SelectLabel>
              {bankAccounts.map((acc) => (
                <SelectItem key={acc.id} value={acc.id}>
                  {acc.name} {acc.accountNumber ? `(• ${acc.accountNumber.slice(-4)})` : ""}
                </SelectItem>
              ))}
            </SelectGroup>
          )}

          {ewalletAccounts.length > 0 && (
            <SelectGroup>
              <SelectLabel className="flex items-center gap-1.5 text-slate-400">
                <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                <span>E-Wallet</span>
              </SelectLabel>
              {ewalletAccounts.map((acc) => (
                <SelectItem key={acc.id} value={acc.id}>
                  {acc.name}
                </SelectItem>
              ))}
            </SelectGroup>
          )}

          {investmentAccounts.length > 0 && (
            <SelectGroup>
              <SelectLabel className="flex items-center gap-1.5 text-slate-400">
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Investasi &amp; Aset</span>
              </SelectLabel>
              {investmentAccounts.map((acc) => (
                <SelectItem key={acc.id} value={acc.id}>
                  {acc.name}
                </SelectItem>
              ))}
            </SelectGroup>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
