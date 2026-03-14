import { Promo } from "@/types/promo";

type Props = {
  subtotal: number;
  serviceFee: number;
  total: number;

  promoCode: string;
  setPromoCode: (v: string) => void;

  appliedPromo: Promo | null;
  discount: number;

  applyPromo: () => void;
  removePromo: () => void;

  checkout: () => void;
};

export default function OrderSummary({
  subtotal,
  serviceFee,
  total,
  promoCode,
  setPromoCode,
  appliedPromo,
  discount,
  applyPromo,
  removePromo,
  checkout,
}: Props) {
  return (
    <div className="w-full lg:w-96 bg-white border rounded-xl p-6 md:p-8 h-fit lg:sticky lg:top-20">
      <h2 className="text-lg md:text-xl font-semibold mb-5 md:mb-6">
        Order Summary
      </h2>

      <div className="space-y-3 md:space-y-4 text-sm">
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
        <div className="mt-5 md:mt-6">
          <label className="text-sm font-medium">Promo Code</label>

          <div className="flex gap-2 mt-2">
            <input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 text-sm"
              placeholder="Enter promo"
            />

            <button
              onClick={applyPromo}
              className="bg-standard text-white px-4 rounded-lg text-sm"
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

      <div className="flex justify-between font-semibold text-base md:text-lg">
        <span>Total</span>
        <span>Rp {total.toLocaleString("id-ID")}</span>
      </div>

      <button
        onClick={checkout}
        className="w-full bg-blue-600 text-white py-3 rounded-lg mt-5 md:mt-6"
      >
        Proceed Checkout
      </button>
    </div>
  );
}
