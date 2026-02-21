"use client";

import { useAuthGuard } from "@/hooks/AuthGuard";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuthGuard("admin");
  return <>{children}</>;
}
