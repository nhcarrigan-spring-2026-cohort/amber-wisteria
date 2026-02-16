import { useState } from 'react';
import Background from '../components/Background';
import Label from '../components/Label';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import BackBtn from '../components/BackBtn';
import IngredientOrRestrictionPill from '../components/view-meal-train/IngredientOrRestrictionPill';
import RestrictionView from '../components/RestrictionView';
import { RESTRICTIONS } from '../data/restrictions';

export default function CreateMeal() {
  const [mealTitle, setMealTitle] = useState('');
  const [mealDesc, setMealDesc] = useState('');
  const [mealType, setMealType] = useState('');
  const [mealDate, setMealDate] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');

  // To be edited => Restrictions come from meal train maker
  const restrictions = ['Vegan', 'Gluten-free', 'Nut-free', 'Egg-free'];

  // To be edited => Dates that come from meal train maker
  const allowedDates = ['2026-02-21', '2026-02-23', '2026-02-25'];

  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const addIngredient = () => {
    if (!ingredientInput.trim()) return;
    setIngredients([...ingredients, ingredientInput.trim()]);
    setIngredientInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log for testing purposes right now
    console.log({
      mealTitle,
      mealDesc,
      mealType,
      mealDate,
      deliveryMethod,
      restrictions,
      ingredients
    });

    alert('Meal created!');
  };

  return (
    <Background>
      <div className="flex flex-col items-center justify-start min-h-screen w-full pt-6 md:pt-10 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#212B27] mb-4 md:mb-6 text-center">
          Bilal’s Meal Train
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
            w-full max-w-[600px]
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
              placeholder="Classic Chinese home-style dish..."
              className="bg-white p-2.5 w-full rounded-xl mt-2.5 h-28 md:h-32"
              maxLength={100}
              required
            />

            <p className="text-right text-sm text-gray-500 mt-1">{mealDesc.length}/100</p>
          </div>

          <div className="w-full flex flex-col mb-6">
            <Label>Meal Type</Label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="bg-white p-2.5 w-full rounded-xl mt-2.5 h-14 md:h-16"
              required
            >
              <option value="" disabled>
                Please select a meal type
              </option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>

          <div className="w-full flex flex-col mb-6">
            <Label>Meal Date</Label>

            <select
              value={mealDate}
              onChange={(e) => setMealDate(e.target.value)}
              className="bg-white p-2.5 w-full rounded-xl mt-2.5 h-14 md:h-16"
              required
            >
              <option value="" disabled>
                Select a date
              </option>

              {allowedDates.map((d) => (
                <option key={d} value={d}>
                  {new Date(d).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full flex flex-col mb-6">
            <Label>Delivery Method</Label>
            <select
              value={deliveryMethod}
              onChange={(e) => setDeliveryMethod(e.target.value)}
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
            {RESTRICTIONS.filter((r) => restrictions.includes(r.id)).map((item) => (
              <RestrictionView key={item.id} item={item} />
            ))}
          </div>

          <div className="w-full flex flex-col mb-6">
            <Label>Ingredients</Label>

            <div className="w-full flex flex-col mt-2">
              <Input
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
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
