# Design System Master File: Muara Money Manager (Comprehensive Brand & Design Engineering Monolith Edition)

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.  
> If that file exists, its rules **override** this Master file.  
> If not, strictly follow the rules below.

---

**Project:** Muara Money Manager (V5.3 Comprehensive Brand & Design Engineering Monolith Edition)  
**Aesthetic Style:** Artisan Obsidian & Tactile Metallic (Linear / Stripe Press / Apple Card Inspired)  
**Ecosystem:** `.agents` Design Suite (`brand`, `design-system`, `ui-styling`, `design`, `banner-design`, `slides`, `ui-ux-pro-max`)  
**Design Dials:** Variance 8/10 (Asymmetric Bento Grid) | Motion 7/10 (Tactile Spring Physics) | Density 8/10 (Dense Financial Ledger)  

---

## 1. Global Visual Identity & Anti-AI Manifesto

Aplikasi ini **secara mutlak dilarang terlihat seperti template web generik buatan AI** (tidak ada gradien ungu/pink mencolok, tidak ada floating blur spheres, tidak ada emoji sebagai icon, dan tidak ada card grid 3 kolom simetris yang seragam).

Sebaliknya, Muara Money Manager mengadopsi estetika **Artisan Obsidian & Tactile Metallic**:
- **Canvas:** Midnight obsidian slate (`#030712`) dengan overlay micro-grain noise ultra-halus (opacity 1.5% - 2%) untuk memberikan kedalaman material fisik nyata tanpa blur berlebihan.
- **Cards & Surfaces:** Asymmetric Bento Grid dengan *specular hairline border* (`border border-white/[0.08]` dengan inner highlight `shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]`).
- **Physical Bank Metaphor:** Rekening bank (Mandiri, BCA, DANA, Tunai) divisualisasikan dengan estetika kartu fisik asli (finishing brushed metal, brass EMV chip SVG, masked account number `•••• 5927`).
- **Transfer Neutrality Visualized:** Transaksi transfer/pindah uang divisualisasikan dengan warna netral khusus (*Electric Indigo* `#6366F1`) dan indikator *Contra-Pair Tether* yang menghubungkan transaksi debit & kredit.

### 1.2 Three-Layer Design Token Architecture (`design-system` + `brand`)
Sistem token mengadopsi arsitektur 3-lapis ketat yang disinkronisasikan secara otomatis:
1. **Layer 1: Primitives (`assets/design-tokens.json`)**
   - Nilai absolut heksadesimal warna murni, skala spasi, dan font stack (`Geist Sans` + `JetBrains Mono`).
2. **Layer 2: Semantic Tokens (OKLCH Native)**
   - Variabel semantik berbasis tujuan antarmuka: `--background`, `--card`, `--income`, `--expense`, `--transfer`, `--primary-gold`.
3. **Layer 3: Component Tokens (`assets/design-tokens.css`)**
   - Variabel spesifik per komponen: styling kartu bento (`.artisan-card`), hierarki nilai uang (`<TabularCurrency />`), kartu rekening bank fisik (`<PhysicalBankCard />`), dan tema presentasi (`--slide-bg`, `--slide-card-bg`).
