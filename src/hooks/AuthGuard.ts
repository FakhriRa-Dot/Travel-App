"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuthGuard(requiredRole?: "user" | "admin") {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      router.replace("/login");
      return;
    }

    if (requiredRole && role && role !== requiredRole) {
      router.replace("/login");
    }
  }, [requiredRole, router]);
}
