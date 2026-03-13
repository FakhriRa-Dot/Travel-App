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
      Authorization: `Bearer ${token}`,
      apiKey: API_KEY as string,
    },
  });

  const json = await res.json();

  return json;
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

export async function getTransactionById(token: string, id: string) {
  const res = await fetch(`${BASE_URL}/api/v1/transaction/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: API_KEY as string,
    },
    cache: "no-store",
  });

  return res.json();
}

export async function createTransaction(
  token: string,
  cartIds: string[],
  paymentMethodId: string,
) {
  const res = await fetch(`${BASE_URL}/api/v1/create-transaction`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: API_KEY as string,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cartIds,
      paymentMethodId,
    }),
  });

  const json = await res.json();
  return json;
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

export async function updateTransactionProof(
  token: string,
  id: string,
  data: { proofPaymentUrl: string },
) {
  const res = await fetch(
    `${BASE_URL}/api/v1/update-transaction-proof-payment/${id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: API_KEY as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  return res.json();
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
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: API_KEY as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    },
  );

  return res.json();
}
