import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import '../meal-train/CustomCalendar.css';
import BasicInfoStep from './BasicInfoStep';
import ScheduleStep from './ScheduleStep';
import ReviewStep from './ReviewStep';
import BackBtn from '../BackBtn';
import CancelBtn from '../CancelBtn';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import Background from '../Background';

export default function MealTrainForm() {
  // step state => to control steps
  const [step, setStep] = useState(1);

  // step 1
  const [mealTrainTitle, setMealTrainTitle] = useState('');
  const [mealTrainDesc, setMealTrainDesc] = useState('');
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [beneficiaryPhone, setBeneficiaryPhone] = useState('');
  const [beneficiaryEmail, setBeneficiaryEmail] = useState('');

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

    if (beneficiaryEmail && !/\S+@\S+\.\S+/.test(beneficiaryEmail)) {
      alert('Please provide a valid email address.');
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
    const slots = [];

    Object.keys(selectedDates)
      .sort()
      .forEach((date) => {
        const { breakfast, lunch, dinner } = selectedDates[date];

        if (breakfast) {
          slots.push({
            slot_date: date,
            meal_type: 'breakfast'
          });
        }
        if (lunch) {
          slots.push({
            slot_date: date,
            meal_type: 'lunch'
          });
        }
        if (dinner) {
          slots.push({
            slot_date: date,
            meal_type: 'dinner'
          });
        }
      });

    const payload = {
      title: mealTrainTitle,
      description: mealTrainDesc || '',
      beneficiary_name: beneficiaryName,
      beneficiary_address: deliveryAddress,
      beneficiary_phone: beneficiaryPhone || '',
      beneficiary_email: beneficiaryEmail || '',
      dietary_restrictions: restrictions.join(', '),
      slots: slots
    };

    try {
      const res = await axiosClient.post('/api/mealtrains/', payload);
      console.log('Created', res.data);
      navigate('/dashboard');
    } catch (error) {
      console.log(error.response?.data);
    }
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

      navigate('/dashboard');
    } else {
      return;
    }
  };

  return (
    <Background>
      <div className="min-h-screen w-full flex items-center justify-center relative">
        {/* Card */}
        <div className="w-full max-w-lg bg-[#FFECC8] rounded-2xl shadow-md p-8">
          {/* Heading */}
          <div className="mb-6 grid grid-cols-[auto_1fr_auto] items-center justify-center">
            <div className="flex justify-start">
              {(step === 2 || step === 3) && (
                <BackBtn onClick={() => setStep((prev) => prev - 1)} />
              )}
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
              beneficiaryPhone={beneficiaryPhone}
              setBeneficiaryPhone={setBeneficiaryPhone}
              beneficiaryEmail={beneficiaryEmail}
              setBeneficiaryEmail={setBeneficiaryEmail}
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
    </Background>
  );
}
