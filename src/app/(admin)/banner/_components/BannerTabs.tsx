"use client";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  total: number;
};

export default function BannerTabs({ activeTab, setActiveTab, total }: Props) {
  const tabs = ["All", "Active"];

  return (
    <div className="border-b flex gap-8 text-sm font-medium">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-3 ${
            activeTab === tab
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab} ({total})
        </button>
      ))}
    </div>
  );
}
