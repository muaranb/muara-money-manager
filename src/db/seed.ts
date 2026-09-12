import { db } from "./index";
import { accounts, categories, subcategories } from "./schema";
import { eq } from "drizzle-orm";

export const MASTER_ACCOUNTS = [
  { name: "BCA (Baim)", type: "BANK" as const, accountNumber: "0501191549", accountHolder: "BIMA AURASAKTI ROCHMATULLAH" },
  { name: "Blu BCA (Baim)", type: "BANK" as const, accountNumber: "000777929188", accountHolder: "BIMA AURASAKTI ROCHMATULLAH" },
  { name: "Blu BCA (Emergency Funds)", type: "BANK" as const, accountNumber: null, accountHolder: "BIMA AURASAKTI ROCHMATULLAH" },
  { name: "Blu BCA (Piya)", type: "BANK" as const, accountNumber: null, accountHolder: null },
  { name: "Blu BCA (Uang Belanja)", type: "BANK" as const, accountNumber: null, accountHolder: "BIMA AURASAKTI ROCHMATULLAH" },
  { name: "Blu BCA (Safety Baim)", type: "BANK" as const, accountNumber: null, accountHolder: "BIMA AURASAKTI ROCHMATULLAH" },
  { name: "Blu BCA (Wedding Gift)", type: "BANK" as const, accountNumber: null, accountHolder: null },
  { name: "Blu (Monthly Pocket)", type: "BANK" as const, accountNumber: null, accountHolder: null },
  { name: "Blu (Rehan)", type: "BANK" as const, accountNumber: null, accountHolder: null },
  { name: "Dana (Baim)", type: "E_WALLET" as const, accountNumber: "081392366770", accountHolder: "BIMA AURASAKTI ROCHMATULLAH" },
  { name: "Dana (Piya)", type: "E_WALLET" as const, accountNumber: null, accountHolder: null },
  { name: "Mandiri (Baim)", type: "BANK" as const, accountNumber: "1400019175927", accountHolder: "BIMA AURASAKTI ROCHMATULLAH" },
  { name: "Crypto", type: "INVESTMENT" as const, accountNumber: null, accountHolder: null },
  { name: "Saham", type: "INVESTMENT" as const, accountNumber: null, accountHolder: null },
  { name: "Silver", type: "INVESTMENT" as const, accountNumber: null, accountHolder: null },
  { name: "Reksadana Sailendra", type: "INVESTMENT" as const, accountNumber: null, accountHolder: null },
];

