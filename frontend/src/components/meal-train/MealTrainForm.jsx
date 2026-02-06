import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import '../../CustomCalendar.css';
import BasicInfoStep from "./BasicInfoStep";
import ScheduleStep from "./ScheduleStep";
import ReviewStep from "./ReviewStep";

export default function MeanTrainCreationForm() {
  // step state => to control steps
  const [step, setStep] = useState(1);

  // step 1
  const [mealTrainTitle, setMealTrainTitle] = useState("");
  const [mealTrainDesc, setMealTrainDesc] = useState(
    ""
  );
  const [beneficiaryName, setBeneficiaryName] = useState("");

  // step 2
  const [selectedDates, setSelectedDates] = useState({});
  const [activeDate, setActiveDate] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [restrictions, setRestrictions] = useState([]);


  const handleBasicInfoSubmit = (e) => {
    e.preventDefault();

    setStep(2);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-CA").split("T")[0];
  }

  const handleDayClick = (clickedDate) => {
    const formatted = formatDate(clickedDate);
    setActiveDate(formatted);

    setSelectedDates((prev) => {

      // if already selected => remove
      if (prev[formatted]) {
        return prev;
      } 

      return {
        ...prev,
        [formatted]: {
          breakfast: false,
          lunch: false,
          dinner: false,
        }
      };
    });
  };

  const toggleMeal = (meal) => {
    if (!activeDate) return;

    setSelectedDates((prev) => ({
      ...prev,
      [activeDate]: {
        ...prev[activeDate],
        [meal]: !prev[activeDate][meal]
      }
    }));
  };

  const handleScheduleStepSubmit = () => {
    if (validateSchedule()) {
      setStep(3);
    }
  }

  const validateSchedule = () => {
    if (Object.keys(selectedDates).length === 0) {
      alert("Please select at least one day.");
      return false;
    }

    for (let day in selectedDates) {
      const meal = selectedDates[day];
      if (!meal.breakfast && !meal.lunch && !meal.dinner) {
        alert(`Please select at least one meal for ${day}`);
        return false;
      }
    }

    if (!deliveryAddress) {
      alert("Please provide a delivery address.");
      return false;
    }
    return true;
  }

  const handleCreateMealTrain = async () => {

    const payload = {
      title: mealTrainTitle,
      description: mealTrainDesc,
      beneficiaryName,
      deliveryAddress,
      deliveryInstructions,
      schedule: selectedDates,
      restrictions
    };
    console.log("Sending a mock server:", payload);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const fakeData = {
      id: "mt-" + Math.floor(Math.random() * 10000),
      status: "success"
    };

    const shareUrl = `${window.location.origin}/meal-train/${fakeData.id}`;

    alert("MOCK MODE: Meal Train Created!\n\nShare this link:\n" + shareUrl);

  };

  const clearSchedule = () => {
    setSelectedDates({});
    setActiveDate(null);
  }


  return (
    <div className="min-h-screen bg-[#FFF8E3] flex items-center justify-center">
      {/* Card */}
      <div className={`w-full ${(step === 2 || step === 3) ? "max-w-3xl" : "max-w-xl"} bg-white rounded-2xl shadow-md p-8`}>
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          {step === 1 ? "Create a Meal Train" :
            step === 2 ? `Making a meal train for "${mealTrainTitle}"` :
              step === 3 ? `Review meal train for "${mealTrainTitle}"` :
                ""}
        </h1>


        {/* STEP 1 */}
        {step === 1 && (
          <BasicInfoStep
            mealTrainTitle={mealTrainTitle}
            setMealTrainTitle={setMealTrainTitle}
            mealTrainDesc={mealTrainDesc}
            setMealTrainDesc={setMealTrainDesc}
            beneficiaryName={beneficiaryName}
            setBeneficiaryName={setBeneficiaryName}
            onNext={handleBasicInfoSubmit}
          />
        )}


        {/* STEP 2  */}
        {step === 2 && (
          <ScheduleStep
            selectedDates={selectedDates}
            activeDate={activeDate}
            handleDayClick={handleDayClick}
            formatDate={formatDate}
            toggleMeal={toggleMeal}
            quantity={quantity}
            setQuantity={setQuantity}
            deliveryAddress={deliveryAddress}
            setDeliveryAddress={setDeliveryAddress}
            deliveryInstructions={setDeliveryInstructions}
            restrictions={restrictions}
            setRestrictions={setRestrictions}
            onClearSchedule={clearSchedule}
            onNext={handleScheduleStepSubmit}
            onBack={() => setStep(1)}
          />
        )}

        {/* STEP 3  */}
        {step === 3 && (
          <ReviewStep
            mealTrainTitle={mealTrainTitle}
            mealTrainDesc={mealTrainDesc}
            beneficiaryName={beneficiaryName}
            deliveryAddress={deliveryAddress}
            deliveryInstructions={deliveryInstructions}
            selectedDates={selectedDates}
            restrictions={restrictions}
            onCreate={handleCreateMealTrain}
            onBack={() => setStep(2)}
          />
        )}
      </div>
    </div>
  );
}