- **Source of Truth:** [docs/brand-guidelines.md](file:///C:/bima/Projects/NextJS/muara-money-manager-2/docs/brand-guidelines.md)  
- **Build Pipeline:** `node scripts/sync-brand-tokens.cjs` $\rightarrow$ menghasilkan `assets/design-tokens.css` yang diimpor langsung ke `src/app/globals.css`.

---

## 2. OKLCH Semantic Color Tokens & Surface Utilities

Terintegrasi penuh dengan Tailwind CSS v4 via `@theme inline` dan variabel CSS pada `globals.css`:

```css
:root {
  /* Slate Obsidian Dark Luxury Canvas */
  --background: oklch(0.12 0.015 260);          /* #030712 Deep midnight slate */
  --foreground: oklch(0.98 0.005 260);          /* #F8FAFC Crisp white text */
  
  /* Glass Surfaces & Bento Cards */
  --card: oklch(0.16 0.02 260 / 0.75);           /* Frosted obsidian glass */
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

### 2.1 Micro-Noise & Specular Surface Classes
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

---

## 3. Tri-Stack Typography & Tabular Currency Standard

1. **UI Sans Font:** `Geist Sans` (fallback: `Inter`) untuk navigation, headings, metadata, dan deskripsi teks. Tight tracking (`-0.02em`).
2. **Financial Mono Font:** `JetBrains Mono` (fallback: `Geist Mono`) untuk **seluruh angka uang, saldo rekening, persentase data, tanggal, dan nilai chart**. Wajib `font-variant-numeric: tabular-nums`.
3. **Tri-Scale Currency Component (`<TabularCurrency />`):**
   Memecah format nominal menjadi 3 hierarki visual yang tajam:
   - **Muted Prefix:** `text-xs font-normal text-neutral-500 mr-0.5 select-none` (`Rp`)
   - **High-Contrast Integer:** `text-2xl font-bold tracking-tight text-white font-mono tabular-nums` (`14.850.000`)
   - **Muted Sen:** `text-xs font-medium text-neutral-500 ml-0.5 select-none` (`,00`)

```tsx
// src/components/ui/tabular-currency.tsx
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

---

## 4. Asymmetric Bento Grid Architecture (Monthly Dashboard `/monthly`)

Layout menghindari kartu 3 kolom simetris yang membosankan. Menerapkan rasio asimetris fungsional:

```
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

---

## 5. Authentic Physical Bank Card Cues & Bespoke Generative Assets

### 5.1 Bespoke Generative Vector Glyphs & Monogram Specs (`design`, `logo`, `icon`)
Menggunakan script AI bawaan `.agents` untuk memproduksi aset resmi mandiri:
1. **Muara Logo Monogram (`scripts/logo/generate.py`):**
   - Monogram 'M' obsidian-emerald geometris minimalis di `public/brand/logo.svg` dan `public/brand/logo-mark.svg`.
2. **EMV Chip Vector (`scripts/icon/generate.py`):**
   - Vektor chip kartu kredit kuningan (18x14px) diekspor ke `src/components/icons/bespoke/emv-chip.tsx`.
3. **Contra-Tether Glyphs (`tether-link.svg`, `tether-split.svg`):**
   - Vektor rantai koneksi mutasi kontra debit-kredit.
4. **OpenGraph Banner (`banner-design` / `social-photos`):**
   - Banner pratinjau media sosial 1200x630px di `public/brand/muara-og-card.png`.

### 5.2 Kartu Rekening Fisik (`<PhysicalBankCard />`)
- **Bank Mandiri Platinum:** Gradient `from-[#0d1e3a] via-[#162d55] to-[#0a1527]`, brushed platinum sheen, brass EMV chip vector (18x14px), masked account `•••• 5927`.
- **BCA Priority / Xpresi:** Gradient `from-[#081b3b] to-[#040d1e]`, ultra-fine 1px gold hairline border (`border-[#d4af37]/30`), crisp BCA vector emblem, masked `•••• 1042`.
- **DANA E-Wallet:** Deep cyan card `from-[#08355b] to-[#0b223d]`, subtle DANA blue ambient edge, masked phone `•••• 8821`.
- **Tunai / Cash Wallet:** Rich obsidian emerald weave `from-[#0d2319] to-[#06120d]`, banknote tactile texture.
- **Micro-Interactions:** `hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.5)] active:scale-[0.985] transition-all duration-200`.

---

## 6. Contra-Pair Tether Indicator (`<ContraPairTether />`)

Transaksi transfer/pindah uang antar dua rekening internal dihubungkan dengan indikator tether interaktif:
- Menampilkan chip ringkas: `[⇄ Contra-Paired #TR-8821]`.
- **Hover Cohesion:** Mengarahkan kursor ke chip ini akan otomatis menyoroti (highlight) kedua baris transaksi berpasangan (debit & kredit) di tabel secara bersamaan dengan outline tipis indigo/emerald.
- **Drawer Drilldown:** Mengklik chip membuka slide-over drawer yang menampilkan verifikasi rekonsiliasi transfer:
  * Akun Pengirim ➔ Akun Penerima
  * Timestamp Delta: `0.00s` (atau selisih detik/menit)
  * Net Cash Impact: `Rp 0,00` (terbukti netral 100% terhadap pengeluaran/pemasukan).

---

## 7. Visualisasi Data & Chart Styling (Recharts Luxury)

1. **Cashflow Trend (Area Chart):** Kurva Bézier lembut (`type="monotone"`), stroke 2.5px dengan gradien bercahaya halus tanpa artifact neon murahan. Fill: `linear-gradient(180deg, rgba(16,185,129,0.20) 0%, rgba(16,185,129,0.0) 100%)`.
2. **Dynamic Center-Stat Donut Chart:** Inner radius 70%, outer radius 90%. Stat di tengah beranimasi dinamis: Default = Total Belanja Bulanan, Hover = Nama Kategori, Nominal IDR, & Persentase.
3. **KPI Mini-Sparklines:** Tertanam di sudut kanan bawah setiap kartu KPI. Kurva 1.5px tanpa sumbu aksis yang mengotori visual.

---

## 8. Kinetic Luxury, Micro-Interactions, & Tactile Spring Physics

1. **Tactile Active Press State:** Seluruh tombol, kartu bento, dan baris interaktif merespons sentuhan/klik pengguna dengan fisika pegas nyata:
   `active:scale-[0.985] active:translate-y-[0.5px] transition-transform duration-150 ease-out`.
2. **Number Count-Up Animation:** Saldo dan KPI bulanan beranimasi menghitung naik halus (*count-up*) selama 600ms dengan *cubic-bezier(0.16, 1, 0.3, 1)* saat halaman dimuat atau bulan berganti.
3. **Skeleton Shimmer Waves:** Loading state menggunakan `bg-slate-900/60` dengan linear shimmer wave (1.5s) untuk menjaga *zero layout shift* (CLS < 0.05).
4. **Live Pulse Ring:** Rekening aktif menampilkan titik hijau berpijar halus (`relative flex h-2 w-2 items-center justify-center` dengan `animate-ping`).

---

## 9. Responsive Navigation & Executive Slide Exporter (`slides`)

### 9.1 Desktop & Mobile Navigation
1. **Desktop (> 768px):** Collapsible Sidebar (lebar 260px / 72px), logo monogram kilap, status link emerald glow, Command Palette (`⌘K`).
2. **Mobile (≤ 768px):** iOS-Style Bottom Navigation bar berbalut frosted glass dengan safe area padding (`pb-safe`).

### 9.2 In-App Executive Monthly Deck Exporter (`slides`)
Fitur ekspor presentasi bulanan mandiri yang dapat dibuka langsung di browser web:
- **Pemicu UI:** Tombol `[ 📊 Ekspor Presentasi Eksekutif ]` pada toolbar header `/monthly`.
- **Output:** Berkas HTML tunggal mandiri (`muara-executive-report-YYYY-MM.html`) yang menyertakan Chart.js, token styling Obsidian, dan navigasi keyboard (panah kiri/kanan, fullscreen `F`).
- **Alur Slide:**
  1. *Slide 1:* Executive Summary & Total Net Worth.
  2. *Slide 2:* Operating Cashflow Delta & Trends.
  3. *Slide 3:* Expense Allocation & Top Cost Centers.
  4. *Slide 4:* Transfer Neutrality Audit & Liquidity Moves.
  5. *Slide 5:* 60-Day Capital Runway & Forward Outlook.

---

## 10. Strict Anti-Cliché Blacklist & Institutional Micro-Copy Dictionary

### ❌ Anti-Cliché Blacklist (Strictly Prohibited):
- **Dilarang Floating Gradient Blobs:** Dilarang menggunakan `blur-3xl bg-purple-500/20` atau lingkaran gradien neon ungu/cyan yang melayang di latar belakang.
- **Dilarang Emoji sebagai Ikon UI:** Dilarang menggunakan `💰, 💳, 📊, 🚀` sebagai ikon tombol, header, atau badge UI. Wajib menggunakan SVG Lucide dengan stroke width 1.5px.
- **Dilarang Symmetrical 3-Card Columns:** Dilarang membuat susunan kartu 3 kolom seragam yang membosankan. Wajib menggunakan Asymmetric Bento Grid.
- **Dilarang Raw Unstyled Currency:** Dilarang menampilkan teks angka moneter biasa tanpa pemisahan visual dan tanpa `tabular-nums`. Wajib menggunakan `<TabularCurrency />`.
- **Dilarang Generic Marketing Copy:** Dilarang menggunakan frasa klise AI seperti *"Supercharge your financial journey"*, *"AI-Powered Intelligence"*, atau *"Unleash your potential"*.

### 🏛️ Institutional Micro-Copy Dictionary (Required):
| Konsep / Status | Istilah yang Wajib Digunakan (Professional Ledger) | Hindari (AI Generic Copy) |
| :--- | :--- | :--- |
| **Saldo Bersih Bulanan** | `Net Cashflow Delta` / `Surplus Kas Bersih` | `Your Money Score` / `Financial Health` |
| **Pengeluaran Riil** | `Operating Outflow` / `Pengeluaran Operasional Riil` | `Money Bleed` / `Cash Drain` |
| **Transfer Antar-Akun** | `Contra Offset (Netral)` / `Mutasi Pemindahan Kas` | `Internal Moves` / `Magic Transfer` |
| **Deteksi Otomatis** | `Contra-Pair Reconciled` / `Tercocokkan Otomatis` | `AI Smart Match Magic` |
| **Antrean Dokumen** | `Unreconciled Staging Ledger` | `AI Processing Zone` |
| **Data Kosong (Empty State)** | `Belum ada mutasi tercatat pada periode ini. Tarik e-Statement atau impor berkas mutasi untuk memulai audit.` | `Oops! Nothing here yet! Start your journey!` |

---

## 11. Pre-Delivery Quality Checklist

- [ ] Seluruh nominal uang menggunakan komponen `<TabularCurrency />` dengan font `JetBrains Mono` tabular-nums.
- [ ] Seluruh kartu menggunakan estetika Bento Grid dengan hairline border dan specular inner highlight (`.artisan-card`).
- [ ] Latar belakang memiliki overlay micro-noise texture halus (`.bg-artisan-noise`).
- [ ] Tidak ada satupun emoji yang digunakan sebagai ikon tombol atau navigasi (100% SVG Lucide).
- [ ] Kartu bank menampilkan visualisasi fisik otentik (Mandiri, BCA, DANA, Tunai) dengan masked account.
- [ ] Transaksi transfer memiliki chip *Contra-Pair Tether* yang menyoroti kedua pihak transaksi saat di-hover.
- [ ] Hover & active states memiliki transisi spring halus (`active:scale-[0.985]`).
- [ ] Fitur Ekspor Presentasi Eksekutif menghasilkan berkas HTML mandiri dengan Chart.js valid.
- [ ] Kontras warna teks memenuhi standar WCAG AA minimum 4.5:1.
- [ ] Responsive diuji pada 375px (Mobile), 768px (Tablet), 1024px (Laptop), dan 1440px (Desktop).
