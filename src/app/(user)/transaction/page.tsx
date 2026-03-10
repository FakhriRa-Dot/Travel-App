"use client";

import { getMyTransactions } from "@/services/transactionServvice";
import { Transaction } from "@/types/transaction";
import { useEffect, useState } from "react";

export default function MyTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token")!;

    getMyTransactions(token).then((res) => {
      setTransactions(res);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My Transactions</h1>

      <div className="space-y-4">
        {transactions.map((trx) => (
          <div
            key={trx.id}
            className="border rounded-lg p-4 flex justify-between"
          >
            <div>
              <p className="font-semibold">{trx.invoiceId}</p>
              <p className="text-sm text-gray-500">{trx.status}</p>
            </div>

            <p className="font-bold">Rp {trx.totalPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
