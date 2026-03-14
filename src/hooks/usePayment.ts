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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const cartRes = await getCarts();

      setCarts(Array.isArray(cartRes) ? cartRes : cartRes.data || []);

      const paymentRes = await getPaymentMethods();

      setPaymentMethods(paymentRes.data || []);
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

    const transactions = await getMyTransactions(token);

    return transactions[0];
  }

  return {
    carts,
    paymentMethods,
    selectedPayment,
    setSelectedPayment,
    loading,
    pay,
  };
}
