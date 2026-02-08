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
            className={`flex flex-col items-center justify-center transition-all duration-200
            `}
        >
            <div className={`w-14 h-14 rounded-full flex items-center p-1 justify-center ring-3 ring-gray-600 transition-colors text-gray-600 ${selected ? "bg-[#A88DE5]" : ""}`}>
                <Icon />
            </div>
            <span className="text-[12px] font-medium">
                {item.label}
            </span>
        </button>
    )
}