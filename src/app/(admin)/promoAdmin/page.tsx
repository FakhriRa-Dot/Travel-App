"use client";

import { useEffect, useState } from "react";
import { getPromos, deletePromo } from "@/services/promoService";
import { Promo } from "@/types/promo";
import Pagination from "@/components/common/Pagination";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ManagePromoPage() {
  const router = useRouter();
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(promos.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentPromos = promos.slice(startIndex, endIndex);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  function handleEdit(id: string) {
    router.push(`/promoAdmin/edit/${id}`);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPromos(token);
        setPromos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token]);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure?")) return;

    try {
      await deletePromo(id, token);
      setPromos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      alert("Failed to delete promo");
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Management Promo
        </h1>

        <button
          onClick={() => router.push("/promoAdmin/create")}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition"
        >
          + Create New Promo
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="text-left px-6 py-4">Code</th>
              <th className="text-left px-6 py-4">Title</th>
              <th className="text-left px-6 py-4">Discount</th>
              <th className="text-left px-6 py-4">Min Claim</th>
              <th className="text-left px-6 py-4">Created At</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentPromos.map((promo) => (
              <tr key={promo.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{promo.promo_code}</td>

                <td className="px-6 py-4 max-w-xs truncate">{promo.title}</td>

                <td className="px-6 py-4 text-blue-600 font-medium">
                  Rp {promo.promo_discount_price.toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  Rp {promo.minimum_claim_price.toLocaleString()}
                </td>

                <td className="px-6 py-4 text-gray-500 text-sm">
                  {new Date(promo.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 space-x-3">
                  <button
                    onClick={() => handleEdit(promo.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(promo.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center px-6 py-4 border-t">
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1} - {Math.min(endIndex, promos.length)} of{" "}
            {promos.length}
          </p>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}
