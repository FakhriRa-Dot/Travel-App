"use client";

import NavbarAdmin from "@/components/navbar/NavbarAdmin";
import SidebarAdmin from "@/components/sidebar/SidebarAdmin";
import { useAuthGuard } from "@/hooks/AuthGuard";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuthGuard("admin");
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <SidebarAdmin />

      <div className="flex-1 flex flex-col">
        <NavbarAdmin />

        <main className="flex-1 p-8 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
