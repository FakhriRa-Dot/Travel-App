"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMyTransactions } from "@/hooks/useMyTransactions";
import TransactionCard from "./_components/trasanctionCard";

export default function MyTransactionsPage() {
  const router = useRouter();

  const { transactions, loading } = useMyTransactions();

  const [page, setPage] = useState(1);

  const perPage = 10;

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const startIndex = (page - 1) * perPage;
  const paginated = sortedTransactions.slice(startIndex, startIndex + perPage);
  const totalPages = Math.ceil(sortedTransactions.length / perPage);

  function handleUpload(id: string) {
    router.push(`/payment/${id}`);
  }

  if (loading) {
    return <p className="p-10">Loading transactions...</p>;
  }

  return (
    <section className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-10">My Transactions</h1>

        <div className="space-y-5">
          {paginated.map((trx) => (
            <TransactionCard key={trx.id} trx={trx} onUpload={handleUpload} />
          ))}

          {!transactions.length && (
            <p className="text-center text-gray-500">
              You have no transactions yet
            </p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded-lg border ${
                  page === i + 1 ? "bg-blue-600 text-white" : "bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
