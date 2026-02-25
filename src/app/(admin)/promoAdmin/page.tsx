"use client";

import { Plus } from "lucide-react";

export default function ManagePromoPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Management Activity
        </h1>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition">
          <Plus size={18} />
          Create New Promo
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {[
          { label: "Total Active Promos", value: 124 },
          { label: "Total Redeemed", value: 102 },
          { label: "Expiring Soon", value: 2 },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white border rounded-2xl p-6 shadow-sm"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <h2 className="text-4xl font-bold mt-3 text-gray-900">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="flex justify-between items-center px-8 py-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Promotion List
          </h2>

          <div className="flex gap-4">
            <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200">
              All Categories
            </button>

            <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200">
              Sort By: Newest
            </button>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="text-left px-8 py-4">Promo Code</th>
              <th className="text-left px-8 py-4">Campaign Name</th>
              <th className="text-left px-8 py-4">Discount</th>
              <th className="text-left px-8 py-4">Status</th>
              <th className="text-left px-8 py-4">Validity Period</th>
              <th className="text-left px-8 py-4">Usage</th>
              <th className="text-left px-8 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t hover:bg-gray-50 transition">
              <td className="px-8 py-6 font-medium text-gray-800">PROMO2026</td>

              <td className="px-8 py-6">New Year Campaign</td>

              <td className="px-8 py-6 text-blue-600 font-medium">20%</td>

              <td className="px-8 py-6">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">
                  Active
                </span>
              </td>

              <td className="px-8 py-6 text-gray-600">
                01 Jan 2026 - 31 Jan 2026
              </td>

              <td className="px-8 py-6 text-gray-600">45 / 100</td>

              <td className="px-8 py-6 text-gray-500">...</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-between items-center px-8 py-4 border-t text-sm text-gray-500">
          <p>Showing 1 to 5 of 1,285 results</p>

          <div className="flex items-center gap-2">
            <button className="px-2 py-1 border rounded">&lt;</button>
            <button className="px-2 py-1 bg-blue-600 text-white rounded">
              1
            </button>
            <button className="px-2 py-1 border rounded">2</button>
            <button className="px-2 py-1 border rounded">3</button>
            <span>...</span>
            <button className="px-2 py-1 border rounded">127</button>
            <button className="px-2 py-1 border rounded">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
