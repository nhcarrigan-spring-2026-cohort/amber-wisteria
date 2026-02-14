export default function RestrictionView({ item }) {
  const Icon = item.icon;

  return (
    <div className="flex flex-col items-center justify-center cursor-default">
      <div
        className="
          w-12 h-12 rounded-full flex items-center justify-center 
          ring-3 ring-gray-600 text-gray-600 p-1
        "
      >
        <Icon />
      </div>

      <span className="text-[14px] text-gray-700 font-medium mt-1">{item.label}</span>
    </div>
  );
}
