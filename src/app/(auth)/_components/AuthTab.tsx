"use client";

import { useRouter, usePathname } from "next/navigation";
import { JSX } from "react";

export default function AuthTabs(): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();

  const isLogin = pathname === "/login";

  return (
    <div className="flex border-b mb-6">
      <button
        onClick={() => router.push("/login")}
        className={`flex-1 py-2 text-center border-b-2 font-medium transition ${
          isLogin
            ? "border-blue-500 text-black"
            : "border-transparent text-gray-500"
        }`}
      >
        Sign In
      </button>

      <button
        onClick={() => router.push("/register")}
        className={`flex-1 py-2 text-center border-b-2 font-medium transition ${
          !isLogin
            ? "border-blue-500 text-black"
            : "border-transparent text-gray-500"
        }`}
      >
        Sign Up
      </button>
    </div>
  );
}
