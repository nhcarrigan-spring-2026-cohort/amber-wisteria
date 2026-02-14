import ViewMealCard from "../components/view-meal-train/ViewMealCard"
import Navbar from "../components/dashboard/Navbar"
import Background from "../components/Background"

export default function ViewMealTrain() {
    return (
        <>
            <Navbar />
            <Background>
                <ViewMealCard />
            </Background>
        </>



    )
}