import { orangeFilter, purpleHover } from './HoverIcon.constants';

export default function HoverIcon({ src, alt, base = orangeFilter, hover = purpleHover }) {
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
