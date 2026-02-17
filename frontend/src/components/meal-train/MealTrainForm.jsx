import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import '../meal-train/CustomCalendar.css';
import BasicInfoStep from './BasicInfoStep';
import ScheduleStep from './ScheduleStep';
import ReviewStep from './ReviewStep';
import BackBtn from '../BackBtn';
import CancelBtn from '../CancelBtn';
import { useNavigate } from 'react-router-dom';

export default function MealTrainForm() {
  // step state => to control steps
  const [step, setStep] = useState(1);

  // step 1
  const [mealTrainTitle, setMealTrainTitle] = useState('');
  const [mealTrainDesc, setMealTrainDesc] = useState('');
  const [beneficiaryName, setBeneficiaryName] = useState('');

  // step 2
  const [selectedDates, setSelectedDates] = useState({});
  const [activeDate, setActiveDate] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [restrictions, setRestrictions] = useState([]);

  const navigate = useNavigate();

  const handleBasicInfoSubmit = (e) => {
    e.preventDefault();

    if (!mealTrainTitle.trim()) {
      alert('Please provide meal title.');
      return;
    }

    if (!beneficiaryName.trim()) {
      alert('Please provide beneficiary name.');
      return;
    }

    setStep(2);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-CA').split('T')[0];
  };

  const handleDayClick = (clickedDate) => {
    const formatted = formatDate(clickedDate);

    setSelectedDates((prev) => {
      // day already exists
      if (prev[formatted]) {
        // if its already active -> unselect
        if (formatted === activeDate) {
          const updated = { ...prev };
          delete updated[formatted];
          setActiveDate(null);
          return updated;
        }

        // if selected but not active -> focus
        setActiveDate(formatted);
        return prev;
      }

      // If new -> select + focus
      setActiveDate(formatted);

      return {
        ...prev,
        [formatted]: {
          breakfast: false,
          lunch: false,
          dinner: false
        }
      };
    });
  };

  const toggleMeal = (meal) => {
    if (!activeDate || !selectedDates[activeDate]) return;

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
  };

  const validateSchedule = () => {
    if (Object.keys(selectedDates).length === 0) {
      alert('Please select at least one day.');
      return false;
    }

    for (let day in selectedDates) {
      const meal = selectedDates[day];
      if (!meal.breakfast && !meal.lunch && !meal.dinner) {
        alert(`Please select at least one meal for ${day}`);
        return false;
      }
    }

    if (!deliveryAddress.trim()) {
      alert('Please provide a delivery address.');
      return false;
    }

    if (quantity <= 0) {
      alert('Please provide valid meal quantity.');
      return false;
    }
    return true;
  };

  const handleCreateMealTrain = async () => {
    const payload = {
      title: mealTrainTitle,
      description: mealTrainDesc,
      beneficiaryName,
      deliveryAddress,
      schedule: selectedDates,
      restrictions
    };
    console.log('Sending a mock server:', payload);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const fakeData = {
      id: 'mt-' + Math.floor(Math.random() * 10000),
      status: 'success'
    };

    const shareUrl = `${window.location.origin}/meal-train/${fakeData.id}`;

    alert('MOCK MODE: Meal Train Created!\n\nShare this link:\n' + shareUrl);
  };

  const displayFormattedDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const clearForm = () => {
    if (confirm('Are you sure you want to exit the form?')) {
      setMealTrainTitle('');
      setMealTrainDesc('');
      setBeneficiaryName('');
      setActiveDate(null);
      setSelectedDates({});
      setRestrictions([]);
      setQuantity(1);
      setDeliveryAddress('');

      navigate('/');
    } else {
      return;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative">
      {/* Card */}
      <div className="w-full max-w-lg bg-[#FFECC8] rounded-2xl shadow-md p-8">
        {/* Heading */}
        <div className="mb-6 grid grid-cols-[auto_1fr_auto] items-center justify-center">
          <div className="flex justify-start">
            {(step === 2 || step === 3) && <BackBtn onClick={() => setStep((prev) => prev - 1)} />}
          </div>

          <h1 className="text-3xl font-semibold text-gray-800 text-center mb-1">
            {step === 1
              ? 'Create a Meal Train'
              : step === 2
                ? `Making a meal train for "${mealTrainTitle}"`
                : step === 3
                  ? `Review meal train for "${mealTrainTitle}"`
                  : ''}
          </h1>

          <div>
            <CancelBtn onClick={clearForm} />
          </div>
        </div>

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
            displayFormattedDate={displayFormattedDate}
            toggleMeal={toggleMeal}
            quantity={quantity}
            setQuantity={setQuantity}
            deliveryAddress={deliveryAddress}
            setDeliveryAddress={setDeliveryAddress}
            restrictions={restrictions}
            setRestrictions={setRestrictions}
            onNext={handleScheduleStepSubmit}
          />
        )}

        {/* STEP 3  */}
        {step === 3 && (
          <ReviewStep
            mealTrainTitle={mealTrainTitle}
            mealTrainDesc={mealTrainDesc}
            beneficiaryName={beneficiaryName}
            deliveryAddress={deliveryAddress}
            selectedDates={selectedDates}
            displayFormattedDate={displayFormattedDate}
            restrictions={restrictions}
            onCreate={handleCreateMealTrain}
          />
        )}
      </div>
    </div>
  );
}
