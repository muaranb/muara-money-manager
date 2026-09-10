# ARCHITECTURAL PLANNING & IMPLEMENTATION SPECIFICATION (REVISED - V5.3 COMPREHENSIVE BRAND & DESIGN ENGINEERING MONOLITH EDITION)
## Project: Next.js Serverless Monolith Financial Tracker (AI-Powered Banking & Legacy Ingestion with Dynamic Wallet Context, Multi-Dimensional Monthly Analytics, Strict Transfer Neutrality, Automatic Contra-Transfer Pairing, .agents Design Suite & Executive Slide Engine)
**Target Execution Agent:** Antigravity CLI Coding Agent  
**AI Model:** Gemini Flash 3.8 (High) / Dynamic (`process.env.GEMINI_MODEL || 'gemini-2.5-flash'`)  
**Target Architecture:** Next.js 16+ App Router (Full-Stack Serverless Monolith) + React 19 + Tailwind CSS v4 (@theme inline OKLCH) + Shadcn UI (Radix Primitives) + .agents Unified Design Ecosystem (`brand`, `design-system`, `ui-styling`, `design`, `banner-design`, `slides`) + Artisan Obsidian & Tactile Metallic Design System (UI-UX-PRO-MAX) + Tri-Scale Tabular Typography (Geist Sans + JetBrains Mono) + Turso (libSQL Edge) with Integer-Cents Precision + Google Gemini Official SDK (`@google/genai` v2+) + Recharts & Chart.js Executive Visualizations + Vercel Serverless  
**Supported Ingestion Sources (Empirically Calibrated):** 
1. `data-example/BCA_AUG_2026.pdf` (Tahapan Xpresi / BCA e-Statement PDF - No. Rekening `0501191549`)
2. `data-example/Dana.pdf` (DANA Riwayat Aktivitas E-Wallet PDF - No HP `081392366770`, 2 Halaman)
3. `data-example/blubca_Agustus2026.csv` (blu by BCA Digital CSV Statement - bluAccount `000777929188`)
4. `data-example/Mandiri-Agu-2026.xlsx` (Livin' by Mandiri E-Statement Excel - No. Rekening `1400019175927`, Password Terverifikasi: `"01042001"`)
5. `data-example/Money Manager - Excel.xlsx` (Legacy Master Backup Migration - 455 Historical Transactions, Excel Serial Dates)
6. Real-time Screenshot Transaksi (QRIS, Mobile Banking Receipts, Struk Belanja Kasir)
**Core Input Mode:** **Dual-Input Pipeline** = Multi-Format File/Image Upload + **Target Wallet Location Selector** (Pilihan Lokasi Wallet/Akun Sumber)  
**Dedicated Reporting Core:** **Multi-Dimensional Monthly Dashboard (`/monthly`)** = Analisis Bulanan Keseluruhan (Overview & MoM) + Per Kategori (Hierarki Subkategori) + Per Judul (Merchant Leaderboard & Search) + In-App Executive Presentation Exporter  
**Accounting Standard:** **Strict Operational Cash Flow Isolation (Transfer Neutrality)** = Mutasi Pindah Uang / Transfer Antar-Wallet Tidak Dihitung sebagai Pengeluaran atau Pemasukan Operasional  
**Design Standard:** **World-Class Bespoke Human Craft & Brand Engineering (.agents Ecosystem)** = Artisan Obsidian Canvas with Micro-Noise Texture, 3-Layer Token Pipeline (JSON → CSS → Tailwind v4), Tri-Scale Tabular Currency (<TabularCurrency />), Bespoke AI Vector Iconography, In-App Executive Monthly Deck Exporter (Chart.js), and Zero-AI Generic Clichés  
**Status:** READY FOR EXECUTION (V5.3 - BRAND & DESIGN ENGINEERING MONOLITH ARCHITECTURE)

---

## 1. Executive Summary & Core Objectives

### 1.1 Project Overview
Membangun sistem pelacak keuangan personal (*Personal Finance Tracker*) monolitik serverless berskala tinggi (*highly scalable*) yang di-deploy ke Vercel Serverless Functions dan Turso Database (libSQL Edge). 

Pembaruan arsitektur pada versi **V5.3 Comprehensive Brand & Design Engineering Monolith Edition** ini menyempurnakan integritas akuntansi keuangan personal sekaligus menghadirkan ekosistem desain, identitas merk (*brand*), dan mesin presentasi eksekutif lengkap yang terintegrasi langsung dari folder `.agents`:
1. **World-Class Luxury Fintech Aesthetic (UI-UX-PRO-MAX):** Standar visual sekelas Linear, Stripe, Mercury, dan Apple Card menggunakan palet *Obsidian Glass* (`#030712`), kartu modular *Bento Grid* berbalut *frosted glass* (`backdrop-blur-xl`), *hairline border* bergradasi cahaya (`border-white/[0.08]`), dan *ambient radial glow* halus.
2. **Tri-Stack Typography with Zero Layout Jitter:** `Geist Sans` untuk antarmuka/heading dengan kerning presisi, dipadukan dengan `JetBrains Mono` bertipe `tabular-nums` untuk seluruh nominal uang dan saldo guna menjamin angka stabil tanpa pergeseran horizontal saat mutasi diperbarui.
3. **Dual-Input AI Ingestion Engine (Data Inflow):** Pemrosesan dokumen multi-format (PDF BCA, PDF DANA, CSV blu BCA, XLSX Mandiri terenkripsi sandi `"01042001"`, berkas migrasi Money Manager, dan gambar struk kasir) yang dipadukan dengan pilihan lokasi wallet sumber (*wallet context*) untuk eliminasi ambiguitas aliran dana.
4. **Dedicated Monthly Multi-Dimensional Analytics Dashboard (`/monthly`) (Data Intelligence):** Halaman analitik bulanan interaktif dengan 3 perspektif komprehensif (Ringkasan Keseluruhan, Per Kategori, Per Judul/Merchant) dilengkapi grafik Recharts berpijar (*ambient glow*), donut chart interaktif dengan *dynamic center-stat*, dan *mini-sparklines* tertanam di kartu KPI.
5. **Strict Operational Cash Flow Isolation (Transfer Neutrality):** Seluruh transaksi pemindahan dana antar rekening/dompet internal pengguna (tipe `TRANSFER`, berelasi `transferPairId`, atau berkategori `🔄 Pindah Uang`) **secara mutlak tidak dihitung sebagai pengeluaran maupun pemasukan operasional**. Ini menjamin laporan keuangan bulanan tidak mengalami inflasi semu akibat pergeseran saldo antar kantong.
   - **📊 Ringkasan Keseluruhan (Overview):** Total Pemasukan, Pengeluaran, Net Cashflow, Rasio Tabungan (Savings Rate %), perbandingan Month-over-Month (MoM delta %), dan grafik timeline harian (1-31).
   - **🏷️ Per Kategori (By Category):** Donut Chart proporsi alokasi dana + Accordion tabel hierarkis kategori induk yang dapat di-expand menampilkan subkategori lengkap dengan progress bar persentase dan nominal IDR.
   - **📝 Per Judul / Merchant (By Title):** Leaderboard peringkat pengeluaran terbesar per judul/merchant (`description`/`note`), memuat jumlah frekuensi transaksi, rata-rata pengeluaran per transaksi, persentase terhadap total bulanan, search bar instan, dan drawer rincian mutasi.
6. **Automatic Contra-Transaction Pairing Engine (Transfer Auto-Detection):** Mesin rekonsiliasi cerdas yang secara otomatis mendeteksi transaksi debit dan kredit yang berlawanan arah antar dua dompet berbeda pada tanggal/waktu yang sama dengan nominal sen yang identik, baik di dalam sesi upload yang sama (*intra-batch*) maupun secara retroaktif terhadap transaksi lama di database Turso (*cross-batch*). Pasangan ini otomatis dinormalkan menjadi `type = 'TRANSFER'` dan dihubungkan via `transferPairId` ke kategori `🔄 Pindah Uang` sehingga terbebas dari inflasi beban belanja atau pemasukan semu.
7. **Anti-AI Generic Design Principles (Bespoke Human Craft):** Eliminasi total ciri khas visual klise template AI generik (larangan floating neon gradient blobs, larangan emoji-as-icon, larangan grid 3-kartu simetris). Mengadopsi standar pengerjaan tangan mewah sekelas Linear, Stripe Press, dan Apple Card: latar obsidian bertekstur micro-grain noise (1.8% opacity), kartu bento ber-hairline border dengan specular top-edge highlight, representasi kartu fisik bank otentik (Mandiri Platinum dengan brass EMV chip SVG, BCA Navy-Gold, DANA Cyan), format mata uang 3 hierarki visual (`<TabularCurrency />`), dan tautan visual Contra-Pair Tether.
8. **.agents Design & Brand Engineering Monolith:** Penyatuan 7 sub-skill dari `.agents`: pedoman brand resmi (`docs/brand-guidelines.md`), pipeline token 3-lapis (`assets/design-tokens.json` $\rightarrow$ `assets/design-tokens.css` $\rightarrow$ Tailwind v4 `@theme inline`), suite generator aset visual AI (monogram Muara, vektor chip EMV, ikon contra-tether), dan modul in-app ekspor presentasi laporan keuangan eksekutif berbasis Chart.js.

### 1.2 Urgensi Input Lokasi Wallet (Why Wallet Location Input is Critical)
1. **Ambiguitas Struk Fisik & Screenshot QRIS:** Struk belanja kasir (Indomaret, SPBU, resto) atau screenshot konfirmasi QRIS merchant seringkali **tidak memuat nama bank/e-wallet** sumber pembayaran (hanya nominal dan nama toko). Dengan adanya input "Lokasi Wallet", sistem dan AI mengetahui secara pasti akun mana yang saldonya berkurang.
2. **Diferensiasi Akun Bank yang Sama:** Pengguna memiliki beberapa rekening/kantong dalam satu institusi (contoh: *Blu BCA (Baim)*, *Blu BCA (Emergency Funds)*, *Blu BCA (Uang Belanja)*, *Blu BCA (Piya)*, *Blu (Monthly Pocket)*). Input lokasi wallet mencegah salah routing antar sub-rekening.
3. **Fleksibilitas Hibrida:** Jika pengguna mengunggah dokumen mutasi resmi yang sudah jelas identitasnya (seperti `BCA_AUG_2026.pdf` atau `Dana.pdf`), pengguna cukup memilih opsi *"🤖 Auto-Detect by AI"* dan Gemini Flash akan membaca header rekening secara otomatis.

### 1.3 Core Architectural Principles
1. **Zero Cold-Boot & Zero Downtime (Never Sleeps):** Menggunakan Vercel Serverless Functions dan Turso Database di Edge. Bebas penonaktifan otomatis (*no idle pause/suspend*) meski tidak diakses berbulan-bulan.
2. **Mathematical Precision (Integer-Cents Standard):** Nilai saldo dan mutasi disimpan sebagai `INTEGER` (nilai rupiah x 100). Contoh: Rp 10.000,00 disimpan sebagai `1000000`, bunga bank Rp 93,65 disimpan sebagai `9365`. Nilai konversi hanya dilakukan saat presentasi UI (`toCents()` dan `fromCents()`).
3. **Strict Operational Cash Flow Isolation (Transfer Neutrality):** Transaksi transfer antar-dompet pengguna tidak mengurangi maupun menambah laba/rugi operasional (*Operating Cash Flow*). Total Pemasukan murni mencerminkan penghasilan riil, dan Total Pengeluaran murni mencerminkan biaya hidup riil. Mutasi pemindahan dana dipantau melalui metrik terpisah (*Volume Pindah Uang*).
4. **Multi-Dimensional Monthly Analytics with Zero Client Lag:** Seluruh agregasi data bulanan (SUM, COUNT, GROUP BY kategori, judul, dan harian) dieksekusi langsung di database Turso SQLite via Drizzle ORM Server Component, menjamin kecepatan sub-millisecond tanpa membebani browser pengguna.
5. **Unified AI-Powered Ingestion with Wallet Context:** Seluruh format file (PDF, CSV, XLSX terdekripsi, PNG/JPG) dilewatkan melalui `@google/genai` dengan parameter konteks dompet (`walletContext`) yang disuntikkan langsung ke *system prompt* dengan penegakan skema JSON mutlak.
6. **Secure In-Memory Decryption for Banking Spreadsheets:** Berkas Mandiri `EncryptedPackage` didekripsi di memori Server Action menggunakan `msoffice-crypto` dan diparsing via `exceljs` tanpa menulis berkas terdekripsi ke disk.
7. **Empirical Banking Robustness:** Pipeline preprocessor mampu menormalkan format angka Indonesia (`.` ribuan, `,` desimal), menggabungkan baris ganda waktu (Mandiri), dan mengeliminasi rincian ganda (DANA).
8. **Legacy Backup Migration Compatibility:** Sistem memiliki modul migrasi bawaan yang secara khusus memetakan 455 baris transaksi historis dari `Money Manager - Excel.xlsx`, menginisialisasi 16 rekening/dompet, serta menyelaraskan taksonomi kategori dan subkategori hierarkis lengkap dengan emoji.
9. **Interactive Staging & Deduplication:** Hasil ekstraksi AI disajikan di tabel *staging* interaktif berbasis Zustand v5 dengan *inline wallet selector* per baris dan fitur *batch reassign wallet* sebelum ditulis secara atomik ke database Turso.
10. **World-Class UI/UX Fidelity & Zero Layout Jitter (UI-UX-PRO-MAX Standard):** Antarmuka dirancang dengan standar kemewahan visual setara fintech elit dunia (Obsidian Glass, Bento-Grid, Recharts ambient glow), mematuhi rasio kontras WCAG AA (>= 4.5:1), didukung font monospace tabular `JetBrains Mono` untuk seluruh representasi angka finansial, skeleton shimmer wave dengan *zero layout shift* (CLS < 0.05), serta navigasi adaptif dual-mode (Desktop Collapsible Sidebar + Command Palette `⌘K` dan Mobile iOS Bottom Nav).
11. **Automatic Contra-Transaction Pairing & Bi-Directional Reconciliation:** Sistem secara otomatis mendeteksi transaksi debit dan kredit berpasangan antar 2 dompet berbeda yang terjadi pada waktu/tanggal yang sama dengan nominal identik (menggunakan Hierarchical Smart Window), baik di dalam berkas yang sama maupun secara retroaktif terhadap data lama di database Turso. Keduanya otomatis dinormalkan ke `type = 'TRANSFER'`, dihubungkan dengan UUID `transferPairId`, dan dialihkan ke kategori `🔄 Pindah Uang` demi menjaga integritas operasional 100%.

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
     Terdapat 79 baris `Transfer-Out`. Kolom `Category` berfungsi sebagai **Target Account / Lokasi Wallet Tujuan** (contoh: Wallet Asal `BCA (Baim)` mentransfer ke Wallet Tujuan `Blu BCA (Emergency Funds)`). Transaksi ini diberi tipe `TRANSFER` dan dipasangkan dengan `transferPairId`.

### 2.6 Screenshot Transaksi & Struk Kasir (Multi-Format Images)
* **Karakteristik Dokumen:** Foto/Screenshot bukti transfer, QRIS, receipt minimarket, atau struk SPBU.
* **Peran Kunci Input Lokasi Wallet:** Karena struk kasir tidak memuat identitas rekening pengirim, **pilihan lokasi wallet yang dipilih user pada antarmuka saat upload menjadi sumber kebenaran utama (*source of truth*)**.

---

## 3. Dual-Input System Architecture & Monthly Dashboard Architecture

### 3.1 Dual-Input Ingestion Flow Pipeline
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

### 3.2 Monthly Multi-Dimensional Analytics Architecture (`/monthly`) with Strict Transfer Neutrality

Halaman `/monthly` beroperasi dengan arsitektur **Server Component** berkinerja tinggi, mengeksekusi agregasi SQL terisolasi di database Turso Edge. Seluruh transaksi `TRANSFER`, `transferPairId`, dan kategori `🔄 Pindah Uang` secara mutlak tidak dihitung dalam pemasukan atau pengeluaran operasional:

```
                  URL State: /monthly?month=YYYY-MM (e.g. /monthly?month=2026-08)
                                           │
                                           ▼
                            [ Server Component: page.tsx ]
                         (src/app/monthly/page.tsx)
                                           │
                  ┌────────────────────────┴────────────────────────┐
                  │ Drizzle ORM Indexed SQL Aggregations (Turso)    │
                  │ - getMonthlyKPISummary(month) [Strict Filter]   │
                  │ - getMonthlyDailyTimeline(month) [No Transfers] │
                  │ - getMonthlyCategoryBreakdown(month, type)      │
                  │ - getMonthlyTitleBreakdown(month, type)         │
                  │ - getMonthlyTransferFlow(month) [Dedicated Flow]│
                  └────────────────────────┬────────────────────────┘
                                           │
                                           ▼
                             [ UI LAYOUT COMPOSITION ]
                                           │
   ┌───────────────────────────────────────┴───────────────────────────────────────────────────┐
   │ 1. GLOBAL HEADER & MONTH SELECTOR                                                         │
   │    - Prev Month Button (◀) | Month Picker Popover | Next Month Button (▶)                 │
   │    - Quick Button "Bulan Ini"                                                             │
   ├───────────────────────────────────────────────────────────────────────────────────────────┤
   │ 2. GLOBAL KPI SUMMARY CARDS (Top Bar)                                                     │
   │    ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌─────────┐ ┌─────────┐ │
   │    │ Total Pemasukan  │ │ Total Pengeluaran│ │ Net Cash Flow    │ │ Savings │ │ Pindah  │ │
   │    │ (Operasional)    │ │ (Biaya Hidup Riil│ │ (Surplus/Defisit)│ │ Rate %  │ │ Uang    │ │
   │    │ Rp 41.932.429    │ │ Rp 30.909.488    │ │ +Rp 11.022.941   │ │ 26.3%   │ │ Rp 15 Jt│ │
   │    │ ▲ +12% MoM       │ │ ▼ -5% MoM        │ │ [Bebas Transfer] │ │         │ │ (6 trx) │ │
   │    └──────────────────┘ └──────────────────┘ └──────────────────┘ └─────────┘ └─────────┘ │
   ├───────────────────────────────────────────────────────────────────────────────────────────┤
   │ 3. THREE INTERACTIVE TABS (Shadcn UI Tabs)                                                │
   │    ┌─────────────────────────┬───────────────────────┬──────────────────────────────────┐ │
   │    │ 📊 Ringkasan Keseluruhan│ 🏷️ Per Kategori       │ 📝 Per Judul/Merchant (Operasi)  │ │
   │    └─────────────────────────┴───────────────────────┴──────────────────────────────────┘ │
   │                                                                                           │
   │  [TAB 1: KESELURUHAN]                                                                     │
   │  - Daily Cash Flow Chart (Batang/Area Tanggal 1-31: Pemasukan vs Pengeluaran murni)       │
   │  - Arus Kas Mingguan (Minggu 1 s/d 5)                                                     │
   │  - Rekapitulasi Aliran per Dompet/Rekening (Wallet Inflow vs Outflow)                     │
   │  - 🔄 TABEL MUTASI PINDAH UANG ANTAR-WALLET (Daftar pemindahan dana internal):            │
   │    Tanggal     Waktu    Akun Sumber ➔ Akun Tujuan               Nominal (IDR)   Catatan   │
   │    03/08/2026  14:20    BCA (Baim) ➔ Dana (Baim)                Rp 6.225.000    Topup     │
   │    05/08/2026  20:05    Dana (Baim) ➔ Blu BCA (Baim)            Rp    32.771    Tarik dana│
   │    08/08/2026  11:00    BCA (Baim) ➔ Blu BCA (Emergency Funds)  Rp13.000.000    Simpanan  │
   │                                                                                           │
   │  [TAB 2: PER KATEGORI]                                                                    │
   │  - Segmented Filter: [ Pengeluaran Riil ] | [ Pemasukan Riil ]                            │
   │  - Donut Chart Interaktif (Proporsi alokasi dana per kategori induk - Bebas Pindah Uang)  │
   │  - Hierarchical Accordion Table:                                                          │
   │    ▼ 💆 Pribadi & Kesehatan ............ Rp 1.450.000 (14.2%) [Progress Bar]              │
   │        • 🍭 Jajan .................. Rp 850.000 (58.6%)                                   │
   │        • 👕 Pakaian & Alas Kaki .... Rp 400.000 (27.6%)                                   │
   │        • 💄 Skincare / Makeup ...... Rp 200.000 (13.8%)                                   │
   │    ▶ 🚗 Transportasi & Kendaraan ....... Rp 1.120.000 (10.9%)                             │
   │    ▶ 🏠 Tempat Tinggal ................. Rp 4.500.000 (44.1%)                             │
   │                                                                                           │
   │  [TAB 3: PER JUDUL / MERCHANT]                                                            │
   │  - Search Bar Instan ("Cari judul mutasi, toko, merchant...")                             │
   │  - Leaderboard Peringkat Pengeluaran Terbesar (Hanya transaksi belanja/beban riil):        │
   │    #  Judul / Keterangan       Kategori      Freq   Rata2/Trx     Total   %               │
   │    1. SPBU Ngagel             Bahan Bakar    4x    Rp 100.000  Rp 400.000 3.9%            │
   │    2. McDonald's SOK          Jajan          3x    Rp  65.000  Rp 195.000 1.9%            │
   │    3. Kost Bulanan            Tempat Tinggal 1x    Rp2.500.000 Rp2.500.000 24%            │
   │  - Interaktivitas: Baris diklik membuka Sheet / Drawer detail mutasi individual           │
   └───────────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Automatic Contra-Transaction Pairing Pipeline (Inter-Wallet Auto-Reconciliation)

Fitur ini mengotomasi rekonsiliasi pemindahan dana antar-dompet pengguna agar tidak terjadi pencatatan ganda pengeluaran dan pemasukan saat berkas mutasi diimpor.

```
                    [ Extracted Normalized Transactions (Sen) ]
                                         │
                                         ▼
            [ Phase A: Intra-Batch Contra Detection (In-Memory) ]
            - Cocokkan baris dalam berkas yang sama:
              * amountCents sama persis
              * Status aliran dana berlawanan (1 Debit/EXPENSE vs 1 Kredit/INCOME)
              * Lokasi wallet berbeda (sourceAccountId !== targetAccountId)
              * Jendela Waktu Bertingkat (Multi-Resolution Time Window)
                                         │
                                         ▼
          [ Phase B: Cross-Batch Retroactive Matching (Query Turso DB) ]
          - Untuk transaksi yang belum berpasangan di staging:
            * Cari transaksi contra di DB pada akun berbeda, nominal sama
            * Waktu/tanggal cocok, dan transferPairId IS NULL
                                         │
                                         ▼
                 [ Confidence Scoring & Disambiguation Engine ]
            ┌────────────────────────────┴────────────────────────────┐
            ▼                                                         ▼
    [ Confidence: HIGH (1-to-1) ]                             [ Confidence: AMBIGUOUS (>1) ]
    - Pasangkan otomatis                                      - Tampilkan badge pemilihan pasangan
    - Set type='TRANSFER' & transferPairId                    - Biarkan pengguna memilih rekanan
    - Kategori: 🔄 Pindah Uang                                - Opsi 1-klik: "Batalkan Pasangan"
                                         │
                                         ▼
                         [ Staging Table UI Preview ]
                     - Badge: [🔄 Transfer Otomatis]
                     - Tooltip: Terhubung ke [Wallet B]
                     - Aksi inline unpair jika belanja biasa
                                         │
                                         ▼
                    [ Atomic Batch Commit Action (Turso DB) ]
              - Insert transaksi baru dengan type='TRANSFER'
              - Update transaksi lama di DB menjadi type='TRANSFER'
              - Link UUID transferPairId & sync saldo berjalan
```

#### 3.3.1 Kriteria & Resolusi Waktu Bertingkat (Hierarchical Smart Window)
1. **Timestamp Resolution (Mandiri, DANA, QRIS/Struk):** Jika kedua transaksi mencantumkan jam dan menit (misal: Mandiri `06:41:51` dan DANA `06:42`), pencocokan menggunakan toleransi jeda waktu perbankan (BI-Fast / Topup) sebesar **$\pm$ 15 menit**.
2. **Date-Only Resolution (BCA PDF, blu CSV):** Jika salah satu atau kedua dokumen hanya mencantumkan tanggal (seperti `05/08/2026` pada blu BCA CSV dan BCA PDF), pencocokan berlaku pada **tanggal kalender yang sama (`YYYY-MM-DD`)**.
3. **Penyelarasan Zona Waktu:** Seluruh pembandingan tanggal dikonversi secara presisi ke zona waktu `Asia/Jakarta` (WIB) untuk mencegah pergeseran hari akibat UTC offset.

#### 3.3.2 Normalisasi Status & Integritas Data
Ketika sepasang transaksi contra berhasil dipasangkan:
* Baris Pengirim (Debit): `type = 'TRANSFER'`, `targetAccountId = [Akun Penerima]`, `transferPairId = [UUID]`, `categoryId = [ID Kategori 🔄 Pindah Uang]`.
* Baris Penerima (Kredit): `type = 'TRANSFER'`, `targetAccountId = [Akun Pengirim]`, `transferPairId = [UUID]`, `categoryId = [ID Kategori 🔄 Pindah Uang]`.
* **Keaslian Jejak Audit:** Kolom `description` (keterangan asli dari mutasi bank/e-wallet) tetap dipertahankan 100% tanpa diubah.

---

## 4. Master Data, Schema Specification & Monthly Query Engine

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
* **Kategori Khusus / Pindah Uang:** `🍬 Uang Jajan`, `🔄 Pindah Uang`, `🏭Bisnis`, `😵‍💫 Lupa`, `🤯 Tidak Terduga`

### 4.3 Database Drizzle Schema (`src/db/schema.ts`)

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
  name: text('name').notNull().unique(), // e.g., '💆 Pribadi & Kesehatan', '⚙️ Penyesuaian Saldo', '🔄 Pindah Uang'
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
  dateIdx: index('idx_transactions_date').on(table.date),
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
export function toCents(rupiah: number): number {
  return Math.round(rupiah * 100);
}

export function fromCents(cents: number): number {
  return cents / 100;
}

export function formatIDR(cents: number, includeCents = false): string {
  const rupiah = fromCents(cents);
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: includeCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(rupiah);
}

export function excelSerialToDateTime(serial: number): { date: string; time: string } {
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

export function parseIndonesianNumber(val: string | number): number {
  if (typeof val === 'number') return val;
  if (!val) return 0;
  const sanitized = val.replace(/\./g, '').replace(',', '.').trim();
  const num = parseFloat(sanitized);
  return isNaN(num) ? 0 : num;
}
```

### 4.5 Monthly Analytics Data Access Layer with Transfer Neutrality (`src/lib/data/monthly-analytics.ts`)

Modul ini bertanggung jawab mengeksekusi agregasi SQL terisolasi di database Turso. **Seluruh transaksi pemindahan dana antar-dompet dieksklusikan dari kalkulasi operasional:**

```typescript
import { db } from '@/db';
import { transactions, categories, subcategories, accounts } from '@/db/schema';
import { sql, eq, and, like, desc, isNull, or, ne } from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';

export interface MonthlyKPISummary {
  yearMonth: string;
  totalIncomeCents: number; // Operasional murni (bebas transfer)
  totalExpenseCents: number; // Biaya hidup riil (bebas transfer)
  netCashflowCents: number; // Surplus / Defisit murni
  savingsRatePercentage: number;
  incomeMomDeltaPercentage: number;
  expenseMomDeltaPercentage: number;
  totalTransferVolumeCents: number; // Volume pemindahan dana internal
  transferCount: number; // Frekuensi transfer internal
}

export interface CategoryBreakdownItem {
  categoryId: string;
  categoryName: string;
  categoryIcon: string | null;
  totalCents: number;
  percentage: number;
  subcategories: {
    subcategoryId: string;
    subcategoryName: string;
    totalCents: number;
    percentageOfParent: number;
  }[];
}

export interface TitleBreakdownItem {
  title: string;
  categoryName: string;
  frequency: number;
  averageCents: number;
  totalCents: number;
  percentageOfTotal: number;
}

export interface DailyTimelinePoint {
  date: string; // YYYY-MM-DD
  dayNumber: number; // 1 - 31
  incomeCents: number; // Operasional murni
  expenseCents: number; // Operasional murni
  netCents: number;
}

export interface InterWalletTransferItem {
  id: string;
  date: string;
  time: string | null;
  sourceAccountName: string;
  targetAccountName: string;
  amountCents: number;
  description: string;
  note: string | null;
}

/**
 * Predikat SQL Operasional:
 * Transaksi dikecualikan jika tipe = 'TRANSFER', atau memiliki transferPairId,
 * atau berkategori '🔄 Pindah Uang'.
 */
const isTransferCondition = sql`(${transactions.type} = 'TRANSFER' OR ${transactions.transferPairId} IS NOT NULL OR ${categories.name} = '🔄 Pindah Uang')`;

/**
 * 1. Ambil ringkasan KPI bulanan terisolasi (Bebas Transfer) + Metrik Volume Transfer Internal.
 */
export async function getMonthlyKPISummary(yearMonth: string): Promise<MonthlyKPISummary> {
  const [currentYear, currentMonth] = yearMonth.split('-').map(Number);
  const prevDate = new Date(Date.UTC(currentYear, currentMonth - 2, 1));
  const prevYearMonth = `${prevDate.getUTCFullYear()}-${String(prevDate.getUTCMonth() + 1).padStart(2, '0')}`;

  // Stats Bulan Terpilih (Operasional murni)
  const currentStats = await db
    .select({
      income: sql<number>`COALESCE(SUM(CASE WHEN ${transactions.type} = 'INCOME' AND NOT ${isTransferCondition} THEN ${transactions.amount} ELSE 0 END), 0)`,
      expense: sql<number>`COALESCE(SUM(CASE WHEN ${transactions.type} = 'EXPENSE' AND NOT ${isTransferCondition} THEN ${transactions.amount} ELSE 0 END), 0)`,
      // Volume transfer dihitung single-sided (hanya sisi outflow/debit atau tipe TRANSFER)
      transferVolume: sql<number>`COALESCE(SUM(CASE WHEN (${transactions.type} = 'TRANSFER' OR (${transactions.type} = 'EXPENSE' AND ${isTransferCondition})) THEN ${transactions.amount} ELSE 0 END), 0)`,
      transferCount: sql<number>`COUNT(CASE WHEN (${transactions.type} = 'TRANSFER' OR (${transactions.type} = 'EXPENSE' AND ${isTransferCondition})) THEN 1 ELSE NULL END)`,
    })
    .from(transactions)
    .leftJoin(categories, eq(transactions.categoryId, categories.id))
    .where(like(transactions.date, `${yearMonth}%`));

  // Stats Bulan Sebelumnya untuk MoM
  const prevStats = await db
    .select({
      income: sql<number>`COALESCE(SUM(CASE WHEN ${transactions.type} = 'INCOME' AND NOT ${isTransferCondition} THEN ${transactions.amount} ELSE 0 END), 0)`,
      expense: sql<number>`COALESCE(SUM(CASE WHEN ${transactions.type} = 'EXPENSE' AND NOT ${isTransferCondition} THEN ${transactions.amount} ELSE 0 END), 0)`,
    })
    .from(transactions)
    .leftJoin(categories, eq(transactions.categoryId, categories.id))
    .where(like(transactions.date, `${prevYearMonth}%`));

  const curIncome = currentStats[0]?.income || 0;
  const curExpense = currentStats[0]?.expense || 0;
  const prevIncome = prevStats[0]?.income || 0;
  const prevExpense = prevStats[0]?.expense || 0;

  const netCashflow = curIncome - curExpense;
  const savingsRate = curIncome > 0 ? Math.round((netCashflow / curIncome) * 1000) / 10 : 0;

  const incomeMomDelta = prevIncome > 0 ? Math.round(((curIncome - prevIncome) / prevIncome) * 1000) / 10 : 0;
  const expenseMomDelta = prevExpense > 0 ? Math.round(((curExpense - prevExpense) / prevExpense) * 1000) / 10 : 0;

  return {
    yearMonth,
    totalIncomeCents: curIncome,
    totalExpenseCents: curExpense,
    netCashflowCents: netCashflow,
    savingsRatePercentage: savingsRate,
    incomeMomDeltaPercentage: incomeMomDelta,
    expenseMomDeltaPercentage: expenseMomDelta,
    totalTransferVolumeCents: currentStats[0]?.transferVolume || 0,
    transferCount: currentStats[0]?.transferCount || 0,
  };
}

/**
 * 2. Ambil agregasi per kategori induk dan subkategori (Eksklusif Operasional Murni).
 */
export async function getMonthlyCategoryBreakdown(
  yearMonth: string,
  type: 'EXPENSE' | 'INCOME' = 'EXPENSE'
): Promise<CategoryBreakdownItem[]> {
  const rows = await db
    .select({
      categoryId: categories.id,
      categoryName: categories.name,
      categoryIcon: categories.icon,
      subcategoryId: subcategories.id,
      subcategoryName: subcategories.name,
      totalCents: sql<number>`SUM(${transactions.amount})`,
    })
    .from(transactions)
    .leftJoin(categories, eq(transactions.categoryId, categories.id))
    .leftJoin(subcategories, eq(transactions.subcategoryId, subcategories.id))
    .where(
      and(
        like(transactions.date, `${yearMonth}%`),
        eq(transactions.type, type),
        sql`NOT ${isTransferCondition}` // Tidak menyertakan mutasi transfer/pindah uang
      )
    )
    .groupBy(categories.id, subcategories.id)
    .orderBy(desc(sql`SUM(${transactions.amount})`));

  const totalTypeCents = rows.reduce((acc, r) => acc + (r.totalCents || 0), 0);
  const categoryMap = new Map<string, CategoryBreakdownItem>();

  for (const r of rows) {
    const catId = r.categoryId || 'uncategorized';
    const catName = r.categoryName || 'Tanpa Kategori';

    if (!categoryMap.has(catId)) {
      categoryMap.set(catId, {
        categoryId: catId,
        categoryName: catName,
        categoryIcon: r.categoryIcon,
        totalCents: 0,
        percentage: 0,
        subcategories: [],
      });
    }

    const cat = categoryMap.get(catId)!;
    cat.totalCents += r.totalCents || 0;

    if (r.subcategoryId) {
      cat.subcategories.push({
        subcategoryId: r.subcategoryId,
        subcategoryName: r.subcategoryName || 'Lainnya',
        totalCents: r.totalCents || 0,
        percentageOfParent: 0,
      });
    }
  }

  const result = Array.from(categoryMap.values()).sort((a, b) => b.totalCents - a.totalCents);

  for (const cat of result) {
    cat.percentage = totalTypeCents > 0 ? Math.round((cat.totalCents / totalTypeCents) * 1000) / 10 : 0;
    for (const sub of cat.subcategories) {
      sub.percentageOfParent = cat.totalCents > 0 ? Math.round((sub.totalCents / cat.totalCents) * 1000) / 10 : 0;
    }
  }

  return result;
}

/**
 * 3. Ambil leaderboard agregasi judul/merchant operasional (Bebas Pindah Uang).
 */
export async function getMonthlyTitleBreakdown(
  yearMonth: string,
  type: 'EXPENSE' | 'INCOME' = 'EXPENSE'
): Promise<TitleBreakdownItem[]> {
  const rows = await db
    .select({
      title: sql<string>`TRIM(${transactions.description})`,
      categoryName: categories.name,
      frequency: sql<number>`COUNT(*)`,
      totalCents: sql<number>`SUM(${transactions.amount})`,
    })
    .from(transactions)
    .leftJoin(categories, eq(transactions.categoryId, categories.id))
    .where(
      and(
        like(transactions.date, `${yearMonth}%`),
        eq(transactions.type, type),
        sql`NOT ${isTransferCondition}` // Hanya transaksi beban/penghasilan riil
      )
    )
    .groupBy(sql`TRIM(${transactions.description})`)
    .orderBy(desc(sql`SUM(${transactions.amount})`));

  const totalCents = rows.reduce((acc, r) => acc + (r.totalCents || 0), 0);

  return rows.map((r) => {
    const freq = r.frequency || 1;
    const itemTotal = r.totalCents || 0;
    return {
      title: r.title || 'Tanpa Judul',
      categoryName: r.categoryName || 'Tanpa Kategori',
      frequency: freq,
      averageCents: Math.round(itemTotal / freq),
      totalCents: itemTotal,
      percentageOfTotal: totalCents > 0 ? Math.round((itemTotal / totalCents) * 1000) / 10 : 0,
    };
  });
}

/**
 * 4. Ambil timeline harian tanggal 1 s/d akhir bulan (Operasional Murni).
 */
export async function getMonthlyDailyTimeline(yearMonth: string): Promise<DailyTimelinePoint[]> {
  const [year, month] = yearMonth.split('-').map(Number);
  const daysInMonth = new Date(year, month, 0).getDate();

  const rows = await db
    .select({
      date: transactions.date,
      income: sql<number>`COALESCE(SUM(CASE WHEN ${transactions.type} = 'INCOME' AND NOT ${isTransferCondition} THEN ${transactions.amount} ELSE 0 END), 0)`,
      expense: sql<number>`COALESCE(SUM(CASE WHEN ${transactions.type} = 'EXPENSE' AND NOT ${isTransferCondition} THEN ${transactions.amount} ELSE 0 END), 0)`,
    })
    .from(transactions)
    .leftJoin(categories, eq(transactions.categoryId, categories.id))
    .where(like(transactions.date, `${yearMonth}%`))
    .groupBy(transactions.date);

  const rowMap = new Map(rows.map((r) => [r.date, r]));
  const timeline: DailyTimelinePoint[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${yearMonth}-${String(day).padStart(2, '0')}`;
    const entry = rowMap.get(dateStr);
    const inc = entry?.income || 0;
    const exp = entry?.expense || 0;
    timeline.push({
      date: dateStr,
      dayNumber: day,
      incomeCents: inc,
      expenseCents: exp,
      netCents: inc - exp,
    });
  }

  return timeline;
}

