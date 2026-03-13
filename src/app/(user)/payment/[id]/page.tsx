"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  updateTransactionProof,
  getTransactionById,
} from "@/services/transactionServvice";

type Transaction = {
  id: string;
  invoiceId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
};

export default function UploadProofPage() {
  const params = useParams();
  const router = useRouter();

  const transactionId = params.id as string;

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [proofUrl, setProofUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransaction();
  }, []);

  const fetchTransaction = async () => {
    try {
      const token = localStorage.getItem("token")!;

      const res = await getTransactionById(token, transactionId);

      console.log("TRANSACTION DETAIL:", res);

      setTransaction(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!proofUrl) {
      alert("Please paste proof payment URL");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token")!;

      await updateTransactionProof(token, transactionId, {
        proofPaymentUrl: proofUrl,
      });

      alert("Proof uploaded successfully");

      router.push("/transaction");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (status: string) => {
    if (status === "success") return "bg-green-100 text-green-700";
    if (status === "pending") return "bg-yellow-100 text-yellow-700";
    if (status === "cancel") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  if (!transaction) {
    return <p className="p-10">Loading transaction...</p>;
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-105">
        <h1 className="text-xl font-semibold mb-6">Upload Payment Proof</h1>

        <div className="border rounded-lg p-4 mb-6 space-y-2">
          <div>
            <p className="text-sm text-gray-500">Invoice</p>
            <p className="font-semibold">{transaction.invoiceId}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p>{new Date(transaction.createdAt).toLocaleDateString("id-ID")}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Payment</p>
            <p className="font-semibold text-lg">
              Rp {transaction.totalAmount.toLocaleString("id-ID")}
            </p>
          </div>

          <span
            className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${statusColor(
              transaction.status,
            )}`}
          >
            {transaction.status}
          </span>
        </div>

        {/* Proof Input */}

        <p className="text-sm text-gray-500 mb-2">
          Paste the link of your payment screenshot
        </p>

        <input
          type="text"
          placeholder="https://example.com/payment-proof.jpg"
          value={proofUrl}
          onChange={(e) => setProofUrl(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-6"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Submit Proof"}
        </button>
      </div>
    </section>
  );
}
