"use client";

import { useEffect, useState } from "react";
import { Boxes, CircleDollarSign, Star } from "lucide-react";
import { getCategories } from "@/services/categoryService";

type Props = {
  onFilterChange: (filters: {
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    categoryId?: string;
  }) => void;
};

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function FilterSidebar({ onFilterChange }: Props) {
  const [categories, setCategories] = useState<any[]>([]);
  const [price, setPrice] = useState(5000000);
  const [rating, setRating] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const DEFAULT_PRICE = 5000000;

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const data = await getCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  }

  function applyFilter() {
    onFilterChange({
      minPrice: 0,
      maxPrice: price,
      rating: rating ?? undefined,
      categoryId: selectedCategory ?? undefined,
    });
  }

  function resetFilter() {
    setPrice(DEFAULT_PRICE);
    setRating(null);
    setSelectedCategory(null);
    onFilterChange({});
  }

  const isFilterActive =
    price !== DEFAULT_PRICE || rating !== null || selectedCategory !== null;

  return (
    <aside className="w-80 p-6 h-fit shadow-sm bg-white rounded-xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-semibold text-2xl">Filters</h2>
        <button
          onClick={resetFilter}
          className="text-sm text-blue-500 hover:underline"
        >
          Reset All
        </button>
      </div>

      {/* PRICE */}
      <div className="mb-8">
        <div className="flex gap-2 items-center mb-3">
          <CircleDollarSign className="w-5 h-5" />
          <p className="font-medium text-sm">Rentang Harga</p>
        </div>

        <input
          type="range"
          min={0}
          max={5000000}
          step={100000}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full"
        />

        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{formatRupiah(0)}</span>
          <span>{formatRupiah(price)}</span>
        </div>
      </div>

      {/* RATING */}
      <div className="mb-8">
        <div className="flex gap-2 items-center mb-3">
          <Star className="w-5 h-5" />
          <p className="font-medium text-sm">Rating</p>
        </div>

        <div className="space-y-2 pl-6">
          {[4, 3].map((star) => (
            <label key={star} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="rating"
                checked={rating === star}
                onChange={() => setRating(star)}
              />
              {star} Bintang ke atas
            </label>
          ))}
        </div>
      </div>

      {/* CATEGORY */}
      <div>
        <div className="flex gap-2 items-center mb-3">
          <Boxes className="w-5 h-5" />
          <p className="font-medium text-sm">Kategori</p>
        </div>

        <div className="space-y-2 pl-6 text-sm">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat.id}
                onChange={() => setSelectedCategory(cat.id)}
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={applyFilter}
        disabled={!isFilterActive}
        className={`mt-6 w-full py-2 rounded-lg transition ${
          isFilterActive
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Apply Filter
      </button>
    </aside>
  );
}
