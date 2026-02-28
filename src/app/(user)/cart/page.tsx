"use client";

import { useEffect, useState } from "react";
import { getCarts, deleteCart, updateCart } from "@/services/cartService";

type CartItem = {
  id: string;
  activity: {
    title: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
};

export default function CartPage() {
  const [carts, setCarts] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const result = await getCarts();
      setCarts(result.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCart(id);
      setCarts((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateQuantity = async (id: string, newQty: number) => {
    if (newQty < 1) return;

    try {
      await updateCart(id, newQty);

      setCarts((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQty } : item,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const subtotal = carts.reduce((acc, item) => {
    return acc + item.activity.price * item.quantity;
  }, 0);

  const serviceFee = subtotal * 0.05;
  const total = subtotal + serviceFee;

  if (loading) return <p className="p-10">Loading cart...</p>;
  if (!carts.length) return <p className="p-10">Your cart is empty.</p>;

  return (
    <section className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-10">Your Trip Cart</h1>

        <div className="flex gap-12 items-start justify-center">
          {/* LEFT SIDE */}
          <div className="flex-1 max-w-3xl space-y-6">
            {carts.map((item) => {
              const itemTotal = item.activity.price * item.quantity;

              return (
                <div
                  key={item.id}
                  className="flex gap-6 bg-white border rounded-2xl p-6 shadow-sm"
                >
                  <div className="w-40 h-40 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={item.activity.imageUrl}
                      alt={item.activity.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h2 className="text-lg font-semibold mb-1">
                          {item.activity.title}
                        </h2>
                        <p className="text-sm text-gray-500">
                          Rp. {item.activity.price.toLocaleString("id-ID")}
                        </p>
                      </div>

                      <p className="text-lg font-semibold">
                        Rp. {itemTotal.toLocaleString("id-ID")}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-4 py-2 bg-gray-100"
                        >
                          -
                        </button>

                        <span className="px-4">{item.quantity}</span>

                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-4 py-2 bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 text-sm hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE */}
          <div className="w-96 bg-white border rounded-2xl p-8 shadow-sm sticky top-24 h-fit">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rp. {subtotal.toLocaleString("id-ID")}</span>
              </div>

              <div className="flex justify-between">
                <span>Service Fee (5%)</span>
                <span>Rp. {serviceFee.toLocaleString("id-ID")}</span>
              </div>
            </div>

            <div className="border-t my-6"></div>

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>Rp. {total.toLocaleString("id-ID")}</span>
            </div>

            <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
