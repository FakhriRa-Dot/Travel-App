"use client";

import { useEffect, useState } from "react";
import { Users, Folder, Tag, Receipt } from "lucide-react";

import { getActivities } from "@/services/activityService";
import { getPromos } from "@/services/promoService";
import { getAllTransactions } from "@/services/transactionServvice";
import { getUsers } from "@/services/userService";

export default function HomeAdmin() {
  const [users, setUsers] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [promos, setPromos] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  const loadDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const usersData = await getUsers();
      const activitiesData = await getActivities();
      const promosData = await getPromos(token);
      const transactionsData = await getAllTransactions(token);

      setUsers(usersData);
      setActivities(activitiesData);
      setPromos(promosData);
      setTransactions(transactionsData);
    } catch (error) {
      console.error("Dashboard error:", error);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border rounded-xl p-5 flex items-center gap-4 shadow-sm">
          <Users className="text-blue-600" size={28} />
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-xl font-bold">{users.length}</p>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5 flex items-center gap-4 shadow-sm">
          <Folder className="text-green-600" size={28} />
          <div>
            <p className="text-sm text-gray-500">Activities</p>
            <p className="text-xl font-bold">{activities.length}</p>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5 flex items-center gap-4 shadow-sm">
          <Tag className="text-purple-600" size={28} />
          <div>
            <p className="text-sm text-gray-500">Promos</p>
            <p className="text-xl font-bold">{promos.length}</p>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5 flex items-center gap-4 shadow-sm">
          <Receipt className="text-orange-600" size={28} />
          <div>
            <p className="text-sm text-gray-500">Transactions</p>
            <p className="text-xl font-bold">{transactions.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b text-gray-500">
              <tr>
                <th className="text-left py-2">User</th>
                <th className="text-left py-2">Total</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {transactions.slice(0, 5).map((trx: any) => (
                <tr key={trx.id}>
                  <td className="py-3">{trx.user?.name || "User"}</td>

                  <td>Rp {trx.totalAmount?.toLocaleString()}</td>

                  <td>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        trx.status === "success"
                          ? "bg-green-100 text-green-600"
                          : trx.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                      }`}
                    >
                      {trx.status}
                    </span>
                  </td>

                  <td>{new Date(trx.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
