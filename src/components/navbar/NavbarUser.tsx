import { CircleUserRound, Search, ShoppingCart } from "lucide-react";

export default function NavbarUser() {
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
          <li>Home</li>
          <li className="font-bold">Explore</li>
          <li>Promo</li>
        </ul>

        <div className="flex text-standard gap-4">
          <ShoppingCart />
          <CircleUserRound />
        </div>
      </div>
    </nav>
  );
}
