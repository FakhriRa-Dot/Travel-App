"use client";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export default function SafeImage({ src, alt, className }: Props) {
  return (
    <img
      src={src || "/images/image_default.png"}
      alt={alt}
      className={className}
      onError={(e) => {
        e.currentTarget.src = "/images/image_default.png";
      }}
    />
  );
}
