# ARCHITECTURAL PLANNING & IMPLEMENTATION SPECIFICATION (REVISED - V4.1)
## Project: Next.js Serverless Monolith Financial Tracker (AI-Powered Banking & Legacy Ingestion with Dynamic Wallet Context)
**Target Execution Agent:** Antigravity CLI Coding Agent  
**AI Model:** Gemini Flash 3.8 (High) / Dynamic (`process.env.GEMINI_MODEL || 'gemini-2.5-flash'`)  
**Target Architecture:** Next.js 16+ App Router (Full-Stack Serverless Monolith) + React 19 + Tailwind CSS v4 + Shadcn UI (Radix Primitives) + Turso (libSQL Edge) with Integer-Cents Precision + Google Gemini Official SDK (`@google/genai` v2+) + Vercel Serverless  
**Supported Ingestion Sources (Empirically Calibrated):** 
1. `data-example/BCA_AUG_2026.pdf` (Tahapan Xpresi / BCA e-Statement PDF - No. Rekening `0501191549`)
2. `data-example/Dana.pdf` (DANA Riwayat Aktivitas E-Wallet PDF - No HP `081392366770`, 2 Halaman)
3. `data-example/blubca_Agustus2026.csv` (blu by BCA Digital CSV Statement - bluAccount `000777929188`)
4. `data-example/Mandiri-Agu-2026.xlsx` (Livin' by Mandiri E-Statement Excel - No. Rekening `1400019175927`, Password Terverifikasi: `"01042001"`)
5. `data-example/Money Manager - Excel.xlsx` (Legacy Master Backup Migration - 455 Historical Transactions, Excel Serial Dates)
6. Real-time Screenshot Transaksi (QRIS, Mobile Banking Receipts, Struk Belanja Kasir)
**Core Input Mode:** **Dual-Input Pipeline** = Multi-Format File/Image Upload + **Target Wallet Location Selector** (Pilihan Lokasi Wallet/Akun Sumber)  
**Status:** READY FOR EXECUTION (V4.1 - DATA-CALIBRATED 2026 PRODUCTION STACK)

---

## 1. Executive Summary & Core Objectives

### 1.1 Project Overview
Membangun sistem pelacak keuangan personal (*Personal Finance Tracker*) monolitik serverless berskala tinggi (*highly scalable*) yang di-deploy ke Vercel Serverless Functions dan Turso Database (libSQL Edge). 

Pembaruan arsitektur pada versi **V4.1** ini menggabungkan seluruh fondasi teknologi terkini standar *Senior Professional Programmer* dengan kalibrasi empiris langsung dari 5 berkas data aktual di `data-example/`:
- **Next.js 16 (App Router)** & **React 19**: Memaksimalkan React Server Actions, asynchronous request APIs (`params`, `searchParams`), dan performa Turbopack bawaan.
- **Tailwind CSS v4 & Shadcn UI (Radix UI)**: Mengadopsi arsitektur styling CSS-first berbasis `@tailwindcss/postcss` dan komponen UI aksesibel berstandar industri.
- **Deterministic Financial Precision (Integer-Cents Arithmetic)**: Seluruh perhitungan moneter di database Turso disimpan dalam satuan bilangan bulat sen/sub-unit (x100) guna mengeliminasi *floating-point rounding error* (IEEE 754 drift) pada agregasi saldo lintas 16 rekening.
- **Empirical In-Memory Banking Decryption**: Berkas Excel Mandiri terenkripsi sandi didekripsi secara *in-memory* di Server Action menggunakan `msoffice-crypto` + `exceljs` dengan kata sandi teruji `"01042001"`, serta menormalkan struktur baris ganda (Tanggal & Jam WIB pada baris terpisah).
- **Hybrid Deduplication Engine for DANA Statements**: Mengatasi pola visual berkas DANA yang mencetak 2 baris untuk setiap transaksi (baris item merchant dan baris `Saldo DANA` dengan nominal total pada menit yang sama) melalui kombinasi instruksi system prompt dan filter deterministik di Server Action.
- **Legacy Excel Serial Date Engine**: Mengonversi format tanggal serial Excel (contoh: `46267.50351798611`) pada berkas `Money Manager - Excel.xlsx` secara matematis menjadi timestamp waktu nyata berstandar ISO, serta memetakan transaksi `Modified Bal.` ke kategori audit `⚙️ Penyesuaian Saldo`.
- **Official Google Gen AI SDK (`@google/genai` v2+)**: Integrasi langsung dengan *native responseJsonSchema*, penanganan kuota HTTP 429 *exponential backoff*, dan pemotongan dokumen multi-halaman (*auto-chunking*).
- **Interactive Staging with Zustand v5**: Manipulasi data mutasi sebelum ditulis permanen dikelola oleh Zustand v5 di sisi client (inline edit, seleksi multi-baris, *bulk wallet reassignment*, dan deteksi transaksi duplikat *real-time*).
- **Full Automated Testing Suite**: Pengujian unit/integrasi menggunakan Vitest 4 + React Testing Library (TDD) dan pengujian alur end-to-end menggunakan Playwright.

### 1.2 Urgensi Input Lokasi Wallet (Why Wallet Location Input is Critical)
1. **Ambiguitas Struk Fisik & Screenshot QRIS:** Struk belanja kasir (Indomaret, SPBU, resto) atau screenshot konfirmasi QRIS merchant seringkali **tidak memuat nama bank/e-wallet** sumber pembayaran (hanya nominal dan nama toko). Dengan adanya input "Lokasi Wallet", sistem dan AI mengetahui secara pasti akun mana yang saldonya berkurang.
2. **Diferensiasi Akun Bank yang Sama:** Pengguna memiliki beberapa rekening/kantong dalam satu institusi (contoh: *Blu BCA (Baim)*, *Blu BCA (Emergency Funds)*, *Blu BCA (Uang Belanja)*, *Blu BCA (Piya)*, *Blu (Monthly Pocket)*). Input lokasi wallet mencegah salah routing antar sub-rekening.
3. **Fleksibilitas Hibrida:** Jika pengguna mengunggah dokumen mutasi resmi yang sudah jelas identitasnya (seperti `BCA_AUG_2026.pdf` atau `Dana.pdf`), pengguna cukup memilih opsi *"🤖 Auto-Detect by AI"* dan Gemini Flash akan membaca header rekening secara otomatis.

### 1.3 Core Architectural Principles
1. **Zero Cold-Boot & Zero Downtime (Never Sleeps):** Menggunakan Vercel Serverless Functions dan Turso Database di Edge. Bebas penonaktifan otomatis (*no idle pause/suspend*) meski tidak diakses berbulan-bulan.
2. **Mathematical Precision (Integer-Cents Standard):** Nilai saldo dan mutasi disimpan sebagai `INTEGER` (nilai rupiah x 100). Contoh: Rp 10.000,00 disimpan sebagai `1000000`, bunga bank Rp 93,65 disimpan sebagai `9365`. Nilai konversi hanya dilakukan saat presentasi UI (`toCents()` dan `fromCents()`).
3. **Unified AI-Powered Ingestion with Wallet Context:** Seluruh format file (PDF, CSV, XLSX terdekripsi, PNG/JPG) dilewatkan melalui `@google/genai` dengan parameter konteks dompet (`walletContext`) yang disuntikkan langsung ke *system prompt* dengan penegakan skema JSON mutlak.
4. **Secure In-Memory Decryption for Banking Spreadsheets:** Berkas Mandiri `EncryptedPackage` didekripsi di memori Server Action menggunakan `msoffice-crypto` dan diparsing via `exceljs` tanpa menulis berkas terdekripsi ke disk.
5. **Empirical Banking Robustness:** Pipeline preprocessor mampu menormalkan format angka Indonesia (`.` ribuan, `,` desimal), menggabungkan baris ganda waktu (Mandiri), dan mengeliminasi rincian ganda (DANA).
6. **Legacy Backup Migration Compatibility:** Sistem memiliki modul migrasi bawaan yang secara khusus memetakan 455 baris transaksi historis dari `Money Manager - Excel.xlsx`, menginisialisasi 16 rekening/dompet, serta menyelaraskan taksonomi kategori dan subkategori hierarkis lengkap dengan emoji.
7. **Interactive Staging & Deduplication:** Hasil ekstraksi AI disajikan di tabel *staging* interaktif berbasis Zustand v5 dengan *inline wallet selector* per baris dan fitur *batch reassign wallet* sebelum ditulis secara atomik ke database Turso.

---

## 2. Bank & Document Ingestion Profiles (With Wallet Association & Empirical Findings)

Berdasarkan analisis forensik langsung terhadap berkas di `data-example/`:

### 2.1 BCA E-Statement (PDF) — `data-example/BCA_AUG_2026.pdf`
* **Default Wallet Location:** `BCA (Baim)` (No. Rekening `0501191549`, Rekening Tahapan Xpresi, KCU Mojokerto, Nasabah: Bima Aurasakti Rochmatullah).
* **Karakteristik Dokumen:** Periode `AGUSTUS 2026`. Tabel mutasi memuat kolom `TANGGAL` (format `DD/MM`), `KETERANGAN`, `CBG`, `MUTASI`, `SALDO`.
* **Temuan Empiris Data (9 Transaksi):**
  * Saldo Awal: `6,155,000.57` (diabaikan dari transaksi).
  * 4 Mutasi Kredit (`CR`): Total `41,800,593.65`.
  * 5 Mutasi Debit (`DB`): Total `30,771,500.00`.
  * Saldo Akhir: `17,184,094.22`.
* **Aturan Parsing Gemini Flash:**
  * Penanda `DB` = `EXPENSE`.
  * Tanpa `DB` atau bertanda `CR` = `INCOME`.
  * Tahun wajib diambil dari header dokumen (`2026`) karena baris hanya memuat `DD/MM`.
  * Bunga bank (`31/08 BUNGA 93.65`) = `INCOME` kategori `🎊 Pemasukan Tidak Rutin > 💱 Bunga` (disimpan sebagai `9365` sen).
  * Biaya administrasi (`01/08 BIAYA ADM 0998 10,000.00 DB`) = `EXPENSE` kategori `💵 Keuangan & Investasi > 🎫 Biaya Admin` (disimpan sebagai `1000000` sen).
  * Mutasi internal DANA (`TRSF E-BANKING DB ... 72345/DANA - - 081261531480`) diklasifikasikan sebagai `TRANSFER` ke dompet `Dana (Baim)` atau `Dana (Piya)`.

### 2.2 DANA Statement (PDF) — `data-example/Dana.pdf`
* **Default Wallet Location:** `Dana (Baim)` (No HP `081392366770`, Nasabah: Bima Aurasakti Rochmatullah).
* **Karakteristik Dokumen:** `Riwayat Aktivitas Agustus 2026`, terdiri dari 2 Halaman. Format waktu: `DD Agu 2026 HH:mm` (contoh: `31 Agu 2026 21:29`).
* **Temuan Empiris Pola Tabel DANA (Dual-Line Rendering & Split Breakdown):**
  * Pada berkas PDF DANA, transaksi belanja/transfer seringkali tercetak dalam 2 baris tabel:
    1. Baris item transaksi: `Nama Merchant` atau `Sendmoney` (tanpa metode bayar).
    2. Baris pembayaran: `Nama Merchant` dengan metode `Saldo DANA` memuat nominal total yang dipotong.
    *Contoh Nyata Baris 4 & 5:*
    `27 Agu 2026 22:15 | Sendmoney | | -Rp21.000`
    `27 Agu 2026 22:15 | Sendmoney | Saldo DANA | -Rp21.000`
  * Rincian biaya admin (*Fee Breakdown*):
    `13 Agu 2026 22:33 | Merchants | | -Rp600` (Fee)
    `13 Agu 2026 22:33 | Merchants | | -Rp50.000` (Harga Pokok)
    `13 Agu 2026 22:33 | Merchants | Saldo DANA | -Rp50.600` (Total Terpotong)
* **Aturan Deduplikasi Hybrid (Hybrid Deduplication):**
  1. **Prompt Level:** Gemini diinstruksikan hanya mengekstrak 1 transaksi konsolidasian per kejadian pembayaran (mengambil nominal baris `Saldo DANA` sebagai nilai tunggal, bukan menjumlahkan baris rincian dan baris total).
  2. **Server Action Level:** Filter deterministik memeriksa pasangan transaksi pada menit yang sama: jika terdapat transaksi item dan transaksi `Saldo DANA` bernilai identik, buang item duplikat sebelum disajikan di tabel staging.
  3. Nilai `-Rp...` = `EXPENSE`. `Topup` = `INCOME` (atau transfer masuk dari rekening lain).

### 2.3 blu by BCA Digital (CSV) — `data-example/blubca_Agustus2026.csv`
* **Default Wallet Location:** `Blu BCA (Baim)` (bluAccount - `000777929188`, Nasabah: Bima Aurasakti Rochmatullah).
* **Karakteristik Dokumen:** 
  * 4 baris header metadata (`Rekening / Account`, `Nama / Name`, `Mata Uang / Currency`, baris kosong).
  * Tabel data: `Tanggal / Date`, `Keterangan / Remarks`, `Nominal / Amount`, `Tipe / Type`, `Sisa Saldo / Remaining Balance`.
  * Format tanggal: `DD/MM/YYYY` (contoh: `02/08/2026`).
  * 5 baris rekapitulasi footer (`Saldo Awal: 162763.81`, `Total Pemasukan: 131836.15`, `Total Pengeluaran: 137988.03`, `Saldo Akhir: 156611.93`).
* **Temuan Empiris Data (9 Transaksi):**
  * Nilai negatif = `EXPENSE` (contoh: `-38500`), nilai positif = `INCOME` (contoh: `32771`).
  * Nilai desimal: `Bunga 65.15` (`6515` sen), `Pajak Bunga -13.03` (`1303` sen).
  * Korelasi transfer DANA: `Dana Masuk dari BIMA AURASAKTI ROCHMATULLAH Rp 32.771` pada 05/08/2026 berpasangan persis dengan `Sendmoney -Rp32.771` pada `Dana.pdf`!

### 2.4 Livin' by Mandiri (Excel) — `data-example/Mandiri-Agu-2026.xlsx`
* **Default Wallet Location:** `Mandiri (Baim)` (No. Rekening `1400019175927`, KCP Surabaya Mulyosari, Nasabah: Bima Aurasakti Rochmatullah).
* **Karakteristik Dokumen:** Berkas Excel terenkripsi pengaman perbankan (*EncryptedPackage* OLE2 standard Agile/Standard Encryption).
* **Temuan Empiris & Password Terverifikasi:**
  * **Password Terverifikasi Berhasil:** `"01042001"` (tanggal lahir `01-04-2001`).
  * Nama Sheet: `e-Statement`.
  * Saldo Awal: `282.277,18` (`28227718` sen), Saldo Akhir: `87.000,18` (`8700018` sen).
  * Format Angka Indonesia: Ribuan menggunakan titik `.`, desimal menggunakan koma `,` (`178.277,00`).
* **Struktur Baris Ganda (Multi-Row Date & Time Layout):**
  * Setiap transaksi perbankan Mandiri terbagi ke dalam **2 baris berurutan**:
    * Baris 1: No urut (`1.0`), Tanggal (`04 Aug 2026`), Keterangan (`Biaya administrasi kartu debit`), Dana Keluar (`4.000,00`), Saldo (`278.277,18`).
    * Baris 2: Waktu transaksi (`06:41:51 WIB`).
* **Penanganan Teknis (In-Memory Decryption & Preprocessing Pipeline):**
  1. Server Action menerima buffer dan password (default: `"01042001"`).
  2. Pustaka `msoffice-crypto` membuka OLE container dan mendekripsi stream berkas menjadi buffer XLSX murni di memori.
  3. Modul `excel-decryptor.ts` / `file-preprocessor.ts` membaca lembar kerja `e-Statement` dan secara otomatis:
     - Menggabungkan Tanggal Baris 1 dan Waktu Baris 2 menjadi satu nilai datetime lengkap (`2026-08-04 06:41:51`).
     - Mengonversi format angka Indonesia (`178.277,00` -> `178277` IDR atau `17827700` sen).
     - Menghasilkan representasi tabular bersih yang diinjeksikan ke Gemini Flash bersama konteks dompet `Mandiri (Baim)`.

### 2.5 Master Backup Migration ("data-example/Money Manager - Excel.xlsx")
* **Karakteristik Dokumen:** Master migrasi 455 baris riwayat keuangan historis lintas 16 rekening/dompet.
* **Kolom:** `Date`, `Account`, `Category`, `Subcategory`, `Note`, `IDR`, `Income/Expense`, `Description`, `Amount`, `Currency`, `Account`.
* **Temuan Empiris Kritis:**
  1. **Format Tanggal Serial Excel (Excel Serial Date Numbers):**
     Nilai pada kolom `Date` disimpan dalam format floating-point serial Excel (contoh: `46267.50351798611`).
     - Bagian integer (`46267`) = jumlah hari sejak 30 Desember 1899 (menghasilkan tanggal `2026-09-02`).
     - Bagian pecahan (`0.50351798611`) = fraksi 24 jam (menghasilkan waktu `12:05:03`).
     - Formula konversi JavaScript: `new Date((serial - 25569) * 86400 * 1000).toISOString()`.
  2. **Kategori Penyesuaian Saldo `Modified Bal.`:**
     Terdapat transaksi historis dengan kategori `Modified Bal.` yang mewakili sinkronisasi/penyesuaian saldo manual. Transaksi ini disimpan di bawah kategori sistem `⚙️ Penyesuaian Saldo` (dengan tipe `INCOME` jika nilai positif atau `EXPENSE` jika nilai negatif) agar audit trail dan saldo berjalan 16 rekening terhitung akurat 100%.
  3. **Aturan Transfer-Out:**
     Terdapat 79 baris `Transfer-Out`. Kolom `Category` berfungsi sebagai **Target Account / Lokasi Wallet Tujuan** (contoh: Wallet Asal `BCA (Baim)` mentransfer ke Wallet Tujuan `Blu BCA (Emergency Funds)`).

### 2.6 Screenshot Transaksi & Struk Kasir (Multi-Format Images)
* **Karakteristik Dokumen:** Foto/Screenshot bukti transfer, QRIS, receipt minimarket, atau struk SPBU.
* **Peran Kunci Input Lokasi Wallet:** Karena struk kasir tidak memuat identitas rekening pengirim, **pilihan lokasi wallet yang dipilih user pada antarmuka saat upload menjadi sumber kebenaran utama (*source of truth*)**.

---

## 3. Dual-Input System Architecture & Ingestion Flow

```
                                  [ USER INTERFACE ]
                                (Next.js 16 + React 19)
                                           │
             ┌─────────────────────────────┴─────────────────────────────┐
             ▼                                                           ▼
     [ INPUT 1: DOKUMEN / FILE ]                                 [ INPUT 2: LOKASI WALLET ]
     - Screenshot (JPG/PNG/WebP)                                 - Dropdown 16 Akun Baku:
     - Dokumen PDF (BCA, DANA)                                     * BCA (Baim) [0501191549]
     - File CSV (Blu BCA)                                          * Dana (Baim) [081392366770]
     - File Excel (Mandiri [1400019175927], Money Manager)         * Blu BCA (Baim) [000777929188]
     - (Opsional: Password Excel "01042001")                       * Mandiri (Baim) [1400019175927], dll.
                                                                 - Opsi: "🤖 Auto-Detect by AI"
             │                                                           │
             └─────────────────────────────┬─────────────────────────────┘
                                           │
                                           ▼
                             [ FormData Payload Submission ]
                             - file: File Blob (Max 20MB)
                             - targetWalletId: string | 'AUTO_DETECT'
                             - targetWalletName: string | null
                             - filePassword?: string
                                           │
                                           ▼
                              [ Server Action / API Route ]
                          (src/actions/ingest-document-action.ts)
                                           │
            ┌──────────────────────────────┴──────────────────────────────┐
            ▼                                                             ▼
  [ Encrypted XLSX Mandiri? ]                                    [ File Lain / Gambar / PDF / CSV ]
  - msoffice-crypto In-Memory Decrypt                            - PDF -> Base64 inline (BCA: extract 2026)
  - Merge 2-row Date (DD Mon) + Time (HH:mm:ss WIB)              - DANA PDF -> Pre-prompt consolidation rule
  - Normalize IDR numbers (titik -> strip, koma -> dot)          - CSV Blu BCA -> Strip 4 headers & 5 footers
  - Clean Tabular Stream to AI                                   - Images -> Base64 inline
            │                                                             │
            └──────────────────────────────┬──────────────────────────────┘
                                           │
                                           ▼
                      [ Inject Wallet Context + System Prompt ]
                                           │
                                           ▼
                          [ Google Gemini Flash 3.8 / 2.5 ]
                          SDK: @google/genai (v2+)
                          Schema: responseJsonSchema (Zod Enforced)
                          Resilience: 429 Exponential Backoff + Auto-chunking
                                           │
                                           ▼
                      [ Normalisasi Moneter: IDR -> Sen (x100) ]
                                           │
                                           ▼
                 [ DANA Deterministic Deduplication Post-Filter ]
                 (Hapus baris ganda transaksi DANA pada timestamp sama)
                                           │
                                           ▼
                          [ Zustand v5 Interactive Staging Store ]
                      - Edit inline sel (Tanggal, Nominal, Kategori)
                      - Seleksi baris & fitur "Bulk Reassign Wallet"
                      - Peringatan duplikasi instan (Duplicate Warning)
                                           │
                                     [ User Approve ]
                                           │
                                           ▼
                        [ Atomic Commit Server Action (React 19) ]
                      (src/actions/commit-batch-action.ts)
                                           │
                                           ▼
                                 [ Drizzle ORM + Turso ]
                     - Multi-row Transaction: INSERT into transactions
                     - Saldo Sync: UPDATE accounts.currentBalance (sen)
                     - Audit: UPDATE import_batches.status = 'COMMITTED'
```

---

## 4. Master Data & Database Schema Specification (Drizzle ORM)

### 4.1 Master Accounts (Inisialisasi 16 Akun Baku dengan Data Empiris)
Sistem menyertakan 16 akun utama yang ditemukan pada berkas cadangan Money Manager dan statement perbankan:
1. `BCA (Baim)` (Bank - Rekening `0501191549`, Tahapan Xpresi)
2. `Blu BCA (Baim)` (Bank Digital - Rekening `000777929188`, bluAccount)
3. `Blu BCA (Emergency Funds)` (Bank Digital - Simpanan Darurat)
4. `Blu BCA (Piya)` (Bank Digital - Pasangan)
5. `Blu BCA (Uang Belanja)` (Bank Digital - Belanja Rutin)
6. `Blu BCA (Safety Baim)` (Bank Digital)
7. `Blu BCA (Wedding Gift)` (Bank Digital)
8. `Blu (Monthly Pocket)` (Bank Digital)
9. `Blu (Rehan)` (Bank Digital)
10. `Dana (Baim)` (E-Wallet - `081392366770`)
11. `Dana (Piya)` (E-Wallet)
12. `Mandiri (Baim)` (Bank - Rekening `1400019175927`, KCP Surabaya Mulyosari)
13. `Crypto` (Aset Investasi)
14. `Saham` (Aset Investasi)
15. `Silver` (Aset Investasi Fisik)
16. `Reksadana Sailendra` (Aset Reksadana)

### 4.2 Master Category & Subcategory Taxonomy
Taksonomi kategori hierarkis bawaan:
* **💲 Pemasukan Utama:** `💼 Gaji SIGN`, `💼 Gaji UBS`
* **🤑 Pemasukan Tambahan:** `💻 Freelance`, `📈 Investasi`
* **🎊 Pemasukan Tidak Rutin:** `🎁 Bonus`, `🎉 Hadiah / THR`, `💰 Promo / Cashback`, `💱 Bunga`, `🔄 Subscription`, `🧾 Reimburse`
* **🏠 Tempat Tinggal:** `🏠 Kost`, `💃Gaji Mbak`, `💡 Listrik /Air / Gas`, `🛒 Kebutuhan Dapur`, `🥣 Makanam & Minuman`, `🧹 Perawatan & Kebersihan`, `🪑 Perabot & Alat Rumah`
* **💆 Pribadi & Kesehatan:** `🍭 Jajan`, `🏋️ Olahraga`, `🏥 Dokter`, `👕 Pakaian & Alas Kaki`, `💄 Skincare / Makeup`, `💆 Pijet`, `💊 Obat / Asuransi Kesehatan`, `📚 Edukasi`, `🔁 Subscription`, `🚿 Alat Mandi`, `🪒 Potong Rambut`
* **🚗 Transportasi & Kendaraan:** `⛽ Bahan Bakar`, `🅿️ Parkir`, `💳 E-Money`, `🔋 Sewa Baterai`, `🔧 Service & Perawatan`, `🚅 Kereta`, `🚕 Gojek / Gocar`
* **🎮 Hiburan & Gaya Hidup:** `🎬 Nonton`, `🎮 Game`, `🏖️ Liburan`
* **📱Komunikasi & Internet:** `☎️ Pulsa`, `🎧 Langganan Aplikasi`, `📶 Paket Data / Wifi`
* **💵 Keuangan & Investasi:** `🎫 Biaya Admin`, `📊 Investasi (Perak)`, `📊 Investasi (Saham)`
* **🧑‍🧑‍🧒 Sosial & Keluarga:** `🍭 Uang Jajan`, `🙏 Berbagi`
* **⚠️ Tidak Terduga:** `🎫 Biaya Admin`, `🤒 Dokter / Rumah Sakit`, `🤯 Denda / Kehilangan`
* **⚙️ Kategori Sistem / Audit:** `⚙️ Penyesuaian Saldo` (pemetaan `Modified Bal.`)
* **Kategori Khusus / Tanpa Subkategori:** `🍬 Uang Jajan`, `🔄 Pindah Uang`, `🏭Bisnis`, `😵‍💫 Lupa`, `🤯 Tidak Terduga`

### 4.3 Database Drizzle Schema (`src/db/schema.ts`)

> [!IMPORTANT]
> **Standar Presisi Finansial:** Kolom `amount`, `initial_balance`, dan `current_balance` menggunakan tipe `integer` yang menyimpan nilai moneter dalam satuan sen (sub-unit mata uang x100). Hal ini menjamin kalkulasi akuntansi bebas dari *floating-point error* IEEE 754.

```typescript
import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// 1. Rekening & Dompet (Lokasi Wallet)
export const accounts = sqliteTable('accounts', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull().unique(), // Contoh: 'BCA (Baim)', 'Dana (Baim)', 'Mandiri (Baim)'
  type: text('type', { enum: ['BANK', 'E_WALLET', 'INVESTMENT', 'CASH', 'OTHER'] }).notNull(),
  accountNumber: text('account_number'), // '0501191549', '081392366770', '1400019175927'
  accountHolder: text('account_holder'), // 'BIMA AURASAKTI ROCHMATULLAH'
  currency: text('currency').default('IDR').notNull(),
  initialBalance: integer('initial_balance').default(0).notNull(), // Nilai dalam SEN (IDR x 100)
  currentBalance: integer('current_balance').default(0).notNull(), // Nilai dalam SEN (IDR x 100)
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// 2. Kategori Induk
export const categories = sqliteTable('categories', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull().unique(), // e.g., '💆 Pribadi & Kesehatan', '⚙️ Penyesuaian Saldo'
  type: text('type', { enum: ['EXPENSE', 'INCOME', 'BOTH'] }).notNull(),
  icon: text('icon'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// 3. Subkategori
export const subcategories = sqliteTable('subcategories', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  categoryId: text('category_id').references(() => categories.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(), // e.g., '🍭 Jajan', '🅿️ Parkir'
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// 4. Tabel Transaksi Finansial
export const transactions = sqliteTable('transactions', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  accountId: text('account_id').references(() => accounts.id, { onDelete: 'cascade' }).notNull(), // Lokasi Wallet Sumber
  targetAccountId: text('target_account_id').references(() => accounts.id, { onDelete: 'set null' }), // Lokasi Wallet Tujuan (Khusus Transfer)
  categoryId: text('category_id').references(() => categories.id, { onDelete: 'set null' }),
  subcategoryId: text('subcategory_id').references(() => subcategories.id, { onDelete: 'set null' }),
  amount: integer('amount').notNull(), // Nilai dalam SEN (IDR x 100, selalu positif absolut)
  type: text('type', { enum: ['EXPENSE', 'INCOME', 'TRANSFER'] }).notNull(),
  date: text('date').notNull(), // ISO YYYY-MM-DD
  time: text('time'), // HH:mm:ss jika tersedia
  description: text('description').notNull(), // Nama merchant, toko, atau keterangan mutasi
  note: text('note'), // Catatan tambahan (e.g., 'Jajan', 'Parkir Maspion')
  sourceType: text('source_type', { 
    enum: ['MANUAL', 'SCREENSHOT', 'PDF_BCA', 'PDF_DANA', 'CSV_BLU', 'EXCEL_MANDIRI', 'MIGRATION_MONEY_MANAGER'] 
  }).notNull(),
  importBatchId: text('import_batch_id').references(() => importBatches.id, { onDelete: 'set null' }),
  transferPairId: text('transfer_pair_id'), // Penghubung 2 sisi mutasi transfer internal
  rawConfidence: integer('raw_confidence').default(100), // Persentase keyakinan AI (0 - 100)
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => ({
  accountDateIdx: index('idx_transactions_account_date').on(table.accountId, table.date),
  importBatchIdx: index('idx_transactions_import_batch').on(table.importBatchId),
  transferPairIdx: index('idx_transactions_transfer_pair').on(table.transferPairId),
}));

// 5. Log Batch Import & Audit
export const importBatches = sqliteTable('import_batches', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  fileName: text('file_name').notNull(),
  fileType: text('file_type').notNull(),
  selectedAccountId: text('selected_account_id').references(() => accounts.id, { onDelete: 'set null' }), // Lokasi Wallet yang dipilih user saat upload
  detectedSource: text('detected_source'), // 'BCA', 'DANA', 'BLU_BCA', 'MANDIRI', 'MANUAL_SELECTION'
  totalExtracted: integer('total_extracted').default(0).notNull(),
  totalCommitted: integer('total_committed').default(0).notNull(),
  status: text('status', { enum: ['PENDING', 'COMMITTED', 'FAILED'] }).default('PENDING').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});
```

### 4.4 Financial Math, Formatter & Date Utilities (`src/lib/money.ts`)

```typescript
/**
 * Konversi nilai Rupiah (bisa memiliki desimal sen) ke integer sen (x100).
 * Contoh: 10000 -> 1000000, 93.65 -> 9365.
 */
export function toCents(rupiah: number): number {
  return Math.round(rupiah * 100);
}

/**
 * Konversi integer sen ke nilai riil Rupiah.
 * Contoh: 1000000 -> 10000, 9365 -> 93.65.
 */
export function fromCents(cents: number): number {
  return cents / 100;
}

/**
 * Format integer sen ke representasi mata uang IDR berstandar Indonesia.
 * Contoh: 100000000 sen -> "Rp 1.000.000"
 */
export function formatIDR(cents: number, includeCents = false): string {
  const rupiah = fromCents(cents);
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: includeCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(rupiah);
}

/**
 * Konversi format tanggal serial Excel (misal: 46267.50351798611) ke ISO Date dan Time.
 */
export function excelSerialToDateTime(serial: number): { date: string; time: string } {
  // Epoch Excel dimulai dari 1899-12-30 (memperhitungkan bug tahun kabisat 1900)
  const utcMillis = (serial - 25569) * 86400 * 1000;
  const d = new Date(utcMillis);
  
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  const hours = String(d.getUTCHours()).padStart(2, '0');
  const minutes = String(d.getUTCMinutes()).padStart(2, '0');
  const seconds = String(d.getUTCSeconds()).padStart(2, '0');

  return {
    date: `${year}-${month}-${day}`,
    time: `${hours}:${minutes}:${seconds}`,
  };
}

/**
 * Normalisasi format string angka Indonesia (misal: "178.277,00" atau "282.277,18") ke float.
 */
export function parseIndonesianNumber(val: string | number): number {
  if (typeof val === 'number') return val;
  if (!val) return 0;
  // Hapus pemisah ribuan titik, ganti desimal koma dengan titik
  const sanitized = val.replace(/\./g, '').replace(',', '.').trim();
  const num = parseFloat(sanitized);
  return isNaN(num) ? 0 : num;
}
```

---

## 5. Unified Gemini Flash Ingestion Engine with Wallet Context

### 5.1 Zod Response Schema (`src/lib/gemini/schema.ts`)

```typescript
import { z } from 'zod';

export const ExtractedItemSchema = z.object({
  date: z.string().describe("Tanggal transaksi format ISO YYYY-MM-DD. Gunakan tahun dari header dokumen jika tabel hanya memuat DD/MM."),
  time: z.string().optional().describe("Waktu transaksi format HH:mm:ss jika tertera."),
  amount: z.number().positive().describe("Nominal uang absolut dalam Rupiah (e.g. 10000 atau 93.65 untuk bunga)."),
  type: z.enum(['EXPENSE', 'INCOME', 'TRANSFER']).describe("EXPENSE (debit/uang keluar), INCOME (kredit/uang masuk), TRANSFER (antar rekening)."),
  suggestedAccountName: z.string().describe("Lokasi wallet/akun transaksi. Gunakan userSelectedWallet jika disediakan, atau deteksi dari header."),
  suggestedTargetAccount: z.string().optional().describe("Jika transaksi transfer, nama akun penerima."),
  suggestedCategory: z.string().describe("Nama kategori terdekat dari taksonomi pengguna."),
  suggestedSubcategory: z.string().optional().describe("Nama subkategori terdekat dari taksonomi pengguna."),
  description: z.string().describe("Nama merchant, keterangan mutasi, atau nama pengirim/penerima."),
  note: z.string().optional().describe("Catatan ringkas."),
  confidenceScore: z.number().min(0).max(1).describe("Tingkat keyakinan ekstraksi AI (0.0 - 1.0)."),
});

export const GeminiExtractionResultSchema = z.object({
  institution: z.enum(['BCA', 'DANA', 'BLU_BCA', 'MANDIRI', 'MONEY_MANAGER', 'GENERAL_RECEIPT', 'UNKNOWN']),
  accountNumber: z.string().optional(),
  accountHolder: z.string().optional(),
  statementPeriod: z.string().optional(),
  resolvedWalletLocation: z.string().describe("Lokasi wallet final yang diputuskan AI untuk dokumen ini."),
  transactions: z.array(ExtractedItemSchema),
});

export type ExtractedItem = z.infer<typeof ExtractedItemSchema>;
export type GeminiExtractionResult = z.infer<typeof GeminiExtractionResultSchema>;
```

### 5.2 Dynamic System Prompt with Injected Wallet Context (`src/lib/gemini/prompts.ts`)

```typescript
export function buildFinancialPromptWithContext(selectedWalletName?: string | null): string {
  const walletInstruction = selectedWalletName && selectedWalletName !== 'AUTO_DETECT'
    ? `PENTING - LOKASI WALLET TELAH DITENTUKAN PENGGUNA:
Pengguna telah memilih secara spesifik bahwa dokumen/bukti ini berasal dari akun: "${selectedWalletName}".
Aturan Mutlak:
1. Tetapkan 'suggestedAccountName' = "${selectedWalletName}" untuk semua transaksi yang diekstrak, KECUALI dokumen secara eksplisit menunjukkan transfer dana ke/dari akun lain.
2. Jika dokumen berupa struk belanja kasir atau screenshot QRIS tanpa nama bank, gunakan "${selectedWalletName}" sebagai lokasi wallet pemotong dana.`
    : `LOKASI WALLET MODE: AUTO-DETECT.
Tentukan lokasi wallet berdasarkan teks header dokumen, nomor rekening, atau bukti pembayaran yang tertera pada daftar 16 akun pengguna.`;

  return `
Anda adalah Financial Extraction Engine presisi tinggi. Tugas Anda membaca dokumen mutasi bank (PDF, CSV, Excel) atau gambar bukti transaksi (struk, QRIS, transfer), lalu mengekstrak semua baris transaksi ke format JSON terstruktur.

${walletInstruction}

DAFTAR 16 REKENING / LOKASI WALLET PENGGUNA (DATA TERVERIFIKASI):
- BCA (Baim) [No Rekening: 0501191549, Tahapan Xpresi]
- Blu BCA (Baim) [No Rekening: 000777929188, bluAccount]
- Blu BCA (Emergency Funds)
- Blu BCA (Piya)
- Blu BCA (Uang Belanja)
- Blu BCA (Safety Baim)
- Blu BCA (Wedding Gift)
- Blu (Monthly Pocket)
- Blu (Rehan)
- Dana (Baim) [No HP: 081392366770]
- Dana (Piya)
- Mandiri (Baim) [No Rekening: 1400019175927, KCP Surabaya Mulyosari]
- Crypto, Saham, Silver, Reksadana Sailendra

TAKSONOMI KATEGORI & SUBKATEGORI LENGKAP:
- 💆 Pribadi & Kesehatan: 🍭 Jajan, 🏋️ Olahraga, 🏥 Dokter, 👕 Pakaian & Alas Kaki, 💄 Skincare / Makeup, 💆 Pijet, 💊 Obat / Asuransi Kesehatan, 📚 Edukasi, 🔁 Subscription, 🚿 Alat Mandi, 🪒 Potong Rambut
- 🚗 Transportasi & Kendaraan: ⛽ Bahan Bakar, 🅿️ Parkir, 💳 E-Money, 🔋 Sewa Baterai, 🔧 Service & Perawatan, 🚅 Kereta, 🚕 Gojek / Gocar
- 🏠 Tempat Tinggal: 🏠 Kost, 💃Gaji Mbak, 💡 Listrik /Air / Gas, 🛒 Kebutuhan Dapur, 🥣 Makanam & Minuman, 🧹 Perawatan & Kebersihan, 🪑 Perabot & Alat Rumah
- 🎮 Hiburan & Gaya Hidup: 🎬 Nonton, 🎮 Game, 🏖️ Liburan
- 📱Komunikasi & Internet: ☎️ Pulsa, 🎧 Langganan Aplikasi, 📶 Paket Data / Wifi
- 💵 Keuangan & Investasi: 🎫 Biaya Admin, 📊 Investasi (Perak), 📊 Investasi (Saham)
- 🧑‍🧑‍🧒 Sosial & Keluarga: 🍭 Uang Jajan, 🙏 Berbagi
- ⚠️ Tidak Terduga: 🎫 Biaya Admin, 🤒 Dokter / Rumah Sakit, 🤯 Denda / Kehilangan
- ⚙️ Penyesuaian Saldo: (Khusus sinkronisasi Modified Bal.)
- 💲 Pemasukan Utama: 💼 Gaji SIGN, 💼 Gaji UBS
- 🤑 Pemasukan Tambahan: 💻 Freelance, 📈 Investasi
- 🎊 Pemasukan Tidak Rutin: 🎁 Bonus, 🎉 Hadiah / THR, 💰 Promo / Cashback, 💱 Bunga, 🔄 Subscription, 🧾 Reimburse

ATURAN KHUSUS PARSING DOKUMEN (KALIBRASI EMPIRIS):
1. BCA PDF: Ambil TAHUN dari header periode "AGUSTUS 2026". Akhiran "DB" = EXPENSE. Tanpa DB atau bertanda "CR" = INCOME. Abaikan baris saldo awal/akhir. Transfer ke 081261531480 adalah TRANSFER ke Dana.
2. DANA PDF (ATURAN KONSOLIDASI & ANTI-DUPLIKAT): 
   - Dokumen DANA sering menampilkan 2 baris untuk 1 transaksi: baris item merchant/Sendmoney dan baris 'Saldo DANA' dengan nominal total pada waktu (menit) yang sama.
   - HANYA ekstrak 1 transaksi konsolidasian per kejadian pembayaran. Gunakan nominal total 'Saldo DANA'. JANGAN menduplikasi baris item dan baris metode bayar.
   - "-Rp..." = EXPENSE. "Topup" = INCOME.
3. Blu BCA CSV: Nilai negatif = EXPENSE, nilai positif = INCOME. Abaikan 5 baris rekapitulasi footer.
4. Mandiri Excel: Baca kolom Debet (EXPENSE) dan Kredit (INCOME). Data yang telah dinormalisasi telah menggabungkan baris tanggal dan jam.
5. Klasifikasi Cerdas: "SPBU" -> Transportasi > Bahan Bakar; "MCD", "D'crepes", "N Coffee" -> Pribadi & Kesehatan > Jajan; "Parkir" -> Transportasi > Parkir; "Biaya Adm" -> Keuangan & Investasi > Biaya Admin.
6. Nominal berupa bilangan numerik riil positif tanpa pemisah ribuan.
`;
}
```

### 5.3 Extractor Engine with Retry Resilience & DANA Deduplication Filter (`src/lib/gemini/extractor.ts`)

```typescript
import { GoogleGenAI } from '@google/genai';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { GeminiExtractionResultSchema, type GeminiExtractionResult, type ExtractedItem } from './schema';
import { buildFinancialPromptWithContext } from './prompts';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

interface ExtractionInput {
  mimeType: string;
  base64Data?: string;
  textContent?: string;
  selectedWalletName?: string | null;
}

async function callWithRetry<T>(fn: () => Promise<T>, maxRetries = 3, baseDelayMs = 1500): Promise<T> {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await fn();
    } catch (error: any) {
      attempt++;
      const isRateLimit = error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('RESOURCE_EXHAUSTED');
      if (isRateLimit && attempt < maxRetries) {
        const delay = baseDelayMs * Math.pow(2, attempt - 1);
        console.warn(`[Gemini API] Quota 429 hit. Retrying in ${delay}ms (Attempt ${attempt}/${maxRetries})...`);
        await new Promise((res) => setTimeout(res, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error('Gemini API max retries exceeded');
}

/**
 * Filter deduplikasi deterministik untuk transaksi DANA.
 * Mengeliminasi baris ganda yang memiliki tanggal, jam (menit yang sama), dan nominal identik.
 */
function deduplicateDanaTransactions(items: ExtractedItem[]): ExtractedItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    // Kunci unik: tanggal + menit (potong detik jika ada) + nominal
    const timeKey = item.time ? item.time.substring(0, 5) : '';
    const key = `${item.date}_${timeKey}_${item.amount}_${item.type}`;
    if (seen.has(key)) {
      return false; // Buang baris duplikat
    }
    seen.add(key);
    return true;
  });
}

export async function extractFinancialData(input: ExtractionInput): Promise<GeminiExtractionResult> {
  const systemPrompt = buildFinancialPromptWithContext(input.selectedWalletName);
  const jsonSchema = zodToJsonSchema(GeminiExtractionResultSchema, 'GeminiExtractionResultSchema');

  const contents: any[] = [];
  
  if (input.textContent) {
    contents.push({ text: `DATA TRANSAKSI DALAM FORMAT TABULAR:\n\n${input.textContent}` });
  } else if (input.base64Data) {
    contents.push({
      inlineData: {
        mimeType: input.mimeType,
        data: input.base64Data,
      },
    });
    contents.push({ text: "Ekstrak seluruh mutasi transaksi dari dokumen di atas sesuai aturan dan skema." });
  }

  const response = await callWithRetry(async () => {
    return await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseJsonSchema: jsonSchema as any,
        temperature: 0.1,
      },
    });
  });

  if (!response.text) {
    throw new Error('Gemini API mengembalikan respons kosong.');
  }

  const parsed = JSON.parse(response.text);
  const validated = GeminiExtractionResultSchema.parse(parsed);

  // Jika dokumen adalah DANA, terapkan filter deduplikasi deterministik
  if (validated.institution === 'DANA') {
    validated.transactions = deduplicateDanaTransactions(validated.transactions);
  }

  return validated;
}
```

---

## 6. Granular Implementation Task List for Antigravity Agent

Setiap fase diselesaikan, diuji, dan divalidasi secara berurutan.

### Phase 1: Project Setup & Package Baseline (Next.js 16 + React 19 + Tailwind v4 + Shadcn)
- [ ] **Task 1.1:** Inisialisasi Next.js 16+ App Router dengan TypeScript, Tailwind CSS v4, ESLint, dan direktori `src/`.
- [ ] **Task 1.2:** Inisialisasi Shadcn UI CLI (`npx shadcn@latest init`) dengan Tailwind v4 dan icon library Lucide React.
- [ ] **Task 1.3:** Instalasi dependensi inti produksi dan pengembangan:
  ```bash
  npm install @google/genai @libsql/client drizzle-orm zod zod-to-json-schema lucide-react exceljs msoffice-crypto zustand clsx tailwind-merge
  npm install -D drizzle-kit dotenv vitest @testing-library/react @testing-library/jest-dom jsdom @playwright/test @tailwindcss/postcss
  ```
- [ ] **Task 1.4:** Setup environment variables di `.env.example` dan `.env.local`:
  * `TURSO_DATABASE_URL`
  * `TURSO_AUTH_TOKEN`
  * `GEMINI_API_KEY`
  * `GEMINI_MODEL=gemini-2.5-flash`
- [ ] **Task 1.5:** Setup konfigurasi `vitest.config.ts` untuk pengujian TDD dan `playwright.config.ts` untuk E2E.
- [ ] **Task 1.6:** Konfigurasi `next.config.ts` dengan `serverActions: { bodySizeLimit: '20mb' }` untuk mendukung unggah dokumen statement besar.

---

### Phase 2: Database Layer, Seed & Taxonomy Initialization
- [ ] **Task 2.1:** Inisialisasi Turso client di `src/db/index.ts` menggunakan `@libsql/client`.
- [ ] **Task 2.2:** Tulis skema database lengkap di `src/db/schema.ts` (`accounts`, `categories`, `subcategories`, `transactions`, `importBatches`) dengan tipe `integer` satuan sen untuk seluruh nilai moneter.
- [ ] **Task 2.3:** Implementasikan modul utilitas presisi uang dan tanggal serial di `src/lib/money.ts` (`toCents`, `fromCents`, `formatIDR`, `excelSerialToDateTime`, `parseIndonesianNumber`).
- [ ] **Task 2.4:** Konfigurasi `drizzle.config.ts` untuk Turso/libSQL.
- [ ] **Task 2.5:** Buat skrip seeder komprehensif di `src/db/seed.ts` yang menginisialisasi:
  * 16 Rekening / Lokasi Wallet pengguna (termasuk Mandiri `1400019175927`, BCA `0501191549`, blu `000777929188`, DANA `081392366770`).
  * Taksonomi 12 kategori utama, kategori sistem `⚙️ Penyesuaian Saldo`, dan puluhan subkategori ber-emoji.
- [ ] **Task 2.6:** Jalankan `npx drizzle-kit push` dan eksekusi seeder untuk mengisi database awal.

---

### Phase 3: Legacy "Money Manager" Master Importer
- [ ] **Task 3.1:** Buat parser migrasi di `src/lib/migration/money-manager-importer.ts` menggunakan `exceljs`:
  * Membaca sheet `Money Manager` dari `data-example/Money Manager - Excel.xlsx` (455 baris).
  * Mengonversi serial date number Excel (e.g. `46267.50351798611`) ke ISO date dan time via `excelSerialToDateTime()`.
  * Memetakan baris `Modified Bal.` ke kategori `⚙️ Penyesuaian Saldo` (type `INCOME` jika nilai positif, `EXPENSE` jika nilai negatif).
  * Konversi nilai uang kolom `IDR` / `Amount` ke satuan sen (`toCents`).
  * Menangani logika 79 transaksi `Transfer-Out`: cari akun tujuan berdasarkan teks pada kolom `Category`, hubungkan dengan `targetAccountId`, dan buat pasangan `transferPairId`.
- [ ] **Task 3.2:** Tulis Server Action migrasi `src/actions/migration-action.ts` untuk commit seluruh 455 transaksi historis secara atomik dan kalkulasi ulang saldo berjalan 16 akun.
- [ ] **Task 3.3:** Buat unit test `tests/unit/money-manager-migration.test.ts` di Vitest untuk memverifikasi keakuratan saldo 16 akun pasca-migrasi 455 transaksi.

---

### Phase 4: Unified Ingestion Engine with Wallet Context (Gemini Flash & Decryptor)
- [ ] **Task 4.1:** Buat modul dekripsi berkas Excel Mandiri di `src/lib/parser/excel-decryptor.ts`:
  * Menggunakan `msoffice-crypto` untuk membuka OLE `EncryptedPackage` dengan kata sandi (default perbankan teruji: `"01042001"`).
  * Parsing lembar kerja `e-Statement` menggunakan `exceljs` dan mengekstrak data mutasi.
  * Menyatukan baris tanggal (Baris 18) dan baris jam (Baris 19) menjadi format datetime utuh.
  * Membersihkan angka format Indonesia (`178.277,00` -> `178277`).
- [ ] **Task 4.2:** Buat modul normalisasi berkas di `src/lib/parser/file-preprocessor.ts`:
  * Buffer Gambar (PNG/JPG/WebP) -> Base64 Inline Data.
  * Buffer PDF BCA -> Base64 Inline Document Data (`application/pdf`) + injeksi tahun dari header periode.
  * Buffer PDF DANA -> Base64 Inline Document Data (`application/pdf`) + instruksi konsolidasi baris Saldo DANA.
  * Buffer CSV (Blu BCA) -> String Tabular Ringkas (memangkas 4 header metadata dan 5 footer rekapitulasi).
- [ ] **Task 4.3:** Implementasikan builder prompt dinamis di `src/lib/gemini/prompts.ts` dengan injeksi `selectedWalletName` dan nomor rekening terverifikasi.
- [ ] **Task 4.4:** Implementasikan extractor di `src/lib/gemini/extractor.ts` menggunakan `@google/genai` dengan model dinamis, skema terstruktur `responseJsonSchema`, retry exponential backoff, dan post-filter `deduplicateDanaTransactions()`.
- [ ] **Task 4.5:** Buat Server Action `ingestDocumentAction` di `src/actions/ingest-document-action.ts`:
  * Menerima `FormData` (`file`, `selectedAccountId`, opsional `filePassword`).
  * Menormalkan nominal ke satuan sen (`toCents`).
  * Mencatat log batch di tabel `import_batches` dengan status `PENDING`.
- [ ] **Task 4.6:** Tulis unit test Vitest `tests/unit/gemini-parsers.test.ts` dengan mock data dokumen BCA, DANA, Blu BCA, dan Mandiri.

---

### Phase 5: Interactive Staging UI with Dual-Input (Upload + Wallet Location) & Zustand v5
- [ ] **Task 5.1:** Pasang komponen Shadcn UI yang dibutuhkan (`Button`, `Card`, `Select`, `Dialog`, `Table`, `Badge`, `Input`, `Checkbox`, `DropdownMenu`, `Tabs`).
- [ ] **Task 5.2:** Bangun Zustand Store di `src/store/use-staging-store.ts` untuk mengelola:
  * Daftar baris transaksi staging hasil ekstraksi AI.
  * Seleksi multi-baris (`selectedRowIds`).
  * Aksi inline edit sel (tanggal, nominal, kategori, akun).
  * Aksi `bulkReassignWallet(walletId, walletName)`.
  * Status validasi dan deteksi duplikasi *real-time*.
- [ ] **Task 5.3:** Bangun Komponen Selector Lokasi Wallet `src/components/import/wallet-selector.tsx`:
  * Dropdown interaktif Shadcn menampilkan 16 akun terkelompok (Bank, E-Wallet, Aset).
  * Opsi utama: *🤖 Auto-Detect by AI*.
  * Tampilan badge saldo berjalan akun yang dipilih.
- [ ] **Task 5.4:** Bangun Halaman Impor Utama di `src/app/import/page.tsx`:
  * Panel Dual-Input: Wallet Selector di bagian atas, Drag-and-drop dropzone di bagian tengah, dan input password kondisional untuk file Excel Mandiri (prefilled placeholder `"01042001"`).
  * Animasi progress analisis AI dengan status feedback informatif.
- [ ] **Task 5.5:** Bangun Tabel Staging Interaktif `src/components/import/staging-table.tsx`:
  * Menampilkan baris transaksi dengan format rupiah berstandar Indonesia (`formatIDR`).
  * Dropdown inline per baris untuk memindahkan wallet transaksi tertentu.
  * Toolbar aksi: Tombol "Ubah Wallet Sekaligus (*Bulk Reassign*)", "Hapus Baris Terpilih", dan "Tambah Baris Manual".
  * Indikator peringatan duplikasi (*Duplicate Warning Badge*) jika terdapat transaksi dengan tanggal, nominal, dan akun yang identik di database.
- [ ] **Task 5.6:** Buat Server Action `commitBatchAction` di `src/actions/commit-batch-action.ts`:
  * Menulis seluruh baris transaksi yang disetujui ke tabel `transactions` dalam satu transaksi atomik Drizzle.
  * Menyesuaikan saldo berjalan (`currentBalance`) akun-akun terkait secara otomatis.
  * Memperbarui status `import_batches` menjadi `COMMITTED`.

---

### Phase 6: Financial Dashboard & Multi-Wallet Analytics
- [ ] **Task 6.1:** Bangun Sidebar Navigasi dan App Shell responsif di `src/app/layout.tsx`.
- [ ] **Task 6.2:** Bangun Halaman Dashboard Finansial di `src/app/page.tsx`:
  * Kartu Ringkasan Total Kekayaan Bersih (*Net Worth* lintas 16 akun dalam format IDR).
  * Ringkasan Arus Kas Bulan Berjalan (Pemasukan vs Pengeluaran vs Net Savings).
  * Komponen visual proporsi pengeluaran per kategori induk (Recharts / SVG Charts).
  * Daftar transaksi terbaru dengan penanda badge lokasi wallet.
- [ ] **Task 6.3:** Bangun Halaman Manajemen Akun di `src/app/accounts/page.tsx`:
  * Grid kartu 16 rekening/dompet dengan rincian saldo masing-masing.
  * Rekonsiliasi transaksi transfer antar-rekening internal.
- [ ] **Task 6.4:** Bangun Halaman Transaksi di `src/app/transactions/page.tsx`:
  * Filter multi-dimensi (Lokasi Wallet, Rentang Tanggal, Kategori, Tipe Mutasi).
  * Modal Tambah Transaksi Cepat (*Quick Add Transaction*) dengan input wajib Lokasi Wallet Sumber.

---

### Phase 7: Edge Resilience & Automated Testing (Vitest & Playwright)
- [ ] **Task 7.1:** Tulis pengujian unit Vitest komprehensif:
  * `tests/unit/money-precision.test.ts`: Uji presisi penambahan, pengurangan, dan konversi sen IDR tanpa desimal drift.
  * `tests/unit/excel-decryptor.test.ts`: Uji dekripsi file `data-example/Mandiri-Agu-2026.xlsx` dengan password `"01042001"`.
  * `tests/unit/serial-date.test.ts`: Uji konversi tanggal serial Excel `46267.50351798611` menjadi `2026-09-02 12:05:03`.
  * `tests/unit/dana-deduplication.test.ts`: Uji eliminasi baris ganda DANA Saldo DANA.
  * `tests/unit/wallet-routing.test.ts`: Uji prioritas wallet pilihan user vs auto-detect AI.
- [ ] **Task 7.2:** Tulis pengujian E2E Playwright di `e2e/ingestion-flow.spec.ts`:
  * Alur 1: Upload `data-example/BCA_AUG_2026.pdf` dengan Lokasi Wallet `BCA (Baim)` -> review staging -> commit -> cek saldo.
  * Alur 2: Upload `data-example/Dana.pdf` dengan `Auto-Detect by AI` -> verifikasi akun terdeteksi `Dana (Baim)` dan deduplikasi sukses.
  * Alur 3: Upload foto struk minimarket tanpa nama bank + memilih `Blu BCA (Uang Belanja)` -> verifikasi saldo `Blu BCA (Uang Belanja)` terpotong.
  * Alur 4: Upload `data-example/blubca_Agustus2026.csv` -> rekonsiliasi transfer masuk dari Dana.
  * Alur 5: Upload `data-example/Mandiri-Agu-2026.xlsx` dengan password `"01042001"` -> verifikasi 3 baris mutasi terurai dengan tanggal & jam lengkap.
- [ ] **Task 7.3:** Uji ketahanan kesalahan: file corrupt, password Excel salah, dan simulasi penanganan kuota Gemini API (HTTP 429).

---

### Phase 8: Production Deployment (Vercel & Turso Cloud)
- [ ] **Task 8.1:** Sinkronkan skema Turso Production via `drizzle-kit push`.
- [ ] **Task 8.2:** Jalankan modul migrasi satu kali untuk mengimpor seluruh 455 transaksi historis dari `data-example/Money Manager - Excel.xlsx`.
- [ ] **Task 8.3:** Konfigurasikan Environment Variables pada dashboard Vercel (`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `GEMINI_API_KEY`, `GEMINI_MODEL`).
- [ ] **Task 8.4:** Jalankan build produksi (`next build`) dan pastikan zero error / warning. Lakukan uji coba live ingestion langsung pada domain Vercel.

---

## 7. Directory Structure Reference

```text
├── .env.example
├── drizzle.config.ts
├── next.config.ts
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── vitest.config.ts
├── data-example/                       # Fixture contoh dokumen mutasi aktual pengguna
│   ├── BCA_AUG_2026.pdf                # Statement BCA Tahapan Xpresi
│   ├── Dana.pdf                        # Statement DANA Riwayat Aktivitas
│   ├── blubca_Agustus2026.csv          # Statement CSV blu by BCA Digital
│   ├── Mandiri-Agu-2026.xlsx           # Statement Excel Mandiri terenkripsi sandi
│   └── Money Manager - Excel.xlsx      # Master migrasi 455 transaksi historis
├── e2e/
│   └── ingestion-flow.spec.ts          # Pengujian E2E Playwright alur upload & commit
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # App Shell & Sidebar responsif
│   │   ├── page.tsx                    # Dashboard ringkasan finansial & visual analytics
│   │   ├── import/
│   │   │   └── page.tsx                # Halaman Dual-Input (Wallet Selector + Dropzone + Staging Table)
│   │   ├── transactions/
│   │   │   └── page.tsx                # Daftar transaksi, filter lokasi wallet, quick add
│   │   └── accounts/
│   │       └── page.tsx                # Grid 16 rekening, saldo, & transfer reconciliation
│   ├── actions/
│   │   ├── ingest-document-action.ts   # Server action Gemini extraction dengan konteks wallet & DANA deduplication
│   │   ├── commit-batch-action.ts      # Server action batch insert transaksi atomik ke Turso
│   │   ├── migration-action.ts         # Server action migrasi 455 baris berkas Money Manager
│   │   └── transaction-actions.ts      # CRUD mutasi transaksi manual
│   ├── components/
│   │   ├── ui/                         # Shadcn UI: Button, Card, Dialog, Table, Badge, Select, Tabs, etc.
│   │   ├── layout/                     # Sidebar, Navbar, MobileBottomBar
│   │   ├── dashboard/                  # NetWorthCard, CashFlowChart, CategoryPieChart, RecentList
│   │   └── import/                     # WalletSelector, FileDropzone, StagingTable, PasswordDialog
│   ├── store/
│   │   └── use-staging-store.ts        # Zustand v5 store untuk staging table & bulk actions
│   ├── db/
│   │   ├── index.ts                    # Inisialisasi Turso libSQL client
│   │   ├── schema.ts                   # Drizzle ORM Schema (accounts, categories, transactions, etc.)
│   │   └── seed.ts                     # Seeder 16 akun & taksonomi kategori hierarkis
│   ├── lib/
│   │   ├── money.ts                    # Utilitas konversi Sen <-> IDR, Excel Serial Date, & Number Parser
│   │   ├── gemini/
│   │   │   ├── schema.ts               # Strict Zod JSON output schema
│   │   │   ├── prompts.ts              # System prompt builder dengan injeksi lokasi wallet
│   │   │   └── extractor.ts            # @google/genai caller dengan responseJsonSchema & DANA post-filter
│   │   ├── parser/
│   │   │   ├── file-preprocessor.ts    # Normalisasi format PDF, CSV, Gambar
│   │   │   └── excel-decryptor.ts      # Handler in-memory msoffice-crypto + exceljs multi-row merger
│   │   ├── migration/
│   │   │   └── money-manager-importer.ts # Parser 455 baris transaksi historis dengan serial date conversion
│   │   └── utils.ts                    # Utility cn(), konversi tanggal Indonesia
│   └── types/
│       └── index.ts                    # Tipe data TypeScript global
└── tests/
    ├── unit/
    │   ├── money-precision.test.ts
    │   ├── serial-date.test.ts
    │   ├── excel-decryptor.test.ts
    │   ├── dana-deduplication.test.ts
    │   ├── gemini-parsers.test.ts
    │   └── money-manager-migration.test.ts
    └── integration/
```

---

## 8. Critical Instructions for Antigravity Agent Execution

1. **Prioritas Konteks Lokasi Wallet:** Jika pengguna memilih lokasi wallet tertentu pada antarmuka (`selectedAccountId !== 'AUTO_DETECT'`), nilai ini memiliki preseden mutlak lebih tinggi daripada tebakan AI pada dokumen umum atau struk belanja kasir. Namun, jika dokumen adalah mutasi perbankan multi-akun resmi yang secara eksplisit memuat nomor rekening berbeda, AI wajib memberi tanda peringatan diskrepansi pada tabel *staging*.
2. **Aturan Presisi Nilai Moneter (Integer Sen):** Nilai rupiah di database **wajib** disimpan sebagai bilangan bulat positif absolut dalam satuan sen (`integer` di Drizzle, IDR x 100). Arah aliran dana ditentukan oleh kolom `type` (`EXPENSE`, `INCOME`, `TRANSFER`). Tidak boleh ada nilai floating point tersimpan di kolom moneter database Turso.
3. **Dekripsi Mandiri In-Memory dengan Password `"01042001"`:** Penanganan file `data-example/Mandiri-Agu-2026.xlsx` harus menggunakan `msoffice-crypto` yang mendekripsi stream ke memori dan dibaca langsung via `exceljs`. Gabungkan baris tanggal dan jam ke dalam satu nilai ISO datetime sebelum dikirim ke AI.
4. **Deduplikasi Dokumen DANA:** Terapkan aturan konsolidasi ganda DANA baik pada system prompt maupun post-filter `deduplicateDanaTransactions()` di Server Action agar mutasi belanja merchant tidak terhitung ganda akibat baris rincian `Saldo DANA`.
5. **Konversi Serial Date Money Manager:** Kolom `Date` pada `Money Manager - Excel.xlsx` berupa floating-point serial date (contoh: `46267.50351798611`). Wajib menggunakan formula `excelSerialToDateTime()` untuk mengonversinya ke ISO UTC `YYYY-MM-DD HH:mm:ss`. Transaksi `Modified Bal.` dipetakan ke kategori `⚙️ Penyesuaian Saldo`.
6. **Resiliensi Kuota Gemini API:** Implementasikan penanganan error kuota (HTTP 429) dengan *exponential backoff* otomatis pada `src/lib/gemini/extractor.ts` agar pemrosesan batch dokumen tidak gagal ketika batas rate limit tercapai.
7. **Prioritas Migrasi Riwayat Historis:** Jalankan Phase 3 (impor `Money Manager - Excel.xlsx`) terlebih dahulu ke database Turso sebelum menguji impor file mutasi bulanan baru agar 16 akun dan taksonomi kategori terinisialisasi dengan riwayat saldo yang konsisten.
8. **Rekonsiliasi Transfer Dua Arah:** Hubungkan transaksi antar rekening internal (misal: pengeluaran di `Dana (Baim)` yang berpasangan dengan penerimaan di `Blu BCA (Baim)`) dengan `transferPairId` agar tidak terjadi pembukuan ganda pengeluaran.
