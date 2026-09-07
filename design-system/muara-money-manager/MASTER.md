# Design System Master File: Muara Money Manager (Luxury Fintech Edition)

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Muara Money Manager (V5.0 Luxury Edition)  
**Aesthetic Style:** Obsidian Glass & Bento Grid (Dark Luxury ala Linear / Stripe / Mercury / Apple Card)  
**Design Dials:** Variance 8/10 (Bento Grid Architecture) | Motion 7/10 (Kinetic Luxury Springs) | Density 8/10 (Dense Financial Dashboard)  

---

## 1. Global Visual Identity & Philosophy

Aplikasi mengadopsi estetika **Dark Luxury Fintech Terminal**:
- **Canvas:** Midnight obsidian slate (`#030712`) dengan sentuhan ambient radial mesh glow halus (`radial-gradient(ellipse at 50% 0%, rgba(16, 185, 129, 0.04), transparent 70%)`).
- **Cards & Surfaces:** Modular Bento Grid dengan *frosted glass backdrop* (`rgba(15, 23, 42, 0.65)` + `backdrop-blur-xl`), *hairline border* bergradasi cahaya halus (`border-white/[0.08]` hingga `hover:border-white/[0.18]`), dan bayangan halus berdimensi (`shadow-[0_8px_32px_rgba(0,0,0,0.4)]`).
- **Transfer Neutrality Visualized:** Transaksi transfer/pindah uang divisualisasikan dengan warna netral khusus (*Electric Indigo* `#6366F1`) untuk mempertegas pemisahan mutasi internal dari pos pengeluaran/pemasukan.

---

## 2. OKLCH Semantic Color Tokens

Terintegrasi penuh dengan Tailwind CSS v4 via `@theme inline` dan variabel CSS pada `globals.css`:

