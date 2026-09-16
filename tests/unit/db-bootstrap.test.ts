import { describe, it, expect } from "vitest";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "@/db/schema";
import { ensureDatabaseInitialized, getMigrationStatements } from "@/db/bootstrap";
import { seedDatabase } from "@/db/seed";

describe("Database Bootstrap & Self-Healing", () => {
  it("provides valid migration DDL statements", () => {
    const stmts = getMigrationStatements();
    expect(stmts.length).toBeGreaterThanOrEqual(7);
    expect(stmts.some((s) => s.includes("CREATE TABLE") && s.includes("accounts"))).toBe(true);
    expect(stmts.some((s) => s.includes("CREATE TABLE") && s.includes("transactions"))).toBe(true);
    expect(stmts.some((s) => s.includes("CREATE TABLE") && s.includes("categories"))).toBe(true);
  });

  it("detects empty database, builds tables, and seeds master data", async () => {
    const memClient = createClient({ url: "file::memory:" });
    const memDb = drizzle(memClient, { schema });

    // 1. Verify initially empty
    const beforeCheck = await memClient.execute(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='accounts'"
    );
    expect(beforeCheck.rows.length).toBe(0);

    // 2. Trigger ensureDatabaseInitialized
    const initialized = await ensureDatabaseInitialized(memClient, memDb);
    expect(initialized).toBe(true);

    // 3. Verify tables exist
    const tables = await memClient.execute(
      "SELECT name FROM sqlite_master WHERE type='table' AND name IN ('accounts', 'categories', 'subcategories', 'transactions', 'import_batches')"
    );
    expect(tables.rows.length).toBe(5);

    // 4. Verify master accounts seeded
    const seededAccounts = await memDb.select().from(schema.accounts);
    expect(seededAccounts.length).toBe(16);
    expect(seededAccounts.every((a) => a.currentBalance === 0)).toBe(true);

    // 5. Verify master categories seeded
    const seededCategories = await memDb.select().from(schema.categories);
    expect(seededCategories.length).toBeGreaterThanOrEqual(10);
  });

  it("is idempotent: subsequent calls do not re-run or duplicate data", async () => {
    const memClient = createClient({ url: "file::memory:" });
    const memDb = drizzle(memClient, { schema });

    // First call
    const firstCall = await ensureDatabaseInitialized(memClient, memDb);
    expect(firstCall).toBe(true);

    // Second call
    const secondCall = await ensureDatabaseInitialized(memClient, memDb);
    expect(secondCall).toBe(false);

    // Verify accounts count is still exactly 16
    const seededAccounts = await memDb.select().from(schema.accounts);
    expect(seededAccounts.length).toBe(16);
  });

  it("transparently self-heals when db.select() is executed against empty client with interceptor", async () => {
    const memClient = createClient({ url: "file::memory:" });
    const memDb = drizzle(memClient, { schema });

    let isInitialized = false;
    let isInitializing = false;

    const origExecute = memClient.execute.bind(memClient);
    memClient.execute = async function (stmt) {
      if (!isInitialized && !isInitializing) {
        const sqlStr = typeof stmt === "object" ? stmt.sql : String(stmt);
        if (!sqlStr.includes("sqlite_master")) {
          isInitializing = true;
          await ensureDatabaseInitialized(memClient, memDb);
          isInitialized = true;
          isInitializing = false;
        }
      }
      return origExecute(stmt);
    };

    // Before query, tables do not exist
    const checkBefore = await origExecute(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='accounts'"
    );
    expect(checkBefore.rows.length).toBe(0);

    // Perform query without pre-creating tables - should self-heal and succeed!
    const accounts = await memDb.select().from(schema.accounts);
    expect(accounts.length).toBe(16);
    expect(accounts[0].name).toBeDefined();
  });
});