/**
 * 5. Ambil daftar mutasi perpindahan dana antar dompet (Inter-Wallet Transfers) untuk Tab 1.
 */
export async function getMonthlyTransferFlow(yearMonth: string): Promise<InterWalletTransferItem[]> {
  const targetAcc = alias(accounts, 'target_account');

  // Mengambil sisi debit / transfer-out dari mutasi transfer agar terdaftar single-sided
  const rows = await db
    .select({
      id: transactions.id,
      date: transactions.date,
      time: transactions.time,
      sourceAccountName: accounts.name,
      targetAccountName: sql<string>`COALESCE(${targetAcc.name}, ${transactions.note}, 'Akun Tujuan')`,
      amountCents: transactions.amount,
      description: transactions.description,
      note: transactions.note,
    })
    .from(transactions)
    .innerJoin(accounts, eq(transactions.accountId, accounts.id))
    .leftJoin(targetAcc, eq(transactions.targetAccountId, targetAcc.id))
    .leftJoin(categories, eq(transactions.categoryId, categories.id))
    .where(
      and(
        like(transactions.date, `${yearMonth}%`),
        sql`(${transactions.type} = 'TRANSFER' OR (${transactions.type} = 'EXPENSE' AND ${isTransferCondition}))`
      )
    )
    .orderBy(desc(transactions.date), desc(transactions.time));

  return rows;
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
- 🔄 Pindah Uang: (Khusus mutasi transfer antar dompet/rekening sendiri)
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

function deduplicateDanaTransactions(items: ExtractedItem[]): ExtractedItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const timeKey = item.time ? item.time.substring(0, 5) : '';
    const key = `${item.date}_${timeKey}_${item.amount}_${item.type}`;
    if (seen.has(key)) {
      return false;
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

  if (validated.institution === 'DANA') {
    validated.transactions = deduplicateDanaTransactions(validated.transactions);
  }

  return validated;
}
```

---

## 6. Granular Implementation Task List for Antigravity Agent

Setiap fase diselesaikan, diuji, dan divalidasi secara berurutan.

### Phase 1: Project Setup & Package Baseline (Next.js 16 + React 19 + Tailwind v4 + Shadcn UI + UI/UX Pro Max)
- [ ] **Task 1.1:** Inisialisasi Next.js 16+ App Router dengan TypeScript, Tailwind CSS v4, ESLint, dan direktori `src/`.
- [ ] **Task 1.2:** Inisialisasi Shadcn UI CLI (`npx shadcn@latest init`) dengan Tailwind v4 dan icon library Lucide React (`lucide-react`).
- [ ] **Task 1.3:** Instalasi dependensi inti produksi dan pengembangan:
  ```bash
  npm install @google/genai @libsql/client drizzle-orm zod zod-to-json-schema lucide-react exceljs msoffice-crypto zustand clsx tailwind-merge recharts cmdk framer-motion @fontsource/geist-sans @fontsource/jetbrains-mono
  npm install -D drizzle-kit dotenv vitest @testing-library/react @testing-library/jest-dom jsdom @playwright/test @tailwindcss/postcss
  ```
- [ ] **Task 1.4:** Setup 3-Layer Design System Tokens & Brand Pipeline:
  * Konfigurasi pedoman brand di `docs/brand-guidelines.md` sebagai single source of truth identitas visual.
  * Buat `assets/design-tokens.json` dengan hierarki 3-layer (Primitives -> Semantic OKLCH -> Component tokens).
  * Jalankan `node scripts/sync-brand-tokens.cjs` untuk mengompilasi ke `assets/design-tokens.css`.
  * Impor `assets/design-tokens.css` di `src/app/globals.css` dengan Tailwind CSS v4 `@theme inline`.
  * Konfigurasi font family `font-sans` (`Geist Sans`) dan `font-mono` (`JetBrains Mono` tabular figures).
  * Setup kelas utilitas Bento Grid (`.bento-card`, `.artisan-card`), micro-noise overlay (`.bg-artisan-noise`), dan hairline specular border.
- [ ] **Task 1.5:** Setup environment variables di `.env.example` dan `.env.local`:
  * `TURSO_DATABASE_URL`
  * `TURSO_AUTH_TOKEN`
  * `GEMINI_API_KEY`
  * `GEMINI_MODEL=gemini-2.5-flash`
- [ ] **Task 1.6:** Setup konfigurasi `vitest.config.ts` untuk pengujian TDD dan `playwright.config.ts` untuk E2E.
- [ ] **Task 1.7:** Konfigurasi `next.config.ts` dengan `serverActions: { bodySizeLimit: '20mb' }` untuk mendukung unggah dokumen statement besar.
- [ ] **Task 1.8:** Generate Bespoke Brand & Icon Assets via `.agents` Design Suite:
  * Jalankan `python .agents/skills/design/scripts/logo/generate.py` untuk memproduksi logo resmi Muara monogram 'M' (`public/brand/logo.svg`, `public/brand/logo-mark.svg`, `public/favicon.ico`).
  * Jalankan `python .agents/skills/design/scripts/icon/generate.py` (`gemini-3.1-pro-preview`) untuk memproduksi vektor SVG kustom: chip EMV kartu kredit (`src/components/icons/bespoke/emv-chip.tsx`), glyph tether transfer contra (`src/components/icons/bespoke/tether-link.tsx`), dan emblem perbankan.
  * Buat banner pratinjau media sosial OpenGraph 1200x630px di `public/brand/muara-og-card.png`.

---

### Phase 2: Database Layer, Seed & Taxonomy Initialization
- [ ] **Task 2.1:** Inisialisasi Turso client di `src/db/index.ts` menggunakan `@libsql/client`.
- [ ] **Task 2.2:** Tulis skema database lengkap di `src/db/schema.ts` (`accounts`, `categories`, `subcategories`, `transactions`, `importBatches`) dengan tipe `integer` satuan sen untuk seluruh nilai moneter dan index performa `dateIdx`.
- [ ] **Task 2.3:** Implementasikan modul utilitas presisi uang dan tanggal serial di `src/lib/money.ts` (`toCents`, `fromCents`, `formatIDR`, `excelSerialToDateTime`, `parseIndonesianNumber`).
- [ ] **Task 2.4:** Konfigurasi `drizzle.config.ts` untuk Turso/libSQL.
- [ ] **Task 2.5:** Buat skrip seeder komprehensif di `src/db/seed.ts` yang menginisialisasi:
  * 16 Rekening / Lokasi Wallet pengguna (termasuk Mandiri `1400019175927`, BCA `0501191549`, blu `000777929188`, DANA `081392366770`).
  * Taksonomi 12 kategori utama, kategori sistem `⚙️ Penyesuaian Saldo`, kategori `🔄 Pindah Uang`, dan puluhan subkategori ber-emoji.
- [ ] **Task 2.6:** Jalankan `npx drizzle-kit push` dan eksekusi seeder untuk mengisi database awal.

---

### Phase 3: Legacy "Money Manager" Master Importer
- [ ] **Task 3.1:** Buat parser migrasi di `src/lib/migration/money-manager-importer.ts` menggunakan `exceljs`:
  * Membaca sheet `Money Manager` dari `data-example/Money Manager - Excel.xlsx` (455 baris).
  * Mengonversi serial date number Excel (e.g. `46267.50351798611`) ke ISO date dan time via `excelSerialToDateTime()`.
  * Memetakan baris `Modified Bal.` ke kategori `⚙️ Penyesuaian Saldo` (type `INCOME` jika nilai positif, `EXPENSE` jika nilai negatif).
  * Konversi nilai uang kolom `IDR` / `Amount` ke satuan sen (`toCents`).
  * Menangani logika 79 transaksi `Transfer-Out`: tetapkan tipe `TRANSFER`, cari akun tujuan berdasarkan teks pada kolom `Category`, hubungkan dengan `targetAccountId`, dan buat pasangan `transferPairId`.
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
- [ ] **Task 4.5:** Bangun Modul Deteksi & Rekonsiliasi Transfer Otomatis di `src/lib/reconciliation/transfer-detector.ts`:
  * Mengimplementasikan pencocokan *Hierarchical Smart Window* ($\pm$ 15 menit jika ada jam:menit, atau tanggal sama `YYYY-MM-DD` jika hanya tanggal).
  * Menjalankan deteksi *Phase A (Intra-Batch In-Memory)* antar baris hasil ekstraksi.
  * Menjalankan deteksi *Phase B (Cross-Batch Retroactive)* mencocokkan baris staging dengan transaksi contra di database Turso yang belum berpasangan (`transferPairId IS NULL`).
  * Memberikan skor keyakinan (`HIGH` untuk pasangan 1-ke-1, `AMBIGUOUS` jika terdapat $>1$ kandidat pada hari yang sama).
- [ ] **Task 4.6:** Buat Server Action `ingestDocumentAction` di `src/actions/ingest-document-action.ts`:
  * Menerima `FormData` (`file`, `selectedAccountId`, opsional `filePassword`).
  * Menormalkan nominal ke satuan sen (`toCents`).
  * Menjalankan `detectContraTransfers()` untuk melabeli pasangan transfer sebelum mengembalikan data ke tabel staging.
  * Mencatat log batch di tabel `import_batches` dengan status `PENDING`.
- [ ] **Task 4.7:** Tulis unit test Vitest `tests/unit/gemini-parsers.test.ts` dengan mock data dokumen BCA, DANA, Blu BCA, dan Mandiri.

---

### Phase 5: Interactive Staging UI with Dual-Input (Upload + Wallet Location) & Zustand v5
- [ ] **Task 5.1:** Pasang komponen Shadcn UI yang dibutuhkan (`Button`, `Card`, `Select`, `Dialog`, `Table`, `Badge`, `Input`, `Checkbox`, `DropdownMenu`, `Tabs`, `Sheet`, `Progress`, `Accordion`).
- [ ] **Task 5.2:** Bangun Zustand Store di `src/store/use-staging-store.ts` untuk mengelola:
  * Daftar baris transaksi staging hasil ekstraksi AI.
  * Seleksi multi-baris (`selectedRowIds`).
  * Aksi inline edit sel (tanggal, nominal, kategori, akun).
  * Aksi `bulkReassignWallet(walletId, walletName)`.
  * Status validasi dan deteksi duplikasi *real-time*.
  * Manajemen pasangan transfer: `unpairTransfer(rowId)` dan `confirmTransferPair(rowId, candidateId)`.
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
  * **Badge Pasangan Transfer Otomatis:** Chip *Electric Indigo* `[🔄 Transfer Otomatis]` dengan tooltip akun rekanan, tombol 1-klik `[✕ Batalkan Pasangan]` untuk belanja biasa, dan popover pemilih rekanan untuk status `⚠️ AMBIGUOUS`.
- [ ] **Task 5.6:** Buat Server Action `commitBatchAction` di `src/actions/commit-batch-action.ts`:
  * Menulis seluruh baris transaksi yang disetujui ke tabel `transactions` dalam satu transaksi atomik Drizzle.
  * **Retroactive DB Pair Sync:** Jika transaksi baru berpasangan dengan transaksi lama di database, update transaksi lama secara atomik: set `type = 'TRANSFER'`, assign `transferPairId`, set `targetAccountId`, dan alihkan ke kategori `🔄 Pindah Uang`.
  * Menyesuaikan saldo berjalan (`currentBalance`) akun-akun terkait secara otomatis.
  * Memperbarui status `import_batches` menjadi `COMMITTED`.

---

### Phase 6: Financial Dashboard & Multi-Wallet Analytics with Strict Transfer Neutrality & Luxury UI/UX
- [ ] **Task 6.1:** Bangun Layout & Navigasi Dual-Mode di `src/app/layout.tsx` dan `src/components/layout/`:
  * **Desktop Sidebar (`sidebar.tsx`):** Desain Obsidian Glass ramping, dukungan mode collapse ke icon-only (72px) dengan animasi mulus, logo monogram kilau, dan indikator aktif emerald glow.
  * **Top Bar (`top-bar.tsx`):** Breadcrumbs dinamis, horizontal scrollable *quick wallet balance pills*, month selector, dan trigger Command Palette (`⌘K`).
  * **Global Command Palette (`command-menu.tsx`):** Menggunakan `cmdk` untuk pencarian instan transaksi, lompat ke dompet, dan pintasan navigasi cepat.
  * **Mobile Bottom Nav (`bottom-nav.tsx`):** Fixed iOS-style bottom bar dengan efek frosted glass (`backdrop-blur-xl bg-slate-950/85 border-t border-white/10`), 4 item navigasi berlabel teks mikro 10px, dan tombol aksi melayang (*floating quick action*).
- [ ] **Task 6.2:** Bangun Halaman Dashboard Utama di `src/app/page.tsx` berarsitektur Bento Grid:
  * **Hero Bento Card:** Total Kekayaan Bersih (*Net Worth* 16 akun) dengan efek angka *count-up* kinetik, komparasi MoM, dan mini-sparkline 30 hari terakhir.
  * **Wallet Carousel Bento:** Kartu dompet bergaya *credit-card sleek* (Mandiri Platinum, BCA Xpresi, DANA E-Wallet) dengan efek tilt hover halus dan indikator pulse status aktif.
  * **Cashflow Overview Bento:** Mini visualisasi perbandingan Pemasukan vs Pengeluaran murni bulan berjalan.
  * **Recent Activity Bento:** Tabel transaksi terakhir dengan avatar inisial merchant, pill kategori warna semantik, dan angka font-mono tabular.
  * **Quick Ingestion Micro-Dropzone:** Area dropzone praktis untuk upload mutasi langsung dari beranda.
- [ ] **Task 6.3:** Bangun Modul Data Access Layer `src/lib/data/monthly-analytics.ts` dengan query SQL terindeks & filter netralitas transfer:
  * `getMonthlyKPISummary(yearMonth)`: Menghitung total income & expense operasional murni (bebas transfer), net cashflow, savings rate %, MoM delta %, dan metrik terpisah `totalTransferVolumeCents` + `transferCount`.
  * `getMonthlyCategoryBreakdown(yearMonth, type)`: Agregasi kategori induk dan subkategori operasional murni (mengecualikan mutasi transfer / pindah uang).
  * `getMonthlyTitleBreakdown(yearMonth, type)`: Leaderboard judul/merchant operasional (bebas pindah uang) dengan frekuensi dan rata-rata.
  * `getMonthlyDailyTimeline(yearMonth)`: Data pergerakan kas tanggal 1 s/d 31 untuk grafik Recharts.
  * `getMonthlyTransferFlow(yearMonth)`: Mengambil daftar mutasi pemindahan dana antar rekening internal (Akun Asal ➔ Akun Tujuan, Tanggal, Nominal IDR).
- [ ] **Task 6.4:** Bangun Komponen Header & 4 Bento KPI Cards di `src/components/monthly/monthly-header.tsx`:
  * Month Navigator dengan tombol prev/next elegan, month-year picker dropdown, dan tombol pintas "Bulan Ini".
  * **4 Bento KPI Cards (Single-Row Grid):**
    1. *Total Pemasukan Operasional:* Pijar hijau emerald, nominal font-mono tebal, persentase MoM delta, dan mini-sparkline tren akumulasi.
    2. *Total Pengeluaran Operasional:* Pijar merah mawar, nominal font-mono tebal, persentase MoM delta, dan mini-sparkline burn rate.
    3. *Net Cashflow (Tabungan Bersih):* Pijar adaptif (hijau surplus / merah defisit), rasio tabungan (*savings rate %*), dan status likuiditas.
    4. *Volume Pindah Uang (Netral):* Pijar netral electric indigo, badge penjelas *"Bukan Pengeluaran/Pemasukan"*, total nominal mutasi internal (single-sided), dan jumlah transaksi.
  * Menerapkan animasi *count-up* kinetik pada seluruh angka KPI saat pergantian bulan.
- [ ] **Task 6.5:** Bangun Komponen Tab Ringkasan Keseluruhan di `src/components/monthly/monthly-overview-tab.tsx`:
  * **Recharts Ambient Glow Area Chart:** Kurva Bézier lembut pergerakan Income vs Expense harian (1-31) dengan gradien cahaya berpijar di bawah kurva, stroke 2.5px, dan custom frosted glass tooltip berlatar gelap.
  * Ringkasan Arus Kas Mingguan dalam format bento grid mini.
  * **Tabel Mutasi Pindah Uang Antar-Wallet:** Visualisasi elegan pemindahan likuiditas antar dompet internal (Tanggal, Badge Akun Asal ➔ Akun Tujuan, Nominal IDR monospace, Catatan).
- [ ] **Task 6.6:** Bangun Komponen Tab Per Kategori di `src/components/monthly/monthly-category-tab.tsx`:
  * Segmented Pill Switcher mewah: `[ 🔴 Pengeluaran Riil ]` dan `[ 🟢 Pemasukan Riil ]`.
  * **Dynamic Center-Stat Donut Chart:** Recharts donut dengan lubang tengah 70%, menampilkan total belanja di tengah secara default, dan bertransisi menampilkan nama kategori, nominal, serta persentase saat kursor meng-hover irisan.
  * **Hierarchical Accordion Bento:** Daftar kategori induk dengan progress bar proporsi alokasi warna dinamis, nominal font-mono, persentase alokasi, dan chevron animasi untuk membuka drill-down subkategori beserta riwayat transaksi terkait.
- [ ] **Task 6.7:** Bangun Komponen Tab Per Judul di `src/components/monthly/monthly-title-tab.tsx`:
  * Search Bar instan dengan icon search Lucide dan filter ranking dinamis.
  * **Merchant Leaderboard Table:** Menampilkan ranking medal/angka, avatar logo/inisial merchant, judul/keterangan mutasi beban riil, kategori terkait, frekuensi transaksi, rata-rata belanja, total nominal IDR (font-mono tabular), dan tombol rincian.
  * **Slide-over History Drawer (`title-detail-drawer.tsx`):** Sheet Radix berbalut kaca gelap yang meluncur mulus dari kanan saat baris diklik, menampilkan riwayat lengkap seluruh transaksi merchant tersebut pada bulan terkait.
- [ ] **Task 6.8:** Bangun Halaman Dashboard Bulanan Utama di `src/app/monthly/page.tsx`:
  * Server Component yang membaca searchParams `?month=YYYY-MM`.
  * Eksekusi paralel `Promise.all()` pada data access layer.
  * Skeleton shimmer wave loading state berkecepatan 1.5s untuk menjaga CLS < 0.05.
  * Merender Shadcn UI `Tabs` dengan transisi kinetik halus dan URL sync.
- [ ] **Task 6.9:** Bangun Halaman Manajemen Akun di `src/app/accounts/page.tsx`:
  * Grid bento 16 kartu rekening/dompet dengan gradien institusi perbankan, saldo terformat rapi, tombol penyesuaian saldo cepat, dan riwayat mutasi dompet.
- [ ] **Task 6.10:** Bangun Halaman Transaksi di `src/app/transactions/page.tsx`:
  * Tabel transaksi dense berkecepatan 60fps dengan sticky header dan hairline dividers.
  * Filter multi-dimensi (Lokasi Wallet, Rentang Tanggal, Kategori, Tipe Mutasi).
  * Modal/Sheet Tambah Transaksi Cepat (*Quick Add Transaction*) dengan input wajib Lokasi Wallet Sumber.
- [ ] **Task 6.11:** Bangun Generator Presentasi Keuangan Eksekutif (`slides` Skill Integration):
  * Buat modul generator `src/lib/export/executive-deck-generator.ts` yang mengompilasi agregasi bulanan ke dalam format HTML mandiri beranimasi Chart.js.
  * Terapkan struktur narasi eksekutif 5-slide (Executive Summary -> Net Cashflow Delta -> Expense Allocation -> Transfer Neutrality Audit -> Capital Runway).
  * Buat Server Action `exportExecutiveDeckAction(yearMonth)` di `src/actions/export-slides-action.ts` untuk men-generate dan mengunduh berkas `.html`.
  * Pasang tombol `[ 📊 Ekspor Presentasi Eksekutif ]` pada toolbar header `src/components/monthly/monthly-header.tsx`.

---

### Phase 7: Edge Resilience & Automated Testing (Vitest & Playwright)
- [ ] **Task 7.1:** Tulis pengujian unit Vitest komprehensif:
  * `tests/unit/money-precision.test.ts`: Uji presisi penambahan, pengurangan, dan konversi sen IDR tanpa desimal drift.
  * `tests/unit/transfer-isolation.test.ts`: Uji pembuktian bahwa transaksi bertipe `TRANSFER`, berelasi `transferPairId`, atau berkategori `🔄 Pindah Uang` bernilai 0 pada kalkulasi Total Income, Total Expense, dan Net Cashflow, serta memvalidasi keakuratan metrik single-sided transfer volume.
  * `tests/unit/transfer-detector.test.ts`: Uji mesin deteksi transfer contra (Intra-batch matching, Hierarchical Smart Window toleransi $\pm$ 15 menit vs tanggal kalender sama, scoring ambiguitas, dan retroaktif matching ke database).
  * `tests/unit/excel-decryptor.test.ts`: Uji dekripsi file `data-example/Mandiri-Agu-2026.xlsx` dengan password `"01042001"`.
  * `tests/unit/serial-date.test.ts`: Uji konversi tanggal serial Excel `46267.50351798611` menjadi `2026-09-02 12:05:03`.
  * `tests/unit/dana-deduplication.test.ts`: Uji eliminasi baris ganda DANA Saldo DANA.
  * `tests/unit/monthly-analytics.test.ts`: Uji keakuratan kalkulasi agregasi KPI bulanan, MoM delta, persentase kategori, dan ranking per judul.
  * `tests/unit/wallet-routing.test.ts`: Uji prioritas wallet pilihan user vs auto-detect AI.
- [ ] **Task 7.2:** Tulis pengujian E2E Playwright di `e2e/ingestion-flow.spec.ts` & `e2e/monthly-dashboard.spec.ts`:
  * Alur 1: Upload `data-example/BCA_AUG_2026.pdf` dengan Lokasi Wallet `BCA (Baim)` -> review staging -> commit -> cek saldo.
  * Alur 2: Upload `data-example/Dana.pdf` dengan `Auto-Detect by AI` -> verifikasi akun terdeteksi `Dana (Baim)` dan deduplikasi sukses.
  * Alur 3: Upload `data-example/Mandiri-Agu-2026.xlsx` dengan password `"01042001"` -> verifikasi 3 baris mutasi terurai dengan tanggal & jam lengkap.
  * Alur 4: Kunjungi `/monthly?month=2026-08`:
    * Verifikasi KPI Header menampilkan angka pemasukan & pengeluaran operasional murni.
    * Verifikasi transfer BCA ke DANA (Rp 6.225.000) masuk ke kartu informatif '🔄 Volume Pindah Uang' dan TIDAK menambah angka Total Pengeluaran.
    * Verifikasi tabel 'Mutasi Pindah Uang Antar-Wallet' pada Tab 1 memuat transfer internal tersebut.
    * Klik Tab 'Per Kategori' -> verifikasi kategori '🔄 Pindah Uang' tidak muncul di daftar beban pengeluaran.
    * Klik Tab 'Per Judul' -> verifikasi mutasi transfer internal tidak mengotori ranking pengeluaran.
  * Alur 5: Uji E2E Pemasangan Otomatis Lintas Dokumen (Cross-Batch Auto-Pairing):
    * Unggah `data-example/Dana.pdf` (memuat pengeluaran `Sendmoney -Rp32.771` pada 05/08) -> commit ke database.
    * Unggah `data-example/blubca_Agustus2026.csv` (memuat pemasukan `Dana Masuk Rp 32.771` pada 05/08) -> verifikasi tabel staging mendeteksi pasangan dan menampilkan badge `[🔄 Transfer Otomatis]`.
    * Commit batch -> verifikasi kedua transaksi di database kini berstatus `type = 'TRANSFER'` dan terhubung dengan `transferPairId`.
    * Kunjungi `/monthly?month=2026-08` -> verifikasi Total Pengeluaran dan Total Pemasukan TIDAK bertambah Rp 32.771.
- [ ] **Task 7.3:** Uji ketahanan kesalahan: file corrupt, password Excel salah, dan simulasi penanganan kuota Gemini API (HTTP 429).
- [ ] **Task 7.4:** Uji Kepatuhan Sistem Desain & Generator Presentasi (`.agents` Testing):
  * `tests/unit/token-validator.test.ts`: Uji otomatis untuk memastikan tidak ada *hardcoded hex color* pada komponen antarmuka inti dan seluruh token OKLCH terdefinisi.
  * `tests/unit/slide-generator.test.ts`: Uji unit untuk memvalidasi keluaran HTML generator presentasi eksekutif (memverifikasi struktur HTML, keberadaan skrip Chart.js, dan akurasi angka agregasi kas bulanan).

---

### Phase 8: Production Deployment (Vercel & Turso Cloud)
- [ ] **Task 8.1:** Sinkronkan skema Turso Production via `drizzle-kit push`.
- [ ] **Task 8.2:** Jalankan modul migrasi satu kali untuk mengimpor seluruh 455 transaksi historis dari `data-example/Money Manager - Excel.xlsx`.
- [ ] **Task 8.3:** Konfigurasikan Environment Variables pada dashboard Vercel (`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `GEMINI_API_KEY`, `GEMINI_MODEL`).
- [ ] **Task 8.4:** Jalankan build produksi (`next build`) dan pastikan zero error / warning. Lakukan uji coba live ingestion dan evaluasi halaman `/monthly` langsung pada domain Vercel.

