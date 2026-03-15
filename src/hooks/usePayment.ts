"use client";

import { useEffect, useState } from "react";
import { getCarts } from "@/services/cartService";
import { getPaymentMethods } from "@/services/paymentService";
import {
  createTransaction,
  getMyTransactions,
} from "@/services/transactionServvice";

export function usePayment() {
  const [carts, setCarts] = useState<any[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [selectedPayment, setSelectedPayment] = useState("");

  const [discount, setDiscount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState<any | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const cartRes = await getCarts();

      const cartData = Array.isArray(cartRes) ? cartRes : cartRes.data || [];
      setCarts(cartData);

      const paymentRes = await getPaymentMethods();
      setPaymentMethods(paymentRes.data || []);

      const storedDiscount = localStorage.getItem("discount");
      const storedPromo = localStorage.getItem("promo");

      if (storedDiscount) setDiscount(Number(storedDiscount));
      if (storedPromo) setAppliedPromo(JSON.parse(storedPromo));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function pay() {
    const token = localStorage.getItem("token")!;

    const cartIds = carts.map((c) => c.id);

    await createTransaction(token, {
      cartIds,
      paymentMethodId: selectedPayment,
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    const transactions = await getMyTransactions(token);

    const latest = transactions.reduce((prev: any, current: any) => {
      return new Date(current.createdAt) > new Date(prev.createdAt)
        ? current
        : prev;
    });

    return latest;
  }

  return {
    carts,
    paymentMethods,
    selectedPayment,
    setSelectedPayment,
    loading,
    pay,
    discount,
    appliedPromo,
  };
}
