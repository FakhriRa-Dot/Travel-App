"use client";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { getCategories } from "@/services/categoryService";
import { Category } from "@/types/activity";

function getPaginationPages(totalPages: number, currentPage: number) {
  const pages: (number | string)[] = [];

  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  pages.push(1);

  if (currentPage > 3) {
    pages.push("...");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
}

export default function ManageCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getCategories();
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // 🔥 Manual Pagination Logic
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = categories.slice(startIndex, endIndex);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Manage Categories
        </h1>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition">
          <Plus size={18} />
          Create New Category
        </button>
      </div>

      <div className="bg-white border rounded-2xl p-6 shadow-sm flex items-center gap-4">
        <input
          type="text"
          placeholder="Search user by name or email ..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
          STATUS : ALL
        </button>

        <button className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
          SORT BY : MOST TOURS
        </button>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-6 py-4">CATEGORY NAME</th>
              <th className="text-left px-6 py-4">DESCRIPTION</th>
              <th className="text-left px-6 py-4">TOUR COUNT</th>
              <th className="text-left px-6 py-4">STATUS</th>
              <th className="text-left px-6 py-4">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className="px-6 py-4" colSpan={5}>
                  Loading...
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-5 h-5 rounded-sm object-cover"
                    />
                    <span className="font-medium text-blue-700">
                      {item.name}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                    Created: {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                      -
                    </span>
                  </td>

                  <td className="px-6 py-4 text-blue-600 font-medium">
                    Active
                  </td>

                  <td className="px-6 py-4 text-gray-500">...</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* 🔥 Pagination */}
        <div className="flex justify-between items-center px-6 py-4 border-t text-sm text-gray-500">
          <p>
            Page {currentPage} of {totalPages || 1}
          </p>

          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>

            {getPaginationPages(totalPages, currentPage).map((page, index) =>
              page === "..." ? (
                <span key={index} className="px-2">
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  onClick={() => setCurrentPage(page as number)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === page ? "bg-blue-600 text-white" : "bg-white"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border rounded-2xl p-8 shadow-sm">
          <p className="text-sm text-gray-400 uppercase tracking-wide">
            Total Categories
          </p>
          <h2 className="text-4xl font-bold text-blue-800 mt-4">
            {categories.length}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-8 shadow-sm">
          <p className="text-sm text-gray-400 uppercase tracking-wide">
            Most Popular
          </p>
          <h2 className="text-4xl font-bold text-blue-800 mt-4">
            {categories[0]?.name || "-"}
          </h2>
        </div>
      </div>
    </div>
  );
}
