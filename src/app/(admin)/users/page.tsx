"use client";

import { useEffect, useState } from "react";
import { getUsers, deleteUser, updateUserRole } from "@/services/userService";
import { User } from "@/types/user";
import Pagination from "@/components/common/Pagination";
import UpdateUserRoleModal from "./_components/UpdateRole";

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const itemsPerPage = 5;

  async function fetchUsers() {
    try {
      setLoading(true);
      const response = await getUsers();
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateRole(id: string, role: "admin" | "user") {
    await updateUserRole(id, role);
    fetchUsers();
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const result = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredUsers(result);
    setCurrentPage(1);
  }, [search, users]);

  async function handleDelete(id: string) {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      fetchUsers();
    } catch {
      alert("Failed to delete user");
    }
  }

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  if (loading) return <p className="p-6">Loading users...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <>
      {selectedUser && (
        <UpdateUserRoleModal
          userId={selectedUser.id}
          currentRole={selectedUser.role}
          onClose={() => setSelectedUser(null)}
          onSuccess={fetchUsers}
          onSubmit={handleUpdateRole}
        />
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b bg-gray-50/50">
          <input
            type="text"
            placeholder="Search user by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/3 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-6 py-4">Name</th>
              <th className="text-left px-6 py-4">Email</th>
              <th className="text-left px-6 py-4">Role</th>
              <th className="text-left px-6 py-4">Phone</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t hover:bg-gray-50/70 transition"
              >
                <td className="px-6 py-4 flex items-center gap-3 font-medium text-gray-700">
                  {user.profilePictureUrl ? (
                    <img
                      src={user.profilePictureUrl}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  {user.name}
                </td>

                <td className="px-6 py-4 text-blue-600 underline">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {user.phoneNumber || "-"}
                </td>

                <td className="px-6 py-4 flex gap-4">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="text-blue-600 hover:text-blue-800 font-medium transition"
                  >
                    Edit Role
                  </button>
                </td>
              </tr>
            ))}

            {currentUsers.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-12 text-gray-400 text-sm"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center p-5 border-t bg-gray-50/40 text-sm text-gray-600">
          <p>
            Showing {filteredUsers.length === 0 ? 0 : startIndex + 1}-
            {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{" "}
            {filteredUsers.length}
          </p>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}
