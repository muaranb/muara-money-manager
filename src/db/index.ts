import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import { ensureDatabaseInitialized } from "./bootstrap";

const url = process.env.TURSO_DATABASE_URL || "file:local.db";
const authToken = process.env.TURSO_AUTH_TOKEN || undefined;

export const client = createClient({
  url,
  authToken,
});

export const db = drizzle(client, { schema });

// Internal self-healing mutex & state tracking
let isInitialized = false;
let isInitializing = false;
let initPromise: Promise<boolean> | null = null;

export async function checkAndInitialize(): Promise<boolean> {
  if (isInitialized) return false;
  if (initPromise) return initPromise;

  isInitializing = true;
  initPromise = ensureDatabaseInitialized(client, db)
    .then((created) => {
      isInitialized = true;
      isInitializing = false;
      return created;
    })
    .catch((err) => {
      isInitializing = false;
      initPromise = null;
      throw err;
    });

  return initPromise;
}

// Hook execute and batch to ensure auto-bootstrap on first query
const origExecute = client.execute.bind(client);
const origBatch = client.batch.bind(client);

client.execute = async function (stmt) {
  if (!isInitialized && !isInitializing) {
    const sqlStr = typeof stmt === "object" ? stmt.sql : String(stmt);
    if (!sqlStr.includes("sqlite_master")) {
      await checkAndInitialize();
    }
  }
  return origExecute(stmt);
};

client.batch = async function (stmts, mode) {
  if (!isInitialized && !isInitializing) {
    await checkAndInitialize();
  }
  return origBatch(stmts, mode);
};

export { ensureDatabaseInitialized };
