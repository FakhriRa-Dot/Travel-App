"use client";

import { getActivities } from "@/services/activityService";
import ActivityCard from "./_components/activityCard";
import FilterSidebar from "./_components/filterSidebar";
import { useEffect, useState } from "react";

export default function ExplorePage() {
  const [activities, setActivities] = useState([]);

  async function fetchActivities(filters?: any) {
    let data = await getActivities(filters);

    if (filters?.maxPrice) {
      data = data.filter((item: any) => item.price <= filters.maxPrice);
    }

    if (filters?.rating) {
      data = data.filter((item: any) => item.rating >= filters.rating);
    }

    setActivities(data);
  }

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <main className="flex gap-10 px-16 py-10">
      <FilterSidebar onFilterChange={fetchActivities} />

      <section className="px-6 flex-1">
        <div className="mb-10">
          <h1 className="font-bold text-4xl mb-2">Discover Activities</h1>
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
