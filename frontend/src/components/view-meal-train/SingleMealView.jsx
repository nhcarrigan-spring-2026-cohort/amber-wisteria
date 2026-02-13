import { useState } from "react";
import IngredientOrRestrictionPill from "./IngredientOrRestrictionPill";

export default function SingleMealView({
    mealTitle = "Stir-fried tomato and scrambled eggs",
    mealDesc = "classic, simple Chinese home-style dish featuring fluffy scrambled eggs and soft, saucy tomatoes",
    mealDate = "2026-02-21",
    preparedBy = "Bilal",
    deliveryMethod = "Self-deliver",
    restrictions = ["Vegan", "Gluten-free", "Nut-free", "Egg-free"],
    ingredients = ["Tomato", "ketchup", "eggs"]
}) {

    const [isShowMoreClicked, setIsShowMoreClicked] = useState(false);

    return (
        <div className="max-w-2xl bg-white border-2 border-gray-500 rounded-lg p-3">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">{mealTitle}</h1>
                <p className="text-md text-gray-400 font-medium">{new Date(mealDate).toDateString()}</p>
            </div>

            <div className="flex flex-wrap gap-3 mb-4">
                {ingredients.map(item => (
                    <IngredientOrRestrictionPill
                        key={item}
                        className="bg-[#F68300]"
                        children={item}
                    />
                ))}
            </div>

            {isShowMoreClicked && (
                <div className="flex flex-col items-center justify-center gap-3">
                    <p className="text-gray-600 text-left">
                        {mealDesc}
                    </p>
                    <div className="flex flex-wrap gap-3 self-start">
                        {restrictions.map(item => (
                            <IngredientOrRestrictionPill
                                key={item} 
                                className="bg-[#A88DE5]"
                                children={item}
                            />
                        ))}
                    </div>
                    <p className="self-start"><b>Delivery Method:</b> <span className=" text-gray-600">{deliveryMethod}</span></p>
                    <p className="self-start -mt-3"><b>Prepared By: :</b> <span className=" text-gray-600">{preparedBy}</span></p>
                </div>
            )}
            <div className="flex items-center justify-end">
                {isShowMoreClicked ? (
                    <button
                        onClick={() => setIsShowMoreClicked(false)}
                        className="flex gap-1 text-[#F68300] items-center"
                    >
                        Show Less
                        <svg width={15} viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M903.232 768l56.768-50.432L512 256l-448 461.568 56.768 50.432L512 364.928z" fill="currentColor"></path></g></svg>
                    </button>
                    
                ) : (
                    <button
                        onClick={() => setIsShowMoreClicked(true)}
                        className="flex items-center gap-1 text-[#F68300]"
                    >
                        Show More
                        <svg width={15} viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="currentColor"></path></g></svg>
                    </button>
                )}
            </div>
        </div>
    )
}