import type { Client } from "@libsql/client";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { seedDatabase } from "./seed";

// Hardened fallback DDL statements matching drizzle/0000_military_vengeance.sql
export const SCHEMA_DDL_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS \`accounts\` (
\t\`id\` text PRIMARY KEY NOT NULL,
\t\`name\` text NOT NULL,
\t\`type\` text NOT NULL,
\t\`account_number\` text,
\t\`account_holder\` text,
\t\`currency\` text DEFAULT 'IDR' NOT NULL,
\t\`initial_balance\` integer DEFAULT 0 NOT NULL,
\t\`current_balance\` integer DEFAULT 0 NOT NULL,
\t\`created_at\` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
\t\`updated_at\` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);`,
  `CREATE UNIQUE INDEX IF NOT EXISTS \`accounts_name_unique\` ON \`accounts\` (\`name\`);`,
  `CREATE TABLE IF NOT EXISTS \`categories\` (
\t\`id\` text PRIMARY KEY NOT NULL,
\t\`name\` text NOT NULL,
\t\`type\` text NOT NULL,
\t\`icon\` text,
\t\`created_at\` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);`,
  `CREATE UNIQUE INDEX IF NOT EXISTS \`categories_name_unique\` ON \`categories\` (\`name\`);`,
  `CREATE TABLE IF NOT EXISTS \`import_batches\` (
\t\`id\` text PRIMARY KEY NOT NULL,
\t\`file_name\` text NOT NULL,
\t\`file_type\` text NOT NULL,
\t\`selected_account_id\` text,
\t\`detected_source\` text,
\t\`total_extracted\` integer DEFAULT 0 NOT NULL,
\t\`total_committed\` integer DEFAULT 0 NOT NULL,
\t\`status\` text DEFAULT 'PENDING' NOT NULL,
\t\`created_at\` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
\tFOREIGN KEY (\`selected_account_id\`) REFERENCES \`accounts\`(\`id\`) ON UPDATE no action ON DELETE set null
);`,
  `CREATE TABLE IF NOT EXISTS \`subcategories\` (
\t\`id\` text PRIMARY KEY NOT NULL,
\t\`category_id\` text NOT NULL,
\t\`name\` text NOT NULL,
\t\`created_at\` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
\tFOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
);`,
  `CREATE TABLE IF NOT EXISTS \`transactions\` (
\t\`id\` text PRIMARY KEY NOT NULL,
\t\`account_id\` text NOT NULL,
\t\`target_account_id\` text,
\t\`category_id\` text,
\t\`subcategory_id\` text,
\t\`amount\` integer NOT NULL,
\t\`type\` text NOT NULL,
\t\`date\` text NOT NULL,
\t\`time\` text,
\t\`description\` text NOT NULL,
\t\`note\` text,
\t\`source_type\` text NOT NULL,
\t\`import_batch_id\` text,
\t\`transfer_pair_id\` text,
\t\`raw_confidence\` integer DEFAULT 100,
\t\`created_at\` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
\tFOREIGN KEY (\`account_id\`) REFERENCES \`accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
\tFOREIGN KEY (\`target_account_id\`) REFERENCES \`accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
\tFOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
\tFOREIGN KEY (\`subcategory_id\`) REFERENCES \`subcategories\`(\`id\`) ON UPDATE no action ON DELETE set null,
\tFOREIGN KEY (\`import_batch_id\`) REFERENCES \`import_batches\`(\`id\`) ON UPDATE no action ON DELETE set null
);`,
  `CREATE INDEX IF NOT EXISTS \`idx_transactions_account_date\` ON \`transactions\` (\`account_id\`,\`date\`);`,
  `CREATE INDEX IF NOT EXISTS \`idx_transactions_date\` ON \`transactions\` (\`date\`);`,
  `CREATE INDEX IF NOT EXISTS \`idx_transactions_import_batch\` ON \`transactions\` (\`import_batch_id\`);`,
  `CREATE INDEX IF NOT EXISTS \`idx_transactions_transfer_pair\` ON \`transactions\` (\`transfer_pair_id\`);`,
];

/**
 * Loads DDL statements from the migration SQL file or falls back to hardcoded schema.
 */
export function getMigrationStatements(): string[] {
  try {
    const migrationFile = path.join(process.cwd(), "drizzle", "0000_military_vengeance.sql");
    if (existsSync(migrationFile)) {
      const content = readFileSync(migrationFile, "utf-8");
      const stmts = content
        .split("--> statement-breakpoint")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      if (stmts.length > 0) return stmts;
    }
  } catch (err) {
    console.warn("⚠️ [DB Auto-Bootstrap] Could not read drizzle migration file, using fallback DDL:", err);
  }
  return SCHEMA_DDL_STATEMENTS;
}

/**
 * Checks if the database contains the essential tables.
 * If missing, applies DDL schema migrations and seeds master accounts/categories.
 */
export async function ensureDatabaseInitialized(targetClient: Client, targetDb?: any): Promise<boolean> {
  try {
    // 1. Inspect table existence
    const checkResult = await targetClient.execute(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='accounts'"
    );

    if (checkResult.rows.length > 0) {
      // Database already initialized with tables
      return false;
    }

    console.log("⚡ [DB Auto-Bootstrap] No 'accounts' table detected. Starting database self-healing...");

    // 2. Apply Schema DDL
    const statements = getMigrationStatements();
    for (const statement of statements) {
      await targetClient.execute(statement);
    }
    console.log(`⚡ [DB Auto-Bootstrap] Successfully created schema tables & indices (${statements.length} statements applied).`);

    // 3. Seed Master Accounts & Master Categories
    if (targetDb) {
      console.log("⚡ [DB Auto-Bootstrap] Seeding master accounts and categories...");
      await seedDatabase(targetDb);
    }

    console.log("✅ [DB Auto-Bootstrap] Database self-healing completed successfully! Database is ready.");
    return true;
  } catch (error) {
    console.error("❌ [DB Auto-Bootstrap] Failed during database self-healing initialization:", error);
    throw error;
  }
}
