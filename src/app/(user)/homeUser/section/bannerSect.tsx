"use client";

import { useEffect, useState } from "react";
import { getActivities } from "@/services/activityService";
import ActivityCard from "../../explore/_components/activityCard";
import Link from "next/link";

export default function BannerSection() {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const data = await getActivities();
        setActivities(data);
      } catch (err) {
        console.error("Failed to load activities", err);
      }
    }

    fetchActivities();
  }, []);

  if (!activities.length) {
    return (
      <section className="py-16 text-center text-gray-400">
        Loading activities...
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-heading">
            Popular Activities
          </h2>

          <Link
            href="/explore"
            className="text-blue-600 font-semibold hover:underline text-sm md:text-base"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.slice(0, 3).map((activity: any) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </section>
  );
}
