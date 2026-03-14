"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Activity } from "@/types/activity";
import { addToCart } from "@/services/cartService";

type Props = {
  activity: Activity;
};

export default function BookingCard({ activity }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        router.push("/login");
        return;
      }

      setLoading(true);

      await addToCart({
        activityId: activity.id,
      });

      router.push("/cart");
    } catch (error: any) {
      alert(error.message || "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-80">
      <div className="bg-[#F4F6F8] p-6 rounded-3xl shadow-sm sticky top-10 space-y-6">
        <div className="flex justify-between items-start">
          <p className="text-2xl font-bold text-[#3A6E8F]">
            Rp. {Number(activity.price).toLocaleString("id-ID")}
          </p>
          <span className="text-sm text-[#7FA6BD] mt-1">per activity</span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="w-full bg-[#164E63] text-white py-3 rounded-2xl font-medium disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