export const MASTER_CATEGORIES = [
  {
    name: "💲 Pemasukan Utama",
    type: "INCOME" as const,
    icon: "briefcase",
    subcategories: ["💼 Gaji SIGN", "💼 Gaji UBS"],
  },
  {
    name: "🤑 Pemasukan Tambahan",
    type: "INCOME" as const,
    icon: "trending-up",
    subcategories: ["💻 Freelance", "📈 Investasi"],
  },
  {
    name: "🎊 Pemasukan Tidak Rutin",
    type: "INCOME" as const,
    icon: "gift",
    subcategories: [
      "🎁 Bonus",
      "🎉 Hadiah / THR",
      "💰 Promo / Cashback",
      "💱 Bunga",
      "🔄 Subscription",
      "🧾 Reimburse",
    ],
  },
  {
    name: "🏠 Tempat Tinggal",
    type: "EXPENSE" as const,
    icon: "home",
    subcategories: [
      "🏠 Kost",
      "💃Gaji Mbak",
      "💡 Listrik /Air / Gas",
      "🛒 Kebutuhan Dapur",
      "🥣 Makanam & Minuman",
      "🧹 Perawatan & Kebersihan",
      "🪑 Perabot & Alat Rumah",
    ],
  },
  {
    name: "💆 Pribadi & Kesehatan",
    type: "EXPENSE" as const,
    icon: "heart",
    subcategories: [
      "🍭 Jajan",
      "🏋️ Olahraga",
      "🏥 Dokter",
      "👕 Pakaian & Alas Kaki",
      "💄 Skincare / Makeup",
      "💆 Pijet",
      "💊 Obat / Asuransi Kesehatan",
      "📚 Edukasi",
      "🔁 Subscription",
      "🚿 Alat Mandi",
      "🪒 Potong Rambut",
    ],
  },
  {
    name: "🚗 Transportasi & Kendaraan",
    type: "EXPENSE" as const,
    icon: "car",
    subcategories: [
      "⛽ Bahan Bakar",
      "🅿️ Parkir",
      "💳 E-Money",
      "🔋 Sewa Baterai",
      "🔧 Service & Perawatan",
      "🚅 Kereta",
      "🚕 Gojek / Gocar",
    ],
  },
  {
    name: "🎮 Hiburan & Gaya Hidup",
    type: "EXPENSE" as const,
    icon: "gamepad-2",
    subcategories: ["🎬 Nonton", "🎮 Game", "🏖️ Liburan"],
  },
  {
    name: "📱Komunikasi & Internet",
    type: "EXPENSE" as const,
    icon: "smartphone",
    subcategories: ["☎️ Pulsa", "🎧 Langganan Aplikasi", "📶 Paket Data / Wifi"],
  },
  {
    name: "💵 Keuangan & Investasi",
    type: "EXPENSE" as const,
    icon: "credit-card",
    subcategories: ["🎫 Biaya Admin", "📊 Investasi (Perak)", "📊 Investasi (Saham)"],
  },
  {
    name: "🧑‍🧑‍🧒 Sosial & Keluarga",
    type: "EXPENSE" as const,
    icon: "users",
    subcategories: ["🍭 Uang Jajan", "🙏 Berbagi"],
  },
  {
    name: "⚠️ Tidak Terduga",
    type: "EXPENSE" as const,
    icon: "alert-triangle",
    subcategories: ["🎫 Biaya Admin", "🤒 Dokter / Rumah Sakit", "🤯 Denda / Kehilangan"],
  },
  {
    name: "⚙️ Penyesuaian Saldo",
    type: "BOTH" as const,
    icon: "settings",
    subcategories: ["⚙️ Penyesuaian Saldo"],
  },
  {
    name: "🔄 Pindah Uang",
    type: "BOTH" as const,
    icon: "arrow-left-right",
    subcategories: ["🔄 Pindah Uang"],
  },
  {
    name: "🍬 Uang Jajan",
    type: "EXPENSE" as const,
    icon: "coffee",
    subcategories: ["🍬 Uang Jajan"],
  },
  {
    name: "🏭Bisnis",
    type: "EXPENSE" as const,
    icon: "factory",
    subcategories: ["🏭Bisnis"],
  },
  {
    name: "😵‍💫 Lupa",
    type: "EXPENSE" as const,
    icon: "help-circle",
    subcategories: ["😵‍💫 Lupa"],
  },
  {
    name: "🤯 Tidak Terduga",
    type: "EXPENSE" as const,
    icon: "zap",
    subcategories: ["🤯 Tidak Terduga"],
  },
];

export async function seedDatabase() {
  console.log("🌱 Seeding Master Accounts...");
  for (const acc of MASTER_ACCOUNTS) {
    const existing = await db
      .select()
      .from(accounts)
      .where(eq(accounts.name, acc.name))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(accounts).values({
        name: acc.name,
        type: acc.type,
        accountNumber: acc.accountNumber,
        accountHolder: acc.accountHolder,
        initialBalance: 0,
        currentBalance: 0,
      });
    }
  }

  console.log("🌱 Seeding Categories & Subcategories...");
  for (const cat of MASTER_CATEGORIES) {
    let catRecord = (
      await db
        .select()
        .from(categories)
        .where(eq(categories.name, cat.name))
        .limit(1)
    )[0];

    if (!catRecord) {
      const [inserted] = await db
        .insert(categories)
        .values({
          name: cat.name,
          type: cat.type,
          icon: cat.icon,
        })
        .returning();
      catRecord = inserted;
    }

    if (catRecord) {
      for (const sub of cat.subcategories) {
        const existingSub = await db
          .select()
          .from(subcategories)
          .where(eq(subcategories.name, sub))
          .limit(1);

        if (existingSub.length === 0) {
          await db.insert(subcategories).values({
            categoryId: catRecord.id,
            name: sub,
          });
        }
      }
    }
  }

  console.log("✅ Seeding completed successfully!");
}

if (process.argv[1]?.includes("seed.ts")) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("❌ Seeding failed:", err);
      process.exit(1);
    });
}