---

## 7. World-Class Luxury Fintech UI/UX Specification (UI-UX-PRO-MAX)

Mengintegrasikan standar desain visual, ergonomi antarmuka, dan interaksi kinetik tingkat tinggi sekelas Linear, Stripe, Mercury, dan Apple Card ke seluruh aspek aplikasi Muara Money Manager.

### 7.1 Visual Philosophy & Design Identity
* **Aesthetic Identity:** **Obsidian Glass & Bento Grid (Dark Luxury)**.
* **Ambient Lighting:** Latar belakang *deep midnight canvas* (`#030712`) diperkaya dengan sentuhan *ambient radial mesh glow* halus (`radial-gradient(ellipse at 50% 0%, rgba(16, 185, 129, 0.04), transparent 70%)`).
* **Glass Surfaces:** Seluruh kartu modul data menggunakan permukaan kaca *frosted* (`rgba(15, 23, 42, 0.65)` + `backdrop-blur-xl`) dengan *hairline border* bergradasi cahaya halus (`border-white/[0.08]` hingga `hover:border-white/[0.18]`) dan bayangan berdimensi lembut (`shadow-[0_8px_32px_rgba(0,0,0,0.4)]`).
* **Visual Separation of Transfer:** Mutasi pemindahan dana antar-dompet dihiasi warna netral khusus (*Electric Indigo* `#6366F1`) untuk mengomunikasikan secara visual bahwa transfer bersifat netral terhadap laba/rugi operasional.

