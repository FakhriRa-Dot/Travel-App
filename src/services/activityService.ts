import { fetchWithAuth } from "@/lib/fetcher";

const BASE_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id";

export async function getActivities() {
  const data = await fetchWithAuth(`${BASE_URL}/api/v1/activities`);

  return data.data;
}
