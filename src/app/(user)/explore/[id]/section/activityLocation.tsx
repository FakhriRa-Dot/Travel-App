import { Activity } from "@/types/activity";

type Props = {
  activity: Activity;
};

export default function ActivityLocation({ activity }: Props) {
  return (
    <div className="rounded-xl overflow-hidden bg-white">
      <h2 className="text-2xl font-bold mb-4">Location</h2>

      <div
        className="w-full [&>iframe]:w-full [&>iframe]:h-75"
        dangerouslySetInnerHTML={{
          __html: activity.location_maps,
        }}
      />
    </div>
  );
}
