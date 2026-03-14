import SafeImage from "@/components/common/SafeImage";
import { Cart } from "@/types/cart";
import { Trash } from "lucide-react";

type Props = {
  item: Cart;
  onDelete: (id: string) => void;
  onQty: (id: string, qty: number) => void;
};

export default function CartItem({ item, onDelete, onQty }: Props) {
  const itemTotal = item.activity.price * item.quantity;

  return (
    <div className="bg-white border rounded-xl p-4 md:p-6 flex flex-col sm:flex-row gap-4 md:gap-6">
      <SafeImage
        src={item.activity.imageUrl}
        alt="Keranjang"
        className="w-full sm:w-36 h-40 sm:h-36 object-cover rounded-lg"
      />

      <div className="flex-1 flex flex-col justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <div>
            <h3 className="font-semibold text-base md:text-lg">
              {item.activity.title}
            </h3>

            <p className="text-gray-500 text-sm md:text-base">
              Rp {item.activity.price.toLocaleString("id-ID")}
            </p>
          </div>

          <p className="font-semibold text-sm md:text-base">
            Rp {itemTotal.toLocaleString("id-ID")}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex border rounded-lg overflow-hidden">
            <button
              className="px-3 md:px-4 py-2"
              onClick={() => onQty(item.id, item.quantity - 1)}
            >
              -
            </button>

            <span className="px-3 md:px-4 py-2">{item.quantity}</span>

            <button
              className="px-3 md:px-4 py-2"
              onClick={() => onQty(item.id, item.quantity + 1)}
            >
              +
            </button>
          </div>

          <button
            onClick={() => onDelete(item.id)}
            className="text-red-500 text-xs md:text-sm "
          >
            <Trash className="md:ms-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
