
export default function Input({
    children,
    type,
    value,
    onChange,
    className = "rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-gray-400",
    placeholder,
    ...props
}) {
    return (
        <input 
            type={type}
            value={value}
            onChange={onChange}
            className={className}
            placeholder={placeholder}
            {...props}
        />
    )
}