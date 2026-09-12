"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  LayoutDashboard,
  BarChart3,
  UploadCloud,
  Wallet2,
  Receipt,
  Search,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-slate-400 hover:text-slate-200 hover:border-white/20 transition-all font-mono"
      >
        <Search className="w-3.5 h-3.5 text-slate-400" />
        <span>Cari atau navigasi...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] text-slate-400">
          ⌘K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 max-w-xl overflow-hidden border-white/15 bg-slate-950/95 backdrop-blur-2xl">
          <Command className="rounded-2xl border-none">
            <div className="flex items-center border-b border-white/[0.08] px-4">
              <Search className="mr-2 h-4 w-4 shrink-0 text-slate-400" />
              <Command.Input
                placeholder="Ketik tujuan, halaman, atau mutasi..."
                className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500 font-sans"
              />
            </div>
            <Command.List className="max-h-80 overflow-y-auto p-2">
              <Command.Empty className="py-6 text-center text-xs text-slate-500">
                Tidak ada hasil yang cocok.
              </Command.Empty>

              <Command.Group heading="Halaman Navigasi" className="text-[10px] font-mono text-slate-500 px-2 py-1">
                <Command.Item
                  onSelect={() => runCommand(() => router.push("/"))}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/10 hover:text-white cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                  <span>Beranda Dashboard</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => router.push("/monthly"))}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/10 hover:text-white cursor-pointer"
                >
                  <BarChart3 className="w-4 h-4 text-indigo-400" />
                  <span>Analisis Bulanan Multi-Dimensi</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => router.push("/import"))}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/10 hover:text-white cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4 text-amber-400" />
                  <span>Smart Ingestion &amp; Upload Dokumen</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => router.push("/accounts"))}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/10 hover:text-white cursor-pointer"
                >
                  <Wallet2 className="w-4 h-4 text-teal-400" />
                  <span>Portofolio 16 Rekening &amp; Dompet</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => router.push("/transactions"))}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/10 hover:text-white cursor-pointer"
                >
                  <Receipt className="w-4 h-4 text-rose-400" />
                  <span>Buku Besar Transaksi</span>
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
