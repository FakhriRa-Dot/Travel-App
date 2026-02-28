"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Folder,
  Tag,
  Image,
  CreditCard,
  Receipt,
} from "lucide-react";

export default function SidebarAdmin() {
  const pathname = usePathname();

  const menus = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Manage Users", href: "/users", icon: Users },
    { name: "Manage Category", href: "/category", icon: Folder },
    { name: "Manage Activity", href: "/activity", icon: Tag },
    { name: "Manage Promo", href: "/promoAdmin", icon: Tag },
    { name: "Manage Banner", href: "/banner", icon: Image },
    { name: "Manage Transaction", href: "/transactionAdmin", icon: Receipt },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between">
      <div>
        <div className="p-6 border-b">
          <h1 className="text-xl font-heading font-bold text-blue-700">
            EXPLORIA
          </h1>
          <p className="text-xs text-gray-500">ADMIN DASHBOARD</p>
        </div>

        <nav className="p-4 space-y-2">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const isActive = pathname === menu.href;

            return (
              <Link
                key={menu.name}
                href={menu.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition 
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <Icon size={18} />
                {menu.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">Exploria</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
