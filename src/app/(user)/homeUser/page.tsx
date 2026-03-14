"use client";

import BannerSection from "./section/bannerSect";
import HeroSection from "./section/heroSect";
import PromoSection from "./section/promoSect";

export default function HomeUser() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <BannerSection />
      <PromoSection />
    </main>
  );
}
