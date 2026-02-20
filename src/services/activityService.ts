import { Activity } from "@/types/activity";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getActivities(): Promise<Activity[]> {
  const res = await fetch(`${BASE_URL}/api/v1/activities`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch activities");
  }

  const json = await res.json();
  return json.data;
}
