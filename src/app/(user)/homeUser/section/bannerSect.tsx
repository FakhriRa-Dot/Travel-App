import Image from "next/image";
import { getBanners } from "@/services/bannerService";

export default async function BannerSection() {
  const banners = await getBanners();

  if (!banners || banners.length === 0) {
    return (
      <section className="py-20 text-center text-gray-400">
        No promotions available at the moment.
      </section>
    );
  }

  return (
    <section className="bg-bluebaby py-20">
      <div className="max-w-7xl mx-auto px-10">
        <h2 className="text-3xl font-heading text-center mb-12">
          Exclusive Coastal Deals
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {banners.slice(0, 2).map((banner: any) => (
            <div
              key={banner.id}
              className="relative h-64 rounded-3xl overflow-hidden"
            >
              <img
                src={banner.imageUrl}
                alt={banner.name}
                className="object-cover w-full h-full"
              />

              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-semibold">{banner.name}</h3>
                <p className="text-sm">{banner.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
