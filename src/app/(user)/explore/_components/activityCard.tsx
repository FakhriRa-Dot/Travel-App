import { Activity } from "@/types/activity";
import { Heart } from "lucide-react";
import Link from "next/link";

type Props = {
  activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
  const imageUrl =
    activity.imageUrls?.find((url) => url.startsWith("http")) ?? "/image.png";

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative h-48">
        <img
          src={imageUrl}
          alt={activity.title}
          className="object-cover w-full h-full"
        />

        {/* <div className="absolute top-3 right-3 bg-white p-2 rounded-full">
          <Heart />
        </div> */}
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-400">
          {activity.city}, {activity.province}
        </p>
        <h3 className="font-semibold text-gray-800 mt-1">{activity.title}</h3>

        <p className="text-sm text-standard line-clamp-2 mt-2">
          {activity.description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="font-semibold text-gray-800">
              Rp. {activity.price.toLocaleString("id-ID")}
            </p>
          </div>

          <Link
            href={`/explore/${activity.id}`}
            className="bg-blue-600 text-white text-xs px-4 py-2 rounded-full hover:bg-blue-700 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
