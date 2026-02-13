export default function Label({
    children,
    className = "self-start text-md text-gray-700 mb-2 font-semibold",
}) {
    return (
        <label className={className}>
            {children}
        </label>
    );
}