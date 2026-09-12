import { db } from "@/db";
import { accounts } from "@/db/schema";
import { ImportClient } from "@/components/import/import-client";

export const dynamic = "force-dynamic";

export default async function ImportPage() {
  const allAccounts = await db.select().from(accounts);

  return <ImportClient accounts={allAccounts} />;
}
