import { getActivities } from "@/services/activityService";
import ActivityCard from "./_components/activityCard";
import FilterSidebar from "./_components/filterSidebar";

export default async function ExplorePage() {
  const activities = await getActivities();

  return (
    <main className="flex gap-10 px-16 py-10 ">
      <FilterSidebar />

      <section className="px-6 flex-1">
        <div className="mb-10">
          <h1 className="font-bold text-4xl mb-2">Discover Activities</h1>
          <p className="text-standard text-sm">Lorem ipsum dolor sit amet.</p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </section>
    </main>
  );
}
