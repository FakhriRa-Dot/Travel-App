"use client";

import { Calendar, MapPin, Search, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import DatePicker from "react-datepicker";

export default function HeroSection() {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <section className="relative min-h-screen overflow-hidden">
      <Image
        src="/images/hero_image.png"
        alt="Hero-Image"
        fill
        priority
        className="object-cover"
      />

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

        {/* <div className="mt-24 flex justify-center">
          <div className="w-full flex items-center justify-between bg-white rounded-3xl shadow-2xl px-8 py-6 max-w-6xl">
            <div className="flex items-center gap-4 flex-2">
              <MapPin />
              <input
                type="text"
                placeholder="Where are you going?"
                className="w-full outline-none bg-transparent text-standard placeholder:text-standard"
              />
            </div>


            <div className="flex items-center flex-1 gap-3">
              <Users />
              <input
                type="number"
                placeholder="Guests"
                min={1}
                className="w-full outline-none bg-transparent text-standard placeholder:text-standard"
              />
            </div>
          </div>

          <button className="bg-standard ml-6 hover:bg-bluebaby transition text-white font-semibold px-8 py-4 rounded-3xl flex items-center gap-2">
            <Search /> <span>SEARCH</span>
          </button>
        </div> */}
      </div>
    </section>
  );
}
