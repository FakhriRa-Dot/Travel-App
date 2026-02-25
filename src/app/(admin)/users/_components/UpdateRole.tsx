"use client";

import { useState } from "react";

type Props = {
  userId: string;
  currentRole: "admin" | "user";
  onClose: () => void;
  onSuccess: () => void;
  onSubmit: (id: string, role: "admin" | "user") => Promise<void>;
};

export default function UpdateUserRoleModal({
  userId,
  currentRole,
  onClose,
  onSuccess,
  onSubmit,
}: Props) {
  const [role, setRole] = useState<"admin" | "user">(currentRole);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);
      await onSubmit(userId, role);
      onSuccess();
      onClose();
    } catch {
      alert("Failed to update role");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Update User Role</h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "admin" | "user")}
          className="w-full border px-3 py-2 rounded mb-4"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {loading ? "Updating..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
