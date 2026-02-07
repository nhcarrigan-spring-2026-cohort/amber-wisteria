import React from "react";
import clsx from "clsx"

export default function CreateButton({
    children,
    variant = "purple",
    onClick,
    className = "",
    ...props
}) {

    const base = "px-4 py-2 rounded-lg text-md font-medium transition focus:outline-none cursor-pointer";

    const variants = {
        orange: "bg-[#F8A039] text-white hover:bg-[#F68300]",
        purple: "bg-[#A88DE5] text-white hover:bg-[#795cbc]",
        secondary: "bg-gray-400 text-white hover:bg-gray-500"
    }

    return (
        <button
            onClick={onClick}
            className={clsx(base, variants[variant], className)}
            {...props}
        >
            {children}
        </button>
    )
}