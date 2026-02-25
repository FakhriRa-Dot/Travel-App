import { Bell, Settings } from "lucide-react";

export default function AdminNavbar() {
  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-8">
      <h2 className="text-xl font-semibold">User Management</h2>

      <div className="flex items-center gap-6">
        <Bell className="cursor-pointer text-gray-600 hover:text-blue-600" />
        <Settings className="cursor-pointer text-gray-600 hover:text-blue-600" />
      </div>
    </div>
  );
}
