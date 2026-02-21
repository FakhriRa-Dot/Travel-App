"use client";

import { useState } from "react";
import { Activity } from "@/types/activity";

type Props = {
  activity: Activity;
};

export default function BookingCard({ activity }: Props) {
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");

  return (
    <div className="w-95">
      <div className="bg-[#F4F6F8] p-6 rounded-3xl shadow-sm sticky top-10 space-y-6">
        <div className="flex justify-between items-start">
          <p className="text-2xl font-bold text-[#3A6E8F]">
            Rp. {activity.price.toLocaleString("id-ID")}
          </p>
          <span className="text-sm text-[#7FA6BD] mt-1">per person</span>
        </div>

        <div>
          <p className="text-xs tracking-wider text-[#7FA6BD] mb-2">DATE</p>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-white border border-[#D9E3EA] rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7FA6BD] text-standard"
          />
        </div>

        <div>
          <p className="text-xs tracking-wider text-[#7FA6BD] mb-2">GUESTS</p>

          <div className="flex items-center justify-center gap-6 bg-white border border-[#D9E3EA] rounded-full px-4 py-3">
            <button
              onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
              className="w-8 h-8 rounded-full bg-[#E5EEF4] flex items-center justify-center text-lg"
            >
              −
            </button>

            <span className="font-medium text-lg">{guests}</span>

            <button
              onClick={() => setGuests((prev) => prev + 1)}
              className="w-8 h-8 rounded-full bg-[#7FA6BD] text-white flex items-center justify-center text-lg"
            >
              +
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-[#164E63] text-white py-3 rounded-2xl font-medium hover:opacity-90 transition">
            Book Now
          </button>

          <button className="w-full border border-[#7FA6BD] text-[#164E63] py-3 rounded-2xl font-medium hover:bg-[#E5EEF4] transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
