import HeroSection from "@/app/(user)/homeUser/section/heroSect";
import BannerSection from "./section/bannerSect";
import PromoSection from "./section/promoSect";

export default function HomeUser() {
  return (
    <main>
      <HeroSection />
      <PromoSection />
      <BannerSection />
    </main>
  );
}
