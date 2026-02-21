import { Activity } from "@/types/activity";

type Props = {
  activity: Activity;
};

export default function ActivityFacilities({ activity }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Facilities</h2>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <p className="text-standard">{activity.facilities}</p>
      </div>
    </div>
  );
}
