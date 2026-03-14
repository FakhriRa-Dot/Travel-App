"use client";

import { CircleUserRound, Search, ShoppingCart, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function NavbarUser() {
  const pathname = usePathname();
  const router = useRouter();

  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const menus = [
    { name: "Home", href: "/homeUser" },
    { name: "Promo", href: "/promo" },
    { name: "Explore", href: "/explore" },
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
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        {/* LOGO */}
        <h1 className="font-heading text-standard text-2xl md:text-3xl">
          EXPLORIA
        </h1>

        {/* SEARCH */}
        <div className="hidden md:flex flex-1 max-w-xl p-2 bg-bluebaby/20 rounded-full pl-6 pr-4 gap-3">
          <Search className="text-standard" />
          <input
            type="text"
            placeholder="Search activities, tours ..."
            className="w-full text-standard focus:outline-none font-medium bg-transparent"
          />
        </div>

        {/* MENU DESKTOP */}
        <ul className="hidden md:flex gap-6 text-standard">
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

        {/* RIGHT SIDE */}
        <div
          className="flex items-center text-standard gap-4 relative"
          ref={dropdownRef}
        >
          <Link href="/cart">
            <ShoppingCart className="cursor-pointer" />
          </Link>

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
                    onClick={() => {
                      setOpen(false);
                      router.push("/transaction");
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    My Transaction
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

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white shadow">
          <div className="flex p-2 bg-bluebaby/20 rounded-full gap-3">
            <Search className="text-standard" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full text-standard focus:outline-none font-medium bg-transparent"
            />
          </div>

          {menus.map((menu) => (
            <Link
              key={menu.name}
              href={menu.href}
              className="block py-2 font-medium text-standard"
            >
              {menu.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
