import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "travel-journal-api-bootcamp.do.dibimbing.id",
      },
      {
        protocol: "https",
        hostname: "image.idntimes.com",
      },
      {
        protocol: "https",
        hostname: "s-light.tiket.photos",
      },
      {
        protocol: "https",
        hostname: "travelspromo.com",
      },
      {
        protocol: "https",
        hostname: "indonesiajuara.asia",
      },
      {
        protocol: "https",
        hostname: "awsimages.detik.net.id",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "akcdn.detik.net.id",
      },
      {
        protocol: "https",
        hostname: "dibimbing-cdn.sgp1.cdn.digitaloceanspaces.com",
      },
    ],
  },
};

export default nextConfig;
