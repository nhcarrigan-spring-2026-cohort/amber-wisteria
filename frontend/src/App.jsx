import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import './App.css'
import Signup from './pages/Signup'
import CreateMealTrain from './pages/CreateMealTrain'
  
function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<div>Home Page - Coming Soon</div>} />
        <Route path='/create-meal-train' element={<CreateMealTrain />} />
      </Routes>
  )

}


export default App