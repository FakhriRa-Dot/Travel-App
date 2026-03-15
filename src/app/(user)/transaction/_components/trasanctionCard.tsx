"use client";

import { TransactionListItem } from "@/types/transactionView";
import { getStatusColor } from "../_utils/transactionStatus";

type Props = {
  trx: TransactionListItem;
  onUpload: (id: string) => void;
};

export default function TransactionCard({ trx, onUpload }: Props) {
  const serviceFee = trx.totalAmount * 0.05;
  const finalTotal = trx.totalAmount + serviceFee;

  return (
    <div className="bg-white border rounded-xl p-6 flex justify-between items-center shadow-sm mb-3">
      <div>
        <p className="font-semibold text-lg">{trx.invoiceId}</p>

        <p className="text-sm text-gray-500">
          {new Date(trx.createdAt).toLocaleDateString("id-ID")}
        </p>

        <span
          className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${getStatusColor(
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
          Rp {finalTotal.toLocaleString("id-ID")}
        </p>

        {trx.status === "pending" && !trx.proofPaymentUrl && (
          <button
            onClick={() => onUpload(trx.id)}
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
  );
}
