# Brand Guidelines: Muara Money Manager

**Version:** 1.0.0  
**Status:** Official Source of Truth  
**Ecosystem:** .agents Brand & Design Engineering Monolith  

---

## 1. Brand Core & Identity

### 1.1 Brand Purpose
Muara Money Manager adalah platform manajemen keuangan personal dan pencatatan kas multi-rekening berstandar perbankan institusional. Nama **Muara** melambangkan titik temu alami seluruh aliran dana (perbankan, e-wallet, aset investasi, dan kas fisik) yang bermuara menjadi satu kebenaran pembukuan yang jernih, akurat, dan berdaya guna tinggi.

### 1.2 Core Attributes
1. **Institutional Precision:** Setiap angka dicatat dalam satuan bilangan bulat sen mutlak, dipisahkan secara akuntansi murni (netralitas transfer), dan disajikan dengan angka tabular presisi tanpa toleransi pembulatan semu.
2. **Artisan Restraint:** Menghindari tren visual AI generik yang murah (tidak ada floating neon blobs, tidak ada emoji pada UI chrome). Kemewahan dicapai melalui kanvas obsidian pekat, specular hairline border, dan micro-grain noise fisik.
3. **Discretion & Edge Privacy:** Data mutasi dan sandi rekening diproses secara aman di memori (in-memory decryption), mematuhi enkripsi edge, dan informasi rekening selalu terlindungi dengan masking institusional (`•••• 5927`).
4. **Kinetic Elegance:** Interaksi pengguna terasa berbobot dan nyata melalui *tactile spring physics* (`active:scale-[0.985]`) dan transisi halus (150ms ease-out).

---

## 2. Voice & Tone Framework

### 2.1 Brand Voice Principles
- **Otoritatif & Analitis:** Berbicara layaknya laporan auditor atau ringkasan perbankan private wealth.
- **Tenang & Dingin:** Menghindari nada panik saat pengeluaran membengkak, dan menghindari euforia berlebihan saat surplus kas bertambah.
- **Transparan & Langsung:** Menjelaskan status keuangan apa adanya tanpa istilah pemasaran yang membingungkan.

### 2.2 Voice Matrix (Do vs. Don't)
| Konteks | Disarankan (Approved Muara Voice) | Dilarang (Generic AI Voice) |
| :--- | :--- | :--- |
| **Status Saldo Bulanan** | "Surplus Operasional Bersih bulan ini adalah Rp 14.850.000 (Savings Rate: 38%)." | "Kerja bagus! Tabunganmu melesat tinggi! Supercharge your finances!" |
| **Transfer Antar-Akun** | "Mutasi pemindahan kas sebesar Rp 18.500.000 dinetralkan dari perhitungan beban pengeluaran." | "Uangmu berpindah seperti sulap! Cek saldo barumu sekarang!" |
| **Deteksi Transaksi Kontra** | "Dua transaksi kontra debit-kredit terdeteksi pada nominal identik dan telah dipasangkan otomatis." | "AI pintar kami menemukan pasangan mutasimu secara ajaib!" |
| **Status Tanpa Data (Empty)** | "Belum ada mutasi tercatat pada periode ini. Tarik e-Statement atau impor berkas mutasi untuk memulai audit." | "Oops! Masih kosong nih! Mulai petualangan finansialmu!" |

---

## 3. Color Palette & Semantic System

### 3.1 Color Primitives (Layer 1)
- **Obsidian Black (Canvas):** `#030712` (oklch: `0.12 0.015 260`)
- **Frosted Slate (Surface):** `#0f172a` (oklch: `0.16 0.02 260`)
- **Mint Emerald (Inflow / Surplus):** `#10B981` (oklch: `0.72 0.17 155`)
- **Coral Rose (Outflow / Deficit):** `#F43F5E` (oklch: `0.65 0.22 15`)
- **Electric Indigo (Transfer Neutrality):** `#6366F1` (oklch: `0.65 0.18 275`)
- **Warm Gold (Primary Accent / Wealth):** `#F59E0B` (oklch: `0.75 0.16 85`)
- **Pure Crisp White (Typography):** `#F8FAFC` (oklch: `0.98 0.005 260`)
- **Muted Hairline Gray:** `rgba(255, 255, 255, 0.08)`

### 3.2 Semantic Token Hierarchy (Layer 2)
```css
:root {
  --bg-canvas: var(--color-obsidian-black);
  --surface-card: var(--color-frosted-slate);
  --status-inflow: var(--color-mint-emerald);
  --status-outflow: var(--color-coral-rose);
  --status-transfer: var(--color-electric-indigo);
  --accent-gold: var(--color-warm-gold);
  --text-main: var(--color-crisp-white);
  --border-hairline: var(--color-hairline-gray);
}
```

---

## 4. Typography Standards

1. **Brand Display & Interface Font:** `Geist Sans`
   - Digunakan untuk: Navigation, Section Titles, Table Headers, Form Labels, dialogs, dan status badges.
   - Karakter: Tight tracking (`-0.02em`), geometric clarity, dan optical kerning.
2. **Financial Ledger Font:** `JetBrains Mono`
   - Digunakan untuk: Seluruh nominal angka mata uang (IDR), saldo rekening, persentase data, tanggal tabular, dan chart tooltip.
   - Wajib menerapkan: `font-variant-numeric: tabular-nums` untuk kestabilan digit tanpa pergeseran horizontal.
3. **Tri-Scale Currency Presentation:**
   - Prefix simbol `Rp` (11px, muted slate, normal weight).
   - Integer angka utama (24-30px, crisp white, font-bold, tabular-nums).
   - Nilai sen `,00` (11px, muted slate, medium weight).

---

## 5. Logo & Visual Asset Rules

### 5.1 Official Logo Mark
- **Konsep:** Monogram 'M' geometris minimalis yang dibentuk dari dua garis aliran kas yang bertemu pada satu sumbu stabil (*nexus*).
- **Format Berkas:**
  - `public/brand/logo.svg` (Horizontal lockup: Logo Mark + Typographic Wordmark "MUARA")
  - `public/brand/logo-mark.svg` (Monogram icon only, untuk sidebar collapsed & favicon)
  - `public/favicon.ico` (32x32px & 16x16px multi-resolution)

### 5.2 Iconography Rules
- Seluruh ikon antarmuka wajib berupa format vektor SVG dengan ketebalan garis konsisten `strokeWidth={1.5}` (Lucide React atau custom SVG glyphs dari `src/components/icons/bespoke/`).
- Dilarang keras menggunakan emoji di dalam komponen UI chrome (tombol, badge status, header). Emoji hanya diperbolehkan sebagai label kategori kustom pengguna (contoh: `🍔 Makanan`, `🚗 Transportasi`).

---

## 6. Slide & Presentation Standard (Executive Reporting)

- Setiap presentasi eksekutif yang diekspor dari Muara Money Manager wajib:
  1. Menggunakan CSS variables dari `assets/design-tokens.css`.
  2. Menerapkan skema warna gelap (*Obsidian Canvas* `#030712`).
  3. Menggunakan Chart.js dengan palette Emerald/Rose/Indigo resmi.
  4. Mengikuti alur narasi eksekutif 5-slide: Executive Summary $\rightarrow$ Net Cashflow Delta $\rightarrow$ Category Burn $\rightarrow$ Transfer Neutrality Audit $\rightarrow$ Runway Outlook.