### 7.2 OKLCH Semantic Color Tokens (Tailwind CSS v4 `@theme inline`)
Didefinisikan pada `src/app/globals.css` dengan mapping `@theme inline`:
```css
:root {
  /* Slate Obsidian Dark Canvas */
  --background: oklch(0.12 0.015 260);          /* #030712 Deep midnight canvas */
  --foreground: oklch(0.98 0.005 260);          /* #F8FAFC Crisp white text */
  
  /* Bento Glass Cards */
  --card: oklch(0.16 0.02 260 / 0.75);           /* Frosted glass surface */
  --card-foreground: oklch(0.98 0.005 260);
  --card-border: oklch(1 0 0 / 0.08);           /* Hairline white border */
  --card-border-hover: oklch(1 0 0 / 0.18);
  
  /* Floating Overlays & Modals */
  --popover: oklch(0.14 0.02 260 / 0.95);
  --popover-foreground: oklch(0.98 0.005 260);
  
  /* Financial Semantics */
  --income-emerald: oklch(0.72 0.17 155);        /* #10B981 Mint Emerald */
  --income-emerald-glow: oklch(0.72 0.17 155 / 0.18);
  
  --expense-rose: oklch(0.65 0.22 15);           /* #F43F5E Coral Rose */
  --expense-rose-glow: oklch(0.65 0.22 15 / 0.18);
  
  --transfer-indigo: oklch(0.65 0.18 275);       /* #6366F1 Electric Indigo */
  --transfer-indigo-glow: oklch(0.65 0.18 275 / 0.18);
  
  --primary: oklch(0.75 0.16 85);                /* #F59E0B Warm Financial Gold */
  --primary-foreground: oklch(0.12 0.015 260);
  
  --muted: oklch(0.20 0.02 260 / 0.8);
  --muted-foreground: oklch(0.65 0.02 260);     /* #94A3B8 Muted slate */
  
  --border: oklch(0.28 0.02 260 / 0.45);
  --ring: oklch(0.72 0.17 155 / 0.5);            /* Emerald focus ring */
}
```

