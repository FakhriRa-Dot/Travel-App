"use client";

import { useRouter } from "next/navigation";

export default function PromoCard({ promo, showButton = true }: any) {
  const router = useRouter();

  const discount = Math.floor(
    (promo.promo_discount_price / promo.minimum_claim_price) * 100,
  );

  const handleUsePromo = async () => {
    await navigator.clipboard.writeText(promo.promo_code);

    localStorage.setItem("promo_code", promo.promo_code);

    router.push("/explore");
  };

  return (
    <div className="group relative bg-white rounded-3xl shadow-sm transform hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={promo.imageUrl}
          alt={promo.title}
          className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3 z-30 bg-bluebaby text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
          {discount}% OFF
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-base mb-1 line-clamp-2">
          {promo.title}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
          {promo.description}
        </p>

        <div className="border border-dashed rounded-lg px-3 py-2 flex justify-between items-center mb-4">
          <span className="text-gray-400 text-xs">CODE</span>

          <span className="font-semibold text-blue-600 tracking-wide">
            {promo.promo_code}
          </span>
        </div>

        {showButton && (
          <button
            onClick={handleUsePromo}
            className="w-full bg-standard text-white py-2.5 rounded-full"
          >
            Use Promo
          </button>
        )}
      </div>
    </div>
  );
}
