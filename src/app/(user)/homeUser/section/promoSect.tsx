"use client";

import { useEffect, useState } from "react";
import { getPromos } from "@/services/promoService";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

export default function PromoSection() {
  const [promos, setPromos] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPromos() {
      const data = await getPromos();
      setPromos(data);
    }

    fetchPromos();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-heading">Latest Promotions</h2>

          <Link
            href="/promo"
            className="text-blue-600 font-medium hover:underline"
          >
            View All →
          </Link>
        </div>

        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={24}
          slidesPerView={4}
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {promos.slice(0, 8).map((promo) => (
            <SwiperSlide key={promo.id}>
              <div className="bg-white rounded-2xl shadow hover:shadow-xl transition duration-300 hover:-translate-y-2">
                <img
                  src={promo.imageUrl}
                  alt={promo.title}
                  className="w-full h-44 object-cover rounded-t-2xl"
                />

                <div className="p-4">
                  <h3 className="font-semibold text-md mb-2 line-clamp-2">
                    {promo.title}
                  </h3>

                  <p className="text-sm text-gray-500 line-clamp-3">
                    {promo.description}
                  </p>

                  <div className="mt-3 text-blue-600 font-semibold text-sm">
                    Code: {promo.promo_code}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
