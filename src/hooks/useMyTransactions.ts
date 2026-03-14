"use client";

import { useEffect, useState } from "react";
import { getMyTransactions } from "@/services/transactionServvice";
import { Transaction } from "@/types/transaction";
import { TransactionListItem } from "../types/transactionView";

function mapTransactions(data: Transaction[]): TransactionListItem[] {
  return data.map((trx) => ({
    id: trx.id,
    invoiceId: trx.invoiceId,
    status: trx.status,
    totalAmount: trx.totalAmount,
    proofPaymentUrl: trx.proofPaymentUrl,
    createdAt: trx.createdAt,
  }));
}

export function useMyTransactions() {
  const [transactions, setTransactions] = useState<TransactionListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();

    const interval = setInterval(fetchTransactions, 5000);

    return () => clearInterval(interval);
  }, []);

  async function fetchTransactions() {
    try {
      const token = localStorage.getItem("token")!;

      const res: Transaction[] = await getMyTransactions(token);

      setTransactions(mapTransactions(res || []));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    transactions,
    loading,
  };
}
