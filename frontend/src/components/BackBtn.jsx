import BackBtnIcon from "./icons/BackBtnIcon";

export default function BackBtn({
    className = "",
    onClick,
    ...props
}) {
    return (
        <button 
            className="rounded-full border-none font-medium outline-none text-white bg-orange-500 w-8 h-8 cursor-pointer hover:scale-110 transition"
            onClick={onClick}
            {...props}
        >
            <BackBtnIcon />
        </button>
    )
}