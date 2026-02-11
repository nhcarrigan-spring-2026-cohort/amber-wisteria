export default function Background({ children }) {
  return (
    <div className="bg-[#FFF8E3] overflow-hidden relative">
      <div
        id="rectangle-left"
        className="absolute min-w-135 min-h-135 lg:w-187.5 lg:h-187.5 z-1 -top-60 -left-77.25 bg-[#F68300] -rotate-45 rounded-[160px] md:w-150 md:h-150 -sm:left-25"
      ></div>
      <div
        id="rectangle-right"
        className="absolute min-w-135 min-h-135 lg:w-187.5 lg:h-187.5 z-1 -bottom-77.5 -right-77.25 bg-[#FEB058] -rotate-45 rounded-[160px] md:w-150 md:h-150"
      ></div>
      {children}
    </div>
  );
}
