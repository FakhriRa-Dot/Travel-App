const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    apiKey: API_KEY,
    Authorization: `Bearer ${token}`,
  };
}

export async function getUsers() {
  const res = await fetch(`${BASE_URL}/api/v1/all-user`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

export async function deleteUser(id: string) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to delete user");
  }

  return res.json();
}
