import { Activity } from "@/types/activity";

type Props = {
  activity: Activity;
};

export default function ActivityLocation({ activity }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Location</h2>

      <div
        className="rounded-xl overflow-hidden px-6 py-4"
        dangerouslySetInnerHTML={{
          __html: activity.location_maps,
        }}
      />
    </div>
  );
}
