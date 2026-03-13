import { CreateTransactionPayload } from "@/types/transaction";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

function getHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    apiKey: API_KEY as string,
    Authorization: `Bearer ${token}`,
  };
}

export async function getMyTransactions(token: string) {
  const res = await fetch(`${BASE_URL}/api/v1/my-transactions`, {
    headers: getHeaders(token),
    cache: "no-store",
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Failed to fetch transactions");
  }

  return json.data;
}

export async function getAllTransactions(token: string) {
  const res = await fetch(`${BASE_URL}/api/v1/all-transactions`, {
    headers: getHeaders(token),
    cache: "no-store",
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Failed to fetch transactions");
  }

  return json.data;
}

export async function getTransactionById(token: string, id: string) {
  const res = await fetch(`${BASE_URL}/api/v1/transaction/${id}`, {
    headers: getHeaders(token),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Failed to fetch transaction");
  }

  return json.data;
}

export async function createTransaction(
  token: string,
  payload: CreateTransactionPayload,
) {
  const res = await fetch(`${BASE_URL}/api/v1/create-transaction`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Failed to create transaction");
  }

  return json.data;
}

export async function cancelTransaction(id: string, token: string) {
  const res = await fetch(`${BASE_URL}/api/v1/cancel-transaction/${id}`, {
    method: "POST",
    headers: getHeaders(token),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Failed to cancel transaction");
  }

  return json.data;
}

export async function updateTransactionProof(
  token: string,
  id: string,
  payload: { proofPaymentUrl: string },
) {
  const res = await fetch(`${BASE_URL}/api/v1/update-transaction-proof/${id}`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Failed to upload proof");
  }

  return json.data;
}

export async function updateTransactionStatus(
  token: string,
  id: string,
  status: string,
) {
  const res = await fetch(
    `${BASE_URL}/api/v1/update-transaction-status/${id}`,
    {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify({ status }),
    },
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Failed to update transaction status");
  }

  return json.data;
}
