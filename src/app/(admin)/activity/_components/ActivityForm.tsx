"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/services/categoryService";

type Props = {
  initialData?: any;
  onSubmit: (data: any) => void;
  isEdit?: boolean;
};

export default function ActivityForm({
  initialData,
  onSubmit,
  isEdit = false,
}: Props) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    province: "",
    imageUrls: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        price: initialData.price || "",
        city: initialData.city || "",
        province: initialData.province || "",
        imageUrls: initialData.imageUrls?.[0] || "",
        categoryId: initialData.categoryId || "",
      });
    }
  }, [initialData]);

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      imageUrls: [form.imageUrls],
    };

    onSubmit(payload);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-sm space-y-6"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
          required
        />

        <input
          name="province"
          placeholder="Province"
          value={form.province}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input
          name="imageUrls"
          value={form.imageUrls}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        {isEdit ? "Update Activity" : "Create Activity"}
      </button>
    </form>
  );
}
