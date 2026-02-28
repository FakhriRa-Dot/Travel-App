import { Pencil, Trash } from "lucide-react";

type Props = {
  id: string;
  status: "ACTIVE" | "SCHEDULED" | "DRAFT";
  title: string;
  path: string;
  dimensions: string;
  visibility: string;
  schedule: string;
  image: string;
  onDelete: (id: string) => void;
  onEdit: () => void;
};

export default function BannerCard({
  id,
  status,
  title,
  path,
  dimensions,
  visibility,
  schedule,
  image,
  onDelete,
  onEdit,
}: Props) {
  const statusColor = {
    ACTIVE: "bg-green-100 text-green-700",
    SCHEDULED: "bg-blue-100 text-blue-700",
    DRAFT: "bg-gray-200 text-gray-700",
  };

  return (
    <div className="flex bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="w-64 relative">
        <img src={image} alt={title} className="object-cover" />

        <span
          className={`absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full ${statusColor[status]}`}
        >
          {status}
        </span>
      </div>

      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-blue-600 mt-1">{path}</p>

          <div className="grid grid-cols-3 gap-6 mt-6 text-sm text-gray-600">
            <div>
              <p className="text-xs text-gray-400">DIMENSIONS</p>
              <p>{dimensions}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">VISIBILITY</p>
              <p>{visibility}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">SCHEDULE</p>
              <p>{schedule}</p>
            </div>
          </div>
        </div>

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
