import { useState } from "react";
import BackBtn from "../BackBtn";
import MealCalendar from "../MealCalendar"
import Button from "../Button";
import SingleMealView from "./SingleMealView";

export default function ViewMealCard() {

    const selectedDates = {
        "2026-02-20": {
            breakfast: true,
            lunch: false,
            dinner: true
        },
        "2026-02-21": {
            breakfast: false,
            lunch: false,
            dinner: true
        },
        "2026-02-22": {
            breakfast: true,
            lunch: true,
            dinner: true
        }
    };

    const [activeDate, setActiveDate] = useState(Object.keys(selectedDates)[0]);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-CA').split('T')[0];
    };

    return (
        <div className="w-full max-w-6xl bg-[#FFFDF5] rounded-lg p-3 mx-auto">

            <div className="grid grid-cols-[auto_1fr_auto] mb-6 justify-center items-center">
                <BackBtn />
                <h1 className="text-2xl text-[#A88DE5] font-semibold">Bilal's Meal Train</h1>
            </div>

            <div className="grid lg:grid-cols-[auto_1fr] md:grid-cols-1 justify-center items-center p-3 gap-10">

                {/* left calendar section */}
                <div className="flex flex-col gap-6">
                    <div className="w-full">
                        <MealCalendar
                            mode="view"
                            activeDate={activeDate}
                            selectedDates={selectedDates}
                            onDayClick={(date) => {
                                setActiveDate(formatDate((date)));
                            }}
                            formatDate={formatDate}
                        />
                    </div>

                    {activeDate && selectedDates[activeDate] && (
                        <div className="mx-auto flex justify-between gap-6">
                            {['breakfast', 'lunch', 'dinner'].map(meal => (
                                <Button
                                    key={meal}
                                    children={meal}
                                    variant={`${selectedDates[activeDate]?.[meal] ? "orange" : "secondary"}`}
                                    className="rounded-full shadow-md duration-200 cursor-default"
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* right meals section */}
                {activeDate && selectedDates[activeDate] && (
                    <div className="flex flex-col gap-3">
                        {['breakfast', 'lunch', 'dinner'].map(meal => 
                            selectedDates[activeDate]?.[meal] && (
                                <SingleMealView
                                    key={meal}
                                    mealType={meal}
                                />
                            )
                        )}
                    </div>
                )}
            </div>


        </div>
    )
}