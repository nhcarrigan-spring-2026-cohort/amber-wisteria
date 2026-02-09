import Calendar from "react-calendar";
import Button from "../Button";
import RestrictionToggle from "../RestrictionToggle";
import { RESTRICTIONS } from "../../data/restrictions";
import Input from "../Input";
import Label from "../Label";

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
  onNext
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

            if (formatted === activeDate) {
              return "active-day";
            }

            if (selectedDates[formatted]) {
              return "selected-day";
            }

            return null;
          }}
        />
      </div>

      {activeDate && (
        <div className="w-[60%] mx-auto">
          <p className="font-medium mb-2">Meals for {new Date(activeDate).toLocaleDateString()}</p>

          <div className="flex gap-3 justify-between">
            {["breakfast", "lunch", "dinner"].map((meal) => (
              <Button
                key={meal}
                children={meal}
                variant={`${selectedDates[activeDate]?.[meal] ? "orange" : "secondary"}`}
                onClick={() => toggleMeal(meal)}
                className="rounded-full shadow-md duration-200"
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col mt-4">
        <Label children="Meal Quantity (people)" />
        <Input
          type="number"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          placeholder="Enter number of people"
        />
      </div>

      <div className="flex flex-col mt-4">
        <p className="self-start text-md text-gray-700 mb-2 font-semibold">Restrictions</p>

        <div className="flex flex-wrap gap-4 justify-center items-center w-[70%] mx-auto">
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
        <Label children="Delivery Address" />
        <Input
          type="text"
          value={deliveryAddress}
          onChange={e => setDeliveryAddress(e.target.value)}
          placeholder="Delivery Address"
        />
      </div>


      <Button children="Review Meal Train" className="w-full" variant="orange" onClick={onNext} />


    </div>
  );
}
