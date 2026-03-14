"use client";

import { useEffect, useState } from "react";
import { getBanners } from "@/services/bannerService";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import SafeImage from "@/components/common/SafeImage";

export default function HeroSection() {
  const [banners, setBanners] = useState<any[]>([]);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const data = await getBanners();
        setBanners(data);
      } catch (err) {
        console.error("Failed to load banners", err);
      }
    }

    fetchBanners();
  }, []);

  if (!banners.length) {
    return (
      <section className="h-[50vh] flex items-center justify-center">
        Loading banners...
      </section>
    );
  }

  return (
    <section className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop
        className="h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id} className="h-full">
            <div className="relative h-full w-full">
              <SafeImage
                src={banner.imageUrl}
                alt={banner.name}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto w-full px-4 md:px-8">
                  <div className="max-w-md md:max-w-lg bg-black/40 backdrop-blur-sm text-white p-6 md:p-8 rounded-2xl">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-heading drop-shadow-xl">
                      {banner.name}
                    </h1>

                    <p className="mt-3 md:mt-4 text-sm md:text-base text-gray-200">
                      Discover amazing destinations and unforgettable
                      experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
