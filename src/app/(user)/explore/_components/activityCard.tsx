import { Activity } from "@/types/activity";
import { Heart } from "lucide-react";
import Image from "next/image";

type Props = {
  activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative h-48">
        <Image
          src={activity.imageUrls?.[0] || "/image.png"}
          alt={activity.title}
          fill
          className="object-cover"
        />

        <div className="absolute top-3 right-3 bg-white p-2 rounded-full">
          <Heart />
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-400">Nama Daerah</p>
        <h3 className="font-semibold text-gray-800 mt-1">{activity.title}</h3>

        <p className="text-sm text-standard line-clamp-2 mt-2">
          {activity.description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-xs text-gray-400">FROM</p>
            <p className="font-semibold text-gray-800">$150</p>
          </div>

          <button className="bg-blue-600 text-white text-xs px-4 py-2 rounded-full hover:bg-blue-700">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
