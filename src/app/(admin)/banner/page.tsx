"use client";

import { Plus } from "lucide-react";
import BannerTabs from "./_components/BannerTabs";
import BannerCard from "./_components/BannerCard";

export default function BannerPage() {
  return (
    <div className="space-y-10">
      {/* ===== Header ===== */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Homepage Banners
          </h1>
          <p className="text-gray-500 mt-2">
            Control the visual storytelling of your agencys landing page.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition">
          <Plus size={18} />
          Create Banner
        </button>
      </div>

      {/* ===== Tabs ===== */}
      <BannerTabs />

      {/* ===== Banner List ===== */}
      <div className="space-y-6">
        <BannerCard
          status="ACTIVE"
          title="Summer Maldives Special"
          path="/deals/maldives-summer-2024"
          dimensions="1920 x 600 px"
          visibility="Desktop & Mobile"
          schedule="Jun 1 - Aug 31, 2024"
          image="/banner1.jpg"
        />

        <BannerCard
          status="SCHEDULED"
          title="Winter Ski Getaways"
          path="/destinations/europe/ski-packages"
          dimensions="1920 x 800 px"
          visibility="Desktop Only"
          schedule="Nov 1 - Jan 15, 2025"
          image="/banner2.jpg"
        />

        <BannerCard
          status="DRAFT"
          title="Early Bird Europe 2025"
          path="/offers/early-bird-europe"
          dimensions="1920 x 600 px"
          visibility="All Devices"
          schedule="Not set"
          image="/banner3.jpg"
        />
      </div>

      {/* ===== Load More ===== */}
      <div className="flex justify-center">
        <button className="px-6 py-3 border rounded-xl text-gray-600 hover:bg-gray-100 transition">
          Load More Banners
        </button>
      </div>

      {/* ===== Bottom Info Section ===== */}
      <div className="grid grid-cols-3 gap-6 bg-gray-50 p-8 rounded-2xl border">
        <div>
          <h3 className="font-semibold text-lg">Recommended Specs</h3>
          <p className="text-sm text-gray-500 mt-2">
            For optimal performance, banners should be 1920×600px and under
            500KB. Use .webp or .jpg formats.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">Automated Scheduling</h3>
          <p className="text-sm text-gray-500 mt-2">
            Set start and end dates to automatically launch seasonal promotions
            without manual intervention.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">Dynamic Reordering</h3>
          <p className="text-sm text-gray-500 mt-2">
            Simply drag the handles to change the order of banners on the
            homepage. Changes apply instantly.
          </p>
        </div>
      </div>
    </div>
  );
}
