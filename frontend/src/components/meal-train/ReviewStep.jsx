export default function ReviewStep({
    mealTrainTitle,
    mealTrainDesc,
    beneficiaryName,
    deliveryAddress,
    deliveryInstructions,
    selectedDates,
    restrictions,
    onCreate,
    onBack
}) {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Review Meal Train</h2>

            {/* Basic Info  */}
            <div className="border rounded-lg p-4">
                <p>
                    <b>Title:</b> {mealTrainTitle}
                </p>
                <p>
                    <b>Description:</b> {mealTrainDesc}
                </p>
                <p>
                    <b>Beneficiary:</b> {beneficiaryName}
                </p>
                <p>
                    <b>Restrictions:</b> {restrictions.length ? restrictions.join(",") : "None"}
                </p>
                <p>
                    <b>Delivery Address:</b> {deliveryAddress}
                </p>
                <p>
                    <b>Instructions:</b> {deliveryInstructions || "None"}
                </p>
            </div>

            {/* Schedule  */}
            <div className="border rounded-lg p-4">
                <h3 className="font-bold text-lg mb-2">Schedule</h3>
                <div className="flex flex-wrap gap-5 justify-center">
                    {Object.entries(selectedDates).map(([date, meals]) => (
                        <div key={date} className="mb-2 p-2 border-2 border-purple-600 rounded-2xl hover:shadow-md transition-all duration-75">
                            <p className="font-semibold mb-2">{date}</p>

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
            <div className="flex gap-4">
                <button 
                onClick={onBack}
                className="w-1/2 bg-gray-300 py-2 rounded-lg hover:bg-gray-400 cursor-pointer">
                    Back
                </button>

                <button
                    onClick={onCreate}
                    className="w-1/2 bg-green-600 text-white py-2 hover:bg-green-700 cursor-pointer rounded-lg"
                >
                    Create Meal Train
                </button>

            </div>

        </div>
    );
}