```css
:root {
  /* Slate Obsidian Dark Luxury Canvas */
  --background: oklch(0.12 0.015 260);          /* #030712 Deep midnight slate */
  --foreground: oklch(0.98 0.005 260);          /* #F8FAFC Crisp white text */
  
  /* Glass Surfaces & Bento Cards */
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

---

## 3. Tri-Stack Typography System

Menerapkan pemisahan tegas antara teks antarmuka umum dan angka finansial:

1. **UI Sans Font:** `Geist Sans` (atau `Inter` fallback)
   - Digunakan untuk: Navigation, Headings, Subheadings, Dialog titles, Form labels, dan metadata.
   - Karakter: Optical sizing otomatis, tight tracking (`tracking-tight` / `-0.02em`), bobot 400 (normal), 500 (medium), 600 (semibold).
2. **Financial Mono Font:** `JetBrains Mono` (atau `Geist Mono` fallback)
   - Digunakan untuk: **Seluruh nominal mata uang (Rupiah), saldo rekening, persentase data, tanggal tabular, dan angka chart**.
   - Karakter: Tabular numbers bawaan (`font-variant-numeric: tabular-nums`) sehingga tidak ada pergeseran lebar kolom saat angka berubah.
3. **Hierarki Visual Nominal (Golden Format):**
   - **Muted Currency Symbol:** `text-xs md:text-sm font-medium text-muted-foreground mr-1` (`Rp`)
   - **Bold Integer Figures:** `text-xl md:text-2xl lg:text-3xl font-bold font-mono tracking-tight text-slate-100` (`12.450.000`)
   - **Subtle Decimal Cents:** `text-xs font-mono text-muted-foreground ml-0.5` (`,00`)

---

## 4. Elevation, Glassmorphism, & Bento-Grid Layout

### Layers Hierarchy:
- **Layer 0 (Canvas):** `bg-[#030712]` dengan ambient radial mesh glow.
- **Layer 1 (Bento Grid Cards):** 
  ```css
  .bento-card {
    background: rgba(15, 23, 42, 0.65);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    border-radius: 1rem; /* 16px */
    transition: all 250ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .bento-card:hover {
    border-color: rgba(255, 255, 255, 0.16);
    box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.45);
    transform: translateY(-2px);
  }
  ```
- **Layer 2 (Sticky Headers & Bars):** `bg-[#030712]/80 backdrop-blur-xl border-b border-white/[0.08] z-30`.
- **Layer 3 (Modals, Slide-over Drawers & Command Palette):** `bg-slate-950/90 backdrop-blur-2xl border border-white/15 shadow-2xl z-50`.
- **Layer 4 (Tooltips & Popovers):** `bg-slate-950/95 border border-white/15 shadow-xl z-60`.

---

## 5. Visualisasi Data & Chart Styling (Recharts Luxury)

### 5.1 Area Chart (Cashflow Trend):
- Kurva Bézier lembut (`type="monotone"`), stroke 2.5px dengan gradien bercahaya (*glow filter*).
- Gradien fill di bawah kurva: `linear-gradient(180deg, rgba(16,185,129,0.25) 0%, rgba(16,185,129,0.0) 100%)`.
- Garis referensi nol tipis `strokeDasharray="3 3"` warna `rgba(255,255,255,0.1)`.

### 5.2 Dynamic Center-Stat Donut Chart:
- Lubang tengah besar (*inner radius 70%, outer radius 90%*).
- Tengah donat menampilkan stat dinamis:
  - Default: Total Belanja Bulanan (`Rp XX.XXX.XXX`).
  - Hover: Nominal dan nama kategori yang sedang di-hover beserta persentasenya.
- Stroke separator antar slice: 3px warna `rgba(3, 7, 18, 0.8)` agar irisan terpisah bersih.

### 5.3 KPI Mini-Sparklines:
- Tertanam di sudut kanan bawah setiap kartu KPI (Pemasukan, Pengeluaran, Cashflow, Transfer).
- Responsive mini canvas tanpa sumbu aksis (garis kurva 1.5px hijau/merah/indigo halus).

### 5.4 Recharts Custom Glass Tooltip:
```tsx
<div className="rounded-xl border border-white/15 bg-slate-950/90 p-3.5 shadow-2xl backdrop-blur-xl">
  <p className="font-sans text-xs font-medium text-slate-400">{label}</p>
  <p className="mt-1 font-mono text-base font-bold text-slate-100 tabular-nums">
    {formatIDR(value)}
  </p>
</div>
```

---

## 6. Kinetic Luxury & Micro-Interactions

1. **Number Count-Up Animation:**
   - Saldo dompet dan angka KPI menggunakan count-up kinetik halus (durasi 600ms, *cubic-bezier(0.16, 1, 0.3, 1)*) saat load atau saat bulan berganti.
2. **Skeleton Shimmer Waves:**
   - Loading placeholder menggunakan latar `bg-slate-900/60` dengan gradien linear shimmer berkecepatan 1.5s untuk mempertahankan *zero layout shift* (CLS < 0.05).
3. **Smooth Tab & Accordion Transitions:**
   - Transisi Radix Accordion & Tabs menggunakan CSS height auto transitions (200-300ms) dengan `will-change: height`.
4. **Live Pulse Indicator:**
   - Status rekening tersinkronisasi menampilkan titik hijau berpijar (*subtle pulse ring*):
     `relative flex h-2 w-2 items-center justify-center` dengan animasi `animate-ping`.

---

## 7. Responsive Navigation Blueprint

1. **Desktop (> 768px):**
   - **Collapsible Sidebar:** Lebar 260px (expanded) atau 72px (collapsed icon-only). Berisi logo dengan badge kilap, item navigasi dengan *active indicator emerald*, dan tombol collapse.
   - **Top Bar:** Breadcrumbs dinamis, *quick wallet balance pills* (scroll horizontal), *month selector*, dan trigger Command Palette (`⌘K`).
2. **Mobile (≤ 768px):**
   - **iOS-Style Bottom Navigation:** Fixed bar di bagian bawah layar dengan `backdrop-blur-xl bg-slate-950/85 border-t border-white/10`.
   - 4 Tombol menu utama: Home (`/`), Bulanan (`/monthly`), Transaksi (`/transactions`), Ingestion (`/import`).
   - *Floating Action*: Tombol cepat unggah mutasi rekening di tengah atau pojok kanan.
   - *Safe Area Inset:* Memperhitungkan `pb-safe` untuk iPhone home bar.

---

## 8. Anti-Patterns & Pre-Delivery Checklist

### ❌ Anti-Patterns (Strictly Prohibited):
- Dilarang keras menggunakan **Emoji sebagai ikon UI chrome** (Gunakan SVG Lucide: `lucide-react`).
- Dilarang teks abu-abu kontras rendah yang melanggar rasio 4.5:1 (WCAG AA).
- Dilarang transisi instan 0ms yang kaku pada elemen interaktif.
- Dilarang *horizontal layout shift* pada angka saat bertambah/berkurang (wajib `font-mono tabular-nums`).
- Dilarang *raw hex colors* yang ditulis langsung di komponen JSX (wajib menggunakan token Tailwind/OKLCH).

### ✅ Pre-Delivery Quality Checklist:
- [ ] Seluruh nominal uang menggunakan font monospace tabular (`JetBrains Mono` / `font-mono tabular-nums`).
- [ ] Seluruh kartu menggunakan estetika Bento Grid dengan hairline glass border (`border-white/[0.08]`).
- [ ] Hover states memiliki transisi halus 200-300ms (`transition-all duration-200 ease-out`).
- [ ] Kontras warna teks memenuhi standar WCAG AA minimum 4.5:1.
- [ ] Focus rings terlihat jelas untuk navigasi keyboard (`focus-visible:ring-2 focus-visible:ring-emerald-400/50`).
- [ ] Mendukung `prefers-reduced-motion` untuk aksesibilitas.
- [ ] Responsive diuji pada 375px (Mobile), 768px (Tablet), 1024px (Laptop), dan 1440px (Desktop Widescreen).
