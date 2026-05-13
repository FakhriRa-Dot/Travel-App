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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function UploadProofPage() {
  const params = useParams();
  const router = useRouter();

  const transactionId = params.id as string;

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [loading, setLoading] = useState(false);

  const [finalTotal, setFinalTotal] = useState<number | null>(null);

  useEffect(() => {
    if (!transactionId) return;

    fetchTransaction();

    const storedTotal = localStorage.getItem("paymentTotal");

    if (storedTotal) {
      setFinalTotal(Number(storedTotal));
    }
  }, [transactionId]);

  const fetchTransaction = async () => {
    try {
      const token = localStorage.getItem("token")!;

      const res = await getTransactionById(token, transactionId);

      console.log("TRANSACTION DETAIL:", res);

      setTransaction(res);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImage = async () => {
    if (!proofFile) return "";

    const formData = new FormData();
    formData.append("image", proofFile);

    const res = await fetch(`${BASE_URL}/api/v1/upload-image`, {
      method: "POST",
      headers: {
        apiKey: API_KEY as string,
      },
      body: formData,
    });

    const data = await res.json();
    console.log("UPLOAD RESPONSE:", data);

    if (!res.ok) {
      throw new Error(data.message || "Failed to upload image");
    }

    return data.url;
  };

  const handleSubmit = async () => {
    if (!proofFile) {
      alert("Please choose payment proof");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token")!;

      const uploadedUrl = await uploadImage();
      console.log(uploadedUrl);

      await updateTransactionProof(token, transactionId, {
        proofPaymentUrl: uploadedUrl,
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
              Rp{" "}
              {(finalTotal ?? transaction.totalAmount).toLocaleString("id-ID")}
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

        <p className="text-sm text-gray-500 mb-2">
          Paste the link of your payment
        </p>

        <div className="mb-6 flex items-center justify-between gap-3 rounded-lg border px-4 py-2">
          <p className="truncate text-sm text-gray-500">
            {proofFile ? proofFile.name : "No file chosen"}
          </p>

          <label
            htmlFor="proof-upload"
            className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            Choose File
          </label>

          <input
            id="proof-upload"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              const maxSize = 1 * 1024 * 1024;

              if (file.size > maxSize) {
                setFileError("File size must be lower than 1 MB");
                setProofFile(null);
                return;
              }

              setFileError("");
              setProofFile(file);
            }}
            className="hidden"
          />
        </div>

        {fileError && <p className="mb-4 text-sm text-red-500">{fileError}</p>}

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
