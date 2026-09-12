import { db } from "@/db";
import { accounts } from "@/db/schema";
import { AccountsClient } from "@/components/accounts/accounts-client";

export const dynamic = "force-dynamic";

export default async function AccountsPage() {
  const allAccounts = await db.select().from(accounts);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <AccountsClient initialAccounts={allAccounts} />
    </div>
  );
}
