<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
=======
import MeanTrainCreationForm from './pages/MealTrainCreationForm'
>>>>>>> 9a312bc (Added Basic Meal Info form and two column layout for calendar and meal restrictions)
import './App.css'
import Signup from './pages/Signup'


  
function App() {
<<<<<<< HEAD
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<div>Home Page - Coming Soon</div>} />
      </Routes>
=======
  

  return (
    <>
      <MeanTrainCreationForm /> 
    </>
>>>>>>> 9a312bc (Added Basic Meal Info form and two column layout for calendar and meal restrictions)
  )
}


export default App