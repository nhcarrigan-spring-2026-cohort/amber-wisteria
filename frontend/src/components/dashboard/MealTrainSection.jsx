import { Link } from 'react-router-dom';
import MealTrainCard from './MealTrainCard';

export default function MealTrainSection({
  title,
  buttonLabel,
  buttonIcon,
  buttonAction,
  items,
  extraItems,
  showMore,
  toggleShowMore,
  onCancel,
  onLeave
}) {
  return (
    <section className="flex flex-col">
      <div className="flex justify-between items-center border-b border-black pb-3 mb-5">
        <h1 className="text-[28px] font-bold">{title}</h1>

        <button
          onClick={buttonAction}
          className="flex items-center gap-2 bg-[#f68300] text-white px-4 py-2 rounded-full font-semibold"
        >
          <img
            src={buttonIcon}
            className="w-[18px] h-[18px]"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          {buttonLabel}
        </button>
      </div>

      {items.map((item, i) => (
        <div key={item.id}>
          <Link to={`/view-meal-train/${item.id}`} className="cursor-pointer">
            <MealTrainCard
              {...item}
              pending={item.membershipStatus === 'pending'}
              approved={item.membershipStatus === 'approved'}
              showTopBorder={i !== 0}
              onCancel={() => onCancel(item.membershipId)}
              onLeave={() => onLeave(item.membershipId)}
              owner={item.membership_status === 'owner'}
              id={item.id}
            />
          </Link>
        </div>
      ))}

      {showMore &&
        extraItems.map((item) => (
          <div key={`extra-${item.id}`}>
            <Link to={`/view-meal-train/${item.id}`} className="cursor-pointer">
              <MealTrainCard
                {...item}
                pending={item.membershipStatus === 'pending'}
                approved={item.membershipStatus === 'approved'}
                onCancel={() => onCancel(item.membershipId)}
                onLeave={() => onLeave(item.membershipId)}
                owner={item.membership_status === 'owner'}
                id={item.id}
              />
            </Link>
          </div>
        ))}

      <button
        className="mx-auto text-[#f68300] font-semibold flex items-center gap-1"
        onClick={toggleShowMore}
      >
        {showMore ? 'Show less' : 'Show more'}
        <span className={`inline-block transition-transform ${showMore ? 'rotate-180' : ''}`}>
          ˅
        </span>
      </button>
    </section>
  );
}
