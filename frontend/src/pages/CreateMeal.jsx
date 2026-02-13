import { useState } from "react";
import Background from "../components/Background";
import Label from "../components/Label";
import Input from "../components/Input";
import Textarea from "../components/Textarea";

import RestrictionToggle from "../components/RestrictionToggle";
import IngredientOrRestrictionPill from "../components/view-meal-train/IngredientOrRestrictionPill";

import { RESTRICTIONS } from "../data/restrictions";


export default function CreateMeal() {
  const [mealTitle, setMealTitle] = useState("");
  const [mealDesc, setMealDesc] = useState("");
  const [mealType, setMealType] = useState("");
  const [mealDate, setMealDate] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");

  const [restrictions, setRestrictions] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const toggleRestriction = (value) => {
    setRestrictions((prev) =>
      prev.includes(value)
        ? prev.filter((r) => r !== value)
        : [...prev, value]
    );
  };

  const addIngredient = () => {
    if (!ingredientInput.trim()) return;
    setIngredients([...ingredients, ingredientInput.trim()]);
    setIngredientInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      mealTitle,
      mealDesc,
      mealType,
      mealDate,
      deliveryMethod,
      restrictions,
      ingredients,
    });
    alert("Meal created!");
  };

  return (
    <Background>
      <div className="flex items-center justify-center h-screen w-full">
        <form
          onSubmit={handleSubmit}
          className="relative z-3 bg-[#FFECC899] rounded-4xl shadow-xl pt-14 pr-22 pb-14 pl-22 flex flex-col box-border items-center w-[600px]"
        >
          <h1 className="font-semibold mb-8 text-[45px] text-[#212B27]">
            Create Meal
          </h1>

          <div className="w-full flex flex-col mb-4">
            <Label>Meal Title</Label>
            <Input
              value={mealTitle}
              onChange={(e) => setMealTitle(e.target.value)}
              placeholder="Stir-fried tomato and scrambled eggs"
              className="bg-white p-2.5 w-full rounded-xl mt-2.5 h-16"
              required
            />
          </div>

          <div className="w-full flex flex-col mb-4">
            <Label>Meal Description</Label>
            <Textarea
              value={mealDesc}
              onChange={(e) => setMealDesc(e.target.value)}
              placeholder="Classic Chinese home-style dish..."
              className="bg-white p-2.5 w-full rounded-xl mt-2.5 h-32"
              required
            />
          </div>

          <div className="w-full flex flex-col mb-4">
            <Label>Meal Type</Label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="bg-white p-2.5 w-full rounded-xl mt-2.5 h-16"
              required
            >
              <option value="" disabled>Please select a meal type</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>

          <div className="w-full flex flex-col mb-4">
            <Label>Meal Date</Label>
            <input
              type="date"
              value={mealDate}
              onChange={(e) => setMealDate(e.target.value)}
              className="bg-white p-2.5 w-full rounded-xl mt-2.5 h-16"
              required
            />
          </div>

          <div className="w-full flex flex-col mb-4">
            <Label>Delivery Method</Label>
            <select
              value={deliveryMethod}
              onChange={(e) => setDeliveryMethod(e.target.value)}
              className="bg-white p-2.5 w-full rounded-xl mt-2.5 h-16"
              required
            >
              <option value="" disabled>Please select a delivery method</option>
              <option value="Self-delivery">Self-delivery</option>
              <option value="Courier">Courier</option>
            </select>
          </div>

          <div className="w-full flex flex-col mb-4">
            <Label>Please avoid these ingredients</Label>

            <div className="flex flex-wrap gap-4 justify-center items-center mt-3">
              {RESTRICTIONS.map((item) => (
                <RestrictionToggle
                  key={item.id}
                  item={item}
                  selected={restrictions.includes(item.id)}
                  onToggle={toggleRestriction}
                />
              ))}
            </div>
          </div>

          <div className="w-full flex flex-col mb-4">
            <Label>Ingredients</Label>

            <div className="flex gap-3 mt-2 w-full">
              <Input
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                placeholder="Chicken"
                className="bg-white p-2.5 w-full rounded-xl h-16"
              />

              <button
                type="button"
                onClick={addIngredient}
                className="bg-[#A88DE5] text-white rounded-xl px-6"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {ingredients.map((item, index) => (
                <IngredientOrRestrictionPill key={index}>{item}</IngredientOrRestrictionPill>
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="bg-[#A88DE5] text-white w-xs mt-8 mb-2 p-5 text-2xl font-semibold rounded-xl"
          >
            Create Meal
          </button>
        </form>
      </div>
    </Background>
  );
}