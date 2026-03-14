"use client";

import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/services/categoryService";
import { Category } from "@/types/activity";
import Pagination from "@/components/common/Pagination";
import SafeImage from "@/components/common/SafeImage";

export default function ManageCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const processedData = useMemo(() => {
    return categories
      .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))

      .sort((a, b) => {
        if (sortBy === "az") return a.name.localeCompare(b.name);
        if (sortBy === "za") return b.name.localeCompare(a.name);
        if (sortBy === "newest") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        return 0;
      });
  }, [categories, search, sortBy]);

  const totalPages = Math.ceil(processedData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = processedData.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Manage Categories
        </h1>

        <button
          onClick={() => {
            setIsCreateOpen(true);
            setName("");
            setImageUrl("");
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Create New Category
        </button>
      </div>

      <div className="bg-white border rounded-2xl p-6 shadow-sm flex items-center gap-4">
        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-600"
        >
          <option value="newest">SORT : NEWEST</option>
          <option value="az">SORT : A-Z</option>
          <option value="za">SORT : Z-A</option>
        </select>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-6 py-4">CATEGORY NAME</th>
              <th className="text-left px-6 py-4">CREATED</th>
              <th className="text-left px-6 py-4">STATUS</th>
              <th className="text-left px-6 py-4">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-4">
                  Loading...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">
                  No data found
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <SafeImage
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-5 h-5 rounded-sm object-cover"
                    />
                    <span className="font-medium text-blue-700">
                      {item.name}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-blue-600 font-medium">
                    Active
                  </td>

                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedCategory(item);
                        setName(item.name);
                        setImageUrl(item.imageUrl);
                        setIsEditOpen(true);
                      }}
                      className="text-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={async () => {
                        if (confirm("Are you sure?")) {
                          await deleteCategory(item.id);
                          fetchCategories();
                        }
                      }}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center px-6 py-4 border-t text-sm text-gray-500">
          <p>
            Page {currentPage} of {totalPages || 1}
          </p>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {isCreateOpen && (
        <Modal
          title="Create Category"
          onClose={() => setIsCreateOpen(false)}
          onSubmit={async () => {
            await createCategory({ name, imageUrl });
            fetchCategories();
            setIsCreateOpen(false);
          }}
          name={name}
          imageUrl={imageUrl}
          setName={setName}
          setImageUrl={setImageUrl}
          submitLabel="Save"
        />
      )}

      {isEditOpen && selectedCategory && (
        <Modal
          title="Edit Category"
          onClose={() => setIsEditOpen(false)}
          onSubmit={async () => {
            await updateCategory(selectedCategory.id, { name, imageUrl });
            fetchCategories();
            setIsEditOpen(false);
          }}
          name={name}
          imageUrl={imageUrl}
          setName={setName}
          setImageUrl={setImageUrl}
          submitLabel="Update"
        />
      )}
    </div>
  );
}

type ModalProps = {
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  name: string;
  imageUrl: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  submitLabel: string;
};

function Modal({
  title,
  onClose,
  onSubmit,
  name,
  imageUrl,
  setName,
  setImageUrl,
  submitLabel,
}: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96 space-y-4">
        <h2 className="text-lg font-semibold">{title}</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={onSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
