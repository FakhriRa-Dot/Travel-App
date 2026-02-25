"use client";

import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "@/services/userService";
import { User } from "@/types/user";

function getPaginationPages(totalPages: number, currentPage: number) {
  const pages: (number | string)[] = [];

  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  pages.push(1);

  if (currentPage > 3) {
    pages.push("...");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
}

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
    setCurrentPage(1); // reset page saat search
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
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="flex justify-between items-center p-6 border-b">
        <input
          type="text"
          placeholder="Search user by name or email ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
          + Add New User
        </button>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="text-left px-6 py-3">NAME</th>
            <th className="text-left px-6 py-3">EMAIL</th>
            <th className="text-left px-6 py-3">ROLE</th>
            <th className="text-left px-6 py-3">PHONE</th>
            <th className="text-left px-6 py-3">ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-50">
              <td className="px-6 py-4 flex items-center gap-3">
                {user.profilePictureUrl ? (
                  <img
                    src={user.profilePictureUrl}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-xs font-semibold">
                    {user.name.charAt(0)}
                  </div>
                )}
                {user.name}
              </td>

              <td className="px-6 py-4 underline">{user.email}</td>

              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {user.role}
                </span>
              </td>

              <td className="px-6 py-4">{user.phoneNumber}</td>

              <td className="px-6 py-4 flex gap-3">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {currentUsers.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-400">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center p-4 border-t text-sm">
        <p>
          Showing {startIndex + 1}-
          {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{" "}
          {filteredUsers.length}
        </p>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          {getPaginationPages(totalPages, currentPage).map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-2">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => setCurrentPage(page as number)}
                className={`px-3 py-1 border rounded ${
                  currentPage === page ? "bg-blue-600 text-white" : "bg-white"
                }`}
              >
                {page}
              </button>
            ),
          )}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
