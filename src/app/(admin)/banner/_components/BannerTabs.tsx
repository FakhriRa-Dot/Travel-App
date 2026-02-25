"use client";

export default function BannerTabs() {
  const tabs = [
    "All Banners (12)",
    "Active (5)",
    "Scheduled (3)",
    "Drafts (4)",
  ];

  return (
    <div className="border-b flex gap-8 text-sm font-medium">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          className={`pb-3 ${
            i === 0
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
