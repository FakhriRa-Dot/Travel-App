import { getActivities } from "@/services/activityService";
import ActivityCard from "../../explore/_components/activityCard";
import Link from "next/link";

export default async function BannerSection() {
  const activities = await getActivities();

  if (!activities || activities.length === 0) {
    return (
      <section className="py-20 text-center text-gray-400">
        No activities available.
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-heading">Popular Activities</h2>

          <Link
            href="/explore"
            className="text-blue-600 font-semibold hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {activities.slice(0, 3).map((activity: any) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </section>
  );
}
