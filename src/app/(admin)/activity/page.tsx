"use client";

import { Plus } from "lucide-react";

export default function ManageActivityPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Management Activity
        </h1>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition">
          <Plus size={18} />
          Create New Category
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {[
          { label: "Total Activities", value: 124 },
          { label: "Active", value: 102 },
          { label: "Draft", value: 2 },
          { label: "Archived", value: 0 },
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

      <div className="bg-white border rounded-2xl p-6 shadow-sm flex items-center gap-4">
        <input
          type="text"
          placeholder="Search user by name or email ..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
          All Categories
        </button>

        <button className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
          Sort By: Newest
        </button>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="text-left px-6 py-4">ACTIVITY</th>
              <th className="text-left px-6 py-4">CATEGORY</th>
              <th className="text-left px-6 py-4">PRICE</th>
              <th className="text-left px-6 py-4">STATUS</th>
              <th className="text-left px-6 py-4">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t hover:bg-gray-50 transition">
              <td className="px-6 py-6 flex items-center gap-4">
                <div className="w-16 h-12 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">
                  img
                </div>

                <div>
                  <p className="font-semibold text-gray-800">Nama Activity</p>
                  <p className="text-xs text-gray-500">nama kota, negara</p>
                </div>
              </td>

              <td className="px-6 py-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                  Adventure
                </span>
              </td>

              <td className="px-6 py-6 font-medium text-gray-800">
                Rp. 50.000
              </td>

              <td className="px-6 py-6 text-blue-600 font-medium">Active</td>

              <td className="px-6 py-6 text-gray-500">...</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-between items-center px-6 py-4 border-t text-sm text-gray-500">
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
