import Image from "next/image";
import { JSX } from "react";

type AuthHeroProps = {
  title: string;
  subtitle: string;
  imageSrc: string;
};

export default function AuthHero({
  title,
  subtitle,
  imageSrc,
}: AuthHeroProps): JSX.Element {
  return (
    <div className="relative h-40 w-full">
      <Image
        src={imageSrc}
        alt="Auth Hero"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-center px-6 text-white">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm">{subtitle}</p>
      </div>
    </div>
  );
}
