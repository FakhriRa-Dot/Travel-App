const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const getCarts = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/v1/carts`, {
    headers: {
      apiKey: API_KEY as string,
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch carts");
  }

  return result;
};

export const addToCart = async (data: { activityId: string }) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/v1/add-cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apiKey: API_KEY as string,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      activityId: data.activityId,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to add to cart");
  }

  return result;
};

export const deleteCart = async (id: string) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/v1/delete-cart/${id}`, {
    method: "DELETE",
    headers: {
      apiKey: API_KEY as string,
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete cart");
  }

  return result;
};

export const updateCart = async (cartId: string, quantity: number) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/v1/update-cart/${cartId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apiKey: API_KEY as string,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update cart");
  }

  return result;
};
