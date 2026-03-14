import SafeImage from "@/components/common/SafeImage";

type Props = {
  id: string;
  name: string;
  imageUrl: string;
  selected: boolean;
  onSelect: (id: string) => void;
};

export default function PaymentMethodCard({
  id,
  name,
  imageUrl,
  selected,
  onSelect,
}: Props) {
  return (
    <div
      onClick={() => onSelect(id)}
      className={`flex items-center gap-3 md:gap-4 border rounded-xl p-4 cursor-pointer transition
      ${
        selected
          ? "border-blue-600 bg-blue-50"
          : "bg-white hover:border-gray-300"
      }`}
    >
      <SafeImage
        src={imageUrl}
        alt="Payment Method"
        className="w-12 h-8 md:w-16 md:h-10 object-contain"
      />

      <p className="font-medium text-sm md:text-base">{name}</p>
    </div>
  );
}