### 7.3 Tri-Stack Typography & Tabular Figure Standard
1. **UI Sans Font:** `Geist Sans` (fallback: `Inter`, system-ui).
   - Digunakan untuk seluruh navigasi, judul seksi, label formulir, tombol, dan teks deskripsi.
   - Karakter: *Tight tracking* (`-0.02em`), optical kerning dinamis, dan bobot semantik 400/500/600.
2. **Financial Mono Font:** `JetBrains Mono` (fallback: `Geist Mono`, monospace).
   - Digunakan untuk **seluruh angka mata uang, saldo dompet, tanggal transaksi, persentase data, dan label numerik chart**.
   - Menerapkan `font-variant-numeric: tabular-nums` bawaan agar setiap digit angka memiliki lebar identik, mengeliminasi efek goyang (*layout jitter*) pada tabel dan saat angka diperbarui.
3. **Visual Hierarchy Format Nilai Rupiah (Golden Format):**
   ```tsx
   <span className="inline-flex items-baseline font-mono">
     <span className="text-xs md:text-sm font-medium text-muted-foreground mr-1">Rp</span>
     <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-100 tabular-nums">
       12.450.000
     </span>
     <span className="text-xs font-mono text-muted-foreground ml-0.5">,00</span>
   </span>
   ```

### 7.4 Elevation & Bento Grid Layering
* **Layer 0 (Canvas):** `bg-[#030712]` dengan ambient radial mesh glow.
* **Layer 1 (Bento Grid):** Modular grid layout (`gap-4 md:gap-6`), kartu `.bento-card` dengan rounded-2xl (`16px`), glassmorphism, dan subtle lift hover (`hover:translate-y-[-2px]`).
* **Layer 2 (Sticky Shell):** Sidebar dan Top Navbar dengan `backdrop-blur-xl bg-[#030712]/80 border-b border-white/[0.08] z-30`.
* **Layer 3 (Overlays):** Modal dialog, Radix sheet drawer, dan Command Palette `⌘K` dengan `backdrop-blur-2xl bg-slate-950/90 border border-white/15 shadow-2xl z-50`.
* **Layer 4 (Tooltips):** Frosted glass tooltip dengan `bg-slate-950/95 border border-white/15 z-60`.

