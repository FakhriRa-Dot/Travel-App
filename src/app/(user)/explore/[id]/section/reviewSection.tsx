import { Activity } from "@/types/activity";

type Props = {
  activity: Activity;
};

export default function ReviewSection({ activity }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Guest Reviews</h2>

      <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-6 w-fit">
        <div className="text-center">
          <p className="text-4xl font-bold text-blue-600">{activity.rating}</p>
          <p className="text-sm text-gray-500">
            Based on {activity.total_reviews.toLocaleString()} reviews
          </p>
        </div>
      </div>
    </div>
  );
}
