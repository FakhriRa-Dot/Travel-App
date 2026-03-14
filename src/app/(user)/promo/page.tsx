import { getPromos } from "@/services/promoService";
import PromoCard from "./_components/PromoCard";

export default async function PromoPage() {
  const promos = await getPromos();

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
          Exclusive Travel Deals
        </h1>

        <p className="text-gray-500 max-w-xl text-sm md:text-base">
          Discover tropical escapes with limited-time offers and special
          discounts tailored for your next dream vacation.
        </p>
      </section>

      {/* PROMO GRID */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16 md:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {promos.map((promo: any) => (
            <PromoCard key={promo.id} promo={promo} />
          ))}
        </div>
      </section>
    </main>
  );
}
