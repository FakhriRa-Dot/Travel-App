"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCarts } from "@/services/cartService";
import { getPaymentMethods } from "@/services/paymentService";
import {
  createTransaction,
  getMyTransactions,
} from "@/services/transactionServvice";

type CartItem = {
  id: string;
  activity: {
    title: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
};

type PaymentMethod = {
  id: string;
  name: string;
  imageUrl: string;
};

export default function PaymentPage() {
  const router = useRouter();

  const [carts, setCarts] = useState<CartItem[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const cartRes = await getCarts();

      console.log("CART RESPONSE:", cartRes);

      setCarts(Array.isArray(cartRes) ? cartRes : cartRes.data || []);

      const paymentRes = await getPaymentMethods();
      setPaymentMethods(paymentRes.data || []);
    } catch (error) {
      console.error("FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = carts.reduce((acc, item) => {
    return acc + item.activity.price * item.quantity;
  }, 0);

  const serviceFee = subtotal * 0.05;
  const total = subtotal + serviceFee;

  const handlePay = async () => {
    try {
      const token = localStorage.getItem("token")!;

      const cartIds = carts.map((c) => c.id);

      await createTransaction(token, {
        cartIds,
        paymentMethodId: selectedPayment,
      });

      const transactions = await getMyTransactions(token);

      const latestTransaction = transactions[0];

      console.log("LATEST TRANSACTION:", latestTransaction);

      router.push(`/payment/${latestTransaction.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p className="p-10">Loading payment...</p>;

  return (
    <section className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-10">Payment</h1>

        <div className="flex gap-12 items-start">
          <div className="flex-1 space-y-6">
            <h2 className="text-xl font-semibold">Choose Payment Method</h2>

            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer
                ${
                  selectedPayment === method.id
                    ? "border-blue-600 bg-blue-50"
                    : "bg-white"
                }`}
              >
                <img
                  src={method.imageUrl}
                  className="w-16 h-10 object-contain"
                />
                <p className="font-medium">{method.name}</p>
              </div>
            ))}
          </div>

          <div className="w-96 bg-white border rounded-2xl p-8 shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4 text-sm">
              {carts.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.activity.title} x{item.quantity}
                  </span>

                  <span>
                    Rp{" "}
                    {(item.activity.price * item.quantity).toLocaleString(
                      "id-ID",
                    )}
                  </span>
                </div>
              ))}

              <div className="flex justify-between">
                <span>Service Fee (5%)</span>
                <span>Rp {serviceFee.toLocaleString("id-ID")}</span>
              </div>
            </div>

            <div className="border-t my-6"></div>

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>Rp {total.toLocaleString("id-ID")}</span>
            </div>

            <button
              onClick={handlePay}
              disabled={!selectedPayment}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
