"use client";

import { useEffect, useState } from "react";
import type { User } from "@/types/user";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsed: User = JSON.parse(storedUser);
        setUser(parsed);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-md p-8">
        <div className="flex flex-col items-center text-center">
          <img
            src={user.profilePictureUrl}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
          />

          <h2 className="mt-4 text-2xl font-bold">{user.name}</h2>

          <span
            className={`mt-2 px-4 py-1 text-sm rounded-full ${
              user.role === "admin"
                ? "bg-purple-100 text-purple-600"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {user.role.toUpperCase()}
          </span>
        </div>

        <div className="mt-10 space-y-6">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-800">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="font-medium text-gray-800">{user.phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
