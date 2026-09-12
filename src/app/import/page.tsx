"use client";

import * as React from "react";
import { useStagingStore } from "@/store/use-staging-store";
import { WalletSelector } from "@/components/import/wallet-selector";
import { StagingTable } from "@/components/import/staging-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ingestDocumentAction } from "@/actions/ingest-document-action";
import { commitBatchAction } from "@/actions/commit-batch-action";
import {
  UploadCloud,
  FileText,
  Lock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function ImportPage() {
  const {
    batchId,
    detectedAccountName,
    transactions,
    setBatch,
    reset,
  } = useStagingStore();

  const [selectedWalletId, setSelectedWalletId] = React.useState<string>("AUTO");
  const [selectedWalletName, setSelectedWalletName] = React.useState<string>("Auto-Detect by AI");
  const [file, setFile] = React.useState<File | null>(null);
  const [password, setPassword] = React.useState<string>("01042001");
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [isCommitting, setIsCommitting] = React.useState<boolean>(false);
  const [statusMessage, setStatusMessage] = React.useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  const isExcel = file?.name.endsWith(".xlsx") || file?.name.endsWith(".xls");

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadAndProcess = async () => {
    if (!file) return;

    setIsProcessing(true);
    setStatusMessage({ type: "info", text: "Menganalisis dokumen & menjalankan deteksi contra-transfer..." });

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("selectedAccountId", selectedWalletId);
      if (isExcel && password) {
        formData.append("filePassword", password);
      }

      const result = await ingestDocumentAction(formData);

      if (result.success && result.transactions) {
        setBatch(
          result.batchId || `batch-${Date.now()}`,
          result.detectedAccountName || selectedWalletName,
          result.transactions
        );
        setStatusMessage({
          type: "success",
          text: `Berhasil mengekstrak ${result.transactions.length} mutasi dari ${file.name}.`,
        });
      } else {
        setStatusMessage({
          type: "error",
          text: result.message || "Gagal mengekstrak transaksi dari dokumen.",
        });
      }
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err?.message || "Terjadi kesalahan saat memproses dokumen.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCommit = async () => {
    setIsCommitting(true);
    setStatusMessage({ type: "info", text: "Menyimpan transaksi ke database Turso..." });

    try {
      const result = await commitBatchAction(batchId, transactions);
      if (result.success) {
        setStatusMessage({
          type: "success",
          text: `Sukses! ${result.committedCount} transaksi telah tersinkronisasi ke Turso Database.`,
        });
        reset();
        setFile(null);
      } else {
        setStatusMessage({ type: "error", text: result.message });
      }
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err?.message || "Gagal menyimpan transaksi ke database.",
      });
    } finally {
      setIsCommitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header & Back Link */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          KEMBALI KE BERANDA
        </Link>
        <div className="text-xs font-mono text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          DUAL-INPUT INGESTION ENGINE
        </div>
      </div>

      <div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
          Smart Ingestion &amp;{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">
            Contra-Transfer Pairing
          </span>
        </h1>
        <p className="text-sm text-slate-400 font-sans max-w-2xl">
          Unggah dokumen mutasi (BCA PDF, DANA PDF, blu CSV, Mandiri Excel) atau struk kasir dengan pilihan lokasi dompet sumber.
        </p>
      </div>

      {/* Status Feedback Toast */}
      {statusMessage && (
        <div
          className={`p-4 rounded-xl border text-sm flex items-center gap-3 backdrop-blur-md transition-all ${
            statusMessage.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : statusMessage.type === "error"
              ? "bg-rose-500/10 border-rose-500/30 text-rose-300"
              : "bg-indigo-500/10 border-indigo-500/30 text-indigo-300"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : statusMessage.type === "error" ? (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          ) : (
            <Sparkles className="w-5 h-5 text-indigo-400 animate-spin shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Dual-Input Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Col: Target Wallet Selector */}
        <Card className="p-6 space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-slate-200">1. Lokasi Wallet Sumber</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tentukan dompet atau gunakan Auto-Detect untuk ekstraksi otomatis.
            </p>
          </div>

          <WalletSelector
            value={selectedWalletId}
            onChange={(id, name) => {
              setSelectedWalletId(id);
              setSelectedWalletName(name);
            }}
          />

          {isExcel && (
            <div className="space-y-2 pt-2 border-t border-white/[0.08]">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Password Excel (Mandiri):</span>
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="01042001"
                className="font-mono text-xs"
              />
              <p className="text-[10px] text-slate-500">
                Password default teruji: <span className="text-slate-300 font-mono">01042001</span>
              </p>
            </div>
          )}
        </Card>

        {/* Center & Right Col: Drag and Drop Dropzone */}
        <div className="md:col-span-2">
          <Card className="p-6 h-full flex flex-col justify-between">
            <div className="space-y-1 mb-4">
              <h3 className="text-sm font-semibold text-slate-200">2. Unggah Dokumen Mutasi</h3>
              <p className="text-xs text-slate-400">
                Mendukung PDF (BCA, DANA), CSV (blu), XLSX terenkripsi (Mandiri), dan Gambar Struk (PNG/JPG).
              </p>
            </div>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              className="border-2 border-dashed border-white/15 hover:border-emerald-500/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all bg-slate-900/30 group cursor-pointer relative"
            >
              <input
                type="file"
                accept=".pdf,.csv,.xlsx,.xls,.png,.jpg,.jpeg,.webp"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />

              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>

              {file ? (
                <div className="space-y-1">
                  <div className="font-semibold text-sm text-white flex items-center justify-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span>{file.name}</span>
                  </div>
                  <div className="text-xs font-mono text-slate-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="text-sm font-medium text-slate-300">
                    Tarik berkas ke sini atau <span className="text-emerald-400 underline">pilih dari perangkat</span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    PDF, CSV, XLSX, PNG, JPG (Maks. 20MB)
                  </div>
                </div>
              )}
            </div>

            {isProcessing && (
              <div className="space-y-2 mt-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Memproses dengan Gemini Flash &amp; Preprocessor...</span>
                  <span className="text-emerald-400">Analisis Aktif</span>
                </div>
                <Progress value={65} />
              </div>
            )}

            <div className="mt-4 flex items-center justify-end">
              <Button
                onClick={handleUploadAndProcess}
                disabled={!file || isProcessing}
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
              >
                {isProcessing ? "Mengekstrak..." : "Mulai Analisis & Ekstraksi"}
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Staging Table Display */}
      {transactions.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-white/[0.08]">
          <div>
            <h2 className="text-xl font-bold text-white">Pratinjau Staging Transaksi</h2>
            <p className="text-xs text-slate-400">
              Tinjau hasil deteksi otomatis. Transfer antar-dompet dihubungkan secara otomatis dan netral terhadap beban biaya operasional.
            </p>
          </div>

          <StagingTable
            onCommit={handleCommit}
            isCommitting={isCommitting}
            availableWallets={[
              "BCA (Baim)",
              "Blu BCA (Baim)",
              "Blu BCA (Emergency Funds)",
              "Blu BCA (Piya)",
              "Blu BCA (Uang Belanja)",
              "Blu BCA (Safety Baim)",
              "Blu BCA (Wedding Gift)",
              "Blu (Monthly Pocket)",
              "Blu (Rehan)",
              "Dana (Baim)",
              "Dana (Piya)",
              "Mandiri (Baim)",
              "Crypto",
              "Saham",
              "Silver",
              "Reksadana Sailendra",
            ]}
          />
        </div>
      )}
    </div>
  );
}
