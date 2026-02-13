export default function Textarea({
  value,
  onChange,
  placeholder,
  className = 'bg-white rounded-lg px-4 py-2 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-gray-400',
  ...props
}) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      {...props}
    />
  );
}
