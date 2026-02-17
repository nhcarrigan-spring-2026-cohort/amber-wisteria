import Button from '../Button';

export default function ReviewStep({
  mealTrainTitle,
  mealTrainDesc,
  beneficiaryName,
  deliveryAddress,
  //_deliveryInstructions, // intentionally unused for now
  selectedDates,
  displayFormattedDate,
  restrictions,
  onCreate
}) {
  return (
    <div className="space-y-6">
      {/* Basic Info  */}
      <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-200 ring-2 ring-offset-1 ring-purple-400">
        <p>
          <b>Title:</b> {mealTrainTitle}
        </p>
        <p>
          <b>Description:</b> {mealTrainDesc || 'None'}
        </p>
        <p>
          <b>Beneficiary:</b> {beneficiaryName}
        </p>
        <p>
          <b>Restrictions:</b> {restrictions.length ? restrictions.join(',') : 'None'}
        </p>
        <p>
          <b>Delivery Address:</b> {deliveryAddress}
        </p>
      </div>

      {/* Schedule  */}
      <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-200 ring-2 ring-offset-1 ring-purple-400">
        <h3 className="font-bold text-lg mb-2">Schedule</h3>
        <div className="flex flex-wrap gap-5 justify-center">
          {Object.entries(selectedDates).map(([date, meals]) => (
            <div
              key={date}
              className="mb-2 p-2 border-2 border-orange-600 rounded-2xl hover:shadow-md transition-all duration-75"
            >
              <p className="font-semibold mb-2">{displayFormattedDate(date)}</p>

              <div className="flex gap-2 flex-wrap justify-center">
                {meals.breakfast && <span className="pill">Breakfast</span>}
                {meals.lunch && <span className="pill">Lunch</span>}
                {meals.dinner && <span className="pill">Dinner</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final Create */}
      <Button children="Create" className="w-full" variant="orange" onClick={onCreate} />
    </div>
  );
}
