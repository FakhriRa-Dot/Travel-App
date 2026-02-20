import { Boxes, CircleDollarSign, Star } from "lucide-react";

export default function FilterSidebar() {
  return (
    <aside className="w-90 p-6 h-fit shadow-xs">
      <div className="flex justify-between items-center mb-12">
        <h2 className="font-semibold text-3xl">Filters</h2>
        <button className="text-sm text-standard">Reset All</button>
      </div>

      <div className="mb-8">
        <div className="flex gap-2">
          <CircleDollarSign className="w-5 h-5" />
          <p className="font-medium text-sm mb-3">Price Range</p>
        </div>
        <input type="range" className="w-full" />
        <div className="flex justify-between text-xs text-standard">
          <span>$0</span>
          <span>$250</span>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex gap-2">
          <Star className="w-5 h-5" />
          <p className="font-medium text-sm mb-3">Star Rating</p>
        </div>
        <div className="space-y-2 ps-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" />4 Stars & Up
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" />3 Stars & Up
          </label>
        </div>
      </div>

      <div>
        <div className="flex gap-2">
          <Boxes className="w-5 h-5" />
          <p className="font-medium text-sm mb-3">Category</p>
        </div>
        <div className="space-y-2 text-sm ps-6">
          <p>Beach</p>
          <p>Beach</p>
          <p>Beach</p>
        </div>
      </div>
    </aside>
  );
}
