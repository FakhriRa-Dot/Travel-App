"use client";

import { useRouter } from "next/navigation";
import {
  calculateSubtotal,
  calculateServiceFee,
  calculateTotal,
} from "./utils/paymentCalculator";
import { usePayment } from "@/hooks/usePayment";
import PaymentMethodCard from "./_components/paymentMethod";
import OrderSummary from "./_components/orderSummary";

export default function PaymentPage() {
  const router = useRouter();

  const {
    carts,
    paymentMethods,
    selectedPayment,
    setSelectedPayment,
    loading,
    pay,
  } = usePayment();

  const subtotal = calculateSubtotal(carts);
  const serviceFee = calculateServiceFee(subtotal);
  const total = calculateTotal(subtotal, serviceFee);

  async function handlePay() {
    try {
      const trx = await pay();
      router.push(`/payment/${trx.id}`);
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) return <p className="p-6 md:p-10">Loading payment...</p>;

  return (
    <section className="min-h-screen bg-gray-100 py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10">
          Payment
        </h1>

        {/* Responsive Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* LEFT SIDE */}
          <div className="flex-1 space-y-5 md:space-y-6 w-full">
            <h2 className="text-lg md:text-xl font-semibold">
              Choose Payment Method
            </h2>

            {paymentMethods.map((method) => (
              <PaymentMethodCard
                key={method.id}
                id={method.id}
                name={method.name}
                imageUrl={method.imageUrl}
                selected={selectedPayment === method.id}
                onSelect={setSelectedPayment}
              />
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full lg:w-auto">
            <OrderSummary
              carts={carts}
              serviceFee={serviceFee}
              total={total}
              onPay={handlePay}
              disabled={!selectedPayment}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
