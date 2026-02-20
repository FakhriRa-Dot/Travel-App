import { getActivities } from "@/services/activityService";
import ActivityCard from "./_components/activityCard";
import FilterSidebar from "./_components/filterSidebar";

export default async function ExplorePage() {
  let activities = [];

  try {
    activities = await getActivities();
  } catch (error) {
    console.error("Failed to fetch activities");
  }

  return (
    <main className="flex gap-10 px-16 py-10">
      <FilterSidebar />

      <section className="px-6 flex-1">
        <div className="mb-10">
          <h1 className="font-bold text-4xl mb-2">Discover Activities</h1>
          <p className="text-standard text-sm">Lorem ipsum dolor sit amet.</p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {activities.length === 0 ? (
            <p>No activities found</p>
          ) : (
            activities.map((activity: any) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))
          )}
        </div>
      </section>
    </main>
  );
}
