const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const headers = {
  apiKey: API_KEY as string,
  "Content-Type": "application/json",
};

export async function getBanners() {
  const res = await fetch(`${BASE_URL}/api/v1/banners`, {
    headers,
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch banners");
  const json = await res.json();
  return json.data;
}

export async function createBanner(
  data: { name: string; imageUrl: string },
  token: string,
) {
  const res = await fetch(`${BASE_URL}/api/v1/banners`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apiKey: API_KEY!,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create banner");

  const json = await res.json();
  return json.data;
}

export async function updateBanner(
  id: string,
  data: { name: string; imageUrl: string },
  token: string,
) {
  const res = await fetch(`${BASE_URL}/api/v1/banners/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      apiKey: API_KEY!,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update banner");

  const json = await res.json();
  return json.data;
}

export async function deleteBanner(id: string, token: string) {
  const res = await fetch(`${BASE_URL}/api/v1/delete-banner/${id}`, {
    method: "DELETE",
    headers: {
      apiKey: API_KEY!,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete banner");
  return res.json();
}
