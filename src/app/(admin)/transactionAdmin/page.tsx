"use client";

import { getAllTransactions } from "@/services/transactionServvice";
import { Transaction } from "@/types/transaction";
import { useEffect, useState } from "react";

export default function ManageTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token")!;

    getAllTransactions(token).then((res) => {
      setTransactions(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Manage Transactions</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Invoice</th>
            <th className="border p-2">User</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((trx) => (
            <tr key={trx.id}>
              <td className="border p-2">{trx.invoiceId}</td>
              <td className="border p-2">{trx.user?.name}</td>
              <td className="border p-2">{trx.totalPrice}</td>
              <td className="border p-2">{trx.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
