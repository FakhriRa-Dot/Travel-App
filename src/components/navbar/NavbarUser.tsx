"use client";

import { CircleUserRound, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarUser() {
  const pathname = usePathname();

  const menus = [
    { name: "Home", href: "/homeUser" },
    { name: "Explore", href: "/explore" },
    { name: "Promo", href: "/promo" },
  ];
  return (
    <nav className="bg-white shadow">
      <div className="mx-auto px-8 h-16 flex items-center justify-between">
        <h1 className="font-heading text-standard text-3xl">EXPLORIA</h1>

        <div className="relative w-137.5 p-2 bg-bluebaby/20 rounded-full  pl-10 pr-4  flex gap-3">
          <Search className="text-standard" />
          <input
            type="text"
            placeholder="Search activities, tours ..."
            className="w-full text-standard focus:outline-none font-medium"
          />
        </div>

        <ul className="flex gap-5 text-standard">
          {menus.map((menu) => {
            const isActive =
              menu.href === "/"
                ? pathname === "/"
                : pathname.startsWith(menu.href);

            return (
              <li key={menu.name}>
                <Link
                  href={menu.href}
                  className={`${
                    isActive ? "font-bold" : "font-medium"
                  } hover:font-bold transition`}
                >
                  {menu.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex text-standard gap-4">
          <ShoppingCart />
          <CircleUserRound />
        </div>
      </div>
    </nav>
  );
}
