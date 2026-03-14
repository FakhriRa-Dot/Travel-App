import SafeImage from "@/components/common/SafeImage";
import { Pencil, Trash } from "lucide-react";

type Props = {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  onDelete: (id: string) => void;
  onEdit: () => void;
};

export default function BannerCard({
  id,
  name,
  imageUrl,
  createdAt,
  updatedAt,
  onDelete,
  onEdit,
}: Props) {
  return (
    <div className="flex bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="w-64 h-40 relative">
        <SafeImage
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{name}</h2>

          <div className="grid grid-cols-2 gap-6 mt-6 text-sm text-gray-600">
            <div>
              <p className="text-xs text-gray-400">CREATED AT</p>
              <p>{new Date(createdAt).toLocaleDateString()}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">UPDATED AT</p>
              <p>{new Date(updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-6 text-gray-500">
          <Pencil
            size={18}
            onClick={onEdit}
            className="cursor-pointer hover:text-blue-600"
          />
          <Trash
            size={18}
            onClick={() => onDelete(id)}
            className="cursor-pointer hover:text-red-600"
          />
        </div>
      </div>
    </div>
  );
}
