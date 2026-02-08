import Calendar from "react-calendar";
import Button from "../Button";
import RestrictionToggle from "../RestrictionToggle";
import { RESTRICTIONS } from "../../data/restrictions";

export default function ScheduleStep({
  selectedDates,
  activeDate,
  handleDayClick,
  formatDate,
  toggleMeal,
  quantity,
  setQuantity,
  deliveryAddress,
  setDeliveryAddress,
  restrictions,
  setRestrictions,
  onClearSchedule,
  onNext,
  onBack
}) {

  const toggleRestrictions = (value) => {
    setRestrictions((prev) => prev.includes(value) ? prev.filter(r => r !== value) : [...prev, value]);
  }

  return (
    <div className="flex flex-col justify-center gap-2">
      <p className="self-start text-md text-gray-700 mb-2 font-semibold">Choose day(s)</p>
      <div className="w-full">
        <Calendar
          onClickDay={handleDayClick}
          tileClassName={({ date }) => {
            const formatted = formatDate(date);
            if (selectedDates[formatted]) {
              return "selected-day";
            }
            return null;
          }}
        />
      </div>
      {selectedDates && (
        <button
          onClick={onClearSchedule}
          className="mt-3 text-sm text-red-500 underline hover:text-red-700">
          Clear all selected days
        </button>
      )}

      {activeDate && (
        <div className="mt-4 w-[60%] mx-auto">
          <p className="font-medium mb-2">Meals for {activeDate}</p>

          <div className="flex gap-3 justify-between">
            {["breakfast", "lunch", "dinner"].map((meal) => (
              <Button 
                key={meal}
                children={meal}
                variant={`${selectedDates[activeDate]?.[meal] ? "orange" : "secondary"}` }
                onClick={() => toggleMeal(meal)}
                className="rounded-full shadow-md duration-200"
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col mt-4">
        <label className="self-start text-md text-gray-700 mb-2 font-semibold">
          Meal Quantity (people)
        </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="bg-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 lg:w-[90%]"
        />
      </div>

      <div className="flex flex-col mt-4">
        <p className="self-start text-md text-gray-700 mb-2 font-semibold">Restrictions</p>

        <div className="flex flex-wrap gap-4 justify-center items-center">
          {RESTRICTIONS.map(item => (
            <RestrictionToggle 
              key={item.id}
              item={item}
              selected={restrictions.includes(item.id)}
              onToggle={toggleRestrictions}
            />
          ))}
        </div>
      </div>


        <div className="flex flex-col mb-2 mt-6">
          <label className="self-start text-md text-gray-700 mb-2 font-semibold">
            Delivery Address
          </label>
          <input
            type="text"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            placeholder="Delivery Address"
            className="bg-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 w-full"
            required
          />
        </div>

        <div className="flex gap-4 mt-6">
          <Button children="Back" className="w-1/2" variant="secondary" onClick={onBack} />
          <Button children="Review Meal Train" className="w-1/2" variant="orange" onClick={onNext} />
        </div>

    </div>
  );
}
