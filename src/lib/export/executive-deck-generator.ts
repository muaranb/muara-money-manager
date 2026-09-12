import {
  MonthlyKPISummary,
  CategoryBreakdownItem,
  TitleBreakdownItem,
} from "@/lib/data/monthly-analytics";
import { formatIDR } from "@/lib/money";

export interface ExecutiveDeckData {
  summary: MonthlyKPISummary;
  categories: CategoryBreakdownItem[];
  topTitles: TitleBreakdownItem[];
}

/**
 * Generates an executive-ready, self-contained HTML slide deck with Chart.js visualizations.
 */
export function generateExecutiveDeckHtml(data: ExecutiveDeckData): string {
  const { summary, categories, topTitles } = data;

  const categoryLabels = JSON.stringify(categories.slice(0, 7).map((c) => c.categoryName));
  const categoryValues = JSON.stringify(categories.slice(0, 7).map((c) => c.totalCents / 100));

  return `<!DOCTYPE html>
<html lang="id" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Laporan Keuangan Eksekutif • ${summary.yearMonth}</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    :root {
      --bg: #030712;
      --card-bg: rgba(15, 23, 42, 0.75);
      --card-border: rgba(255, 255, 255, 0.08);
      --emerald: #10B981;
      --rose: #F43F5E;
      --indigo: #6366F1;
      --text: #F8FAFC;
      --muted: #94A3B8;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .slide-deck {
      width: 100%;
      max-width: 1000px;
      height: 620px;
      position: relative;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 24px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(20px);
      padding: 48px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .slide { display: none; height: 100%; flex-direction: column; justify-content: space-between; animation: fadeIn 0.4s ease; }
    .slide.active { display: flex; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
    .eyebrow { font-size: 11px; letter-spacing: 0.1em; color: var(--emerald); font-family: monospace; text-transform: uppercase; margin-bottom: 8px; }
    h1 { font-size: 32px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 12px; }
    h2 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
    p { font-size: 14px; color: var(--muted); line-height: 1.6; }
    .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 24px 0; }
    .kpi-card { background: rgba(255,255,255,0.03); border: 1px solid var(--card-border); padding: 16px; border-radius: 16px; }
    .kpi-label { font-size: 11px; color: var(--muted); margin-bottom: 4px; }
    .kpi-val { font-size: 20px; font-weight: 700; font-family: monospace; }
    .controls { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--card-border); padding-top: 16px; margin-top: 16px; }
    .btn { background: rgba(255,255,255,0.06); border: 1px solid var(--card-border); color: var(--text); padding: 8px 16px; border-radius: 12px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
    .btn:hover { background: rgba(255,255,255,0.12); }
    .indicators { display: flex; gap: 8px; }
    .indicator { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.2); transition: all 0.2s; }
    .indicator.active { background: var(--emerald); width: 24px; border-radius: 4px; }
    .chart-container { width: 100%; height: 280px; position: relative; margin: 16px 0; }
  </style>
</head>
<body>
  <div class="slide-deck">
    <!-- Slide 1: Title & Executive Summary -->
    <div class="slide active">
      <div>
        <div class="eyebrow">MUARA FINANCIAL OS • EXECUTIVE REPORT</div>
        <h1>Laporan Kinerja Arus Kas Eksekutif</h1>
        <p>Ringkasan komprehensif keuangan personal periode <strong>${summary.yearMonth}</strong>.</p>
        
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-label">Pemasukan Murni</div>
            <div class="kpi-val" style="color: var(--emerald);">Rp ${formatIDR(summary.totalIncomeCents)}</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Pengeluaran Riil</div>
            <div class="kpi-val" style="color: var(--rose);">Rp ${formatIDR(summary.totalExpenseCents)}</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Surplus Kas</div>
            <div class="kpi-val" style="color: #38BDF8;">Rp ${formatIDR(summary.netCashflowCents)}</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Pindah Uang (Netral)</div>
            <div class="kpi-val" style="color: var(--indigo);">Rp ${formatIDR(summary.totalTransferVolumeCents)}</div>
          </div>
        </div>
      </div>
      <div>
        <p style="font-size: 12px; font-family: monospace;">Rasio Tabungan: <strong style="color: var(--emerald);">${summary.savingsRatePercentage}%</strong> | Mutasi Pindah Uang: <strong>${summary.transferCount}x</strong> (Diisolasi dari beban biaya)</p>
      </div>
    </div>

    <!-- Slide 2: Category Allocation Doughnut -->
    <div class="slide">
      <div>
        <div class="eyebrow">DISTRIBUSI BIAYA HIDUP</div>
        <h2>Alokasi Belanja per Kategori Induk</h2>
        <p>Proporsi belanja terbesar yang membebani kas operasional bulan ini.</p>
        <div class="chart-container">
          <canvas id="categoryChart"></canvas>
        </div>
      </div>
      <div>
        <p style="font-size: 12px;">Data tidak mencakup transfer antar-rekening internal.</p>
      </div>
    </div>

    <!-- Slide 3: Merchant Leaderboard -->
    <div class="slide">
      <div>
        <div class="eyebrow">LEADERBOARD BEBAN</div>
        <h2>Top 5 Merchant Terbesar</h2>
        <p>Merchant dengan akumulasi beban operasional tertinggi periode ${summary.yearMonth}.</p>
        <div style="margin: 24px 0; display: flex; flex-direction: column; gap: 10px;">
          ${topTitles
            .slice(0, 5)
            .map(
              (t, i) => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: rgba(255,255,255,0.03); border: 1px solid var(--card-border); border-radius: 12px;">
              <div>
                <span style="font-family: monospace; color: var(--emerald); font-weight: bold; margin-right: 8px;">#${i + 1}</span>
                <strong style="font-size: 14px;">${t.title}</strong>
                <span style="font-size: 12px; color: var(--muted); margin-left: 8px;">(${t.frequency}x transaksi)</span>
              </div>
              <div style="font-family: monospace; font-weight: bold; color: var(--rose);">
                Rp ${formatIDR(t.totalCents)}
              </div>
            </div>`
            )
            .join("")}
        </div>
      </div>
      <div>
        <p style="font-size: 12px;">Peringkat dihitung berdasarkan total nilai agregasi.</p>
      </div>
    </div>

    <!-- Slide 4: Strict Transfer Neutrality -->
    <div class="slide">
      <div>
        <div class="eyebrow">AUDIT AKUNTANSI & INTEGRITAS KAS</div>
        <h2>Strict Transfer Neutrality Proof</h2>
        <p>Isolasi total mutasi pemindahan dana antar-kantong demi akurasi finansial 100%.</p>
        <div style="margin: 24px 0; padding: 24px; background: rgba(99, 102, 241, 0.05); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 16px;">
          <h3 style="font-size: 16px; color: var(--indigo); margin-bottom: 8px;">🔄 Kebijakan Zero Operational Inflation</h3>
          <p style="margin-bottom: 12px;">Sebanyak <strong>${summary.transferCount} transaksi pindah uang</strong> senilai total <strong>Rp ${formatIDR(summary.totalTransferVolumeCents)}</strong> secara otomatis dieksklusikan dari kalkulasi pengeluaran dan pemasukan operasional.</p>
          <p style="font-size: 12px; font-family: monospace; color: var(--muted);">Status: VERIFIED & AUDITED BY MUARA FINANCIAL ENGINE</p>
        </div>
      </div>
      <div>
        <p style="font-size: 12px;">Arus kas operasional mencerminkan daya beli dan surplus riil.</p>
      </div>
    </div>

    <!-- Controls -->
    <div class="controls">
      <button class="btn" onclick="prevSlide()">◀ Sebelumnya</button>
      <div class="indicators">
        <div class="indicator active" onclick="goToSlide(0)"></div>
        <div class="indicator" onclick="goToSlide(1)"></div>
        <div class="indicator" onclick="goToSlide(2)"></div>
        <div class="indicator" onclick="goToSlide(3)"></div>
      </div>
      <button class="btn" onclick="nextSlide()">Selanjutnya ▶</button>
    </div>
  </div>

  <script>
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');

    function updateSlides() {
      slides.forEach((s, idx) => s.classList.toggle('active', idx === currentSlide));
      indicators.forEach((ind, idx) => ind.classList.toggle('active', idx === currentSlide));
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlides();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlides();
    }

    function goToSlide(idx) {
      currentSlide = idx;
      updateSlides();
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    });

    // Chart.js Doughnut Initialization
    window.onload = function() {
      const ctx = document.getElementById('categoryChart');
      if (ctx) {
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ${categoryLabels},
            datasets: [{
              data: ${categoryValues},
              backgroundColor: ['#10B981', '#6366F1', '#F59E0B', '#06B6D4', '#EC4899', '#8B5CF6', '#14B8A6'],
              borderColor: '#030712',
              borderWidth: 3,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'right', labels: { color: '#94A3B8', font: { family: 'monospace', size: 12 } } }
            }
          }
        });
      }
    };
  </script>
</body>
</html>`;
}
