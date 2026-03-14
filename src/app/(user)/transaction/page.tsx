"use client";

import { useEffect, useState } from "react";
import { getMyTransactions } from "@/services/transactionServvice";
import { useRouter } from "next/navigation";

type Transaction = {
  id: string;
  invoiceId: string;
  totalAmount: number;
  status: string;
  proofPaymentUrl?: string;
  createdAt: string;
};

export default function MyTransactionsPage() {
  const router = useRouter();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const perPage = 10;

  useEffect(() => {
    fetchTransactions();

    const interval = setInterval(() => {
      fetchTransactions();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token")!;

      const res = await getMyTransactions(token);

      console.log("MY TRANSACTIONS:", res);

      setTransactions(res || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const startIndex = (page - 1) * perPage;
  const paginated = transactions.slice(startIndex, startIndex + perPage);
  const totalPages = Math.ceil(transactions.length / perPage);

  const statusColor = (status: string) => {
    if (status === "success") return "bg-green-100 text-green-700";
    if (status === "pending") return "bg-yellow-100 text-yellow-700";
    if (status === "cancelled") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  if (loading) {
    return <p className="p-10">Loading transactions...</p>;
  }

  return (
    <section className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-10">My Transactions</h1>

        <div className="space-y-5">
          {paginated.map((trx) => (
            <div
              key={trx.id}
              className="bg-white border rounded-xl p-6 flex justify-between items-center shadow-sm mb-3"
            >
              <div>
                <p className="font-semibold text-lg">{trx.invoiceId}</p>

                <p className="text-sm text-gray-500">
                  {new Date(trx.createdAt).toLocaleDateString("id-ID")}
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${statusColor(
                    trx.status,
                  )}`}
                >
                  {trx.status}
                </span>

                {trx.status === "pending" && trx.proofPaymentUrl && (
                  <p className="text-xs text-yellow-600 mt-2">
                    Waiting for admin confirmation
                  </p>
                )}

                {trx.status === "pending" && !trx.proofPaymentUrl && (
                  <p className="text-xs text-gray-500 mt-2">
                    Payment proof not uploaded
                  </p>
                )}
              </div>

              <div className="text-right">
                <p className="font-bold text-lg">
                  Rp {trx.totalAmount.toLocaleString("id-ID")}
                </p>

                {trx.status === "pending" && !trx.proofPaymentUrl && (
                  <button
                    onClick={() => router.push(`/payment/${trx.id}`)}
                    className="mt-3 text-blue-600 text-sm hover:underline"
                  >
                    Upload Proof
                  </button>
                )}

                {trx.proofPaymentUrl && (
                  <a
                    href={trx.proofPaymentUrl}
                    target="_blank"
                    className="block mt-2 text-xs text-blue-500 hover:underline"
                  >
                    View Proof
                  </a>
                )}
              </div>
            </div>
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
