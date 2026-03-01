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

  const json = await res.json();

  return json.data;
}

export async function createCategory(data: { name: string; imageUrl: string }) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/v1/create-category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apiKey: API_KEY as string,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function updateCategory(
  id: string,
  data: { name: string; imageUrl: string },
) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/v1/update-category/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apiKey: API_KEY as string,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deleteCategory(id: string) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/v1/delete-category/${id}`, {
    method: "DELETE",
    headers: {
      apiKey: API_KEY as string,
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}
