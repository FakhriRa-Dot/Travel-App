"use client";

import { JSX, useState } from "react";
import AuthInput from "../_components/AuthInput";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function LoginForm(): JSX.Element {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: process.env.NEXT_PUBLIC_API_KEY as string,
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (!res.ok) {
        alert(json.message || "Login gagal");
        return;
      }

      const token = json.token;
      const role = json.data.role;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "admin") {
        router.push("/homeAdmin");
      } else {
        router.push("/homeUser");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat login");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <AuthInput
        label="Email Address"
        type="email"
        placeholder="nameuser@oceanbreeze.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <AuthInput
        label="Password"
        type="password"
        placeholder="********"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-4"
      >
        Sign In
      </button>
    </form>
  );
}
