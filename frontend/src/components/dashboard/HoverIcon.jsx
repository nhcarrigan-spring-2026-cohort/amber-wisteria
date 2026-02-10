const orangeFilter =
  "brightness(0) saturate(100%) invert(57%) sepia(82%) saturate(2471%) hue-rotate(1deg) brightness(101%) contrast(101%)";

const purpleHover =
  "brightness(0) saturate(100%) invert(17%) sepia(94%) saturate(7470%) hue-rotate(266deg) brightness(90%) contrast(102%)";

export default function HoverIcon({
  src,
  alt,
  base = orangeFilter,
  hover = purpleHover,
}) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-5 h-5 cursor-pointer"
      style={{ filter: base }}
      onMouseEnter={(e) => (e.currentTarget.style.filter = hover)}
      onMouseLeave={(e) => (e.currentTarget.style.filter = base)}
    />
  );
}

export const redFilter =
  "brightness(0) saturate(100%) invert(17%) sepia(93%) saturate(7480%) hue-rotate(356deg) brightness(92%) contrast(105%)";

export const orangeFilterConst = orangeFilter;
