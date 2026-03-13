import { CreatePromoPayload, Promo } from "@/types/promo";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

function getHeaders(token?: string) {
  return {
    "Content-Type": "application/json",
    apiKey: API_KEY as string,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export async function getPromos(token?: string): Promise<Promo[]> {
  const res = await fetch(`${BASE_URL}/api/v1/promos`, {
    headers: getHeaders(token),
    cache: "no-store",
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Failed to fetch promos");
  }

  return json.data;
}

export async function getPromoById(id: string, token: string): Promise<Promo> {
  const res = await fetch(`${BASE_URL}/api/v1/promo/${id}`, {
    headers: getHeaders(token),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Failed to fetch promo");
  }

  return json.data;
}

export async function createPromo(
  data: CreatePromoPayload,
  token: string,
): Promise<Promo> {
  const res = await fetch(`${BASE_URL}/api/v1/create-promo`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Failed to create promo");
  }

  return json.data;
}

export async function updatePromo(
  id: string,
  data: CreatePromoPayload,
  token: string,
): Promise<Promo> {
  const res = await fetch(`${BASE_URL}/api/v1/update-promo/${id}`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Failed to update promo");
  }

  return json.data;
}

export async function deletePromo(id: string, token: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/v1/delete-promo/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Failed to delete promo");
  }
}
