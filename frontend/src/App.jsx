import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router'
import './App.css'
import Signup from './pages/Signup'

function App() {
  
  return (
    <Routes>
      {/* Note: Add routes to your page below (uncomment, edit or create new)
          path -> location of your page, amber-wisteria/login 
          element -> your page e.g, Login.jsx (don't forget to first import then use)*/}
<Route path="/signup" element={<Signup />} />
      {/* <Route index element={<Homepage />} />
      <Route path='login' element={<LoginForm />} />
      <Route path='signup' element={<Signup />} />
      <Route path='user-dashboard' element={<UserDashboard />} />
      <Route path='create-meal-train' element={<CreateMealForm />} /> */}
    </Routes>
  )
}

export default App