### 7.5 Recharts Data Visualization System (Ambient Glow Visuals)
1. **Cashflow Area Chart:**
   - Kurva Bézier lembut (`type="monotone"`), stroke 2.5px dengan gradien glow filter.
   - Area fill: `linear-gradient(180deg, rgba(16,185,129,0.22) 0%, rgba(16,185,129,0.0) 100%)`.
   - Custom Frosted Glass Tooltip menampilkan tanggal, nominal Rp, dan delta harian.
2. **Dynamic Center-Stat Donut Chart:**
   - Inner radius 70%, outer radius 90%.
   - Tengah donat menampilkan metrik interaktif: secara default memuat "Total Belanja Bulanan", dan berganti menampilkan nama kategori, nominal, dan persentase saat kursor menyentuh irisan donat tertentu.
   - Pemisah irisan 3px warna `#030712`.
3. **KPI Mini-Sparklines:**
   - Tertanam di pojok bawah kartu KPI (Pemasukan, Pengeluaran, Cashflow, Pindah Uang).
   - Menggambarkan dinamika tren 30 hari tanpa sumbu yang mengganggu visual.

### 7.6 Responsive Dual-Mode Navigation Architecture
1. **Desktop (> 768px):**
   - **Collapsible Sidebar:** Transisi mulus antara lebar 260px (expanded) ke 72px (collapsed icon-only). Monogram kilap dengan hover tooltips.
   - **Sticky Top Bar:** Breadcrumbs dinamis, horizontal scrollable *quick wallet balance pills*, month selector, dan trigger Command Palette (`⌘K`).
   - **Command Palette (`⌘K`):** Dialog pencarian instan mutasi, navigasi cepat antar-halaman, dan pintasan aksi upload via `cmdk`.
2. **Mobile (≤ 768px):**
   - **iOS-Style Bottom Navigation:** Fixed bar di bagian bawah layar dengan `backdrop-blur-xl bg-slate-950/85 border-t border-white/10`.
   - 4 Tab utama: Beranda, Bulanan, Transaksi, Ingestion.
   - Dilengkapi `pb-safe` untuk safe area iPhone home bar.

### 7.7 Kinetic Luxury & Micro-Interactions
1. **Number Count-Up Animation:** Nilai total saldo dan KPI bulanan beranimasi menghitung naik (*count-up*) secara presisi selama 600ms dengan kurva ease-out saat halaman dimuat atau bulan berganti.
2. **Skeleton Shimmer Wave:** Saat fetching data asynchronous, placeholder skeleton menggunakan latar `bg-slate-900/60` dengan efek kilau linear shimmer berulang (1.5s) untuk mempertahankan *Cumulative Layout Shift* (CLS < 0.05).
3. **Smooth Accordion & Tabs:** Transisi pembukaan subkategori dan perpindahan tab menggunakan durasi 200-300ms dengan kurva *cubic-bezier(0.16, 1, 0.3, 1)*.
4. **Live Pulse Ring:** Akun perbankan/e-wallet yang aktif menampilkan indikator titik hijau dengan cincin berpijar (`animate-ping`).

### 7.8 Accessibility & Performance Standards (Zero Regression)
* **Contrast Compliance:** Seluruh teks antarmuka memenuhi standar WCAG AA minimum 4.5:1 terhadap latar belakang gelap.
* **Keyboard Navigation:** Setiap tombol dan tautan memiliki indikator fokus yang jelas (`focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950`).
* **Motion Accessibility:** Seluruh animasi menghormati konfigurasi OS pengguna melalui media query `prefers-reduced-motion: reduce`.
* **Zero Emojis in UI Chrome:** Semua ikon navigasi, status, dan tombol wajib menggunakan SVG Lucide (`lucide-react`). Emoji hanya diizinkan sebagai label taksonomi kategori/subkategori pengguna.

### 7.9 Anti-AI Generic Design Principles & Bespoke Human Craft Guidelines

Section ini menetapkan standar wajib untuk mengeliminasi kesan template web generik buatan AI (*AI Generic Website*) dan menghadirkan karya pengerjaan tangan (*bespoke human craft*) tingkat tinggi yang setara dengan Linear, Stripe Press, Mercury, dan Apple Card.

#### 7.9.1 Anti-Cliché Blacklist & Human Craft Mandates
| AI Generic Cliché (❌ DILARANG KERAS) | Bespoke Human Craft Standard (✅ WAJIB DIGUNAKAN) | Implementasi Teknis |
| :--- | :--- | :--- |
| **Floating Gradient Blobs** | **Crisp Hairline Specular Borders & Micro-Noise** | `border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]` + SVG micro-noise overlay (1.8% opacity) |
| **Emoji-as-Icons** (`💰, 💳, 📈, 🚀`) | **Engineered 1.5px Vector Glyphs** | Lucide / Radix icons dengan fixed `strokeWidth={1.5}` dan monochrome/tonal tinting |
| **Symmetrical 3-Card Columns** | **Asymmetric Hierarchical Bento Grid** | 2x1 Hero Card + 1x1 Metric Cards + 1x1 Physical Bank Card + Full-Width Dense Ledger |
| **Unformatted Currency** (`Rp 10.500.000`) | **Tri-Scale Tabular Currency Hierarchy** | `Rp` (11px muted) + `10.500.000` (24-30px bold white tabular-nums) + `,00` (11px muted) |
| **Generic Marketing Buzzwords** | **Institutional Accounting Ledger Micro-Copy** | "Net Cashflow Delta", "Contra Offset Neutralized", "Intra-Account Transfer", "Unreconciled Staging" |
| **Generic Hover / 0ms Instant Snaps** | **Tactile Spring Physics** | `active:scale-[0.985] active:translate-y-[0.5px]` dengan `transition: transform 150ms cubic-bezier(0.16, 1, 0.3, 1)` |
| **Flat Generic Bank Badges** | **Authentic Physical Bank Card Metaphors** | Mandiri Platinum (brushed sheen + EMV chip SVG + masked `•••• 5927`), BCA Navy-Gold, DANA Cyan, Tunai Emerald |
| **Disjointed Transfer Rows** | **Contra-Pair Tether Link Indicator** | Interactive linked badge/line showing debit-credit connection; hovering highlights both counter-parties |

#### 7.9.2 Micro-Noise & Specular Surface Classes
```css
/* Noise Texture Background */
.bg-artisan-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.018'/%3E%3C/svg%3E");
}

/* Artisan Specular Bento Card */
.artisan-card {
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.06), 0 8px 32px 0 rgba(0, 0, 0, 0.4);
  border-radius: 1rem; /* 16px */
  transition: all 200ms cubic-bezier(0.16, 1, 0.3, 1);
}
.artisan-card:hover {
  border-color: rgba(255, 255, 255, 0.16);
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.12), 0 12px 40px 0 rgba(0, 0, 0, 0.5);
  transform: translateY(-2px);
}
```

#### 7.9.3 Tri-Scale Tabular Currency Component (`<TabularCurrency />`)
Dibuat di `src/components/ui/tabular-currency.tsx` untuk memastikan representasi moneter memiliki hierarki tipografi berkelas:
```tsx
import { cn } from "@/lib/utils";

interface TabularCurrencyProps {
  cents: number;
  size?: "sm" | "md" | "lg" | "hero";
  tone?: "neutral" | "positive" | "negative" | "transfer";
  className?: string;
}

export function TabularCurrency({ cents, size = "md", tone = "neutral", className }: TabularCurrencyProps) {
  const isNegative = cents < 0;
  const absCents = Math.abs(cents);
  const rupiah = Math.floor(absCents / 100);
  const sen = absCents % 100;
  const formattedRupiah = new Intl.NumberFormat("id-ID").format(rupiah);
  const formattedSen = sen.toString().padStart(2, "0");

  const sizeStyles = {
    sm: { prefix: "text-[10px]", main: "text-sm", sen: "text-[10px]" },
    md: { prefix: "text-xs", main: "text-lg", sen: "text-xs" },
    lg: { prefix: "text-xs", main: "text-2xl", sen: "text-xs" },
    hero: { prefix: "text-sm", main: "text-3xl sm:text-4xl", sen: "text-sm" },
  }[size];

  const toneStyles = {
    neutral: "text-slate-100",
    positive: "text-emerald-400",
    negative: "text-rose-400",
    transfer: "text-indigo-400",
  }[tone];

  return (
    <span className={cn("inline-flex items-baseline font-mono tabular-nums tracking-tight", className)}>
      {isNegative && <span className="mr-0.5 text-rose-400 font-bold">-</span>}
      <span className={cn("text-neutral-500 font-normal mr-0.5 select-none", sizeStyles.prefix)}>Rp</span>
      <span className={cn("font-bold tracking-tight", toneStyles, sizeStyles.main)}>{formattedRupiah}</span>
      <span className={cn("text-neutral-500 font-medium ml-0.5 select-none", sizeStyles.sen)}>,{formattedSen}</span>
    </span>
  );
}
```

