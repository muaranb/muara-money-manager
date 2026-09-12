import { db } from "@/db";
import { transactions, accounts, categories } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { TransactionsClient } from "@/components/transactions/transactions-client";

export const dynamic = "force-dynamic";

export default async function TransactionsPage() {
  const txList = await db
    .select({
      id: transactions.id,
      date: transactions.date,
      time: transactions.time,
      amount: transactions.amount,
      type: transactions.type,
      description: transactions.description,
      note: transactions.note,
      sourceType: transactions.sourceType,
      transferPairId: transactions.transferPairId,
      accountName: accounts.name,
      categoryName: categories.name,
    })
    .from(transactions)
    .innerJoin(accounts, eq(transactions.accountId, accounts.id))
    .leftJoin(categories, eq(transactions.categoryId, categories.id))
    .orderBy(desc(transactions.date), desc(transactions.time))
    .limit(200);

  const allAccounts = await db.select().from(accounts);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <TransactionsClient
        initialTransactions={txList}
        accounts={allAccounts.map((a) => a.name)}
      />
    </div>
  );
}
