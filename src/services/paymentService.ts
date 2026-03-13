const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getPaymentMethods() {
  const res = await fetch(`${BASE_URL}/api/v1/payment-methods`, {
    headers: {
      apiKey: API_KEY as string,
    },
  });

  const json = await res.json();
  return json;
}
