"use client";

import NavbarUser from "@/components/navbar/NavbarUser";
import { useAuthGuard } from "@/hooks/AuthGuard";

import "swiper/css";
import "swiper/css/navigation";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuthGuard("user");

  return (
    <>
      <NavbarUser />
      {children}
    </>
  );
}
