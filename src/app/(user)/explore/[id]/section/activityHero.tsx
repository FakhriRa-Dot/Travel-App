import { Activity } from "@/types/activity";

type Props = {
  activity: Activity;
};

function renderStars(rating: number) {
  const maxStars = 5;

  return (
    <>
      {[...Array(maxStars)].map((_, index) => (
        <span key={index}>{index < rating ? "★" : "☆"}</span>
      ))}
    </>
  );
}

export default function ActivityHero({ activity }: Props) {
  return (
    <section
      className="relative h-190 bg-cover bg-center"
      style={{ backgroundImage: `url(${activity.imageUrls[0]})` }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 h-full flex flex-col justify-end px-10 pb-16 text-white">
        <p className="text-lg mb-2">Home - Explore - {activity.city}</p>

        <h1 className="text-6xl font-bold mb-3">{activity.title}</h1>
        <div className="flex items-center gap-2">
          <div className="text-standard text-xl">
            {renderStars(activity.rating)}
          </div>
          <span className="text-white">
            ({activity.total_reviews.toLocaleString()} Reviews)
          </span>
        </div>
      </div>
    </section>
  );
}
