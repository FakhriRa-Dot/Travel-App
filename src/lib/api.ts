const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getActivities() {
  const res = await fetch(`${BASE_URL}/api/v1/activities`);
  const json = await res.json();
  return json.data;
}
