const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/api/v1/categories`, {
    headers: {
      apiKey: API_KEY as string,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}
