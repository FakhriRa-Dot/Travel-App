"use client";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getActivities, deleteActivity } from "@/services/activityService";
import Pagination from "@/components/common/Pagination";

export default function ManageActivityPage() {
  const router = useRouter();

  const [activities, setActivities] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getActivities();
        setActivities(data ?? []);
      } catch (error) {
        console.error(error);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function handleDelete(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this activity?",
    );

    if (!confirmDelete) return;

    try {
      await deleteActivity(id);

      setActivities((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete activity");
    }
  }

  function handleEdit(id: string) {
    router.push(`/activity/edit/${id}`);
  }

  const totalPages = Math.ceil(activities.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentActivities = activities.slice(startIndex, endIndex);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Management Activity
        </h1>

        <button
          onClick={() => router.push("/activity/create")}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Create New Activity
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
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : currentActivities.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No activities found
                </td>
              </tr>
            ) : (
              currentActivities.map((activity) => (
                <tr
                  key={activity.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-6 flex items-center gap-4">
                    <img
                      src={activity.imageUrls?.[0] || "/image.png"}
                      alt={activity.title}
                      className="w-16 h-12 object-cover rounded-md"
                    />

                    <div>
                      <p className="font-semibold text-gray-800">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.city}, {activity.province}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-6">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                      {activity.category?.name}
                    </span>
                  </td>

                  <td className="px-6 py-6 font-medium text-gray-800">
                    Rp. {activity.price}
                  </td>

                  <td className="px-6 py-6 text-blue-600 font-medium">
                    {activity.status}
                  </td>

                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleEdit(activity.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(activity.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {!loading && activities.length > 0 && (
          <div className="flex justify-between items-center px-6 py-4 border-t text-sm text-gray-500">
            <p>
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, activities.length)} of {activities.length}{" "}
              results
            </p>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
