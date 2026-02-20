import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <Image
        src="/images/hero_image.png"
        alt="Hero-Image"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0" />

      <div className="relative max-w-7xl mx-auto px-10 pt-32 text-standard">
        <div className="max-w-2xl">
          <h1 className="font-heading text-6xl leading-tight">
            <span className="text-black">Find Your </span>
            <span className="text-standard">Perfect Escape</span>
            <span className="text-black">.</span>
          </h1>

          <p className="mt-6 text-lg text-standard text-shadow-2xs">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            sapiente voluptates perspiciatis error officia suscipit incidunt
            adipisci autem officiis assumenda!
          </p>
        </div>
      </div>
    </section>
  );
}
