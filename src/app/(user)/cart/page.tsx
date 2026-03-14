"use client";

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import CartItem from "./_components/CartItem";
import OrderSummary from "./_components/OrderSummary";

export default function CartPage() {
  const router = useRouter();

  const {
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
  } = useCart();

  function handleCheckout() {
    if (!carts.length) {
      alert("Cart kosong");
      return;
    }

    const ids = carts.map((c) => c.id).join(",");

    router.push(`/payment?cartIds=${ids}`);
  }

  if (loading) {
    return <div className="p-6 md:p-10 text-center">Loading cart...</div>;
  }

  if (!carts.length) {
    return (
      <div className="p-12 md:p-20 text-center">
        <h2 className="text-lg md:text-xl font-semibold">Cart is empty</h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10">
          Your Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <div className="w-full lg:w-1/3">
            {carts.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onDelete={removeCart}
                onQty={updateQuantity}
              />
            ))}
          </div>

          <div className="flex-1 lg:w-2/3 space-y-6">
            <OrderSummary
              subtotal={subtotal}
              serviceFee={serviceFee}
              total={total}
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              appliedPromo={appliedPromo}
              discount={discount}
              applyPromo={applyPromo}
              removePromo={removePromo}
              checkout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
