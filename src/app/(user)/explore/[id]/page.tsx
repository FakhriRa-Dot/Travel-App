import { getActivityById } from "@/services/activityService";
import ActivityHero from "./section/activityHero";
import ActivityDescription from "./section/activityDesc";
import ActivityFacilities from "./section/activityFacility";
import ActivityLocation from "./section/activityLocation";
import ReviewSection from "./section/reviewSection";
import BookingCard from "./section/bookCard";

export default async function ActivityDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  console.log("PARAM ID:", id);

  const activity = await getActivityById(id);

  return (
    <main>
      <ActivityHero activity={activity} />

      <section className="flex flex-col lg:flex-row gap-10 px-4 md:px-8 lg:px-16 py-12 md:py-16 bg-gray-50">
        <div className="flex-1 space-y-10">
          <ActivityDescription activity={activity} />
          <ActivityFacilities activity={activity} />
          <ActivityLocation activity={activity} />
          <ReviewSection activity={activity} />
        </div>

        <BookingCard activity={activity} />
      </section>
    </main>
  );
}
