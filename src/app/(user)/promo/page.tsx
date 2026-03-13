import { getPromos } from "@/services/promoService";
import PromoCard from "./_components/PromoCard";

export default async function PromoPage() {
  const promos = await getPromos();

  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="max-w-7xl mx-auto px-10 py-10">
        <h1 className="text-4xl font-bold mb-3">Exclusive Travel Deals</h1>

        <p className="text-gray-500 max-w-xl">
          Discover tropical escapes with limited-time offers and special
          discounts tailored for your next dream vacation.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-10 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {promos.map((promo: any) => (
            <PromoCard key={promo.id} promo={promo} />
          ))}
        </div>
      </section>

      {/* <section className="max-w-7xl mx-auto px-10 pb-20">
        <div className="bg-teal-700 text-black rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-semibold mb-2">
            Want more exclusive deals?
          </h2>

          <p className="text-sm mb-6">
            Sign up for our newsletter and get notified about hidden flash sales
            and member-only discounts.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-full text-black w-full sm:w-72"
            />

            <button className="bg-white text-teal-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
              Join Now
            </button>
          </div>
        </div>
      </section> */}
    </main>
  );
}
