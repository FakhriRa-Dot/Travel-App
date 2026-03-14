"use client";

import { useEffect, useState } from "react";
import { getCarts, deleteCart, updateCart } from "@/services/cartService";
import { getPromos } from "@/services/promoService";
import { Promo } from "@/types/promo";
import { useRouter } from "next/navigation";
import SafeImage from "@/components/common/SafeImage";

export default function CartPage() {
  const router = useRouter();

  const [carts, setCarts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<Promo | null>(null);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    fetchCart();

    const savedPromo = localStorage.getItem("promo_code");
    if (savedPromo) {
      setPromoCode(savedPromo);
    }
  }, []);

  async function fetchCart() {
    try {
      const res = await getCarts();
      setCarts(res.data || res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteCart(id);
      setCarts((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  async function handleQuantity(id: string, qty: number) {
    if (qty < 1) return;

    try {
      await updateCart(id, qty);

      setCarts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, quantity: qty } : c)),
      );
    } catch (err) {
      console.error(err);
    }
  }

  const subtotal = carts.reduce(
    (total, item) => total + item.activity.price * item.quantity,
    0,
  );

  const serviceFee = subtotal * 0.05;

  const total = Math.max(subtotal + serviceFee - discount, 0);

  async function handleApplyPromo() {
    try {
      const promos: Promo[] = await getPromos();

      const promo = promos.find(
        (p) => p.promo_code.toLowerCase() === promoCode.toLowerCase(),
      );

      if (!promo) {
        alert("Promo tidak ditemukan");
        return;
      }

      if (subtotal < promo.minimum_claim_price) {
        alert(
          `Minimum transaksi Rp ${promo.minimum_claim_price.toLocaleString(
            "id-ID",
          )}`,
        );
        return;
      }

      setAppliedPromo(promo);
      setDiscount(promo.promo_discount_price);

      alert("Promo berhasil digunakan");
    } catch (err) {
      console.error(err);
    }
  }

  function removePromo() {
    setAppliedPromo(null);
    setDiscount(0);
    setPromoCode("");
    localStorage.removeItem("promo_code");
  }

  function handleCheckout() {
    if (!carts.length) {
      alert("Cart kosong");
      return;
    }

    const ids = carts.map((c) => c.id).join(",");
    router.push(`/payment?cartIds=${ids}`);
  }

  if (loading) {
    return <div className="p-10 text-center">Loading cart...</div>;
  }

  if (!carts.length) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-xl font-semibold">Cart is empty</h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-10">Your Cart</h1>

        <div className="flex gap-10">
          <div className="flex-1 space-y-6">
            {carts.map((item) => {
              const itemTotal = item.activity.price * item.quantity;

              return (
                <div
                  key={item.id}
                  className="bg-white border rounded-xl p-6 flex gap-6"
                >
                  <SafeImage
                    src={item.activity.imageUrl}
                    alt="Keranjang"
                    className="w-36 h-36 object-cover rounded-lg"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {item.activity.title}
                        </h3>

                        <p className="text-gray-500">
                          Rp {item.activity.price.toLocaleString("id-ID")}
                        </p>
                      </div>

                      <p className="font-semibold">
                        Rp {itemTotal.toLocaleString("id-ID")}
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex border rounded-lg">
                        <button
                          className="px-4 py-2"
                          onClick={() =>
                            handleQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>

                        <span className="px-4 py-2">{item.quantity}</span>

                        <button
                          className="px-4 py-2"
                          onClick={() =>
                            handleQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ORDER SUMMARY */}
          <div className="w-96 bg-white border rounded-xl p-8 h-fit sticky top-20">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>

              <div className="flex justify-between">
                <span>Service Fee</span>
                <span>Rp {serviceFee.toLocaleString("id-ID")}</span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between text-green-600">
                  <span>Promo ({appliedPromo.promo_code})</span>
                  <span>- Rp {discount.toLocaleString("id-ID")}</span>
                </div>
              )}
            </div>

            {!appliedPromo && (
              <div className="mt-6">
                <label className="text-sm font-medium">Promo Code</label>

                <div className="flex gap-2 mt-2">
                  <input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 border rounded-lg px-3 py-2"
                    placeholder="Enter promo"
                  />

                  <button
                    onClick={handleApplyPromo}
                    className="bg-standard text-white px-4 rounded-lg"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}

            {appliedPromo && (
              <button
                onClick={removePromo}
                className="text-sm text-red-500 mt-3 rounded-2xl"
              >
                Remove Promo
              </button>
            )}

            <div className="border-t my-6"></div>

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>Rp {total.toLocaleString("id-ID")}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6"
            >
              Proceed Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