#### 7.9.4 Asymmetric Bento Grid Blueprint for Monthly Dashboard (`/monthly`)
```text
+---------------------------------------------------------------------------------------------------+
| Top App Header: Period Picker (e.g. "Agustus 2026"), Quick Search, Action Shortcuts [Import][Sync] |
+---------------------------------------------------------------------------------------------------+
| BENTO ROW 1 (Asymmetric Metrics):                                                                 |
| +-----------------------------------------------+ +-----------------------+ +--------------------+ |
| | SLOT A: HERO NET DELTA (Col Span 2)          | | SLOT B: BURN RATE     | | SLOT C: TOP CAT.   | |
| | - Saldo Bersih: Rp 14.850.000,00 (+12.4%)     | | - Rata-rata harian:   | | - Makanan & Minuman| |
| | - Inflow / Outflow Micro Bar Progress         | |   Rp 245.000 / hari   | |   Rp 4.250.000     | |
| | - 30-Day Cumulative Mini Cashflow Sparkline   | | - Runway: 68 hari     | |   (31% of Outflow) | |
| +-----------------------------------------------+ +-----------------------+ +--------------------+ |
+---------------------------------------------------------------------------------------------------+
| BENTO ROW 2 (Bank Accounts & Neutrality Status):                                                  |
| +-----------------------+ +-----------------------------------------------------------------------+ |
| | SLOT D: XFER NEUTRAL  | | SLOT E: PHYSICAL BANK CARDS CAROUSEL / GRID                           | |
| | - Rp 18.500.000 (100%)| | +-----------------+ +-----------------+ +-----------------+           | |
| |   Contra-Paired Offset| | | Mandiri Platinum| | BCA Priority    | | DANA Premium    |           | |
| | - Zero Net Impact     | | | [Chip] •••• 5927| | [Logo] •••• 1042| | [Cyan] •••• 8821|           | |
| |   on Inflow / Outflow | | +-----------------+ +-----------------+ +-----------------+           | |
| +-----------------------+ +-----------------------------------------------------------------------+ |
+---------------------------------------------------------------------------------------------------+
| BENTO ROW 3 (Dense Transaction Ledger):                                                           |
| +-----------------------------------------------------------------------------------------------+ |
| | SLOT F: HIGH-DENSITY LEDGER (Col Span 4)                                                      | |
| | - Tabs: [Semua Transaksi] [Hanya Mutasi Riil] [Transfer Antar-Akun] [Kategori] [Per Judul]     | |
| | - Table Features: Sticky Date Dividers, Tabular Nums, Bank Badges, Contra Tether Links         | |
| | - Expandable Transaction Drawer for Split & Contra Reconciliation                             | |
| +-----------------------------------------------------------------------------------------------+ |
```

#### 7.9.5 Authentic Physical Bank Card Specifications (`<PhysicalBankCard />`)
- **Bank Mandiri Platinum:** Gradient `from-[#0d1e3a] via-[#162d55] to-[#0a1527]`, brushed platinum sheen, brass EMV chip vector (18x14px), masked account `•••• 5927`.
- **BCA Priority / Xpresi:** Gradient `from-[#081b3b] to-[#040d1e]`, ultra-fine 1px gold hairline border (`border-[#d4af37]/30`), crisp BCA vector emblem, masked `•••• 1042`.
- **DANA E-Wallet:** Deep cyan card `from-[#08355b] to-[#0b223d]`, subtle DANA blue ambient edge, masked phone `•••• 8821`.
- **Tunai / Cash Wallet:** Rich obsidian emerald weave `from-[#0d2319] to-[#06120d]`, banknote tactile texture.
- **Micro-Interactions:** `hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.5)] active:scale-[0.985] transition-all duration-200`.

#### 7.9.6 Contra-Pair Tether Indicator (`<ContraPairTether />`)
- Visualisasi hubungan transfer antar dua rekening dengan chip interaktif `[⇄ Contra-Paired #TR-8821]`.
- Hovering chip menyoroti (highlight) kedua baris transaksi berpasangan (debit & kredit) di tabel secara bersamaan.
- Drawer drill-down memverifikasi offset transfer antar-akun dengan status zero-sum: `Net Cash Impact: Rp 0,00`.

#### 7.9.7 Institutional Accounting Micro-Copy Dictionary
- Wajib menggunakan istilah akuntansi institusional terpercaya (`Net Cashflow Delta`, `Operating Outflow`, `Contra Offset`, `Contra-Pair Reconciled`, `Unreconciled Staging Ledger`).
- Larangan keras kata-kata hype marketing klise AI (*"AI magic"*, *"Supercharge your finances"*, *"Oops nothing here"*).

### 7.10 .agents Design Ecosystem Integration & Executive Slide Deck Engine

Section ini mendefinisikan integrasi arsitektural dari 7 keahlian desain `.agents` (`brand`, `design-system`, `ui-styling`, `design`, `banner-design`, `slides`, `ui-ux-pro-max`) ke dalam codebase Muara Money Manager.

#### 7.10.1 Automated 3-Layer Token Synchronization
Sistem desain menggunakan pipeline terotomatisasi yang menghubungkan pedoman visual ke kode produksi:
1. `docs/brand-guidelines.md`: Single Source of Truth filosofi brand, warna, dan tipografi.
2. `assets/design-tokens.json`: Deklarasi token terstruktur 3-layer (Primitives -> Semantic OKLCH -> Component).
3. `scripts/sync-brand-tokens.cjs`: Skrip Node.js yang membaca `design-tokens.json` dan menghasilkan `assets/design-tokens.css`.
4. `src/app/globals.css`: Mengimpor `assets/design-tokens.css` dan memetakan variabel ke Tailwind CSS v4 `@theme inline`.

#### 7.10.2 Bespoke Generative Asset Suite (`design`, `logo`, `icon`, `banner-design`)
Menggantikan seluruh dependensi gambar eksternal dan ikon generik dengan aset yang digenerate oleh AI bawaan `.agents`:
- **Logo Monogram Muara:** Dihasilkan via `python .agents/skills/design/scripts/logo/generate.py` ke `public/brand/logo.svg` dan `public/brand/logo-mark.svg`.
- **Ikon Vektor SVG Kustom:** Dihasilkan via `python .agents/skills/design/scripts/icon/generate.py` (`gemini-3.1-pro-preview`) menghasilkan teks XML SVG untuk chip EMV kuningan (`src/components/icons/bespoke/emv-chip.tsx`), rantai contra-tether, dan logo institusi perbankan.
- **OpenGraph Social Preview Card:** Banner 1200x630px di `public/brand/muara-og-card.png` yang dirancang dengan rasio safe-zone 80% untuk pratinjau sosial (WhatsApp, Twitter/X, LinkedIn).

#### 7.10.3 In-App Executive Monthly Deck Exporter (`slides` Skill Engine)
Modul pelaporan eksekutif yang memungkinkan pengguna mengekspor presentasi HTML mandiri dari halaman `/monthly`:
- **Engine Path:** `src/lib/export/executive-deck-generator.ts`
- **Pemicu UI:** Tombol `[ 📊 Ekspor Presentasi Eksekutif ]` pada toolbar `/monthly`.
- **Fitur Berkas HTML Ekspor:**
  * Berkas `.html` mandiri (*self-contained*) tanpa server dependencies; dapat dibuka secara offline di browser apapun.
  * Menggunakan pustaka Chart.js (UMD) dengan palet tema gelap Obsidian resmi.
  * Navigasi keyboard terintegrasi (Panah Kiri/Kanan, Spasi, Tombol `F` untuk Fullscreen).
  * Struktur narasi eksekutif 5-slide berbasis *Duarte Sparkline Arc*:
    1. *Slide 1: Executive Summary* — Total Kekayaan Bersih (Net Worth), periode pelaporan, dan ringkasan eksekutif.
    2. *Slide 2: Operating Cashflow Delta* — Pemasukan vs Pengeluaran murni, rasio tabungan (*savings rate %*), dan tren arus kas.
    3. *Slide 3: Expense Allocation & Burn Rate* — Donut chart proporsi kategori belanja dan daftar 5 pusat biaya terbesar.
    4. *Slide 4: Transfer Neutrality Audit* — Pembuktian rekonsiliasi transfer antar-akun internal dengan *Net Impact: Rp 0,00*.
    5. *Slide 5: Capital Runway & Outlook* — Estimasi daya tahan likuiditas (hari runway), analisis MoM velocity, dan proyeksi bulan depan.

---

## 8. Directory Structure Reference

