export default function ShowMoreButton({ open, onClick }) {
  return (
    <button
      onClick={onClick}
      className="mx-auto text-[#f68300] font-semibold flex items-center gap-1"
    >
      {open ? 'Show less' : 'Show more'}
      <span className={`inline-block transition-transform ${open ? 'rotate-180' : ''}`}>˅</span>
    </button>
  );
}
