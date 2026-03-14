"use client";

import { useEffect, useState } from "react";
import { getCarts, deleteCart, updateCart } from "@/services/cartService";
import { getPromos } from "@/services/promoService";
import { Promo } from "@/types/promo";
import { Cart } from "@/types/cart";
import {
  calculateServiceFee,
  calculateSubtotal,
  calculateTotal,
} from "@/app/(user)/cart/_utils/cartCalculator";

export function useCart() {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<Promo | null>(null);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    loadCart();
    loadSavedPromo();
  }, []);

  async function loadCart() {
    try {
      const res = await getCarts();
      setCarts(res.data || res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function loadSavedPromo() {
    const savedPromo = localStorage.getItem("promo_code");
    if (savedPromo) setPromoCode(savedPromo);
  }

  async function removeCart(id: string) {
    await deleteCart(id);
    setCarts((prev) => prev.filter((c) => c.id !== id));
  }

  async function updateQuantity(id: string, qty: number) {
    if (qty < 1) return;

    await updateCart(id, qty);

    setCarts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, quantity: qty } : c)),
    );
  }

  async function applyPromo() {
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
  }

  function removePromo() {
    setAppliedPromo(null);
    setDiscount(0);
    setPromoCode("");

    localStorage.removeItem("promo_code");
  }

  const subtotal = calculateSubtotal(carts);
  const serviceFee = calculateServiceFee(subtotal);
  const total = calculateTotal(subtotal, serviceFee, discount);

  return {
    carts,
    loading,

    promoCode,
    setPromoCode,
    appliedPromo,
    discount,

    subtotal,
    serviceFee,
    total,

    removeCart,
    updateQuantity,
    applyPromo,
    removePromo,
  };
}
