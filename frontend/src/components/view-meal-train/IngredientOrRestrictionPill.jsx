export default function IngredientOrRestrictionPill({
    children,
    className = "",
    ...props
}) {
    return (
        <div 
            className={`flex items-center justify-center rounded-full px-3 py-1.5 text-sm font-medium text-white shadow-sm ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}