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
    <main className="flex flex-col lg:flex-row gap-8 px-4 md:px-8 lg:px-16 py-10">
      <FilterSidebar onFilterChange={fetchActivities} />

      <section className="flex-1">
        <div className="mb-8">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-2">
            Discover Activities
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
