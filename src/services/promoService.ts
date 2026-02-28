import { CreatePromoPayload, Promo } from "@/types/promo";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getPromos(token: string): Promise<Promo[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promos`, {
    headers: {
      apiKey: process.env.NEXT_PUBLIC_API_KEY!,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch promos");

  const json = await res.json();
  return json.data;
}

export async function deletePromo(id: string, token: string) {
  const res = await fetch(`${BASE_URL}/api/v1/delete-promo/${id}`, {
    method: "DELETE",
    headers: {
      apiKey: API_KEY!,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete promo");
}

export async function getPromoById(id: string, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promo/${id}`,
    {
      headers: {
        apiKey: process.env.NEXT_PUBLIC_API_KEY!,
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) throw new Error("Failed to fetch promo");

  const json = await res.json();
  return json.data;
}

export async function createPromo(
  data: CreatePromoPayload,
  token: string,
): Promise<Promo> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/create-promo`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: process.env.NEXT_PUBLIC_API_KEY!,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) throw new Error("Failed to create promo");

  const json = await res.json();
  return json.data;
}

export async function updatePromo(id: string, data: any, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/update-promo/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: process.env.NEXT_PUBLIC_API_KEY!,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) throw new Error("Failed to update promo");

  return res.json();
}
