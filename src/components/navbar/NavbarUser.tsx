"use client";

import { CircleUserRound, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function NavbarUser() {
  const pathname = usePathname();
  const router = useRouter();

  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menus = [
    { name: "Home", href: "/homeUser" },
    { name: "Explore", href: "/explore" },
    { name: "Promo", href: "/promo" },
  ];

  useEffect(() => {
    const storedPic = localStorage.getItem("profilePictureUrl");
    const storedName = localStorage.getItem("name");

    setProfilePicture(storedPic);
    setName(storedName);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow relative z-50">
      <div className="mx-auto px-8 h-16 flex items-center justify-between">
        <h1 className="font-heading text-standard text-3xl">EXPLORIA</h1>

        <div className="relative w-137.5 p-2 bg-bluebaby/20 rounded-full pl-6 pr-4 flex gap-3">
          <Search className="text-standard" />
          <input
            type="text"
            placeholder="Search activities, tours ..."
            className="w-full text-standard focus:outline-none font-medium bg-transparent"
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

        <div
          className="flex items-center text-standard gap-4 relative"
          ref={dropdownRef}
        >
          <ShoppingCart className="cursor-pointer" />

          {profilePicture && (
            <div className="relative">
              <img
                src={profilePicture}
                alt="profile"
                onClick={() => setOpen(!open)}
                className="w-9 h-9 rounded-full object-cover cursor-pointer border"
              />

              {open && (
                <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-xl py-2">
                  <div className="px-4 py-2 text-sm font-medium border-b">
                    {name}
                  </div>

                  <button
                    onClick={() => {
                      setOpen(false);
                      router.push("/profile");
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
