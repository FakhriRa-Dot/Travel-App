"use client";

import { useEffect, useState } from "react";
import { getPromos } from "@/services/promoService";
import { X } from "lucide-react";
import PromoCard from "../../promo/_components/PromoCard";
import { useRouter } from "next/navigation";

export default function PromoSection() {
  const [promos, setPromos] = useState<any[]>([]);
  const [selectedPromo, setSelectedPromo] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchPromos() {
      const data = await getPromos();
      setPromos(data);
    }

    fetchPromos();
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-10">
        <h2 className="text-3xl font-heading text-center mb-12">
          Special Promotions
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {promos.slice(0, 2).map((promo) => (
            <div key={promo.id} onClick={() => setSelectedPromo(promo)}>
              <PromoCard promo={promo} showButton={false} />
            </div>
          ))}
        </div>
      </div>

      {selectedPromo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden">
            <div className="relative">
              <img
                src={selectedPromo.imageUrl}
                alt={selectedPromo.title}
                className="w-full h-48 object-cover"
              />

              <button
                onClick={() => setSelectedPromo(null)}
                className="absolute top-3 right-3 bg-white rounded-full p-2 shadow"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                {selectedPromo.title}
              </h2>

              <p className="text-gray-600 text-sm mb-4">
                {selectedPromo.description}
              </p>

              <div className="mb-4">
                <p className="text-sm text-gray-500">Promo Code</p>

                <div className="border border-dashed rounded-lg px-4 py-2 font-semibold text-blue-600">
                  {selectedPromo.promo_code}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500">Minimum Purchase</p>

                <p className="font-medium">
                  Rp {selectedPromo.minimum_claim_price.toLocaleString()}
                </p>
              </div>

              <p className="text-sm text-gray-600">
                {selectedPromo.terms_condition}
              </p>

              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(selectedPromo.promo_code);

                  localStorage.setItem("promo_code", selectedPromo.promo_code);

                  router.push("/explore");
                }}
                className="mt-6 w-full bg-standard text-white py-3 rounded-full"
              >
                Use Promo
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
