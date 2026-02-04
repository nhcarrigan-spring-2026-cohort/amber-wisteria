import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function MeanTrainCreationForm() {
  // step state => to control steps
  const [step, setStep] = useState(1);

  // step 1
  const [mealTrainTitle, setMealTrainTitle] = useState("Meal for Eric");
  const [mealTrainDesc, setMealTrainDesc] = useState(
    "Eric is suffering from Dengue",
  );
  const [beneficiaryName, setBeneficiaryName] = useState("John");

  // step 2
  const [selectedDates, setSelectedDates] = useState(new Date());
  const [quantity, setQuantity] = useState(1);

  const handleBasicInfoSubmit = (e) => {
    e.preventDefault();

    setStep(2);
  };

  return (
    <div className="min-h-screen bg-[#FFF8E3] flex items-center justify-center">
      {/* Card */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-8">
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          {step === 1
            ? "Create a Meal Train"
            : `Making a meal train for "${mealTrainTitle}"`}
        </h1>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleBasicInfoSubmit} className="space-y-5">
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
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label className="self-start text-sm text-gray-600 mb-2 font-semibold">
                Description
              </label>
              <textarea
                value={mealTrainDesc}
                onChange={(e) => setMealTrainDesc(e.target.value)}
                placeholder="Add a short note about the situation..."
                minLength={5}
                className="border rounded-lg px-4 py-2 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-purple-400"
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
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
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
        )}

        {/* STEP 2  */}
        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Side */}
            <div>
              <p className="font-medium mb-2">Select Day</p>
              <Calendar onChange={setSelectedDates} value={selectedDates} />

              <div className="mt-4">
                <label className="block self-start text-sm text-gray-600 mb-2 font-semibold">
                  Meal Quantity (people)
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                />
              </div>
            </div>

            {/* Right Side */}
            <div>
              
              <p className="font-medium mb-2">
                Please avoid these ingredients
              </p>

              <div className="flex flex-wrap gap-3">
                {["Vegan", "Halal", "Vegetarian", "Sugar-free", "Gluten-free", "Organic"].map(item => (
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
          </div>
        )}
      </div>
    </div>
  );
}
