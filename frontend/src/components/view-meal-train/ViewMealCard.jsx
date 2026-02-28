import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackBtn from '../BackBtn';
import MealCalendar from '../MealCalendar';
import Button from '../Button';
import SingleMealView from './SingleMealView';
import axiosClient from '../../api/axiosClient';

export default function ViewMealCard() {
  const [mealTrainData, setMealTrainData] = useState(null);
  const [selectedDates, setSelectedDates] = useState({});
  const [activeDate, setActiveDate] = useState(null);
  const [mealItems, setMealItems] = useState({});
  const [restrictions, setRestrictions] = useState([]);

  const navigate = useNavigate();

  const formatDate = (date) => {
    return date.toLocaleDateString('en-CA').split('T')[0];
  };

  const { id } = useParams();
  useEffect(() => {
    const loadMealTrain = async () => {
      try {
        const res = await axiosClient.get(`/api/mealtrains/${id}/`);
        setMealTrainData(res.data);

        const transformed = res.data.slots.reduce((acc, slot) => {
          const date = slot.slot_date;

          if (!acc[date]) {
            acc[date] = {
              breakfast: false,
              lunch: false,
              dinner: false
            };
          }

          if (slot.meal_type in acc[date]) {
            acc[date][slot.meal_type] = true;
          }

          return acc;
        }, {});

        setSelectedDates(transformed);

        const searchedMeals = {};
        res.data.slots.forEach((slot) => {
          const mealDetail = res.data.meals.find((m) => m.meal_slot === slot.id);
          if (mealDetail) {
            searchedMeals[`${slot.slot_date}-${slot.meal_type}`] = mealDetail;
          }
        });
        setMealItems(searchedMeals);

        setRestrictions(res.data.dietary_restrictions.split(','));

        const dates = Object.keys(transformed);
        if (dates.length > 0) setActiveDate(dates[0]);

        console.log(res.data);
      } catch (error) {
        console.log(`Error fetching meal train`, error);
      }
    };
    loadMealTrain();
  }, [id]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-[80%] max-w-6xl bg-[#FFFDF5] rounded-xl p-3 mx-auto relative z-1 m-10">
        <div className="grid grid-cols-[auto_1fr_auto] justify-center items-center p-3">
          <BackBtn onClick={() => navigate('/dashboard')} />
          <h1 className="text-3xl text-[#A88DE5] font-semibold">{mealTrainData?.title}</h1>
        </div>

        <div className="grid lg:grid-cols-[auto_1fr] md:grid-cols-1 justify-center items-center p-4 gap-10 mb-2">
          {/* left calendar section */}
          <div className="flex flex-col gap-6">
            <div className="w-full">
              <MealCalendar
                mode="view"
                activeDate={activeDate}
                selectedDates={selectedDates}
                onDayClick={(date) => {
                  setActiveDate(formatDate(date));
                }}
                formatDate={formatDate}
              />
            </div>

            {activeDate && selectedDates[activeDate] && (
              <div className="mx-auto flex justify-between gap-6">
                {['breakfast', 'lunch', 'dinner'].map((meal) => (
                  <Button
                    key={meal}
                    children={meal}
                    variant={`${selectedDates[activeDate]?.[meal] ? 'orange' : 'secondary'}`}
                    className="rounded-full shadow-md duration-200 cursor-default"
                  />
                ))}
              </div>
            )}
          </div>

          {/* right meals section */}
          {activeDate && selectedDates[activeDate] && (
            <div className="flex flex-col gap-3">
              {['breakfast', 'lunch', 'dinner'].map((meal) => {
                const isSlotActive = selectedDates[activeDate]?.[meal];

                if (isSlotActive) {
                  const details = mealItems[`${activeDate}-${meal}`];

                  if (details) {
                    return (
                      <SingleMealView
                        key={meal}
                        mealType={meal}
                        mealDate={activeDate}
                        mealTitle={details?.meal_description}
                        deliveryMethod={details?.special_notes}
                        restrictions={restrictions || []}
                      />
                    );
                  }
                }
              })}
            </div>
          )}
        </div>

        <Button
          variant="orange"
          onClick={() => navigate(`/create-meal/${id}/`)}
          children="Create a Meal"
          className="rounded-full shadow-md mb-4"
        />
      </div>
    </div>
  );
}
