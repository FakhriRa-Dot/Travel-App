"use client";

import BannerSection from "./section/bannerSect";
import HeroSection from "./section/heroSect";
import PromoSection from "./section/promoSect";

export default function HomeUser() {
  return (
    <main>
      <HeroSection />
      <BannerSection />
      <PromoSection />
    </main>
  );
}
