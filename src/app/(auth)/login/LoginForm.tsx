"use client";

import { JSX, useState } from "react";
import AuthInput from "../_components/AuthInput";

export default function LoginForm(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <AuthInput
        label="Email Address"
        type="email"
        placeholder="nameuser@oceanbreeze.com"
      />

      <AuthInput label="Password" type="password" placeholder="********" />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-4"
      >
        Sign In
      </button>
    </form>
  );
}
