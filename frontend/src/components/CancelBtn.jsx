import CancelBtnIcon from "./icons/CancelBtnIcon";

export default function CancelBtn({
    className = "",
    onClick,
    ...props
}) {
    return (
        <button 
            onClick={onClick}
            className="rounded-full border-none outline-none font-medium text-white bg-red-500 w-8 h-8 cursor-pointer hover:scale-110 transition"
            {...props}
        >
            <CancelBtnIcon />
        </button>
    )
}