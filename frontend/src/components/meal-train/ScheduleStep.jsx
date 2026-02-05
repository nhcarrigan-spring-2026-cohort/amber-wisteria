import Calendar from "react-calendar";

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
  deliveryInstructions,
  setDeliveryInstructions,
  onNext

}) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side */}
        <div>
          <p className="font-medium mb-2">Select Day</p>
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

          {activeDate && (
            <div className="mt-4">
              <p className="font-medium mb-2">Meals for {activeDate}</p>

              <div className="flex gap-3 justify-center">
                {["breakfast", "lunch", "dinner"].map((meal) => (
                  <button
                    key={meal}
                    onClick={() => toggleMeal(meal)}
                    className={`px-4 py-1 rounded-full border transition-all duration-200
                          ${selectedDates[activeDate]?.[meal] ? "bg-[#8944cb] text-white scale-105" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    {meal}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col mt-4">
            <label className="block self-start text-sm text-gray-600 mb-2 font-semibold">
              Meal Quantity (people)
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 lg:w-[90%]"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          <div>
            <p className="font-medium mb-2">Restrictions</p>

            <div className="flex flex-wrap gap-3">
              {[
                "Vegan",
                "Halal",
                "Vegetarian",
                "Sugar-free",
                "Gluten-free",
                "Organic",
              ].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 border px-3 py-1 rounded-full cursor-pointer"
                >
                  <input type="checkbox" value={item} />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="font-medium mb-2">Delivery Information</p>

            <div className="flex flex-col mb-2">
              <label className="self-start text-sm text-gray-600 mb-2 font-semibold placeholder:text-gray-500">
                Delivery Address
              </label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Delivery Address"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                required
              />
            </div>

            <div className="flex flex-col mb-2">
              <label className="self-start text-sm text-gray-600 mb-2 font-semibold placeholder:text-gray-500">
                Delivery Instructions
              </label>
              <textarea
                type="text"
                value={deliveryInstructions}
                onChange={(e) => setDeliveryInstructions(e.target.value)}
                placeholder="Delivery Instructions (optional)"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full resize-none h-20"
              />
            </div>
          </div>
        </div>


      </div>

      <button
        onClick={onNext}
        className="w-full mt-5 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-700 transition cursor-pointer"
      >
        Review Meal Train
      </button>
    </div>

  );
}
