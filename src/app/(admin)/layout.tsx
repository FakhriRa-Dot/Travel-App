"use client";

import NavbarUser from "@/components/navbar/NavbarUser";
import { useAuthGuard } from "@/hooks/AuthGuard";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authorized = useAuthGuard("admin");

  if (!authorized) return null;

  return (
    <>
      <NavbarUser />
      {children}
    </>
  );
}
