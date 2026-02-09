export default function RestrictionToggle({
    item,
    selected,
    onToggle
}) {
    const Icon = item.icon;
    return (
        <button
            type="button"
            onClick={() => onToggle(item.id)}
            className={`flex flex-col items-center justify-center transition-all duration-200 cursor-pointer
            `}
        >
            <div className={`w-12 h-12 rounded-full flex items-center p-1 justify-center ring-3 ring-gray-600 transition-colors text-gray-600 ${selected ? "bg-[#A88DE5]" : ""}`}>
                <Icon />
            </div>
            <span className="text-[14px] text-gray-700 font-medium">
                {item.label}
            </span>
        </button>
    )
}