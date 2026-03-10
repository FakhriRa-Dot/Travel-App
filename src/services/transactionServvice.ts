import { CreateTransactionPayload } from "@/types/transaction";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const headers = {
  apiKey: API_KEY as string,
  "Content-Type": "application/json",
};

export async function getMyTransactions(token: string) {
  const res = await fetch(`${BASE_URL}/api/v1/my-transactions`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();
  return json.data;
}

export async function getAllTransactions(token: string) {
  const res = await fetch(`${BASE_URL}/api/v1/all-transactions`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

export async function getTransactionById(id: string, token: string) {
  const res = await fetch(`${BASE_URL}/api/v1/transaction/${id}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

export async function createTransaction(
  data: CreateTransactionPayload,
  token: string,
) {
  const res = await fetch(`${BASE_URL}/api/v1/create-transaction`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function cancelTransaction(id: string, token: string) {
  const res = await fetch(`${BASE_URL}/api/v1/cancel-transaction/${id}`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

export async function uploadProofPayment(
  id: string,
  imageUrl: string,
  token: string,
) {
  const res = await fetch(
    `${BASE_URL}/api/v1/update-transaction-proof-payment/${id}`,
    {
      method: "POST",
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ proofPaymentUrl: imageUrl }),
    },
  );

  return res.json();
}

export async function updateTransactionStatus(
  id: string,
  status: string,
  token: string,
) {
  const res = await fetch(
    `${BASE_URL}/api/v1/update-transaction-status/${id}`,
    {
      method: "POST",
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    },
  );

  return res.json();
}