```text
├── .env.example
├── drizzle.config.ts
├── next.config.ts
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── vitest.config.ts
├── docs/                                     # Dokumentasi & Panduan Brand Resmi
│   └── brand-guidelines.md                   # Single Source of Truth Identitas Brand & Voice
├── assets/                                   # Sumber Aset & Desain Token 3-Layer
│   ├── design-tokens.json                    # Deklarasi Token Primitives -> Semantic -> Component
│   └── design-tokens.css                     # Compiled CSS Variables untuk Tailwind v4 & Slides
├── scripts/                                  # Skrip Otomasi & Sinkronisasi Token
│   └── sync-brand-tokens.cjs                 # Generator sinkronisasi design-tokens.json -> CSS
├── design-system/                            # Master Design System (UI-UX-PRO-MAX)
│   └── muara-money-manager/
│       ├── MASTER.md                         # Panduan Arsitektur Desain, Anti-Cliché & Token OKLCH
│       └── pages/                            # Override spesifik per halaman
├── public/
│   ├── favicon.ico
│   └── brand/                                # Logo Resmi & Aset Grafis Pre-Generated
│       ├── logo.svg                          # Logo Lockup Muara
│       ├── logo-mark.svg                     # Monogram 'M' Icon Only
│       └── muara-og-card.png                 # OpenGraph Social Preview Banner (1200x630px)
├── data-example/                             # Fixture contoh dokumen mutasi aktual pengguna
│   ├── BCA_AUG_2026.pdf                      # Statement BCA Tahapan Xpresi
│   ├── Dana.pdf                              # Statement DANA Riwayat Aktivitas
│   ├── blubca_Agustus2026.csv                # Statement CSV blu by BCA Digital
│   ├── Mandiri-Agu-2026.xlsx                 # Statement Excel Mandiri terenkripsi sandi "01042001"
│   └── Money Manager - Excel.xlsx            # Master migrasi 455 transaksi historis
├── e2e/
│   ├── ingestion-flow.spec.ts                # Pengujian E2E Playwright alur upload & commit
│   └── monthly-dashboard.spec.ts             # Pengujian E2E Playwright Dashboard Bulanan (Uji Netralitas Transfer)
├── src/
│   ├── app/
│   │   ├── globals.css                       # OKLCH Semantic Tokens + Tailwind v4 @theme inline + Bento styles
│   │   ├── layout.tsx                        # App Shell, Font Ingestion, & Sidebar responsif
│   │   ├── page.tsx                          # Dashboard ringkasan finansial utama (Net Worth Hero Bento)
│   │   ├── monthly/
│   │   │   └── page.tsx                      # Halaman Dashboard Bulanan (?month=YYYY-MM)
│   │   ├── import/
│   │   │   └── page.tsx                      # Halaman Dual-Input (Wallet Selector + Dropzone + Staging Table)
│   │   ├── transactions/
│   │   │   └── page.tsx                      # Daftar transaksi, filter lokasi wallet, quick add
│   │   └── accounts/
│   │       └── page.tsx                      # Grid 16 rekening, saldo, & transfer reconciliation
│   ├── actions/
│   │   ├── ingest-document-action.ts         # Server action Gemini extraction dengan konteks wallet & DANA deduplication
│   │   ├── commit-batch-action.ts            # Server action batch insert transaksi atomik ke Turso
│   │   ├── migration-action.ts               # Server action migrasi 455 baris berkas Money Manager
│   │   ├── export-slides-action.ts           # Server action export presentasi eksekutif HTML (slides skill)
│   │   └── transaction-actions.ts            # CRUD mutasi transaksi manual
│   ├── components/
│   │   ├── ui/                               # Shadcn UI: Button, Card, Dialog, Table, Badge, Select, Tabs, Sheet, Accordion, Progress
│   │   ├── icons/
│   │   │   └── bespoke/                      # Vektor SVG Kustom (.agents icon/design generator):
│   │   │       ├── emv-chip.tsx              # Brass EMV chip vector untuk kartu bank
│   │   │       ├── tether-link.tsx           # Indikator rantai contra-tether transfer
│   │   │       └── bank-crests.tsx           # Vektor emblem Mandiri, BCA, DANA, Cash
│   │   ├── layout/                           # Komponen Navigasi Dual-Mode:
│   │   │   ├── sidebar.tsx                   # Desktop Collapsible Sidebar (260px -> 72px)
│   │   │   ├── top-bar.tsx                   # Sticky Top Bar dengan quick wallet pills & month selector
│   │   │   ├── command-menu.tsx              # Global Command Palette (⌘K via cmdk)
│   │   │   └── bottom-nav.tsx                # iOS-Style Mobile Bottom Navigation Bar
│   │   ├── dashboard/                        # NetWorthHeroBento, WalletCarousel, CashflowBento, RecentActivityBento
│   │   ├── monthly/                          # Komponen Khusus Dashboard Bulanan:
│   │   │   ├── monthly-header.tsx            # Month Navigator, Month-Year Picker, 4 Bento KPI Cards, Tombol Ekspor Presentasi
│   │   │   ├── monthly-overview-tab.tsx      # Tab 1: Recharts Glow Area Chart & Inter-Wallet Transfers Flow Table
│   │   │   ├── monthly-category-tab.tsx      # Tab 2: Dynamic Center-Stat Donut Chart & Hierarchical Subcategory Accordion
│   │   │   ├── monthly-title-tab.tsx         # Tab 3: Merchant Leaderboard Table & Instant Search (Bebas Transfer)
│   │   │   └── title-detail-drawer.tsx       # Slide-over Drawer rincian mutasi per judul terpilih
│   │   └── import/                           # WalletSelector, BentoDropzone, StagingTable, PasswordDialog
│   ├── store/
│   │   └── use-staging-store.ts              # Zustand v5 store untuk staging table & bulk actions
│   ├── db/
│   │   ├── index.ts                          # Inisialisasi Turso libSQL client
│   │   ├── schema.ts                         # Drizzle ORM Schema (accounts, categories, transactions, etc.)
│   │   └── seed.ts                           # Seeder 16 akun & taksonomi kategori hierarkis
│   ├── lib/
│   │   ├── data/
│   │   │   └── monthly-analytics.ts          # SQL aggregation data access layer terisolasi (Bebas Transfer)
│   │   ├── export/
│   │   │   └── executive-deck-generator.ts   # Generator presentasi HTML mandiri berbasis Chart.js (slides skill)
│   │   ├── money.ts                          # Utilitas konversi Sen <-> IDR, Excel Serial Date, & Number Parser
│   │   ├── gemini/
│   │   │   ├── schema.ts                     # Strict Zod JSON output schema
│   │   │   ├── prompts.ts                    # System prompt builder dengan injeksi lokasi wallet
│   │   │   └── extractor.ts                  # @google/genai caller dengan responseJsonSchema & DANA post-filter
│   │   ├── parser/
│   │   │   ├── file-preprocessor.ts          # Normalisasi format PDF, CSV, Gambar
│   │   │   └── excel-decryptor.ts            # Handler in-memory msoffice-crypto + exceljs multi-row merger
│   │   ├── reconciliation/
│   │   │   └── transfer-detector.ts          # Mesin deteksi pasangan contra intra-batch & database retroaktif
│   │   ├── migration/
│   │   │   └── money-manager-importer.ts     # Parser 455 baris transaksi historis dengan serial date conversion
│   │   └── utils.ts                          # Utility cn(), formatIDR(), konversi tanggal Indonesia
│   └── types/
│       └── index.ts                          # Tipe data TypeScript global
└── tests/
    ├── unit/
    │   ├── money-precision.test.ts
    │   ├── transfer-isolation.test.ts        # Uji netralitas mutasi transfer terhadap income/expense
    │   ├── transfer-detector.test.ts         # Uji mesin deteksi pasangan contra & multi-resolution window
    │   ├── token-validator.test.ts           # Uji kepatuhan token design-tokens.json dan bebas hardcoded hex
    │   ├── slide-generator.test.ts           # Uji validitas keluaran HTML ekspor presentasi eksekutif
    │   ├── serial-date.test.ts
    │   ├── excel-decryptor.test.ts
    │   ├── dana-deduplication.test.ts
    │   ├── monthly-analytics.test.ts
    │   ├── gemini-parsers.test.ts
    │   └── money-manager-migration.test.ts
    └── integration/
```

---

## 9. Critical Instructions for Antigravity Agent Execution

1. **Prioritas Konteks Lokasi Wallet:** Jika pengguna memilih lokasi wallet tertentu pada antarmuka (`selectedAccountId !== 'AUTO_DETECT'`), nilai ini memiliki preseden mutlak lebih tinggi daripada tebakan AI pada dokumen umum atau struk belanja kasir. Namun, jika dokumen adalah mutasi perbankan multi-akun resmi yang secara eksplisit memuat nomor rekening berbeda, AI wajib memberi tanda peringatan diskrepansi pada tabel *staging*.
2. **Aturan Presisi Nilai Moneter (Integer Sen):** Nilai rupiah di database **wajib** disimpan sebagai bilangan bulat positif absolut dalam satuan sen (`integer` di Drizzle, IDR x 100). Arah aliran dana ditentukan oleh kolom `type` (`EXPENSE`, `INCOME`, `TRANSFER`). Tidak boleh ada nilai floating point tersimpan di kolom moneter database Turso. Seluruh kalkulasi agregasi analitik bulanan dilakukan dalam sen sebelum diformat ke format tampilan `formatIDR()`.
3. **Aturan Netralitas Mutasi Transfer (Strict Transfer Neutrality):**
   - Transaksi dengan `type = 'TRANSFER'`, atau yang memiliki pasangan `transferPairId`, atau yang berada pada kategori `🔄 Pindah Uang` **DILARANG KERAS** dihitung ke dalam Total Pemasukan, Total Pengeluaran, Net Cashflow (Surplus/Defisit), Donut Chart Kategori, maupun Leaderboard Judul pada Dashboard Bulanan.
   - Mutasi transfer hanya boleh dihitung pada metrik terpisah (*Volume Pindah Uang*) dan disajikan secara transparan pada tabel *Mutasi Pindah Uang Antar-Wallet* di Tab 1.
   - Jika transaksi transfer memiliki biaya admin (misal transfer beda bank Rp 2.500), biaya admin tersebut dicatat terpisah sebagai baris `EXPENSE` bertipe `Biaya Admin`, sehingga beban admin tetap terhitung sebagai biaya hidup riil.
4. **Optimasi Performa Dashboard Bulanan (`/monthly`):** Halaman `/monthly` harus menggunakan arsitektur Server Component. Dilarang mengambil seluruh data mentah transaksi ke client browser; semua kalkulasi SUM, COUNT, MoM delta, pengelompokan kategori induk, dan pengelompokan judul harus dilakukan melalui modul `src/lib/data/monthly-analytics.ts` di database Turso.
5. **Dekripsi Mandiri In-Memory dengan Password `"01042001"`:** Penanganan file `data-example/Mandiri-Agu-2026.xlsx` harus menggunakan `msoffice-crypto` yang mendekripsi stream ke memori dan dibaca langsung via `exceljs`. Gabungkan baris tanggal dan jam ke dalam satu nilai ISO datetime sebelum dikirim ke AI.
6. **Deduplikasi Dokumen DANA:** Terapkan aturan konsolidasi ganda DANA baik pada system prompt maupun post-filter `deduplicateDanaTransactions()` di Server Action agar mutasi belanja merchant tidak terhitung ganda akibat baris rincian `Saldo DANA`.
7. **Konversi Serial Date Money Manager:** Kolom `Date` pada `Money Manager - Excel.xlsx` berupa floating-point serial date (contoh: `46267.50351798611`). Wajib menggunakan formula `excelSerialToDateTime()` untuk mengonversinya ke ISO UTC `YYYY-MM-DD HH:mm:ss`. Transaksi `Modified Bal.` dipetakan ke kategori `⚙️ Penyesuaian Saldo`.
8. **Resiliensi Kuota Gemini API:** Implementasikan penanganan error kuota (HTTP 429) dengan *exponential backoff* otomatis pada `src/lib/gemini/extractor.ts` agar pemrosesan batch dokumen tidak gagal ketika batas rate limit tercapai.
9. **Prioritas Migrasi Riwayat Historis:** Jalankan Phase 3 (impor `Money Manager - Excel.xlsx`) terlebih dahulu ke database Turso sebelum menguji impor file mutasi bulanan baru agar 16 akun dan taksonomi kategori terinisialisasi dengan riwayat saldo yang konsisten.
10. **Rekonsiliasi Transfer Dua Arah:** Hubungkan transaksi antar rekening internal (misal: pengeluaran di `Dana (Baim)` yang berpasangan dengan penerimaan di `Blu BCA (Baim)`) dengan `transferPairId` agar tidak terjadi pembukuan ganda pengeluaran pada laporan bulanan.
11. **World-Class UI/UX Fidelity & Zero Aesthetic Regression (UI-UX-PRO-MAX Standard):**
    - Setiap komponen UI wajib mematuhi panduan [MASTER.md](file:///C:/bima/Projects/NextJS/muara-money-manager-2/design-system/muara-money-manager/MASTER.md).
    - Seluruh kartu modul data harus menggunakan kelas `.bento-card` dengan *frosted glass backdrop blur*, *hairline border*, dan radius sudut 16px (`rounded-2xl`).
    - Dilarang keras menggunakan emoji sebagai ikon tombol, header navigasi, atau indikator status (wajib menggunakan SVG Lucide).
    - Kontras teks harus selalu >= 4.5:1 (WCAG AA).
12. **Tabular Monospace Standard for Financial Figures:**
    - Seluruh representasi angka mata uang (Rupiah), saldo rekening, dan persentase wajib menggunakan font monospace tabular (`JetBrains Mono` / `font-mono tabular-nums`).
    - Dilarang menampilkan angka nominal finansial dengan font proporsional standar guna menjamin kestabilan posisi digit (*zero horizontal jitter*).
13. **Aturan Deteksi & Rekonsiliasi Transfer Otomatis Kontra (Contra-Transaction Pairing Rule):**
    - Setiap proses ekstraksi dokumen atau commit transaksi baru wajib melewatkan data melalui modul `src/lib/reconciliation/transfer-detector.ts`.
    - Transaksi debit dan kredit yang bernominal sen identik, berlawanan arah, pada akun berbeda, dan berada dalam jendela waktu bertingkat (toleransi $\pm$ 15 menit jika ada jam:menit, atau tanggal kalender sama jika hanya tanggal) **wajib otomatis dipasangkan**.
    - Saat commit, transaksi baru disimpan dengan `type = 'TRANSFER'`, dan jika berpasangan dengan transaksi lama di database Turso yang sebelumnya tercatat sebagai `EXPENSE` atau `INCOME`, transaksi lama tersebut **wajib di-update secara atomik** menjadi `type = 'TRANSFER'`, dipetakan `transferPairId` yang sama, dan dialihkan ke kategori `🔄 Pindah Uang` demi menjaga netralitas transfer 100%.
14. **Anti-AI Generic Design Integrity & Bespoke Craft Execution:**
    - Setiap komponen antarmuka dilarang keras menggunakan template klise AI (dilarang floating gradient blur orbs, dilarang emoji sebagai icon tombol/header, dilarang card grid 3 kolom simetris, dilarang raw unstyled currency).
    - Wajib menerapkan spesifikasi Section 7.9 dan [MASTER.md](file:///C:/bima/Projects/NextJS/muara-money-manager-2/design-system/muara-money-manager/MASTER.md): kartu bento hairline specular (`.artisan-card`), micro-noise background (`.bg-artisan-noise`), komponen `<TabularCurrency />` 3-part hierarchy, visual kartu bank fisik otentik (`<PhysicalBankCard />`), tautan interaktif `<ContraPairTether />`, transisi fisik pegas (`active:scale-[0.985]`), dan micro-copy akuntansi institusional profesional.
15. **Integrasi Ekosistem Brand & Desain .agents:**
    - Seluruh perubahan desain dan penambahan komponen UI wajib mengacu pada Single Source of Truth di [docs/brand-guidelines.md](file:///C:/bima/Projects/NextJS/muara-money-manager-2/docs/brand-guidelines.md) dan hierarki 3-layer tokens di `assets/design-tokens.json`.
    - Sinkronisasi token wajib dijalankan via `node scripts/sync-brand-tokens.cjs` sebelum build untuk memastikan konsistensi CSS variables pada `src/app/globals.css`.
    - Logo dan aset ikon institusional (chip EMV, contra-tether) wajib menggunakan aset SVG lokal pre-generated dari `public/brand/` dan `src/components/icons/bespoke/` (tanpa gambar stok atau dependensi CDN eksternal).
    - Fitur ekspor slide bulanan di `/monthly` wajib menggunakan generator mandiri `src/lib/export/executive-deck-generator.ts` dengan rendering visual Chart.js yang kompatibel offline.


