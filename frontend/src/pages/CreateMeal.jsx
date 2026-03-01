import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Background from '../components/Background';
import Label from '../components/Label';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import BackBtn from '../components/BackBtn';
import IngredientOrRestrictionPill from '../components/view-meal-train/IngredientOrRestrictionPill';
import RestrictionView from '../components/RestrictionView';
import { RESTRICTIONS } from '../data/restrictions';
import axiosClient from '../api/axiosClient';
import NotFound from './NotFound';

export default function CreateMeal() {
  const [mealTitle, setMealTitle] = useState('');
  const [mealDesc, setMealDesc] = useState('');
  const [mealType, setMealType] = useState('');
  const [mealDate, setMealDate] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');

  const [mealTrain, setMealTrain] = useState(null);
  const [allowedDates, setAllowedDates] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(0);

  const formatDate = (iso) => {
    const [year, month, day] = iso.split('-');
    return `${day}/${month}/${year}`;
  };

  const addIngredient = () => {
    if (!ingredientInput.trim()) return;
    setIngredients([...ingredients, ingredientInput.trim()]);
    setIngredientInput('');
  };
  const navigate = useNavigate();
  const handleEnterFocusNext = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1]?.focus();
    }
  };

  const { id } = useParams(); // can be changed later
  const mealTrainId = id;

  useEffect(() => {
    const loadMealTrain = async () => {
      try {
        const res = await axiosClient.get(`/api/mealtrains/${mealTrainId}/`);
        setMealTrain(res.data);
      } catch (error) {
        console.log('Error fetching meal train', error);
        setError(error.status);
      }
    };
    loadMealTrain();
  }, []);

  useEffect(() => {
    const loadAvailableSlots = async () => {
      try {
        const res = await axiosClient.get(`/api/mealtrains/${mealTrainId}/slots/`);
        setAvailableSlots(res.data);

        setAllowedDates(res.data.map((s) => s.slot_date));
      } catch (error) {
        console.log(`Error fetching slots for meal train: ${mealTrainId}`, error);
        setError(error.status);
      }
    };
    loadAvailableSlots();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = mealTitle.trim();
    const desc = mealDesc.trim();

    if (!title) {
      alert('Meal title cannot be empty or spaces only.');
      return;
    }

    if (!desc) {
      alert('Meal description cannot be empty or spaces only.');
      return;
    }

    if (ingredients.length === 0) {
      alert('Please add at least one ingredient.');
      return;
    }

    const matchingSlot = availableSlots.find(
      (slot) => slot.slot_date === mealDate && slot.meal_type === mealType.toLowerCase()
    );

    if (!matchingSlot) {
      alert('This meal type is not available for selected date.');
      return;
    }

    try {
      const payload = {
        meal_slot: matchingSlot?.id,
        meal_description: desc,
        special_notes: deliveryMethod
      };

      const res = await axiosClient.post(`/api/slots/${matchingSlot.id}/signups/`, payload);
      console.log('Meal Created Successfully!', res.data);
      alert('Meal Created Successfully.');
      navigate(`/view-meal-train/${id}`);
    } catch (error) {
      console.log('Error creating a meal', error);
      setError(error);
    }
  };

  const existingMealsId = mealTrain?.meals.map((meal) => meal.meal_slot) || [];
  const slotsForSelectedDate = availableSlots?.filter((slot) => slot.slot_date === mealDate) || [];
  const slotsForSelectedDateAndAlreadySelectedMeals = slotsForSelectedDate.filter(
    (slot) => !existingMealsId.includes(slot.id)
  );
  const restrictions = mealTrain?.dietary_restrictions?.split(', ') || [];

  if (error === 404) return <NotFound />;

  return (
    <Background>
      <div className="flex flex-col items-center justify-start min-h-screen w-full pt-6 md:pt-10 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#212B27] mb-4 md:mb-6 text-center">
          {mealTrain?.beneficiary_name}'s Meal Train
        </h2>

        <form
          onSubmit={handleSubmit}
          className="
            relative z-3 
            bg-[#FFECC899] 
            rounded-4xl 
            shadow-xl 
            px-6 py-8 md:px-10 md:py-14
            flex flex-col 
            box-border 
            items-center 
            w-full max-w-150
          "
        >
          <div className="absolute left-4 top-4 md:left-6 md:top-6">
            <BackBtn onClick={() => window.history.back()} />
          </div>

          <h1 className="font-semibold mb-6 md:mb-8 text-[32px] md:text-[40px] text-[#212B27]">
            Create Meal
          </h1>

          <div className="w-full flex flex-col mb-6">
            <Label>Meal Title</Label>
            <Input
              value={mealTitle}
              onChange={(e) => setMealTitle(e.target.value)}
              onKeyDown={handleEnterFocusNext}
              placeholder="Stir-fried tomato and scrambled eggs"
              className="bg-white p-2.5 w-full rounded-xl mt-2.5 h-14 md:h-16"
              required
            />
          </div>

          <div className="w-full flex flex-col mb-6">
            <Label>Meal Description</Label>

            <Textarea
              value={mealDesc}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setMealDesc(e.target.value);
                }
              }}
              onKeyDown={handleEnterFocusNext}
              placeholder="Classic Chinese home-style dish..."
              className="bg-white p-2.5 w-full rounded-xl mt-2.5 h-28 md:h-32"
              maxLength={100}
              required
            />

            <p className="text-right text-sm text-gray-500 mt-1">{mealDesc.length}/100</p>
          </div>

          <div className="w-full flex flex-col mb-6">
            <Label>Meal Date</Label>

            <div className="relative mt-2.5">
              <input
                type="date"
                value={mealDate}
                onChange={(e) => {
                  const selected = e.target.value;
                  if (allowedDates.includes(selected)) {
                    setMealDate(selected);
                  } else {
                    setMealDate('');
                    alert('This date is not available for this meal train.');
                  }
                }}
                onKeyDown={handleEnterFocusNext}
                className="bg-white p-2.5 w-full rounded-xl h-14 md:h-16 text-[#212B27]"
                required
              />
            </div>

            <p className="text-sm text-gray-500 mt-2 text-center">
              Available dates:{' '}
              {[...new Set(availableSlots.map((s) => s.slot_date))].map(formatDate).join(', ')}
            </p>

            {mealDate && (
              <p className="mt-2 text-center text-gray-700">
                Selected date: {formatDate(mealDate)}
              </p>
            )}

            {error && (
              <p className="font-semibold flex items-center justify-center mt-4  bg-red-500 p-3 text-white w-full">
                Please select a meal date and type that is not already chosen
              </p>
            )}
          </div>

          <div className="w-full flex flex-col mb-6">
            <Label>Meal Type</Label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              onKeyDown={handleEnterFocusNext}
              className="bg-white p-2.5 w-full rounded-xl mt-2.5 h-14 md:h-16"
              required
            >
              <option value="" disabled>
                Please select a meal type
              </option>

              {slotsForSelectedDateAndAlreadySelectedMeals.map((slot) => (
                <option key={`${slot.slot_type}-${slot.id}`} value={slot.meal_type}>
                  {slot.meal_type}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full flex flex-col mb-6">
            <Label>Delivery Method</Label>
            <select
              value={deliveryMethod}
              onChange={(e) => setDeliveryMethod(e.target.value)}
              onKeyDown={handleEnterFocusNext}
              className="bg-white p-2.5 w-full rounded-xl mt-2.5 h-14 md:h-16"
              required
            >
              <option value="" disabled>
                Please select a delivery method
              </option>
              <option value="Self-delivery">Self-delivery</option>
              <option value="Courier">Courier</option>
            </select>
          </div>

          <div className="bg-[#FFA64D] text-white font-semibold text-center px-4 py-1 rounded-full mb-4 self-center w-fit">
            Please avoid these ingredients
          </div>

          <div className="w-full flex flex-wrap gap-4 justify-center items-center mb-6">
            {RESTRICTIONS.filter((r) => restrictions.find((res) => r.id === res)).map((item) => (
              <RestrictionView key={item.id} item={item} />
            ))}
          </div>

          <div className="w-full flex flex-col mb-6">
            <Label>Ingredients</Label>

            <div className="w-full flex flex-col mt-2">
              <Input
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                onKeyDown={handleEnterFocusNext}
                placeholder="Chicken"
                className="bg-white p-2.5 w-full rounded-xl h-14 md:h-16"
              />

              <button
                type="button"
                onClick={addIngredient}
                className="bg-[#A88DE5] text-white rounded-xl py-3 md:py-4 mt-3 w-full text-center font-semibold"
              >
                Add Ingredient
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              {ingredients.map((item, index) => (
                <IngredientOrRestrictionPill key={index} className="bg-[#F68300] px-4 py-2">
                  {item}
                </IngredientOrRestrictionPill>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#A88DE5] text-white w-xs mt-4 p-4 md:p-5 text-xl md:text-2xl font-semibold rounded-xl"
          >
            Create Meal
          </button>
        </form>
      </div>
    </Background>
  );
}
