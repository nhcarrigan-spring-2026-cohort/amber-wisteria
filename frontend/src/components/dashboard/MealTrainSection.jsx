import { redFilter } from './HoverIcon.constants';
import HoverIcon from './HoverIcon';
import WaitingIcon from '../../assets/waiting.svg';
import XIcon from '../../assets/x.svg';

export default function MealTrainCard({
  title,
  description,
  pending = false,
  approved = false,
  showTopBorder = true,
  onCancel,
  onLeave
}) {
  return (
    <div className={`pt-2 ${showTopBorder ? 'border-t border-[#4c4c4c]' : ''}`}>
      <div
        className={`p-[10px_20px] my-[15px] rounded-lg border text-left flex justify-between items-center ${
          pending ? 'bg-[#f0f0f0] border-[#b5b5b5] opacity-70' : 'bg-white border-[#4c4c4c]'
        }`}
      >
        <div>
          <h2 className="text-[18px] font-bold my-1">{title}</h2>
          <p className="text-[15px] text-[#4c4c4c]">{description || 'No description provided.'}</p>
        </div>

        {pending && (
          <div className="flex gap-3">
            <HoverIcon src={WaitingIcon} alt="waiting" />

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onCancel();
              }}
            >
              <HoverIcon src={XIcon} alt="cancel" base={redFilter} hover={redFilter} />
            </button>
          </div>
        )}

        {approved && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onLeave();
            }}
          >
            <HoverIcon src={XIcon} alt="leave" base={redFilter} hover={redFilter} />
          </button>
        )}
      </div>
    </div>
  );
}