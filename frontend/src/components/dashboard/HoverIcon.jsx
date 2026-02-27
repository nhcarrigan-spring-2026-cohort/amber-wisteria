import { orangeFilter, purpleHover } from './HoverIcon.constants';

export default function HoverIcon({
  src,
  alt,
  base = orangeFilter,
  hover = purpleHover,
  className = 'w-5 h-5',
  onClick
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={`cursor-pointer ${className}`}
      style={{ filter: base }}
      onMouseEnter={(e) => (e.currentTarget.style.filter = hover)}
      onMouseLeave={(e) => (e.currentTarget.style.filter = base)}
      onClick={onClick}
    />
  );
}
