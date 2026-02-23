const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getBanners() {
  const res = await fetch(`${BASE_URL}/api/v1/banners`, {
    headers: {
      apiKey: API_KEY as string,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch banners");
  }

  const json = await res.json();
  return json.data;
}
