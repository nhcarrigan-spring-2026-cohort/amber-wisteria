
export default function BasicInfoStep({
    mealTrainTitle,
    setMealTrainTitle,
    mealTrainDesc,
    setMealTrainDesc,
    beneficiaryName,
    setBeneficiaryName,
    onNext
}) {
    return (
        <form onSubmit={onNext} className="space-y-5">
            {/* Title */}
            <div className="flex flex-col">
                <label className="self-start text-sm text-gray-600 mb-2 font-semibold">
                    Meal Train Title
                </label>
                <input
                    type="text"
                    value={mealTrainTitle}
                    onChange={(e) => setMealTrainTitle(e.target.value)}
                    required
                    placeholder="e.g. Meals for John's Recovery"
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-gray-400"
                />
            </div>

            {/* Description */}
            <div className="flex flex-col">
                <label className="self-start text-sm text-gray-600 mb-2 font-semibold">
                    Description
                </label>
                <textarea
                    value={mealTrainDesc || ""}
                    onChange={(e) => setMealTrainDesc(e.target.value)}
                    placeholder="Add a short note about the situation..."
                    minLength={5}
                    className="border rounded-lg px-4 py-2 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-gray-400"
                />
            </div>

            {/* Beneficiary  */}
            <div className="flex flex-col">
                <label className="self-start text-sm text-gray-600 mb-2 font-semibold">
                    Beneficiary Name
                </label>
                <input
                    type="text"
                    value={beneficiaryName}
                    onChange={(e) => setBeneficiaryName(e.target.value)}
                    placeholder="Who will receive the meals?"
                    required
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-gray-400"
                />
            </div>

            {/* Button  */}
            <button
                type="submit"
                className="w-full bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition cursor-pointer"
            >
                Next
            </button>
        </form>
    )

}