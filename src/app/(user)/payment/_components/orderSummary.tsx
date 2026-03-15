type Props = {
  carts: any[];
  serviceFee: number;
  total: number;
  discount: number;
  appliedPromo: any | null;
  onPay: () => void;
  disabled: boolean;
};

export default function OrderSummary({
  carts,
  serviceFee,
  total,
  discount,
  appliedPromo,
  onPay,
  disabled,
}: Props) {
  return (
    <div className="w-full lg:w-96 bg-white border rounded-2xl p-6 md:p-8 shadow-sm h-fit">
      <h2 className="text-lg md:text-xl font-semibold mb-5 md:mb-6">
        Order Summary
      </h2>

      <div className="space-y-3 md:space-y-4 text-sm">
        {carts.map((item) => (
          <div key={item.id} className="flex justify-between gap-4">
            <span className="line-clamp-2">
              {item.activity.title} x{item.quantity}
            </span>

            <span className="whitespace-nowrap">
              Rp {(item.activity.price * item.quantity).toLocaleString("id-ID")}
            </span>
          </div>
        ))}

        <div className="flex justify-between">
          <span>Service Fee (5%)</span>
          <span>Rp {serviceFee.toLocaleString("id-ID")}</span>
        </div>
      </div>

      {appliedPromo && (
        <div className="flex justify-between text-green-600">
          <span>Promo ({appliedPromo.promo_code})</span>
          <span>- Rp {discount.toLocaleString("id-ID")}</span>
        </div>
      )}

      <div className="border-t my-5 md:my-6"></div>

      <div className="flex justify-between font-semibold text-base md:text-lg">
        <span>Total</span>
        <span>Rp {total.toLocaleString("id-ID")}</span>
      </div>

      <button
        onClick={onPay}
        disabled={disabled}
        className="w-full mt-5 md:mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50 transition"
      >
        Pay Now
      </button>
    </div>
  );
}
