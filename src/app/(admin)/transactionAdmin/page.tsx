"use client";

import Pagination from "@/components/common/Pagination";
import {
  getAllTransactions,
  updateTransactionStatus,
} from "@/services/transactionServvice";
import { Transaction } from "@/types/transaction";
import { useEffect, useState } from "react";

export default function ManageTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const token = localStorage.getItem("token")!;

    const data = await getAllTransactions(token);

    console.log("ALL TRANSACTIONS:", data);

    setTransactions(data || []);
  };

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentTransactions = sortedTransactions.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const totalTransactions = transactions.length;

  const pendingTransactions = transactions.filter(
    (trx) => trx.status === "pending",
  ).length;

  const successTransactions = transactions.filter(
    (trx) => trx.status === "success",
  ).length;

  const failedTransactions = transactions.filter(
    (trx) => trx.status === "failed",
  ).length;

  const cancelledTransactions = transactions.filter(
    (trx) => trx.status === "cancelled",
  ).length;

  const handleApprove = async (id: string) => {
    try {
      const token = localStorage.getItem("token")!;

      await updateTransactionStatus(token, id, "success");

      fetchTransactions();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const token = localStorage.getItem("token")!;

      await updateTransactionStatus(token, id, "failed");

      fetchTransactions();
    } catch (error) {
      console.error(error);
    }
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "failed":
        return "bg-red-100 text-red-700";
      case "cancelled":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Manage Transactions</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="border rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold">{totalTransactions}</p>
        </div>

        <div className="border rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {pendingTransactions}
          </p>
        </div>

        <div className="border rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500">Success</p>
          <p className="text-2xl font-bold text-green-600">
            {successTransactions}
          </p>
        </div>

        <div className="border rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500">Failed</p>
          <p className="text-2xl font-bold text-red-600">
            {failedTransactions}
          </p>
        </div>

        <div className="border rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500">Cancelled</p>
          <p className="text-2xl font-bold text-gray-600">
            {cancelledTransactions}
          </p>
        </div>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Invoice</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Payment</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Proof</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {currentTransactions.map((trx) => (
            <tr key={trx.id}>
              <td className="border p-2">{trx.invoiceId}</td>

              <td className="border p-2">
                {new Date(trx.createdAt).toLocaleDateString("id-ID")}
              </td>

              <td className="border p-2">{trx.payment_method?.name}</td>

              <td className="border p-2">
                Rp {trx.totalAmount?.toLocaleString("id-ID")}
              </td>

              <td className="border p-2 text-center">
                {trx.proofPaymentUrl ? (
                  <a
                    href={trx.proofPaymentUrl}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    View
                  </a>
                ) : (
                  <span className="text-gray-400">No proof</span>
                )}
              </td>

              <td className="border p-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${statusBadge(
                    trx.status,
                  )}`}
                >
                  {trx.status}
                </span>
              </td>

              <td className="border p-2 space-x-2">
                {trx.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(trx.id)}
                      className="bg-bluebaby text-white px-2 py-1 rounded text-sm"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleReject(trx.id)}
                      className="bg-standard text-white px-2 py-1 rounded text-sm"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
