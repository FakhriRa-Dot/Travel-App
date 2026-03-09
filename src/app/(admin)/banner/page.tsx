"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import BannerCard from "./_components/BannerCard";
import {
  getBanners,
  deleteBanner,
  createBanner,
  updateBanner,
} from "@/services/bannerService";

type Banner = {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
};

export default function BannerPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const data = await getBanners();
      setBanners(data);
    } catch (error) {
      console.error("Failed to fetch banners:", error);
    }
  }

  async function handleSubmit() {
    if (!formData.name || !formData.imageUrl) {
      alert("All fields required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized. Please login again.");
      return;
    }

    try {
      if (editingBanner) {
        await updateBanner(editingBanner.id, formData, token);
      } else {
        await createBanner(formData, token);
      }

      setShowModal(false);
      setEditingBanner(null);
      setFormData({ name: "", imageUrl: "" });

      await fetchData();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  async function handleDelete(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this banner?",
    );

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized");
      return;
    }

    try {
      await deleteBanner(id, token);
      setBanners((prev) => prev.filter((b) => b.id !== id));
      alert("Banner deleted successfully");
    } catch (error) {
      alert("Failed to delete banner");
    }
  }

  function handleEdit(banner: Banner) {
    setEditingBanner(banner);
    setFormData({
      name: banner.name,
      imageUrl: banner.imageUrl,
    });
    setShowModal(true);
  }

  const visibleBanners = banners.slice(0, visibleCount);

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Homepage Banners
          </h1>
          <p className="text-gray-500 mt-2">
            Control the visual storytelling of your agency’s landing page.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingBanner(null);
            setFormData({ name: "", imageUrl: "" });
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Create Banner
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-6">
        {visibleBanners.map((banner) => (
          <BannerCard
            key={banner.id}
            id={banner.id}
            name={banner.name}
            imageUrl={banner.imageUrl}
            createdAt={banner.createdAt}
            updatedAt={banner.createdAt}
            onDelete={handleDelete}
            onEdit={() => handleEdit(banner)}
          />
        ))}
      </div>

      {/* LOAD MORE */}
      {visibleCount < banners.length && (
        <div className="flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 3)}
            className="px-6 py-3 border rounded-xl text-gray-600 hover:bg-gray-100 transition"
          >
            Load More Banners
          </button>
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl w-96 space-y-4">
            <h2 className="text-xl font-semibold">
              {editingBanner ? "Edit Banner" : "Create Banner"}
            </h2>

            <input
              type="text"
              placeholder="Banner Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border px-4 py-2 rounded-lg"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              className="w-full border px-4 py-2 rounded-lg"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
