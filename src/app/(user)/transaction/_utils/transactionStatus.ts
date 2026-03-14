export function getStatusColor(status: string) {
  if (status === "success") return "bg-green-100 text-green-700";
  if (status === "pending") return "bg-yellow-100 text-yellow-700";
  if (status === "cancelled") return "bg-red-100 text-red-700";

  return "bg-gray-100 text-gray-700";
}
