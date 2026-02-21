import { Activity } from "@/types/activity";
import { MapPin } from "lucide-react";

type Props = {
  activity: Activity;
};

export default function ActivityDescription({ activity }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">About This Place</h2>

      <p className="text-[#5E676C] leading-relaxed max-w-6xl mb-6">
        {activity.description}
      </p>

      <div className="flex items-center gap-2 text-standard">
        <MapPin className="w-5 h-5" />{" "}
        <span>
          {activity.address}, {activity.city}, {activity.province}
        </span>
      </div>
    </div>
  );
}
