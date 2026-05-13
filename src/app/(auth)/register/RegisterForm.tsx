"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
    phoneNumber: "",
  });

  const [profileFile, setProfileFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileFile(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!profileFile) return "";

    const formData = new FormData();
    formData.append("image", profileFile);

    const res = await fetch(`${BASE_URL}/api/v1/upload-image`, {
      method: "POST",
      headers: {
        apiKey: API_KEY as string,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to upload image");
    }

    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (form.password !== form.passwordRepeat) {
      setError("Password does not match");
      return;
    }

    setLoading(true);

    try {
      const profilePictureUrl = await uploadImage();

      const res = await fetch(`${BASE_URL}/api/v1/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: API_KEY as string,
        },
        body: JSON.stringify({
          ...form,
          profilePictureUrl,
          role: "user",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.errors);
        throw new Error(data.errors?.[0]?.message || "Register failed");
      }

      setSuccess("Register successful! Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-lg"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-lg"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-lg"
      />

      <input
        type="password"
        name="passwordRepeat"
        placeholder="Repeat Password"
        value={form.passwordRepeat}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-lg"
      />

      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={form.phoneNumber}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg"
      />

      <div className="flex items-center gap-3 justify-between rounded-lg border px-4 py-2">
        <span className="text-gray-500">
          {profileFile ? profileFile.name : "No file chosen"}
        </span>

        <label
          htmlFor="profile-upload"
          className="cursor-pointer rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition"
        >
          Choose File
        </label>

        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
