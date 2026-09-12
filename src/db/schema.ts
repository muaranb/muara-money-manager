import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// 1. Rekening & Dompet (Lokasi Wallet)
export const accounts = sqliteTable("accounts", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().unique(), // e.g. 'BCA (Baim)', 'Dana (Baim)', 'Mandiri (Baim)'
  type: text("type", { enum: ["BANK", "E_WALLET", "INVESTMENT", "CASH", "OTHER"] }).notNull(),
  accountNumber: text("account_number"), // e.g. '0501191549', '081392366770', '1400019175927'
  accountHolder: text("account_holder"), // 'BIMA AURASAKTI ROCHMATULLAH'
  currency: text("currency").default("IDR").notNull(),
  initialBalance: integer("initial_balance").default(0).notNull(), // Nilai dalam SEN (IDR x 100)
  currentBalance: integer("current_balance").default(0).notNull(), // Nilai dalam SEN (IDR x 100)
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// 2. Kategori Induk
export const categories = sqliteTable("categories", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().unique(), // e.g., '💆 Pribadi & Kesehatan', '⚙️ Penyesuaian Saldo', '🔄 Pindah Uang'
  type: text("type", { enum: ["EXPENSE", "INCOME", "BOTH"] }).notNull(),
  icon: text("icon"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// 3. Subkategori
export const subcategories = sqliteTable("subcategories", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  categoryId: text("category_id").references(() => categories.id, { onDelete: "cascade" }).notNull(),
  name: text("name").notNull(), // e.g., '🍭 Jajan', '🅿️ Parkir'
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// 4. Log Batch Import & Audit
export const importBatches = sqliteTable("import_batches", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(),
  selectedAccountId: text("selected_account_id").references(() => accounts.id, { onDelete: "set null" }),
  detectedSource: text("detected_source"), // 'BCA', 'DANA', 'BLU_BCA', 'MANDIRI', 'MANUAL_SELECTION'
  totalExtracted: integer("total_extracted").default(0).notNull(),
  totalCommitted: integer("total_committed").default(0).notNull(),
  status: text("status", { enum: ["PENDING", "COMMITTED", "FAILED"] }).default("PENDING").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// 5. Tabel Transaksi Finansial
export const transactions = sqliteTable("transactions", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  accountId: text("account_id").references(() => accounts.id, { onDelete: "cascade" }).notNull(), // Lokasi Wallet Sumber
  targetAccountId: text("target_account_id").references(() => accounts.id, { onDelete: "set null" }), // Lokasi Wallet Tujuan (Khusus Transfer)
  categoryId: text("category_id").references(() => categories.id, { onDelete: "set null" }),
  subcategoryId: text("subcategory_id").references(() => subcategories.id, { onDelete: "set null" }),
  amount: integer("amount").notNull(), // Nilai dalam SEN (IDR x 100, selalu positif absolut)
  type: text("type", { enum: ["EXPENSE", "INCOME", "TRANSFER"] }).notNull(),
  date: text("date").notNull(), // ISO YYYY-MM-DD
  time: text("time"), // HH:mm:ss jika tersedia
  description: text("description").notNull(), // Nama merchant, toko, atau keterangan mutasi
  note: text("note"), // Catatan tambahan (e.g., 'Jajan', 'Parkir Maspion')
  sourceType: text("source_type", { 
    enum: ["MANUAL", "SCREENSHOT", "PDF_BCA", "PDF_DANA", "CSV_BLU", "EXCEL_MANDIRI", "MIGRATION_MONEY_MANAGER"] 
  }).notNull(),
  importBatchId: text("import_batch_id").references(() => importBatches.id, { onDelete: "set null" }),
  transferPairId: text("transfer_pair_id"), // Penghubung 2 sisi mutasi transfer internal
  rawConfidence: integer("raw_confidence").default(100), // Persentase keyakinan AI (0 - 100)
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => ({
  accountDateIdx: index("idx_transactions_account_date").on(table.accountId, table.date),
  dateIdx: index("idx_transactions_date").on(table.date),
  importBatchIdx: index("idx_transactions_import_batch").on(table.importBatchId),
  transferPairIdx: index("idx_transactions_transfer_pair").on(table.transferPairId),
}));

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type Subcategory = typeof subcategories.$inferSelect;
export type NewSubcategory = typeof subcategories.$inferInsert;
export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
export type ImportBatch = typeof importBatches.$inferSelect;
export type NewImportBatch = typeof importBatches.$inferInsert;
