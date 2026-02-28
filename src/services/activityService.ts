const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getActivities() {
  const res = await fetch(`${BASE_URL}/api/v1/activities`, {
    headers: {
      apiKey: API_KEY as string,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch activities");
  }

  const json = await res.json();

  return json.data;
}

export async function getActivityById(id: string) {
  const res = await fetch(`${BASE_URL}/api/v1/activity/${id}`, {
    headers: {
      apiKey: API_KEY as string,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch activity detail");
  }

  const json = await res.json();
  return json.data;
}

export async function createActivity(data: any) {
  const res = await fetch(`${BASE_URL}/api/v1/create-activity`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apiKey: API_KEY as string,
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function updateActivity(id: string, data: any) {
  const res = await fetch(`${BASE_URL}/api/v1/update-activity/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apiKey: API_KEY as string,
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deleteActivity(id: string) {
  const res = await fetch(`${BASE_URL}/api/v1/delete-activity/${id}`, {
    method: "DELETE",
    headers: {
      apiKey: API_KEY as string,
    },
  });

  return res.json();
}
