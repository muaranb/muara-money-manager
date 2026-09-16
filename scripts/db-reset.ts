import { client, db, ensureDatabaseInitialized } from "../src/db";
import { accounts, categories, transactions } from "../src/db/schema";
import { count } from "drizzle-orm";

async function main() {
  console.log("=================================================");
  console.log("🔄 MUARA FINANCIAL OS - DATABASE RESET & REBUILD");
  console.log("=================================================");
  console.log("⚠️  Cleaning existing database schema & records...");

  try {
    // 1. Drop existing tables safely
    await client.execute("PRAGMA foreign_keys = OFF;");
    await client.execute("DROP TABLE IF EXISTS transactions;");
    await client.execute("DROP TABLE IF EXISTS import_batches;");
    await client.execute("DROP TABLE IF EXISTS subcategories;");
    await client.execute("DROP TABLE IF EXISTS categories;");
    await client.execute("DROP TABLE IF EXISTS accounts;");
    await client.execute("PRAGMA foreign_keys = ON;");

    console.log("🧹 Previous tables purged successfully.");

    // 2. Re-initialize tables and seed master data
    console.log("🌱 Creating schema tables and seeding master data...");
    await ensureDatabaseInitialized(client, db);

    // 3. Verify counts
    const [accCount] = await db.select({ val: count() }).from(accounts);
    const [catCount] = await db.select({ val: count() }).from(categories);
    const [txCount] = await db.select({ val: count() }).from(transactions);

    console.log("-------------------------------------------------");
    console.log("✨ DATABASE STATUS AFTER RESET:");
    console.log(`   🏦 Master Accounts    : ${accCount?.val ?? 0} (Semua saldo Rp 0)`);
    console.log(`   📁 Master Categories  : ${catCount?.val ?? 0}`);
    console.log(`   💳 Transactions       : ${txCount?.val ?? 0} (Bersih/Kosong)`);
    console.log("-------------------------------------------------");
    console.log("✅ Database reset complete! You can now start the app or import statements.");
    console.log("=================================================");
    process.exit(0);
  } catch (error) {
    console.error("❌ Database reset failed:", error);
    process.exit(1);
  }
}

main();
